import Item from './item.js'

class ItemsAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.element = document.querySelector('main')
    }

    
    getItems() {
        fetch(this.baseUrl)
        .then(resp => resp.json())
        .then(items => {
            items.forEach(item => {
                let i = new Item(item)
                let itemDiv = i.render()

                this.element.appendChild(itemDiv)
            })
        })
    }
}

const itemsAdapter = new ItemsAdapter('http://localhost:3000/items')

export default itemsAdapter