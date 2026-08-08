# Estado del proyecto — 7 de agosto de 2026

Punto de guardado para retomar el portafolio. Todo lo de aquí está ya aplicado
en el código; lo que falta está listado abajo.

---

## Dónde va el portafolio

Una sola página, tema oscuro con acento esmeralda (`#2FD69B`), sin frameworks.
Todo el código en español. Semántica HTML revisada: 96 etiquetas semánticas
contra 41 `<div>`, y esos son solo envoltorios de rejilla y capas decorativas.

Para verlo: doble clic en `abrir-portafolio.command`.

### Secciones listas

Portada · Sobre mí · Stack · Proyectos · Trayectoria · Contacto

### Proyectos (ambos publicados y enlazados)

| Proyecto | Estado | Avance | Demo | Repositorio |
|---|---|---|---|---|
| Serena Repostería | En producción | 50% | estevan-car.github.io/serena | github.com/estevan-car/serena |
| VERTRISS | En producción | 57% | vertriss.vercel.app | github.com/estevan-car/vertrissv1 |

Los dos se editan desde `js/datos/proyectos.js`. Al cambiar el `estado` de un
módulo se recalculan solos la insignia, la barra de avance y el contador.

---

## Lo que quedó pendiente de confirmar

Estas dos cosas las deduje mirando el sitio publicado de Serena. Confírmalas
o corrígelas en `js/datos/proyectos.js`:

1. **Carrito de pedido.** Vi un contador en la cabecera del sitio, así que lo
   dejé como `ESTADO.DESARROLLO`. Si el carrito ya cierra el pedido completo,
   súbelo a `ESTADO.FUNCIONANDO`; si no existe, bájalo a `ESTADO.PLANEADO`.

2. **Historial de pedidos.** Estaba marcado como funcionando pero no aparece en
   el sitio publicado, así que lo quité de la lista. Si existe en otra rama o en
   otro repositorio, hay que volver a agregarlo.

---

## Pendientes para poder publicar

- [ ] **Trayectoria: tiene datos de relleno.** `AÑO — AÑO`,
      `NOMBRE DEL PROGRAMA`, `NOMBRE DE LA INSTITUCIÓN` (líneas ~446-450 de
      `index.html`). Esto es lo más urgente: no puede salir así.
- [ ] **LinkedIn:** reemplazar `TU-PERFIL` en `index.html` (aparece 4 veces).
- [ ] **WhatsApp:** reemplazar `57TUNUMERO`, o borrar ese botón (línea ~501).
- [ ] **Foto:** guardarla en `assets/img/estevan.jpg` (cuadrada, mínimo
      800×800), descomentar el `<img class="retrato__imagen">` y borrar el
      bloque `.retrato__marcador`.
- [ ] **Imagen para compartir:** `assets/img/og.jpg` (1200×630) y descomentar
      el `<meta property="og:image">`.

Ya está resuelto: usuario de GitHub (`estevan-car`), ubicación
(Rionegro, Antioquia), enlaces de demo y repositorio de los dos proyectos.

---

## Idea propuesta que quedó sin aplicar

El pie de la página de Serena dice **«Diseñado y desarrollado por VERTRISS»**.
Es decir, Serena no es un proyecto personal: es un cliente de tu propia agencia.

Esa historia — *monté una agencia y estos son mis clientes* — pesa mucho más
que «hice dos proyectos». Falta reflejarla en:

- La sección **Sobre mí**, que hoy no menciona VERTRISS como agencia.
- La **Trayectoria**, donde la primera entrada podría ser la fundación de
  VERTRISS en lugar de «Desarrollo independiente».

---

## Por dónde seguir mañana

1. Llenar la Trayectoria con datos reales (lo más urgente).
2. Confirmar los dos módulos de Serena.
3. Decidir si incorporamos la historia de VERTRISS como agencia.
4. Foto y datos de contacto que falten.
5. Publicar en GitHub Pages o Netlify (instrucciones en el `README.md`).

---

## Archivos del proyecto

```
portafolio-estevan/
├── index.html                    Toda la página
├── abrir-portafolio.command      Arranca el servidor local (doble clic)
├── README.md                     Documentación técnica y decisiones
├── ESTADO.md                     Este archivo
├── css/
│   ├── variables.css             Colores, tipografías, medidas
│   ├── base.css                  Reset y capas de fondo
│   ├── componentes.css           Cabecera, botones, tarjetas, estados
│   └── secciones.css             Layout de cada bloque
├── js/
│   ├── datos/proyectos.js        Fuente única de datos
│   ├── componentes/
│   │   ├── tarjeta-proyecto.js
│   │   └── estado-modulo.js
│   ├── interfaz.js               Menú, apariciones, sección activa
│   └── principal.js              Punto de entrada
└── assets/img/                   (vacía: falta la foto)
```
