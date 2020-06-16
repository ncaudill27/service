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
        sub.displayItems()
        console.log(sub.items())
    }
    
    static updateItem({id, name, price, current_stock, subcategory_id}) {
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
        item.render();

        subcategory.displayItems();
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

        Item.all.push(this)
    }

    subcategory() {
        Subcategory.findById(this.subcategory_id);
    }

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

        return this.element
    }
    
    handleItemEdit = () => {
        Item.saveMainState()
        this.renderEditForm()
    }

    update({name, price, current_stock, subcategory_id}) {
        this.name = name;
        this.price = price;
        this.currentStock = current_stock;
        this.subcategory_id = subcategory_id;

        if (item.subcategory_id != subcategory.id) {
            subcategory.toggleMenu()
            // TODO Find out why this isn't opening parent ul 
            item.subcategory_id = subcategory_id
            subcategory = Subcategory.findById(subcategory_id)
            subcategory.toggleMenu()
        }
        item.render();

        subcategory.displayItems();
    }

    renderEditForm = () => {
        this.element.parentNode.innerHTML = `
        <div class='form-card'>
            <h4>Edit Item</h4>
            <label>Name</label>
            <input type='text' value='${this.name}'><br>
            <label>Price</label>
            <input type='text' value='${this.price}'><br>
            <label>Subcategory</label>
            <input type='text' value='${Subcategory.findById(this.subcategory_id).name}'><br>
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
        const price = inputs[1].value
        const subcategoryName = inputs[2].value
        const subcategory = Subcategory.findByName(subcategoryName)
        console.log(subcategoryName, subcategory.id);
        const reqObj = {
            id: this.id, 
            name,
            price,
            subcategory_id: subcategory.id
        }

        itemsAdapter.patchItem(reqObj)
        // Item.getMainState()
    }

// Cart related functions
    addToCart = (e) => {
        if (e.target.localName === 'img') return; // Ensures an item edit or delete button isn't being pressed

        // if (this. cartItem && this.cartItem.count === 0) delete this.cartItem;
        if (this.cartItem) {
            return this.incrementCartItem();
        } else if (this.cartItem && this.cartItem.count === 0) {
            this.cartItem.render()
        }

        this.cartItem = new CartItem(this);

        // const observer = new MutationObserver(this.cb);
        // console.log(this.cartItem.element);
        
        // observer.observe(this.cartItem.element, {count: 0});

        cart.addNewItem(this.cartItem);
    }

    incrementCartItem() {
        this.cartItem.cartItemCount++;
        this.cartItem.render();
        cart.addToTotal(this.cartItem);
    }

    cb = (mutationsList, observer) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'count') {
                console.log(mutation);
            }
        }
    };
}