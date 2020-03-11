import Category from './category.js'

class CategoriesAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.element = document.querySelector('.sidebar')

        this.element.addEventListener('click', this.toggleSubmenu)
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
            })
        })
    }

    toggleSubmenu(e) {
        const subMenu = e.target.parentNode.lastChild
        if (!(e.target.getAttribute('class') === 'menu-item')) {
            if (subMenu.style.display === 'none') {
                subMenu.style.display = 'block'
            } else {
                subMenu.style.display = 'none'
            }
        }
    }

}

const categoriesAdapter = new CategoriesAdapter('http://localhost:3000/categories')

export default categoriesAdapter