# Instrucciones de Desarrollo - Web Personal Lolo González

## 🚀 Cómo ejecutar el proyecto en local

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos para ejecutar

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```
   
   Esto iniciará el servidor de desarrollo en `http://localhost:5173`

3. **Generar build para producción:**
   ```bash
   npm run build
   ```
   
   Los archivos optimizados se generarán en la carpeta `dist/`

4. **Preview del build de producción:**
   ```bash
   npm run preview
   ```

## 📁 Estructura del proyecto

```
lolognz.github.io/
├── data/                    # Datos JSON para contenido dinámico
│   ├── es/                 # Contenido en español
│   └── en/                 # Contenido en inglés
├── public/                 # Archivos estáticos
│   └── assets/            # Imágenes, CV, etc.
├── src/
│   ├── components/        # Componentes React
│   ├── i18n.js           # Configuración de internacionalización
│   ├── App.jsx           # Componente principal
│   └── main.jsx          # Punto de entrada
└── package.json
```

## ✏️ Cómo editar contenido

### Cambiar texto e información personal
Edita los archivos JSON en las carpetas `data/es/` y `data/en/`:

- `hero.json` - Información de la sección principal
- `about.json` - Contenido de "Sobre Mí"
- `skills.json` - Habilidades técnicas y niveles
- `projects.json` - Proyectos destacados
- `blog.json` - Configuración del blog (placeholder)
- `contact.json` - Información de contacto

### Cambiar imágenes
- Coloca tus imágenes en `public/assets/images/`
- Actualiza las rutas en los archivos JSON correspondientes

### Cambiar CV
- Reemplaza `public/assets/cv.pdf` con tu CV actualizado

## 🌐 Idiomas

La aplicación soporta español e inglés. El selector de idioma está en la esquina superior derecha.

## 🎨 Personalización

### Colores
Modifica las variables CSS en `src/index.css` en la sección `:root`:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #1e40af;
  --accent-color: #3b82f6;
  /* ... más colores */
}
```

### Componentes
Cada sección es un componente independiente en `src/components/`. Puedes modificarlos según tus necesidades.

## 📱 Responsive Design

La aplicación está optimizada para todos los dispositivos:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🚀 Deploy a GitHub Pages

1. **Generar build:**
   ```bash
   npm run build
   ```

2. **Configurar GitHub Pages:**
   - Ve a Settings → Pages en tu repositorio
   - Selecciona "Deploy from a branch"
   - Escoge la rama donde subas la carpeta `dist/`

3. **Automatización (opcional):**
   Puedes configurar GitHub Actions para auto-deploy cuando hagas push.

## 🔧 Tecnologías utilizadas

- **React 18** - Framework frontend
- **Vite** - Build tool y dev server
- **react-i18next** - Internacionalización
- **react-intersection-observer** - Animaciones en scroll
- **Font Awesome** - Iconos
- **Google Fonts** - Tipografía (Inter)

## 📝 Notas

- Los efectos 3D en las tarjetas de proyectos están implementados con CSS puro
- Las animaciones de scroll se activan cuando el elemento entra en el viewport
- Los datos se cargan dinámicamente según el idioma seleccionado
- El formulario de contacto es un placeholder (necesita backend para funcionar)

¡Tu web personal está lista! 🎉