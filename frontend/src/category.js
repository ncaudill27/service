export default class Category {

    static all = []
    
    constructor({id, name}) {
        this.id = id
        this.name = name

        this.element = document.createElement('div')
        this.element.setAttribute('class', 'menu-item')

        Category.all.push(this)
    }

    render() {
        this.element.innerHTML = `
        <h2 data-category-id='${this.id}'>
            ${this.name}
            <img src='/deletebutton.png' alt='Delete button'>
        </h2>
        `
        // Node to attack Subcategories to
        const submenu = document.createElement('div')
        submenu.setAttribute('id', `submenu-${this.id}`)
        submenu.setAttribute('class', 'submenu')
        this.element.appendChild(submenu)

        return this.element
    }
}