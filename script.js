// ---------- Mobile nav toggle ----------
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

// ---------- Scroll-spy active nav state ----------
const sections = ['progetti', 'chi-sono', 'contatti']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const navItems = document.querySelectorAll('.nav-links a[data-nav]');

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach((a) => {
          a.classList.toggle('active', a.dataset.nav === id);
        });
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
);

sections.forEach((section) => spy.observe(section));

// ---------- Render dei progetti da progetti-dati.js ----------

function initialiDiTitolo(titolo) {
  return titolo
    .split(/\s+/)
    .filter((parola) => /[a-zA-Z]/.test(parola))
    .slice(0, 2)
    .map((parola) => parola.charAt(0).toUpperCase())
    .join('');
}

function creaVisual(progetto) {
  const immagini = progetto.immagini || [];

  if (immagini.length === 0) {
    return `
      <div class="case-visual case-visual-empty">
        <span class="empty-initials">${initialiDiTitolo(progetto.titolo)}</span>
        <p>Foto in arrivo — aggiungile in<br><code>assets/progetti/${progetto.id}/</code></p>
      </div>
    `;
  }

  if (immagini.length === 1) {
    return `
      <div class="case-visual case-visual-photo">
        <img class="photo-single" src="${immagini[0]}" alt="${progetto.titolo}" onerror="gestisciImmagineMancante(this)">
      </div>
    `;
  }

  const principale = immagini[0];
  const secondarie = immagini.slice(1, 3);

  return `
    <div class="case-visual case-visual-photo">
      <div class="photo-grid">
        <img class="photo-main" src="${principale}" alt="${progetto.titolo}" onerror="gestisciImmagineMancante(this)">
        ${secondarie
          .map(
            (src) =>
              `<img class="photo-sub" src="${src}" alt="${progetto.titolo}" onerror="gestisciImmagineMancante(this)">`
          )
          .join('')}
      </div>
    </div>
  `;
}

// Se un percorso immagine è sbagliato o il file non esiste ancora,
// mostra un riquadro pulito invece dell'icona di immagine rotta.
function gestisciImmagineMancante(img) {
  const box = document.createElement('div');
  box.className = 'photo-missing';
  box.innerHTML = '<p>Immagine non trovata</p>';
  img.replaceWith(box);
}
window.gestisciImmagineMancante = gestisciImmagineMancante;

function creaProgetto(progetto, indice) {
  const numero = String(indice + 1).padStart(2, '0');
  const classeReverse = indice % 2 === 1 ? ' case-reverse' : '';
  const tag = (progetto.tag || [])
    .map((t) => `<li>${t}</li>`)
    .join('');

  return `
    <article class="case${classeReverse}" id="case-${progetto.id}">
      ${creaVisual(progetto)}
      <div class="case-content">
        <span class="case-index">${numero}</span>
        <h3>${progetto.titolo}</h3>
        <p class="case-summary">${progetto.sommario}</p>
        <ul class="case-tags">${tag}</ul>
      </div>
    </article>
  `;
}

function renderizzaProgetti() {
  const container = document.getElementById('progetti-lista');
  if (!container || typeof PROGETTI === 'undefined') return;

  container.innerHTML = PROGETTI.map((progetto, indice) =>
    creaProgetto(progetto, indice)
  ).join('');
}

renderizzaProgetti();
