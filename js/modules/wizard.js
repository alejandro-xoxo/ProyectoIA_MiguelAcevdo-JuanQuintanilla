/**
 * wizard.js
 * Coffee Match wizard
 */

import { state } from './state.js';
import { addToCart } from './cart.js';

export function renderWizard() {
  const container = document.getElementById('wizard-container');
  const { step } = state.wizard;

  if (step === 1) {
    container.innerHTML = `
      <div class="space-y-6 text-left animate-fade-in">
        <span class="text-[10px] font-mono uppercase text-[#e2b6ff] font-bold">Paso 1 de 3</span>
        <h4 class="font-serif text-xl sm:text-2xl font-bold text-white">¿Cómo te sientes en el día de hoy?</h4>
        <div class="grid sm:grid-cols-3 gap-4">
          ${[['cansado', 'Cansado'], ['normal', 'Normal'], ['energetico', 'Con energía']]
            .map(
              ([val, label]) => `
                <button onclick="window.wizardModule.setWizardVal('feeling', '${val}')" class="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-[#b57edc]/50 text-left text-white group"><p class="font-bold text-[#e2b6ff]">${label}</p></button>
              `,
            )
            .join('')}
        </div>
      </div>`;
  } else if (step === 2) {
    container.innerHTML = `
      <div class="space-y-6 text-left animate-fade-in">
        <span class="text-[10px] font-mono uppercase text-[#e2b6ff] font-bold">Paso 2 de 3</span>
        <h4 class="font-serif text-xl sm:text-2xl font-bold text-white">¿Qué actividad principal vas a realizar?</h4>
        <div class="grid sm:grid-cols-2 gap-4">
          ${[
            ['programar', '💻 Programar / Depurar'],
            ['estudiar', '📚 Estudiar / Investigar'],
            ['reunion', '🤝 Reunión / Brainstorming'],
            ['administrativo', '📄 Trabajo Administrativo'],
          ]
            .map(
              ([val, label]) => `
                <button onclick="window.wizardModule.setWizardVal('activity', '${val}')" class="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#b57edc]/50 text-left text-white group"><p class="font-bold text-[#e2b6ff]">${label}</p></button>
              `,
            )
            .join('')}
        </div>
      </div>`;
  } else if (step === 3) {
    container.innerHTML = `
      <div class="space-y-6 text-left animate-fade-in">
        <span class="text-[10px] font-mono uppercase text-[#e2b6ff] font-bold">Paso 3 de 3</span>
        <h4 class="font-serif text-xl sm:text-2xl font-bold text-white">¿Qué intensidad sensorial prefieres?</h4>
        <div class="grid sm:grid-cols-3 gap-4">
          ${[['suave', 'Suave'], ['media', 'Media'], ['fuerte', 'Fuerte']]
            .map(
              ([val, label]) => `
                <button onclick="window.wizardModule.setWizardVal('intensity', '${val}')" class="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-[#b57edc]/50 text-left text-white group"><p class="font-bold text-[#e2b6ff]">${label}</p></button>
              `,
            )
            .join('')}
        </div>
      </div>`;
  } else if (step === 4) {
    const rec = {
      name: 'Espresso Doble Programador',
      description: 'Choque robusto de cafeína premium.',
      price: '$9.500',
      rawPrice: 9500,
      id: 'prod-match',
      category: 'MATCH EXPERT',
      image:
        'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop&q=80',
    };
    state.wizard.recommendation = rec;
    container.innerHTML = `
      <div class="space-y-6 text-left animate-fade-in">
        <span class="text-[10px] font-mono uppercase text-[#e2b6ff] bg-[#b57edc]/10 px-3 py-1 rounded border border-[#b57edc]/25 tracking-widest font-bold">🍿 ¡VUESTRO COFFEE MATCH!</span>
        <h4 class="font-serif text-2xl font-bold text-white mt-4">${rec.name}</h4>
        <p class="text-xs text-gray-400">${rec.description}</p>
        <div class="flex gap-4 mt-6">
          <button onclick="window.wizardModule.handleAddToCart(this)" class="bg-[#b57edc] text-[#49126e] px-4 py-3 rounded font-bold text-xs uppercase">Añadir al Carrito</button>
          <button onclick="window.wizardModule.resetWizard()" class="border border-white/10 px-4 py-3 rounded text-xs text-gray-400">Reiniciar</button>
        </div>
      </div>`;
  }
}

export function setWizardVal(key, val) {
  state.wizard[key] = val;
  state.wizard.step += 1;
  renderWizard();
}

export function handleAddToCart(btnEl) {
  if (state.wizard.recommendation) {
    state.products.push(state.wizard.recommendation);
    addToCart('prod-match', btnEl);
  }
}

export function resetWizard() {
  state.wizard = {
    step: 1,
    feeling: '',
    activity: '',
    intensity: '',
    recommendation: null,
  };
  renderWizard();
}
