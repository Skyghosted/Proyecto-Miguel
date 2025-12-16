# Tienda Demo — Miguel

Pequeña tienda demo creada con React + Vite.

## Requisitos
- Node.js (recomendado LTS 18 o 20)
- npm (incluido con Node)

## Instalación y ejecución
```bash
cd /c/Users/rober/Desktop/OpenWebinars/web/Proyecto-Miguel
npm install
npm run dev
# abrir http://localhost:5173
```

## Qué implementé (mapa a criterios)
- Creatividad: UI simple con subida de imagen para crear productos y diseño moderno.
- Organización del contenido: componentes separados en `src/components`, datos en `src/data`.
- Funcionalidad: añadir/eliminar productos, carrito con simulación de checkout, búsqueda y ordenado
- Responsive: diseño de grid y modal adaptativos (media queries en `src/styles.css`).
- JavaScript: lógica de carrito, localStorage para persistencia, funciones en `src/App.jsx`.
- Base de datos / datos: productos iniciales en `src/data/products.js` y persistencia local con `localStorage`.
- Git: usa un repositorio; recuerda ignorar `node_modules` y `package-lock.json` en `.gitignore`.

## Nota sobre dependencias
Actualicé `package.json` para usar `vite@4.x` y resolver un conflicto de peer deps con `@vitejs/plugin-react`.

Si quieres, puedo:
- Ejecutar `npm audit fix` para intentar arreglar vulnerabilidades.
- Añadir más filtros (categoría, rango de precio) o integración real con backend.
- Crear `.gitignore` si no existe.
