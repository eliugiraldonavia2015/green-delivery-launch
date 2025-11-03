# Sistema de Rutas y Paths en Producción

## Arquitectura Actual del Proyecto

### Estructura de Rutas
```
/ → Feed (App principal)
/homepage → Homepage (Landing page pública)
/auth → Autenticación
/select-role → Selección de rol
/* → NotFound (404)
```

### Configuración de Rutas
El proyecto usa React Router DOM v6 con `BrowserRouter`, que proporciona rutas limpias sin hash (#).

**Archivo**: `src/App.tsx`
```typescript
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Feed />} />
    <Route path="/homepage" element={<Homepage />} />
    // ... más rutas
  </Routes>
</BrowserRouter>
```

## ✅ Solución Implementada: Configuración Universal para Vercel

### Configuración Aplicada

El proyecto está configurado para funcionar consistentemente en desarrollo local y producción en Vercel sin modificaciones en el código.

**1. Configuración de Vite (`vite.config.ts`)**
```typescript
export default defineConfig(({ mode }) => ({
  base: '/', // Path base en raíz para todos los entornos
  // ... resto de configuración
}));
```

**2. Configuración de Vercel (`vercel.json`)**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Cómo Funciona

**En Desarrollo Local:**
- Vite automáticamente maneja el SPA fallback
- Todas las rutas funcionan correctamente al recargar
- No requiere configuración adicional

**En Producción (Vercel):**
- Vercel reescribe todas las rutas a `/index.html`
- React Router procesa las rutas del lado del cliente
- URLs limpias sin hash (#)
- Sin redirecciones visibles para el usuario

### Características

✅ **URLs Profesionales**: Sin hash, completamente limpias
✅ **Comportamiento Idéntico**: Mismo comportamiento en local y producción
✅ **SEO-Friendly**: URLs limpias indexables
✅ **Sin Cambios en Código**: La lógica de enrutamiento permanece intacta
✅ **Recarga Directa**: Funciona correctamente al acceder directamente a cualquier ruta
✅ **Configuración Mínima**: Solo dos archivos de configuración

---

## Problema con GitHub Pages

### ¿Por qué falla en GitHub Pages?

GitHub Pages sirve archivos estáticos y no tiene un servidor que maneje el enrutamiento del lado del servidor. Cuando accedes a `username.github.io/proyecto/about`, GitHub busca literalmente el archivo `/proyecto/about/index.html`, que no existe.

**Síntomas:**
- ✅ La ruta raíz (`/`) funciona
- ❌ Rutas anidadas (`/about`, `/profile`) dan 404 al recargar
- ❌ Links directos a rutas específicas fallan

---

## Soluciones Profesionales para Producción

### Solución 1: HashRouter (Más Simple, 100% Compatible)

**Implementación:**
```typescript
// src/App.tsx
import { HashRouter } from "react-router-dom";

<HashRouter>
  <Routes>
    <Route path="/" element={<Feed />} />
    <Route path="/homepage" element={<Homepage />} />
  </Routes>
</HashRouter>
```

**URLs resultantes:**
```
https://username.github.io/proyecto/#/
https://username.github.io/proyecto/#/homepage
https://username.github.io/proyecto/#/auth
```

**Pros:**
- ✅ Funciona en cualquier servidor estático sin configuración
- ✅ No requiere cambios en el servidor
- ✅ Implementación inmediata (cambiar una línea)

**Contras:**
- ❌ URLs menos estéticas (con #)
- ❌ Peor para SEO (aunque GitHub Pages no indexa bien de todos modos)
- ❌ Menos "profesional" visualmente

**Cuándo usar:** Proyectos internos, MVPs, prototipos, apps sin necesidad de SEO.

---

### Solución 2: BrowserRouter + 404.html Redirect (Recomendada para GitHub Pages)

**Paso 1: Crear `public/404.html`**
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script>
      // GitHub Pages 404 redirect hack
      const path = window.location.pathname;
      const segments = path.split('/').filter(Boolean);
      
      // Si el proyecto está en un subdirectorio (username.github.io/proyecto)
      const base = '/proyecto'; // Cambiar según tu repo
      
      // Extraer la ruta después del base
      const route = segments.slice(1).join('/');
      
      // Redirigir preservando la ruta
      window.location.replace(
        window.location.origin + base + '/#/' + route + window.location.search
      );
    </script>
  </head>
  <body></body>
</html>
```

**Paso 2: Configurar Vite para el base path**
```typescript
// vite.config.ts
export default defineConfig(({ mode }) => ({
  base: process.env.GITHUB_PAGES === 'true' ? '/nombre-repo/' : '/',
  // ... resto de config
}));
```

**Paso 3: Build con variable de entorno**
```json
// package.json
{
  "scripts": {
    "build": "vite build",
    "build:github": "GITHUB_PAGES=true vite build"
  }
}
```

**Pros:**
- ✅ URLs limpias después del primer acceso
- ✅ Funciona en GitHub Pages
- ✅ Mejor UX que HashRouter

**Contras:**
- ❌ Redirección inicial visible
- ❌ Requiere configuración en cada deploy
- ❌ No funciona bien con SEO

---

### Solución 3: SPA Fallback + Custom Domain (Producción Profesional)

**Para GitHub Pages con dominio custom:**

**Paso 1: Configurar `public/_redirects` (para Netlify) o `public/vercel.json`**
```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Paso 2: Usar BrowserRouter con basename dinámico**
```typescript
// src/App.tsx
const basename = import.meta.env.BASE_URL || '/';

<BrowserRouter basename={basename}>
  <Routes>
    <Route path="/" element={<Feed />} />
    <Route path="/homepage" element={<Homepage />} />
  </Routes>
</BrowserRouter>
```

**Paso 3: Configurar Vite correctamente**
```typescript
// vite.config.ts
export default defineConfig({
  base: '/', // Para dominio custom
  // O base: '/repo-name/' para GitHub Pages subdirectory
})
```

**Pros:**
- ✅ URLs completamente limpias
- ✅ SEO-friendly
- ✅ Comportamiento profesional
- ✅ Sin redirecciones visibles

**Contras:**
- ❌ Requiere servidor/plataforma que soporte rewrites
- ❌ No funciona en GitHub Pages sin dominio custom

**Plataformas que lo soportan:**
- Vercel ✅
- Netlify ✅
- Cloudflare Pages ✅
- GitHub Pages con dominio custom ✅
- GitHub Pages sin dominio ❌

---

### Solución 4: Hybrid Approach (Mejor para este proyecto)

**Implementación adaptativa según entorno:**

```typescript
// src/config/router.ts
export const getRouterConfig = () => {
  const isGitHubPages = window.location.hostname.includes('github.io');
  const hasCustomDomain = !isGitHubPages;
  
  return {
    useHash: isGitHubPages && !hasCustomDomain,
    basename: import.meta.env.BASE_URL || '/'
  };
};

// src/App.tsx
import { BrowserRouter, HashRouter } from "react-router-dom";
import { getRouterConfig } from "./config/router";

const App = () => {
  const { useHash, basename } = getRouterConfig();
  const Router = useHash ? HashRouter : BrowserRouter;
  const routerProps = useHash ? {} : { basename };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router {...routerProps}>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/select-role" element={<SelectRole />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
```

**Ventajas de esta solución:**
- ✅ Funciona automáticamente en GitHub Pages (usa Hash)
- ✅ Funciona con URLs limpias en producción con dominio custom
- ✅ No requiere cambios manuales al deployar
- ✅ Una sola configuración para todos los entornos
- ✅ Detecta automáticamente el entorno

---

## Configuración de Assets y Recursos

### Problema con Paths de Assets

Los imports de assets en Vite se manejan automáticamente:

```typescript
// ❌ MAL - Paths absolutos hardcodeados
<img src="/assets/hero.jpg" />

// ✅ BIEN - Import de ES6 (Vite lo procesa)
import heroImage from "@/assets/hero.jpg";
<img src={heroImage} />

// ✅ BIEN - Assets en public/ (para recursos estáticos)
<img src={`${import.meta.env.BASE_URL}images/logo.png`} />
```

### Configurar el Base URL

```typescript
// vite.config.ts
export default defineConfig(({ mode }) => ({
  base: mode === 'production' 
    ? 'https://tu-dominio.com/' // O '/repo-name/' para GitHub Pages
    : '/',
  // ...
}))
```

---

## Recomendación Final para Este Proyecto

### Para GitHub Pages sin dominio custom:
**Usar Solución 4 (Hybrid Approach)** - Proporciona la mejor experiencia adaptándose al entorno.

### Para producción con dominio custom o Vercel/Netlify:
**Usar Solución 3** - URLs completamente limpias con rewrites del servidor.

### Para prototipo rápido:
**Usar Solución 1 (HashRouter)** - Cambiar una línea y funciona en todos lados.

---

## Testing de Rutas en Diferentes Entornos

### Local Development
```bash
npm run dev
# Prueba: http://localhost:8080/
# Prueba: http://localhost:8080/homepage
```

### GitHub Pages Build
```bash
npm run build
npx serve dist -s  # Simula servidor estático
# Prueba navegación y recarga en rutas anidadas
```

### Production con custom domain
```bash
# Deploy a Vercel/Netlify con configuración de rewrites
# Verificar que todas las rutas funcionan con recarga
```

---

## Checklist de Deployment

- [ ] Configurar `base` en vite.config.ts según plataforma
- [ ] Implementar router apropiado (Hash o Browser)
- [ ] Probar navegación entre rutas
- [ ] Probar recarga en rutas anidadas
- [ ] Verificar que assets cargan correctamente
- [ ] Probar en modo incógnito (sin caché)
- [ ] Verificar redirects de autenticación
- [ ] Probar 404 y rutas no existentes

---

## Recursos Adicionales

- [Vite Base Path Configuration](https://vitejs.dev/config/shared-options.html#base)
- [React Router Deployment](https://reactrouter.com/en/main/guides/deployment)
- [GitHub Pages SPA Guide](https://github.com/rafgraph/spa-github-pages)
- [Vercel SPA Configuration](https://vercel.com/docs/concepts/projects/project-configuration#rewrites)
