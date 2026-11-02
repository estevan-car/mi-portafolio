# Portafolio — Estevan Cardona

Portafolio de una sola página, tema oscuro con acento esmeralda.
Sin frameworks: HTML5, CSS3 y JavaScript moderno.

Todo el código está en español: clases, identificadores, atributos, variables,
funciones y nombres de archivo.

## Cómo verlo

**Doble clic en `abrir-portafolio.command`.** Levanta el servidor y abre el
navegador solo.

Hace falta un servidor porque los módulos de JavaScript (`import` / `export`)
no funcionan al abrir el archivo con doble clic: el navegador los bloquea por
CORS. Si prefieres hacerlo a mano:

```bash
python3 -m http.server 8000    # y abre http://localhost:8000
```

## Estructura

```
portafolio-estevan/
├── index.html                    Toda la página
├── abrir-portafolio.command      Arranca el servidor local (doble clic)
├── css/
│   ├── variables.css             Colores, tipografías, medidas, curvas
│   ├── base.css                  Reset, elementos HTML y capas de fondo
│   ├── componentes.css           Cabecera, botones, tarjetas, estados, filtros
│   └── secciones.css             Portada, sobre mí, stack, proyectos, trayectoria
├── js/
│   ├── datos/proyectos.js        Fuente única de datos
│   ├── componentes/
│   │   ├── tarjeta-proyecto.js   <tarjeta-proyecto>
│   │   └── estado-modulo.js      <estado-modulo>
│   ├── interfaz.js               Menú, apariciones, sección activa, rotador
│   └── principal.js              Punto de entrada
└── assets/img/                   Foto de perfil y capturas
```

## Semántica del HTML

La regla que sigue este proyecto: **usar la etiqueta que describe lo que hay
dentro**, no la que toque poner.

| Etiqueta | Cuándo se usa aquí |
|---|---|
| `<section>` | Bloque temático **con su propio título**. Las cinco secciones de la página y las tres tarjetas del stack. |
| `<article>` | Contenido autónomo que se entendería fuera de la página: cada tarjeta de proyecto y cada entrada de la trayectoria. |
| `<header>` / `<footer>` | Encabezado y cierre de la página o de un bloque. |
| `<nav>` | Solo el menú principal. |
| `<figure>` | El retrato de la portada. |
| `<ul>` / `<ol>` | Cualquier conjunto de elementos. La trayectoria es `<ol>` porque el orden es información. |
| `<dl>` / `<dt>` / `<dd>` | Pares dato-valor: la ficha de «Sobre mí» y los datos de contacto. |
| `<time>` | Fechas legibles por máquina. |
| `<progress>` | La barra de avance de cada proyecto. |
| `<details>` / `<summary>` | La lista desplegable de módulos. |
| `<div>` | **Solo** envoltorios sin significado: rejillas, capas decorativas, contenedores de layout. |

**Por qué no todo es `<section>`.** Una `<section>` es una región para el
lector de pantalla y necesita un título. Usarla como envoltorio genérico llena
la página de regiones vacías y empeora la navegación. Cada `<section>` de este
proyecto tiene `aria-labelledby` apuntando a su propio encabezado, de modo que
al listar las regiones aparecen con nombre.

La jerarquía de encabezados va de `h1` a `h4` sin saltos, con un solo `h1`.

## Decisiones de arquitectura

**Los datos están separados del HTML.** El `index.html` no contiene información
de proyectos: todo vive en `js/datos/proyectos.js`. Cuando exista el backend en
Spring Boot se reemplaza el array por un `fetch` y ningún componente cambia.
Por eso `obtenerProyectos()` ya es `async`.

**El estado de cada módulo está en un solo lugar.** Cambias un `estado` en
`proyectos.js` y se actualizan la insignia, la barra de avance, el contador de
módulos y el filtro. No hay nada que sincronizar a mano.

**Variables CSS para todo el sistema visual.** Ningún componente declara un
color literal. Cambiar `--acento` en `variables.css` repinta el sitio entero.

**Web Components sin Shadow DOM.** Deliberado: así heredan las variables
globales y no hay que duplicar estilos dentro de cada componente.

**Escapado de HTML antes de insertar.** `escapar()` en `tarjeta-proyecto.js` no
hace falta hoy porque los datos son locales, pero cuando vengan de una API es lo
que evita un XSS.

**Los enlaces vacíos no se renderizan como enlaces.** Un `href="#"` que no lleva
a ningún lado es peor que no ponerlo: se muestra un aviso «pronto».

**Sobre los nombres en inglés que quedan.** `stack` se conserva porque es el
término que se ve en pantalla y el que se usa en el sector. Las APIs del
navegador (`querySelector`, `addEventListener`, `innerHTML`...) las define el
estándar web y no se pueden traducir.

## Pendiente

- [ ] **Capturas de los proyectos.** Guárdalas en `assets/img/proyectos/`
      (1280×800, en `.webp`) y pon la ruta en el campo `imagen` de cada
      proyecto en `js/datos/proyectos.js`. Sin `imagen`, la tarjeta sale sin foto.
- [ ] **og:image con URL completa.** Al publicar, cambia `assets/img/og.jpg`
      por `https://tu-dominio/assets/img/og.jpg` en el `index.html`.
- [ ] **CV en PDF** para descargar desde la portada.
- [ ] Repositorio público de los proyectos que lo permitan.

## Actualizar el portafolio

**Cambiar el estado de un módulo:** en `js/datos/proyectos.js`, cambia `estado`
a `ESTADO.FUNCIONANDO`, `ESTADO.DESARROLLO` o `ESTADO.PLANEADO`. Todo lo demás
se recalcula.

**Agregar un proyecto:** añade un objeto al array `PROYECTOS` con la misma
estructura. La tarjeta aparece sola.

**Proyectos sin demo pública** (internos o de un cliente): deja `demo` y
`repositorio` vacíos y escribe el motivo en `notaEnlaces`. Se muestra con un
candado en vez de «pronto».

**Filtros:** son categorías, no tecnologías sueltas. Se definen en
`CATEGORIAS` (en `proyectos.js`); una categoría solo aparece si algún
proyecto usa alguna de sus tecnologías.

**Cambiar el color de acento:** edita `--acento` y `--acento-2` en
`css/variables.css`. Si eliges un color claro, ajusta también `--acento-tinta`
(el texto sobre los botones) para mantener el contraste.

## Accesibilidad

- Contraste verificado: todas las combinaciones de texto cumplen WCAG AA.
- Navegación completa por teclado, con enlace de salto y foco visible.
- Cada región tiene nombre accesible; los encabezados no saltan niveles.
- Respeta `prefers-reduced-motion`: sin animaciones para quien las desactivó.
- Los módulos usan `<details>` nativo: funcionan aunque falle el JavaScript.
- La barra de avance es `<progress>`: el lector de pantalla ya la entiende, sin
  `role` ni `aria-valuenow` escritos a mano.

## Publicar

**GitHub Pages** — sube el proyecto a un repositorio, luego Settings → Pages →
Source: rama `main`, carpeta `/root`.

**Netlify** — arrastra la carpeta a [app.netlify.com/drop](https://app.netlify.com/drop).
