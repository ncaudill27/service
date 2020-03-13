import Item from './item.js'

class ItemsAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.element = document.querySelector('main')
        this.element.addEventListener('click', this.handleCartAdd)
        this.element.addEventListener('click', this.handleItemDelete)
        this.element.addEventListener('click', this.handleItemCreate)

        this.addBtn = document.querySelector('.add-item')
        this.addBtn.addEventListener('click', this.handleItemCreate)
    }

    
    getItems = () => {
        fetch(this.baseUrl)
        .then(resp => resp.json())
        .then(this.renderItems)
    }

    renderItems(items) {
        items.forEach(item => {
            let i = new Item(item)
            i.render()
        })
    }

    handleItemCreate = e => {
        if (e.target.matches('.add-item')) {
            this.renderNewItemForm()
            console.log('here')
        }
    }

    renderNewItemForm = () => {
        this.element.innerHTML = `
        <div class='form-card'>
            <h4>New Item</h4>
            <label>Item Name</label>
            <input type='text' name='name'><br>
            <label>Item Price</label>
            <input type='text' name='price'><br>
            <input id='cancel' type='submit' value='Cancel'>
            <input id='add' type='submit' value='Add'>
        </div>
        `
        this.addBtn = document.getElementById('add')
        this.addBtn.addEventListener('click', this.createItemRequest)
    }

    createItemRequest = () => {
        const inputs = document.querySelectorAll('input')
        const name = inputs[0].value
        const itemObj = {name: name}
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(itemObj)
        }
        fetch(this.baseUrl, configObj)
        .then(resp = resp.json())
        .then(Item.createFromObject)
    }
    
    handleItemDelete = e => {
        if (e.target.matches('img')) {
            const itemId = e.target.parentNode.dataset.itemId
            fetch(`${this.baseUrl}/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then(this.deleteItem)
        }
    }
    
    deleteItem({item_id}) {
        const item = Item.all.find(i => i.id == item_id)
        item.element.remove()
    }

    patchItem = itemObj => {
        const configObj = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify(itemObj)
        }
        fetch(`${this.baseUrl}/${itemObj.id}`, configObj)
        .then(resp => resp.json())
        .then(Item.updateItem)
    }

// Functions relevant to adding items to cart.
    handleCartAdd = e => {
        if (this.addToCartTargetCheck(e)) {
            const itemId = this.setDataSetId(e)
            const item = Item.all.find(item => item.id == itemId)
            item.addToCart()
        }
    }

// Allows both .card div or h4 within to be clickable for cart additions
    setDataSetId(e) {
        let itemId = e.target.dataset.itemId
        if (e.target.matches('h4')) {
            itemId = e.target.parentNode.dataset.itemId
        }
        return itemId
    }

// Added for readability
    addToCartTargetCheck(e) {
        return e.target.matches('.card') || e.target.parentNode.matches('.card') && !e.target.matches('img') && !e.target.matches('span')
    }
}
    
const itemsAdapter = new ItemsAdapter('http://localhost:3000/items')

export default itemsAdapter