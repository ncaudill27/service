import Category from './category.js'

class categoriesAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    getCategories() {
        fetch(this.baseUrl)
        .then(resp => resp.json())
        .then(categories => {
            categories.forEach( category => {
                let cat = new Category(category)
                cat.render()
            })
        })
    }

}

const catAdapter = new categoriesAdapter('http://localhost:3000/categories')

catAdapter.getCategories()