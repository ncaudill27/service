import Item from './item.js'
import Subcategory from './subcategory.js'
import Category from './category.js'

const resp = resp => resp.json();
const main = document.querySelector('main');


class ItemsAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.addBtn = document.createElement('h2')
        this.addBtn.innerText = 'Add Item';
        this.addBtn.addEventListener('click', this.beginItemCreate)
        const aside = document.querySelector('aside')
        aside.appendChild(this.addBtn);
    }

    getItems = () => {
        fetch(this.baseUrl)
        .then(resp)
        .then(this.renderItems)
    }

    renderItems(items) {
        items.forEach(Item.createFromObject)
    }

    beginItemCreate = () => {
        // Render form then add event listeners
        main.innerHTML = Item.newItemForm;
        this.addBtn = document.getElementById('add-item');
        this.addBtn.addEventListener('click', this.createItemRequest);
    }

    renderNewItemForm = () => {

    }

    createItemRequest = () => {
        const itemObj = this.prepPostRequestObj()

        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(itemObj)
        }

        fetch(this.baseUrl, configObj)
        .then(resp)
        .then(Item.create)
    }

    prepPostRequestObj() {
        const inputs = document.querySelectorAll('input')
        const name = inputs[0].value
        const price = inputs[1].value
        const categoryName = inputs[2].value
        const category = Category.findByName(categoryName)
        const subcategory = Subcategory.findByNameAndCategoryId(inputs[3].value, category.id)
        return {
            name,
            price,
            subcategory_id: subcategory.id
        }    
    }
    
    handleItemDelete = e => {
        if (e.target.matches('img.delete')) {
            const itemId = e.target.parentNode.dataset.itemId
            fetch(`${this.baseUrl}/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(resp)
            .then(this.deleteItem)
        }
    }
    
    deleteItem = ({item_id}) => {
        const item = Item.findById(item_id)
        console.log(item);
        
        item.element.remove()
    }

    patchItem = itemObj => {
        const configObj = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify(itemObj)
        }
        return fetch(`${this.baseUrl}/${itemObj.id}`, configObj)
    }
}
    
const itemsAdapter = new ItemsAdapter('http://localhost:3000/items')

export default itemsAdapter