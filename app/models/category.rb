class Category < ApplicationRecord
  has_many :subcategories, dependent: :destroy

  validates :name, presence: true, allows_blank: false, uniqueness: true
end
