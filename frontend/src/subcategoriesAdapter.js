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
                const subcat = new Subcategory(subcategory)
                const catDiv = subcat.parent.parentNode
                const subDiv = subcat.render()
                // Hide submenu until click event
                subDiv.style.display = 'none'
                catDiv.appendChild(subDiv)
            });
        })
    }
}

const subcategoriesAdapter = new SubcategoriesAdapter('http://localhost:3000/subcategories')

export default subcategoriesAdapter