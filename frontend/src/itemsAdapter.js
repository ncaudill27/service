import Item from './item.js'

class ItemsAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.element = document.querySelector('main')
        this.element.addEventListener('click', this.handleCartAdd)
    }

    
    getItems() {
        fetch(this.baseUrl)
        .then(resp => resp.json())
        .then(items => {
            items.forEach(item => {
                let i = new Item(item)
                let itemDiv = i.render()

                // this.element.appendChild(itemDiv)
            })
        })
    }

    handleCartAdd = e => {
        const itemId = e.target.dataset.itemId
        if (e.target.getAttribute('class') === 'card' || e.target.parentNode.getAttribute('class') === 'card') {
            console.log(itemId)
        }
    }
}

const itemsAdapter = new ItemsAdapter('http://localhost:3000/items')

export default itemsAdapter