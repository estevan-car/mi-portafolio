/**
 * ENTRADA DE LA PÁGINA
 * ---------------------------------------------------------------------------
 * Renderiza los proyectos desde la capa de datos y conecta el filtro por
 * tecnología. El HTML solo aporta el contenedor vacío.
 */

import { iniciarInterfaz, observarApariciones, animarBarrasAvance, escalonar } from './interfaz.js';
import { obtenerProyectos, categoriasConProyectos, perteneceACategoria, CATEGORIAS } from './datos/proyectos.js';
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
  marcarEvidenciaStack(proyectos);

  // Las tarjetas nacen después de iniciarInterfaz(), así que se animan aparte.
  escalonar(rejilla, 110);
  observarApariciones(rejilla);
  animarBarrasAvance(rejilla);

  if (barraFiltros) construirFiltros(barraFiltros, rejilla, proyectos);
}

/**
 * Evidencia del stack: a cada etiqueta con data-tecnologia le agrega cuántos
 * proyectos la usan y cuáles. Así el stack no es una lista de palabras: cada
 * tecnología queda respaldada por algo construido.
 * El número sale de los mismos datos que las tarjetas, así que nunca se
 * desincroniza: agregas un proyecto y los contadores se actualizan solos.
 */
function marcarEvidenciaStack(proyectos) {
  document.querySelectorAll('#stack [data-tecnologia]').forEach((etiqueta) => {
    const tecnologia = etiqueta.dataset.tecnologia;
    const nombres = proyectos
      .filter((proyecto) => proyecto.tecnologias.includes(tecnologia))
      .map((proyecto) => proyecto.nombre);
    if (nombres.length === 0) return;

    etiqueta.classList.add('etiqueta--con-uso');
    etiqueta.title = `Usado en: ${nombres.join(', ')}`;

    // El número es visual; el lector de pantalla recibe la frase completa.
    const contador = document.createElement('span');
    contador.className = 'etiqueta__usos';
    contador.setAttribute('aria-hidden', 'true');
    contador.textContent = nombres.length;

    const texto = document.createElement('span');
    texto.className = 'solo-lectores';
    texto.textContent = `, usado en ${nombres.length} ${nombres.length === 1 ? 'proyecto' : 'proyectos'}`;

    etiqueta.append(contador, texto);
  });
}

function construirFiltros(barra, rejilla, proyectos) {
  const categorias = [TODAS, ...categoriasConProyectos(proyectos).map((categoria) => categoria.nombre)];

  barra.replaceChildren(
    ...categorias.map((categoria, indice) => {
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'filtro';
      boton.textContent = categoria === TODAS ? 'Todos' : categoria;
      boton.dataset.categoria = categoria;
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

    aplicarFiltro(rejilla, boton.dataset.categoria);
  });
}

function aplicarFiltro(rejilla, nombreCategoria) {
  const categoria = CATEGORIAS.find((c) => c.nombre === nombreCategoria);
  let visibles = 0;

  rejilla.querySelectorAll('tarjeta-proyecto').forEach((tarjeta) => {
    const tecnologiasTarjeta = (tarjeta.dataset.tecnologias || '').split('|');
    const seMuestra = !categoria || perteneceACategoria(tecnologiasTarjeta, categoria);
    tarjeta.hidden = !seMuestra;
    if (seMuestra) visibles += 1;
  });

  // Nunca dejar al usuario frente a una pantalla vacía sin explicación.
  const aviso = document.querySelector('[data-proyectos-vacio]');
  if (aviso) aviso.hidden = visibles > 0;
}

iniciarInterfaz();
mostrarProyectos();
