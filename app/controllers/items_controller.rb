class ItemsController < ApplicationController
  def index
    items = Item.all
    render json: items, only: [:id, :name, :subcategory_id, :price, :current_stock]
  end

  def create
    item = Item.create(name: params[:name], subcategory_id: params[:subcategory_id])
    render_return_json
  end

  def update
    item = Item.find_by_id(params[:id])
    item.name = params[:name]
    item.subcategory_id = params[:subcategory_id]
    item.save
    render_return_json
  end

  def destroy
    item = Item.find_by_id(params[:id])
    item.destroy
    render_return_json
  end

  private

  def render_return_json
    render json: item, only: [:id, :name, :subcategory_id, :price, :current_stock]
  end
end
