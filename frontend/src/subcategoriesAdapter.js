import Subcategory from './subcategory.js'

class SubcategoriesAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.element = document.querySelector('.sidebar')

        this.element.addEventListener('click', this.handleSubmenuSelection)
    }

    
    getSubcategories = e => {
        fetch(this.baseUrl)
        .then(resp => resp.json())
        .then(this.renderSubcategories)
    }

    renderSubcategories = subcategories => {
        subcategories.forEach(subcategory => {
            const subcat = new Subcategory(subcategory)
            const catDiv = subcat.parent.parentNode
            const subDiv = subcat.render()
            // Hide submenu until click event
            subDiv.style.display = 'none'

            catDiv.appendChild(subDiv)
        });
    }

    handleSubmenuSelection = e => {
        const subId = e.target.dataset.subcategoryId
        const subcat = Subcategory.all.find( sc => sc.id == subId)

        if (!(e.target.getAttribute('class') === 'submenu-item')) {
            // console.log(subcat.items())
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