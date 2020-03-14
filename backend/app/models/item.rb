class Item < ApplicationRecord
  belongs_to :subcategory

  validates :name, presence: true, allows_blank: false
  validates :subcategory_id, presence: true
end
