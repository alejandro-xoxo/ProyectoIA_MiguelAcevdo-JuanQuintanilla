/**
 * cart.js
 * Lógica del carrito de compras
 */

import { state } from './state.js';

export function addToCart(productId, btnEl) {
  const product = state.products.find((p) => p.id === productId) || state.products[0];
  const existingItem = state.cart.find((i) => i.product.id === productId);
  if (existingItem) existingItem.quantity += 1;
  else state.cart.push({ product, quantity: 1 });

  if (btnEl) {
    const oldText = btnEl.innerHTML;
    btnEl.innerHTML = '¡Añadido!';
    btnEl.classList.add('bg-green-600', 'text-white');
    setTimeout(() => {
      btnEl.innerHTML = oldText;
      btnEl.classList.remove('bg-green-600', 'text-white');
    }, 1500);
  }
  updateCartUI();
}

export function removeFromCart(productId) {
  state.cart = state.cart
    .map((i) =>
      i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i,
    )
    .filter((i) => i.quantity > 0);
  updateCartUI();
}

export function toggleCart() {
  state.isCartOpen = !state.isCartOpen;
  document.getElementById('cart-overlay').classList.toggle('hidden-vanilla');
  updateCartUI();
}

export function updateCartUI() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.cart.reduce(
    (sum, item) => sum + item.product.rawPrice * item.quantity,
    0,
  );

  const badge = document.getElementById('cart-badge');
  if (totalItems > 0) {
    badge.textContent = totalItems;
    badge.classList.remove('hidden-vanilla');
  } else {
    badge.classList.add('hidden-vanilla');
  }

  const content = document.getElementById('cart-content');
  const footer = document.getElementById('cart-footer');

  if (state.cart.length === 0) {
    content.innerHTML = `<div class="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400"><p class="text-sm">Vuestro pedido esta vacío.</p></div>`;
    footer.classList.add('hidden-vanilla');
  } else {
    content.innerHTML = state.cart
      .map(
        (item) => `
                    <div class="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/5">
                        <div class="flex-1 min-w-0">
                            <div class="flex justify-between"><h4 class="font-semibold text-sm text-white">${item.product.name}</h4><p class="text-sm font-semibold text-[#e2b6ff]">${item.product.price}</p></div>
                            <p class="text-xs text-gray-400">Cantidad: ${item.quantity}</p>
                        </div>
                        <button onclick="window.cartModule.handleRemoveFromCart('${item.product.id}')" class="text-red-400 p-2"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                    </div>
                `,
      )
      .join('');
    footer.innerHTML = `
                    <div class="flex justify-between text-base"><span class="text-gray-400">Total aprox:</span><span class="font-bold text-xl text-[#e2b6ff] font-mono">$${totalPrice.toLocaleString('es-CO')} COP</span></div>
                    <button onclick="window.cartModule.handleCheckout()" class="w-full bg-[#b57edc] text-[#49126e] py-3 rounded-lg font-bold text-sm uppercase">Confirmar y Encargar</button>
                `;
    footer.classList.remove('hidden-vanilla');
  }
  lucide.createIcons();
}

export function handleRemoveFromCart(productId) {
  removeFromCart(productId);
}

export function handleCheckout() {
  alert('Funcionalidad de pago simulada completada.');
  state.cart = [];
  updateCartUI();
  toggleCart();
}
