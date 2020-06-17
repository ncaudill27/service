import Category from './category.js';
import Item from './item.js';
import subcategoriesAdapter from './subcategoriesAdapter.js';

let res = res => res.json();

class CategoriesAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.element = document.querySelector('.sidebar')

        this.addButton = document.querySelector('.add-category')
        this.addButton.addEventListener('click', this.handleAddCategory)
    }

    getCategories = () => {
        return fetch(this.baseUrl)
        .then(res)
    }

    renderSidebar = categories => {
        categories.forEach(this.renderCategory)
        subcategoriesAdapter.getSubcategories()
        .then(subcategoriesAdapter.renderSubcategories);
    }

    renderCategory = category => {
        const cat = new Category(category)
        const catDiv = cat.render()
        this.element.appendChild(catDiv)
    }

    destroyCategory = categoryId => {
        fetch(`${this.baseUrl}/${categoryId}`, {
            method: 'DELETE',
            header: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res)
        .then(Category.deleteCategory)
    }

    handleAddCategory = () => {
        Item.saveMainState()
        Category.displayCategoryForm()
        // Once form available listen for submit
        if (document.getElementById('add-category')) {
            const addForm = document.getElementById('add-category')
            addForm.addEventListener('submit', e => {
                e.preventDefault()
                const input = addForm.querySelector('input')
                this.createCategory(input.value) // Value for post request
                Item.getMainState()
            })
        }
    }

    createCategory = categoryName => {
        const newCategoryObj = {name: categoryName}
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(newCategoryObj)
        }
        fetch(this.baseUrl, configObj)
        .then(res)
        .then(this.renderCategory)
    }

    patchCategory = patchObj => {
        const configObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(patchObj)
        }
        fetch(`${this.baseUrl}/${patchObj.id}`, configObj)
        .then(res)
        .then(Category.patchCategory)
    }
}

const categoriesAdapter = new CategoriesAdapter('http://localhost:3000/categories')

export default categoriesAdapter