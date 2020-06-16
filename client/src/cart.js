class Cart {
  constructor() {

    this.element = document.querySelector('.cart');
    // Only displays a cart if it contains items
    this.element.style.display = document.querySelector('.cart-item') ? 'block' : 'none';

    this.subtotal = document.createElement('div');
    this.subtotal.className = 'subtotal'

    this.currentPrice = 0;
  }

  renderSubtotal = () => {
    const currentPrice = Math.round(this.currentPrice * 100) / 100;
    this.subtotal.innerHTML = `
      <div class='content'>
        <strong>Subtotal</strong>
        <span>$${currentPrice}</span>
      </div>
    `;
    console.log(this.subtotal);
    
    this.element.appendChild(this.subtotal);
  }

  renderCartItem = item => {
    this.element.style.display = 'block';
    this.element.appendChild(item);
  }

  addToTotal = ({price}) => {
    this.currentPrice += price;
    this.renderSubtotal();
  }
}

const cart = new Cart();

export default cart;