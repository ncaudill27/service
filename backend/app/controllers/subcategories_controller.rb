class SubcategoriesController < ApplicationController
  def index
    subcategories = Subcategory.all
    render json: subcategories, only: [:name, :id, :category_id]
  end

  def create
    subcategory = Subcategory.create(name: params[:name], category_id: params[:category_id])
    subcategory.save
    render json: subcategory, only: [:name, :id, :category_id]
  end

  def destroy
    subcategory = Subcategory.find_by_id(params[:id])
    subcategory.destroy
    render json: {subcategory_id: subcategory.id}
  end
end
