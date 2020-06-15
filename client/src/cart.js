class Cart {
  constructor() {

    this.element = document.querySelector('.cart');
    // Only displays a cart if it contains items
    this.element.style.display = document.querySelector('.cart-item') ? 'block' : 'none';

    this.renderSubtotal();
  }

  renderSubtotal = () => {
    const subtotal = document.createElement('div');
    subtotal.className = 'subtotal'
    subtotal.innerHTML = `
    <div class='content'>
        <strong>Subtotal</strong>
        <span>$XX.XX</span>
    </div>
    `;
    console.log(subtotal);
    
    this.element.appendChild(subtotal);
  }

  renderCartItem = item => {
    console.log('here');
    this.element.appendChild(item);
  }
}

const cart = new Cart()

export default cart;