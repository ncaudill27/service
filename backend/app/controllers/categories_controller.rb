class CategoriesController < ApplicationController
  def index
    categories = Category.all
    render json: categories, only: [:name, :id]
  end

  def destroy
    category = Category.find_by_id(params[:id])
    category.destroy
    render json: {category_id: category.id}
  end
end
