import itemsAdapter from './itemsAdapter.js'
import categoriesAdapter from './categoriesAdapter.js'
import subcategoriesAdapter from './subcategoriesAdapter.js'
import Category from './category.js'
import Subcategory from './subcategory.js'
import Item from './item.js'

document.addEventListener('DOMContentLoaded', ()=> {
    categoriesAdapter.getCategories()
    setTimeout(subcategoriesAdapter.getSubcategories(), 100)
    itemsAdapter.getItems()
})