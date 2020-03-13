export default class Category {

    static all = []
    
    constructor({id, name}) {
        this.id = id
        this.name = name

        this.element = document.createElement('div')
        this.element.setAttribute('class', 'menu-item')

        Category.all.push(this)
    }

    static findByName(name) {
        return Category.all.find(cat => cat.name == name)
    }

    render() {
        this.element.innerHTML = `
        <h2 data-category-id='${this.id}'>
            ${this.name}
        </h2>
        <img class='delete' src='/deletebutton.png' alt='Delete button'>
        <img class='edit' src='/fountainpen.png' alt='Edit button'>
        `
        // Node to attach Subcategories to
        const submenu = document.createElement('ul')
        submenu.setAttribute('id', `submenu-${this.id}`)
        submenu.setAttribute('class', 'submenu')
        this.element.appendChild(submenu)

        return this.element
    }
}