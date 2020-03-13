class ItemsController < ApplicationController
  def index
    items = Item.all
    render json: items, only: [:id, :name, :subcategory_id]
  end

  def update
    item = Item.find_by_id(params[:id])
    item.name = params[:name]
    render json: item, only: [:id, :name, :subcategory_id]
  end

  def destroy
    item = Item.find_by_id(params[:id])
    render json: {item_id: item.id}
  end
end
