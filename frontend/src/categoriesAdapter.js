import Category from './category.js'

class CategoriesAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.element = document.querySelector('.sidebar')
    }

    getCategories() {
        fetch(this.baseUrl)
        .then(resp => resp.json())
        .then(categories => {
            categories.forEach( category => {
                let cat = new Category(category)
                this.element.appendChild(cat.render())
            })
        })
    }

}

const categoriesAdapter = new CategoriesAdapter('http://localhost:3000/categories')

export default categoriesAdapter