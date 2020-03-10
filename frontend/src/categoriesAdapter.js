import Category from './category.js'

class categoriesAdapter {
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
                this.element += cat.render()
            })
        })
    }

}

const catAdapter = new categoriesAdapter('http://localhost:3000/categories')
export default catAdapter