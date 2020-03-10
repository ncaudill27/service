import Subcategory from './subcategory.js'

class SubcategoriesAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.element = document.querySelector('.sidebar')
    }

    getSubcategories() {
        fetch(this.baseUrl)
        .then(resp => resp.json())
        .then(subcategories => {
            subcategories.forEach(subcategory => {
                let subcat = new Subcategory(subcategory)
                subcat.parent.appendChild(subcat.render())
            });
        })
    }
}

const subcategoriesAdapter = new SubcategoriesAdapter('http://localhost:3000/subcategories')

export default subcategoriesAdapter