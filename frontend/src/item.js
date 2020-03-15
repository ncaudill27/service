import Subcategory from './subcategory.js'
import subcategoriesAdapter from './subcategoriesAdapter.js'
import itemsAdapter from './itemsAdapter.js'

export default class Item {
    
    static all = []
    
    static findById(itemId) {
        return Item.all.find(item => item.id == itemId)
    }
    
    static create = (obj) => {
        new Item(obj).render()
        const sub = Subcategory.findById(obj.subcategory_id)
        subcategoriesAdapter.renderArrayOfItems(sub.items())
        console.log(sub.items())
    }
    
    static updateItem({id, name, subcategory_id}) {
        const item = Item.findById(id)
        const subcategory = Subcategory.findById(item.subcategory_id)
        
        item.name = name
        
        if (item.subcategory_id != subcategory.id) {
            subcategory.toggleMenu()
            // TODO Find out why this isn't opening parent ul 
            item.subcategory_id = subcategory_id
            subcategory = Subcategory.findById(subcategory_id)
            subcategory.toggleMenu()
        }
        item.render()
        
        subcategoriesAdapter.renderArrayOfItems(subcategory.items())
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

    static newItemForm = `
    <div class='form-card'>
        <h4>New Item</h4>
        <label>Item Name</label>
        <input type='text' name='name'><br>
        <label>Item Price</label>
        <input type='text' name='price'><br>
        <label>Category Name</label>
        <input type='text' name='category'><br>
        <label>Subcategory Name</label>
        <input type='text' name='subcategory'><br>
        <input id='cancel' type='submit' value='Cancel'>
        <input id='add' type='submit' value='Add'>
    </div>
    `

    constructor({id, name, subcategory_id}) {
        this.id = id
        this.name = name
        this.subcategory_id = subcategory_id
        this.cartItemCount = 0

        this.element = document.createElement('div')
        this.element.setAttribute('class', 'card')
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
        // Item.getMainState()
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