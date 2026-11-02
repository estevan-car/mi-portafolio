/**
 * FUENTE ÚNICA DE DATOS DE PROYECTOS
 * ---------------------------------------------------------------------------
 * El HTML no contiene información de proyectos: todo se renderiza desde aquí.
 * Cuando tengas el backend en Spring Boot, este archivo se reemplaza por:
 *
 *   export async function obtenerProyectos() {
 *     const respuesta = await fetch('/api/proyectos');
 *     if (!respuesta.ok) throw new Error('No se pudieron cargar los proyectos');
 *     return respuesta.json();
 *   }
 *
 * ...y ningún componente necesita cambiar, porque todos consumen
 * obtenerProyectos(). Por eso la función ya es async aunque hoy devuelva
 * un array local.
 */

/** Estados posibles. Se usan en las insignias, los filtros y el avance. */
export const ESTADO = Object.freeze({
  FUNCIONANDO: 'funcionando',
  DESARROLLO: 'desarrollo',
  PLANEADO: 'planeado',
});

export const ETIQUETA_ESTADO = Object.freeze({
  [ESTADO.FUNCIONANDO]: 'Funcionando',
  [ESTADO.DESARROLLO]: 'En desarrollo',
  [ESTADO.PLANEADO]: 'Planeado',
});

const PROYECTOS = [
  {
    id: 'registro-limpieza',
    nombre: 'Registro de limpieza',
    tipo: 'Prácticas · COMFAMA',
    estado: ESTADO.DESARROLLO,
    anio: '2026',
    destacado: true,
    imagen: '',        // Captura opcional: 'assets/img/proyectos/registro-limpieza.webp'
    demo: '',
    repositorio: '',
    notaEnlaces: 'Sistema interno de COMFAMA: sin demo pública',

    resumen:
      'El registro de limpieza de las sedes se llevaba a mano en un Excel de ocho hojas, ' +
      'una por tipo de espacio. Lo estoy convirtiendo en un sistema: el personal registra ' +
      'desde el celular, con fotos de antes y después y ubicación, y todo queda en PostgreSQL.',

    puntosClave: [
      'API REST con Spring Boot, Java 21, JPA y PostgreSQL, documentada con Swagger',
      'Reglas de negocio en el backend: cada actividad solo se acepta en el tipo de espacio que le corresponde',
      'Registro multipart con fotos de antes y después obligatorias, guardadas con nombre UUID',
    ],

    tecnologias: ['Java', 'Spring Boot', 'JPA', 'PostgreSQL', 'Swagger', 'JavaScript'],

    modulos: [
      { nombre: 'Interfaz para celular',          estado: ESTADO.FUNCIONANDO, descripcion: 'Validación de campos, ubicación GPS con mapa, captura de fotos y pestañas por tipo de espacio.' },
      { nombre: 'Sedes y espacios',               estado: ESTADO.FUNCIONANDO, descripcion: 'Endpoints para crear y consultar sedes con sus espacios por tipo.' },
      { nombre: 'Catálogo de actividades',        estado: ESTADO.FUNCIONANDO, descripcion: 'Las 75 actividades reales de los formatos, ligadas a su tipo de espacio.' },
      { nombre: 'Registro diario',                estado: ESTADO.FUNCIONANDO, descripcion: 'Guarda el registro con sus actividades y el tipo de limpieza del día (profunda, rutina o evento).' },
      { nombre: 'Fotos de antes y después',       estado: ESTADO.FUNCIONANDO, descripcion: 'Petición multipart que recibe el registro en JSON y las dos fotos.' },
      { nombre: 'Consulta de registros y fotos',  estado: ESTADO.DESARROLLO,  descripcion: 'Listar los registros guardados y servir sus fotos.' },
      { nombre: 'Conexión frontend–backend',      estado: ESTADO.PLANEADO,    descripcion: 'Un solo archivo (api.js) habla con la API; sin URL configurada, la interfaz funciona en modo demo.' },
      { nombre: 'Autenticación y seguridad',      estado: ESTADO.PLANEADO,    descripcion: 'Inicio de sesión y credenciales de la base fuera del código.' },
    ],
  },

  {
    id: 'serena',
    nombre: 'Serena Repostería',
    tipo: 'Cliente real · En producción',
    estado: ESTADO.FUNCIONANDO,
    anio: '2026',
    destacado: false,
    demo: 'https://serenapastelapp.netlify.app/',
    repositorio: 'https://github.com/estevan-car/serena',

    /* El problema se describe en términos de negocio, no de tecnología:
       es lo primero que lee quien evalúa el portafolio. */
    resumen:
      'Una repostería que vendía solo por WhatsApp, sin catálogo ni forma de mostrar su trabajo. ' +
      'Hoy tiene catálogo completo, carrito y panel de administración; ' +
      'la siguiente fase es un backend propio para gestionar pedidos y producción.',

    puntosClave: [
      'Catálogo dinámico en doce categorías, editable desde un panel sin tocar código (Decap CMS)',
      'Carrito sin backend: arma un pedido completo con precio total y lo envía por WhatsApp',
      'Diseño responsive e imágenes en WebP, optimizado para carga en móvil',
    ],

    tecnologias: ['HTML5', 'CSS3', 'JavaScript', 'JSON', 'WebP', 'Decap CMS'],
    stackObjetivo: ['Java', 'Spring Boot', 'PostgreSQL', 'JPA'],

    modulos: [
      { nombre: 'Catálogo por categorías',       estado: ESTADO.FUNCIONANDO, descripcion: 'Doce categorías con página propia: seis especialidades (temáticas, 15 años, sacramentos, impresión comestible, cumpleaños, grados) y seis productos (tortas, cupcakes, alfajores, galletas, donas, desayunos).' },
      { nombre: 'Personalización de torta',      estado: ESTADO.FUNCIONANDO, descripcion: 'Flujo de cuatro pasos para diseñar una torta a medida.' },
      { nombre: 'Carrito con checkout por WhatsApp', estado: ESTADO.FUNCIONANDO, descripcion: 'Se arma desde cualquier página, persiste entre sesiones y cierra el pedido completo en un solo mensaje con el total.' },
      { nombre: 'Panel de administración del catálogo', estado: ESTADO.FUNCIONANDO, descripcion: 'Editar diseños, precios y fotos sin tocar código (Decap CMS); cada cambio queda como commit en GitHub.' },
      { nombre: 'Diseño responsive',             estado: ESTADO.FUNCIONANDO, descripcion: 'Header, formularios y grillas adaptados a móvil, con menú tipo hamburguesa.' },
    ],
  },

  {
    id: 'bot-pedidos',
    nombre: 'Bot de pedidos',
    tipo: 'Automatización · En producción',
    estado: ESTADO.FUNCIONANDO,
    anio: '2026',
    destacado: false,
    demo: '',          // El bot escribe en la base real de un cliente: no se publica
    repositorio: '',   // TODO: ponlo aquí si haces público el repositorio
    notaEnlaces: 'Trabaja sobre la base real de un cliente: sin demo pública',

    resumen:
      'Serena recibía los pedidos por WhatsApp y los copiaba a mano, uno por uno. ' +
      'Ahora reenvía el mensaje de la clienta a un bot de Telegram y queda registrado ' +
      'en un calendario de producción, sin volver a escribir nada.',

    puntosClave: [
      'Lee el mensaje tal como lo escribe la clienta: emojis, etiquetas libres y fechas en español',
      'Verifica las cuentas y avisa cuando el saldo del mensaje no cuadra con la resta',
      'Diagnóstico integrado que distingue si el fallo es del token, la tabla o una columna',
    ],

    tecnologias: ['Node.js', 'Express', 'Telegram API', 'Airtable API', 'Render'],
    stackObjetivo: ['Java', 'Spring Boot', 'PostgreSQL'],

    modulos: [
      { nombre: 'Lectura del mensaje',        estado: ESTADO.FUNCIONANDO, descripcion: 'Interpreta el formato libre de las clientas y lo convierte en datos estructurados.' },
      { nombre: 'Registro en calendario',     estado: ESTADO.FUNCIONANDO, descripcion: 'Cada pedido queda en una vista de calendario por fecha de entrega.' },
      { nombre: 'Cálculo de saldos',          estado: ESTADO.FUNCIONANDO, descripcion: 'Total, abono y saldo, con aviso cuando las cifras no cuadran.' },
      { nombre: 'Diagnóstico /revisar',       estado: ESTADO.FUNCIONANDO, descripcion: 'Comando que comprueba la conexión y señala qué columna falta.' },
      { nombre: 'Control de duplicados',      estado: ESTADO.FUNCIONANDO, descripcion: 'Descarta los reintentos del servidor para no crear el pedido dos veces.' },
      { nombre: 'Firma del webhook',          estado: ESTADO.PLANEADO,    descripcion: 'Rechazar cualquier petición que no venga firmada por Telegram.' },
      { nombre: 'Ficha de producción diaria', estado: ESTADO.PLANEADO,    descripcion: 'Agrupar los pedidos del día en una hoja de trabajo para cocina.' },
    ],
  },

  {
    id: 'etiquetas',
    nombre: 'Producción Serena',
    tipo: 'Herramienta interna · En producción',
    estado: ESTADO.FUNCIONANDO,
    anio: '2026',
    destacado: false,
    demo: 'https://etiquetas-serena.vercel.app/index.html',
    repositorio: 'https://github.com/serenapanypastel/etiquetas-serena',

    resumen:
      'Serena llevaba el registro de pedidos de producción en papel o por WhatsApp, sin numeración ' +
      'ni forma de imprimir una etiqueta. Esta herramienta interna centraliza cada pedido en una base ' +
      'de datos real, con historial y etiqueta lista para imprimir.',

    puntosClave: [
      'Numeración de pedidos atómica en Firestore, sin choques entre dos personas guardando a la vez',
      'Etiqueta de producción lista para imprimir o guardar en PDF desde el navegador',
      'Acceso protegido con Firebase Auth: solo el equipo de Serena puede entrar',
    ],

    tecnologias: ['HTML5', 'CSS3', 'JavaScript', 'Firebase Auth', 'Firestore'],

    modulos: [
      { nombre: 'Autenticación',                  estado: ESTADO.FUNCIONANDO, descripcion: 'Acceso protegido por login; cada página verifica la sesión antes de mostrar contenido.' },
      { nombre: 'Registro de fichas de producción', estado: ESTADO.FUNCIONANDO, descripcion: 'Formulario con cliente, sabor, relleno, molde, fecha de entrega y observaciones, guardado en Firestore.' },
      { nombre: 'Numeración automática de pedidos', estado: ESTADO.FUNCIONANDO, descripcion: 'Contador atómico (transacción de Firestore) para evitar números repetidos entre guardados simultáneos.' },
      { nombre: 'Edición de fichas',               estado: ESTADO.FUNCIONANDO, descripcion: 'Cualquier ficha guardada se puede reabrir y actualizar.' },
      { nombre: 'Historial y búsqueda',            estado: ESTADO.FUNCIONANDO, descripcion: 'Tabla con todas las fichas registradas, búsqueda por cliente o pedido y detalle en modal.' },
      { nombre: 'Etiqueta imprimible / PDF',       estado: ESTADO.FUNCIONANDO, descripcion: 'Genera una etiqueta de producción lista para imprimir o guardar como PDF desde el navegador.' },
      { nombre: 'Reportes de producción',          estado: ESTADO.PLANEADO,    descripcion: 'Resumen de pedidos por día o por sabor; hoy solo existe el listado plano.' },
    ],
  },

  {
    id: 'vertriss',
    nombre: 'VERTRISS',
    tipo: 'Sitio de agencia · En producción',
    estado: ESTADO.FUNCIONANDO,
    anio: '2026',
    destacado: false,
    demo: 'https://vertriss.vercel.app/',
    repositorio: 'https://github.com/estevan-car/vertrissv1',

    resumen:
      'VERTRISS necesitaba su propio sitio para captar clientes y mostrar su trabajo. ' +
      'Lo construí desde cero, sin plantillas, y hoy está publicado y recibiendo solicitudes.',

    puntosClave: [
      'Formulario de contacto con EmailJS y validación en tiempo real',
      'SEO técnico: Open Graph, sitemap.xml, robots.txt y datos estructurados',
      'Imágenes en WebP y carga optimizada para puntuar bien en rendimiento',
    ],

    tecnologias: ['HTML5', 'CSS3', 'JavaScript', 'EmailJS', 'SEO'],
    stackObjetivo: ['Java', 'Spring Boot', 'PostgreSQL'],

    modulos: [
      { nombre: 'Landing page responsive',     estado: ESTADO.FUNCIONANDO, descripcion: 'Servicios, proceso de trabajo, portafolio y contacto en una sola página.' },
      { nombre: 'Formulario con EmailJS',      estado: ESTADO.FUNCIONANDO, descripcion: 'Envío de solicitudes al correo sin necesidad de servidor propio.' },
      { nombre: 'Validación en tiempo real',   estado: ESTADO.FUNCIONANDO, descripcion: 'Revisión de los campos mientras se escriben, con avisos claros.' },
      { nombre: 'SEO técnico',                 estado: ESTADO.FUNCIONANDO, descripcion: 'Metadatos, sitemap, robots.txt y marcado Schema.org.' },
      { nombre: 'Panel administrativo',        estado: ESTADO.PLANEADO,    descripcion: 'Gestionar solicitudes y contenido sin tocar el código.' },
      { nombre: 'Blog corporativo',            estado: ESTADO.PLANEADO,    descripcion: 'Publicaciones propias para atraer tráfico orgánico.' },
    ],
  },

  {
    id: 'gestion-turnos',
    nombre: 'Gestión de turnos',
    tipo: 'Prácticas · COMFAMA',
    estado: ESTADO.DESARROLLO,
    anio: '2026',
    destacado: false,
    imagen: '',
    demo: '',
    repositorio: '',
    notaEnlaces: 'Sistema interno de COMFAMA: sin demo pública',

    resumen:
      'La programación semanal del personal de limpieza (45 personas repartidas en más de ' +
      'veinte puestos por zonas) se arma a mano, sin validar choques ni horas. Estoy ' +
      'construyendo un calendario visual que calcula las horas solo y muestra qué puestos quedan sin cubrir.',

    puntosClave: [
      'Calendario semanal como tabla semántica, con la columna de nombres fija al desplazar',
      'Horas trabajadas calculadas solas: fin − inicio − 30 minutos de almuerzo',
      'Validaciones planeadas: puesto ya ocupado y tope de horas semanales por persona',
    ],

    tecnologias: ['HTML5', 'CSS3', 'JavaScript'],
    stackObjetivo: ['Java', 'Spring Boot', 'PostgreSQL'],

    modulos: [
      { nombre: 'Calendario semanal',            estado: ESTADO.FUNCIONANDO, descripcion: 'Maqueta de la semana con turnos de mañana y tarde.' },
      { nombre: 'Zonas, puestos y tipos de día', estado: ESTADO.DESARROLLO,  descripcion: 'Puestos agrupados por zona; cada día es turno, descanso o ausencia.' },
      { nombre: 'Cálculo de horas',              estado: ESTADO.DESARROLLO,  descripcion: 'Horas por turno a partir del horario escrito en cada asignación.' },
      { nombre: 'Asignación y cobertura',        estado: ESTADO.PLANEADO,    descripcion: 'Asignar con un clic y ver cada día cuántos puestos están cubiertos y cuáles faltan.' },
      { nombre: 'Arrastrar turnos con validación', estado: ESTADO.PLANEADO,  descripcion: 'Mover turnos sin duplicar puestos ni pasar el tope de horas.' },
      { nombre: 'Backend con Spring Boot',       estado: ESTADO.PLANEADO,    descripcion: 'Personas, puestos y asignaciones guardados en PostgreSQL.' },
    ],
  },
];

/** Devuelve todos los proyectos. Async a propósito: prepara la migración a API. */
export async function obtenerProyectos() {
  return PROYECTOS;
}

/** Devuelve un proyecto por su id, o undefined si no existe. */
export async function obtenerProyectoPorId(id) {
  return PROYECTOS.find((proyecto) => proyecto.id === id);
}

/**
 * Avance = módulos funcionando + la mitad de los que están en desarrollo.
 * Es una heurística, pero es consistente y evita inventar porcentajes.
 */
export function calcularAvance(proyecto) {
  const modulos = proyecto.modulos ?? [];
  if (modulos.length === 0) return 0;

  const puntaje = modulos.reduce((total, modulo) => {
    if (modulo.estado === ESTADO.FUNCIONANDO) return total + 1;
    if (modulo.estado === ESTADO.DESARROLLO) return total + 0.5;
    return total;
  }, 0);

  return Math.round((puntaje / modulos.length) * 100);
}

/** Cuenta los módulos de un proyecto que están en un estado concreto. */
export function contarModulosPorEstado(proyecto, estado) {
  return (proyecto.modulos ?? []).filter((modulo) => modulo.estado === estado).length;
}

/**
 * Categorías del filtro. Filtrar por cada tecnología suelta daba 20 botones
 * ("JSON", "WebP"...) que no le sirven a nadie. Una categoría agrupa varias
 * tecnologías: un proyecto aparece si usa al menos una de ellas.
 */
export const CATEGORIAS = Object.freeze([
  { nombre: 'Java y Spring Boot', tecnologias: ['Java', 'Spring Boot', 'JPA'] },
  { nombre: 'JavaScript',         tecnologias: ['JavaScript', 'Node.js', 'Express'] },
  { nombre: 'Bases de datos',     tecnologias: ['PostgreSQL', 'Firestore', 'Airtable API', 'SQL'] },
  { nombre: 'Automatización',     tecnologias: ['n8n', 'Telegram API', 'Gemini'] },
  { nombre: 'Infraestructura',    tecnologias: ['Docker', 'Google Cloud', 'Caddy', 'Render'] },
]);

/** ¿El proyecto usa alguna tecnología de la categoría? */
export function perteneceACategoria(tecnologiasProyecto, categoria) {
  return tecnologiasProyecto.some((tecnologia) => categoria.tecnologias.includes(tecnologia));
}

/** Solo las categorías que tienen al menos un proyecto: nunca un filtro vacío. */
export function categoriasConProyectos(proyectos) {
  return CATEGORIAS.filter((categoria) =>
    proyectos.some((proyecto) => perteneceACategoria(proyecto.tecnologias, categoria))
  );
}
