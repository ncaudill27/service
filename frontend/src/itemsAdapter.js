import Item from './item.js'
import Subcategory from './subcategory.js'
import Category from './category.js'
import subcategoriesAdapter from './subcategoriesAdapter.js'

class ItemsAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.element = document.querySelector('main')
        this.element.addEventListener('click', this.handleCartAdd)
        this.element.addEventListener('click', this.handleItemDelete)

        this.addBtn = document.querySelector('.add-item')
        this.addBtn.addEventListener('click', this.beginItemCreate)
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

    beginItemCreate = e => {
            this.renderNewItemForm()
    }

    renderNewItemForm = () => {
        this.element.innerHTML = `
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
        this.addBtn = document.getElementById('add')
        this.addBtn.addEventListener('click', this.createItemRequest)
    }

    createItemRequest = () => {
        const inputs = document.querySelectorAll('input')
        const name = inputs[0].value
        const categoryName = inputs[2].value
        const category = Category.findByName(categoryName)
        const subcategory = Subcategory.findByNameAndCategoryId(inputs[3].value, category.id)
        const itemObj = {name: name, subcategory_id: subcategory.id}
    
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(itemObj)
        }

        fetch(this.baseUrl, configObj)
        .then(resp => resp.json())
        .then( obj => {
            const sub = Subcategory.findById(obj.subcategory_id)
            subcategoriesAdapter.renderArrayOfItems(sub.items())
        })
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
        const item = Item.findById(item_id)
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
            const item = Item.findById(itemId)
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
        return e.target.matches('.card') || e.target.parentNode.matches('.card') && !e.target.matches('img')
    }
}
    
const itemsAdapter = new ItemsAdapter('http://localhost:3000/items')

export default itemsAdapter