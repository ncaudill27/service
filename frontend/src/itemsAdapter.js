import Item from './item.js'

class ItemsAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.element = document.querySelector('main')
        this.element.addEventListener('click', this.handleCartAdd)
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

    handleCartAdd = e => {
        const itemId = this.setDataSetId(e)

        if (e.target.getAttribute('class') === 'card' || e.target.parentNode.getAttribute('class') === 'card') {
            const item = Item.all.find(item => item.id == itemId)
            item.addToCart()
        }
    }

    setDataSetId(e) {
        let itemId = e.target.dataset.itemId
        if (e.target.nodeName === 'H4') {
            itemId = e.target.parentNode.dataset.itemId
        }
        return itemId
    }
}

const itemsAdapter = new ItemsAdapter('http://localhost:3000/items')

export default itemsAdapter