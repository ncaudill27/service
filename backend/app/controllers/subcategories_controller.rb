class SubcategoriesController < ApplicationController
  def index
    subcategories = Subcategory.all
    render json: subcategories, only: [:name, :id, :category_id]
  end

  def destroy
    subcategory = Subcategory.find_by_id(params[:id])
    render json: {subcategory_id: subcategory.id}
  end
end
