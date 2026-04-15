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

// Base nutrition data per farine (per 100g)
const farineData = {
  complet:      { cal: 248, prot: 9,  gluc: 45, lip: 3,  fib: 6,  allergens: ['gluten'], icon: '🌾', name: 'Blé Complet' },
  epeautre:     { cal: 265, prot: 12, gluc: 43, lip: 3,  fib: 5,  allergens: ['gluten'], icon: '🌿', name: 'Épeautre' },
  sansgluten:   { cal: 220, prot: 5,  gluc: 48, lip: 2,  fib: 4,  allergens: [],         icon: '✨', name: 'Sans Gluten' },
  seigle:       { cal: 260, prot: 8,  gluc: 48, lip: 2,  fib: 7,  allergens: ['gluten'], icon: '🍂', name: 'Seigle' },
  avoine:       { cal: 270, prot: 10, gluc: 47, lip: 4,  fib: 8,  allergens: ['gluten'], icon: '🥣', name: 'Avoine' },
  multicereale: { cal: 255, prot: 10, gluc: 46, lip: 3,  fib: 7,  allergens: ['gluten'], icon: '🌈', name: 'Multicéréales' },
};

// Ingredient boosts
const ingredientData = {
  chia:       { icon: '🌿', name: 'Graines de chia',   cal: 15, prot: 1,  gluc: 0,  lip: 1,  fib: 2,  allergens: [] },
  quinoa:     { icon: '🟡', name: 'Quinoa',             cal: 18, prot: 2,  gluc: 2,  lip: 0,  fib: 1,  allergens: [] },
  lin:        { icon: '🔵', name: 'Graines de lin',     cal: 12, prot: 1,  gluc: 0,  lip: 1,  fib: 2,  allergens: [] },
  spiruline:  { icon: '💚', name: 'Spiruline',          cal: 10, prot: 4,  gluc: 0,  lip: 0,  fib: 0,  allergens: [] },
  tournesol:  { icon: '🌻', name: 'Graines tournesol',  cal: 20, prot: 1,  gluc: 0,  lip: 2,  fib: 1,  allergens: [] },
  curcuma:    { icon: '🟠', name: 'Curcuma',            cal: 5,  prot: 0,  gluc: 1,  lip: 0,  fib: 0,  allergens: [] },
  noix:       { icon: '🥜', name: 'Noix & noisettes',  cal: 30, prot: 1,  gluc: 1,  lip: 3,  fib: 1,  allergens: ['noix'] },
  proteines:  { icon: '⚗️', name: 'Protéines végétales', cal: 20, prot: 6, gluc: 1,  lip: 0,  fib: 0,  allergens: [] },
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
  setText('summary-base', farine.icon + ' ' + farine.name);
  setText('summary-objectif', getObjectifLabel(state.objectif));
  setText('summary-ingredients', state.ingredients.length === 0 ? 'Aucun' :
    state.ingredients.map(id => ingredientData[id].icon + ' ' + ingredientData[id].name).join(', '));
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
  const breadName = recipeName || 'Votre ' + farine.name + (state.ingredients.length ? ' boosté' : '');
  setText('bread-preview-name', breadName);
}

function getObjectifLabel(id) {
  const labels = {
    muscle: '💪 Récupération',
    energie: '⚡ Énergie',
    digestion: '🌱 Digestion',
    minceur: '🎯 Minceur',
    immunite: '🛡️ Immunité',
  };
  return labels[id] || id;
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

