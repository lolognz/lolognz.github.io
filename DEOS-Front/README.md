# DEOS-Front

Este directorio contendrá el frontend (estático) para comunicarse con la API DEOS. La idea es publicarlo en GitHub Pages como un subdirectorio accesible en `/DEOS-Front/`.

## Publicación en GitHub Pages
- Si GitHub Pages publica desde la raíz del repositorio (`main`): la URL esperada será `https://<usuario>.github.io/<repositorio>/DEOS-Front/`.
- Si GitHub Pages publica desde `/docs`: mueve esta carpeta a `docs/DEOS-Front/` para que se incluya en la publicación.

## Siguientes pasos
- Añadir un punto de entrada (`index.html` o `index.md`) dentro de `DEOS-Front/`.
- Si usas un bundler (Vite/React/etc.):
  - Configura la base del proyecto al subpath: `/<repositorio>/DEOS-Front/`.
  - Genera la build estática dentro de esta carpeta o copia aquí el resultado de `dist/`.
- Asegura CORS y HTTPS en la API objetivo.

## Notas
- Este `README.md` es un punto de partida. Sustitúyelo con las instrucciones del desarrollo y flujo de trabajo que vayas a seguir.