import categoriesAdapter from './categoriesAdapter.js'
import subcategoriesAdapter from './subcategoriesAdapter.js'
// categoriesAdapter  = new categoriesAdapter('http://localhost:3000/categories')

document.addEventListener('DOMContentLoaded', ()=> {
    categoriesAdapter.getCategories()
    subcategoriesAdapter.getSubcategories()
})