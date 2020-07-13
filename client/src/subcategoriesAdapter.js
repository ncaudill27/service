import Subcategory from './subcategory.js'
import Category from './category.js'

let res = res => res.json()

class SubcategoriesAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.element = document.querySelector('aside')

        this.addBtn = document.createElement('h2');
        this.addBtn.innerText = 'Add Subcategory';
        this.addBtn.addEventListener('click', this.handleNewSubcategory)
        this.element.appendChild(this.addBtn);
    }

    getSubcategories = () => {
        return fetch(this.baseUrl)
        .then(res)
    }

    renderSubcategories = subcategories => {
        subcategories.forEach(sc => new Subcategory(sc).render());
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
        .then(res)
        .then(obj => {
            const subcategory = new Subcategory(obj)
            subcategory.parentCategoryUl.style.display = 'block'
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
        .then(res)
        .then(Subcategory.deleteSubcategory)
    }

    patchSubcategory = patchObj => {
        const configObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(patchObj)
        }
        fetch(`${this.baseUrl}/${patchObj.id}`, configObj)
        .then(res)
        .then(Subcategory.renderPatchResponse)
    }
}

const subcategoriesAdapter = new SubcategoriesAdapter('http://localhost:3000/subcategories')

export default subcategoriesAdapter