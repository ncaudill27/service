export default class Item {

    static all = []
    
    constructor({id, name, subcategory_id}) {
        this.id = id
        this.name = name
        this.subcategory_id = subcategory_id

        this.element = document.createElement('div')
        this.element.setAttribute('class', 'card')

        Item.all.push(this)
    }

    render() {
        this.element.setAttribute('data-item-id', this.id)
        this.element.innerHTML = `
        <h4>
            ${this.name}
        </h4>
        `
        return this.element
    }

    addToCart() {
        const cart = document.querySelector('.cart')
        this.element.setAttribute('class', 'cart-item')

        this.element.innerHTML = `
        <p>
            ${this.name}
        </p>
        `
        cart.appendChild(this.element)
    }
}