// NAV smooth scroll & hamburger
const navLinks = document.querySelectorAll('.nav-links a');
const navList = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    navList.classList.remove('active');
  });
});
hamburger && hamburger.addEventListener('click', () => navList.classList.toggle('active'));

// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');
function handleFade() {
  faders.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 90) el.classList.add('show');
  });
}
window.addEventListener('scroll', handleFade);
handleFade();


// 🛒 CART FUNCTIONALITY (your existing cart code)
const openCartBtn = document.getElementById('openCart');
const cartPanel = document.getElementById('cartPanel');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal') || document.createElement('span');
const cartCountEl = document.getElementById('cartCount');

let cart = [];

function updateCartUI() {
  if(!cartItemsEl) return;
  cartItemsEl.innerHTML = '';

  if(cart.length === 0){
    cartItemsEl.innerHTML = '<p class="empty">Your cart is empty.</p>';
    if(cartTotalEl) cartTotalEl.textContent = '0.00';
    if(cartCountEl) cartCountEl.textContent = '0';
    return;
  }

  let total = 0, count = 0;
  cart.forEach((it, idx) => {
    total += it.price * it.qty;
    count += it.qty;
    const row = document.createElement('div');
    row.className = 'cart-row';
    row.innerHTML = `
      <img src="${it.img}" alt="${it.name}" />
      <div class="cart-item-name">${it.name}</div>
      <div class="cart-item-qty">x${it.qty}</div>
      <div class="cart-item-price">$${(it.price * it.qty).toFixed(2)}</div>
      <button class="remove-item" data-index="${idx}">Remove</button>
    `;
    cartItemsEl.appendChild(row);
  });

  if(cartTotalEl) cartTotalEl.textContent = total.toFixed(2);
  if(cartCountEl) cartCountEl.textContent = count;

document.querySelectorAll('.remove-item').forEach(btn => {
  btn.addEventListener('click', e => {
    const i = +e.currentTarget.dataset.index;
    if (cart[i].qty > 1) {
      cart[i].qty -= 1; // decrease quantity by one
    } else {
      cart.splice(i, 1); // remove only if last quantity
    }
    updateCartUI();
  });
});

}

// Add-to-cart (with quantity support)
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    const card = btn.closest('.product-card');
    const img = card ? (card.querySelector('img') ? card.querySelector('img').src : '') : '';

    const existing = cart.find(it => it.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, img, qty: 1 });
    }

    updateCartUI();
    cartPanel.classList.add('open');
  });
});

openCartBtn && openCartBtn.addEventListener('click', ()=> cartPanel.classList.add('open'));
closeCartBtn && closeCartBtn.addEventListener('click', ()=> cartPanel.classList.remove('open'));

// 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
// 🔍 SEARCH MODAL FUNCTIONALITY — ADD THIS PART **HERE**
const searchIcon = document.querySelector('#searchIcon');
const searchModal = document.querySelector('#searchModal');
const modalSearchInput = document.querySelector('#modalSearchInput');
const modalSearchBtn = document.querySelector('#modalSearchBtn');

if (searchIcon && searchModal && modalSearchInput && modalSearchBtn) {
  // Open modal
  searchIcon.addEventListener('click', () => {
    searchModal.classList.add('active');
    modalSearchInput.focus();
  });

  // Close when clicking outside or pressing Escape
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      searchModal.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchModal.classList.remove('active');
    }
  });

  // Demo search action
  modalSearchBtn.addEventListener('click', () => {
    alert(`Searching for: ${modalSearchInput.value}`);
    // Backend API integration can go here later
  });
}
// 🔍 END SEARCH MODAL SECTION
// 👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆


// 👤 LOGIN MODAL
const openLogin = document.getElementById('openLogin');
const loginModal = document.getElementById('loginModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const closeLogin = document.getElementById('closeLogin');

function showLogin() {
  modalBackdrop.classList.add('active');
  loginModal.style.display = 'block';
  modalBackdrop.style.display = 'block';
}
function hideLogin() {
  modalBackdrop.classList.remove('active');
  loginModal.style.display = 'none';
  modalBackdrop.style.display = 'none';
}

openLogin && openLogin.addEventListener('click', showLogin);
closeLogin && closeLogin.addEventListener('click', hideLogin);
modalBackdrop && modalBackdrop.addEventListener('click', hideLogin);

// Footer year
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

// Initialize cart UI
updateCartUI();

// 🖼️ 3D Hero Image Interaction
const heroImg = document.querySelector('.hero-img');

if (heroImg) {
  heroImg.addEventListener('mousemove', (e) => {
    const rect = heroImg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    heroImg.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  heroImg.addEventListener('mouseleave', () => {
    heroImg.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
}

