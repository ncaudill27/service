import Category from './category.js'
import subcategoriesAdapter from './subcategoriesAdapter.js'

class CategoriesAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.element = document.querySelector('.sidebar')

        this.element.addEventListener('click', this.toggleSubmenu)
        this.element.addEventListener('click', this.destroyCategory)
        this.element.addEventListener('click', this.handleAddCategory)
    }

    getCategories = () => {
        fetch(this.baseUrl)
        .then(resp => resp.json())
        .then(this.renderCategories)
    }

    renderCategories = categories => {
        categories.forEach(this.renderCategory)
        subcategoriesAdapter.getSubcategories()
    }

    renderCategory = category => {
        const cat = new Category(category)
        const catDiv = cat.render()
        this.element.appendChild(catDiv)
    }

    destroyCategory = e => {
        if (e.target.matches('.menu-item > h2 > img')) {
            const categoryId = e.target.parentNode.dataset.categoryId
            fetch(`${this.baseUrl}/${categoryId}`, {
                method: 'DELETE',
                header: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then(this.deleteCategory)
        }
    }

    deleteCategory({category_id}) {
        const category = Category.all.find(cat => cat.id == category_id)
        category.element.remove()
    }

    handleAddCategory = e => {
        if (e.target.matches('.add-category')) {
            this.renderCategoryForm()
        }
        // Once form available listen for submit
        if (document.getElementById('add-category')) {
            const addForm = document.getElementById('add-category')
            addForm.addEventListener('submit', e => {
                e.preventDefault()
                const input = addForm.querySelector('input')
                this.createCategory(input.value) // Value for post request
            })
        }
    }

    createCategory = categoryName => {
        const newCategoryObj = {name: categoryName}
        const configObj = {
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newCategoryObj)
        }
        fetch(`${this.baseUrl}`, configObj)
        .then(resp => resp.json())
        .then(obj => console.log(obj))
        // this.renderCategory
    }

    renderCategoryForm() {
        const main = document.querySelector('main')
        main.innerHTML = `
        <div class='form-card'>
            <h4>New Category</h4>
            <form id='add-category'>
                <label>Name</label>
                <input type='text' name='name'>
                <input type='submit' value='Add'>
            </form>
        <div>
        `
    }

    toggleSubmenu(e) {
        if (e.target.matches('.menu-item > h2')) {
            const subMenu = e.target.parentNode.lastChild
            if (!!subMenu.style) {
                if (subMenu.style.display === 'none') {
                    subMenu.style.display = 'block'
                } else {
                    subMenu.style.display = 'none'
                }
            }
        }
    }

}

const categoriesAdapter = new CategoriesAdapter('http://localhost:3000/categories')

export default categoriesAdapter