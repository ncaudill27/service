class SubcategoriesController < ApplicationController
  def index
    subcategories = Subcategory.all
    render json: subcategories, only: [:name, :id, :category_id]
  end
end
