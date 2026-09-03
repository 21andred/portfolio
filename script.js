// =========================================================
// NAV: menu mobile e stato attivo durante lo scroll
// =========================================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const sections = ['progetti', 'chi-sono', 'contatti']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const navItems = document.querySelectorAll('.nav-links a[data-nav]');

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach((a) => a.classList.toggle('active', a.dataset.nav === id));
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
);
sections.forEach((section) => spy.observe(section));


// =========================================================
// PROGETTI: rendering da progetti-dati.js
// =========================================================

// Iniziali del titolo, usate come segnaposto quando manca la foto
function initialiDiTitolo(titolo) {
  return titolo
    .split(/\s+/)
    .filter((parola) => /[a-zA-Z]/.test(parola))
    .slice(0, 2)
    .map((parola) => parola.charAt(0).toUpperCase())
    .join('');
}

// Immagine segnaposto disegnata al volo (nessun file esterno necessario)
function immaginePlaceholder(testo) {
  const sicuro = testo.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>
    <rect width='100%' height='100%' fill='#F1F0EA'/>
    <text x='50%' y='50%' font-family='Arial, sans-serif' font-size='24' fill='#97968A' text-anchor='middle' dominant-baseline='middle'>${sicuro}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// Se un percorso immagine è sbagliato, sostituisce la foto con un segnaposto
// senza rimuovere l'elemento <img> (così le frecce continuano a funzionare)
function gestisciImmagineMancante(img) {
  img.onerror = null;
  img.src = immaginePlaceholder('Immagine non trovata');
}
window.gestisciImmagineMancante = gestisciImmagineMancante;

// Indice della foto attualmente mostrata per ciascun progetto
const statoImmagini = {};

function creaVisual(progetto) {
  const immagini = progetto.immagini || [];

  if (immagini.length === 0) {
    return `
      <div class="progetto-viewer-empty">
        <span class="empty-initials">${initialiDiTitolo(progetto.titolo)}</span>
        <p>Foto in arrivo — aggiungile in<br><code>assets/progetti/${progetto.id}/</code></p>
      </div>
    `;
  }

  const multi = immagini.length > 1;

  return `
    <div class="progetto-viewer">
      <div class="progetto-frame">
        <img
          class="progetto-img"
          data-project="${progetto.id}"
          src="${encodeURI(immagini[0])}"
          alt="${progetto.titolo} — foto 1"
          onerror="gestisciImmagineMancante(this)"
        >
        ${multi ? `
          <button class="progetto-arrow progetto-prev" type="button" data-project="${progetto.id}" aria-label="Foto precedente">‹</button>
          <button class="progetto-arrow progetto-next" type="button" data-project="${progetto.id}" aria-label="Foto successiva">›</button>
          <span class="progetto-counter" data-project="${progetto.id}">1 / ${immagini.length}</span>
        ` : ''}
        <button class="progetto-expand" type="button" data-project="${progetto.id}" aria-label="Apri a schermo intero">⤢</button>
      </div>
      ${multi ? `
        <div class="progetto-dots" data-project="${progetto.id}">
          ${immagini.map((_, i) => `
            <button class="progetto-dot${i === 0 ? ' is-active' : ''}" type="button" data-project="${progetto.id}" data-index="${i}" aria-label="Vai alla foto ${i + 1}"></button>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

function creaProgetto(progetto, indice) {
  const numero = String(indice + 1).padStart(2, '0');
  const tag = (progetto.tag || []).map((t) => `<li>${t}</li>`).join('');

  return `
    <article class="progetto" id="progetto-${progetto.id}">
      ${creaVisual(progetto)}
      <div class="progetto-info">
        <span class="case-index">${numero}</span>
        <h3>${progetto.titolo}</h3>
        <p class="case-summary">${progetto.sommario}</p>
        <ul class="case-tags">${tag}</ul>
      </div>
    </article>
  `;
}

let categoriaAttiva = 'packaging-design';

function renderizzaProgetti() {
  const container = document.getElementById('progetti-lista');
  if (!container || typeof PROGETTI === 'undefined') return;

  const visibili = PROGETTI.filter((p) => p.categoria === categoriaAttiva);

  container.innerHTML = visibili.map((progetto, indice) => creaProgetto(progetto, indice)).join('');
}

// Lo stato delle foto si inizializza una sola volta per tutti i progetti,
// così resta valido anche cambiando scheda
PROGETTI.forEach((progetto) => { statoImmagini[progetto.id] = 0; });

renderizzaProgetti();

// ---------- Cambio scheda (Packaging Design / Altri lavori) ----------
document.querySelectorAll('.progetti-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    if (tab.classList.contains('is-active')) return;

    document.querySelectorAll('.progetti-tab').forEach((t) => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');

    categoriaAttiva = tab.dataset.categoria;
    renderizzaProgetti();
  });
});


// =========================================================
// NAVIGAZIONE FOTO: frecce, pallini, e sincronizzazione
// con lo schermo intero, tutto da un'unica fonte di verità
// =========================================================

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let progettoLightboxAttuale = null;

function trovaProgetto(id) {
  return PROGETTI.find((p) => p.id === id);
}

// Aggiorna la foto grande, il contatore e i pallini dentro la pagina
function aggiornaViewerInline(id, progetto, indice) {
  const img = document.querySelector(`.progetto-img[data-project="${id}"]`);
  if (img) {
    img.src = encodeURI(progetto.immagini[indice]);
    img.alt = `${progetto.titolo} — foto ${indice + 1}`;
  }

  const contatore = document.querySelector(`.progetto-counter[data-project="${id}"]`);
  if (contatore) contatore.textContent = `${indice + 1} / ${progetto.immagini.length}`;

  document.querySelectorAll(`.progetto-dot[data-project="${id}"]`).forEach((dot, i) => {
    dot.classList.toggle('is-active', i === indice);
  });
}

// Aggiorna lo schermo intero, se è quello aperto in questo momento
function aggiornaLightboxDaStato() {
  if (!progettoLightboxAttuale) return;
  const progetto = trovaProgetto(progettoLightboxAttuale);
  if (!progetto) return;

  const indice = statoImmagini[progettoLightboxAttuale];
  const src = encodeURI(progetto.immagini[indice]);

  lightboxImage.src = src;
  lightboxImage.alt = `${progetto.titolo} — foto ${indice + 1}`;
  lightboxCaption.textContent = `${indice + 1} / ${progetto.immagini.length}`;

  const haPiuImmagini = progetto.immagini.length > 1;
  lightboxPrev.hidden = !haPiuImmagini;
  lightboxNext.hidden = !haPiuImmagini;
}

// Punto unico da cui passa ogni cambio di foto, dentro la pagina o a schermo intero
function impostaIndice(id, nuovoIndice) {
  const progetto = trovaProgetto(id);
  if (!progetto || !progetto.immagini || !progetto.immagini.length) return;

  const totale = progetto.immagini.length;
  const indice = ((nuovoIndice % totale) + totale) % totale;
  statoImmagini[id] = indice;

  aggiornaViewerInline(id, progetto, indice);
  if (progettoLightboxAttuale === id) aggiornaLightboxDaStato();
}

function apriLightbox(id, indiceIniziale) {
  const progetto = trovaProgetto(id);
  if (!progetto || !progetto.immagini || !progetto.immagini.length) return;

  progettoLightboxAttuale = id;
  statoImmagini[id] = indiceIniziale;
  aggiornaLightboxDaStato();

  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function chiudiLightbox() {
  progettoLightboxAttuale = null;
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  lightboxImage.alt = '';
  document.body.style.overflow = '';
}

// ---------- Click: frecce, pallini, apertura a schermo intero ----------
document.addEventListener('click', (event) => {
  const prev = event.target.closest('.progetto-prev');
  if (prev) {
    const id = prev.dataset.project;
    impostaIndice(id, statoImmagini[id] - 1);
    return;
  }

  const next = event.target.closest('.progetto-next');
  if (next) {
    const id = next.dataset.project;
    impostaIndice(id, statoImmagini[id] + 1);
    return;
  }

  const dot = event.target.closest('.progetto-dot');
  if (dot) {
    impostaIndice(dot.dataset.project, Number(dot.dataset.index));
    return;
  }

  const apri = event.target.closest('.progetto-expand, .progetto-img');
  if (apri) {
    const id = apri.dataset.project;
    apriLightbox(id, statoImmagini[id] || 0);
    return;
  }
});

lightboxClose.addEventListener('click', chiudiLightbox);
lightboxPrev.addEventListener('click', () => {
  if (progettoLightboxAttuale) impostaIndice(progettoLightboxAttuale, statoImmagini[progettoLightboxAttuale] - 1);
});
lightboxNext.addEventListener('click', () => {
  if (progettoLightboxAttuale) impostaIndice(progettoLightboxAttuale, statoImmagini[progettoLightboxAttuale] + 1);
});

// Click sullo sfondo scuro: chiude. Click su foto/pulsanti: non chiude.
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) chiudiLightbox();
});

// Tastiera, attiva solo quando lo schermo intero è aperto
document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('is-open')) return;

  if (event.key === 'Escape') chiudiLightbox();
  if (event.key === 'ArrowLeft' && progettoLightboxAttuale) {
    impostaIndice(progettoLightboxAttuale, statoImmagini[progettoLightboxAttuale] - 1);
  }
  if (event.key === 'ArrowRight' && progettoLightboxAttuale) {
    impostaIndice(progettoLightboxAttuale, statoImmagini[progettoLightboxAttuale] + 1);
  }
});
