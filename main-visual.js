const topics = [
  {
    id: 'celulosa-bacteriana', number: '01', name: 'Celulosa bacteriana', tone: '#658d76',
    steps: [
      ['Té verde reutilizado + azucar', 'De residuo a recurso.'],
      ['Bacterias + levaduras', 'Cultivar en colaboración.'],
      ['Fermentación', 'Un proceso vivo.'],
      ['Celulosa Bacteriana', 'Un material que crece.'],
      ['Biomáscaras', 'Nuevas formas de expresión.'],
      ['Lámparas', 'Nuevas formas de expresión.']
    ]
  },
  {
    id: 'bioplasticos', number: '02', name: 'Bioplásticos', tone: '#b28e55',
    steps: [
      ['Cáscaras de naranja, de guisante y posos de café', 'De residuo a recurso. Recuperamos biorresiduos locales que limpiamos, secamos y trituramos para incorporarlos a nuevas formulaciones de bioplásticos.'],
      ['Biopolímeros naturales', 'Ingredientes que unen la materia. Utilizamos biopolímeros de origen natural, como la gelatina o el agar, para crear mezclas que podemos transformar en nuevos materiales.'],
      ['Mezclado y Cocinado', 'Cocinar nuevos materiales. Combinamos biopolímeros, agua y biorresiduos mediante procesos de mezclado y cocción. Después, moldeamos y secamos las mezclas para obtener bioplásticos con diferentes propiedades.'],
      ['Bioplásticos', 'Explorando nuevas posibilidades materiales. Desarrollamos bioplásticos a partir de biopolímeros naturales y biorresiduos locales, experimentando con sus formulaciones, texturas, propiedades y posibles aplicaciones en el diseño.'],
      ['Biomáscaras y Gafas', 'Otras maneras de mirar. Creamos dispositivos culturales y herramientas de diseño especulativo, educación y participación que invitan a explorar nuevas formas de relacionarnos con nuestro entorno.'],
      ['Mantón', 'Una creación que florece en comunidad. Transformamos biorresiduos locales en flores y elementos decorativos de bioplástico para crear un mantón colectivo que conecta artesanía, territorio y participación'],
      ['Accesorios', 'Del residuo al objeto. Exploramos las posibilidades de los bioplásticos para crear pequeñas piezas y accesorios, experimentando con colores, formas, texturas y acabados.'],
      ['Biokit Bioplásticos', 'Del territorio al bioplástico. Un pequeño laboratorio portátil para experimentar con biorresiduos locales y crear tus propios bioplásticos en casa.'],
    ]
  },
  {
    id: 'bioceramica', number: '03', name: 'Biocerámica', tone: '#4f9288',
    steps: [
      ['Cáscaras de mejillón, huevo y otros biorresiduos', 'De residuo a recurso.'],
      ['Biopolímeros', 'Ingredientes que unen la materia.'],
      ['Cocinado', 'Cocinar materiales sin aplicar calor.'],
      ['Biocerámica', 'Un nuevo material a partir de residuos.'],
      ['Baldosas', 'Nuevas superficies a partir de residuos minerales.'],
      ['Tótems / Columnas', 'Nuevas superficies a partir de residuos minerales.'],
      ['Gafas y biomáscaras', 'La biocerámica puede utilizarse para crear gafas y biomáscaras.']
    ]
  },
  {
    id: 'micelio', number: '04', name: 'Micelio', tone: '#977996',
    steps: [
      ['Restos de serrín, granos y posos de café', 'De residuo a recurso.'],
      ['Hongos', 'Nuestros colaboradores vivos.'],
      ['Inoculación', 'Cultivar en lugar de fabricar.'],
      ['Micelio', 'Un material que crece.']
    ]
  }
];

const homeView = document.getElementById('homeView');
const processView = document.getElementById('processView');
const homeButton = document.getElementById('homeButton');
const orbitStage = document.getElementById('orbitStage');
const topicCircles = document.getElementById('topicCircles');
const processStage = document.getElementById('processStage');
const processNodes = document.getElementById('processNodes');
const processArrows = document.getElementById('processArrows');
const processFrame = document.getElementById('processFrame');
const projectCards = document.getElementById('projectCards');
let activeTopic = null;
let activeNodes = [];
let activeBubbles = [];

const bioplasticProjects = [
  {
    title: 'Biomáscaras',
    subtitle: 'Diseño y cultura en Chamberí',
    description: 'Dispositivos culturales y herramientas de diseño especulativo, educación y participación.',
    people: 'Hechas por personas mayores y niños.',
    result: '57 máscaras creadas.',
    image: 'c4b6f8db-3ce8-46d9-8248-cfbc14356fb8.jpg',
    video: 'https://www.youtube.com/watch?v=6EZTdfSkJDQ'
  },
  {
    title: 'Mantón Collectivo',
    subtitle: 'El Rincón del Brote',
    description: 'Creemos en la belleza de lo que renace. Transformamos residuos orgánicos en una creación artesanal colectiva. Porque cuando una comunidad crea unida, florece.',
    people: 'Hecho en colaboración con Centro de Día Casa de las Flores.',
    result: '',
    image: 'IMG_8275.JPEG',
    video: 'https://www.youtube.com/shorts/czNZ8aRe5N0'
  },
  {
    title: 'Biokit Bioplásticos',
    subtitle: 'Laboratorio portátil',
    description: 'Del territorio al bioplástico. Un pequeño laboratorio portátil para experimentar con biorresiduos locales y crear tus propios bioplásticos en casa.',
    people: '',
    result: '',
    image: null,
    video: null
  }
];

topics.forEach((topic, index) => {
  const circle = document.createElement('button');
  circle.type = 'button';
  circle.className = 'topic-circle';
  if (topic.id === 'celulosa-bacteriana') circle.classList.add('topic-celulosa');
  if (topic.id === 'bioplasticos') circle.classList.add('topic-bioplasticos');
  if (topic.id === 'bioceramica') circle.classList.add('topic-bioceramica');
  if (topic.id === 'micelio') circle.classList.add('topic-micelio');
  circle.setAttribute('aria-label', `Círculo ${index + 1}: ${topic.name}. Abrir proceso`);
  circle.innerHTML = '<span class="topic-name"></span><span class="topic-open">EXPLORAR PROCESO</span>';
  circle.querySelector('.topic-name').textContent = topic.name;
  circle.addEventListener('click', () => openTopic(topic));
  topicCircles.appendChild(circle);
});

function positionHomeCircles() {
  const width = orbitStage.clientWidth;
  const height = orbitStage.clientHeight;
  const circleSize = width <= 620 ? 112 : width <= 900 ? 160 : 176;
  const maxRadiusX = Math.max(0, (width / 2 - circleSize / 2 - 7) / Math.SQRT1_2);
  const maxRadiusY = Math.max(0, (height / 2 - circleSize / 2 - 7) / Math.SQRT1_2);
  const radius = Math.min(width * .52, maxRadiusX, maxRadiusY, 388);
  const angles = [-45, -135, 135, 45];
  const coordinates = angles.map(degrees => {
    const angle = degrees * Math.PI / 180;
    return [width / 2 + radius * Math.cos(angle), height / 2 + radius * Math.sin(angle)];
  });
  [...topicCircles.children].forEach((circle, index) => {
    circle.style.left = `${coordinates[index][0] / width * 100}%`;
    circle.style.top = `${coordinates[index][1] / height * 100}%`;
  });
}

function showHome(updateHash = true) {
  activeTopic = null;
  homeView.hidden = false;
  processView.hidden = true;
  homeView.classList.add('is-active');
  processView.classList.remove('is-active');
  homeButton.hidden = true;
  processFrame.classList.remove('has-open-bubble');
  if (updateHash && location.hash) history.pushState(null, '', `${location.pathname}${location.search}`);
}

function openTopic(topic, updateHash = true) {
  activeTopic = topic;
  homeView.hidden = true;
  processView.hidden = false;
  homeView.classList.remove('is-active');
  processView.classList.add('is-active');
  homeButton.hidden = false;
  const processKicker = document.getElementById('processKicker');
  const celulosaBrand = document.getElementById('celulosaProcessBrand');
  const celulosaType = document.getElementById('celulosaProcessType');
  const isCelulosa = topic.id === 'celulosa-bacteriana';
  const isBioplasticos = topic.id === 'bioplasticos';
  const isMicelio = topic.id === 'micelio';
  const isBioceramica = topic.id === 'bioceramica';
  const hasCultivatedHeader = isCelulosa || isMicelio;
  processFrame.classList.remove('has-open-bubble');
  const processHeading = document.querySelector('.process-heading');
  processHeading.classList.toggle('is-celulosa', isCelulosa);
  processHeading.classList.toggle('is-micelio', isMicelio);
  processHeading.classList.toggle('is-bioplasticos', isBioplasticos);
  processHeading.classList.toggle('is-bioceramica', isBioceramica);
  processFrame.classList.toggle('is-celulosa-flow', isCelulosa);
  processFrame.classList.toggle('is-bioplasticos-flow', isBioplasticos);
  processFrame.classList.toggle('is-micelio-flow', isMicelio);
  processFrame.classList.toggle('is-bioceramica-flow', isBioceramica);
  document.getElementById('celulosaSideNotes').hidden = !(hasCultivatedHeader || isBioplasticos || isBioceramica);
  const cultNote = document.querySelector('#celulosaSideNotes .flow-note-left .flow-note-row:nth-child(2) span');
  if (cultNote) {
    if (isBioplasticos) cultNote.textContent = 'Mezclado y cocinado';
    else if (isBioceramica) cultNote.textContent = 'Cocinar en frío';
    else cultNote.textContent = 'Cultivo y biofabricación';
  }
  const resourcesNote = document.querySelector('#celulosaSideNotes .flow-note-left .flow-note-row:first-child span');
  const locationNote = document.querySelector('#celulosaSideNotes .flow-note-right .flow-note-row:first-child span');
  const peopleNote = document.querySelector('#celulosaSideNotes .flow-note-right .flow-note-row:nth-child(2) span');
  resourcesNote.textContent = isBioceramica ? 'Recursos locales' : 'Recursos';
  locationNote.textContent = isBioceramica ? 'Chamberí\n(Argüelles)' : 'Chamberí';
  peopleNote.textContent = isBioceramica ? 'Smartincircles\nLa Ría\nPara tomar y llevar' : 'Utane Smartincircles';
  if (isBioplasticos) {
    peopleNote.replaceChildren(document.createTextNode('Smartincircles'));
    const partners = document.createElement('small');
    partners.textContent = 'C.B. Frutería Ramos Hermanos Gonzales, Las Fincas Centro de día Casa de las Flores UDIT';
    peopleNote.appendChild(partners);
  }
  processKicker.textContent = `CÍRCULO ${topic.number} · CICLO DE MATERIALES`;
  processKicker.hidden = true;
  celulosaBrand.hidden = false;
  celulosaType.hidden = false;
  celulosaType.querySelector('span').textContent = hasCultivatedHeader ? 'Material cultivado' : 'Material cocinado';
  document.getElementById('processTitle').textContent = topic.name;
  document.getElementById('processSubtitle').textContent = isBioceramica
    ? 'Un biomaterial que se crea al mezclar y cocinar residuos minerales y biopolímeros.'
    : hasCultivatedHeader
    ? 'Un biomaterial que crece gracias a la colaboración con microorganismos'
    : 'Un biomaterial que se crea a mezclar y cocinar distintos ingredientes';
  processStage.style.setProperty('--accent', topic.tone);
  processFrame.classList.toggle('has-projects', (topic.id === 'bioplasticos' || topic.id === 'bioceramica') && Boolean(projectCards));
  renderSteps(topic);
  renderProjectCards(topic);
  if (updateHash) location.hash = topic.id;
  requestAnimationFrame(() => {
    positionSteps();
    drawArrows();
  });
}

function renderProjectCards(topic) {
  if (!projectCards) return;
  projectCards.replaceChildren();
  if (topic.id === 'bioceramica') {
    projectCards.hidden = false;
    const card = document.createElement('article');
    card.className = 'project-card seafood-card';
    const link = document.createElement('a');
    link.className = 'seafood-link';
    link.href = 'https://www.smartincircles.com/seafoodforthought';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.innerHTML = '<span class="seafood-image" aria-hidden="true"></span><span class="seafood-copy"><span class="seafood-kicker">NUESTRO PROYECTO</span><strong>Seafood for Thought</strong><span>Baldosas y tótems impresos en 3D con biocerámica para espacios interiores.</span></span><span class="seafood-arrow" aria-hidden="true">→</span>';
    card.appendChild(link);
    projectCards.appendChild(card);
    return;
  }
  if (topic.id !== 'bioplasticos') {
    projectCards.hidden = true;
    return;
  }
  projectCards.hidden = false;
  bioplasticProjects.forEach(project => {
    const isBiokit = project.title === 'Biokit Bioplásticos';
    const card = document.createElement('article');
    card.className = 'project-card';
    const imagePanel = document.createElement('div');
    imagePanel.className = 'project-image';
    if (project.image) {
      imagePanel.style.backgroundImage = `linear-gradient(155deg,rgba(25,35,28,.25),rgba(25,35,28,.65)),url("${project.image}")`;
      imagePanel.style.backgroundSize = 'cover';
      imagePanel.style.backgroundPosition = 'center';
    }
    if (project.title === 'Biokit Bioplásticos') {
      imagePanel.classList.add('biokit-can');
      imagePanel.setAttribute('role', 'img');
      imagePanel.setAttribute('aria-label', 'Ilustración animada de un Biokit');
      const can = document.createElement('span');
      can.className = 'project-biokit-illustration';
      can.textContent = 'BIOKIT';
      const scene = document.createElement('span');
      scene.className = 'project-biokit-scene';
      const dish = document.createElement('span');
      dish.className = 'biokit-dish';
      const orange = document.createElement('span');
      orange.className = 'biokit-orange';
      scene.append(can, dish, orange);
      imagePanel.appendChild(scene);
    }
    const contentPanel = document.createElement('div');
    contentPanel.className = 'project-content';
    const toggle = document.createElement(isBiokit ? 'div' : 'button');
    if (!isBiokit) toggle.type = 'button';
    toggle.className = 'project-toggle';
    if (!isBiokit && !project.video) toggle.setAttribute('aria-expanded', 'false');
    if (project.video) {
      toggle.setAttribute('aria-label', `${project.title}: ver video en YouTube (nueva pestaña)`);
      imagePanel.style.cursor = 'pointer';
      imagePanel.addEventListener('click', () => window.open(project.video, '_blank', 'noopener,noreferrer'));
    }
    const kicker = document.createElement('span');
    kicker.className = 'project-kicker';
    kicker.textContent = 'PROYECTO';
    const title = document.createElement('span');
    title.className = 'project-title';
    title.textContent = project.title;
    const subtitle = document.createElement('span');
    subtitle.className = 'project-subtitle';
    subtitle.textContent = project.description;
    const affordance = document.createElement('span');
    affordance.className = 'project-affordance';
    affordance.textContent = '→';
    toggle.append(kicker, title, subtitle);
    if (!isBiokit) toggle.appendChild(affordance);
    contentPanel.appendChild(toggle);
    const details = document.createElement('div');
    details.className = 'project-details';
    const description = document.createElement('p');
    description.textContent = project.description;
    const people = document.createElement('p');
    people.innerHTML = `<strong>Participantes</strong> ${project.people}`;
    details.append(description, people);
    if (project.result) {
      const result = document.createElement('p');
      result.innerHTML = `<strong>Resultado</strong> ${project.result}`;
      details.append(result);
    }
    if (project.video) {
      const play = document.createElement('a');
      play.className = 'project-video';
      play.href = project.video;
      play.target = '_blank';
      play.rel = 'noopener noreferrer';
      play.textContent = '▶ Ver video en YouTube (nueva pestaña)';
      details.append(play);
    } else {
      const pending = document.createElement('span');
      pending.className = 'project-video pending';
      pending.textContent = 'Video por añadir';
      details.append(pending);
    }
    toggle.addEventListener('click', () => {
      if (isBiokit) return;
      if (project.video) {
        window.open(project.video, '_blank', 'noopener,noreferrer');
        return;
      }
      const expanded = card.classList.toggle('expanded');
      toggle.setAttribute('aria-expanded', String(expanded));
      details.hidden = !expanded;
      affordance.textContent = expanded ? '−' : '→';
      window.setTimeout(positionSteps, 260);
    });
    details.hidden = true;
    card.append(imagePanel, contentPanel, details);
    projectCards.appendChild(card);
  });
}

function renderSteps(topic) {
  processNodes.replaceChildren();
  activeBubbles = [];
  processArrows.innerHTML = `<defs><marker id="cycle-arrow" markerWidth="10" markerHeight="10" refX="7.5" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M1 1 L7.5 5 L1 9" fill="none" stroke="${topic.tone}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></marker></defs>`;
  activeNodes = topic.steps.map(([title, description], index) => {
    const node = document.createElement('button');
    node.type = 'button';
    node.className = 'process-node';
    if (topic.id === 'celulosa-bacteriana' && index < 2) node.classList.add('celulosa-input-node');
    if (topic.id === 'celulosa-bacteriana' && index === 0) node.classList.add('step-tea-photo');
    if (topic.id === 'celulosa-bacteriana' && index === 1) node.classList.add('step-bacteria-photo');
    if (topic.id === 'celulosa-bacteriana' && index === 2) node.classList.add('is-fermentation-node');
    if (topic.id === 'celulosa-bacteriana' && index === 3) node.classList.add('step-cellulose-photo');
    if (topic.id === 'celulosa-bacteriana' && index === 4) node.classList.add('step-biomascaras-photo');
    if (topic.id === 'celulosa-bacteriana' && index === 5) node.classList.add('step-lamparas-photo');
    if (topic.id === 'bioplasticos' && index === 0) node.classList.add('step-cascara-photo');
    if (topic.id === 'bioplasticos' && index === 1) node.classList.add('step-biopolymers-photo');
    if (topic.id === 'bioplasticos' && index < 2) node.classList.add('bioplastic-input-node');
    if (topic.id === 'bioplasticos' && index === 2) node.classList.add('is-mixing-node');
    if (topic.id === 'bioplasticos' && index === 3) node.classList.add('step-bioplasticos-photo');
    if (topic.id === 'bioplasticos' && index === 4) node.classList.add('step-mascaras-photo');
    if (topic.id === 'bioplasticos' && index === 5) node.classList.add('step-manton-photo');
    if (topic.id === 'bioplasticos' && index === 6) node.classList.add('step-accesorios-photo');
    if (topic.id === 'bioplasticos' && index === 7) node.classList.add('step-biokit-node');
    if (topic.id === 'bioplasticos' && index > 3) node.classList.add('bioplastic-output-node');
    if (topic.id === 'bioceramica' && index === 0) node.classList.add('step-eggshells-photo');
    if (topic.id === 'bioceramica' && index === 1) node.classList.add('step-biopolymers-photo');
    if (topic.id === 'bioceramica' && index === 2) node.classList.add('is-cooking-node');
    if (topic.id === 'bioceramica' && index === 3) node.classList.add('step-bioceramica-photo');
    if (topic.id === 'bioceramica' && index === 4) node.classList.add('step-baldosas-photo');
    if (topic.id === 'bioceramica' && index === 5) node.classList.add('step-totems-photo');
    if (topic.id === 'bioceramica' && index === 6) node.classList.add('step-gafas-photo');
    if (topic.id === 'micelio' && index === 0) node.classList.add('step-rice-photo');
    if (topic.id === 'micelio' && index === 1) node.classList.add('step-hongos-photo');
    if (topic.id === 'micelio' && index === 3) node.classList.add('step-micelio-photo');
    if (topic.id === 'micelio' && index === 2) node.classList.add('is-inoculation-node');
    node.style.setProperty('--tone-fill', `${topic.tone}16`);
    node.style.setProperty('--tone-border', `${topic.tone}55`);
    node.style.setProperty('--tone-text', topic.tone);
    node.setAttribute('aria-expanded', 'false');
    node.setAttribute('aria-label', `${title}. Mostrar descripción`);
    if (topic.id === 'bioplasticos' && index === 7) {
      node.removeAttribute('aria-expanded');
      node.setAttribute('aria-label', title);
    }
    const number = document.createElement('span');
    number.className = 'step-index';
    number.textContent = String(index + 1).padStart(2, '0');
    const heading = document.createElement('span');
    heading.className = 'step-title';
    heading.textContent = title;
    const hint = document.createElement('span');
    hint.className = 'step-hint';
    hint.textContent = 'TOCA PARA LEER';
    const bubble = document.createElement('div');
    bubble.className = 'step-bubble';
    bubble.id = `stepBubble-${topic.id}-${index}`;
    bubble.hidden = true;
    bubble.style.setProperty('--tone-text', topic.tone);
    node.setAttribute('aria-controls', bubble.id);
    const text = document.createElement('span');
    text.className = 'step-description';
    const bubbleTitle = document.createElement('span');
    bubbleTitle.className = 'bubble-title';
    bubbleTitle.textContent = title;
    if (topic.id === 'celulosa-bacteriana' && index === 0) {
      const lead = document.createElement('strong');
      lead.textContent = description;
      text.append(lead, document.createTextNode(' Recuperamos té verde utilizado y lo combinamos con agua y azúcar para preparar un medio nutritivo en el que puedan desarrollarse los microorganismos.'));
    } else if (topic.id === 'celulosa-bacteriana' && index === 1) {
      const lead = document.createElement('strong');
      lead.textContent = description;
      const species = document.createElement('em');
      species.textContent = 'Komagataeibacter';
      text.append(lead, document.createTextNode(' En el cultivo de kombucha conviven bacterias y levaduras. Las levaduras transforman los azúcares, mientras que bacterias como '), species, document.createTextNode(' producen las fibras que forman la celulosa bacteriana.'));
    } else if (topic.id === 'celulosa-bacteriana' && index === 2) {
      const lead = document.createElement('strong');
      lead.textContent = description;
      text.append(lead, document.createTextNode(' A través de la fermentación, los microorganismos transforman el medio de cultivo y las bacterias generan una película de celulosa en su superficie. Un proceso que requiere tiempo y condiciones adecuadas.'));
    } else if (topic.id === 'celulosa-bacteriana' && index === 3) {
      const firstLead = document.createElement('strong');
      firstLead.textContent = description;
      const secondLead = document.createElement('strong');
      secondLead.textContent = ' Un material que crece.';
      text.append(firstLead, secondLead, document.createTextNode(' Una lámina de celulosa producida por bacterias que podemos recolectar, limpiar, moldear y secar. Su textura, flexibilidad y apariencia varían según los tratamientos y procesos de secado.'));
    } else if (topic.id === 'celulosa-bacteriana' && (index === 4 || index === 5)) {
      const lead = document.createElement('strong');
      lead.textContent = description;
      text.append(lead, document.createTextNode(' Exploramos la celulosa bacteriana como una piel moldeable para crear biomáscaras, investigando sus texturas, transparencias y posibilidades expresivas.'));
    } else if (topic.id === 'micelio' && index === 0) {
      const lead = document.createElement('strong');
      lead.textContent = description;
      text.append(lead, document.createTextNode(' En SICLab experimentamos con distintos residuos del barrio de Chamberí, como serrín, cereales descartados y posos de café, explorando su potencial como sustratos para cultivar micelio y desarrollar nuevos biomateriales.'));
    } else if (topic.id === 'micelio' && index === 1) {
      const lead = document.createElement('strong');
      lead.textContent = description;
      text.append(lead, document.createTextNode(' Los hongos desarrollan una red de filamentos llamada micelio, capaz de crecer sobre distintos sustratos orgánicos y unir sus partículas. Aprovechamos esta capacidad natural para cultivar nuevos materiales.'));
    } else if (topic.id === 'micelio' && index === 2) {
      const lead = document.createElement('strong');
      lead.textContent = description;
      text.append(lead, document.createTextNode(' Incorporamos el hongo al sustrato preparado. En condiciones controladas de humedad y temperatura, el micelio crece y coloniza el material, formando una red que aglutina sus partículas.'));
    } else if (topic.id === 'micelio' && index === 3) {
      const lead = document.createElement('strong');
      lead.textContent = description;
      text.append(lead, document.createTextNode(' El micelio coloniza y une los residuos orgánicos, dando lugar a un biocompuesto que puede cultivarse en distintos moldes y secarse para obtener diferentes formas y propiedades.'));
      text.append(document.createElement('br'), document.createElement('br'), document.createTextNode('Actualmente, en SmartincirclesLab estamos investigando distintas especies locales, procesos de cultivo y propiedades del material para explorar sus posibles aplicaciones.'));
    } else if (topic.id === 'bioceramica' && index === 0) {
      const lead = document.createElement('strong');
      lead.textContent = description;
      text.append(lead, document.createTextNode(' En SmartincirclesLab transformamos residuos ricos en minerales, como conchas de mejillón y cáscaras de huevo, mediante limpieza, secado y trituración, para incorporarlos a nuevas formulaciones de biocerámica.'));
    } else if (topic.id === 'bioceramica' && index === 1) {
      const lead = document.createElement('strong');
      lead.textContent = description;
      text.append(lead, document.createTextNode(' Los biopolímeros naturales actúan como aglutinantes de las partículas minerales, permitiendo crear mezclas moldeables mediante procesos de gelificación en frío, antes de su secado.'));
    } else if (topic.id === 'bioceramica' && index === 2) {
      const lead = document.createElement('strong');
      lead.textContent = description;
      text.append(lead, document.createTextNode(' Transformamos residuos minerales y biopolímeros en biocerámica mediante gelificación en frío, moldeado y secado.'));
    } else if (topic.id === 'bioceramica' && index === 3) {
      const lead = document.createElement('strong');
      lead.textContent = description;
      text.append(lead, document.createTextNode(' La biocerámica es un biocompuesto que creamos combinando residuos minerales con biopolímeros. Experimentamos con distintas formulaciones y procesos para obtener piezas con diferentes formas, texturas y acabados, explorando sus aplicaciones en el diseño de productos y espacios.'));
    } else if (topic.id === 'bioceramica' && (index === 4 || index === 5)) {
      const lead = document.createElement('strong');
      lead.textContent = description;
      const project = document.createElement('em');
      project.textContent = 'Seafood for Thought';
      const printing = document.createElement('strong');
      printing.textContent = 'impresión 3D';
      const surfaces = document.createElement('strong');
      surfaces.textContent = 'superficies';
      const modular = document.createElement('strong');
      modular.textContent = 'modulares que se ensamblan horizontalmente sobre paredes';
      text.append(lead, document.createTextNode(' En el proyecto '), project, document.createTextNode(', exploramos la fabricación de baldosas de biocerámica mediante '), printing, document.createTextNode(', utilizando residuos de origen marino. Experimentamos con distintas geometrías, texturas y acabados para crear '), surfaces, document.createTextNode(' '), modular, document.createTextNode('.'));
    } else if (topic.id === 'bioceramica' && index === 6) {
      const lead = document.createElement('strong');
      lead.textContent = 'Otras maneras de mirar.';
      text.append(lead, document.createElement('br'), document.createTextNode('Dispositivos pedagógicos y sistémicos que invitan a repensar nuestra relación con los recursos, los residuos y los sistemas vivos.'));
    } else if (topic.id === 'bioplasticos') {
      const firstPeriod = description.indexOf('. ');
      if (firstPeriod !== -1) {
        const lead = document.createElement('strong');
        lead.textContent = description.slice(0, firstPeriod + 1);
        text.append(lead, document.createTextNode(description.slice(firstPeriod + 1)));
      } else {
        text.textContent = description;
      }
    } else {
      text.textContent = description;
    }
    node.append(number);
    if (['celulosa-bacteriana', 'micelio'].includes(topic.id) && index === 2) {
      const icon = document.createElement('span');
      icon.className = 'fermentation-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = '<svg viewBox="0 0 36 36" fill="none"><rect x="8" y="8" width="20" height="23" rx="4"/><path d="M12 8V5h12v3M12 20c4-1 5-5 12-6-1 7-4 11-10 11-2 0-3-2-2-5Zm2 3 7-6"/></svg>';
      node.appendChild(icon);
    }
    if (['bioplasticos', 'bioceramica'].includes(topic.id) && index === 2) {
      const pot = document.createElement('span');
      pot.className = 'mixing-pot';
      pot.setAttribute('aria-hidden', 'true');
      pot.innerHTML = '<svg viewBox="0 0 48 44" fill="none"><path class="pot-steam pot-steam-one" d="M17 15c-3-3 3-4 0-8"/><path class="pot-steam pot-steam-two" d="M24 14c-3-3 3-4 0-8"/><path class="pot-steam pot-steam-three" d="M31 15c-3-3 3-4 0-8"/><path d="M9 21h30M12 21v8c0 5 4 8 12 8s12-3 12-8v-8M7 22h5m24 0h5M18 39h12"/></svg>';
      node.appendChild(pot);
    }
    node.appendChild(heading);
    if (!(topic.id === 'bioplasticos' && index === 7)) node.appendChild(hint);
    const bubbleCopy = document.createElement('div');
    bubbleCopy.className = 'bubble-copy';
    bubbleCopy.append(bubbleTitle, text);
    if ([...node.classList].some(className => className.endsWith('-photo'))) {
      const photo = document.createElement('div');
      photo.className = 'bubble-photo';
      photo.setAttribute('aria-hidden', 'true');
      bubble.classList.add('has-photo');
      bubble.appendChild(photo);
    }
    bubble.appendChild(bubbleCopy);
    activeBubbles[index] = bubble;
    node.addEventListener('click', () => {
      if (topic.id === 'bioplasticos' && index === 7) return;
      const shouldOpen = node.getAttribute('aria-expanded') !== 'true';
      activeNodes.forEach((other, otherIndex) => {
        other.classList.remove('is-selected');
        other.setAttribute('aria-expanded', 'false');
        activeBubbles[otherIndex].hidden = true;
      });
      processFrame.classList.toggle('has-open-bubble', shouldOpen);
      if (shouldOpen) {
        const nodeIndex = activeNodes.indexOf(node);
        node.classList.add('is-selected');
        node.setAttribute('aria-expanded', 'true');
        const photo = bubble.querySelector('.bubble-photo');
        if (photo) {
          const image = getComputedStyle(node).backgroundImage.match(/url\((?:"[^"]*"|'[^']*'|[^)]*)\)/);
          if (image) photo.style.backgroundImage = image[0];
        }
        activeBubbles[nodeIndex].hidden = false;
      }
      requestAnimationFrame(positionSteps);
    });
    processNodes.appendChild(node);
    processNodes.appendChild(bubble);
    return node;
  });
}

function positionSteps() {
  if (!activeNodes.length) return;
  const width = processStage.clientWidth;
  const height = processStage.clientHeight;
  const cx = width / 2;
  const cy = height / 2;
  if (activeTopic?.id === 'celulosa-bacteriana') {
    const inputSide = width <= 620 ? .18 : width <= 900 ? .23 : .30;
    const productSide = width <= 620 ? .25 : width <= 900 ? .30 : .32;
    const compact = width <= 900;
    const points = [
      [width * inputSide, height * .25],
      [width * (1 - inputSide), height * .25],
      [cx, height * .25],
      [cx, height * .55],
      [width * productSide, height * .84],
      [width * (1 - productSide), height * .84]
    ];
    activeNodes.forEach((node, index) => {
      node.style.left = `${points[index][0]}px`;
      node.style.top = `${points[index][1]}px`;
    });
    drawArrows();
    positionBubbles();
    return;
  }
  if (activeTopic?.id === 'bioplasticos') {
    const inputSide = width <= 620 ? .18 : width <= 900 ? .23 : .27;
    const productSide = width <= 620 ? .125 : .17;
    const compact = width <= 900;
    const points = [
      [width * inputSide, height * (compact ? .18 : .20)],
      [width * (1 - inputSide), height * (compact ? .18 : .20)],
      [cx, height * (compact ? .18 : .20)],
      [cx, height * (compact ? .50 : .48)],
      [width * productSide, height * (compact ? .82 : .80)],
      [width * (productSide + (1 - 2 * productSide) / 3), height * (compact ? .82 : .80)],
      [width * (1 - productSide - (1 - 2 * productSide) / 3), height * (compact ? .82 : .80)],
      [width * (1 - productSide), height * (compact ? .82 : .80)]
    ];
    activeNodes.forEach((node, index) => {
      node.style.left = `${points[index][0]}px`;
      node.style.top = `${points[index][1]}px`;
    });
    drawArrows();
    positionBubbles();
    return;
  }
  if (activeTopic?.id === 'micelio') {
    const compact = width <= 900;
    const inputDiameter = width <= 620 ? 98 : compact ? 164 : 180;
    const inoculationDiameter = width <= 620 ? 72 : compact ? 102 : 116;
    const clearance = width <= 620 ? 10 : compact ? 18 : 24;
    const inputSide = Math.max(.18, Math.min(.42, .5 - (inputDiameter / 2 + inoculationDiameter / 2 + clearance) / width));
    processFrame.style.setProperty('--micelio-input-side', `${inputSide * 100}%`);
    const points = [
      [width * inputSide, height * .28],
      [width * (1 - inputSide), height * .28],
      [cx, height * .28],
      [cx, height * .66]
    ];
    activeNodes.forEach((node, index) => {
      node.style.left = `${points[index][0]}px`;
      node.style.top = `${points[index][1]}px`;
    });
    drawArrows();
    positionBubbles();
    return;
  }
  if (['bioceramica', 'bioplasticos'].includes(activeTopic?.id)) {
    const compact = width <= 900;
    const inputDiameter = width <= 620 ? 96 : compact ? 144 : 180;
    const cookingDiameter = width <= 620 ? 72 : compact ? 102 : 116;
    const clearance = width <= 620 ? 16 : compact ? 28 : 38;
    const inputSide = Math.max(.16, Math.min(.42, .5 - (inputDiameter / 2 + cookingDiameter / 2 + clearance) / width));
    const outputDiameter = width <= 620 ? 96 : compact ? 144 : 180;
    const outputGap = width <= 620 ? 10 : compact ? 14 : 20;
    const outputSide = Math.max(.18, Math.min(.38, .5 - (outputDiameter + outputGap) / width));
    let points = [
      [width * inputSide, height * .20],
      [width * (1 - inputSide), height * .20],
      [cx, height * .20],
      [cx, height * .49],
      [width * outputSide, height * .80],
      [cx, height * .80],
      [width * (1 - outputSide), height * .80]
    ];
    if (activeTopic?.id === 'bioplasticos' && width <= 360) {
      points = [
        [width * .23, height * .23],
        [width * .77, height * .23],
        [cx, height * .42],
        [cx, height * .63],
        [width * .16, height * .86],
        [cx, height * .86],
        [width * .84, height * .86]
      ];
    }
    activeNodes.forEach((node, index) => {
      node.style.left = `${points[index][0]}px`;
      node.style.top = `${points[index][1]}px`;
    });
    drawArrows();
    positionBubbles();
    return;
  }
  const verticalLimit = processFrame.classList.contains('has-open-bubble') ? 230 : (height - 220) / 2;
  const radius = Math.max(0, Math.min(width * .34, 230, (width - 300) / 2, verticalLimit, 355));
  const count = activeNodes.length;
  activeNodes.forEach((node, index) => {
    const angle = (-90 + index * 360 / count) * Math.PI / 180;
    node.style.left = `${cx + radius * Math.cos(angle)}px`;
    node.style.top = `${cy + radius * Math.sin(angle)}px`;
  });
  drawArrows();
  positionBubbles();
}

function positionBubbles() {
  if (!activeNodes.length || !activeTopic) return;
  const width = processStage.clientWidth;
  activeBubbles.forEach((bubble, index) => {
    if (bubble.hidden) return;
    const node = activeNodes[index];
    const nodeX = parseFloat(node.style.left);
    const nodeY = parseFloat(node.style.top);
    const nodeWidth = node.offsetWidth;
    const nodeHeight = node.offsetHeight;
    const bubbleWidth = bubble.offsetWidth;
    const margin = 9;
    let x = nodeX;
    if (['celulosa-bacteriana', 'micelio'].includes(activeTopic.id) && index === 0) x += (bubbleWidth - nodeWidth) / 2;
    if (['celulosa-bacteriana', 'micelio'].includes(activeTopic.id) && index === 1) x -= (bubbleWidth - nodeWidth) / 2;
    x = Math.max(bubbleWidth / 2 + margin, Math.min(width - bubbleWidth / 2 - margin, x));
    const preferredBottom = nodeY - nodeHeight / 2 - 12;
    const top = Math.max(bubble.offsetHeight + margin, preferredBottom);
    bubble.style.left = `${x}px`;
    bubble.style.top = `${top}px`;
  });
}

function drawArrows() {
  if (!activeNodes.length || processView.hidden) return;
  const stageRect = processStage.getBoundingClientRect();
  const cx = processStage.clientWidth / 2;
  const cy = processStage.clientHeight / 2;
  const count = activeNodes.length;
  processArrows.querySelectorAll('.process-edge').forEach(path => path.remove());
  if (activeTopic.id === 'celulosa-bacteriana') {
    const bounds = activeNodes.map(node => {
      const rect = node.getBoundingClientRect();
      return {left: rect.left - stageRect.left, right: rect.right - stageRect.left, top: rect.top - stageRect.top, bottom: rect.bottom - stageRect.top, x: rect.left + rect.width / 2 - stageRect.left, y: rect.top + rect.height / 2 - stageRect.top};
    });
    const addPath = (d, arrow = false) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('class', 'process-edge');
      path.setAttribute('d', d);
      if (arrow) path.setAttribute('marker-end', 'url(#cycle-arrow)');
      path.setAttribute('stroke', activeTopic.tone);
      processArrows.appendChild(path);
    };
    const connect = (from, to, curved = true) => {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const length = Math.hypot(dx, dy) || 1;
      const scaleFrom = 1 / Math.max(Math.abs(dx) / ((from.right - from.left) / 2), Math.abs(dy) / ((from.bottom - from.top) / 2));
      const scaleTo = 1 / Math.max(Math.abs(dx) / ((to.right - to.left) / 2), Math.abs(dy) / ((to.bottom - to.top) / 2));
      const x1 = from.x + dx * scaleFrom;
      const y1 = from.y + dy * scaleFrom;
      const x2 = to.x - dx * scaleTo;
      const y2 = to.y - dy * scaleTo;
      if (!curved) {
        addPath(`M ${x1} ${y1} L ${x2} ${y2}`);
        return;
      }
      const bend = Math.min(15, length * .035);
      const controlX = (x1 + x2) / 2;
      const controlY = (y1 + y2) / 2 - bend;
      addPath(`M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`);
    };
    connect(bounds[0], bounds[2]);
    connect(bounds[1], bounds[2]);
    connect(bounds[2], bounds[3], false);
    const branchY = (bounds[3].bottom + Math.min(bounds[4].top, bounds[5].top)) / 2;
    const splitX = bounds[3].x;
    addPath(`M ${splitX} ${bounds[3].bottom} L ${splitX} ${branchY}`, false);
    addPath(`M ${splitX} ${branchY} C ${splitX - 20} ${branchY + 18} ${bounds[4].x} ${branchY + 18} ${bounds[4].x} ${bounds[4].top}`);
    addPath(`M ${splitX} ${branchY} C ${splitX + 20} ${branchY + 18} ${bounds[5].x} ${branchY + 18} ${bounds[5].x} ${bounds[5].top}`);
    return;
  }
  if (activeTopic.id === 'bioplasticos') {
    const bounds = activeNodes.map(node => {
      const rect = node.getBoundingClientRect();
      return {left: rect.left - stageRect.left, right: rect.right - stageRect.left, top: rect.top - stageRect.top, bottom: rect.bottom - stageRect.top, x: rect.left + rect.width / 2 - stageRect.left, y: rect.top + rect.height / 2 - stageRect.top};
    });
    const addPath = (d, arrow = false) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('class', 'process-edge');
      path.setAttribute('d', d);
      if (arrow) path.setAttribute('marker-end', 'url(#cycle-arrow)');
      path.setAttribute('stroke', activeTopic.tone);
      processArrows.appendChild(path);
    };
    const connect = (from, to, curved = true) => {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const length = Math.hypot(dx, dy) || 1;
      const scaleFrom = 1 / Math.max(Math.abs(dx) / ((from.right - from.left) / 2), Math.abs(dy) / ((from.bottom - from.top) / 2));
      const scaleTo = 1 / Math.max(Math.abs(dx) / ((to.right - to.left) / 2), Math.abs(dy) / ((to.bottom - to.top) / 2));
      const x1 = from.x + dx * scaleFrom;
      const y1 = from.y + dy * scaleFrom;
      const x2 = to.x - dx * scaleTo;
      const y2 = to.y - dy * scaleTo;
      if (!curved) {
        addPath(`M ${x1} ${y1} L ${x2} ${y2}`);
        return;
      }
      const bend = Math.min(15, length * .035);
      const controlX = (x1 + x2) / 2;
      const controlY = (y1 + y2) / 2 - bend;
      addPath(`M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`);
    };
    connect(bounds[0], bounds[2]);   // input left → mixing
    connect(bounds[1], bounds[2]);   // input right → mixing
    connect(bounds[2], bounds[3], false);  // mixing → bioplasticos (straight down)
    const branchY = (bounds[3].bottom + bounds[4].top) / 2;
    for (const target of bounds.slice(4)) {
      addPath(`M ${bounds[3].x} ${bounds[3].bottom} C ${bounds[3].x} ${branchY} ${target.x} ${branchY - 25} ${target.x} ${target.top}`);
    }
    return;
  }
  if (activeTopic.id === 'micelio') {
    const bounds = activeNodes.map(node => {
      const rect = node.getBoundingClientRect();
      return {left: rect.left - stageRect.left, right: rect.right - stageRect.left, top: rect.top - stageRect.top, bottom: rect.bottom - stageRect.top, x: rect.left + rect.width / 2 - stageRect.left, y: rect.top + rect.height / 2 - stageRect.top};
    });
    const connect = (source, target) => {
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const sourceScale = 1 / Math.max(Math.abs(dx) / ((source.right - source.left) / 2), Math.abs(dy) / ((source.bottom - source.top) / 2));
      const targetScale = 1 / Math.max(Math.abs(dx) / ((target.right - target.left) / 2), Math.abs(dy) / ((target.bottom - target.top) / 2));
      const x1 = source.x + dx * sourceScale;
      const y1 = source.y + dy * sourceScale;
      const x2 = target.x - dx * targetScale;
      const y2 = target.y - dy * targetScale;
      const length = Math.hypot(dx, dy) || 1;
      const bend = Math.min(15, length * .035);
      const controlX = (x1 + x2) / 2;
      const controlY = (y1 + y2) / 2 - bend;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('class', 'process-edge');
      path.setAttribute('d', `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`);
      path.setAttribute('stroke', activeTopic.tone);
      processArrows.appendChild(path);
    };
    connect(bounds[0], bounds[2]);
    connect(bounds[1], bounds[2]);
    connect(bounds[2], bounds[3]);
    return;
  }
  if (['bioceramica', 'bioplasticos'].includes(activeTopic.id)) {
    const bounds = activeNodes.map(node => {
      const rect = node.getBoundingClientRect();
      return {left: rect.left - stageRect.left, right: rect.right - stageRect.left, top: rect.top - stageRect.top, bottom: rect.bottom - stageRect.top, x: rect.left + rect.width / 2 - stageRect.left, y: rect.top + rect.height / 2 - stageRect.top};
    });
    const addPath = (d, arrow = false) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('class', 'process-edge');
      path.setAttribute('d', d);
      if (arrow) path.setAttribute('marker-end', 'url(#cycle-arrow)');
      path.setAttribute('stroke', activeTopic.tone);
      processArrows.appendChild(path);
    };
    const connect = (from, to) => {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const length = Math.hypot(dx, dy) || 1;
      const ux = dx / length;
      const uy = dy / length;
      const fromRadius = Math.min(from.right - from.left, from.bottom - from.top) / 2;
      const toRadius = Math.min(to.right - to.left, to.bottom - to.top) / 2;
      const x1 = from.x + ux * fromRadius;
      const y1 = from.y + uy * fromRadius;
      const x2 = to.x - ux * toRadius;
      const y2 = to.y - uy * toRadius;
      const bend = Math.min(15, length * .035);
      addPath(`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 - bend} ${x2} ${y2}`);
    };
    connect(bounds[0], bounds[2]);
    connect(bounds[1], bounds[2]);
    connect(bounds[2], bounds[3]);
    const connectOutput = (source, target, curved = true) => {
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const length = Math.hypot(dx, dy) || 1;
      const ux = dx / length;
      const uy = dy / length;
      const sourceRadius = Math.min(source.right - source.left, source.bottom - source.top) / 2;
      const targetRadius = Math.min(target.right - target.left, target.bottom - target.top) / 2;
      const x1 = source.x + ux * sourceRadius;
      const y1 = source.y + uy * sourceRadius;
      const x2 = target.x - ux * targetRadius;
      const y2 = target.y - uy * targetRadius;
      if (!curved) {
        addPath(`M ${x1} ${y1} L ${x2} ${y2}`);
        return;
      }
      const bend = Math.min(16, Math.hypot(dx, dy) * .035);
      addPath(`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 - bend} ${x2} ${y2}`);
    };
    connectOutput(bounds[3], bounds[4]);
    connectOutput(bounds[3], bounds[5], false);
    connectOutput(bounds[3], bounds[6]);
    return;
  }
  const reverseCycle = activeTopic.id === 'celulosa-bacteriana';
  for (let i = 0; i < count; i += 1) {
    const sourceIndex = reverseCycle ? (i + 1) % count : i;
    const targetIndex = reverseCycle ? i : (i + 1) % count;
    const source = activeNodes[sourceIndex].getBoundingClientRect();
    const target = activeNodes[targetIndex].getBoundingClientRect();
    const sx = source.left + source.width / 2 - stageRect.left;
    const sy = source.top + source.height / 2 - stageRect.top;
    const tx = target.left + target.width / 2 - stageRect.left;
    const ty = target.top + target.height / 2 - stageRect.top;
    const dx = tx - sx;
    const dy = ty - sy;
    const length = Math.hypot(dx, dy) || 1;
    const ux = dx / length;
    const uy = dy / length;
    const sourceInset = activeNodes[sourceIndex].classList.contains('expanded')
      ? Math.min((source.width / 2) / Math.max(Math.abs(ux), .01), (source.height / 2) / Math.max(Math.abs(uy), .01))
      : Math.min(source.width, source.height) / 2;
    const targetInset = activeNodes[targetIndex].classList.contains('expanded')
      ? Math.min((target.width / 2) / Math.max(Math.abs(ux), .01), (target.height / 2) / Math.max(Math.abs(uy), .01))
      : Math.min(target.width, target.height) / 2;
    const x1 = sx + ux * (sourceInset + 3);
    const y1 = sy + uy * (sourceInset + 3);
    const x2 = tx - ux * (targetInset + 5);
    const y2 = ty - uy * (targetInset + 5);
    const midAngle = (-90 + (i + .5) * 360 / count) * Math.PI / 180;
    const bow = Math.min(22, length * .07);
    const controlX = (x1 + x2) / 2 + Math.cos(midAngle) * bow;
    const controlY = (y1 + y2) / 2 + Math.sin(midAngle) * bow;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', 'process-edge');
    path.setAttribute('d', `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`);
    path.setAttribute('marker-end', 'url(#cycle-arrow)');
    path.setAttribute('stroke', activeTopic.tone);
    processArrows.appendChild(path);
  }
}

document.getElementById('backButton').addEventListener('click', () => showHome());
homeButton.addEventListener('click', () => showHome());
document.querySelectorAll('.definition-circle').forEach(circle => {
  circle.addEventListener('click', () => {
    const expanded = circle.classList.toggle('expanded');
    circle.setAttribute('aria-expanded', String(expanded));
  });
});
document.getElementById('nextCircle').addEventListener('click', () => {
  const index = topics.findIndex(topic => topic.id === activeTopic?.id);
  openTopic(topics[(index + 1) % topics.length]);
});

function loadHash() {
  const topic = topics.find(candidate => candidate.id === location.hash.slice(1));
  if (topic) openTopic(topic, false);
  else showHome(false);
}
window.addEventListener('hashchange', loadHash);
window.addEventListener('resize', positionSteps);
window.addEventListener('resize', positionHomeCircles);
if ('ResizeObserver' in window) new ResizeObserver(() => {
  if (activeTopic) positionSteps();
}).observe(processStage);
positionHomeCircles();
loadHash();
