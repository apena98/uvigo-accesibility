---
description: "WCAG 2.1 AA accessibility compliance for HTML and CSS. Use when: generating HTML markup, writing CSS styles, creating forms, adding images, implementing navigation, or working on any visual or interactive elements for the AccesiVigo project."
applyTo:
  - "**/*.html"
  - "**/*.css"
  - "**/*.htm"
---

# Instrucciones de Accesibilidad WCAG 2.1 AA - AccesiVigo

Este proyecto debe cumplir **WCAG 2.1 nivel AA** en su totalidad. Todo el HTML y CSS generado debe ser accesible para personas con discapacidad visual y otras discapacidades.

## Principios Fundamentales

### 1. Estructura HTML Semántica (OBLIGATORIO)

- **SIEMPRE** usa elementos HTML5 semánticos: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- **NUNCA** uses `<div>` o `<span>` cuando existe un elemento semántico apropiado
- Usa una sola etiqueta `<h1>` por página (título principal)
- Mantén jerarquía de encabezados sin saltos: h1 → h2 → h3 (nunca h1 → h3)
- Usa `<button>` para acciones y `<a>` solo para navegación
- Todas las listas deben usar `<ul>`, `<ol>` o `<dl>` según corresponda

### 2. Atributos ARIA y Roles

- **Usa roles de landmark:** `role="banner"` (header), `role="navigation"` (nav), `role="main"` (main), `role="contentinfo"` (footer)
- **Etiqueta todas las navegaciones:** `<nav aria-label="Menú principal">` (usa descripciones únicas si hay múltiples nav)
- **ARIA en formularios:**
  - `aria-required="true"` en campos obligatorios
  - `aria-describedby` para vincular hints y descripciones
  - `aria-invalid="true"` para campos con errores (gestionar con JavaScript)
  - `aria-live="polite"` o `aria-live="assertive"` para mensajes de estado
  - `aria-atomic="true"` para anunciar bloques completos
- **Página actual:** usa `aria-current="page"` en enlaces del menú
- **ARIA en imágenes decorativas:** si la imagen es decorativa y está descrita en el texto circundante, usa `alt=""`

### 3. Accesibilidad de Imágenes

- **Todas las imágenes informativas** deben tener `alt` descriptivo y detallado (describe QUÉ muestra, no "imagen de...")
- **Imágenes decorativas** deben tener `alt=""`
- Usa `<figure>` y `<figcaption>` para imágenes con pie
- Si el caption repite el alt, usa clase `.sr-only` en `<figcaption>` para evitar redundancia para usuarios de lectores de pantalla

### 4. Contraste de Color (Ratio Mínimo 4.5:1)

**Colores aprobados para texto:**
- Texto normal sobre blanco: `#333`, `#444`, `#555`, `#666` (ratio ≥ 4.5:1)
- Texto sobre fondo oscuro (`#4a5568`): `#fff`, `#f8f9fa`
- Enlaces: `#0073cf` (secundario), `#005aa0` (primario)
- Textos de acento: `#00a651`

**PROHIBIDO:**
- Texto gris claro sobre blanco (#ccc, #aaa, #999)
- Texto blanco sobre fondos claros
- **SIEMPRE verifica** el contraste con herramientas como WebAIM Contrast Checker

### 5. Navegación por Teclado

- **Skip link obligatorio:** primer elemento del `<body>`: `<a class="skip-link" href="#main-content">Saltar al contenido principal</a>`
- **Indicadores de foco visibles:** usa `:focus` con `outline` de al menos 2px, color contrastante
- **Nunca uses** `outline: none` sin proporcionar alternativa visible
- **Orden de tabulación lógico:** el HTML debe estar en orden lógico de lectura
- **Evita `tabindex` positivos** (tabindex="1", tabindex="2", etc.)

### 6. Tipografía Accesible

- **Fuente principal:** `'Atkinson Hyperlegible'` (diseñada para legibilidad, especialmente para personas con baja visión)
- **Tamaño mínimo:** 16px para texto de cuerpo (1rem)
- **Interlineado mínimo:** `line-height: 1.6` para párrafos
- **Peso de fuente:** 400 (regular) o 600-700 (bold), **nunca usar peso < 400**
- **NUNCA justificar texto** (`text-align: justify`), usa `left` o `start`

### 7. Formularios Accesibles

```html
<!-- Patrón obligatorio para campos de formulario -->
<div class="form-group">
  <label for="campo-id">Etiqueta del campo <span aria-label="obligatorio">*</span></label>
  <input type="text" id="campo-id" name="campo-id" 
         required 
         aria-required="true"
         aria-describedby="campo-id-hint">
  <span id="campo-id-hint" class="hint">Texto de ayuda descriptivo</span>
</div>
```

**Reglas:**
- **Todos los inputs deben tener `<label>` asociado** con atributo `for`
- Campos obligatorios: asterisco con `aria-label="obligatorio"`
- Usa `<fieldset>` y `<legend>` para agrupar campos relacionados
- Mensajes de error/éxito: usa `aria-live="polite"` y `aria-atomic="true"`
- Usa `novalidate` en `<form>` si implementas validación customizada
- Checkbox/radio: el label debe contener el input o estar asociado con `for`/`id`

### 8. Enlaces y Botones

- **Enlaces descriptivos:** el texto del enlace debe describir el destino ("Leer más sobre servicios", no "Leer más" o "Click aquí")
- **Área de clic mínima:** 44x44px (usa padding en CSS: `padding: 0.6rem 1.2rem` mínimo)
- **Estados visibles:** `:hover`, `:focus`, `:active` deben tener estilos diferenciados
- **Enlaces externos:** considera añadir indicador visual y/o `aria-label` que indique que abre en nueva ventana

### 9. Idioma y Atributos `lang`

- **SIEMPRE** incluye `lang="es"` en `<html>`
- Si incluyes texto en otro idioma, marca el fragmento: `<span lang="en">Accessibility</span>`

### 10. Responsive y Zoom

- **SIEMPRE** incluye: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- **NUNCA uses:** `user-scalable=no` o `maximum-scale=1` (bloquea zoom)
- Diseño debe funcionar correctamente con zoom de hasta 200%
- Usa unidades relativas (`rem`, `em`, `%`) en lugar de `px` fijos donde sea posible
- Media queries: usa `rem` o `em`, no `px`

### 11. Animaciones y Movimiento

- **Respeta preferencias de movimiento reducido:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
- **Nunca uses** animaciones automáticas que duren más de 5 segundos sin control de pausa
- **Evita parpadeos** más rápidos que 3 veces por segundo (riesgo de epilepsia)

### 12. Contenido Oculto Visualmente

Usa esta clase para contenido solo para lectores de pantalla:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
```

Úsala para: información adicional de contexto, instrucciones para usuarios de lectores de pantalla, etiquetas alternativas.

### 13. Tablas Accesibles

- Usa `<table>` solo para datos tabulares, **nunca para maquetación**
- **SIEMPRE** incluye `<caption>` para describir la tabla
- Usa `<th scope="col">` para encabezados de columna
- Usa `<th scope="row">` para encabezados de fila
- Tablas complejas: usa `id` y `headers` para asociar celdas

### 14. Multimedia

- **Videos**: deben tener subtítulos (`<track kind="captions">`)
- **Audio**: proporciona transcripción textual
- **Nunca** reproduzcas contenido automáticamente con sonido
- Proporciona controles accesibles (`controls` nativo o custom con ARIA)

### 15. CSS y Diseño Visual

- **Sin información solo por color:** usa iconos, texto, o patrones además del color
- **Espaciado mínimo:**
  - Entre párrafos: `margin-bottom: 1rem` mínimo
  - Entre secciones: `padding: 3rem 0` mínimo
  - Entre elementos interactivos: suficiente para evitar clics erróneos (mínimo 8px)
- **NUNCA uses** `!important` a menos que sea absolutamente imprescindible
- **Transiciones suaves:** máximo `0.2s` o `0.3s` para no retrasar interacciones

### 16. Checklist de Validación

Antes de finalizar cualquier HTML/CSS, verifica:

- [ ] HTML válido (sin errores de sintaxis)
- [ ] Jerarquía de encabezados correcta (h1 → h2 → h3)
- [ ] Todos los `<img>` tienen atributo `alt`
- [ ] Todos los `<input>` tienen `<label>` asociado
- [ ] Contraste de color ≥ 4.5:1 para texto normal, ≥ 3:1 para texto grande
- [ ] Skip link presente y funcional
- [ ] Indicadores de foco visibles en todos los elementos interactivos
- [ ] `lang` definido en `<html>` y en fragmentos de otros idiomas
- [ ] Navegación posible solo con teclado (Tab, Enter, Escape, flechas)
- [ ] Mensajes dinámicos usan `aria-live`
- [ ] No hay elementos que parpadeen más de 3 veces por segundo
- [ ] Diseño responsive que funciona con zoom 200%

## Recursos de Referencia

- **WCAG 2.1:** https://www.w3.org/WAI/WCAG21/quickref/
- **WebAIM Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **ARIA Authoring Practices:** https://www.w3.org/WAI/ARIA/apg/

## Ejemplos de Código Prohibido ❌

```html
<!-- MAL: enlace no descriptivo -->
<a href="#">Haz clic aquí</a>

<!-- MAL: input sin label -->
<input type="text" placeholder="Nombre">

<!-- MAL: imagen sin alt -->
<img src="foto.jpg">

<!-- MAL: div como botón -->
<div onclick="enviar()">Enviar</div>

<!-- MAL: solo color para indicar error -->
<input style="border-color: red;">
```

## Ejemplos de Código Correcto ✅

```html
<!-- BIEN: enlace descriptivo -->
<a href="#servicios">Ver todos los servicios de apoyo</a>

<!-- BIEN: input con label y hint -->
<label for="nombre">Nombre completo <span aria-label="obligatorio">*</span></label>
<input type="text" id="nombre" name="nombre" 
       required aria-required="true" 
       aria-describedby="nombre-hint">
<span id="nombre-hint" class="hint">Escriba su nombre y apellidos</span>

<!-- BIEN: imagen con alt descriptivo -->
<img src="campus.jpg" 
     alt="Campus universitario con rampas, señalización accesible y ascensores adaptados">

<!-- BIEN: botón semántico -->
<button type="submit">Enviar formulario</button>

<!-- BIEN: indicación de error multimodal -->
<input type="email" id="email" 
       aria-invalid="true" 
       aria-describedby="email-error"
       style="border-color: #c00;">
<span id="email-error" style="color: #c00;">
  ⚠️ Error: El formato del email no es válido
</span>
```

## Notas Finales

- **Documenta siempre** por qué usas ciertos atributos ARIA cuando la razón no sea obvia
- **Prioriza HTML semántico** sobre ARIA (solo usa ARIA cuando el HTML nativo no sea suficiente)
- **Prueba con lectores de pantalla:** NVDA (Windows), JAWS, VoiceOver (Mac/iOS), TalkBack (Android)
- **Idioma del proyecto:** español (España) - usa `lang="es"` y terminología española