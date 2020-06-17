class Cart {
  constructor() {

    this.element = document.querySelector('.cart');
    this.element.style.display = 'none'

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
    
    this.element.appendChild(this.subtotal);
  }

  renderCartItem = item => {
    this.element.style.display = 'block';
    this.element.appendChild(item);
  }

  addNewItem = item => {
    const display = this.element.style.display;

    if (display === 'none') this.element.style.display = 'block';
    this.addToTotal(item);
    this.element.appendChild(item.element);
  }

  addToTotal = ({price}) => {
    this.currentPrice += price;
    this.renderSubtotal();
  }

  subtractFromTotal = price => {
    this.currentPrice -= price;
    this.renderSubtotal();
    if (this.currentPrice === 0) this.element.style.display = 'none';
  }
}

const cart = new Cart();

export default cart;