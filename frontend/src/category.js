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
        <h2 id='category-${this.id}'>
            ${this.name}
            <img src='/deletebutton.png' alt='Delete button'>
        </h2>
        `        
        return this.element
    }
}