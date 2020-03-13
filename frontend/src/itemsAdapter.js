import Item from './item.js'

class ItemsAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.element = document.querySelector('main')
        this.element.addEventListener('click', this.handleCartAdd)
        this.element.addEventListener('click', this.handleItemDelete)
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

    handleItemDelete = e => {
        if (e.target.matches('img')) {
            const itemId = e.target.parentNode.dataset.itemId
            fetch(`${this.baseUrl}/${itemId}`, {
                method: 'DELETE',
                header: {
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
            header: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify(itemObj)
        }
        fetch(`${this.baseUrl}/${itemObj.id}`, configObj)
        .then(resp => resp.json())
        .then(obj => console.log(obj))
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