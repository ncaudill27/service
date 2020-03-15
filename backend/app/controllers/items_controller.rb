class ItemsController < ApplicationController
  def index
    items = Item.all
    render json: items, only: [:id, :name, :subcategory_id]
  end

  def create
    item = Item.create(name: params[:name], subcategory_id: params[:subcategory_id])
    render json: item, only: [:id, :name, :subcategory_id]
  end

  def update
    item = Item.find_by_id(params[:id])
    item.name = params[:name]
    item.subcategory_id = params[:subcategory_id]
    item.save
    render json: item, only: [:id, :name, :subcategory_id]
  end

  def destroy
    item = Item.find_by_id(params[:id])
    render json: {item_id: item.id}
  end

  private

  def render_return_json
    render json: item, only: [:id, :name, :subcategory_id]
  end
end
