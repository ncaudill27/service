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
    
    static deleteSubcategory({subcategory_id}) {
        const subcategory = Subcategory.findById(subcategory_id)
        subcategory.element.remove()
    }

    static patch(obj) {
        const subcategory = Subcategory.findById(obj.id)
        const h2 = subcategory.element.querySelector('h2')
        h2.innerText = obj.name
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

        this.editBtn = this.element.querySelector('img.edit')
        this.editBtn.addEventListener('click', ()=> this.handlePatchEvent(this))

        return this.element
    }

    handlePatchEvent(obj) {
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
}