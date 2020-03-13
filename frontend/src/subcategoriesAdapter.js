import Subcategory from './subcategory.js'
import Item from './item.js'

class SubcategoriesAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.element = document.querySelector('.sidebar')

        this.element.addEventListener('click', this.handleSubmenuSelection)
        this.element.addEventListener('click', this.destroySubcategory)
    }

    
    getSubcategories = () => {
        fetch(this.baseUrl)
        .then(resp => resp.json())
        .then(this.renderSubcategories)
    }

    renderSubcategories = subcategories => {
        subcategories.forEach(this.renderSingleCategory)
    }

    renderSingleCategory(subcategory) {
        const subcat = new Subcategory(subcategory)
        const catDiv = subcat.parentCategoryElement // Grab parent div for appending
        const subDiv = subcat.render()
        // Hide submenu until click event
        catDiv.style.display = 'none'

        catDiv.appendChild(subDiv)
    }

    destroySubcategory = e => {
        if (e.target.matches('.submenu-item > h2 > img')) {
            const subcategoryId = e.target.parentNode.dataset.subcategoryId
            fetch(`${this.baseUrl}/${subcategoryId}`, {
                method: 'DELETE',
                header: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then(this.deleteSubcategory)
        }
    }

    deleteSubcategory({subcategory_id}) {
        const subcategory = Subcategory.all.find(sub => sub.id == subcategory_id)
        subcategory.element.remove()
    }

    handleSubmenuSelection = e => {
        if (e.target.matches('.submenu-item > h2')) {
            const subId = e.target.dataset.subcategoryId
            const subcat = Subcategory.findById(subId)
           this.renderArrayOfItems(subcat.items())
        }
    }

    renderArrayOfItems(array) {
        let main = document.querySelector('main')
        main.innerHTML = ''
        array.forEach( item => {
            let card = item.render()
            main.appendChild(card)
        })
    }
}

const subcategoriesAdapter = new SubcategoriesAdapter('http://localhost:3000/subcategories')

export default subcategoriesAdapter