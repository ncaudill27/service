export default class Subcategory {
    constructor({id, name, category_id}) {
        this.id = id
        this.name = name
        this.category_id = category_id

        this.element = document.createElement('div')
        this.element.setAttribute('class', 'menu-item')
    }
}