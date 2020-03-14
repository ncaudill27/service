import Subcategory from './subcategory.js'
import Category from './category.js'

class SubcategoriesAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.element = document.querySelector('.sidebar')

        this.element.addEventListener('click', this.handleSubmenuSelection)

        this.addBtn = document.querySelector('.add-subcategory')
        this.addBtn.addEventListener('click', this.handleNewSubcategory)
    }

    
    getSubcategories = () => {
        fetch(this.baseUrl)
        .then(resp => resp.json())
        .then(this.renderSubcategories)
    }

    renderSubcategories = subcategories => {
        subcategories.forEach(this.renderSingleCategory)
    }

    renderSingleCategory(subcategory) {
        const subcat = new Subcategory(subcategory)
        const catDiv = subcat.parentCategoryElement // Grab parent div for appending
        const subDiv = subcat.render()
        // Hide submenu until click event
        catDiv.style.display = 'none'

        catDiv.appendChild(subDiv)
        return subcat
    }

    handleNewSubcategory = () => {
        this.renderNewForm()
        if (document.querySelector('.form-card')) {
            const submitBtn = document.getElementById('add')
            submitBtn.addEventListener('click', this.sendCreateRequest)
        }
    }

    sendCreateRequest = () => {
        const requestObj = this.processFormInfo()
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestObj)
        }
        fetch(this.baseUrl, configObj)
        .then(resp => resp.json())
        .then(obj => {
            const subcategory = this.renderSingleCategory(obj)
            subcategory.parentCategoryElement.style.display = 'block'
        })
    }

    processFormInfo() {
        const inputs = document.querySelectorAll('input')
        const name = inputs[0].value
        const categoryName = inputs[1].value
        const category = Category.findByName(categoryName)
        return {name: name, category_id: category.id}
    }

    renderNewForm() {
        const main = document.querySelector('main')
        main.innerHTML = `
        <div class='form-card'>
            <h4>New Subcategory</h4>
            <label>Name</label>
            <input type='text' name='name'><br>
            <label>Parent Category</label>
            <input type='text' name='category'><br>
            <input id='add' type='submit' value='Add'>
        </div>
        `
    }

    destroySubcategory = subcategoryId => {
        fetch(`${this.baseUrl}/${subcategoryId}`, {
            method: 'DELETE',
            header: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(Subcategory.deleteSubcategory)
    }

    handleSubmenuSelection = e => {
        if (e.target.matches('.submenu-item > h2')) {
            const subId = e.target.dataset.subcategoryId
            const subcat = Subcategory.findById(subId)
            this.renderArrayOfItems(subcat.items())
        }
    }

    renderArrayOfItems(array) {
        let main = document.querySelector('main')
        main.innerHTML = ''
        array.forEach( item => {
            let card = item.render()
            main.appendChild(card)
        })
    }
}

const subcategoriesAdapter = new SubcategoriesAdapter('http://localhost:3000/subcategories')

export default subcategoriesAdapter