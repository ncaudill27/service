import catAdapter from './categoriesAdapter.js'

// categoriesAdapter  = new categoriesAdapter('http://localhost:3000/categories')

document.addEventListener('DOMContentLoaded', ()=> {
    catAdapter.getCategories()
})