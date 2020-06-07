export default class CartItem {
  constructor({id, name}) {
    this.id = id;
    this.name = name;
    this.cartItemCount = 1;

    this.element = document.createElement('div');
    this.element.setAttribute('class', 'cart-item');

    this.render();
  }

  render() {
    this.element.innerHTML = `
      <p>
        (${this.cartItemCount}) ${this.name}
      </p>  
      <img class='decrement' src='/minus.png' alt='Decrement item'>
      <img class='delete' src='/deletebutton.png' alt='Delete button'>  
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
  }

  handleDelete = () => {
    this.element.remove();
  }
}