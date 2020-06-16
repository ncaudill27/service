import cart from './cart.js';

export default class CartItem {
  constructor({id, name, price, currentStock}) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.currentStock = currentStock;
    this.cartItemCount = 1;
    
    this.element = document.createElement('div');
    this.element.setAttribute('class', 'cart-item');

    this.render();
  }

  render() {
    this.currentPrice = Math.round((this.cartItemCount * this.price) * 100) / 100;
    this.element.innerHTML = `
      <p>
        (${this.cartItemCount}) ${this.name}
        <br>
        <span>
          $${this.currentPrice}
        </span>
      </p>

      <img class='decrement' src='/public/minus.png' alt='Decrement item'>
      <img class='delete' src='/public/deletebutton.png' alt='Delete button'>  
    `;

    this.decrementButton = this.element.querySelector("img.decrement");
    this.decrementButton.addEventListener('click', this.decrementCartItem);

    this.deleteButton = this.element.querySelector("img.delete");
    this.deleteButton.addEventListener('click', this.handleDelete);
  }

  decrementCartItem = () => {
    if (this.cartItemCount > 0) this.cartItemCount--;
    if (this.cartItemCount === 0) this.handleDelete();
    this.render();
    cart.subtractFromTotal(this.price);
  }

  handleDelete = () => {
    cart.subtractFromTotal(this.currentPrice);
    this.element.remove();
    this.cartItemCount = 0;
  }
}