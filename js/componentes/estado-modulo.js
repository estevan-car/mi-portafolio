import { ETIQUETA_ESTADO, ESTADO } from '../datos/proyectos.js';

/**
 * <estado-modulo estado="funcionando|desarrollo|planeado"></estado-modulo>
 * ---------------------------------------------------------------------------
 * Elemento personalizado mínimo. Sin Shadow DOM a propósito: así hereda las
 * variables CSS globales y no hay que duplicar estilos dentro del componente.
 *
 * `observedAttributes` permite cambiar el estado en caliente sin recrear
 * el nodo: el navegador avisa y el componente se vuelve a dibujar solo.
 */
class EstadoModulo extends HTMLElement {
  static observedAttributes = ['estado'];

  connectedCallback() {
    this.#dibujar();
  }

  attributeChangedCallback() {
    // Solo redibuja si ya está en el documento; evita trabajo innecesario.
    if (this.isConnected) this.#dibujar();
  }

  #dibujar() {
    const estado = this.getAttribute('estado') ?? ESTADO.PLANEADO;
    const etiqueta = ETIQUETA_ESTADO[estado] ?? ETIQUETA_ESTADO[ESTADO.PLANEADO];

    this.className = `estado estado--${estado}`;
    this.textContent = etiqueta;

    /* Sin role="status" a propósito: ese rol crea una región "en vivo" que el
       lector de pantalla anuncia cada vez que cambia. Con unas 40 insignias en
       la página eso es ruido. El texto visible ("En desarrollo") ya se lee. */
  }
}

customElements.define('estado-modulo', EstadoModulo);
