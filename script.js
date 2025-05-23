const products = [
  { name: "Pure Peak", price: 2.45, image: "pure-peak.jpg" },
  { name: "Adrenaline Peak", price: 2.45, image: "adrenaline-peak.jpg" },
  { name: "Happiness Peak", price: 2.45, image: "happiness-peak.jpg" },
  { name: "Courage Peak", price: 2.45, image: "courage-peak.jpg" },
  { name: "Focused Peak", price: 2.45, image: "focused-peak.jpg" },
];

const cart = {};
const grid = document.getElementById('product-grid');
const cartCount = document.getElementById('cart-count');
const totalDisplay = document.getElementById('total');

function updateCartDisplay() {
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = Object.entries(cart).reduce((sum, [name, count]) => {
    const product = products.find(p => p.name === name);
    return sum + product.price * count;
  }, 0);
  cartCount.textContent = totalItems;
 totalDisplay.textContent = total.toFixed(2) + ' CHF';
}

function addProduct(product) {
  cart[product.name] = (cart[product.name] || 0) + 1;
  updateCartDisplay();
}

function removeProduct(product) {
  if (cart[product.name]) {
    cart[product.name]--;
    if (cart[product.name] === 0) delete cart[product.name];
  }
  updateCartDisplay();
}

products.forEach(product => {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p>${product.price.toFixed(2)} CHF</p>
    <div class="button-group">
      <button onclick='removeProduct(${JSON.stringify(product)})'>-</button>
      <button onclick='addProduct(${JSON.stringify(product)})'>+</button>
    </div>
  `;
  grid.appendChild(card);
  function showCheckout() {
  document.getElementById('checkout-form').style.display = 'block';
  document.getElementById('checkout-total').textContent = 
    new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }).format(
      Object.entries(cart).reduce((sum, [name, count]) => {
        const product = products.find(p => p.name === name);
        return sum + product.price * count;
      }, 0)
    );
}

function showCheckout() {
  document.getElementById('checkout-message').style.display = 'block';
}

});
