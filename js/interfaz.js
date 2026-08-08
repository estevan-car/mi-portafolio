/**
 * COMPORTAMIENTOS DE INTERFAZ
 * ---------------------------------------------------------------------------
 * Menú, aparición al hacer scroll, sección activa, rotador de roles y barras
 * de avance. Cada función es defensiva: si el elemento no está en la página,
 * termina sin hacer nada en vez de fallar.
 *
 * Nota: los nombres de las APIs del navegador (querySelector, addEventListener,
 * IntersectionObserver...) van en inglés porque los define el estándar web y
 * no se pueden traducir. Todo lo nuestro está en español.
 */

/* --------------------------------------------------------------------------
   CABECERA Y MENÚ
   -------------------------------------------------------------------------- */

function iniciarMenu() {
  const cabecera = document.querySelector('[data-cabecera]');
  const menu = document.querySelector('[data-menu]');
  const boton = document.querySelector('[data-menu-boton]');
  if (!cabecera) return;

  // La cabecera solo se materializa cuando ya hay contenido detrás.
  const alDesplazar = () => cabecera.classList.toggle('esta-fija', window.scrollY > 12);
  alDesplazar();
  window.addEventListener('scroll', alDesplazar, { passive: true });

  if (!menu || !boton) return;

  const abrirMenu = (abierto) => {
    menu.classList.toggle('esta-abierto', abierto);
    boton.setAttribute('aria-expanded', String(abierto));
    boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('sin-scroll', abierto);
  };

  boton.addEventListener('click', () => {
    abrirMenu(!menu.classList.contains('esta-abierto'));
  });

  // Al elegir una sección, cerramos el menú.
  menu.querySelectorAll('a').forEach((enlace) => {
    enlace.addEventListener('click', () => abrirMenu(false));
  });

  // Escape cierra el menú: es lo que espera cualquiera que use teclado.
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && menu.classList.contains('esta-abierto')) {
      abrirMenu(false);
      boton.focus();
    }
  });

  // Si se agranda la ventana con el menú abierto, limpiamos el estado.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menu.classList.contains('esta-abierto')) {
      abrirMenu(false);
    }
  });
}

/* --------------------------------------------------------------------------
   APARICIÓN AL HACER SCROLL
   IntersectionObserver en vez de un listener de scroll: no bloquea el hilo
   principal y el navegador decide cuándo evaluar.
   -------------------------------------------------------------------------- */

/** Observa los elementos `.aparece` que haya dentro de `raiz`. */
export function observarApariciones(raiz = document) {
  const elementos = raiz.querySelectorAll('.aparece');
  if (elementos.length === 0) return;

  const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || movimientoReducido) {
    elementos.forEach((elemento) => elemento.classList.add('es-visible'));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add('es-visible');
        observador.unobserve(entrada.target);   // una sola vez por elemento
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elementos.forEach((elemento) => observador.observe(elemento));
}

/**
 * Escalona la entrada de los hijos de un contenedor.
 * El retraso viaja en la variable --retraso que consume el CSS: el
 * escalonamiento se decide aquí y la animación sigue viviendo en la hoja
 * de estilos, sin mezclar responsabilidades.
 */
export function escalonar(contenedor, paso = 90) {
  if (!contenedor) return;
  [...contenedor.children].forEach((hijo, indice) => {
    hijo.classList.add('aparece');
    hijo.style.setProperty('--retraso', `${indice * paso}ms`);
  });
}

/* --------------------------------------------------------------------------
   SECCIÓN ACTIVA EN EL MENÚ
   -------------------------------------------------------------------------- */

function iniciarSeccionActiva() {
  const enlaces = [...document.querySelectorAll('[data-enlace-seccion]')];
  if (enlaces.length === 0 || !('IntersectionObserver' in window)) return;

  const secciones = enlaces
    .map((enlace) => document.querySelector(enlace.getAttribute('href')))
    .filter(Boolean);
  if (secciones.length === 0) return;

  const marcarActiva = (id) => {
    enlaces.forEach((enlace) => {
      const coincide = enlace.getAttribute('href') === `#${id}`;
      enlace.classList.toggle('es-actual', coincide);
      if (coincide) enlace.setAttribute('aria-current', 'true');
      else enlace.removeAttribute('aria-current');
    });
  };

  const observador = new IntersectionObserver(
    (entradas) => {
      // De todas las secciones visibles gana la más cercana al tope.
      const visibles = entradas
        .filter((entrada) => entrada.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visibles[0]) marcarActiva(visibles[0].target.id);
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
  );

  secciones.forEach((seccion) => observador.observe(seccion));
}

/* --------------------------------------------------------------------------
   ROTADOR DE ROLES DE LA PORTADA
   -------------------------------------------------------------------------- */

function iniciarRotador() {
  const rotador = document.querySelector('[data-rotador]');
  if (!rotador) return;

  const roles = [...rotador.children];
  if (roles.length < 2) return;

  // Con movimiento reducido dejamos el primero fijo, sin rotación.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    roles[0].classList.add('es-visible');
    return;
  }

  let indice = 0;
  roles[0].classList.add('es-visible');

  setInterval(() => {
    roles[indice].classList.remove('es-visible');
    indice = (indice + 1) % roles.length;
    roles[indice].classList.add('es-visible');
  }, 2600);
}

/* --------------------------------------------------------------------------
   BARRAS DE AVANCE
   El HTML ya trae el valor correcto (para que funcione sin JavaScript).
   Aquí lo ponemos en cero y lo devolvemos a su valor cuando la tarjeta entra
   en pantalla, que es cuando se ve la animación.
   -------------------------------------------------------------------------- */

export function animarBarrasAvance(raiz = document) {
  const barras = raiz.querySelectorAll('[data-avance]');
  if (barras.length === 0) return;

  const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || movimientoReducido) return;  // se queda el valor del HTML

  barras.forEach((barra) => { barra.value = 0; });

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.value = Number(entrada.target.dataset.avance);
        observador.unobserve(entrada.target);
      });
    },
    { threshold: 0.35 }
  );

  barras.forEach((barra) => observador.observe(barra));
}

/* --------------------------------------------------------------------------
   AÑO DEL PIE — para no editarlo cada enero
   -------------------------------------------------------------------------- */

function iniciarAnio() {
  document.querySelectorAll('[data-anio]').forEach((elemento) => {
    elemento.textContent = String(new Date().getFullYear());
  });
}

/** Punto de entrada común de la interfaz. */
export function iniciarInterfaz() {
  document.documentElement.classList.remove('sin-js');
  iniciarMenu();
  iniciarSeccionActiva();
  iniciarRotador();
  observarApariciones();
  iniciarAnio();
}
