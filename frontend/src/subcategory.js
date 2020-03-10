export default class Subcategory {
    constructor({id, name, category_id}) {
        this.id = id
        this.name = name
        this.category_id = category_id

        this.element = document.createElement('div')
        this.element.setAttribute('class', 'menu-item')
    }

    render() {
        this.element.innerHTML = `
        <h2 class='sub-category' data-subcat-id='${this.id}'>
            ${this.name}
        </h2>
        `

        return this.element
    }
}