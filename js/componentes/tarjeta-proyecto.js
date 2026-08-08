import { calcularAvance, contarModulosPorEstado, ESTADO } from '../datos/proyectos.js';
import './estado-modulo.js';

/**
 * <tarjeta-proyecto></tarjeta-proyecto>
 * ---------------------------------------------------------------------------
 * Los datos se pasan por PROPIEDAD, no por atributo:
 *
 *   const tarjeta = document.createElement('tarjeta-proyecto');
 *   tarjeta.proyecto = datosDelProyecto;
 *
 * Serializar un objeto a JSON dentro de un atributo HTML es frágil y difícil
 * de depurar; la propiedad recibe el objeto tal cual.
 */
class TarjetaProyecto extends HTMLElement {
  #proyecto = null;

  set proyecto(valor) {
    this.#proyecto = valor;
    if (this.isConnected) this.#dibujar();
  }

  get proyecto() {
    return this.#proyecto;
  }

  connectedCallback() {
    if (this.#proyecto) this.#dibujar();
  }

  #dibujar() {
    const proyecto = this.#proyecto;
    const avance = calcularAvance(proyecto);
    const funcionando = contarModulosPorEstado(proyecto, ESTADO.FUNCIONANDO);
    const idTitulo = `proyecto-${escapar(proyecto.id)}`;

    /* La tarjeta es un <article>: contenido autónomo que tendría sentido
       fuera de esta página. `aria-labelledby` le da su nombre accesible. */
    this.innerHTML = `
      <article class="tarjeta proyecto" aria-labelledby="${idTitulo}">

        <header class="proyecto__encabezado">
          <p class="proyecto__dato">${escapar(proyecto.anio)}</p>
          <estado-modulo estado="${escapar(proyecto.estado)}"></estado-modulo>
          <p class="proyecto__dato">${escapar(proyecto.tipo)}</p>
        </header>

        <h3 class="proyecto__titulo" id="${idTitulo}">${escapar(proyecto.nombre)}</h3>
        <p class="proyecto__resumen">${escapar(proyecto.resumen)}</p>

        <ul class="proyecto__puntos">
          ${proyecto.puntosClave.map((punto) => `<li>${escapar(punto)}</li>`).join('')}
        </ul>

        <ul class="etiquetas etiquetas--pequenas" aria-label="Tecnologías de ${escapar(proyecto.nombre)}">
          ${proyecto.tecnologias.map((tec) => `<li class="etiqueta">${escapar(tec)}</li>`).join('')}
        </ul>

        <!--
          Envoltorio sin significado propio: aquí un <div> es lo correcto.
          Una <section> exigiría un título y crearía una región vacía que el
          lector de pantalla anunciaría sin aportar nada.
        -->
        <div class="proyecto__avance">
          <p class="proyecto__avance-datos">
            <span>${funcionando}/${proyecto.modulos.length} módulos funcionando</span>
            <span aria-hidden="true">${avance}%</span>
          </p>
          <!--
            <progress> es el elemento nativo para esto: el lector de pantalla
            ya lo anuncia como barra de progreso, sin necesidad de role ni
            aria-valuenow escritos a mano. El texto interior es el respaldo
            para navegadores muy antiguos.
          -->
          <progress class="proyecto__barra"
                    value="${avance}" max="100"
                    data-avance="${avance}"
                    aria-label="Avance de ${escapar(proyecto.nombre)}">${avance}%</progress>
        </div>

        <details class="proyecto__modulos">
          <summary>
            <svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m9 6 6 6-6 6"/>
            </svg>
            Ver los ${proyecto.modulos.length} módulos y su estado
          </summary>
          <ul class="lista-modulos">
            ${proyecto.modulos.map((modulo) => `
              <li class="modulo">
                <div>
                  <p class="modulo__nombre">${escapar(modulo.nombre)}</p>
                  <p class="modulo__descripcion">${escapar(modulo.descripcion)}</p>
                </div>
                <estado-modulo estado="${escapar(modulo.estado)}"></estado-modulo>
              </li>`).join('')}
          </ul>
        </details>

        <footer class="proyecto__enlaces">
          ${enlaceOAviso(proyecto.demo, 'Ver demo', ICONO_EXTERNO)}
          ${enlaceOAviso(proyecto.repositorio, 'Ver código', ICONO_CODIGO)}
        </footer>

      </article>
    `;

    // El filtro por tecnología lee estos atributos sin volver a tocar el objeto.
    this.dataset.tecnologias = proyecto.tecnologias.join('|');
    this.dataset.estado = proyecto.estado;
    if (proyecto.destacado) this.dataset.destacado = 'true';
  }
}

/* --------------------------------------------------------------------------
   Utilidades
   -------------------------------------------------------------------------- */

const ICONO_EXTERNO = `<svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>`;

const ICONO_CODIGO = `<svg class="icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>`;

/**
 * Si el enlace todavía no existe, mostramos un aviso en vez de un enlace roto.
 * Un `href="#"` que no lleva a ningún lado es peor que no ponerlo.
 */
function enlaceOAviso(url, texto, icono) {
  if (!url) {
    return `<span class="enlace enlace--pendiente">${icono}${texto} · pronto</span>`;
  }
  return `<a class="enlace" href="${escapar(url)}" target="_blank" rel="noopener noreferrer">
            ${icono}${texto}
          </a>`;
}

/**
 * Escapa HTML antes de insertarlo. Hoy los datos son locales y de confianza,
 * pero cuando vengan de una API esta función es la que evita un XSS.
 * Es más barato tenerla desde el principio que auditarlo después.
 */
export function escapar(valor) {
  return String(valor ?? '').replace(/[&<>"']/g, (caracter) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[caracter]);
}

customElements.define('tarjeta-proyecto', TarjetaProyecto);
