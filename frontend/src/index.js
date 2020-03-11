import itemsAdapter from './itemsAdapter.js'
import categoriesAdapter from './categoriesAdapter.js'
import subcategoriesAdapter from './subcategoriesAdapter.js'


document.addEventListener('DOMContentLoaded', ()=> {
    categoriesAdapter.getCategories()
    subcategoriesAdapter.getSubcategories()
    itemsAdapter.getItems()
})