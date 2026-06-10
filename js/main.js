/**
 * main.js
 * Punto de entrada modular para la aplicación
 */

import { state } from './modules/state.js';
import { renderCatalog, handleAddToCart } from './modules/catalog.js';
import { toggleCart, removeFromCart, handleCheckout } from './modules/cart.js';
import { renderWizard, setWizardVal, handleAddToCart as wizardAddToCart, resetWizard } from './modules/wizard.js';
import { renderForms, handleContact, handleQuote } from './modules/forms.js';
import { scrollToSection, toggleMobileMenu, setupScrollSpy } from './modules/navigation.js';

window.appState = state;

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  renderCatalog();
  renderWizard();
  renderForms();
  setupScrollSpy();

  window.scrollToSection = scrollToSection;
  window.toggleCart = toggleCart;
  window.toggleMobileMenu = toggleMobileMenu;

  window.cartModule = {
    handleRemoveFromCart: removeFromCart,
    handleCheckout,
  };

  window.catalogModule = {
    handleAddToCart,
  };

  window.wizardModule = {
    setWizardVal,
    handleAddToCart: wizardAddToCart,
    resetWizard,
  };

  window.formsModule = {
    handleContact,
    handleQuote,
  };
});
