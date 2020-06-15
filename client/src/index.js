import itemsAdapter from './itemsAdapter.js';
import categoriesAdapter from './categoriesAdapter.js';

document.addEventListener('DOMContentLoaded', ()=> {
    categoriesAdapter.getCategories();
    itemsAdapter.getItems();
});