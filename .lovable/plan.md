

# Berry Graphics — Landing Page v2 (Rediseno completo)

## Concepto de diseno

Una landing page profesional con un enfoque editorial y moderno. Se abandona el layout ultra-minimalista anterior por una composicion mas dinamica con jerarquia visual clara, uso de escala tipografica dramatica y separaciones geometricas sutiles con la paleta roja de Berry.

## Estructura de la pagina

### 1. Navegacion superior fija
- Barra superior minima y transparente que se vuelve blanca al hacer scroll
- Logo "Berry" a la izquierda (texto, peso 600, color primary)
- Link "Contacto" a la derecha (peso 600, hover en secondary)

### 2. Hero — Impacto visual inmediato
- Layout asimetrico: texto alineado a la izquierda en desktop, centrado en mobile
- Titulo grande escalonado en dos lineas:
  - "Comunicacion" (gris, peso 300, tamanio enorme ~6xl/8xl)
  - "Visual" (rojo primary, peso 300, mismo tamanio)
- Subtitulo debajo: "Diseno estrategico & Social Media Marketing" (gris, peso 400, tracking aumentado)
- Linea decorativa vertical roja a la izquierda del bloque de texto
- Scroll indicator animado en la parte inferior (flecha sutil)

### 3. Seccion "Que hacemos" — Dos columnas
- Layout en grid de 2 columnas (desktop), stack en mobile
- Columna izquierda: numero "01" grande en rojo + titulo "Comunicacion Visual" + descripcion breve
- Columna derecha: numero "02" grande en rojo + titulo "Social Media Marketing" + descripcion breve
- Cada columna con una linea superior roja como acento
- Textos concisos y directos

### 4. Seccion Manifiesto — Cita destacada
- Fondo con una franja sutil de color (muy claro, casi blanco con tinte)
- Texto grande centrado estilo editorial: "No decoramos. Comunicamos."
- Subtexto: "Cada pieza que creamos tiene un proposito estrategico detras."
- Comillas decorativas grandes en rojo como elemento grafico

### 5. Seccion de proceso — Tres pasos horizontales
- Tres bloques en fila (desktop) con numeros grandes "01 02 03"
- Estrategia / Diseno / Impacto
- Cada uno con una linea descriptiva de una oracion
- Separados por lineas verticales finas

### 6. CTA Final
- Texto: "Elevemos tu marca juntos"
- Boton rectangular con borde rojo, texto rojo, hover relleno rojo con texto blanco
- "hola@berrygraphics.com" debajo como link

### 7. Footer
- Linea horizontal fina como separador
- Layout en fila: "Berry Graphics (R)" a la izquierda, "@berrygraphics" al centro, "2026" a la derecha
- Todo en gris, tamanio pequenio

## Animaciones
- Cada seccion usa el hook `useScrollReveal` existente con fade + translateY
- La navegacion cambia de transparente a blanca con sombra sutil al hacer scroll (useState + useEffect con scroll listener)
- Hover en links: transicion suave a --berry-secondary
- Boton CTA: transicion de borde a relleno

## Cambios tecnicos

### Archivos a modificar:
1. **src/pages/Index.tsx** — Reescritura completa con la nueva estructura
2. **src/index.css** — Agregar estilos para la navegacion sticky y smooth scroll

### Sin cambios en:
- Paleta de colores (ya esta configurada correctamente)
- Tipografia (Source Sans 3 ya cargada)
- Dependencias (todo se resuelve con Tailwind + React)

