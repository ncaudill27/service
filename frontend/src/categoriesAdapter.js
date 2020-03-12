import Category from './category.js'

class CategoriesAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.element = document.querySelector('.sidebar')

        this.element.addEventListener('click', this.toggleSubmenu)
        this.element.addEventListener('click', this.destroyCategory)
    }

    getCategories = () => {
        fetch(this.baseUrl)
        .then(resp => resp.json())
        .then(this.renderCategories)
    }

    renderCategories = categories => {
        categories.forEach( category => {
            const cat = new Category(category)
            const catDiv = cat.render()
            this.element.appendChild(catDiv)
        })
    }

    destroyCategory = e => {
        if (e.target.matches('img')) {
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