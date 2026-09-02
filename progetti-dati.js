/* =========================================================
   PROGETTI DEL PORTFOLIO
   =========================================================

   Questo file è l'unico posto dove aggiungere, modificare o
   togliere un progetto. Il sito li disegna da solo, in ordine,
   senza bisogno di toccare HTML o CSS.

   COME AGGIUNGERE UN NUOVO PROGETTO:

   1. Crea una cartella dentro assets/progetti/ con un nome
      breve, tutto minuscolo, senza spazi (es. "liberty").

   2. Metti dentro quella cartella le foto o i render del
      progetto (jpg o png). Vanno bene anche 1 sola immagine,
      2, 3 o più — il sito si adatta automaticamente.
      Se per ora non hai ancora le foto, lascia semplicemente
      l'elenco "immagini" vuoto: [] — il sito mostrerà un
      riquadro con le iniziali del progetto al posto delle foto,
      così puoi pubblicarlo comunque e aggiungerle dopo.

   3. Copia uno dei blocchi { ... } qui sotto (comprese le
      parentesi graffe), incollalo appena prima della riga
      "];" in fondo al file, e compila i campi.

   4. Salva il file. Il progetto compare sul sito nell'ordine
      in cui appare qui sotto — per cambiare l'ordine, sposta
      il blocco in una posizione diversa dell'elenco.

   CAMPI DI OGNI PROGETTO:

   - id         → nome breve univoco, deve combaciare con il
                  nome della cartella dentro assets/progetti/
   - titolo     → il nome del progetto come apparirà sul sito
   - sommario   → una descrizione di 2-3 frasi: cosa comprendeva
                  il lavoro, il tuo ruolo, cosa lo rendeva
                  particolare
   - tag        → 3-5 parole chiave brevi (software, tecniche,
                  tipo di materiale)
   - immagini   → elenco dei percorsi delle foto, nell'ordine
                  in cui vuoi che appaiano. La prima immagine
                  viene mostrata più grande delle altre.

   ========================================================= */

const PROGETTI = [

  {
    id: 'packaging',
    titolo: 'Packaging & brand identity',
    sommario: 'Sviluppo di packaging completo per linee prodotto retail, dalla struttura del dieline alla resa in stampa, mantenendo coerenza visiva su tutti i touchpoint: etichette, box, shopper, tag.',
    tag: ['Dieline & struttura pack', 'Gestione colore Pantone / CMYK', 'File esecutivi per la stampa', 'Linee guida di brand'],
    immagini: []
  },

  {
    id: 'cataloghi',
    titolo: 'Cataloghi e listini',
    sommario: 'Progettazione e impaginazione di cataloghi prodotto stagionali e listini commerciali B2B: centinaia di pagine da tenere leggibili e coerenti, con un sistema di griglia che regge su ogni formato.',
    tag: ['Impaginazione InDesign', 'Sistemi a griglia', 'Prestampa e controllo qualità', 'Adattamento multi-formato'],
    immagini: []
  },

  {
    id: 'pos',
    titolo: 'Materiali per punti vendita',
    sommario: 'Vetrofanie, allestimenti e promozioni in-store pensate per reggere la distanza e il contesto reale del negozio, mantenendo la stessa identità di brand tra il fisico e il digitale.',
    tag: ['Vetrofanie e allestimenti', 'Materiali promozionali', 'Coerenza fisico / digitale', 'Specifiche fornitori'],
    immagini: []
  },

  {
    id: 'digitale',
    titolo: 'Contenuti digitali',
    sommario: 'Newsletter, banner e ADV per le campagne digitali, oltre ad asset grafici per social e landing page: la stessa identità di marca dei materiali stampati, adattata ai formati e ai tempi del digitale.',
    tag: ['Newsletter e banner', 'ADV per campagne', 'Asset per social', 'Landing page'],
    immagini: []
  },

  {
    id: 'render',
    titolo: 'Rendering grafici',
    sommario: 'Visualizzazioni 2D/3D di prodotto per presentazioni interne e approvazioni fornitori, utili quando il campione fisico non c\'è ancora ma la decisione va presa comunque.',
    tag: ['Adobe Dimension', 'Mockup di prodotto', 'Visualizzazioni 2D/3D', 'Materiali per approvazione'],
    immagini: []
  },

  {
    id: 'liberty',
    titolo: 'Linea elettrodomestici Liberty',
    sommario: '[Sostituisci con una descrizione breve: cosa comprendeva il progetto Liberty — packaging, brand identity della linea, render di prodotto per il lancio, materiali per il punto vendita?]',
    tag: ['[tag 1]', '[tag 2]', '[tag 3]'],
    immagini: [
      '/assets/packaging/Liberty/liberty-01.jpg'
    ]
  }

  // Il prossimo progetto va copiato qui sopra, separato da una virgola.

];
