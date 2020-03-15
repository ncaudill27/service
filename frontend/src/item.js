import Subcategory from './subcategory.js'
import subcategoriesAdapter from './subcategoriesAdapter.js'
import itemsAdapter from './itemsAdapter.js'

export default class Item {

    constructor({id, name, subcategory_id}) {
        this.id = id
        this.name = name
        this.subcategory_id = subcategory_id
        this.cartItemCount = 0

        this.element = document.createElement('div')
        this.element.setAttribute('class', 'card')
    }

    static all = []

    static findById(itemId) {
        return Item.all.find(item => item.id == itemId)
    }

    static create(obj) {
        new Item(obj)
        const sub = Subcategory.findById(obj.subcategory_id)
        subcategoriesAdapter.renderArrayOfItems(sub.items())
    }

    static updateItem({id, name, subcategory_id}) {
        const item = Item.findById(id)
        const subcategory = Subcategory.findById(item.subcategory_id)

        item.name = name

        if (item.subcategory_id !== subcategory.id) {
            subcategory.element.parentNode.style.display = 'none'
            item.subcategory_id = subcategory_id
            // TODO Find out why this isn't opening parent ul 
            // ! If 'old' submenu is open when subcat is editted this works.
            // ! But old one does not close.
            subcategory = Subcategory.findById(subcategory_id)
        }
        item.render()
        
        subcategoriesAdapter.renderArrayOfItems(subcategory.items())
        subcategory.element.parentNode.style.display = 'block'
    }

    static previousState = []

    static saveMainState = () => {
        Item.previousState = []
        let allCards = document.querySelectorAll('.card')
        allCards.forEach(card => {
            let item = Item.findById(card.dataset.itemId)
            Item.previousState.push(item)
        })
    }

    static getMainState = () => {
        let main = document.querySelector('main')
        main.innerHTML = ''
        Item.previousState.map(item => main.appendChild(item.element))
    }

    static createFromObject = itemObj => {
        const item = new Item(itemObj)
        item.render()
    }

// ? Save funtionality for manager use?
    // static appendAddItemBtn() {
    //     const addBtn = document.createElement('div')
    //     addBtn.setAttribute('class', 'card')
    //     addBtn.setAttribute('id', 'add-item')
    //     addBtn.innerHTML = `<h4>Add Item</h4>`
    //     return addBtn
    // }

    render = () => {
        this.element.setAttribute('data-item-id', this.id)
        this.element.innerHTML = `
        <img class='delete' src='/deletebutton.png' alt='Delete button'>
        <br>
        <h4>
            ${this.name}
        </h4>
        <span>
            <img src='/fountainpen.png' alt='Edit button'>
        </span>
        `
        this.editBtn = this.element.querySelector('span')
        this.editBtn.addEventListener('click', this.handleItemEdit)

        Item.all.push(this)
        return this.element
    }
    
    handleItemEdit = () => {
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
            <label>Subcategory</label>
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

    submitEdit = () => {
        const inputs = document.querySelectorAll('input')
        const name = inputs[0].value
        const subcategoryName = inputs[2].value
        const subcategory = Subcategory.findByName(subcategoryName)

        const reqObj = {name: name, id: this.id, subcategory_id: subcategory.id}
        itemsAdapter.patchItem(reqObj)
        Item.getMainState()
    }

// Cart related functions
    addToCart = ()=> {
        const cart = document.querySelector('.cart')
        cart.style.display = 'block'
        
        if (this.cartItem) {
            return this.incrementCartItem()
        }
        this.cartItem = this.createCartItem()
        cart.appendChild(this.cartItem)
    }

    createCartItem() {
        this.cartItem = document.createElement('div')
        this.cartItem.setAttribute('class', 'cart-item')
        this.cartItemCount += 1

        this.cartItem.innerHTML = this.renderCartItem()

        return this.cartItem
    }

    incrementCartItem() {
        this.cartItemCount += 1
        this.cartItem.innerHTML = this.renderCartItem()
    }

    // decrementCartItem() {
    //     console.log(this.cartItem)
    //     // this.cartItemCount -= 1
    //     // this.cartItem.innerHTML = this.renderCartItem()
    // }

    renderCartItem() {
        const item = `
        <p>
            (${this.cartItemCount}) ${this.name}
        </p>
        <img class='decrement' src='/downarrow.png' alt='Decrement item'>
        <img class='delete' src='/deletebutton.png' alt='Delete button'>
        `
        return item
    }
}