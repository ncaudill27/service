# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Item.delete_all
Subcategory.delete_all
Category.delete_all

categories = [
  {'Breakfast' => ['Starters', 'Mains']},
  {'Lunch' => ['Starters', 'Mains']},
  {'Dinner' => ['Starters', 'Mains']},
  {'Desserts' => ['Cakes', 'Ice Creams']},
  {'Beer' => ['IPAs', 'Domestics', 'Sours']},
  {'Spirits' => ['Whiskey', 'Gin', 'Tequila']},
  {'Wine' => ['Cabernet Sauvignon', 'Pinot Gris', 'Pinot Noir', 'Riesling']}
]

categories.each do |pair|
  
  category = Category.create(name: pair.keys[0])

  pair.values.each do |val|
    val.each do |name|
      sub_cat = Subcategory.create(name: name, category_id: category.id)
      10.times do
        food_name = Faker::Food.dish
        Item.create(name: food_name, subcategory_id: sub_cat.id)
      end
    end
  end
end                      