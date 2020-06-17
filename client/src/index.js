import itemsAdapter from './itemsAdapter.js';
import categoriesAdapter from './categoriesAdapter.js';

document.addEventListener('DOMContentLoaded', ()=> {
    categoriesAdapter.getCategories()
    .then(categoriesAdapter.renderSidebar);
    itemsAdapter.getItems();
});