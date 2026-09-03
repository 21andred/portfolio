/* =========================================================
   PROGETTI DEL PORTFOLIO
   =========================================================

   Questo file è l'unico posto dove aggiungere, modificare o
   togliere un progetto. Il sito li disegna da solo, in ordine,
   senza bisogno di toccare HTML o CSS.

   COME AGGIUNGERE UN NUOVO PROGETTO:

   1. Crea una cartella dentro assets/ con le foto o i render
      del progetto (jpg o png). Vanno bene 1 sola immagine, 2,
      3 o più — il sito si adatta automaticamente.
      Se per ora non hai le foto, lascia "immagini" vuoto: [] —
      il sito mostra le iniziali del progetto al posto delle
      foto, così puoi pubblicarlo comunque e aggiungerle dopo.

   2. Copia uno dei blocchi { ... } qui sotto (comprese le
      parentesi graffe), incollalo appena prima della riga
      "];" in fondo al file, e compila i campi.

   3. Salva il file. Il progetto compare sul sito nella
      sottocategoria indicata dal campo "categoria", nell'ordine
      in cui appare in questo elenco.

   CAMPI DI OGNI PROGETTO:

   - id         → nome breve univoco (lettere minuscole, senza
                  spazi)
   - categoria  → 'packaging-design' oppure 'altri-lavori' —
                  decide sotto quale scheda appare il progetto
   - titolo     → il nome del progetto come apparirà sul sito
   - sommario   → una descrizione di 2-3 frasi: cosa comprendeva
                  il lavoro, il tuo ruolo, cosa lo rendeva
                  particolare
   - tag        → 3-5 parole chiave brevi
   - immagini   → percorsi delle foto, nell'ordine in cui
                  vuoi che appaiano sfogliandole

   Per creare una terza scheda (es. "Illustrazione"), basta
   usare quel nome come categoria in un progetto: comparirà
   automaticamente una nuova scheda nella barra sopra i progetti.

   ========================================================= */

const PROGETTI = [

  /* ---------- Packaging Design ---------- */

  {
    id: 'packaging',
    categoria: 'packaging-design',
    titolo: 'Packaging & brand identity',
    sommario: 'Sviluppo di packaging completo per linee prodotto retail, dalla struttura del dieline alla resa in stampa, mantenendo coerenza visiva su tutti i touchpoint: etichette, box, shopper, tag.',
    tag: [
      'Dieline & struttura pack',
      'Gestione colore Pantone / CMYK',
      'File esecutivi per la stampa',
      'Linee guida di brand'
    ],
    immagini: []
  },

  {
    id: 'cataloghi',
    categoria: 'packaging-design',
    titolo: 'Cataloghi e listini',
    sommario: 'Progettazione e impaginazione di cataloghi prodotto stagionali e listini commerciali B2B: centinaia di pagine da tenere leggibili e coerenti, con un sistema di griglia che regge su ogni formato.',
    tag: [
      'Impaginazione InDesign',
      'Sistemi a griglia',
      'Prestampa e controllo qualità',
      'Adattamento multi-formato'
    ],
    immagini: []
  },

  {
    id: 'pos',
    categoria: 'packaging-design',
    titolo: 'Materiali per punti vendita',
    sommario: 'Vetrofanie, allestimenti e promozioni in-store pensate per reggere la distanza e il contesto reale del negozio, mantenendo la stessa identità di brand tra il fisico e il digitale.',
    tag: [
      'Vetrofanie e allestimenti',
      'Materiali promozionali',
      'Coerenza fisico / digitale',
      'Specifiche fornitori'
    ],
    immagini: []
  },

  {
    id: 'digitale',
    categoria: 'packaging-design',
    titolo: 'Contenuti digitali',
    sommario: 'Newsletter, banner e ADV per le campagne digitali, oltre ad asset grafici per social e landing page: la stessa identità di marca dei materiali stampati, adattata ai formati e ai tempi del digitale.',
    tag: [
      'Newsletter e banner',
      'ADV per campagne',
      'Asset per social',
      'Landing page'
    ],
    immagini: []
  },

  {
    id: 'render',
    categoria: 'packaging-design',
    titolo: 'Rendering grafici',
    sommario: 'Progetto di packaging e comunicazione visiva per le linee di piatti Fuoco-Mare-Sabbia.',
    tag: [
      'Packaging',
      'Brand identity',
      'Render 3D'
    ],
    immagini: [
      'assets/packaging/Sabia Mare Fuoco/Fuoco-1.jpg',
      'assets/packaging/Sabia Mare Fuoco/Mare-1.jpg',
      'assets/packaging/Sabia Mare Fuoco/Sabbia-1.jpg'
    ]
  },

  {
    id: 'liberty',
    categoria: 'packaging-design',
    titolo: 'Linea elettrodomestici Liberty',
    sommario: 'Progetto di packaging e comunicazione visiva per la linea di elettrodomestici Liberty.',
    tag: [
      'Packaging',
      'Brand identity',
      'Render 3D'
    ],
    immagini: [
      'assets/packaging/Liberty/liberty-07.png',
      'assets/packaging/Liberty/liberty-02.png',
      'assets/packaging/Liberty/liberty-03.png',
      'assets/packaging/Liberty/liberty-04.png',
      'assets/packaging/Liberty/liberty-05.png',
      'assets/packaging/Liberty/liberty-06.png',
      'assets/packaging/Liberty/liberty-01.png'
    ]
  },

  /* ---------- Altri lavori ---------- */

  {
    id: 'homs',
    categoria: 'altri-lavori',
    titolo: 'Homs — agenzia immobiliare',
    sommario: '[Sostituisci con una descrizione breve: cosa comprendeva il lavoro per Homs — logo, annunci immobiliari, brochure, cartellonistica, social?]',
    tag: ['[tag 1]', '[tag 2]', '[tag 3]'],
    immagini: []
  },

  {
    id: 'gioia-pura',
    categoria: 'altri-lavori',
    titolo: 'Gioia Pura',
    sommario: '[Sostituisci con una descrizione breve: cosa comprendeva il lavoro per Gioia Pura — sito web, identità di marca, materiali stampati, social?]',
    tag: ['[tag 1]', '[tag 2]', '[tag 3]'],
    immagini: []
  },

  {
    id: 'universita',
    categoria: 'altri-lavori',
    titolo: 'Progetti universitari',
    sommario: '[Sostituisci con una descrizione breve: quali progetti del percorso al Politecnico vuoi mostrare?]',
    tag: ['[tag 1]', '[tag 2]', '[tag 3]'],
    immagini: []
  }

  // Il prossimo progetto va copiato qui sopra, separato da una virgola.

];
