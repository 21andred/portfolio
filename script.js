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
  {
    rootMargin: '-45% 0px -50% 0px',
    threshold: 0
  }
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

function creaImmagineProgetto(src, progetto, indiceImmagine, classe) {
  return `
    <img
      class="${classe} project-image"
      src="${src}"
      alt="${progetto.titolo} — immagine ${indiceImmagine + 1}"
      data-project-id="${progetto.id}"
      data-image-index="${indiceImmagine}"
      onerror="gestisciImmagineMancante(this)"
    >
  `;
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
        ${creaImmagineProgetto(
          immagini[0],
          progetto,
          0,
          'photo-single'
        )}
      </div>
    `;
  }

  const principale = immagini[0];
  const secondarie = immagini.slice(1, 3);

  return `
    <div class="case-visual case-visual-photo">
      <div class="photo-grid">
        ${creaImmagineProgetto(
          principale,
          progetto,
          0,
          'photo-main'
        )}

        ${secondarie
          .map((src, index) =>
            creaImmagineProgetto(
              src,
              progetto,
              index + 1,
              'photo-sub'
            )
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

  if (!container || typeof PROGETTI === 'undefined') {
    return;
  }

  container.innerHTML = PROGETTI
    .map((progetto, indice) => creaProgetto(progetto, indice))
    .join('');
}

renderizzaProgetti();

// ---------- Lightbox / visualizzatore immagini ----------
// ---------- Lightbox / visualizzatore immagini ----------
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let immaginiLightbox = [];
let indiceLightbox = 0;
let titoloLightbox = '';

function aggiornaLightbox() {
  if (!immaginiLightbox.length) return;

  const src = immaginiLightbox[indiceLightbox];

  lightboxImage.src = src;
  lightboxImage.alt = `${titoloLightbox} — immagine ${indiceLightbox + 1}`;

  lightboxCaption.textContent =
    `${indiceLightbox + 1} / ${immaginiLightbox.length}`;

  const haPiuImmagini = immaginiLightbox.length > 1;
  lightboxPrev.hidden = !haPiuImmagini;
  lightboxNext.hidden = !haPiuImmagini;
}

function apriLightbox(progetto, indiceIniziale = 0) {
  immaginiLightbox = progetto.immagini || [];
  indiceLightbox = indiceIniziale;
  titoloLightbox = progetto.titolo || '';

  if (!immaginiLightbox.length) return;

  aggiornaLightbox();

  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function chiudiLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  lightboxImage.alt = '';
  document.body.style.overflow = '';
}

function immaginePrecedente() {
  if (immaginiLightbox.length < 2) return;

  indiceLightbox =
    (indiceLightbox - 1 + immaginiLightbox.length) % immaginiLightbox.length;

  aggiornaLightbox();
}

function immagineSuccessiva() {
  if (immaginiLightbox.length < 2) return;

  indiceLightbox =
    (indiceLightbox + 1) % immaginiLightbox.length;

  aggiornaLightbox();
}

/* Click sulle immagini del portfolio */
document.addEventListener('click', (event) => {
  const immagine = event.target.closest('.project-image');

  if (!immagine) return;

  const progetto = PROGETTI.find(
    (item) => item.id === immagine.dataset.projectId
  );

  if (!progetto) return;

  apriLightbox(progetto, Number(immagine.dataset.imageIndex));
});

/* Pulsanti */
lightboxClose.addEventListener('click', chiudiLightbox);
lightboxPrev.addEventListener('click', immaginePrecedente);
lightboxNext.addEventListener('click', immagineSuccessiva);

/* Click solo sullo sfondo scuro: non chiude se clicchi foto o pulsanti */
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    chiudiLightbox();
  }
});

/* Tastiera */
document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('is-open')) return;

  if (event.key === 'Escape') {
    chiudiLightbox();
  }

  if (event.key === 'ArrowLeft') {
    immaginePrecedente();
  }

  if (event.key === 'ArrowRight') {
    immagineSuccessiva();
  }
});
