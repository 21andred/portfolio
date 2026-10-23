/* =========================================================
   PROGETTI DEL PORTFOLIO
   =========================================================

   Questo file è l'unico posto dove aggiungere, modificare o
   togliere un progetto. Il sito li disegna da solo, in ordine,
   senza bisogno di toccare HTML o CSS.

   COME AGGIUNGERE UN NUOVO PROGETTO:

   1. Metti le foto in una cartella dentro assets/ (jpg o png).
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
    immagini: [
      'assets/packaging/Tri Ply 2.0/triply2-01.png',
      'assets/packaging/Tri Ply 2.0/triply2-02.png'
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

     {
    id: 'copper-triply',
    categoria: 'packaging-design',
    titolo: 'Copper Triply',
    cliente: 'Kasanova',
    colore: '#B8673A',
    sommario: 'Variante in rame della batteria Triply. Il packaging valorizza le finiture in rame e la modernità della linea, raccontando la complessità di un prodotto lontano da una classica padella.',
    tag: ['Packaging', 'Finiture in rame', 'Linea Triply'],
    immagini: [
      'assets/packaging/triplycopper/triplycopper-01.png',
      'assets/packaging/triplycopper/triplycopper-02.png',
      'assets/packaging/triplycopper/triplycopper-03.jpg',
      'assets/packaging/triplycopper/triplycopper-04.jpg',
      'assets/packaging/triplycopper/triplycopper-05.jpg',
      'assets/packaging/triplycopper/triplycopper-06.jpg'
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
    immagini: [
      'assets/packaging/Sabia Mare Fuoco/Fuoco-1.jpg',
      'assets/packaging/Sabia Mare Fuoco/Mare-1.jpg',
      'assets/packaging/Sabia Mare Fuoco/Sabbia-1.jpg'
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
    immagini: [
      'assets/packaging/FriggitriceBR/friggitricebr-01.png',
      'assets/packaging/FriggitriceBR/friggitricebr-02.png',
      'assets/packaging/FriggitriceBR/friggitricebr-03.png'
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
    immagini: [
      'assets/packaging/IoVino/iovino-01.jpg',
      'assets/packaging/IoVino/iovino-02.jpg',
      'assets/packaging/IoVino/iovino-03.jpg',
      'assets/packaging/IoVino/iovino-04.jpg',
      'assets/packaging/IoVino/iovino-05.jpg',
      'assets/packaging/IoVino/iovino-06.jpg',
      'assets/packaging/IoVino/iovino-07.jpg',
      'assets/packaging/IoVino/iovino-08.jpg',
      'assets/packaging/IoVino/iovino-09.jpg',
      'assets/packaging/IoVino/iovino-10.jpg',
      'assets/packaging/IoVino/iovino-11.jpg',
      'assets/packaging/IoVino/iovino-12.jpg',
      'assets/packaging/IoVino/iovino-13.jpg'
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
    immagini: [
      'assets/packaging/Rhapsody/rhapsody-01.png',
      'assets/packaging/Rhapsody/rhapsody-02.png',
      'assets/packaging/Rhapsody/rhapsody-03.png',
      'assets/packaging/Rhapsody/rhapsody-04.png'
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
    immagini: [
      'assets/packaging/BottiglieWOW/bottigliewow-01.jpg',
      'assets/packaging/BottiglieWOW/bottigliewow-02.jpg',
      'assets/packaging/BottiglieWOW/bottigliewow-03.jpg',
      'assets/packaging/BottiglieWOW/bottigliewow-04.jpg',
      'assets/packaging/BottiglieWOW/bottigliewow-05.jpg',
      'assets/packaging/BottiglieWOW/bottigliewow-06.jpg',
      'assets/packaging/BottiglieWOW/bottigliewow-07.jpg'
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
    immagini: [
      'assets/packaging/Macchinetta caffè/macchinetta caffe-01.png',
      'assets/packaging/Macchinetta caffè/macchinetta caffe-02.png',
      'assets/packaging/Macchinetta caffè/macchinetta caffe-03.png'
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
    immagini: [
      'assets/packaging/Decanter/decanter-01.png',
      'assets/packaging/Decanter/decanter-02.png',
      'assets/packaging/Decanter/decanter-03.png'
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
    immagini: [
      'assets/packaging/lampadeTER/lampadeter-01.png',
      'assets/packaging/lampadeTER/lampadeter-02.png',
      'assets/packaging/lampadeTER/lampadeter-03.png'
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
    immagini: [
      'assets/packaging/BlackDiamond/blackdiamond-01.jpg',
      'assets/packaging/BlackDiamond/blackdiamond-02.jpg'
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
    immagini: [
      'assets/packaging/CookingTherapy/cookingtherapy-01.jpg',
      'assets/packaging/CookingTherapy/cookingtherapy-02.jpg',
      'assets/packaging/CookingTherapy/cookingtherapy-03.jpg',
      'assets/packaging/CookingTherapy/cookingtherapy-04.jpg'
    ]
  },





  /* ---------- Altri lavori ---------- */

  {
    id: 'homs',
    categoria: 'altri-lavori',
    titolo: 'Homs, agenzia immobiliare',
    colore: '#1D6FA5',
    sommario: '[Sostituisci con una descrizione breve: cosa comprendeva il lavoro per Homs, ad esempio logo, annunci immobiliari, brochure, cartellonistica, social?]',
    tag: ['[tag 1]', '[tag 2]', '[tag 3]'],
    immagini: [
      'assets/vari/homs/volantino-01.jpg',
      'assets/vari/homs/banner-02.png',
      'assets/vari/homs/banner-01.jpg'
    ]
  },

  {
    id: 'gioia-pura',
    categoria: 'altri-lavori',
    titolo: 'Gioia Pura',
    colore: '#E0709A',
    sommario: '[Sostituisci con una descrizione breve: cosa comprendeva il lavoro per Gioia Pura, ad esempio sito web, identità di marca, materiali stampati, social?]',
    tag: ['[tag 1]', '[tag 2]', '[tag 3]'],
    immagini: [
      'assets/vari/gioiapura/gioiapura_nl-01.gif',
      'assets/vari/gioiapura/gioiapura_b_03.jpg',
      'assets/vari/gioiapura/gioiapura_b_02.jpg',
      'assets/vari/gioiapura/gioiapura_adv-04.jpg'
    ]
  },

  {
    id: 'universita',
    categoria: 'altri-lavori',
    titolo: 'Progetti universitari',
    colore: '#6D5BD0',
    sommario: '[Sostituisci con una descrizione breve: quali progetti del percorso al Politecnico vuoi mostrare?]',
    tag: ['[tag 1]', '[tag 2]', '[tag 3]'],
    immagini: [
      'assets/vari/locussolus/locussolus-01.jpg',
      'assets/vari/locussolus/locussolus-02.jpg',
      'assets/vari/locussolus/locussolus-03.jpg',
      'assets/vari/locussolus/locussolus-04.jpg',
      'assets/vari/locussolus/locussolus-05.jpg',
      'assets/vari/locussolus/locussolus-06.jpg',
      'assets/vari/locussolus/locussolus-07.jpg',
      'assets/vari/locussolus/locussolus-08.jpg'
    ]
  }

  // Il prossimo progetto va copiato qui sopra, separato da una virgola.

];
