// ============================================================
//  MA BOULANGERIE CONNECTÉE — APP LOGIC
// ============================================================

// ============================================================
// STATE
// ============================================================
const state = {
  farine: 'complet',
  objectif: 'muscle',
  ingredients: [],
  size: 'M',
  deliveryMode: 'retrait',
  paymentMode: 'card',
  currentOrder: null,
};

// ============================================================
// TRANSLATIONS
// ============================================================
const translations = {
  fr: {
    nav_home: "Accueil",
    nav_config: "Configurateur",
    nav_orders: "Mes Commandes",
    nav_contact: "Contact",
    nav_cta: "Créer mon pain",
    hero_badge: "🌿 100% Naturel · Artisanal · Santé",
    hero_title: "Votre pain,<br/><span class=\"gradient-text\">votre performance.</span>",
    hero_subtitle: "Composez un pain artisanal sur-mesure selon vos objectifs santé. Calcul nutritionnel en temps réel, livraison ou retrait express.",
    hero_cta: "🍞 Créer mon pain",
    hero_discover: "Découvrir →",
    stat_farines: "Farines disponibles",
    stat_ingredients: "Ingrédients santé",
    stat_order_time: "Pour commander",
    section_why: "Pourquoi choisir <span class=\"gradient-text\">Ma Boulangerie</span> ?",
    feat_config_title: "Configurateur Intelligent",
    feat_config_desc: "Choisissez votre base, vos objectifs et vos ingrédients. Les valeurs nutritionnelles se calculent instantanément.",
    feat_nutrition_title: "Calcul Nutritionnel Précis",
    feat_nutrition_desc: "Chaque gramme de protéines, glucides et lipides est calculé en temps réel selon votre recette unique.",
    feat_allergens_title: "Gestion des Allergènes",
    feat_allergens_desc: "Alertes visuelles dynamiques pour le gluten, les noix et les produits laitiers. Votre sécurité au premier plan.",
    feat_delivery_title: "Retrait ou Livraison",
    feat_delivery_desc: "Click & Collect express ou livraison à domicile avec choix du créneau. Simple, rapide, fiable.",
    section_steps: "Commander en <span class=\"gradient-text\">3 étapes</span>",
    step1_title: "Configurez votre pain",
    step1_desc: "Choisissez la farine, les ingrédients santé et vos objectifs nutritionnels.",
    step2_title: "Validez et payez",
    step2_desc: "Renseignez vos infos, choisissez livraison ou retrait, et payez en toute sécurité.",
    step3_title: "Récupérez votre pain",
    step3_desc: "Recevez votre confirmation par email et savourez votre pain artisanal unique.",
    btn_start_now: "Commencer maintenant 🚀",
    config_page_title: "🍞 Configurateur",
    config_page_subtitle: "Créez votre pain parfait",
    step_farine: "Choisissez votre farine",
    step_objectif: "Votre objectif santé",
    step_boosts: "Ingrédients \"Boost\"",
    config_hint: "Sélectionnez jusqu'à 4 ingrédients",
    step_size: "Taille de la miche",
    config_allergen_alert: "⚠️ Allergènes détectés",
    config_recipe_name: "💾 Nommer ma recette (optionnel)",
    config_recipe_placeholder: "Ex: \"Mon Pain Marathon\"",
    btn_validate_config: "Valider ma configuration →",
    preview_title: "Votre pain personnalisé",
    preview_macros_title: "📊 Valeurs nutritionnelles <small>(pour 100g)</small>",
    macro_calories: "🔥 Calories",
    macro_proteins: "💪 Protéines",
    macro_carbs: "⚡ Glucides",
    macro_lipids: "🥑 Lipides",
    macro_fibers: "🌿 Fibres",
    summary_base: "Base",
    summary_goal: "Objectif",
    summary_boosts: "Boosts",
    summary_size: "Taille",
    summary_total: "Total",
    checkout_back_btn: "← Modifier ma recette",
    checkout_page_title: "📋 Finaliser ma commande",
    form_info_title: "👤 Vos informations",
    form_label_firstname: "Prénom *",
    form_label_lastname: "Nom *",
    form_label_email: "Email *",
    form_label_phone: "Téléphone *",
    delivery_title: "🚚 Mode de livraison",
    delivery_click_collect: "Click & Collect",
    delivery_cc_desc: "Retrait en boutique · Gratuit",
    delivery_home: "Livraison à domicile",
    delivery_home_desc: "+2,50€ · Dans la journée",
    form_label_address: "Adresse de livraison *",
    form_label_slot: "Créneau *",
    slot_placeholder: "-- Choisir un créneau --",
    payment_title: "💳 Paiement sécurisé",
    payment_card: "💳 Carte Bancaire",
    payment_secure_hint: "🔒 Paiement 100% sécurisé · Données chiffrées SSL",
    btn_confirm_order: "✅ Confirmer ma commande",
    summary_recap_title: "🧾 Récapitulatif",
    summary_to_pay: "Total à régler",
    conf_title: "Commande confirmée !",
    conf_subtitle: "Merci pour votre commande. Un email de confirmation a été envoyé à ",
    conf_order_num: "Commande N° ",
    conf_qr_hint: "Présentez ce QR Code lors de votre retrait en boutique",
    btn_save_recipe: "💾 Sauvegarder cette recette",
    btn_new_order: "🍞 Nouvelle commande",
    conf_resend_email: "Email non reçu ? ",
    conf_resend_link: "Renvoyer l'email →",
    conf_rating_title: "Votre avis compte 🌟",
    orders_page_title: "📦 Mes Commandes & Favoris",
    orders_page_subtitle: "Retrouvez vos dernières commandes et recettes sauvegardées",
    history_title: "🕐 Historique récent",
    favs_title: "💾 Mes recettes favorites",
    empty_history: "Aucune commande pour le moment.",
    empty_favs: "Aucune recette sauvegardée.",
    btn_first_order: "Créer ma première commande",
    modal_save_title: "💾 Sauvegarder la recette",
    modal_save_desc: "Donnez un nom à votre recette pour la retrouver facilement.",
    modal_btn_cancel: "Annuler",
    modal_btn_save: "Sauvegarder ✅",
    toast_max_ing: "⚠️ Maximum 4 ingrédients boost autorisés.",
    toast_order_success: "✅ Commande confirmée ! Email envoyé.",
    toast_fav_success: "💾 Recette sauvegardée !",
    farine_complet: "Blé Complet",
    farine_epeautre: "Épeautre",
    farine_sansgluten: "Sans Gluten",
    farine_seigle: "Seigle",
    farine_avoine: "Avoine",
    farine_multicereale: "Multicéréales",
    obj_muscle: "Récupération",
    obj_energie: "Énergie",
    obj_digestion: "Digestion",
    obj_minceur: "Minceur",
    obj_immunite: "Immunité",
    ing_chia: "Chia seeds",
    ing_quinoa: "Quinoa",
    ing_lin: "Graines de lin",
    ing_spiruline: "Spirulina",
    ing_tournesol: "Sunflower seeds",
    ing_curcuma: "Turmeric",
    ing_noix: "Walnuts & nuts",
    ing_proteines: "Plant Proteins",
  },
  en: {
    nav_home: "Home",
    nav_config: "Configurator",
    nav_orders: "My Orders",
    nav_contact: "Contact",
    nav_cta: "Create my bread",
    hero_badge: "🌿 100% Natural · Artisanal · Healthy",
    hero_title: "Your bread,<br/><span class=\"gradient-text\">your performance.</span>",
    hero_subtitle: "A tailor-made artisan bread according to your health goals. Real-time nutritional calculation, express delivery or pickup.",
    hero_cta: "🍞 Create my bread",
    hero_discover: "Discover →",
    stat_farines: "Flours available",
    stat_ingredients: "Healthy ingredients",
    stat_order_time: "To order",
    section_why: "Why choose <span class=\"gradient-text\">My Bakery</span> ?",
    feat_config_title: "Smart Configurator",
    feat_config_desc: "Choose your base, your goals, and your ingredients. Nutritional values are calculated instantly.",
    feat_nutrition_title: "Precise Nutritional Calculation",
    feat_nutrition_desc: "Every gram of protein, carbs, and fats is calculated in real-time according to your unique recipe.",
    feat_allergens_title: "Allergen Management",
    feat_allergens_desc: "Dynamic visual alerts for gluten, nuts, and dairy products. Your safety first.",
    feat_delivery_title: "Pickup or Delivery",
    feat_delivery_desc: "Express Click & Collect or home delivery with time slot choice. Simple, fast, reliable.",
    section_steps: "Order in <span class=\"gradient-text\">3 steps</span>",
    step1_title: "Configure your bread",
    step1_desc: "Choose the flour, healthy ingredients, and your nutritional goals.",
    step2_title: "Validate and pay",
    step2_desc: "Fill in your info, choose delivery or pickup, and pay securely.",
    step3_title: "Get your bread",
    step3_desc: "Receive your confirmation by email and enjoy your unique artisan bread.",
    btn_start_now: "Start now 🚀",
    config_page_title: "🍞 Configurator",
    config_page_subtitle: "Create your perfect bread",
    step_farine: "Choose your flour",
    step_objectif: "Your health goal",
    step_boosts: "\"Boost\" Ingredients",
    config_hint: "Select up to 4 ingredients",
    step_size: "Loaf size",
    config_allergen_alert: "⚠️ Allergens detected",
    config_recipe_name: "💾 Name my recipe (optional)",
    config_recipe_placeholder: "Ex: \"My Marathon Bread\"",
    btn_validate_config: "Validate my configuration →",
    preview_title: "Your customized bread",
    preview_macros_title: "📊 Nutritional values <small>(per 100g)</small>",
    macro_calories: "🔥 Calories",
    macro_proteins: "💪 Protein",
    macro_carbs: "⚡ Carbs",
    macro_lipids: "🥑 Fats",
    macro_fibers: "🌿 Fibers",
    summary_base: "Base",
    summary_goal: "Goal",
    summary_boosts: "Boosts",
    summary_size: "Size",
    summary_total: "Total",
    checkout_back_btn: "← Edit my recipe",
    checkout_page_title: "📋 Complete my order",
    form_info_title: "👤 Your information",
    form_label_firstname: "First Name *",
    form_label_lastname: "Last Name *",
    form_label_email: "Email *",
    form_label_phone: "Phone *",
    delivery_title: "🚚 Delivery method",
    delivery_click_collect: "Click & Collect",
    delivery_cc_desc: "Boutique pickup · Free",
    delivery_home: "Home Delivery",
    delivery_home_desc: "+2,50€ · Within the day",
    form_label_address: "Delivery address *",
    form_label_slot: "Time slot *",
    slot_placeholder: "-- Choose a slot --",
    payment_title: "💳 Secure Payment",
    payment_card: "💳 Credit Card",
    payment_secure_hint: "🔒 100% Secure Payment · SSL Encrypted",
    btn_confirm_order: "✅ Confirm my order",
    summary_recap_title: "🧾 Summary",
    summary_to_pay: "Total to pay",
    conf_title: "Order confirmed!",
    conf_subtitle: "Thank you for your order. A confirmation email has been sent to ",
    conf_order_num: "Order No. ",
    conf_qr_hint: "Show this QR Code during pickup in the store",
    btn_save_recipe: "💾 Save this recipe",
    btn_new_order: "🍞 New order",
    conf_resend_email: "Email not received? ",
    conf_resend_link: "Resend email →",
    conf_rating_title: "Your opinion matters 🌟",
    orders_page_title: "📦 My Orders & Favorites",
    orders_page_subtitle: "Find your latest orders and saved recipes",
    history_title: "🕐 Recent history",
    favs_title: "💾 My favorite recipes",
    empty_history: "No orders yet.",
    empty_favs: "No saved recipes yet.",
    btn_first_order: "Create my first order",
    modal_save_title: "💾 Save recipe",
    modal_save_desc: "Give your recipe a name to find it easily.",
    modal_btn_cancel: "Cancel",
    modal_btn_save: "Save ✅",
    toast_max_ing: "⚠️ Maximum 4 boost ingredients allowed.",
    toast_order_success: "✅ Order confirmed! Email sent.",
    toast_fav_success: "💾 Recipe saved!",
    farine_complet: "Whole Wheat",
    farine_epeautre: "Spelt",
    farine_sansgluten: "Gluten-Free",
    farine_seigle: "Rye",
    farine_avoine: "Oat",
    farine_multicereale: "Multigrain",
    obj_muscle: "Muscle Recovery",
    obj_energie: "Energy Boost",
    obj_digestion: "Digestion",
    obj_minceur: "Weight Control",
    obj_immunite: "Immunity",
    ing_chia: "Chia seeds",
    ing_quinoa: "Quinoa",
    ing_lin: "Flax seeds",
    ing_spiruline: "Spirulina",
    ing_tournesol: "Sunflower seeds",
    ing_curcuma: "Turmeric",
    ing_noix: "Walnuts & nuts",
    ing_proteines: "Plant Proteins",
  }
};

let currentLang = localStorage.getItem('mbc_lang') || 'fr';

function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('mbc_lang', lang);
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // Update language buttons active state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Update dynamic content
  if (typeof updatePreview === 'function') updatePreview();
  if (state.currentOrder && typeof buildOrderRecap === 'function') buildOrderRecap();
  if (typeof loadHistory === 'function') loadHistory();
}

// Base nutrition data per farine (per 100g)
const farineData = {
  complet:      { cal: 248, prot: 9,  gluc: 45, lip: 3,  fib: 6,  allergens: ['gluten'], icon: '🌾', name: 'farine_complet' },
  epeautre:     { cal: 265, prot: 12, gluc: 43, lip: 3,  fib: 5,  allergens: ['gluten'], icon: '🌿', name: 'farine_epeautre' },
  sansgluten:   { cal: 220, prot: 5,  gluc: 48, lip: 2,  fib: 4,  allergens: [],         icon: '✨', name: 'farine_sansgluten' },
  seigle:       { cal: 260, prot: 8,  gluc: 48, lip: 2,  fib: 7,  allergens: ['gluten'], icon: '🍂', name: 'farine_seigle' },
  avoine:       { cal: 270, prot: 10, gluc: 47, lip: 4,  fib: 8,  allergens: ['gluten'], icon: '🥣', name: 'farine_avoine' },
  multicereale: { cal: 255, prot: 10, gluc: 46, lip: 3,  fib: 7,  allergens: ['gluten'], icon: '🌈', name: 'farine_multicereale' },
};

// Ingredient boosts
const ingredientData = {
  chia:       { icon: '🌿', name: 'ing_chia',       cal: 15, prot: 1,  gluc: 0,  lip: 1,  fib: 2,  allergens: [] },
  quinoa:     { icon: '🟡', name: 'ing_quinoa',     cal: 18, prot: 2,  gluc: 2,  lip: 0,  fib: 1,  allergens: [] },
  lin:        { icon: '🔵', name: 'ing_lin',        cal: 12, prot: 1,  gluc: 0,  lip: 1,  fib: 2,  allergens: [] },
  spiruline:  { icon: '💚', name: 'ing_spiruline',  cal: 10, prot: 4,  gluc: 0,  lip: 0,  fib: 0,  allergens: [] },
  tournesol:  { icon: '🌻', name: 'ing_tournesol',  cal: 20, prot: 1,  gluc: 0,  lip: 2,  fib: 1,  allergens: [] },
  curcuma:    { icon: '🟠', name: 'ing_curcuma',    cal: 5,  prot: 0,  gluc: 1,  lip: 0,  fib: 0,  allergens: [] },
  noix:       { icon: '🥜', name: 'ing_noix',       cal: 30, prot: 1,  gluc: 1,  lip: 3,  fib: 1,  allergens: ['noix'] },
  proteines:  { icon: '⚗️', name: 'ing_proteines',  cal: 20, prot: 6, gluc: 1,  lip: 0,  fib: 0,  allergens: [] },
};

// Size config
const sizeData = {
  S: { label: 'S', weight: '400g', price: 4.90 },
  M: { label: 'M', weight: '700g', price: 7.90 },
  L: { label: 'L', weight: '1kg',  price: 10.90 },
};

// ============================================================
// PAGE NAVIGATION
// ============================================================
function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  const target = document.getElementById('page-' + pageId);
  
  if (!target) return;

  // Fade out current active page
  pages.forEach(p => {
    if (p.classList.contains('active')) {
      p.style.opacity = '0';
      p.style.transform = 'translateY(-10px)';
    }
  });

  setTimeout(() => {
    pages.forEach(p => p.classList.remove('active'));
    target.classList.add('active');
    
    // Trigger entrance animation
    setTimeout(() => {
      target.style.opacity = '1';
      target.style.transform = 'translateY(0)';
    }, 10);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 300);

  // Update nav active states
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const navMap = { home: 'nav-accueil', configurateur: 'nav-configurateur', commandes: 'nav-commandes' };
  if (navMap[pageId]) {
    const navEl = document.getElementById(navMap[pageId]);
    if (navEl) navEl.classList.add('active');
  }

  // Special page triggers
  if (pageId === 'commande') buildOrderRecap();
  if (pageId === 'commandes') loadHistory();
}

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('mbc_theme', isLight ? 'light' : 'dark');
  document.getElementById('theme-btn').textContent = isLight ? '☀️' : '🌙';
  showToast(isLight ? '💡 Mode clair activé' : '🌙 Mode sombre activé');
}

function initTheme() {
  const savedTheme = localStorage.getItem('mbc_theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    document.getElementById('theme-btn').textContent = '☀️';
  }
}

function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

function scrollToFeatures() {
  document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

// ============================================================
// OPTION SELECTION
// ============================================================
function selectOption(el, type) {
  document.querySelectorAll(`[data-type="${type}"]`).forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state[type] = el.dataset.id;
  updatePreview();
  animateBread();
}

function selectSize(el) {
  document.querySelectorAll('.size-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.size = el.dataset.size;
  updatePreview();
}

function toggleIngredient(el) {
  const id = el.dataset.id;
  if (el.classList.contains('selected')) {
    el.classList.remove('selected');
    state.ingredients = state.ingredients.filter(i => i !== id);
  } else {
    if (state.ingredients.length >= 4) {
      showToast('⚠️ Maximum 4 ingrédients boost autorisés.');
      shakEl(el);
      return;
    }
    el.classList.add('selected');
    state.ingredients.push(id);
  }
  updatePreview();
  animateBread();
}

// ============================================================
// LIVE PREVIEW UPDATE
// ============================================================
function updatePreview() {
  const farine = farineData[state.farine];

  // Calculate macros
  let cal = farine.cal, prot = farine.prot, gluc = farine.gluc, lip = farine.lip, fib = farine.fib;
  const allergens = [...farine.allergens];

  state.ingredients.forEach(id => {
    const ing = ingredientData[id];
    cal += ing.cal; prot += ing.prot; gluc += ing.gluc; lip += ing.lip; fib += ing.fib;
    ing.allergens.forEach(a => { if (!allergens.includes(a)) allergens.push(a); });
  });

  // Update macro display
  animateValue('cal-val', cal + ' kcal');
  animateValue('prot-val', prot + 'g');
  animateValue('gluc-val', gluc + 'g');
  animateValue('lip-val', lip + 'g');
  animateValue('fib-val', fib + 'g');

  const setBar = (id, pct) => {
    const bar = document.getElementById(id);
    if (bar) bar.style.width = Math.min(pct, 100) + '%';
  };
  setBar('cal-bar', (cal / 400) * 100);
  setBar('prot-bar', (prot / 30) * 100);
  setBar('gluc-bar', (gluc / 60) * 100);
  setBar('lip-bar', (lip / 20) * 100);
  setBar('fib-bar', (fib / 15) * 100);

  // Update summary
  const farineName = translations[currentLang][farine.name];
  setText('summary-base', farine.icon + ' ' + farineName);
  
  const objLabel = translations[currentLang]['obj_' + state.objectif];
  setText('summary-objectif', getObjectifIcon(state.objectif) + ' ' + objLabel);
  
  setText('summary-ingredients', state.ingredients.length === 0 ? (currentLang === 'fr' ? 'Aucun' : 'None') :
    state.ingredients.map(id => ingredientData[id].icon + ' ' + translations[currentLang][ingredientData[id].name]).join(', '));
  
  const sz = sizeData[state.size];
  setText('summary-taille', sz.label + ' — ' + sz.weight);

  // Price
  const extraDel = state.deliveryMode === 'livraison' ? 2.50 : 0;
  const price = sz.price + (state.ingredients.length * 0.5) + extraDel;
  setText('summary-price', price.toFixed(2) + '€');
  setText('order-total', price.toFixed(2) + '€');

  // Allergens
  const allergenBox = document.getElementById('allergen-box');
  const allergenList = document.getElementById('allergen-list');
  if (allergens.length > 0) {
    allergenBox.classList.add('visible');
    allergenList.innerHTML = allergens.map(a => `• Contient des <strong>${a}</strong>`).join('<br>');
  } else {
    allergenBox.classList.remove('visible');
  }

  // Bread name
  const recipeName = document.getElementById('recipe-name')?.value;
  const breadName = recipeName || (currentLang === 'fr' ? 'Votre ' : 'Your ') + farineName + (state.ingredients.length ? (currentLang === 'fr' ? ' boosté' : ' boosted') : '');
  setText('bread-preview-name', breadName);
}

function getObjectifIcon(id) {
  const icons = { muscle: '💪', energie: '⚡', digestion: '🌱', minceur: '🎯', immunite: '🛡️' };
  return icons[id] || '';
}

function getObjectifLabel(id) {
  const labelKey = 'obj_' + id;
  const icon = getObjectifIcon(id);
  const label = translations[currentLang][labelKey] || id;
  return icon + ' ' + label;
}

function animateBread() {
  const bread = document.getElementById('bread-visual');
  if (!bread) return;
  bread.style.transform = 'scale(1.2) rotate(5deg)';
  setTimeout(() => { bread.style.transform = 'scale(1) rotate(0deg)'; }, 300);
}

function animateValue(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.transform = 'scale(1.15)';
  el.style.color = 'var(--accent)';
  el.textContent = value;
  setTimeout(() => {
    el.style.transform = 'scale(1)';
    el.style.color = '';
  }, 200);
}

// ============================================================
// CHECKOUT FORM
// ============================================================
function selectDelivery(mode) {
  state.deliveryMode = mode;
  document.getElementById('del-retrait').classList.toggle('selected', mode === 'retrait');
  document.getElementById('del-livraison').classList.toggle('selected', mode === 'livraison');
  const addrGroup = document.getElementById('adresse-group');
  if (addrGroup) addrGroup.style.display = mode === 'livraison' ? 'flex' : 'none';
  updatePreview();
}

function selectPayment(mode) {
  state.paymentMode = mode;
  ['card', 'apple', 'google'].forEach(m => {
    const el = document.getElementById('pay-' + m);
    if (el) el.classList.toggle('selected', m === mode);
  });
  const cardFields = document.getElementById('card-fields');
  if (cardFields) cardFields.style.display = mode === 'card' ? 'flex' : 'none';
}

function formatCard(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = v.match(/.{1,4}/g)?.join(' ') || v;
}

function formatExp(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 4);
  if (v.length >= 3) v = v.substring(0, 2) + '/' + v.substring(2);
  input.value = v;
}

function buildOrderRecap() {
  const recap = document.getElementById('order-recap');
  if (!recap) return;

  const farine = farineData[state.farine];
  const sz = sizeData[state.size];
  const extraDel = state.deliveryMode === 'livraison' ? 2.50 : 0;
  const price = (sz.price + state.ingredients.length * 0.5 + extraDel).toFixed(2);

  recap.innerHTML = `
    <div class="summary-row"><span>Farine</span><span>${farine.icon} ${farine.name}</span></div>
    <div class="summary-row"><span>Objectif</span><span>${getObjectifLabel(state.objectif)}</span></div>
    ${state.ingredients.length ? `<div class="summary-row"><span>Boosts (${state.ingredients.length})</span><span>${state.ingredients.map(id => ingredientData[id].icon).join('')}</span></div>` : ''}
    <div class="summary-row"><span>Taille</span><span>${sz.label} — ${sz.weight}</span></div>
    <div class="summary-row"><span>Livraison</span><span>${state.deliveryMode === 'retrait' ? '🏪 Click & Collect' : '🛵 À domicile (+2,50€)'}</span></div>
    <div class="summary-divider"></div>
    <div class="summary-row"><span>Ingrédients</span><span>${(sz.price + state.ingredients.length * 0.5).toFixed(2)}€</span></div>
    ${extraDel > 0 ? `<div class="summary-row"><span>Livraison</span><span>+${extraDel.toFixed(2)}€</span></div>` : ''}
  `;

  setText('order-total', price + '€');
}

// ============================================================
// FORM VALIDATION & SUBMIT
// ============================================================
function validateField(id, errorId, condition, message) {
  const el = document.getElementById(id);
  const err = document.getElementById(errorId);
  if (!el || !err) return true;
  if (!condition(el.value)) {
    el.classList.add('error');
    err.textContent = message;
    return false;
  }
  el.classList.remove('error');
  err.textContent = '';
  return true;
}

function submitOrder() {
  let valid = true;

  valid &= validateField('prenom', 'err-prenom', v => v.trim().length >= 2, 'Veuillez entrer votre prénom.');
  valid &= validateField('nom', 'err-nom', v => v.trim().length >= 2, 'Veuillez entrer votre nom.');
  valid &= validateField('email', 'err-email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Email invalide.');
  valid &= validateField('telephone', 'err-telephone', v => v.replace(/\s/g, '').length >= 10, 'Numéro invalide.');
  valid &= validateField('creneau', 'err-creneau', v => v !== '', 'Choisissez un créneau.');

  if (state.deliveryMode === 'livraison') {
    valid &= validateField('adresse', 'err-adresse', v => v.trim().length >= 5, 'Veuillez entrer votre adresse.');
  }

  if (state.paymentMode === 'card') {
    valid &= validateField('card-num', 'err-card', v => v.replace(/\s/g, '').length === 16, 'Numéro de carte invalide.');
  }

  if (!valid) {
    showToast('❌ Veuillez corriger les champs en rouge.');
    // scroll to first error
    const firstErr = document.querySelector('.form-group input.error, .form-group select.error');
    if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Simulate processing
  const btn = document.getElementById('submit-order-btn');
  if (btn) {
    btn.textContent = '⏳ Traitement en cours...';
    btn.disabled = true;
  }

  setTimeout(() => {
    processOrder();
    if (btn) { btn.textContent = '✅ Confirmer ma commande'; btn.disabled = false; }
  }, 1800);
}

function processOrder() {
  const prenom = document.getElementById('prenom')?.value || '';
  const nom = document.getElementById('nom')?.value || '';
  const email = document.getElementById('email')?.value || '';
  const creneau = document.getElementById('creneau')?.value || '';
  const orderNum = 'MBC-' + Date.now().toString().slice(-6);

  const farine = farineData[state.farine];
  const sz = sizeData[state.size];
  const price = (sz.price + state.ingredients.length * 0.5 + (state.deliveryMode === 'livraison' ? 2.50 : 0)).toFixed(2);

  state.currentOrder = {
    id: orderNum,
    prenom, nom, email, creneau,
    farine: state.farine,
    objectif: state.objectif,
    ingredients: [...state.ingredients],
    size: state.size,
    deliveryMode: state.deliveryMode,
    price,
    date: new Date().toLocaleDateString('fr-FR'),
    recipeName: document.getElementById('recipe-name')?.value || (farine.name + ' ' + sz.weight),
  };

  // Save to history
  saveToHistory(state.currentOrder);

  // Show confirmation page
  buildConfirmationPage(state.currentOrder, farine, sz);
  showPage('confirmation');
  showToast('✅ Commande confirmée ! Email envoyé.');
}

function buildConfirmationPage(order, farine, sz) {
  setText('conf-email', order.email);
  setText('conf-order-num', order.id);
  setText('qr-num', order.id);

  const details = document.getElementById('conf-details');
  if (details) {
    details.innerHTML = `
      <div class="summary-row"><span>👤 Commande pour</span><span>${order.prenom} ${order.nom}</span></div>
      <div class="summary-row"><span>🍞 Pain</span><span>${farine.icon} ${farine.name} (${sz.weight})</span></div>
      <div class="summary-row"><span>🎯 Objectif</span><span>${getObjectifLabel(order.objectif)}</span></div>
      ${order.ingredients.length ? `<div class="summary-row"><span>⚡ Boosts</span><span>${order.ingredients.map(id => ingredientData[id].name).join(', ')}</span></div>` : ''}
      <div class="summary-row"><span>📦 Mode</span><span>${order.deliveryMode === 'retrait' ? '🏪 Click & Collect' : '🛵 Livraison'}</span></div>
      <div class="summary-row"><span>🕐 Créneau</span><span>${order.creneau}</span></div>
      <div class="summary-divider"></div>
      <div class="summary-row price-row"><span>💰 Total payé</span><span class="price-total">${order.price}€</span></div>
    `;
  }
}

// ============================================================
// FAVORITE / HISTORY
// ============================================================
function saveToHistory(order) {
  let history = JSON.parse(localStorage.getItem('mbc_history') || '[]');
  history.unshift(order);
  history = history.slice(0, 2); // Keep last 2
  localStorage.setItem('mbc_history', JSON.stringify(history));
}

function saveToFavorite() {
  const modal = document.getElementById('save-modal');
  if (modal) {
    const input = document.getElementById('fav-name-input');
    if (input) input.value = state.currentOrder?.recipeName || '';
    modal.style.display = 'flex';
  }
}

function confirmSave() {
  const name = document.getElementById('fav-name-input')?.value || 'Ma recette';
  if (!name.trim()) { showToast('⚠️ Entrez un nom pour votre recette.'); return; }

  let favs = JSON.parse(localStorage.getItem('mbc_favorites') || '[]');
  favs.unshift({ ...state.currentOrder, recipeName: name.trim(), savedAt: new Date().toLocaleDateString('fr-FR') });
  localStorage.setItem('mbc_favorites', JSON.stringify(favs));

  closeModal();
  showToast('💾 Recette "' + name + '" sauvegardée !');
}

function closeModal() {
  const modal = document.getElementById('save-modal');
  if (modal) modal.style.display = 'none';
}

function loadHistory() {
  const historyList = document.getElementById('history-list');
  const favsList = document.getElementById('favorites-list');

  const history = JSON.parse(localStorage.getItem('mbc_history') || '[]');
  const favs = JSON.parse(localStorage.getItem('mbc_favorites') || '[]');

  if (historyList) {
    if (history.length === 0) {
      historyList.innerHTML = `<div class="empty-state"><div class="empty-icon">📭</div><p>Aucune commande pour le moment.</p><button class="btn-primary" onclick="showPage('configurateur')">Créer ma première commande</button></div>`;
    } else {
      historyList.innerHTML = history.map(o => `
        <div class="history-item">
          <div class="history-icon">🍞</div>
          <div class="history-info">
            <strong>${o.recipeName || (farineData[o.farine]?.name || 'Pain')}</strong>
            <span>${o.date} · Commande N° ${o.id}</span>
          </div>
          <span class="history-price">${o.price}€</span>
          <button class="history-reorder" onclick="reorder('${o.id}')">↺ Refaire</button>
        </div>
      `).join('');
    }
  }

  if (favsList) {
    if (favs.length === 0) {
      favsList.innerHTML = `<div class="empty-state"><div class="empty-icon">⭐</div><p>Aucune recette sauvegardée.</p></div>`;
    } else {
      favsList.innerHTML = favs.map(f => `
        <div class="history-item">
          <div class="history-icon">⭐</div>
          <div class="history-info">
            <strong>${f.recipeName}</strong>
            <span>${farineData[f.farine]?.name || ''} · ${sizeData[f.size]?.weight || ''}</span>
          </div>
          <span class="history-price">${f.price}€</span>
          <button class="history-reorder" onclick="loadFavorite('${f.recipeName}')">▶ Commander</button>
        </div>
      `).join('');
    }
  }
}

function reorder(orderId) {
  showToast('🔄 Reconfiguration de votre commande...');
  setTimeout(() => showPage('configurateur'), 800);
}

function loadFavorite(name) {
  showToast('⭐ Recette chargée ! Vérifiez la configuration.');
  setTimeout(() => showPage('configurateur'), 800);
}

// ============================================================
// UI HELPERS
// ============================================================
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function shakEl(el) {
  el.style.animation = 'none';
  el.offsetHeight; // reflow
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => el.style.animation = '', 400);
}

function resendEmail() {
  showToast('📧 Email de confirmation renvoyé !');
}

function rate(n) {
  for (let i = 1; i <= 5; i++) {
    const star = document.getElementById('star-' + i);
    if (star) {
      star.textContent = i <= n ? '★' : '☆';
      star.classList.toggle('active', i <= n);
    }
  }
  setTimeout(() => showToast('⭐ Merci pour votre avis !'), 300);
}

// ============================================================
// RECIPE NAME INPUT — live preview update
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  changeLanguage(currentLang);
  updatePreview();

  const recipeInput = document.getElementById('recipe-name');
  if (recipeInput) {
    recipeInput.addEventListener('input', updatePreview);
  }

  // Add input transition styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    #cal-val, #prot-val, #gluc-val, #lip-val, #fib-val {
      transition: transform 0.2s ease, color 0.2s ease;
    }
    .bread-visual {
      transition: transform 0.3s ease;
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);

  // ============================================================
  // ULTRA-PREMIUM UX LOGIC
  // ============================================================

  // 1. Custom Cursor Follow
  const cursor = document.getElementById('cursor');
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    // Cursor Hover Effect on interactive elements
    const interactiveSelectors = 'button, a, .option-card, .ingredient-card, .size-card, .delivery-card, .pay-method, .nav-link, .nav-logo';
    
    const applyCursorHover = () => {
      document.querySelectorAll(interactiveSelectors).forEach(el => {
        if (!el.dataset.cursorBound) {
          el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
          el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
          el.dataset.cursorBound = "true";
        }
      });
    };

    applyCursorHover();
    // Re-apply when page changes
    const originalShowPage = window.showPage;
    window.showPage = function(pageId) {
      originalShowPage(pageId);
      setTimeout(applyCursorHover, 400); // Wait for transition
    };
  }

  // 2. Scroll Reveal Observer
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Reveal only once
      }
    });
  }, revealOptions);

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});

