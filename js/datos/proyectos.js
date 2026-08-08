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
    id: 'serena',
    nombre: 'Serena Repostería',
    tipo: 'Cliente real · En producción',
    estado: ESTADO.FUNCIONANDO,
    anio: '2026',
    destacado: true,
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
    id: 'bienes-raices',
    nombre: 'Bienes Raíces',
    tipo: 'Proyecto de práctica · Frontend',
    estado: ESTADO.FUNCIONANDO,
    anio: '2026',
    destacado: false,
    demo: 'https://estevan-car.github.io/bienes-raices/',
    repositorio: 'https://github.com/estevan-car/bienes-raices',

    resumen:
      'Sitio de práctica para una inmobiliaria: seis páginas (inicio, nosotros, anuncios, ' +
      'detalle de anuncio, blog y contacto) enfocadas en maquetación y diseño responsive ' +
      'desde cero, con el modelo de datos ya pensado para conectar un backend real.',

    puntosClave: [
      'Seis páginas enlazadas, maquetadas y hechas responsive sin frameworks de CSS',
      'Esquema SQL ya definido para guardar los contactos del formulario',
      'Base para practicar la conexión de un formulario a una API real',
    ],

    tecnologias: ['HTML5', 'CSS3'],
    stackObjetivo: ['PostgreSQL'],

    modulos: [
      { nombre: 'Páginas del sitio',         estado: ESTADO.FUNCIONANDO, descripcion: 'Inicio, Nosotros, Anuncios, detalle de anuncio, Blog y Contacto, enlazadas entre sí.' },
      { nombre: 'Diseño responsive',         estado: ESTADO.FUNCIONANDO, descripcion: 'Maquetación adaptada a distintos anchos de pantalla.' },
      { nombre: 'Formulario de contacto',    estado: ESTADO.DESARROLLO,  descripcion: 'El formulario existe en la interfaz, pero todavía no envía los datos a ningún lado.' },
      { nombre: 'Persistencia en base de datos', estado: ESTADO.PLANEADO, descripcion: 'Ya existe el esquema SQL (PostgreSQL) para guardar los contactos; falta conectar el formulario a una API real.' },
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

/** Lista única de tecnologías de todos los proyectos (para los filtros). */
export function recopilarTecnologias(proyectos) {
  return [...new Set(proyectos.flatMap((proyecto) => proyecto.tecnologias))].sort();
}
