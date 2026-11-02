# Estado — 1 de noviembre de 2026

## Cambios en el portafolio

- Proyectos nuevos: **Registro de limpieza** (COMFAMA, destacado) y
  **Gestión de turnos** (COMFAMA).
- Trayectoria con las prácticas en COMFAMA; textos que ya no cuadraban, corregidos.
- Stack al día: Node/Express y Docker/Google Cloud/n8n pasan a «uso hoy»;
  JPA, Swagger y arquitectura hexagonal a «aprendiendo».
- Filtro por 5 categorías en vez de 17 tecnologías sueltas.
- Las tarjetas aceptan captura (campo `imagen`).
- Proyectos internos muestran el motivo (candado) en vez de «pronto».
- Imagen `og.jpg` para compartir, ya creada y activada.
- Accesibilidad: se quitó `role="status"` de las insignias.

---

# Estado anterior — 10 de agosto de 2026

Punto de guardado de los dos proyectos en curso.

---

## 1. Portafolio (esta carpeta)

Una sola página, tema oscuro con acento esmeralda, sin frameworks, todo el
código en español. Para verlo: doble clic en `abrir-portafolio.command`.

**Ya resuelto:** foto de perfil, LinkedIn, usuario de GitHub, ubicación
(Rionegro, Antioquia), enlaces de demo y repositorio de los dos proyectos,
y la sección Trayectoria con datos reales.

**Único pendiente:** la imagen para compartir en redes.
Sube `assets/img/og.jpg` (1200×630) y descomenta la línea
`<meta property="og:image">` en el `index.html` (línea 16).

Sin eso, cuando alguien comparta tu portafolio por WhatsApp o LinkedIn no
aparece imagen de vista previa.

### Proyectos que muestra

| Proyecto | Estado | Avance |
|---|---|---|
| Serena Repostería | En producción | 50% |
| VERTRISS | En producción | 57% |

Se editan desde `js/datos/proyectos.js`. Al cambiar el `estado` de un módulo
se recalculan solos la insignia, la barra de avance y el contador.

---

## 2. Bot de pedidos de Serena

**Carpeta: `Documentos/bot-serena-v2`** ← esta es la versión buena.
Funcionando en producción sobre Render + Airtable.

Reenvías al bot el mensaje de la clienta tal como llega —con emojis, fechas
en español y todo— y lo guarda en Airtable con vista de calendario.

### Lo que se arregló

Fallos reales encontrados en pedidos ya guardados:

- El **nombre de la clienta se perdía**: el bot buscaba `Cliente` y ellas
  escriben `Nombre completo`.
- El **teléfono perdía el indicativo**: de `304 6653074` guardaba `6653074`.
  Ese número no sirve para llamar.
- El **tamaño de la torta iba a la columna Cantidad**.
- Los **errores no se veían**: cualquier fallo de Airtable se tragaba en
  silencio y el bot no respondía. Por eso parecía roto.
- Los **pedidos se podían duplicar** cuando Render estaba dormido.
- **`Valor total: $39.000 con abono de $20.000`** se convertía en
  $3.900.020.000, porque pegaba todos los dígitos de la línea.
- **Responder "No" a "¿recoges?"** dejaba la entrega vacía.

### Lo que hace ahora

- Resumen de confirmación con la misma estructura del formulario, para
  compararlo línea por línea.
- Verifica el saldo: si el del mensaje no cuadra con `total − abono`, avisa.
- Rescata la dirección aunque venga pegada en la respuesta.
- `/revisar` comprueba Airtable y dice qué columnas faltan.

### Estructura

`pedido.js` traduce el mensaje a datos y no sabe nada de Telegram ni de
Airtable. `server.js` solo habla con los dos servicios. Por eso la parte
difícil se pudo probar aislada — y si algún día los pedidos llegan por
WhatsApp o por un formulario web, `pedido.js` se reutiliza tal cual.

### Ojo con esto

- **La prueba de Airtable se vence pronto.** Mira qué pasa con la base y con
  el plan gratuito antes de que expire.
- **Registro viejo:** el primer pedido de Krisdayana quedó sin nombre y con
  el teléfono cortado. Bórralo o corrígelo a mano.
- **Seguridad opcional:** sin `TELEGRAM_WEBHOOK_SECRET`, cualquiera que
  conozca la URL de Render puede insertar pedidos falsos. Está explicado en
  el `env-ejemplo.txt` de la carpeta del bot.
- La carpeta `pedidos-bot-listo` quedó obsoleta; se puede borrar.

---

## Por dónde seguir

1. **Imagen `og.jpg`** para el portafolio (lo único que falta ahí).
2. **Agregar el bot como tercer proyecto del portafolio.** Automatiza un
   proceso manual real, está en producción y tiene una buena historia de
   depuración que contar — encaja exactamente con el perfil de «sistemas de
   gestión» que declara el portafolio.
3. Publicar el portafolio en GitHub Pages o Netlify (instrucciones en el
   `README.md`).
