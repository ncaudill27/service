import Item from './item.js'
import subcategoriesAdapter from './subcategoriesAdapter.js'

export default class Subcategory {

    static all = []

    static findByNameAndCategoryId(name, id) {
        return Subcategory.all.find(sub => {
            try {
                sub.id == id
            } finally {
                return sub.name == name
            }
        })
    }

    static findById(id) {
        return Subcategory.all.find(sc => sc.id == id)
    }
    
    static deleteSubcategory({subcategory_id}) {
        const subcategory = Subcategory.findById(subcategory_id)
        subcategory.element.remove()
    }
    
    constructor({id, name, category_id}) {
        this.id = id
        this.name = name
        this.category_id = category_id

        this.parentCategoryElement = document.getElementById(`submenu-${category_id}`)
        this.element = document.createElement('li')
        this.element.setAttribute('class', 'submenu-item')

        Subcategory.all.push(this)
    }
    
    items() {
        return Item.all.filter( item => item.subcategory_id === this.id )
    }

    render() {
        this.element.innerHTML = `
        <h2 data-subcategory-id='${this.id}'>
            ${this.name}
        </h2>
        <img class='delete' src='/deletebutton.png' alt='Delete button'>
        <img class='edit' src='/fountainpen.png' alt='Edit button'>
        `

        this.deleteBtn = this.element.querySelector('img.delete')
        this.deleteBtn.addEventListener('click', ()=>subcategoriesAdapter.destroySubcategory(this.id))
        return this.element
    }
}