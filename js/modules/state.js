/**
 * state.js
 * Estado central de la aplicación
 */

export const state = {
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
