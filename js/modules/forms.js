/**
 * forms.js
 * Manejo de los formularios de contacto y cotización
 */

import { state } from './state.js';

export function renderForms() {
  document.getElementById('contact-form-container').innerHTML = state.forms.contactSubmitted
    ? `<div class="text-center text-green-400 font-bold py-10">¡Mensaje Enviado con Éxito!</div>`
    : `<form onsubmit="window.formsModule.handleContact(event)" class="space-y-5">
          <input type="text" required placeholder="Tu nombre" class="w-full bg-[#1e2020] border border-white/10 rounded-lg px-4 py-3 text-sm text-white">
          <input type="email" required placeholder="email@ejemplo.com" class="w-full bg-[#1e2020] border border-white/10 rounded-lg px-4 py-3 text-sm text-white">
          <textarea required rows="4" placeholder="¿Cómo podemos ayudarte?" class="w-full bg-[#1e2020] border border-white/10 rounded-lg px-4 py-3 text-sm text-white"></textarea>
          <button type="submit" class="w-full py-4 rounded-lg font-bold text-xs uppercase bg-[#b57edc] text-[#49126e]">Enviar Mensaje</button>
      </form>`;

  document.getElementById('quote-form-container').innerHTML = state.forms.quoteSuccess
    ? `<div class="text-center py-8 text-green-400 font-bold">¡Propuesta Solicitada!</div>`
    : `<form onsubmit="window.formsModule.handleQuote(event)" class="space-y-4">
          <select class="w-full bg-[#121414] border border-white/10 rounded px-3 py-2 text-xs text-white"><option>Equipo (5 - 15 personas)</option></select>
          <input type="email" required placeholder="ingenieria@vuestraempresa.com" class="w-full bg-[#121414] border border-white/10 rounded px-3 py-2 text-xs text-white">
          <button type="submit" class="w-full py-3 bg-[#b57edc] text-[#49126e] rounded font-bold text-xs uppercase">Obtener Propuesta por email</button>
      </form>`;
}

export function handleContact(e) {
  e.preventDefault();
  state.forms.contactSubmitted = true;
  renderForms();
}

export function handleQuote(e) {
  e.preventDefault();
  state.forms.quoteSuccess = true;
  renderForms();
}
