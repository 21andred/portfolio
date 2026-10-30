// =========================================================
// LINGUA: italiano (scritto in index.html) e inglese (testi-en.js)
// =========================================================

// Testi italiani usati solo da questo script (le parti generate al volo)
const TESTI_IT = {
  'progetti.cliente': 'Cliente',
  'progetti.contesto': 'Contesto',
  'progetti.collaborazione': 'In collaborazione con',
  'progetti.foto': 'foto',
  'progetti.vuoto': 'Foto in arrivo',
  'foto.prec': 'Foto precedente',
  'foto.succ': 'Foto successiva',
  'foto.apri': 'Apri a schermo intero',
  'foto.vai': 'Vai alla foto',
  'foto.foto': 'foto',
  'foto.mancante': 'Immagine non trovata'
};

const LINGUE = ['it', 'en'];
let lingua = 'it';

// Restituisce il testo nella lingua attuale (se manca l'inglese, resta l'italiano)
function t(chiave) {
  if (lingua === 'en' && typeof TESTI_EN !== 'undefined' && TESTI_EN[chiave] != null) return TESTI_EN[chiave];
  return TESTI_IT[chiave] != null ? TESTI_IT[chiave] : chiave;
}

// Restituisce un campo del progetto nella lingua attuale
function campo(progetto, nome) {
  if (lingua === 'en' && progetto.en && progetto.en[nome] != null) return progetto.en[nome];
  return progetto[nome];
}

// Al primo avvio memorizza i testi italiani scritti nella pagina,
// così si può tornare all'italiano senza ricaricare
document.querySelectorAll('[data-i18n]').forEach((el) => { TESTI_IT[el.dataset.i18n] = el.innerHTML; });
document.querySelectorAll('[data-i18n-aria]').forEach((el) => { TESTI_IT[el.dataset.i18nAria] = el.getAttribute('aria-label'); });
document.querySelectorAll('[data-i18n-alt]').forEach((el) => { TESTI_IT[el.dataset.i18nAlt] = el.getAttribute('alt'); });
TESTI_IT['meta.title'] = document.title;
const metaDescrizione = document.querySelector('meta[name="description"]');
TESTI_IT['meta.description'] = metaDescrizione ? metaDescrizione.content : '';

function applicaTestiPagina() {
  document.documentElement.lang = lingua;
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.innerHTML = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => { el.setAttribute('alt', t(el.dataset.i18nAlt)); });
  document.title = t('meta.title');
  if (metaDescrizione) metaDescrizione.content = t('meta.description');

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    const attivo = btn.dataset.lang === lingua;
    btn.classList.toggle('is-active', attivo);
    btn.setAttribute('aria-pressed', String(attivo));
  });
}

function impostaLingua(nuova, { salva = true } = {}) {
  if (!LINGUE.includes(nuova)) return;
  lingua = nuova;
  if (salva) { try { localStorage.setItem('lingua', nuova); } catch (e) {} }

  // L'indirizzo con ?lang=en si può condividere per aprire il sito già in inglese
  const url = new URL(location.href);
  if (nuova === 'en') url.searchParams.set('lang', 'en');
  else url.searchParams.delete('lang');
  history.replaceState(null, '', url);

  applicaTestiPagina();
  if (document.getElementById('progetti-lista').children.length) {
    // Ridisegna i progetti nella nuova lingua restando su quello che stavi guardando
    const idVisibile = progettoAttuale ? progettoAttuale.id : null;
    renderizzaProgetti();
    if (idVisibile) document.getElementById(idVisibile).scrollIntoView({ behavior: 'instant', block: 'start' });
  }
}

// Lingua iniziale: indirizzo (?lang=en), poi scelta precedente, poi lingua del browser
(function linguaIniziale() {
  const daUrl = new URLSearchParams(location.search).get('lang');
  let salvata = null;
  try { salvata = localStorage.getItem('lingua'); } catch (e) {}
  const browser = (navigator.language || 'it').slice(0, 2) === 'it' ? 'it' : 'en';
  lingua = LINGUE.includes(daUrl) ? daUrl : LINGUE.includes(salvata) ? salvata : browser;
  if (lingua !== 'it') applicaTestiPagina();
})();

document.querySelectorAll('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => impostaLingua(btn.dataset.lang));
});


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
  img.src = immaginePlaceholder(t('foto.mancante'));
}
window.gestisciImmagineMancante = gestisciImmagineMancante;

// Indice della foto attualmente mostrata per ciascun progetto
const statoImmagini = {};

function creaVisual(progetto) {
  const immagini = progetto.immagini || [];
  const titolo = campo(progetto, 'titolo');
  const indice = statoImmagini[progetto.id] || 0;

  if (immagini.length === 0) {
    return `
      <div class="progetto-viewer-empty">
        <span class="empty-initials">${initialiDiTitolo(titolo)}</span>
        <p>${t('progetti.vuoto')}</p>
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
          src="${encodeURI(immagini[indice])}"
          alt="${titolo} — ${t('foto.foto')} ${indice + 1}"
          loading="lazy"
          decoding="async"
          onerror="gestisciImmagineMancante(this)"
        >
        ${multi ? `
          <button class="progetto-arrow progetto-prev" type="button" data-project="${progetto.id}" aria-label="${t('foto.prec')}">‹</button>
          <button class="progetto-arrow progetto-next" type="button" data-project="${progetto.id}" aria-label="${t('foto.succ')}">›</button>
          <span class="progetto-counter" data-project="${progetto.id}">${indice + 1} / ${immagini.length}</span>
        ` : ''}
        <button class="progetto-expand" type="button" data-project="${progetto.id}" aria-label="${t('foto.apri')}">⤢</button>
      </div>
      ${multi ? `
        <div class="progetto-dots" data-project="${progetto.id}">
          ${immagini.map((_, i) => `
            <button class="progetto-dot${i === indice ? ' is-active' : ''}" type="button" data-project="${progetto.id}" data-index="${i}" aria-label="${t('foto.vai')} ${i + 1}"></button>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

// Riga facoltativa con cliente e collaborazione (solo se presenti nei dati)
function creaMeta(progetto) {
  const voci = [];
  if (progetto.cliente) voci.push([t('progetti.cliente'), campo(progetto, 'cliente')]);
  if (progetto.contesto) voci.push([t('progetti.contesto'), campo(progetto, 'contesto')]);
  if (progetto.collaborazione) voci.push([t('progetti.collaborazione'), campo(progetto, 'collaborazione')]);
  if (!voci.length) return '';

  return `<dl class="progetto-meta">${voci
    .map(([etichetta, valore]) => `<div><dt>${etichetta}</dt><dd>${valore}</dd></div>`)
    .join('')}</dl>`;
}

function creaProgetto(progetto, indice) {
  const numero = String(indice + 1).padStart(2, '0');
  const tag = (campo(progetto, 'tag') || []).map((x) => `<li>${x}</li>`).join('');
  const colore = progetto.colore ? ` style="--c:${progetto.colore}"` : '';
  const scuro = progetto.scuro ? ' is-dark' : '';

  return `
    <article class="progetto${scuro}" id="progetto-${progetto.id}" data-project="${progetto.id}"${colore}>
      ${creaVisual(progetto)}
      <div class="progetto-info">
        <span class="case-index">${numero}</span>
        <h3>${campo(progetto, 'titolo')}</h3>
        <p class="case-summary">${campo(progetto, 'sommario')}</p>
        ${creaMeta(progetto)}
        <ul class="case-tags">${tag}</ul>
      </div>
    </article>
  `;
}

let categoriaAttiva = 'packaging-design';

// Griglia di anteprime: permette di saltare direttamente a un progetto
function creaAnteprima(progetto) {
  const immagini = progetto.immagini || [];
  const conteggio = immagini.length;
  const titolo = campo(progetto, 'titolo');

  const visual = conteggio
    ? `<img src="${encodeURI(immagini[0])}" alt="" loading="lazy" decoding="async" onerror="gestisciImmagineMancante(this)">`
    : `<span class="anteprima-initials">${initialiDiTitolo(titolo)}</span>`;

  const colore = progetto.colore ? ` style="--c:${progetto.colore}"` : '';

  return `
    <a class="anteprima" href="#progetto-${progetto.id}"${colore}>
      <span class="anteprima-frame">
        ${visual}
        ${conteggio > 1 ? `<span class="anteprima-conteggio">${conteggio} ${t('progetti.foto')}</span>` : ''}
      </span>
      <span class="anteprima-titolo">${titolo}</span>
    </a>
  `;
}

function renderizzaProgetti() {
  const container = document.getElementById('progetti-lista');
  if (!container || typeof PROGETTI === 'undefined') return;

  const visibili = PROGETTI.filter((p) => p.categoria === categoriaAttiva);

  container.innerHTML = visibili.map((progetto, indice) => creaProgetto(progetto, indice)).join('');

  const overview = document.getElementById('progetti-overview');
  if (overview) {
    overview.innerHTML = visibili.map((progetto) => creaAnteprima(progetto)).join('');
  }

  osservaProgetti();
}

// Rete di sicurezza: se in progetti-dati.js manca il titolo, usa l'id
// invece di mostrare la scritta "undefined" sul sito
PROGETTI.forEach((progetto) => { if (!progetto.titolo) progetto.titolo = progetto.id; });

// Lo stato delle foto si inizializza una sola volta per tutti i progetti,
// così resta valido anche cambiando scheda
PROGETTI.forEach((progetto) => { statoImmagini[progetto.id] = 0; });


// =========================================================
// INDICATORE "03 / 13" E NAVIGAZIONE DA TASTIERA
// ↑ ↓ passano da un progetto all'altro, ← → sfogliano le foto
// =========================================================

const progettoNav = document.getElementById('progetto-nav');
const progettoNavAttuale = document.getElementById('progetto-nav-attuale');
const progettoNavTotale = document.getElementById('progetto-nav-totale');

let progettoAttuale = null; // l'<article> visibile in questo momento

function elencoProgetti() {
  return [...document.querySelectorAll('#progetti-lista .progetto')];
}

function aggiornaIndicatore() {
  const lista = elencoProgetti();
  const indice = lista.indexOf(progettoAttuale);
  if (indice === -1) {
    progettoNav.hidden = true;
    return;
  }
  progettoNav.hidden = false;
  progettoNav.style.setProperty('--c', progettoAttuale.style.getPropertyValue('--c') || '');
  progettoNav.classList.toggle('is-dark', progettoAttuale.classList.contains('is-dark'));
  progettoNavAttuale.textContent = String(indice + 1).padStart(2, '0');
  progettoNavTotale.textContent = String(lista.length).padStart(2, '0');
}

// Un progetto è "attuale" quando ne occupa il centro dello schermo
const osservatoreProgetti = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) progettoAttuale = entry.target;
      else if (entry.target === progettoAttuale) progettoAttuale = null;
    });
    aggiornaIndicatore();
  },
  { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
);

function osservaProgetti() {
  osservatoreProgetti.disconnect();
  progettoAttuale = null;
  elencoProgetti().forEach((el) => osservatoreProgetti.observe(el));
  aggiornaIndicatore();
}

function vaiAlProgetto(direzione) {
  const lista = elencoProgetti();
  const indice = lista.indexOf(progettoAttuale);
  const destinazione = lista[indice + direzione];

  if (destinazione) {
    destinazione.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (direzione < 0) {
    document.querySelector('.progetti-intro').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    document.querySelector('.case-more').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

progettoNav.addEventListener('click', (event) => {
  const btn = event.target.closest('.progetto-nav-btn');
  if (btn) vaiAlProgetto(Number(btn.dataset.dir));
});

document.addEventListener('keydown', (event) => {
  if (lightbox.classList.contains('is-open') || !progettoAttuale) return;
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.target.closest('input, textarea, select, [contenteditable]')) return;

  const id = progettoAttuale.dataset.project;

  switch (event.key) {
    case 'ArrowDown':
    case 'PageDown':
      event.preventDefault();
      vaiAlProgetto(1);
      break;
    case 'ArrowUp':
    case 'PageUp':
      event.preventDefault();
      vaiAlProgetto(-1);
      break;
    case 'ArrowRight':
      event.preventDefault();
      impostaIndice(id, statoImmagini[id] + 1);
      break;
    case 'ArrowLeft':
      event.preventDefault();
      impostaIndice(id, statoImmagini[id] - 1);
      break;
  }
});

renderizzaProgetti();

// ---------- Cambio scheda (Packaging Design / Altri lavori) ----------
document.querySelectorAll('.progetti-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    if (tab.classList.contains('is-active')) return;

    document.querySelectorAll('.progetti-tab').forEach((x) => {
      x.classList.remove('is-active');
      x.setAttribute('aria-selected', 'false');
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
    img.alt = `${campo(progetto, 'titolo')} — ${t('foto.foto')} ${indice + 1}`;
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
  lightboxImage.alt = `${campo(progetto, 'titolo')} — ${t('foto.foto')} ${indice + 1}`;
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


// =========================================================
// CONTATORE VISITE (discreto, solo un numero in fondo alla pagina)
// =========================================================
//
// Usa GoatCounter (goatcounter.com), un servizio gratuito per uso non
// commerciale che conta le visite senza cookie. Per attivarlo:
//
//   1. Crea un account su goatcounter.com e scegli un "code"
//      (es. "andreacampus": il tuo indirizzo sarà andreacampus.goatcounter.com)
//   2. Nelle impostazioni del sito su GoatCounter attiva la casella
//      "Allow adding visitor counts on your website"
//   3. Scrivi qui sotto lo stesso code, tra apici
//
// Finché questo campo resta vuoto il contatore è spento e non succede nulla.
const GOATCOUNTER_CODICE = '21andred';

(function contatoreVisite() {
  if (!GOATCOUNTER_CODICE) return;

  // I TUOI DISPOSITIVI: apri il sito aggiungendo #io in fondo all'indirizzo
  // (una volta per ogni computer/telefono/browser che usi). Da lì in poi
  // le tue visite non vengono contate e in fondo a destra vedi il totale.
  // Con #io-off quel dispositivo torna a essere un visitatore qualsiasi.
  try {
    if (location.hash === '#io' || location.hash === '#io-off') {
      const escludi = location.hash === '#io';
      if (escludi) localStorage.setItem('nocount', '1');
      else localStorage.removeItem('nocount');
      history.replaceState(null, '', location.pathname + location.search);
      alert(escludi
        ? 'Fatto: da questo dispositivo le tue visite non vengono contate e in fondo alla pagina vedi il totale.'
        : 'Questo dispositivo torna a essere un visitatore normale: le visite vengono contate e il totale non si vede più.');
    }
  } catch (e) { /* memoria del browser non disponibile: si va avanti */ }

  let escluso = false;
  try { escluso = localStorage.getItem('nocount') === '1'; } catch (e) {}

  const base = `https://${GOATCOUNTER_CODICE}.goatcounter.com`;

  // 1. Registra la visita (tranne la tua)
  if (!escluso) {
    const tag = document.createElement('script');
    tag.async = true;
    tag.dataset.goatcounter = `${base}/count`;
    tag.src = 'https://gc.zgo.at/count.js';
    document.head.appendChild(tag);
  }

  // 2. Mostra il totale nell'angolo, senza etichetta, solo sui tuoi dispositivi
  const casella = document.getElementById('contatore');
  if (!casella || !escluso) return;

  fetch(`${base}/counter/TOTAL.json`)
    .then((risposta) => (risposta.ok ? risposta.json() : Promise.reject()))
    .then((dati) => { if (dati && dati.count) casella.textContent = dati.count; })
    .catch(() => { /* se il servizio non risponde, il numero semplicemente non appare */ });
})();
