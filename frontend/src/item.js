export default class Item {
    constructor({id, name, subcategory_id}) {
        this.id = id
        this.name = name
        this.subcategory_id = subcategory_id

        this.element = document.createElement('div')
        this.element.setAttribute('class', 'card')
    }

    render() {
        this.element.innerHTML = `
        <h4>
            ${this.name}
        </h4>
        `
        return this.element
    }
}