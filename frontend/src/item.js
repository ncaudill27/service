import itemsAdapter from "./itemsAdapter.js"

export default class Item {

    static all = []

    static findById(itemId) {
        return Item.all.find(item => item.id == itemId)
    }

    static previousState = []

    static saveMainState = () => {
        let allCards = document.querySelectorAll('.card')
        allCards.forEach(card => {
            let item = Item.findById(card.dataset.itemId)
            Item.previousState.push(item)
        })
    }

    static getMainState = () => {
        let main = document.querySelector('main')
        main.innerHTML = ''
        Item.previousState.map( item => main.appendChild(item.element))
        Item.previousState = []
    }

    constructor({id, name, subcategory_id}) {
        this.id = id
        this.name = name
        this.subcategory_id = subcategory_id
        this.cartCount = 0

        this.element = document.createElement('div')
        this.element.setAttribute('class', 'card')
    }

    render = () => {
        this.element.setAttribute('data-item-id', this.id)
        this.element.innerHTML = `
        <img src='/deletebutton.png' alt='Delete button'>
        <br>
        <h4>
            ${this.name}
        </h4>
        <span>
            Edit
        </span>
        `
        this.editBtn = this.element.querySelector('span')
        this.editBtn.addEventListener('click', this.handleItemEdit)

        Item.all.push(this)
        return this.element
    }
    
    handleItemEdit = e => {
        console.log(e.target.parentNode.dataset.itemId)
        Item.saveMainState()
        this.renderEditForm()
    }

    renderEditForm = () => {
        this.element.parentNode.innerHTML = `
        <div class='form-card'>
            <h4>Edit Item</h4>
            <label>Name</label>
            <input type='text' value='${this.name}'><br>
            <label>Price</label>
            <input type='text'><br>
            <input id='cancel' type='submit' value='Cancel'>
            <input id='submit' type='submit' value='Edit'><br>
        <div>
        `
        this.submitBtn = document.getElementById('submit')
        this.submitBtn.addEventListener('click', this.submitEdit)

        this.cancelBtn = document.getElementById('cancel')
        this.cancelBtn.addEventListener('click', Item.getMainState)
    }

    submitEdit = e => {
        const reqObj = {name: this.name, id: this.id, subcategory_id: this.subcategory_id}
        itemsAdapter.patchItem(reqObj)
        Item.getMainState()
    }

// Functions relative to cart
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
            (${this.cartCount}) ${this.name}
        </p>
        `
        return this.cart
    }

    incrementCartItem() {
        this.cartCount += 1
        this.cart.innerHTML = `
        <p>
            (${this.cartCount}) ${this.name}
        </p>
        `
        return this.cart
    }
}