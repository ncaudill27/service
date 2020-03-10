class CategoriesController < ApplicationController
  def index
    categories = Category.all
    render json: categories, only: [:name, :id]
  end
end
