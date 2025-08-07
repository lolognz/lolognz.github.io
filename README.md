# Web Personal de Lolo González

Este repositorio contiene el esqueleto de tu página web personal de una sola página (one‑page scroll), publicada en GitHub Pages, desarrollada con **React + Vite**. La página carga su contenido dinámicamente a partir de archivos JSON para que puedas editar la información sin tocar código.

---

## 1. Descripción del proyecto

**Objetivo**: Crear una web personal minimalista y techy que muestre tu trayectoria como ingeniero de software backend.

**Secciones principales**:

* **Hero**: nombre, título profesional, selector de idioma, enlaces a LinkedIn y GitHub, botones de descarga de CV y scroll a Proyectos.
* **About Me**: breve texto de tu carrera (investigación universitaria, videojuegos educativos, VR, backend Java/Spring).
* **Descarga de CV**: botón para descargar PDF.
* **Skills**: gráfico de barras (0–10) con tus competencias.
* **Proyectos Destacados**: tarjetas 3D giratorias con imagen, título y descripción breve.
* **Blog** (placeholder): espacio para futuros artículos/tutoriales.
* **Contacto**: formulario sencillo (Formspree o similar) y enlaces de contacto.
* **Footer**: navegación rápida y copyright.

---

## 2. Tecnologías y librerías

* **Framework**: React con Vite.
* **i18n**: `react-i18next` para internacionalización (ES/EN).
* **Fetch**: API nativa para cargar JSON según el idioma seleccionado.
* **Animaciones en scroll**: `react-intersection-observer` o hook propio.
* **Rotación de tarjetas**: [vanilla-tilt.js](https://github.com/micku7zu/vanilla-tilt.js) integrado en componentes.

**Ventajas de React + Vite**:

* Arranque y recarga ultrarrápida.
* Estructura en componentes clara y mantenible.
* Fácil integración de futuras secciones (blog con MDX, dark mode, etc.).

---

## 3. Estructura de carpetas

```bash
repo-root/
├── data/
│   ├── en/             # JSON en inglés
│   │   ├── hero.json
│   │   ├── about.json
│   │   ├── cv.json
│   │   ├── skills.json
│   │   ├── projects.json
│   │   ├── blog.json   # placeholder inicial
│   │   └── contact.json
│   └── es/             # JSON en español
│       ├── hero.json
│       ├── about.json
│       ├── cv.json
│       ├── skills.json
│       ├── projects.json
│       ├── blog.json   # placeholder inicial
│       └── contact.json
├── public/
│   └── assets/
│       ├── images/
│       ├── svg/
│       └── cv.pdf
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── CVDownload.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Blog.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── i18n.js        # configuración react-i18next
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
└── README.md
```

---

## 4. Internacionalización (ES/EN)

1. Instala y configura `react-i18next` en `src/i18n.js`.
2. Agrupa las rutas de los JSON en namespaces: `common`, `hero`, `about`, etc.
3. En cada componente, usa el hook `useTranslation()` para acceder a `t('hero.name')`, etc.
4. Incluye un selector de idioma en `Hero.jsx` que cambie entre `es` y `en` y actualice la tienda de i18n.

---

## 5. Ejemplos de JSON (data/es/hero.json y data/en/hero.json)

```json
{
  "hero": {
    "name": "Lolo González",
    "title": "Ingeniero de Software Backend",
    "social": [
      { "name": "LinkedIn", "icon": "linkedin.svg", "url": "https://linkedin.com/in/lologonzalez" },
      { "name": "GitHub",   "icon": "github.svg",   "url": "https://github.com/lologonzalez" }
    ],
    "ctas": [
      { "text": "Descargar CV", "url": "/assets/cv/LoloGonzalez_CV.pdf" },
      { "text": "Ver Proyectos", "scrollTo": "projects" }
    ]
  }
}
```

---

## 6. Instalación y despliegue

```bash
# Clonar el repositorio:
git clone https://github.com/tu-usuario/tu-web-personal.git
cd tu-web-personal
# Instalar dependencias:
npm install
# Desarrollo:
npm run dev
# Generar build estático:
npm run build
# Desplegar en GitHub Pages:
# - Configura en Settings → Pages apuntando a la carpeta `dist/` o branch `gh-pages`.
```

---

## 7. Uso y edición de contenido

1. Edita los JSON en `data/es/` y `data/en/`.
2. Añade o reemplaza imágenes y PDF en `public/assets`.
3. Modifica o añade componentes en `src/components` según necesites.

---

## 8. Roadmap

| Tarea                            | Estado      |
| -------------------------------- | ----------- |
| Setup React + Vite               | ✅ Completo  |
| Configuración i18n               | ✅ Completo  |
| Componentes básicos (Hero, etc.) | ✅ Completo  |
| Skills con gráfico de barras     | ✅ Completo  |
| Proyectos giratorios             | ✅ Completo  |
| Blog (placeholder)               | ✅ Completo  |
| Formulario de contacto           | ⬜ Pendiente |
| Dark Mode                        | ⬜ Pendiente |
| Tests y CI                       | ⬜ Pendiente |

---

¡Listo para codificar tu web personal con React + Vite! 🎉
