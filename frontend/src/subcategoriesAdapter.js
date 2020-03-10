class SubcategoriesAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.element = document.querySelector('.sidebar')
    }

    getSubcategories() {
        fetch(this.baseUrl)
        .then(resp => resp.json())
        .then(categories => {
            categories.forEach(category => {
                console.log(category)
            });
        })
    }
}

const subcategoriesAdapter = new SubcategoriesAdapter('http://localhost:3000/subcategories')

export default subcategoriesAdapter