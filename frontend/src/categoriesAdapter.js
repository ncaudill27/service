class categoriesAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    getCategories() {
        fetch(this.baseUrl)
        .then(resp => resp.json())
        .then(categories => console.log(categories))
    }

}

const catAdapter = new categoriesAdapter('http://localhost:3000/categories')

catAdapter.getCategories()