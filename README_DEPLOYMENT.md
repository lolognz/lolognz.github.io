# Despliegue en GitHub Pages - Instrucciones

## ✅ Problemas solucionados

Este proyecto ya está configurado correctamente para funcionar en GitHub Pages. Los problemas que se solucionaron fueron:

1. **Configuración de Vite**: Se actualizó `base: '/lolognz.github.io/'` en `vite.config.js`
2. **Ubicación de index.html**: Se movió de `public/` a la raíz del proyecto
3. **GitHub Actions**: Se creó workflow automático para despliegue
4. **Paths relativos**: Se corrigieron para funcionar en subdirectorio

## 🚀 Pasos para desplegar

### 1. Configurar GitHub Pages en tu repositorio

1. Ve a tu repositorio en GitHub: `https://github.com/lolognz/lolognz.github.io`
2. Ve a **Settings** → **Pages**
3. En **Source**, selecciona **GitHub Actions**
4. Guarda los cambios

### 2. Hacer push de estos cambios

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

### 3. El despliegue será automático

Una vez que hagas push, GitHub Actions automáticamente:
- Instalará las dependencias (`npm ci`)
- Generará el build (`npm run build`)
- Desplegará el contenido de la carpeta `dist/` a GitHub Pages

### 4. Verificar el despliegue

- Ve a la pestaña **Actions** en tu repositorio para ver el progreso
- Una vez completado, tu sitio estará disponible en: `https://lolognz.github.io`

## 📋 Verificación local

Para probar localmente antes de subir:

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build de producción (genera carpeta dist/)
npm run build

# Previsualizar build local
npm run preview
```

## 🔧 Tecnologías utilizadas

- **React 18** con **Vite 5** - Framework y bundler
- **react-i18next** - Internacionalización (ES/EN)
- **react-intersection-observer** - Animaciones en scroll
- **vanilla-tilt** - Efectos 3D en tarjetas
- **GitHub Actions** - CI/CD automático

## 📁 Estructura de archivos importantes

```
├── index.html                 # Entrada principal (raíz del proyecto)
├── vite.config.js            # Configuración con base: '/lolognz.github.io/'
├── .github/workflows/deploy.yml # Workflow de despliegue automático
├── src/
│   ├── components/           # Componentes React
│   ├── i18n.js              # Configuración de idiomas
│   └── main.jsx             # Punto de entrada React
├── data/
│   ├── es/                  # Datos JSON en español
│   └── en/                  # Datos JSON en inglés
└── dist/                    # Build generado (no incluir en git)
```

## ⚠️ Importante

- La carpeta `dist/` no debe incluirse en el repositorio (ya está en `.gitignore`)
- GitHub Actions se encarga automáticamente de generar y desplegar el contenido
- Los cambios se despliegan automáticamente en cada push a la rama `main`

## 🔄 Para editar contenido

1. Modifica los archivos JSON en `data/es/` y `data/en/`
2. Haz commit y push
3. El sitio se actualizará automáticamente