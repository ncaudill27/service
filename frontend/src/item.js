export default class Item {

    static all = []
    
    constructor({id, name, subcategory_id}) {
        this.id = id
        this.name = name
        this.subcategory_id = subcategory_id
        this.cartCount = 0

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

    addToCart = ()=> {
        const cart = document.querySelector('.cart')
        cart.style.display = 'block'
        
        if (this.cart) {
            return this.incrementCartItem()
        }
        this.cart = this.createCartItem()
        cart.appendChild(this.cart)
    }

    createCartItem() {
        this.cart = document.createElement('div')
        this.cart.setAttribute('class', 'cart-item')
        this.cartCount += 1

        this.cart.innerHTML = `
        <p>
            ${this.name.slice(0,5)}...(${this.cartCount})
        </p>
        `
        return this.cart
    }

    incrementCartItem() {
        this.cartCount += 1
        this.cart.innerHTML = `
        <p>
            ${this.name.slice(0,5)}...(${this.cartCount})
        </p>
        `
        return this.cart
    }
}