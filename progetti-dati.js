/* =========================================================
   PROGETTI DEL PORTFOLIO
   =========================================================

   Questo file è l'unico posto dove aggiungere, modificare o
   togliere un progetto. Il sito li disegna da solo, in ordine,
   senza bisogno di toccare HTML o CSS.

   COME AGGIUNGERE UN NUOVO PROGETTO:

   1. Metti le foto in una cartella dentro assets/ (meglio .webp,
      vanno bene anche jpg e png: larghe al massimo 2400px).
      Se per ora non le hai, lascia "immagini" vuoto: [] — il
      sito mostra le iniziali del progetto al posto delle foto.

   2. Copia un blocco { ... } qui sotto (comprese le graffe),
      incollalo appena prima della riga "];" in fondo al file
      e ricordati la VIRGOLA dopo il blocco precedente.

   3. Compila i campi e salva. Il progetto compare da solo.

   CAMPI DI OGNI PROGETTO:

   - id              → nome breve univoco (minuscolo, senza spazi)
   - categoria       → 'packaging-design' oppure 'altri-lavori'
   - titolo          → il nome del progetto sul sito
   - cliente         → (facoltativo) per chi è il lavoro
   - collaborazione  → (facoltativo) con chi hai collaborato
   - contesto        → (facoltativo) per i progetti non commerciali, es.
                       'Politecnico di Milano'
   - en              → (facoltativo) la versione inglese: titolo,
                       sommario, tag, cliente, contesto, collaborazione.
                       Scrivi solo i campi che cambiano: quelli che
                       mancano restano come in italiano.
   - colore          → il colore del progetto, es. '#8E1B3A'.
                       Tinge la sezione e le anteprime. Scegli il
                       colore dominante del suo packaging.
   - scuro           → (facoltativo) true = sezione su fondo scuro
   - sommario        → 2-3 frasi sul lavoro
   - tag             → 3-5 parole chiave brevi
   - immagini        → percorsi delle foto, nell'ordine in cui
                       vuoi che appaiano sfogliandole

   ========================================================= */

const PROGETTI = [

  /* ---------- Packaging Design ---------- */
   
 {
    id: 'triply-2',
    categoria: 'packaging-design',
    titolo: 'Tri-Ply 2.0',
    cliente: 'Kasanova',
    colore: '#1F5F8B',
    sommario: 'Una linea di alta qualità in cui il packaging mostra la tecnologia nascosta dietro al prodotto e i diversi usi dei vari pezzi.',
    tag: ['Packaging', 'Alta qualità', 'Tecnologia a vista'],
    en: {
      sommario: 'A premium line whose packaging reveals the technology behind the product and the different uses of each piece.',
      tag: ['Packaging', 'Premium quality', 'Technology on show']
    },
    immagini: [
      'assets/packaging/Tri Ply 2.0/triply2-01.webp',
      'assets/packaging/Tri Ply 2.0/triply2-02.webp',
      'assets/packaging/Tri Ply 2.0/triply2-03.webp',
      'assets/packaging/Tri Ply 2.0/triply2-04.webp'
    ]
  },

     {
    id: 'liberty',
    categoria: 'packaging-design',
    titolo: 'Liberty',
    cliente: 'Kasanova',
    colore: '#3E9B6B',
    sommario: 'Una linea di elettrodomestici senza fili, pensata per essere portatile. Il packaging rimanda alla leggerezza e all\'outdoor, per raccontare la libertà di portare il prodotto ovunque.',
    tag: ['Packaging', 'Cordless e portatili', 'Outdoor'],
    en: {
      sommario: 'A line of cordless, portable home appliances. The packaging evokes lightness and the outdoors, to tell the freedom of taking the product anywhere.',
      tag: ['Packaging', 'Cordless and portable', 'Outdoor']
    },
    immagini: [
      'assets/packaging/Liberty/liberty-07.webp',
      'assets/packaging/Liberty/liberty-02.webp',
      'assets/packaging/Liberty/liberty-03.webp',
      'assets/packaging/Liberty/liberty-04.webp',
      'assets/packaging/Liberty/liberty-05.webp',
      'assets/packaging/Liberty/liberty-06.webp',
      'assets/packaging/Liberty/liberty-01.webp'
    ]
  },

     {
    id: 'copper-triply',
    categoria: 'packaging-design',
    titolo: 'Copper Triply',
    cliente: 'Kasanova',
    colore: '#B8673A',
    sommario: 'Variante in rame della batteria Triply. Il packaging valorizza le finiture in rame e la modernità della linea, raccontando la complessità di un prodotto lontano da una classica padella.',
    tag: ['Packaging', 'Finiture in rame', 'Linea Triply'],
    en: {
      sommario: 'The copper version of the Triply cookware line. The packaging highlights the copper finishes and the modernity of the line, conveying a product far more complex than a classic pan.',
      tag: ['Packaging', 'Copper finishes', 'Triply line']
    },
    immagini: [
      'assets/packaging/triplycopper/triplycopper-01.webp',
      'assets/packaging/triplycopper/triplycopper-02.webp',
      'assets/packaging/triplycopper/triplycopper-03.webp',
      'assets/packaging/triplycopper/triplycopper-04.webp',
      'assets/packaging/triplycopper/triplycopper-05.webp',
      'assets/packaging/triplycopper/triplycopper-06.webp'
    ]
  },

     {
    id: 'nuance',
    categoria: 'packaging-design',
    titolo: 'Piatti Nuance',
    cliente: 'Kasanova',
    colore: '#1E9AA8',
    sommario: 'Tre linee di piatti (Fuoco, Mare e Sabbia) che rimandano chiaramente agli elementi naturali, nei colori del prodotto come nel packaging.',
    tag: ['Packaging', 'Ispirazione naturale', 'Fuoco, Mare, Sabbia'],
    en: {
      titolo: 'Nuance Plates',
      sommario: 'Three lines of plates (Fire, Sea and Sand) clearly inspired by the natural elements, in the colours of the product as well as in the packaging.',
      tag: ['Packaging', 'Inspired by nature', 'Fire, Sea, Sand']
    },
    immagini: [
      'assets/packaging/Sabia Mare Fuoco/Fuoco-1.webp',
      'assets/packaging/Sabia Mare Fuoco/Mare-1.webp',
      'assets/packaging/Sabia Mare Fuoco/Sabbia-1.webp'
    ]
  },
   
  {
    id: 'friggitrice',
    categoria: 'packaging-design',
    titolo: 'Friggitrice ad aria, Fatto in casa da Benedetta',
    cliente: 'Kasanova',
    collaborazione: 'Fatto in casa da Benedetta, Mondadori',
    colore: '#E5533D',
    sommario: 'Packaging per la friggitrice ad aria firmata Fatto in casa da Benedetta, realizzato in collaborazione con Mondadori. Il linguaggio visivo dialoga con il resto della linea di elettrodomestici.',
    tag: ['Packaging', 'Collaborazione Mondadori', 'Coerenza di linea'],
    en: {
      titolo: 'Air fryer, Fatto in casa da Benedetta',
      sommario: 'Packaging for the air fryer signed by Fatto in casa da Benedetta, created in collaboration with Mondadori. Its visual language is consistent with the rest of the appliance line.',
      tag: ['Packaging', 'Mondadori collaboration', 'Line consistency']
    },
    immagini: [
      'assets/packaging/FriggitriceBR/friggitricebr-01.webp',
      'assets/packaging/FriggitriceBR/friggitricebr-02.webp',
      'assets/packaging/FriggitriceBR/friggitricebr-03.webp'
    ]
  },

  {
    id: 'iovino',
    categoria: 'packaging-design',
    titolo: 'IoVino',
    cliente: 'Kasanova',
    collaborazione: 'B-Simo, tatuatore',
    colore: '#F2B705',
    sommario: 'Una linea di bicchieri nata dalla collaborazione con il tatuatore B-Simo. Colore e vivacità, e un\'illustrazione diversa che caratterizza ogni singolo prodotto.',
    tag: ['Packaging', 'Illustrazioni di B-Simo', 'Collaborazione'],
    en: {
      collaborazione: 'B-Simo, tattoo artist',
      sommario: 'A line of glasses born from a collaboration with tattoo artist B-Simo. Colour, energy and a different illustration on every single product.',
      tag: ['Packaging', 'Illustrations by B-Simo', 'Collaboration']
    },
    immagini: [
      'assets/packaging/IoVino/iovino-01.webp',
      'assets/packaging/IoVino/iovino-02.webp',
      'assets/packaging/IoVino/iovino-03.webp',
      'assets/packaging/IoVino/iovino-04.webp',
      'assets/packaging/IoVino/iovino-05.webp',
      'assets/packaging/IoVino/iovino-06.webp',
      'assets/packaging/IoVino/iovino-07.webp',
      'assets/packaging/IoVino/iovino-08.webp',
      'assets/packaging/IoVino/iovino-09.webp',
      'assets/packaging/IoVino/iovino-10.webp',
      'assets/packaging/IoVino/iovino-11.webp',
      'assets/packaging/IoVino/iovino-12.webp',
      'assets/packaging/IoVino/iovino-13.webp'
    ]
  },

  {
    id: 'rhapsody',
    categoria: 'packaging-design',
    titolo: 'Rhapsody',
    cliente: 'Kasanova',
    colore: '#B8943A',
    sommario: 'Prodotti matt opachi e oro, molto caratteristici. Il packaging è volutamente plain, per dare il massimo risalto al colore del prodotto.',
    tag: ['Packaging', 'Matt e oro', 'Pack plain'],
    en: {
      sommario: 'Very distinctive matt and gold products. The packaging is deliberately plain, to give the colour of the product maximum impact.',
      tag: ['Packaging', 'Matt and gold', 'Plain pack']
    },
    immagini: [
      'assets/packaging/Rhapsody/rhapsody-01.webp',
      'assets/packaging/Rhapsody/rhapsody-02.webp',
      'assets/packaging/Rhapsody/rhapsody-03.webp',
      'assets/packaging/Rhapsody/rhapsody-04.webp'
    ]
  },

  {
    id: 'bottiglie-termiche',
    categoria: 'packaging-design',
    titolo: 'Bottiglie termiche WOW',
    cliente: 'Kasanova',
    colore: '#FF4F8B',
    sommario: 'Progettazione di prodotto e packaging per una linea di bottiglie termiche dallo stile comic, ricca di colore. Prodotto e confezione parlano la stessa lingua, vivace e fumettosa.',
    tag: ['Packaging', 'Design di prodotto', 'Stile comic'],
    en: {
      titolo: 'WOW thermal bottles',
      sommario: 'Product and packaging design for a colourful, comic-style line of thermal bottles. Product and box speak the same lively, cartoonish language.',
      tag: ['Packaging', 'Product design', 'Comic style']
    },
    immagini: [
      'assets/packaging/BottiglieWOW/bottigliewow-01.webp',
      'assets/packaging/BottiglieWOW/bottigliewow-02.webp',
      'assets/packaging/BottiglieWOW/bottigliewow-03.webp',
      'assets/packaging/BottiglieWOW/bottigliewow-04.webp',
      'assets/packaging/BottiglieWOW/bottigliewow-05.webp',
      'assets/packaging/BottiglieWOW/bottigliewow-06.webp',
      'assets/packaging/BottiglieWOW/bottigliewow-07.webp'
    ]
  },
   
  {
    id: 'macchinetta-caffe',
    categoria: 'packaging-design',
    titolo: 'Macchina da caffè a cialde',
    cliente: 'Kasanova',
    colore: '#3B5BDB',
    sommario: 'Packaging per una macchina da caffè a cialde, costruito su un linguaggio grafico pulito e moderno che lascia tutto lo spazio al prodotto.',
    tag: ['Packaging', 'Stile pulito e moderno', 'Caffè a cialde'],
    en: {
      titolo: 'Coffee pod machine',
      sommario: 'Packaging for a coffee pod machine, built on a clean, modern graphic language that leaves all the space to the product.',
      tag: ['Packaging', 'Clean and modern', 'Coffee pods']
    },
    immagini: [
      'assets/packaging/Macchinetta caffè/macchinetta caffe-01.webp',
      'assets/packaging/Macchinetta caffè/macchinetta caffe-02.webp',
      'assets/packaging/Macchinetta caffè/macchinetta caffe-03.webp'
    ]
  },

  {
    id: 'decanter',
    categoria: 'packaging-design',
    titolo: 'Decanter',
    cliente: 'Kasanova',
    colore: '#8E1B3A',
    sommario: 'Un packaging pensato per trasmettere eleganza e finezza. Tutta la confezione riprende i toni del vino rosso, per evocare il mondo del vino fin dal primo sguardo.',
    tag: ['Packaging', 'Eleganza', 'Toni del vino rosso'],
    en: {
      sommario: 'Packaging designed to convey elegance and refinement. The whole box picks up the tones of red wine, evoking the world of wine at first glance.',
      tag: ['Packaging', 'Elegance', 'Red wine tones']
    },
    immagini: [
      'assets/packaging/Decanter/decanter-01.webp',
      'assets/packaging/Decanter/decanter-02.webp',
      'assets/packaging/Decanter/decanter-03.webp'
    ]
  },

  {
    id: 'lampade-pianeti',
    categoria: 'packaging-design',
    titolo: 'Lampade Pianeti',
    cliente: 'Kasanova',
    colore: '#7C4DFF',
    sommario: 'Una linea di lampade dedicata ai pianeti, con un look divertente e fumettoso. Il packaging porta lo stesso spirito: colorato, giocoso, immediato.',
    tag: ['Packaging', 'Stile fumettoso', 'Colore'],
    en: {
      titolo: 'Planet Lamps',
      sommario: 'A line of lamps dedicated to the planets, with a fun, cartoonish look. The packaging carries the same spirit: colourful, playful, immediate.',
      tag: ['Packaging', 'Cartoon style', 'Colour']
    },
    immagini: [
      'assets/packaging/lampadeTER/lampadeter-01.webp',
      'assets/packaging/lampadeTER/lampadeter-02.webp',
      'assets/packaging/lampadeTER/lampadeter-03.webp'
    ]
  },





  {
    id: 'black-diamond',
    categoria: 'packaging-design',
    titolo: 'Black Diamond',
    cliente: 'Kasanova',
    colore: '#C9A24B',
    scuro: true,
    sommario: 'Una linea costruita in modo volutamente eccessivo, per comunicare la durezza e l\'alta gamma del prodotto. Il packaging non cerca la sobrietà: sceglie l\'impatto.',
    tag: ['Packaging', 'Alta gamma', 'Estetica eccessiva'],
    en: {
      sommario: 'A line deliberately built to be over the top, to communicate the toughness and the high-end positioning of the product. The packaging doesn\'t aim for restraint: it chooses impact.',
      tag: ['Packaging', 'High end', 'Bold aesthetics']
    },
    immagini: [
      'assets/packaging/BlackDiamond/blackdiamond-01.webp',
      'assets/packaging/BlackDiamond/blackdiamond-02.webp'
    ]
  },

  {
    id: 'cooking-therapy',
    categoria: 'packaging-design',
    titolo: 'Cooking Therapy',
    cliente: 'Kasanova',
    colore: '#A8442A',
    sommario: 'Packaging dai toni autunnali per una linea che trasforma la cottura in un momento di relax: cucinare come terapia.',
    tag: ['Packaging', 'Atmosfera autunnale', 'Cucinare per rilassarsi'],
    en: {
      sommario: 'Autumn-toned packaging for a line that turns cooking into a moment of relaxation: cooking as therapy.',
      tag: ['Packaging', 'Autumn mood', 'Cooking to unwind']
    },
    immagini: [
      'assets/packaging/CookingTherapy/cookingtherapy-01.webp',
      'assets/packaging/CookingTherapy/cookingtherapy-02.webp',
      'assets/packaging/CookingTherapy/cookingtherapy-03.webp',
      'assets/packaging/CookingTherapy/cookingtherapy-04.webp'
    ]
  },





  /* ---------- Altri lavori ---------- */

  {
    id: 'homs',
    categoria: 'altri-lavori',
    titolo: 'Le Torri nel bosco',
    cliente: 'Homs, agenzia immobiliare',
    colore: '#2F6B4F',
    sommario: 'Comunicazione immobiliare per Le Torri nel bosco, realizzata per Homs. Una scelta grafica elegante e chiara, pensata per un\'agenzia giovane ma professionale.',
    tag: ['Comunicazione immobiliare', 'Grafica elegante e chiara', 'Volantino e banner'],
    en: {
      cliente: 'Homs, real estate agency',
      sommario: 'Real estate communication for Le Torri nel bosco, created for Homs. An elegant, clear graphic approach for a young but professional agency.',
      tag: ['Real estate communication', 'Elegant, clear graphics', 'Flyer and banners']
    },
    immagini: [
      'assets/vari/homs/volantino-01.webp',
      'assets/vari/homs/banner-02.webp',
      'assets/vari/homs/banner-01.webp'
    ]
  },

  {
    id: 'gioia-pura',
    categoria: 'altri-lavori',
    titolo: 'Gens Aurea',
    cliente: 'Gioia Pura',
    colore: '#C79A2E',
    sommario: 'Materiali web e stampa realizzati per Gioia Pura, con l\'intento di mantenere i colori e lo stile istituzionale del brand e una comunicazione coerente tra schermo e carta.',
    tag: ['Web e stampa', 'Stile istituzionale', 'Coerenza di brand'],
    en: {
      sommario: 'Web and print materials for Gioia Pura, keeping the brand\'s institutional colours and style and a consistent message across screen and paper.',
      tag: ['Web and print', 'Institutional style', 'Brand consistency']
    },
    immagini: [
      'assets/vari/gioiapura/gioiapura_nl-01.webp',
      'assets/vari/gioiapura/gioiapura_b_03.webp',
      'assets/vari/gioiapura/gioiapura_b_02.webp',
      'assets/vari/gioiapura/gioiapura_adv-04.webp'
    ]
  },

  {
    id: 'locus-solus',
    categoria: 'altri-lavori',
    titolo: 'Locus Solus, libro visivo',
    contesto: 'Politecnico di Milano',
    colore: '#6D5BD0',
    sommario: 'Progettazione e impaginazione di un libro visivo dedicato a Locus Solus di Raymond Roussel, realizzato al Politecnico di Milano. Il progetto comprende la copertina magnetica e le illustrazioni.',
    tag: ['Libro visivo', 'Impaginazione', 'Copertina magnetica', 'Illustrazioni'],
    en: {
      titolo: 'Locus Solus, visual book',
      sommario: 'Design and layout of a visual book on Raymond Roussel\'s Locus Solus, created at Politecnico di Milano. The project includes the magnetic cover and the illustrations.',
      tag: ['Visual book', 'Layout', 'Magnetic cover', 'Illustrations']
    },
    immagini: [
      'assets/vari/locussolus/locussolus-01.webp',
      'assets/vari/locussolus/locussolus-02.webp',
      'assets/vari/locussolus/locussolus-03.webp',
      'assets/vari/locussolus/locussolus-04.webp',
      'assets/vari/locussolus/locussolus-05.webp',
      'assets/vari/locussolus/locussolus-06.webp',
      'assets/vari/locussolus/locussolus-07.webp',
      'assets/vari/locussolus/locussolus-08.webp'
    ]
  }

  // Il prossimo progetto va copiato qui sopra, separato da una virgola.

];
