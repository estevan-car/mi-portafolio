/**
 * ENTRADA DE LA PÁGINA
 * ---------------------------------------------------------------------------
 * Renderiza los proyectos desde la capa de datos y conecta el filtro por
 * tecnología. El HTML solo aporta el contenedor vacío.
 */

import { iniciarInterfaz, observarApariciones, animarBarrasAvance, escalonar } from './interfaz.js';
import { obtenerProyectos, recopilarTecnologias } from './datos/proyectos.js';
import './componentes/tarjeta-proyecto.js';

const TODAS = 'todas';

async function mostrarProyectos() {
  const rejilla = document.querySelector('[data-proyectos]');
  const barraFiltros = document.querySelector('[data-filtros]');
  if (!rejilla) return;

  let proyectos;
  try {
    proyectos = await obtenerProyectos();
  } catch (error) {
    // Cuando esto venga de una API real, este camino sí se va a usar.
    console.error('Error cargando los proyectos:', error);
    rejilla.innerHTML =
      '<p class="proyectos__vacio">No se pudieron cargar los proyectos. Recarga la página.</p>';
    return;
  }

  // Un fragment: un solo repintado en lugar de uno por tarjeta.
  const fragmento = document.createDocumentFragment();
  proyectos.forEach((proyecto) => {
    const tarjeta = document.createElement('tarjeta-proyecto');
    tarjeta.proyecto = proyecto;
    fragmento.appendChild(tarjeta);
  });
  rejilla.replaceChildren(fragmento);

  // Las tarjetas nacen después de iniciarInterfaz(), así que se animan aparte.
  escalonar(rejilla, 110);
  observarApariciones(rejilla);
  animarBarrasAvance(rejilla);

  if (barraFiltros) construirFiltros(barraFiltros, rejilla, proyectos);
}

function construirFiltros(barra, rejilla, proyectos) {
  const tecnologias = [TODAS, ...recopilarTecnologias(proyectos)];

  barra.replaceChildren(
    ...tecnologias.map((tecnologia, indice) => {
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'filtro';
      boton.textContent = tecnologia === TODAS ? 'Todas' : tecnologia;
      boton.dataset.tecnologia = tecnologia;
      boton.setAttribute('aria-pressed', String(indice === 0));
      return boton;
    })
  );

  // Un solo listener en el contenedor (delegación) en vez de uno por botón.
  barra.addEventListener('click', (evento) => {
    const boton = evento.target.closest('.filtro');
    if (!boton) return;

    barra.querySelectorAll('.filtro').forEach((otro) => {
      otro.setAttribute('aria-pressed', String(otro === boton));
    });

    aplicarFiltro(rejilla, boton.dataset.tecnologia);
  });
}

function aplicarFiltro(rejilla, tecnologia) {
  let visibles = 0;

  rejilla.querySelectorAll('tarjeta-proyecto').forEach((tarjeta) => {
    const tecnologiasTarjeta = (tarjeta.dataset.tecnologias || '').split('|');
    const seMuestra = tecnologia === TODAS || tecnologiasTarjeta.includes(tecnologia);
    tarjeta.hidden = !seMuestra;
    if (seMuestra) visibles += 1;
  });

  // Nunca dejar al usuario frente a una pantalla vacía sin explicación.
  const aviso = document.querySelector('[data-proyectos-vacio]');
  if (aviso) aviso.hidden = visibles > 0;
}

iniciarInterfaz();
mostrarProyectos();
