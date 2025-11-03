# Mapa Completo del Proyecto DeliveryApp

## Estructura General
Este es un proyecto de aplicación web de delivery construido con React, TypeScript, Vite, Tailwind CSS, y Supabase para el backend.

---

## Archivos de Configuración (Raíz)

### `.env`
- **Función**: Variables de entorno del proyecto
- **Contenido**: Credenciales de Supabase (URL, anon key, project ID)
- **Relación**: Usado por `src/integrations/supabase/client.ts`
- **Estado**: Auto-generado, NO editar manualmente

### `package.json`
- **Función**: Gestión de dependencias y scripts del proyecto
- **Relación**: Define todas las librerías usadas en el proyecto
- **Estado**: Solo modificable mediante herramientas de Lovable (no editable directamente)

### `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- **Función**: Configuración de TypeScript para el proyecto
- **Relación**: Define reglas de compilación para todos los archivos `.ts` y `.tsx`
- **Estado**: Solo lectura

### `tailwind.config.ts`
- **Función**: Configuración del sistema de diseño con Tailwind CSS
- **Contenido**: Tokens de diseño, colores HSL, animaciones, themes
- **Relación**: Trabaja con `src/index.css` para definir el sistema de diseño completo
- **Archivos relacionados**: `src/index.css`, todos los componentes que usan clases de Tailwind

### `vite.config.ts`
- **Función**: Configuración del bundler Vite
- **Relación**: Define cómo se construye y sirve la aplicación
- **Archivos relacionados**: `index.html`, `src/main.tsx`

### `postcss.config.js`
- **Función**: Configuración de PostCSS para procesamiento de CSS
- **Relación**: Trabaja con Tailwind CSS

### `eslint.config.js`
- **Función**: Configuración de reglas de linting para JavaScript/TypeScript
- **Relación**: Se aplica a todos los archivos `.js`, `.ts`, `.jsx`, `.tsx`

### `components.json`
- **Función**: Configuración de componentes UI de shadcn
- **Relación**: Define ubicación y estilo de componentes en `src/components/ui/`

### `README.md`
- **Función**: Documentación básica del proyecto
- **Contenido**: Información sobre el stack tecnológico y cómo empezar

### `.gitignore`
- **Función**: Define archivos que Git debe ignorar
- **Estado**: Solo lectura

---

## Directorio `public/`

### `public/favicon.ico`
- **Función**: Icono del sitio web mostrado en el navegador
- **Estado**: Solo lectura

### `public/placeholder.svg`
- **Función**: Imagen placeholder para pruebas
- **Estado**: Solo lectura

### `public/robots.txt`
- **Función**: Instrucciones para bots de búsqueda (SEO)
- **Relación**: Usado por motores de búsqueda

### `public/.nojekyll`
- **Función**: Indica que no se debe usar Jekyll para el deploy
- **Relación**: Configuración de deployment

---

## Directorio `src/`

### `src/main.tsx`
- **Función**: Punto de entrada de la aplicación React
- **Contenido**: Renderiza el componente `App` en el DOM
- **Relación**: 
  - Importa `src/App.tsx`
  - Importa `src/index.css`
  - Referenciado por `index.html`

### `src/App.tsx`
- **Función**: Componente raíz de la aplicación
- **Contenido**: 
  - Configuración de React Query (QueryClient)
  - Configuración de React Router (BrowserRouter, Routes)
  - Providers globales (TooltipProvider, Toaster, Sonner)
- **Rutas definidas**:
  - `/` → Feed (página principal)
  - `/home` → Home (landing page)
  - `/auth` → Auth (autenticación)
  - `/select-role` → SelectRole (selección de rol)
  - `*` → NotFound (404)
- **Relación**: Importa todas las páginas y componentes UI de toast

### `src/index.css`
- **Función**: Estilos globales y tokens de diseño CSS
- **Contenido**: 
  - Variables CSS (colores HSL, gradientes, sombras, animaciones)
  - Configuración de Tailwind (`@layer base`, `@layer components`)
  - Estilos del sistema de diseño
- **Relación**: 
  - Trabaja con `tailwind.config.ts`
  - Importado por `src/main.tsx`
  - Usado por todos los componentes

### `src/App.css`
- **Función**: Estilos específicos del componente App (actualmente mínimo)

### `src/vite-env.d.ts`
- **Función**: Definiciones de tipos para Vite
- **Relación**: Soporte de TypeScript para imports de Vite

---

## Directorio `src/pages/`

### `src/pages/Feed.tsx`
- **Función**: Página principal del feed de videos estilo TikTok
- **Características**:
  - Feed vertical con scroll snap
  - Videos/imágenes de comida
  - Sistema de likes, comentarios, guardados
  - Perfiles de restaurantes
  - Navegación a tienda, mensajes, notificaciones
  - Transiciones animadas entre vistas
- **Estados principales**:
  - `showProfile`, `showMenu`, `showMessages`, `showCheckout`, `showUserProfile`, `showNotifications`, `showShop`
  - Gestión de likes, saves, following
- **Subcomponentes**: `FeedContent` (componente interno)
- **Relación**: 
  - Importa múltiples componentes: `LoadingScreen`, `RestaurantProfile`, `RestaurantMenu`, `RiderRing`, `MessagesLayout`, `CheckoutTimeline`, `UserProfile`, `Notifications`, `CommentOverlay`, `ShareOverlay`, `MusicPlayerOverlay`, `Shop`
  - Usa assets: `src/assets/chef-loading.jpg`
  - Navegación hacia `/home` mediante botón Home

### `src/pages/Home.tsx`
- **Función**: Landing page (página de bienvenida)
- **Contenido**: Secciones informativas del servicio
- **Componentes incluidos**:
  - `Navbar`, `Hero`, `Features`, `HowItWorks`, `AboutUs`, `Join`, `AppDownload`, `Contact`, `More`, `Footer`
- **Relación**: Página estática de marketing

### `src/pages/Auth.tsx`
- **Función**: Página de autenticación (login/signup)
- **Relación**: 
  - Usa `src/hooks/useAuth.tsx`
  - Usa `src/integrations/supabase/client.ts`

### `src/pages/SelectRole.tsx`
- **Función**: Página para seleccionar rol de usuario (cliente/repartidor/restaurante)
- **Relación**: Se accede después del registro

### `src/pages/NotFound.tsx`
- **Función**: Página 404 (página no encontrada)
- **Relación**: Ruta catch-all en `src/App.tsx`

---

## Directorio `src/components/` (Componentes principales)

### `src/components/Navbar.tsx`
- **Función**: Barra de navegación principal para la landing page
- **Características**:
  - Links de navegación
  - Botones de auth (Login/Registro)
  - Menu móvil responsive
- **Relación**: 
  - Usado en `src/pages/Home.tsx`
  - Usa `src/hooks/useAuth.tsx`

### `src/components/Hero.tsx`
- **Función**: Sección hero de la landing page
- **Relación**: Usado en `src/pages/Home.tsx`

### `src/components/Features.tsx`
- **Función**: Sección de características del servicio
- **Relación**: Usado en `src/pages/Home.tsx`

### `src/components/HowItWorks.tsx`
- **Función**: Sección explicativa del funcionamiento
- **Relación**: Usado en `src/pages/Home.tsx`

### `src/components/AboutUs.tsx`
- **Función**: Sección "Acerca de nosotros"
- **Relación**: Usado en `src/pages/Home.tsx`

### `src/components/Join.tsx`
- **Función**: Sección de llamada a la acción para unirse
- **Relación**: Usado en `src/pages/Home.tsx`

### `src/components/AppDownload.tsx`
- **Función**: Sección de descarga de apps móviles
- **Relación**: Usado en `src/pages/Home.tsx`

### `src/components/Contact.tsx`
- **Función**: Sección de contacto
- **Relación**: Usado en `src/pages/Home.tsx`

### `src/components/More.tsx`
- **Función**: Sección adicional de información
- **Relación**: Usado en `src/pages/Home.tsx`

### `src/components/Footer.tsx`
- **Función**: Footer del sitio
- **Relación**: Usado en `src/pages/Home.tsx`

### `src/components/LoadingScreen.tsx`
- **Función**: Pantalla de carga inicial con imagen del chef
- **Relación**: 
  - Usado en `src/pages/Feed.tsx`
  - Usa `src/assets/chef-loading.jpg`

### `src/components/Loading.tsx`
- **Función**: Componente de loading genérico
- **Relación**: Usado en varios componentes

### `src/components/RestaurantProfile.tsx`
- **Función**: Perfil completo de un restaurante
- **Características**:
  - Información del restaurante
  - Galería de fotos
  - Botones de seguir y mensaje
  - Mapa de ubicaciones
- **Relación**: Usado en `src/pages/Feed.tsx`

### `src/components/RestaurantMenu.tsx`
- **Función**: Menú de productos de un restaurante
- **Características**:
  - Lista de categorías y platos
  - Overlay de detalle de producto
  - Carrito de compra
- **Relación**: 
  - Usado en `src/pages/Feed.tsx`
  - Usa `src/components/ProductDetailOverlay.tsx`

### `src/components/ProductDetailOverlay.tsx`
- **Función**: Overlay con detalle de un producto/plato
- **Características**:
  - Imagen del producto
  - Descripción y precio
  - Selector de cantidad
  - Opciones de personalización
  - Botón de añadir al carrito
- **Relación**: Usado en `src/components/RestaurantMenu.tsx`

### `src/components/Shop.tsx`
- **Función**: Vista de tienda/marketplace
- **Características**:
  - Búsqueda de restaurantes
  - Filtros (precio, tiempo, calificación, tipo de comida, distancia)
  - Lista de restaurantes populares
  - Categorías de comida
- **Relación**: Usado en `src/pages/Feed.tsx`

### `src/components/CheckoutTimeline.tsx`
- **Función**: Timeline animado del proceso de pedido
- **Características**:
  - Estados del pedido (preparando, listo, en camino, entregado)
  - Animaciones para cada estado
  - Sistema de calificación al final
  - Botón de reportar problema
- **Estados**: PREPARING, READY_FOR_PICKUP, DELIVERY_PICKED, DELIVERY_ON_ROUTE, DELIVERY_NEAR, DELIVERY_AT_DOOR, DELIVERED_REVIEW
- **Relación**: Usado en `src/pages/Feed.tsx`

### `src/components/RiderRing.tsx`
- **Función**: Componente para el anillo/ring del repartidor
- **Relación**: Usado en `src/pages/Feed.tsx`

### `src/components/MessagesLayout.tsx`
- **Función**: Layout para mensajería/chat
- **Relación**: Usado en `src/pages/Feed.tsx`

### `src/components/UserProfile.tsx`
- **Función**: Perfil del usuario
- **Relación**: Usado en `src/pages/Feed.tsx`

### `src/components/Notifications.tsx`
- **Función**: Lista de notificaciones
- **Relación**: Usado en `src/pages/Feed.tsx`

### `src/components/CommentOverlay.tsx`
- **Función**: Overlay de comentarios para videos/posts
- **Relación**: Usado en `src/pages/Feed.tsx`

### `src/components/ShareOverlay.tsx`
- **Función**: Overlay para compartir contenido
- **Características**:
  - Secciones "Enviar a", "Compartir en", "Más opciones"
  - Scrollable horizontalmente
- **Relación**: Usado en `src/pages/Feed.tsx`

### `src/components/MusicPlayerOverlay.tsx`
- **Función**: Overlay del reproductor de música
- **Relación**: Usado en `src/pages/Feed.tsx`

### `src/components/LocationDropdown.tsx`
- **Función**: Dropdown para seleccionar ubicación
- **Relación**: Usado en varios componentes

### `src/components/PhotoMosaic.tsx`
- **Función**: Mosaico de fotos
- **Relación**: Usado en perfiles

### `src/components/Settings.tsx`
- **Función**: Pantalla principal de configuración
- **Relación**: Importa componentes de `src/components/settings/`

---

## Directorio `src/components/settings/`

### `src/components/settings/AccountSettings.tsx`
- **Función**: Configuración de cuenta
- **Relación**: Usado en `src/components/Settings.tsx`

### `src/components/settings/NotificationSettings.tsx`
- **Función**: Configuración de notificaciones
- **Relación**: Usado en `src/components/Settings.tsx`

### `src/components/settings/PaymentSettings.tsx`
- **Función**: Configuración de métodos de pago
- **Relación**: Usado en `src/components/Settings.tsx`

### `src/components/settings/PrivacySettings.tsx`
- **Función**: Configuración de privacidad
- **Relación**: Usado en `src/components/Settings.tsx`

### `src/components/settings/SecuritySettings.tsx`
- **Función**: Configuración de seguridad
- **Relación**: Usado en `src/components/Settings.tsx`

### `src/components/settings/LanguageSettings.tsx`
- **Función**: Configuración de idioma
- **Relación**: Usado en `src/components/Settings.tsx`

### `src/components/settings/HelpSettings.tsx`
- **Función**: Centro de ayuda y soporte
- **Relación**: Usado en `src/components/Settings.tsx`

---

## Directorio `src/components/ui/` (Componentes UI de shadcn)

Todos estos componentes son de la librería shadcn/ui, personalizables y reutilizables:

### `src/components/ui/button.tsx`
- **Función**: Componente Button con variantes (default, destructive, outline, secondary, ghost, link)
- **Relación**: Usado en TODOS los componentes que necesitan botones

### `src/components/ui/card.tsx`
- **Función**: Componentes Card, CardHeader, CardContent, CardFooter
- **Relación**: Usado para contenedores de información

### `src/components/ui/dialog.tsx`
- **Función**: Componente Dialog/Modal
- **Relación**: Usado para overlays y modales

### `src/components/ui/sheet.tsx`
- **Función**: Componente Sheet (panel lateral deslizante)
- **Relación**: Usado en `src/components/Shop.tsx` y otros

### `src/components/ui/input.tsx`
- **Función**: Input de texto
- **Relación**: Usado en formularios

### `src/components/ui/label.tsx`
- **Función**: Label para inputs
- **Relación**: Usado con inputs

### `src/components/ui/select.tsx`
- **Función**: Select/dropdown personalizado
- **Relación**: Usado para selecciones

### `src/components/ui/slider.tsx`
- **Función**: Slider para rangos numéricos
- **Relación**: Usado en `src/components/Shop.tsx` para filtros

### `src/components/ui/scroll-area.tsx`
- **Función**: Área con scroll personalizado
- **Relación**: Usado en listas largas

### `src/components/ui/separator.tsx`
- **Función**: Separador visual
- **Relación**: Usado para dividir secciones

### `src/components/ui/avatar.tsx`
- **Función**: Avatar de usuario/restaurante
- **Relación**: Usado en perfiles

### `src/components/ui/badge.tsx`
- **Función**: Badge/etiqueta
- **Relación**: Usado para tags y labels

### `src/components/ui/toast.tsx` y `src/components/ui/toaster.tsx`
- **Función**: Sistema de notificaciones toast
- **Relación**: Usado en `src/App.tsx`, notificaciones globales

### `src/components/ui/use-toast.ts`
- **Función**: Hook personalizado para usar toast
- **Relación**: Usado en componentes que necesitan mostrar notificaciones

### `src/components/ui/sonner.tsx`
- **Función**: Librería alternativa de toast (Sonner)
- **Relación**: Usado en `src/App.tsx`

### `src/components/ui/tooltip.tsx`
- **Función**: Tooltip/información al hover
- **Relación**: Usado para ayuda contextual

### `src/components/ui/dropdown-menu.tsx`
- **Función**: Menu dropdown
- **Relación**: Usado en navegación y acciones

### `src/components/ui/accordion.tsx`
- **Función**: Acordeón expandible
- **Relación**: Usado en FAQs y secciones colapsables

### `src/components/ui/alert.tsx` y `src/components/ui/alert-dialog.tsx`
- **Función**: Alertas y diálogos de confirmación
- **Relación**: Usado para mensajes importantes

### `src/components/ui/aspect-ratio.tsx`
- **Función**: Mantener aspect ratio de imágenes
- **Relación**: Usado en galerías

### `src/components/ui/breadcrumb.tsx`
- **Función**: Navegación breadcrumb
- **Relación**: Usado en navegación jerárquica

### `src/components/ui/calendar.tsx`
- **Función**: Calendario
- **Relación**: Usado en selección de fechas

### `src/components/ui/carousel.tsx`
- **Función**: Carrusel de contenido
- **Relación**: Usado en galerías

### `src/components/ui/chart.tsx`
- **Función**: Componentes de gráficos
- **Relación**: Usado para visualización de datos

### `src/components/ui/checkbox.tsx`
- **Función**: Checkbox
- **Relación**: Usado en formularios

### `src/components/ui/collapsible.tsx`
- **Función**: Contenido colapsable
- **Relación**: Usado en secciones expandibles

### `src/components/ui/command.tsx`
- **Función**: Command palette
- **Relación**: Usado para búsqueda de comandos

### `src/components/ui/context-menu.tsx`
- **Función**: Menu contextual (clic derecho)
- **Relación**: Usado en acciones contextuales

### `src/components/ui/drawer.tsx`
- **Función**: Drawer deslizante (móvil)
- **Relación**: Usado en interfaces móviles

### `src/components/ui/form.tsx`
- **Función**: Sistema de formularios con react-hook-form
- **Relación**: Usado en todos los formularios

### `src/components/ui/hover-card.tsx`
- **Función**: Card que aparece al hover
- **Relación**: Usado para información adicional

### `src/components/ui/input-otp.tsx`
- **Función**: Input de código OTP
- **Relación**: Usado en autenticación

### `src/components/ui/menubar.tsx`
- **Función**: Barra de menú
- **Relación**: Usado en navegación

### `src/components/ui/navigation-menu.tsx`
- **Función**: Menú de navegación complejo
- **Relación**: Usado en navegación principal

### `src/components/ui/pagination.tsx`
- **Función**: Paginación de listas
- **Relación**: Usado en listas largas

### `src/components/ui/popover.tsx`
- **Función**: Popover (pequeño overlay)
- **Relación**: Usado para información contextual

### `src/components/ui/progress.tsx`
- **Función**: Barra de progreso
- **Relación**: Usado en `src/components/CheckoutTimeline.tsx`

### `src/components/ui/radio-group.tsx`
- **Función**: Grupo de radio buttons
- **Relación**: Usado en formularios de selección única

### `src/components/ui/resizable.tsx`
- **Función**: Paneles redimensionables
- **Relación**: Usado en layouts complejos

### `src/components/ui/sidebar.tsx`
- **Función**: Sidebar/barra lateral
- **Relación**: Usado en navegación

### `src/components/ui/skeleton.tsx`
- **Función**: Placeholder de carga (skeleton)
- **Relación**: Usado mientras carga contenido

### `src/components/ui/switch.tsx`
- **Función**: Switch toggle
- **Relación**: Usado en configuración

### `src/components/ui/table.tsx`
- **Función**: Tabla de datos
- **Relación**: Usado para mostrar datos tabulares

### `src/components/ui/tabs.tsx`
- **Función**: Sistema de tabs/pestañas
- **Relación**: Usado en `src/pages/Feed.tsx` ("Siguiendo" / "Para Ti")

### `src/components/ui/textarea.tsx`
- **Función**: Textarea para texto largo
- **Relación**: Usado en formularios

### `src/components/ui/toggle.tsx` y `src/components/ui/toggle-group.tsx`
- **Función**: Toggle buttons
- **Relación**: Usado para opciones on/off

---

## Directorio `src/hooks/`

### `src/hooks/useAuth.tsx`
- **Función**: Hook personalizado para autenticación
- **Características**:
  - Estado de usuario y sesión
  - Funciones `signUp`, `signIn`, `signOut`
  - Listener de cambios de auth
- **Relación**: 
  - Usado en `src/components/Navbar.tsx`, `src/pages/Auth.tsx`
  - Usa `src/integrations/supabase/client.ts`

### `src/hooks/use-mobile.tsx`
- **Función**: Hook para detectar si es móvil
- **Relación**: Usado en componentes responsive

### `src/hooks/use-toast.ts`
- **Función**: Hook para sistema de toast
- **Relación**: Usado para notificaciones

---

## Directorio `src/integrations/supabase/`

### `src/integrations/supabase/client.ts`
- **Función**: Cliente de Supabase
- **Contenido**: Inicialización del cliente con URL y anon key
- **Relación**: 
  - Usa variables de `.env`
  - Usado en `src/hooks/useAuth.tsx` y otros componentes que necesiten backend
- **Estado**: Auto-generado, NO editar

### `src/integrations/supabase/types.ts`
- **Función**: Tipos TypeScript generados desde la base de datos Supabase
- **Relación**: Usado para tipado fuerte en toda la app
- **Estado**: Auto-generado, NO editar

---

## Directorio `src/lib/`

### `src/lib/utils.ts`
- **Función**: Utilidades generales
- **Contenido**: Función `cn()` para combinar clases CSS (clsx + tailwind-merge)
- **Relación**: Usado en TODOS los componentes UI

---

## Directorio `src/assets/`

### `src/assets/chef-loading.jpg`
- **Función**: Imagen del chef para pantalla de carga
- **Relación**: Usado en `src/components/LoadingScreen.tsx`

### `src/assets/hero-delivery.jpg`
- **Función**: Imagen hero para la landing page
- **Relación**: Usado en `src/components/Hero.tsx`

---

## Directorio `supabase/`

### `supabase/config.toml`
- **Función**: Configuración del proyecto Supabase
- **Relación**: Configuración del backend
- **Estado**: Auto-generado, NO editar

### `supabase/migrations/`
- **Función**: Migraciones de base de datos
- **Contenido**: Archivos SQL para crear/modificar tablas
- **Estado**: Solo lectura (se generan automáticamente)

---

## Archivo `index.html`

- **Función**: HTML base de la aplicación SPA
- **Contenido**: 
  - Meta tags (viewport, charset)
  - Link al favicon
  - Script de entrada a `src/main.tsx`
- **Relación**: Punto de entrada del navegador

---

## Resumen de Flujos Principales

### Flujo de Autenticación
1. Usuario visita `/auth` → `src/pages/Auth.tsx`
2. Usa `src/hooks/useAuth.tsx` para login/registro
3. `useAuth` usa `src/integrations/supabase/client.ts` para comunicarse con Supabase
4. Después de auth exitosa → redirige a `/select-role` o `/`

### Flujo de Feed Principal
1. Usuario en `/` → `src/pages/Feed.tsx`
2. Muestra videos en scroll vertical
3. Puede:
   - Ver perfil de restaurante → `src/components/RestaurantProfile.tsx`
   - Ver menú → `src/components/RestaurantMenu.tsx` → `src/components/ProductDetailOverlay.tsx`
   - Ir a tienda → `src/components/Shop.tsx`
   - Ver mensajes → `src/components/MessagesLayout.tsx`
   - Hacer checkout → `src/components/CheckoutTimeline.tsx`
   - Ver notificaciones → `src/components/Notifications.tsx`
   - Comentar → `src/components/CommentOverlay.tsx`
   - Compartir → `src/components/ShareOverlay.tsx`
   - Ver perfil propio → `src/components/UserProfile.tsx`
4. Botón Home → navega a `/home` (landing page)

### Flujo de Compra
1. Desde Feed → ver restaurante
2. Ver menú → seleccionar plato
3. ProductDetailOverlay → añadir a carrito
4. Checkout → CheckoutTimeline (animación del pedido)
5. Al completar → vuelve a Feed

---

## Notas Importantes

- **Sistema de Diseño**: Todo se basa en `src/index.css` + `tailwind.config.ts`. NUNCA usar colores directos como `text-white`, `bg-black`, siempre usar tokens semánticos.
- **Componentes UI**: Todos los componentes de `src/components/ui/` son de shadcn y personalizables.
- **Backend**: Supabase está integrado automáticamente, NO modificar archivos en `src/integrations/supabase/`.
- **Rutas**: Definidas en `src/App.tsx`, agregar nuevas rutas allí.
- **Estado Global**: Principalmente manejado con React Query (`@tanstack/react-query`).
- **Animaciones**: Se usa `framer-motion` extensivamente en Feed y transiciones.

---

**Última actualización**: 2025-11-03
**Versión del proyecto**: 1.0.0