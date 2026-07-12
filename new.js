let items = [];

let countBox = document.getElementById('cartCount');
let list = document.getElementById('cartItems');
let total = document.getElementById('cartTotal');
let dave = document.getElementById('toastNote');

function formatPrice(num) {
  return '$' + num.toFixed(2);
}

function showToast(text) {
  if (!dave) ;
  dave.textContent = text;
  dave.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(function () {
    dave.classList.remove('show');
  }, 1800);
}

function findItemByName(name) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].name === name) {
      return items[i];
    }
  }
  return;
}

function renderCart() {
  let text = '<p class="mt-3">Your bag is empty.</p>';
  let sum = 0;
  let qty = 0;

  if (items.length > 0) {
    text = '';
    for (let i = 0; i < items.length; i++) {
      let chunk = items[i];
      let lineTotal = chunk.price * chunk.qty;
      sum += lineTotal;
      qty += chunk.qty;

      text += '<div class="cart-item">';
      text += '  <span>' + chunk.name + ' <strong>x' + chunk.qty + '</strong></span>';
      text += '  <span>' + formatPrice(lineTotal) + ' <i class="bi bi-x-lg remove" data-index="' + i + '"></i></span>';
      text += '</div>';
    }
  }

  list.innerHTML = text;
  total.textContent = formatPrice(sum);
  countBox.textContent = qty;
}

function addToCart(name, price) {
  let existing = findItemByName(name);

  if (existing) {
    existing.qty += 1;
  } else {
    items.push({ name: name, price: price, qty: 1 });
  }

  renderCart();
  showToast(name + ' added to bag');
}

function removeFromCart(index) {
  items.splice(index, 1);
  renderCart();
}

let cartButtons = document.querySelectorAll('.cart');
for (let b = 0; b < cartButtons.length; b++) {
  cartButtons[b].addEventListener('click', function () {
    let name = this.dataset.name;
    let price = parseFloat(this.dataset.price);
    addToCart(name, price);
  });
}

list.addEventListener('click', function (e) {
  if (e.target.classList.contains('remove')) {
    let index = e.target.dataset.index;
    removeFromCart(index);
  }
});

function pay() {
  if (items.length === 0) {
    showToast('Your bag is empty');
    return;
  }

  let message = 'Hi, I would like to order:%0A';
  for (let i = 0; i < items.length; i++) {
    let chunk = items[i];
    message += chunk.name + ' x' + chunk.qty + ' - ' + formatPrice(chunk.price * chunk.qty) + '%0A';
  }

  window.open('https://wa.me/?text=' + message, '_blank');
}

renderCart();