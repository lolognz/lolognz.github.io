# Portfolio Personal de Lolo González

Una página web personal moderna y minimalista desarrollada con **React + Vite**, optimizada para **GitHub Pages**. La página presenta mi trayectoria como Ingeniero de Software Backend de forma dinámica e interactiva.

🌐 **Sitio web**: [https://lolognz.github.io](https://lolognz.github.io)

---

## 📋 ¿Qué encontrarás en esta web?

La página está estructurada como una **single-page application** con las siguientes secciones:

### 🏠 **Hero Section**
- Presentación principal con nombre y título profesional
- Selector de idioma (Español/Inglés)
- Enlaces a redes sociales (LinkedIn, GitHub)
- Botones de descarga de CV y navegación

### 👨‍💻 **About Me**
- Descripción de mi trayectoria profesional
- Experiencia en investigación universitaria, videojuegos educativos, VR y backend

### 🛠️ **Skills**
- Gráfico de barras interactivo con mis competencias técnicas
- Niveles del 0 al 10 para cada tecnología/habilidad

### 🚀 **Proyectos Destacados**
- Tarjetas 3D giratorias con efectos visuales
- Descripción de proyectos más relevantes
- Enlaces a GitHub y demos

### 📝 **Blog** 
- Sección preparada para futuros artículos y tutoriales
- Actualmente como placeholder

### 📧 **Contacto**
- Formulario de contacto funcional
- Enlaces directos de contacto

---

## 🚀 Despliegue en Local

### Requisitos previos
- Node.js (versión 18 o superior)
- npm

### Instrucciones

```bash
# 1. Clonar el repositorio
git clone https://github.com/lolognz/lolognz.github.io.git
cd lolognz.github.io

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:5173/
```

### Comandos disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Previsualizar build local
npm run lint     # Verificar código
```

---

## ✏️ Cómo editar el contenido

### 📁 Estructura de contenido

Todo el contenido de la página se gestiona a través de archivos JSON en la carpeta `data/`:

```
data/
├── es/                 # Contenido en español
│   ├── hero.json      # Sección principal
│   ├── about.json     # Sobre mí
│   ├── skills.json    # Habilidades
│   ├── projects.json  # Proyectos
│   ├── blog.json      # Blog
│   └── contact.json   # Contacto
└── en/                # Contenido en inglés
    ├── hero.json      # (misma estructura)
    ├── about.json
    ├── skills.json
    ├── projects.json
    ├── blog.json
    └── contact.json
```

### 🔧 Cómo hacer cambios

1. **Editar información personal**: Modifica `data/es/hero.json` y `data/en/hero.json`
2. **Actualizar habilidades**: Edita `data/es/skills.json` y `data/en/skills.json`
3. **Agregar proyectos**: Modifica `data/es/projects.json` y `data/en/projects.json`
4. **Cambiar información de contacto**: Edita `data/es/contact.json` y `data/en/contact.json`

### 📄 Ejemplo de edición - Hero Section

```json
{
  "name": "Tu Nombre",
  "title": "Tu Título Profesional",
  "subtitle": "Tu especialización",
  "description": "Descripción personal",
  "social": [
    {
      "name": "LinkedIn",
      "icon": "linkedin",
      "url": "https://linkedin.com/in/tuperfil"
    }
  ],
  "ctas": [
    {
      "text": "Descargar CV",
      "url": "/assets/cv.pdf",
      "type": "primary"
    }
  ]
}
```

### 📎 Subir archivos (CV, imágenes, etc.)

- **CV**: Coloca tu archivo PDF en `public/assets/cv.pdf`
- **Imágenes**: Agrega imágenes en `public/assets/images/`
- **Iconos**: Coloca iconos SVG en `public/assets/svg/`

---

## 🚀 Despliegue automático en GitHub Pages

### ✅ Configuración actual

La página está configurada para **despliegue automático**:

- Cada `git push` a la rama `main` activa el despliegue
- GitHub Actions genera automáticamente el build
- Se publica en `https://lolognz.github.io`

### 🔄 Flujo de trabajo

1. Edita los archivos JSON o sube nuevos assets
2. Haz commit y push:
   ```bash
   git add .
   git commit -m "Actualizar contenido"
   git push origin main
   ```
3. GitHub Actions se encarga del resto automáticamente
4. En ~2-3 minutos, los cambios están en vivo

### 📊 Verificar despliegue

- Ve a la pestaña **Actions** en GitHub para ver el progreso
- Una vez completado, los cambios están en: `https://lolognz.github.io`

---

## 🛠️ Tecnologías utilizadas

- **Frontend**: React 18 + Vite 5
- **Internacionalización**: react-i18next (ES/EN)
- **Animaciones**: react-intersection-observer
- **Efectos 3D**: vanilla-tilt.js
- **CI/CD**: GitHub Actions
- **Hosting**: GitHub Pages (gratuito)

---

## 📞 Soporte

Si necesitas ayuda con la página:

1. 📧 **Email**: [contacto desde la web](https://lolognz.github.io)
2. 💻 **GitHub Issues**: Para problemas técnicos
3. 🔗 **LinkedIn**: [Mi perfil](https://linkedin.com/in/lologonzalez)

---

**¡Listo para personalizar tu portfolio!** 🎉
