import categoriesAdapter from './categoriesAdapter.js'

export default class Category {

    static all = []
    
    static deleteCategory({category_id}) {
        const category = Category.all.find(cat => cat.id == category_id)
        category.element.remove()
    }

    constructor({id, name}) {
        this.id = id
        this.name = name

        this.element = document.createElement('div')
        this.element.setAttribute('class', 'menu-item')
        this.element.setAttribute('data-category-id', this.id)

        Category.all.push(this)
    }

    static findByName(name) {
        return Category.all.find(cat => cat.name == name)
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
            const requestObj = this.sanitizeCategoryObj(this)
            console.log(requestObj)
        })
    }

    sanitizeCategoryObj({id, name}) {
        return {id: id, name: name}
    }
}