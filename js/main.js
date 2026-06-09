const state = {
  cart: [],
  isCartOpen: false,
  isMobileMenuOpen: false,
  wizard: {
    step: 1,
    feeling: "",
    activity: "",
    intensity: "",
    recommendation: null,
  },
  forms: {
    contactSubmitting: false,
    contactSubmitted: false,
    quoteSuccess: false,
  },
  products: [
    {
      id: "prod-frappe",
      name: "Frappé de Caramelo",
      price: "$13.500",
      rawPrice: 13500,
      description:
        "Inyección helada de cafeína de especialidad licuada con caramelo artesanal de Santander.",
      category: "BEBIDA FRÍA",
      image:
        "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80",
      notes: ["Caramelo", "Cremoso", "Hielo"],
    },
    {
      id: "prod-granizado",
      name: "Granizado de Café Clásico",
      price: "$11.500",
      rawPrice: 11500,
      description:
        "Nuestra infusión selectiva de Santander granizada al punto ideal.",
      category: "BEBIDA FRÍA",
      image:
        "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80",
      notes: ["Fresco", "Café Concentrado"],
    },
    {
      id: "prod-cappuccino",
      name: "Cappuccino Tradicional",
      price: "$8.500",
      rawPrice: 8500,
      description:
        "Equilibrio supremo de un shot doble de espresso de origen y una aterciopelada microespuma.",
      category: "BEBIDA CALIENTE",
      image:
        "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop&q=80",
      notes: ["Balanceado", "Microespuma"],
    },
    {
      id: "prod-moca-blanco",
      name: "Moca Blanco",
      price: "$9.500",
      rawPrice: 9500,
      description:
        "Un espresso robusto fundido con chocolate blanco de origen sostenible y leche al vapor.",
      category: "BEBIDA CALIENTE",
      image:
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80",
      notes: ["Chocolate Blanco", "Espresso"],
    },
    {
      id: "prod-galleta",
      name: "Galleta Artesanal",
      price: "$5.500",
      rawPrice: 5500,
      description:
        "Galleta recién horneada con chispas de cacao Santandereano al 70%.",
      category: "REPOSTERÍA",
      image:
        "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop&q=80",
      notes: ["Cacao 70%", "Centro Meloso"],
    },
    {
      id: "prod-croissant",
      name: "Croissant de Almendras",
      price: "$7.500",
      rawPrice: 7500,
      description:
        "Hojaldre crujiente elaborado con mantequilla premium y frangipane.",
      category: "REPOSTERÍA",
      image:
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80",
      notes: ["Almendras", "Hojaldre"],
    },
  ],
};

// 2. INICIALIZACIÓN
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  renderCatalog();
  renderWizard();
  renderForms();
  setupScrollSpy();
});

// 3. RENDERIZADO DEL DOM Y CONTROLADORES
function renderCatalog() {
  const container = document.getElementById("catalog-grid");
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
                                ${p.notes.map((note) => `<span class="inline-flex items-center gap-1 bg-white border border-[#988d9b]/35 px-2.5 py-1 rounded-full text-[10px] font-semibold text-[#474646] font-mono">${note}</span>`).join("")}
                            </div>
                        </div>
                        <button onclick="addToCart('${p.id}', this)" class="w-full mt-6 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all bg-[#b57edc]/90 hover:bg-[#b57edc] text-[#49126e] flex items-center justify-center gap-2">
                            Añadir al carrito
                        </button>
                    </div>
                </article>
            `,
    )
    .join("");
  lucide.createIcons();
}

// Lógica de Carrito
function addToCart(productId, btnEl) {
  const product =
    state.products.find((p) => p.id === productId) || state.products[0];
  const existingItem = state.cart.find((i) => i.product.id === productId);
  if (existingItem) existingItem.quantity += 1;
  else state.cart.push({ product, quantity: 1 });

  // UI Feedback
  if (btnEl) {
    const oldText = btnEl.innerHTML;
    btnEl.innerHTML = `¡Añadido!`;
    btnEl.classList.add("bg-green-600", "text-white");
    setTimeout(() => {
      btnEl.innerHTML = oldText;
      btnEl.classList.remove("bg-green-600", "text-white");
    }, 1500);
  }
  updateCartUI();
}

function removeFromCart(productId) {
  state.cart = state.cart
    .map((i) =>
      i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i,
    )
    .filter((i) => i.quantity > 0);
  updateCartUI();
}

function toggleCart() {
  state.isCartOpen = !state.isCartOpen;
  document.getElementById("cart-overlay").classList.toggle("hidden-vanilla");
  updateCartUI();
}

function updateCartUI() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.cart.reduce(
    (sum, item) => sum + item.product.rawPrice * item.quantity,
    0,
  );

  const badge = document.getElementById("cart-badge");
  if (totalItems > 0) {
    badge.textContent = totalItems;
    badge.classList.remove("hidden-vanilla");
  } else {
    badge.classList.add("hidden-vanilla");
  }

  const content = document.getElementById("cart-content");
  const footer = document.getElementById("cart-footer");

  if (state.cart.length === 0) {
    content.innerHTML = `<div class="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400"><p class="text-sm">Vuestro pedido esta vacío.</p></div>`;
    footer.classList.add("hidden-vanilla");
  } else {
    content.innerHTML = state.cart
      .map(
        (item) => `
                    <div class="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/5">
                        <div class="flex-1 min-w-0">
                            <div class="flex justify-between"><h4 class="font-semibold text-sm text-white">${item.product.name}</h4><p class="text-sm font-semibold text-[#e2b6ff]">${item.product.price}</p></div>
                            <p class="text-xs text-gray-400">Cantidad: ${item.quantity}</p>
                        </div>
                        <button onclick="removeFromCart('${item.product.id}')" class="text-red-400 p-2"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                    </div>
                `,
      )
      .join("");
    footer.innerHTML = `
                    <div class="flex justify-between text-base"><span class="text-gray-400">Total aprox:</span><span class="font-bold text-xl text-[#e2b6ff] font-mono">$${totalPrice.toLocaleString("es-CO")} COP</span></div>
                    <button onclick="alert('Funcionalidad de pago simulada completada.'); state.cart=[]; updateCartUI(); toggleCart();" class="w-full bg-[#b57edc] text-[#49126e] py-3 rounded-lg font-bold text-sm uppercase">Confirmar y Encargar</button>
                `;
    footer.classList.remove("hidden-vanilla");
  }
  lucide.createIcons();
}

// Lógica Wizard Coffee Match
function renderWizard() {
  const container = document.getElementById("wizard-container");
  const { step, recommendation } = state.wizard;

  if (step === 1) {
    container.innerHTML = `
                    <div class="space-y-6 text-left animate-fade-in">
                        <span class="text-[10px] font-mono uppercase text-[#e2b6ff] font-bold">Paso 1 de 3</span>
                        <h4 class="font-serif text-xl sm:text-2xl font-bold text-white">¿Cómo te sientes en el día de hoy?</h4>
                        <div class="grid sm:grid-cols-3 gap-4">
                            ${[
                              ["cansado", "Cansado"],
                              ["normal", "Normal"],
                              ["energetico", "Con energía"],
                            ]
                              .map(
                                ([val, label]) => `
                                <button onclick="setWizardVal('feeling', '${val}')" class="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-[#b57edc]/50 text-left text-white group"><p class="font-bold text-[#e2b6ff]">${label}</p></button>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>`;
  } else if (step === 2) {
    container.innerHTML = `
                    <div class="space-y-6 text-left animate-fade-in">
                        <span class="text-[10px] font-mono uppercase text-[#e2b6ff] font-bold">Paso 2 de 3</span>
                        <h4 class="font-serif text-xl sm:text-2xl font-bold text-white">¿Qué actividad principal vas a realizar?</h4>
                        <div class="grid sm:grid-cols-2 gap-4">
                            ${[
                              ["programar", "💻 Programar / Depurar"],
                              ["estudiar", "📚 Estudiar / Investigar"],
                              ["reunion", "🤝 Reunión / Brainstorming"],
                              ["administrativo", "📄 Trabajo Administrativo"],
                            ]
                              .map(
                                ([val, label]) => `
                                <button onclick="setWizardVal('activity', '${val}')" class="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#b57edc]/50 text-left text-white group"><p class="font-bold text-[#e2b6ff]">${label}</p></button>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>`;
  } else if (step === 3) {
    container.innerHTML = `
                    <div class="space-y-6 text-left animate-fade-in">
                        <span class="text-[10px] font-mono uppercase text-[#e2b6ff] font-bold">Paso 3 de 3</span>
                        <h4 class="font-serif text-xl sm:text-2xl font-bold text-white">¿Qué intensidad sensorial prefieres?</h4>
                        <div class="grid sm:grid-cols-3 gap-4">
                            ${[
                              ["suave", "Suave"],
                              ["media", "Media"],
                              ["fuerte", "Fuerte"],
                            ]
                              .map(
                                ([val, label]) => `
                                <button onclick="setWizardVal('intensity', '${val}')" class="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-[#b57edc]/50 text-left text-white group"><p class="font-bold text-[#e2b6ff]">${label}</p></button>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>`;
  } else if (step === 4) {
    // Mock Recommendation Logic
    const rec = {
      name: "Espresso Doble Programador",
      description: "Choque robusto de cafeína premium.",
      price: "$9.500",
      rawPrice: 9500,
      id: "prod-match",
      category: "MATCH EXPERT",
      image:
        "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop&q=80",
    };
    state.wizard.recommendation = rec;
    container.innerHTML = `
                    <div class="space-y-6 text-left animate-fade-in">
                        <span class="text-[10px] font-mono uppercase text-[#e2b6ff] bg-[#b57edc]/10 px-3 py-1 rounded border border-[#b57edc]/25 tracking-widest font-bold">🍿 ¡VUESTRO COFFEE MATCH!</span>
                        <h4 class="font-serif text-2xl font-bold text-white mt-4">${rec.name}</h4>
                        <p class="text-xs text-gray-400">${rec.description}</p>
                        <div class="flex gap-4 mt-6">
                            <button onclick="addToCart('prod-match', this); state.products.push(state.wizard.recommendation)" class="bg-[#b57edc] text-[#49126e] px-4 py-3 rounded font-bold text-xs uppercase">Añadir al Carrito</button>
                            <button onclick="state.wizard.step=1; renderWizard()" class="border border-white/10 px-4 py-3 rounded text-xs text-gray-400">Reiniciar</button>
                        </div>
                    </div>
                `;
  }
}

function setWizardVal(key, val) {
  state.wizard[key] = val;
  state.wizard.step += 1;
  renderWizard();
}

// Formularios
function renderForms() {
  // Contact
  document.getElementById("contact-form-container").innerHTML = state.forms
    .contactSubmitted
    ? `<div class="text-center text-green-400 font-bold py-10">¡Mensaje Enviado con Éxito!</div>`
    : `<form onsubmit="handleContact(event)" class="space-y-5">
                    <input type="text" required placeholder="Tu nombre" class="w-full bg-[#1e2020] border border-white/10 rounded-lg px-4 py-3 text-sm text-white">
                    <input type="email" required placeholder="email@ejemplo.com" class="w-full bg-[#1e2020] border border-white/10 rounded-lg px-4 py-3 text-sm text-white">
                    <textarea required rows="4" placeholder="¿Cómo podemos ayudarte?" class="w-full bg-[#1e2020] border border-white/10 rounded-lg px-4 py-3 text-sm text-white"></textarea>
                    <button type="submit" class="w-full py-4 rounded-lg font-bold text-xs uppercase bg-[#b57edc] text-[#49126e]">Enviar Mensaje</button>
                </form>`;

  // Quote (Desk-Delivery)
  document.getElementById("quote-form-container").innerHTML = state.forms
    .quoteSuccess
    ? `<div class="text-center py-8 text-green-400 font-bold">¡Propuesta Solicitada!</div>`
    : `<form onsubmit="handleQuote(event)" class="space-y-4">
                    <select class="w-full bg-[#121414] border border-white/10 rounded px-3 py-2 text-xs text-white"><option>Equipo (5 - 15 personas)</option></select>
                    <input type="email" required placeholder="ingenieria@vuestraempresa.com" class="w-full bg-[#121414] border border-white/10 rounded px-3 py-2 text-xs text-white">
                    <button type="submit" class="w-full py-3 bg-[#b57edc] text-[#49126e] rounded font-bold text-xs uppercase">Obtener Propuesta por email</button>
                </form>`;
}

function handleContact(e) {
  e.preventDefault();
  state.forms.contactSubmitted = true;
  renderForms();
}
function handleQuote(e) {
  e.preventDefault();
  state.forms.quoteSuccess = true;
  renderForms();
}

// Navegación
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}
function toggleMobileMenu() {
  document.getElementById("mobile-menu").classList.toggle("hidden-vanilla");
}

// Scroll Spy para Navegación Activa
function setupScrollSpy() {
  window.addEventListener("scroll", () => {
    const sections = [
      "inicio",
      "nosotros",
      "catalogo",
      "innovacion",
      "contacto",
    ];
    const scrollPos = window.scrollY + 200;
    sections.forEach((sec) => {
      const el = document.getElementById(sec);
      if (
        el &&
        scrollPos >= el.offsetTop &&
        scrollPos < el.offsetTop + el.offsetHeight
      ) {
        document
          .querySelectorAll(".nav-link")
          .forEach((btn) => btn.classList.remove("text-[#e2b6ff]"));
        const activeBtn = document.querySelector(
          `.nav-link[data-target="${sec}"]`,
        );
        if (activeBtn) activeBtn.classList.add("text-[#e2b6ff]");
      }
    });
  });
}
