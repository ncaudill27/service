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

// ! Non-functional
    displayItems(e) {
        // const subcat = Subcategory.all.filter( sc => console.log(sc.id))
        const subId = e.target.dataset.subcategoryId
        if (!(e.target.getAttribute('class') === 'submenu-item')) {
           const subcat = Subcategory.all.find( sc => sc.id == subId)
           console.log(subcat.items())
        }
    }
// ! Non-functional
    findSubcategory = (obj, id) => obj.id === id
}

const subcategoriesAdapter = new SubcategoriesAdapter('http://localhost:3000/subcategories')

export default subcategoriesAdapter