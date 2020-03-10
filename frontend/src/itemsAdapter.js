class ItemsAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.element = document.querySelector('.main')
    }

    getItems() {
        fetch(this.baseUrl)
        .then(resp => resp.json())
        .then(items => {
            items.forEach(item => {
                console.log(item)
            })
        })
    }
}

const itemsAdapter = new ItemsAdapter('http://localhost:3000/subcategories')

export default itemsAdapter