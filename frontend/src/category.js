import categoriesAdapter from './categoriesAdapter.js'

export default class Category {

    static all = []
    
    static findById(id) {
        return Category.all.find(cat => cat.id == id)
    }

    static nameFromId(id) {
        return Category.findById(id).name
    }

    static deleteCategory({category_id}) {
        const category = Category.findById(category_id)
        category.element.remove()
    }

    static patchCategory(obj) {
        const category = Category.findById(obj.id)
        const h2 = category.element.querySelector('h2')
        h2.innerText = obj.name
    }
    
        static findByName(name) {
            return Category.all.find(cat => cat.name == name)
        }

    constructor({id, name}) {
        this.id = id
        this.name = name

        this.element = document.createElement('div')
        this.element.setAttribute('class', 'menu-item')
        this.element.setAttribute('data-category-id', this.id)

        Category.all.push(this)
    }

    render() {
        this.element.innerHTML = `
        <h2>
            ${this.name}
        </h2>
        <img class='delete' id='delete-category-${this.id}' src='/deletebutton.png' alt='Delete button'>
        <img class='edit' id='edit-category-${this.id}' src='/fountainpen.png' alt='Edit button'>
        `
        // Node to attach Subcategories to
        const submenu = document.createElement('ul')
        submenu.setAttribute('id', `submenu-${this.id}`)
        submenu.setAttribute('class', 'submenu')
        this.element.appendChild(submenu)

        const deleteBtn = this.element.querySelector('img.delete')
        deleteBtn.addEventListener('click', this.handleDelete)

        const editBtn = this.element.querySelector('img.edit')
        editBtn.addEventListener('click', this.handleEdit)
        return this.element
    }

    handleDelete = () => {
        categoriesAdapter.destroyCategory(this.id)
    }

    handleEdit = () => {
        const main = document.querySelector('main')
        main.innerHTML= `
        <div class='form-card'>
            <h4>Edit Category</h4>
            <label>Name</label>
            <input type='text' value='${this.name}'>
            <input id='edit-category' type='submit' value='Edit'>
        </div>
        `

        const submitPatchBtn = document.getElementById('edit-category')
        submitPatchBtn.addEventListener('click', () => {
            const requestObj = this.prepPatchRequestObj(this)
            categoriesAdapter.patchCategory(requestObj)
        })
    }

    prepPatchRequestObj({id, name}) {
        const input = document.querySelector('input')
        const newName = input.value
        return {id: id, name: newName}
    }
}