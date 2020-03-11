import Category from './category.js'

class CategoriesAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.element = document.querySelector('.sidebar')

        this.allContainer = []
    }

    get all() {
        return console.log(this.allContainer)
    }
    
    getCategories() {
        fetch(this.baseUrl)
        .then(resp => resp.json())
        .then(categories => {
            categories.forEach( category => {
                const cat = new Category(category)
                const catDiv = cat.render()
                this.element.appendChild(catDiv)
                this.allContainer.push(catDiv)
            })
        })
    }

}

const categoriesAdapter = new CategoriesAdapter('http://localhost:3000/categories')

export default categoriesAdapter