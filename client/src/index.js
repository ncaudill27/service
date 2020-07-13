import itemsAdapter from './itemsAdapter.js';
import categoriesAdapter from './categoriesAdapter.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log(document.querySelector('aside'));
    categoriesAdapter.getCategories()
    .then(categoriesAdapter.renderSidebar);
    itemsAdapter.getItems();
});