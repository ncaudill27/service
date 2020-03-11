import Subcategory from './subcategory.js'

class SubcategoriesAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.element = document.querySelector('.sidebar')

        this.element.addEventListener('click', this.displayItems)
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

    
    displayItems(e) {
        // const subcat = Subcategory.all.filter( sc => console.log(sc.id))
        if (!(e.target.getAttribute('class') === 'submenu-item')) {
            console.log(e.target.dataset.subcategoryId)
        }
    }
}

const subcategoriesAdapter = new SubcategoriesAdapter('http://localhost:3000/subcategories')

export default subcategoriesAdapter