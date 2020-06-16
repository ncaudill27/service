import Item from './item.js'
import subcategoriesAdapter from './subcategoriesAdapter.js'
import Category from './category.js'

export default class Subcategory {

    static all = []

    static findByNameAndCategoryId(name, id) {
        return Subcategory.all.find(sub => sub.category_id == id && sub.name == name)
    }

    static findById(id) {
        return Subcategory.all.find(sc => sc.id == id)
    }

    static findByName(name) {
        return Subcategory.all.find(sub => sub.name === name)
    }
    
    static deleteSubcategory({subcategory_id}) {
        const subcategory = Subcategory.findById(subcategory_id)
        subcategory.element.remove()
    }

    static renderPatchResponse(obj) {
        const subcategory = Subcategory.findById(obj.id)

        subcategory.name = obj.name
        
        if (obj.category_id != subcategory.category_id) {
            subcategory.element.parentNode.style.display = 'none' // Close 'old' submenu

            // Set new parent submenu
            subcategory.category_id = obj.category_id
            subcategory.parentCategoryUl = document.getElementById(`submenu-${obj.category_id}`)

            // Append and open new parent ul
            const categoryDiv = subcategory.parentCategoryUl
            categoryDiv.appendChild(subcategory.element)
            categoryDiv.style.display = 'block'
        }

        
        
        subcategory.render()

    }
    
    constructor({id, name, category_id}) {
        this.id = id
        this.name = name
        this.category_id = category_id

        this.parentCategoryUl = document.getElementById(`submenu-${category_id}`) // Find parent node

        this.element = document.createElement('li')
        this.element.setAttribute('class', 'submenu-item')
        this.element.addEventListener('click', this.displayItems)

        this.render()

        this.deleteBtn = this.element.querySelector('img.delete')
        this.deleteBtn.addEventListener('click', () => subcategoriesAdapter.destroySubcategory(this.id))

        this.editBtn = this.element.querySelector('img.edit')
        this.editBtn.addEventListener('click', this.handlePatchEvent)

        Subcategory.all.push(this)
    }
    
    items = () => {
        return Item.all.filter( item => item.subcategory_id === this.id )
    }

    category = () => {
        return Category.findById(this.category_id);
    }

    render = () => {
        this.element.innerHTML = `
        <h2 data-subcategory-id='${this.id}'>
            ${this.name}
        </h2>
        <img class='delete' src='/public/deletebutton.png' alt='Delete button'>
        <img class='edit' src='/public/fountainpen.png' alt='Edit button'>
        `
    }

    handlePatchEvent = () => {
        console.log('here');

        const main = document.querySelector('main')
        main.innerHTML = `
        <div class='form-card'>
            <h4>Edit Subcategory</h4>
            <label>Name</label>
            <input type='text' value='${this.name}'><br><br>
            <label>Parent Name</label>
            <input type='text' value='${Category.nameFromId(this.category_id)}'><br>
            <input id='edit-subcategory' type='submit' value='Edit'>
        </div>
        `
        this.submitPatchBtn = document.getElementById('edit-subcategory')
        this.submitPatchBtn.addEventListener('click', () => {
            const requestObj = this.prepPatchRequestObj(this)
            subcategoriesAdapter.patchSubcategory(requestObj)
        })
    }

    prepPatchRequestObj({id, name, category_id}) {
        const inputs = document.querySelectorAll('input')
        const newName = inputs[0].value
        const categoryName = inputs[1].value
        const category = Category.findByName(categoryName)
        return {id: id,name: newName, category_id: category.id}
    }

    displayItems = (e) => {
        if (e.target.nodeName === 'IMG') return;

        let main = document.querySelector('main')
        main.innerHTML = ""
        // let sortBtn = document.getElementById('sort')
        this.items().forEach( item => {
            let card = item.render()
            main.appendChild(card)
        });
        // sortBtn.addEventListener('click', () => Item.sortCurrentState())
    }
}