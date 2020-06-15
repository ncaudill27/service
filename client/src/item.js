import Subcategory from './subcategory.js'
import subcategoriesAdapter from './subcategoriesAdapter.js'
import itemsAdapter from './itemsAdapter.js'
import CartItem from './cartItem.js';
import cart from './cart.js';

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
            if ( !!card.dataset.itemId ) {
                let item = Item.findById(card.dataset.itemId)
                Item.previousState.push(item)
            }
        })
    }

    static getMainState = () => {
        let main = document.querySelector('main')
        main.innerHTML = ''
        Item.previousState.map(item => main.appendChild(item.element))
    }

    static sortCurrentState() {
        Item.saveMainState()
        let main = document.querySelector('main')
        main.innerHTML = ''
        
        let sortedCards = Item.previousState.sort(Item.sortCardsAphabetically)
        sortedCards.map(item => main.appendChild(item.element))
    }

    static sortCardsAphabetically(a, b) {
        if ( a.name < b.name ) {
            return -1
        } else {
            return 1
        } 
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

    constructor({id, name, price, current_stock, subcategory_id}) {
        this.id = id
        this.name = name
        this.price = price
        this.currentStock = current_stock
        this.subcategory_id = subcategory_id
        // this.cartItemCount = 0

        this.element = document.createElement('div')
        this.element.setAttribute('class', 'card')
        this.element.setAttribute('data-item-id', this.id)
        this.element.addEventListener('click', this.addToCart)
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
        this.element.innerHTML = `
        <img class='delete' src='/public/deletebutton.png' alt='Delete button'>
        <br>
        <h4>
            ${this.name}
        </h4>
        <span>
            <img src='/public/fountainpen.png' alt='Edit button'>
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
    addToCart = (e) => {
        if (e.target.localName === 'img') return; // Ensures an item edit or delete button isn't being pressed

        // const cart = document.querySelector('.cart');
        // cart.style.display = 'block';
        
        
        if (this.cartItem) return this.incrementCartItem();
        
        this.cartItem = new CartItem(this);
        cart.renderCartItem(this.cartItem.element);

        // const subTotal = document.createElement('div');
        // subTotal.className = 'subtotal'
        // subTotal.innerHTML = `
        // <div class='content'>
        //     <strong>Subtotal</strong>
        //     <span>$XX.XX</span>
        // </div>
        // `;
        // if (!cart.textContent.includes('Subtotal')) cart.appendChild(subTotal);
        
    }

    incrementCartItem() {
        this.cartItem.cartItemCount++;
        this.cartItem.render();
    }
}