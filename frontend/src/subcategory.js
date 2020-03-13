import Item from './item.js'

export default class Subcategory {

    static all = []
    
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
            <img src='/deletebutton.png' alt='Delete button'>
        </h2>
        `
        return this.element
    }
}