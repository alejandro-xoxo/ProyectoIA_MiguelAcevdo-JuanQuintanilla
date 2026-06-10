/**
 * catalog.js
 * Renderizado del catálogo de productos
 */

import { state } from './state.js';
import { addToCart } from './cart.js';

export function renderCatalog() {
  const container = document.getElementById('catalog-grid');
  container.innerHTML = state.products
    .map(
      (p) => `
        <article class="flex flex-col group rounded-xl overflow-hidden shadow-2xl border border-white/5 bg-[#121414] hover:border-[#b57edc]/30">
            <div class="relative overflow-hidden aspect-[4/5] bg-[#1a1c1c] shrink-0">
                <img src="${p.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[10%] group-hover:grayscale-0">
                <span class="absolute top-4 left-4 bg-[#b57edc] text-[#49126e] text-[10px] font-mono font-bold tracking-widest px-3 py-1.5 rounded-full shadow-lg">${p.category}</span>
            </div>
            <div class="bg-[#F4F4F4] p-6 flex flex-col justify-between flex-grow text-gray-900 border-t border-white/10">
                <div class="space-y-4">
                    <div class="flex justify-between items-start gap-2">
                        <h3 class="font-serif text-lg font-bold text-[#2f3131] group-hover:text-[#49126e]">${p.name}</h3>
                        <span class="font-mono text-sm font-bold text-gray-800 bg-[#e5e2e1] px-2.5 py-1 rounded">${p.price}</span>
                    </div>
                    <p class="text-xs text-gray-600 leading-relaxed min-h-[48px]">${p.description}</p>
                    <div class="flex flex-wrap gap-2 pt-1">
                        ${p.notes
                          .map(
                            (note) => `
                                <span class="inline-flex items-center gap-1 bg-white border border-[#988d9b]/35 px-2.5 py-1 rounded-full text-[10px] font-semibold text-[#474646] font-mono">${note}</span>
                            `,
                          )
                          .join('')}
                    </div>
                </div>
                <button onclick="window.catalogModule.handleAddToCart('${p.id}', this)" class="w-full mt-6 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all bg-[#b57edc]/90 hover:bg-[#b57edc] text-[#49126e] flex items-center justify-center gap-2">
                    Añadir al carrito
                </button>
            </div>
        </article>
    `,
    )
    .join('');
  lucide.createIcons();
}

export function handleAddToCart(productId, btnEl) {
  addToCart(productId, btnEl);
}
