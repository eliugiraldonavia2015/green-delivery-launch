# 📱 Documentación Completa de Flujos - FOODTOOK App

## Índice de Flujos
1. [Flow de Inicio de la Aplicación](#1-flow-de-inicio-de-la-aplicación)
2. [Flow de Onboarding](#2-flow-de-onboarding)
3. [Flow de Autenticación](#3-flow-de-autenticación)
4. [Flow Principal del Feed](#4-flow-principal-del-feed)
5. [Flow "Eat Now"](#5-flow-eat-now)
6. [Flow de Shop/Carrito](#6-flow-de-shopcarrito)
7. [Flow de Perfil de Restaurante](#7-flow-de-perfil-de-restaurante)
8. [Flow de Menú de Restaurante](#8-flow-de-menú-de-restaurante)
9. [Flow de Checkout](#9-flow-de-checkout)
10. [Flow de Mensajes](#10-flow-de-mensajes)
11. [Flow de Notificaciones](#11-flow-de-notificaciones)
12. [Flow de Perfil de Usuario](#12-flow-de-perfil-de-usuario)
13. [Flow de Homepage](#13-flow-de-homepage)
14. [Flow de Selección de Rol](#14-flow-de-selección-de-rol)
15. [Flows de Interacción Social](#15-flows-de-interacción-social)

---

## 1. Flow de Inicio de la Aplicación

**Descripción:** Primer contacto del usuario con la aplicación. Pantalla de carga con animaciones mientras se inicializan los módulos.

### Archivos Activados:
- `src/App.tsx` - Gestiona el estado inicial (`currentFlow: "loading"`)
- `src/components/LoadingScreen.tsx` - Renderiza la pantalla de carga

### Flujo Visual:
```
┌─────────────────────────────────────┐
│   🎯 INICIO DE LA APLICACIÓN        │
└─────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│   🔄 LOADING SCREEN                 │
│   --------------------------------  │
│   • Animación geométrica circular   │
│   • Progreso: 0% → 100%            │
│   • Estados:                        │
│     - Inicializando módulos (20%)  │
│     - Cargando recomendaciones (40%)│
│     - Preparando experiencia (60%)  │
│     - Activando seguridad (80%)    │
│     - ¡Listo! (100%)               │
│   • Duración: ~1.45 segundos       │
└─────────────────────────────────────┘
                  │
                  ▼
        handleLoadingComplete()
                  │
                  ▼
    setCurrentFlow("onboarding")
                  │
                  ▼
        [ONBOARDING FLOW] ─────────►
```

### Detalles Técnicos:
- **Duración total:** ~1.45 segundos
- **Animaciones:** Anillos rotatorios con gradientes primary/accent
- **Transición:** Fade out (0.45s) al completar
- **Trigger:** `onReady()` callback

---

## 2. Flow de Onboarding

**Descripción:** Introducción a las características principales de la app mediante 4 slides deslizables.

### Archivos Activados:
- `src/App.tsx` - Gestiona estado (`currentFlow: "onboarding"`)
- `src/pages/Onboarding.tsx` - Componente principal de onboarding

### Flujo Visual:
```
┌─────────────────────────────────────┐
│   📖 ONBOARDING (SLIDE 1/4)         │
│   --------------------------------  │
│   [Imagen: Restaurantes]            │
│   🛍️ "Descubre restaurantes        │
│       increíbles"                   │
│                                     │
│   • Explora miles de opciones       │
│   • Desde tacos hasta sushi         │
│                                     │
│   [Saltar] ──────────► [Auth Flow] │
│   ●○○○ [Siguiente →]               │
└─────────────────────────────────────┘
                  │ swipe/click
                  ▼
┌─────────────────────────────────────┐
│   📖 ONBOARDING (SLIDE 2/4)         │
│   --------------------------------  │
│   [Imagen: Videos de comida]        │
│   ✨ "Videos que inspiran"          │
│                                     │
│   • Mira videos cortos              │
│   • Desliza y explora               │
│                                     │
│   [Saltar] ──────────► [Auth Flow] │
│   ○●○○ [Siguiente →]               │
└─────────────────────────────────────┘
                  │ swipe/click
                  ▼
┌─────────────────────────────────────┐
│   📖 ONBOARDING (SLIDE 3/4)         │
│   --------------------------------  │
│   [Imagen: Delivery]                │
│   🚚 "Entrega rápida y segura"      │
│                                     │
│   • Rastreo en tiempo real          │
│   • Desde el restaurante a tu puerta│
│                                     │
│   [Saltar] ──────────► [Auth Flow] │
│   ○○●○ [Siguiente →]               │
└─────────────────────────────────────┘
                  │ swipe/click
                  ▼
┌─────────────────────────────────────┐
│   📖 ONBOARDING (SLIDE 4/4)         │
│   --------------------------------  │
│   [Imagen: Experiencia única]       │
│   ⭐ "Experiencia única"            │
│                                     │
│   • Chatea con restaurantes         │
│   • Guarda favoritos                │
│   • Ofertas exclusivas              │
│                                     │
│   ○○○● [Comenzar →]                │
└─────────────────────────────────────┘
                  │ click "Comenzar"
                  ▼
        handleOnboardingComplete()
                  │
                  ▼
        setCurrentFlow("auth")
                  │
                  ▼
          [AUTH FLOW] ─────────►
```

### Detalles Técnicos:
- **Navegación:** Swipe horizontal, botones, o dots clicables
- **Animaciones:** Framer Motion con drag & pan
- **Skip:** Disponible en cualquier slide (excepto el último)
- **Transición entre slides:** Spring animation (300ms)

---

## 3. Flow de Autenticación

**Descripción:** Sistema de login y registro con múltiples opciones de autenticación.

### Archivos Activados:
- `src/App.tsx` - Gestiona estado (`currentFlow: "auth"`)
- `src/pages/Auth.tsx` - Componente principal de autenticación
- `src/hooks/useAuth.tsx` - Hook de autenticación (lógica)
- `src/assets/delivery-rider-auth.jpg` - Imagen del repartidor

### Flujo Visual:
```
┌─────────────────────────────────────┐
│   🔐 LOGIN SCREEN                   │
│   --------------------------------  │
│          FOODTOOK                   │
│      (texto verde primary)          │
│                                     │
│   [📷 Imagen Repartidor Grande]     │
│                                     │
│   👤 [Usuario o Email_______]       │
│   🔒 [Contraseña___________]        │
│                                     │
│   ☑️ Recuérdame    ¿Olvidaste?     │
│                                     │
│   [    ENTRAR    ]                  │
│   (botón verde con gradiente)       │
│                                     │
│   ¿No tienes cuenta? Regístrate     │
│       aquí ──────────► [Signup]    │
└─────────────────────────────────────┘
                  │ click "Entrar"
                  ▼
          Validación con Zod
                  │
                  ▼
         handleSubmit() success
                  │
                  ▼
        handleAuthComplete()
                  │
                  ▼
        setCurrentFlow("app")
                  │
                  ▼
    [FEED PRINCIPAL] ─────────►

┌─────────────────────────────────────┐
│   📝 SIGNUP SCREEN                  │
│   --------------------------------  │
│          FOODTOOK                   │
│      (texto verde primary)          │
│                                     │
│   👤 [Nombre Completo_______]       │
│   ✉️ [Email_________________]       │
│   🔒 [Contraseña____________]       │
│                                     │
│   [    CREAR CUENTA    ]            │
│   (botón verde con gradiente)       │
│                                     │
│   ────── o continúa con ──────     │
│                                     │
│   [🌐] [✉️] [📱]                   │
│  Google Email  Tel                  │
│  (botones cuadrados redondeados)    │
│                                     │
│   ¿Ya tienes cuenta? Inicia sesión  │
│       ◄────────── [Login]          │
└─────────────────────────────────────┘
                  │
                  ▼
    (mismo flujo que Login)
```

### Detalles Técnicos:
- **Validación:** Zod schema (email, password min 6 chars, fullName min 2 chars)
- **Estados:** `login` | `signup`
- **Animaciones:** Fade in/out entre vistas
- **Opciones sociales:** Google, Email, Teléfono (simuladas)
- **Remember me:** Checkbox funcional (estado local)

---

## 4. Flow Principal del Feed

**Descripción:** Pantalla principal tipo TikTok con videos de comida en scroll vertical.

### Archivos Activados:
- `src/App.tsx` - Router con ruta `/`
- `src/pages/Feed.tsx` - Componente principal (986 líneas)
- `src/components/RiderRing.tsx` - Anillo animado del repartidor
- `src/components/CommentOverlay.tsx` - Overlay de comentarios
- `src/components/ShareOverlay.tsx` - Overlay para compartir
- `src/components/MusicPlayerOverlay.tsx` - Overlay de música

### Flujo Visual:
```
┌─────────────────────────────────────┐
│  📱 FEED PRINCIPAL                  │
│  ─────────────────────────────────  │
│  ┌────────────────────────────────┐ │
│  │ [Siguiendo] [Para Ti] ←Top Nav│ │
│  └────────────────────────────────┘ │
│                                     │
│  ┌────────────────────────────────┐ │
│  │                                │ │
│  │   [Video/Imagen de Comida]     │ │
│  │        (Fondo completo)        │ │
│  │                                │ │
│  │  @username [Seguir]            │ │
│  │  Descripción del platillo...   │ │
│  │  🎵 Música original            │ │
│  │                                │ │
│  │                        🔥 Eat  │ │
│  │                        ❤️ 12.5K│ │
│  │                        💬 340  │ │
│  │                        🔖      │ │
│  │                        📤      │ │
│  │                        🎵 (gif)│ │
│  └────────────────────────────────┘ │
│                                     │
│  ┌────────────────────────────────┐ │
│  │ [🏠] [🔔] [🛒] [💬] [👤]      │ │
│  │ Inicio Notif Cart Msg Perfil  │ │
│  └────────────────────────────────┘ │
└─────────────────────────────────────┘
           │
           ├─► 🔥 Eat Now ────────► [FLOW 5: Menu]
           │
           ├─► ❤️ Like ───────────► Animación corazón
           │
           ├─► 💬 Comentarios ────► CommentOverlay
           │
           ├─► 🔖 Guardar ────────► Animación guardar
           │
           ├─► 📤 Compartir ──────► ShareOverlay
           │
           ├─► 🎵 Música ─────────► MusicPlayerOverlay
           │
           ├─► @username ────────► [FLOW 7: RestaurantProfile]
           │
           ├─► 🏠 Inicio ─────────► [FLOW 13: Homepage]
           │
           ├─► 🔔 Notificaciones ► [FLOW 11: Notifications]
           │
           ├─► 🛒 Carrito ────────► [FLOW 6: Shop]
           │
           ├─► 💬 Mensajes ───────► [FLOW 10: Messages]
           │
           └─► 👤 Perfil ─────────► [FLOW 12: UserProfile]
```

### Detalles Técnicos:
- **Scroll:** Snap scroll vertical con detección de video visible
- **Videos mock:** 10 videos con data completa (username, likes, comments, etc.)
- **Tabs:** "Siguiendo" (accent) y "Para Ti" (primary)
- **Bottom Nav:** 5 botones principales con animaciones
- **Estados:** liked[], saved[], following[] (arrays de IDs)

---

## 5. Flow "Eat Now"

**Descripción:** Al presionar el botón 🔥 "Eat Now", abre el menú del restaurante con el plato destacado.

### Archivos Activados:
- `src/pages/Feed.tsx` - Detecta click en botón Flame
- `src/components/RestaurantMenu.tsx` - Muestra el menú completo

### Flujo Visual:
```
┌─────────────────────────────────────┐
│   FEED - Video Activo               │
│                                     │
│                        🔥 Eat Now   │
│                        (con glow)   │
└─────────────────────────────────────┘
                  │ onClick
                  ▼
     setHighlightedDish(video.id)
     setShowMenu(true)
                  │
                  ▼
┌─────────────────────────────────────┐
│   📋 RESTAURANT MENU                │
│   --------------------------------  │
│   [← Back]  Tacos El Rey    [🛒]   │
│                                     │
│   Categorías:                       │
│   [Tacos] [Bebidas] [Postres]      │
│                                     │
│   ┌───────────────────────────────┐│
│   │ ⭐ Tacos al Pastor    $120    ││
│   │ (DESTACADO - auto-abierto)    ││
│   │ [Imagen]                      ││
│   │ Descripción completa...       ││
│   │                               ││
│   │ [-] 1 [+]  [Agregar al 🛒]   ││
│   └───────────────────────────────┘│
│                                     │
│   Otros platillos...                │
│                                     │
│   [💰 Ver Carrito (3) - $360]      │
└─────────────────────────────────────┘
                  │ click "Agregar"
                  ▼
          Toast: "Agregado al carrito"
                  │
                  ▼
       [Continúa en Menu o va a Checkout]
```

### Detalles Técnicos:
- **highlightedDishId:** Se pasa el ID del video/platillo
- **autoOpenDish:** true - Abre automáticamente el dialog del platillo
- **Animación:** Slide in desde derecha
- **Categorías:** Tab navigation con scroll horizontal

---

## 6. Flow de Shop/Carrito

**Descripción:** Al presionar el botón 🛒 del bottom nav, muestra loading animado y luego la tienda completa.

### Archivos Activados:
- `src/pages/Feed.tsx` - Gestiona estados showShop, showShopLoading
- `src/components/Shop.tsx` - Componente completo de la tienda
- `src/assets/chef-loading.jpg` - Imagen de loading (opcional)

### Flujo Visual:
```
┌─────────────────────────────────────┐
│   FEED - Bottom Nav                 │
│   [🏠] [🔔] [🛒] [💬] [👤]         │
└─────────────────────────────────────┘
                  │ onClick 🛒
                  ▼
        setShowShopLoading(true)
                  │
                  ▼
┌─────────────────────────────────────┐
│   ⏳ LOADING ANIMATION               │
│   --------------------------------  │
│   [Spinner circular rotatorio]      │
│   "Abriendo Tienda"                 │
│   Duración: 1.2 segundos            │
└─────────────────────────────────────┘
                  │ setTimeout(1200ms)
                  ▼
        setShowShop(true)
        setShowShopLoading(false)
                  │
                  ▼
┌─────────────────────────────────────┐
│   🛍️ SHOP COMPONENT                │
│   --------------------------------  │
│   [← Volver]      TIENDA            │
│                                     │
│   🔍 [Buscar productos...]          │
│                                     │
│   Categorías:                       │
│   [Todo] [Comida] [Bebidas] [🔥]   │
│                                     │
│   ┌──────────┐ ┌──────────┐        │
│   │ [Imagen] │ │ [Imagen] │        │
│   │ Producto │ │ Producto │        │
│   │ $120 ⭐4.8│ │ $80 ⭐4.5│        │
│   │ [+ Cart] │ │ [+ Cart] │        │
│   └──────────┘ └──────────┘        │
│                                     │
│   Grid de productos...              │
│                                     │
│   [🛒 Ir al Carrito (5 items)]     │
└─────────────────────────────────────┘
                  │ click producto
                  ▼
        ProductDetailOverlay
                  │
                  │ click "Carrito"
                  ▼
          [FLOW 9: Checkout]
```

### Detalles Técnicos:
- **Loading:** Animación con motion.div (rotate 360°)
- **Búsqueda:** Input con filtrado en tiempo real
- **Categorías:** Tab filtering
- **Grid:** Responsive 2 columnas
- **Detail:** Overlay modal con descripción completa

---

## 7. Flow de Perfil de Restaurante

**Descripción:** Vista del perfil completo del restaurante al hacer click en @username o avatar.

### Archivos Activados:
- `src/pages/Feed.tsx` - Trigger desde username
- `src/components/RestaurantProfile.tsx` - Perfil completo
- `src/components/PhotoMosaic.tsx` - Galería de fotos

### Flujo Visual:
```
┌─────────────────────────────────────┐
│   FEED - Video                      │
│   @tacoselrey [Seguir]              │
│      ↑ click                        │
└─────────────────────────────────────┘
                  │
                  ▼
        setShowProfile(true)
                  │
                  ▼
┌─────────────────────────────────────┐
│   👤 RESTAURANT PROFILE             │
│   --------------------------------  │
│   [← Back]                          │
│                                     │
│   [Cover Image: Tacos]              │
│   ┌────────┐                        │
│   │[Avatar]│ Tacos El Rey           │
│   └────────┘ @tacoselrey            │
│   📍 CDMX, México                   │
│   ⭐ 4.8 • Comida Mexicana          │
│                                     │
│   [🔔 Seguir] [💬 Mensaje]         │
│                                     │
│   45.2K seguidores                  │
│                                     │
│   Descripción: Los auténticos       │
│   tacos al pastor desde 1985...    │
│                                     │
│   [Videos] [Fotos] [Ubicaciones]    │
│   ────┬──────────────────────       │
│       │                             │
│   ┌───▼──┐┌──────┐┌──────┐         │
│   │ Foto ││ Foto ││ Foto │         │
│   └──────┘└──────┘└──────┘         │
│   (PhotoMosaic - 6 fotos)           │
│                                     │
│   Ubicaciones:                      │
│   📍 Sucursal Centro                │
│   📍 Sucursal Roma                  │
│   📍 Sucursal Condesa               │
│                                     │
│   [🍽️ Ver Menú]                    │
└─────────────────────────────────────┘
                  │
                  ├─► [Seguir] ────► setFollowing()
                  │
                  ├─► [Mensaje] ───► [FLOW 10: Messages]
                  │
                  └─► [Ver Menú] ──► [FLOW 8: Menu]
```

### Detalles Técnicos:
- **Tabs:** Videos, Fotos, Ubicaciones
- **PhotoMosaic:** Grid 3x2 con lightbox
- **Maps:** Muestra ubicaciones con lat/lng
- **Animaciones:** Slide in desde derecha

---

## 8. Flow de Menú de Restaurante

**Descripción:** Catálogo completo de platillos con categorías y carrito integrado.

### Archivos Activados:
- `src/components/RestaurantMenu.tsx` - Menú completo
- `src/components/ProductDetailOverlay.tsx` - Detalle del producto
- `src/components/CheckoutTimeline.tsx` - Al finalizar compra

### Flujo Visual:
```
┌─────────────────────────────────────┐
│   📋 RESTAURANT MENU                │
│   --------------------------------  │
│   [← Back] Tacos El Rey    [🛒 3]  │
│                                     │
│   [Tacos] [Quesadillas] [Bebidas]  │
│   ──┬─────────────────────────      │
│     │                               │
│   ┌─▼───────────────────────────┐  │
│   │ Tacos al Pastor       $120  │  │
│   │ [Imagen] ⭐ 4.9            │  │
│   │ "Los mejores tacos..."      │  │
│   └─────────────────────────────┘  │
│     │ click                         │
│     ▼                               │
│   ┌──PRODUCT DETAIL OVERLAY────┐   │
│   │ Tacos al Pastor           │   │
│   │ [Galería de imágenes]     │   │
│   │                           │   │
│   │ $120  ⭐ 4.9 (250 reviews)│   │
│   │                           │   │
│   │ Descripción completa...   │   │
│   │                           │   │
│   │ Extras:                   │   │
│   │ ☑️ Guacamole (+$20)       │   │
│   │ ☐ Queso extra (+$15)      │   │
│   │                           │   │
│   │ Notas especiales:         │   │
│   │ [_____________________]   │   │
│   │                           │   │
│   │ [-] 2 [+]                 │   │
│   │                           │   │
│   │ [Agregar al Carrito $240] │   │
│   └───────────────────────────┘   │
│     │                               │
│     │ click "Agregar"               │
│     ▼                               │
│   Toast: "Agregado al carrito"     │
│   [🛒 3] → [🛒 5] (actualiza)      │
│                                     │
│   [💰 Ver Carrito (5) - $580]      │
└─────────────────────────────────────┘
                  │ click "Ver Carrito"
                  ▼
        setShowCheckout(true)
                  │
                  ▼
        [FLOW 9: Checkout Timeline]
```

### Detalles Técnicos:
- **Categorías:** Scroll horizontal con indicador activo
- **Filtros:** Por categoría, precio, rating
- **Cart badge:** Actualiza en tiempo real
- **Product detail:** Dialog/Sheet con carousel de imágenes
- **Extras:** Checkboxes con precio adicional
- **Notas:** Textarea para instrucciones especiales

---

## 9. Flow de Checkout

**Descripción:** Timeline animado del proceso de pedido, desde confirmación hasta entrega.

### Archivos Activados:
- `src/components/CheckoutTimeline.tsx` - Timeline completo
- `src/pages/Feed.tsx` - Maneja estado showCheckout

### Flujo Visual:
```
┌─────────────────────────────────────┐
│   💳 CHECKOUT TIMELINE              │
│   --------------------------------  │
│   Pedido #12345                     │
│                                     │
│   ┌─────────────────────────────┐  │
│   │ ✅ Pedido Confirmado        │  │
│   │ │  12:30 PM                 │  │
│   │ │                           │  │
│   │ ⏳ Restaurante Preparando   │  │
│   │ │  (Animación pulsante)    │  │
│   │ │  Tiempo estimado: 15 min │  │
│   │ │                           │  │
│   │ ⏸️ En Camino                │  │
│   │ │  (Pendiente)             │  │
│   │ │                           │  │
│   │ ⏸️ Entregado                │  │
│   │    (Pendiente)              │  │
│   └─────────────────────────────┘  │
│                                     │
│   Resumen:                          │
│   • 3x Tacos al Pastor    $360     │
│   • 2x Bebidas            $80      │
│   • Envío                 $50      │
│   ─────────────────────────────    │
│   Total:                  $490     │
│                                     │
│   Repartidor:                       │
│   🏍️ Juan Pérez                    │
│   ⭐ 4.9 (150 entregas)            │
│   📱 [Llamar] [Chat]               │
│                                     │
│   [🗺️ Rastrear en Mapa]            │
└─────────────────────────────────────┘
                  │ Auto-actualización
                  ▼
     Estado: "Restaurante Preparando"
                  │ ~10 segundos
                  ▼
     Estado: "En Camino"
                  │ ~10 segundos
                  ▼
     Estado: "Entregado"
                  │
                  ▼
┌─────────────────────────────────────┐
│   🎉 ¡PEDIDO ENTREGADO!             │
│   --------------------------------  │
│   ✅ Tu pedido llegó a tiempo       │
│                                     │
│   ¿Cómo fue tu experiencia?         │
│   ⭐⭐⭐⭐⭐                         │
│                                     │
│   [Volver al Inicio]                │
└─────────────────────────────────────┘
                  │
                  ▼
     handleCompleteCheckout()
                  │
                  ▼
        setShowCheckout(false)
                  │
                  ▼
        [Regresa al FEED]
```

### Detalles Técnicos:
- **demoMode:** true - Auto-progresa cada 10 segundos
- **Estados:** confirmed → preparing → on_way → delivered
- **Animaciones:** Pulse en estado activo, checkmarks animados
- **Repartidor:** Info fake con avatar y rating
- **Rating:** Al final del proceso (5 estrellas)

---

## 10. Flow de Mensajes

**Descripción:** Sistema de mensajería con lista de conversaciones y chat individual.

### Archivos Activados:
- `src/components/MessagesLayout.tsx` - Layout completo de mensajes
- `src/pages/Feed.tsx` - Gestiona showMessages y selectedRestaurant

### Flujo Visual:
```
┌─────────────────────────────────────┐
│   FEED - Bottom Nav                 │
│   [🏠] [🔔] [🛒] [💬] [👤]         │
│                        ↑ click      │
└─────────────────────────────────────┘
                  │
                  ▼
        setShowMessages(true)
                  │
                  ▼
┌─────────────────────────────────────┐
│   💬 MENSAJES                       │
│   --------------------------------  │
│   [← Volver]                        │
│                                     │
│   🔍 [Buscar conversaciones...]     │
│                                     │
│   Conversaciones:                   │
│   ┌─────────────────────────────┐  │
│   │ 🍕 Pizza Lovers             │  │
│   │ "Tu pedido está en camino"  │  │
│   │ 🕐 Hace 5 min  •  [1]       │  │
│   └─────────────────────────────┘  │
│     │ click                         │
│     ▼                               │
│   ┌──CHAT INDIVIDUAL────────────┐  │
│   │ [←] Pizza Lovers    [ℹ️]   │  │
│   │ ──────────────────────────  │  │
│   │                             │  │
│   │ [Ellos] Hola! Tu pedido     │  │
│   │         está listo 🍕       │  │
│   │         12:30 PM            │  │
│   │                             │  │
│   │         [Yo] Perfecto!      │  │
│   │              Gracias 😊     │  │
│   │              12:31 PM       │  │
│   │                             │  │
│   │ [Ellos] En camino ahora 🚗 │  │
│   │         12:35 PM            │  │
│   │                             │  │
│   │ ─────────────────────────── │  │
│   │ [Escribe un mensaje...]  [➤]│  │
│   └─────────────────────────────┘  │
│                                     │
│   ┌─────────────────────────────┐  │
│   │ 🌮 Tacos El Rey             │  │
│   │ "¡Gracias por tu pedido!"   │  │
│   │ 🕐 Hace 1 hora              │  │
│   └─────────────────────────────┘  │
│                                     │
│   Más conversaciones...             │
└─────────────────────────────────────┘
```

### Detalles Técnicos:
- **Estado:** selectedConversation (string | undefined)
- **Conversaciones mock:** Lista con restaurantes y últimos mensajes
- **Badge:** Contador de mensajes no leídos
- **Input:** Con emoji picker y adjuntar archivos
- **Auto-scroll:** Al recibir nuevo mensaje

---

## 11. Flow de Notificaciones

**Descripción:** Centro de notificaciones con diferentes tipos de alertas.

### Archivos Activados:
- `src/components/Notifications.tsx` - Componente de notificaciones
- `src/pages/Feed.tsx` - Gestiona showNotifications

### Flujo Visual:
```
┌─────────────────────────────────────┐
│   FEED - Bottom Nav                 │
│   [🏠] [🔔] [🛒] [💬] [👤]         │
│           ↑ click                   │
└─────────────────────────────────────┘
                  │
                  ▼
        setShowNotifications(true)
                  │
                  ▼
┌─────────────────────────────────────┐
│   🔔 NOTIFICACIONES                 │
│   --------------------------------  │
│   [← Volver]        [⚙️ Filtros]   │
│                                     │
│   [Todas] [Pedidos] [Promos] [+]   │
│   ──┬───────────────────────        │
│     │                               │
│   ┌─▼───────────────────────────┐  │
│   │ 🍕 Pedido #12345            │  │
│   │ Tu pedido ha sido entregado │  │
│   │ 🕐 Hace 5 minutos           │  │
│   │ [Ver Detalles]              │  │
│   └─────────────────────────────┘  │
│                                     │
│   ┌─────────────────────────────┐  │
│   │ 🎉 ¡Oferta Especial!        │  │
│   │ 2x1 en Tacos al Pastor      │  │
│   │ 🕐 Hace 1 hora              │  │
│   │ [Ver Oferta]                │  │
│   └─────────────────────────────┘  │
│                                     │
│   ┌─────────────────────────────┐  │
│   │ ❤️ @pizzalovers te siguió   │  │
│   │ 🕐 Hace 3 horas             │  │
│   │ [Ver Perfil]                │  │
│   └─────────────────────────────┘  │
│                                     │
│   Más notificaciones...             │
│                                     │
│   [Marcar todas como leídas]        │
└─────────────────────────────────────┘
```

### Detalles Técnicos:
- **Tipos:** order, promotion, social, system
- **Filtros:** Tabs para filtrar por tipo
- **Badge:** Contador en ícono del bottom nav
- **Acciones:** Cada notificación tiene CTA específico
- **Mark as read:** Individual o masivo

---

## 12. Flow de Perfil de Usuario

**Descripción:** Perfil del usuario con configuraciones y estadísticas.

### Archivos Activados:
- `src/components/UserProfile.tsx` - Perfil de usuario
- `src/components/Settings.tsx` - Panel de configuraciones
- `src/components/settings/*` - Subpaneles de configuración
- `src/pages/Feed.tsx` - Gestiona showUserProfile

### Flujo Visual:
```
┌─────────────────────────────────────┐
│   FEED - Bottom Nav                 │
│   [🏠] [🔔] [🛒] [💬] [👤]         │
│                             ↑ click │
└─────────────────────────────────────┘
                  │
                  ▼
        setShowUserProfile(true)
                  │
                  ▼
┌─────────────────────────────────────┐
│   👤 MI PERFIL                      │
│   --------------------------------  │
│   [← Volver]           [⚙️ Config]  │
│                                     │
│   ┌────────┐                        │
│   │[Avatar]│ Juan Pérez              │
│   └────────┘ @juanperez             │
│   📧 juan@email.com                 │
│                                     │
│   Estadísticas:                     │
│   ┌──────────┬──────────┬──────────┐│
│   │ Pedidos  │ Guardados│ Siguiendo││
│   │   24     │    12    │    35    ││
│   └──────────┴──────────┴──────────┘│
│                                     │
│   [Mis Pedidos] [Favoritos] [Wallet]│
│   ──┬────────────────────────        │
│     │                               │
│   ┌─▼───────────────────────────┐  │
│   │ Pedido #12345        $490   │  │
│   │ Tacos El Rey                │  │
│   │ ✅ Entregado - 12/05/24     │  │
│   │ [Ver Detalles] [Repetir]   │  │
│   └─────────────────────────────┘  │
│                                     │
│   ┌─────────────────────────────┐  │
│   │ Pedido #12344        $350   │  │
│   │ Pizza Lovers                │  │
│   │ ✅ Entregado - 11/05/24     │  │
│   └─────────────────────────────┘  │
│                                     │
│   [🚪 Cerrar Sesión]               │
└─────────────────────────────────────┘
                  │ click ⚙️
                  ▼
┌─────────────────────────────────────┐
│   ⚙️ CONFIGURACIÓN                  │
│   --------------------------------  │
│   [← Volver]                        │
│                                     │
│   👤 Cuenta                         │
│   ├─ Editar Perfil                 │
│   ├─ Cambiar Contraseña            │
│   └─ Verificación en 2 pasos       │
│                                     │
│   🔔 Notificaciones                 │
│   ├─ Push                           │
│   ├─ Email                          │
│   └─ SMS                            │
│                                     │
│   💳 Pagos                          │
│   ├─ Métodos de Pago               │
│   ├─ Direcciones                   │
│   └─ Historial                     │
│                                     │
│   🔒 Privacidad y Seguridad         │
│   🌐 Idioma (Español)               │
│   ❓ Ayuda y Soporte                │
│                                     │
│   [🚪 Cerrar Sesión]               │
└─────────────────────────────────────┘
```

### Detalles Técnicos:
- **Tabs:** Pedidos, Favoritos, Wallet
- **Settings:** 7 secciones con componentes separados
- **Logout:** Confirm dialog antes de cerrar sesión
- **Order history:** Lista con filtros y búsqueda
- **Repeat order:** Agrega items previos al carrito

---

## 13. Flow de Homepage

**Descripción:** Landing page informativa tipo web tradicional.

### Archivos Activados:
- `src/pages/Homepage.tsx` - Página principal
- `src/components/Navbar.tsx` - Navegación superior
- `src/components/Hero.tsx` - Hero section
- `src/components/Features.tsx` - Características
- `src/components/HowItWorks.tsx` - Cómo funciona
- `src/components/AboutUs.tsx` - Sobre nosotros
- `src/components/Join.tsx` - Call to action
- `src/components/AppDownload.tsx` - Links de descarga
- `src/components/Contact.tsx` - Formulario contacto
- `src/components/More.tsx` - Información adicional
- `src/components/Footer.tsx` - Footer

### Flujo Visual:
```
┌─────────────────────────────────────┐
│   FEED - Bottom Nav                 │
│   [🏠] [🔔] [🛒] [💬] [👤]         │
│    ↑ click                          │
└─────────────────────────────────────┘
                  │
                  ▼
         navigate("/homepage")
                  │
                  ▼
┌─────────────────────────────────────┐
│   🌐 HOMEPAGE (Landing Page)        │
│   ================================  │
│                                     │
│   ╔═══════════════════════════════╗│
│   ║ NAVBAR                        ║│
│   ║ [Logo] [Inicio][Sobre][Contacto]│
│   ╚═══════════════════════════════╝│
│                                     │
│   ┌───────────────────────────────┐│
│   │ HERO SECTION                  ││
│   │ "Tu comida favorita           ││
│   │  en minutos"                  ││
│   │ [Comenzar Ahora →]            ││
│   │ [Imagen Hero]                 ││
│   └───────────────────────────────┘│
│                                     │
│   ┌───────────────────────────────┐│
│   │ FEATURES                      ││
│   │ ┌────┐ ┌────┐ ┌────┐         ││
│   │ │🚀 │ │⚡️ │ │🔒 │         ││
│   │ │Rápido Fácil Seguro│         ││
│   │ └────┘ └────┘ └────┘         ││
│   └───────────────────────────────┘│
│                                     │
│   ┌───────────────────────────────┐│
│   │ HOW IT WORKS                  ││
│   │ 1. Elige tu comida            ││
│   │ 2. Realiza tu pedido          ││
│   │ 3. Recibe en minutos          ││
│   └───────────────────────────────┘│
│                                     │
│   ┌───────────────────────────────┐│
│   │ ABOUT US                      ││
│   │ Historia de la empresa...     ││
│   └───────────────────────────────┘│
│                                     │
│   ┌───────────────────────────────┐│
│   │ JOIN (CTA)                    ││
│   │ "¿Eres restaurante?"          ││
│   │ [Únete como Socio →]          ││
│   └───────────────────────────────┘│
│                                     │
│   ┌───────────────────────────────┐│
│   │ APP DOWNLOAD                  ││
│   │ [📱 iOS] [🤖 Android]         ││
│   └───────────────────────────────┘│
│                                     │
│   ┌───────────────────────────────┐│
│   │ CONTACT                       ││
│   │ [Nombre] [Email] [Mensaje]    ││
│   │ [Enviar]                      ││
│   └───────────────────────────────┘│
│                                     │
│   ┌───────────────────────────────┐│
│   │ MORE (Adicional)              ││
│   │ Links, recursos...            ││
│   └───────────────────────────────┘│
│                                     │
│   ╔═══════════════════════════════╗│
│   ║ FOOTER                        ║│
│   ║ © 2024 FoodTook               ║│
│   ║ [Términos] [Privacidad]       ║│
│   ╚═══════════════════════════════╝│
└─────────────────────────────────────┘
```

### Detalles Técnicos:
- **Diseño:** Tradicional landing page web
- **Scroll:** Smooth scroll entre secciones
- **Responsive:** Desktop-first design
- **CTA:** Múltiples call-to-actions
- **Forms:** Validación con react-hook-form

---

## 14. Flow de Selección de Rol

**Descripción:** Página para seleccionar el rol del usuario (Cliente, Repartidor, Restaurante).

### Archivos Activados:
- `src/pages/SelectRole.tsx` - Selector de roles
- `src/hooks/useAuth.tsx` - Validación de usuario
- Supabase tabla: `user_roles`

### Flujo Visual:
```
┌─────────────────────────────────────┐
│   Route: /select-role               │
│   (Acceso después de registro)      │
└─────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│   👥 SELECCIONA TU ROL              │
│   --------------------------------  │
│   "¿Cómo quieres usar la plataforma?"│
│                                     │
│   ┌─────────────────────────────┐  │
│   │ 👤 CLIENTE                  │  │
│   │ "Disfruta tu comida favorita"│  │
│   │                             │  │
│   │ ✓ Miles de restaurantes     │  │
│   │ ✓ Entregas rápidas          │  │
│   │ ✓ Ofertas exclusivas        │  │
│   └─────────────────────────────┘  │
│         │ click                     │
│         ▼ (seleccionado)            │
│   ┌─────────────────────────────┐  │
│   │ 🏍️ REPARTIDOR               │  │
│   │ "Gana dinero flexiblemente" │  │
│   │                             │  │
│   │ ✓ Horarios flexibles        │  │
│   │ ✓ Ganancias inmediatas      │  │
│   │ ✓ Seguro incluido           │  │
│   └─────────────────────────────┘  │
│                                     │
│   ┌─────────────────────────────┐  │
│   │ 🏪 RESTAURANTE              │  │
│   │ "Aumenta tus ventas"        │  │
│   │                             │  │
│   │ ✓ Sin costo inicial         │  │
│   │ ✓ Miles de clientes         │  │
│   │ ✓ Soporte 24/7              │  │
│   └─────────────────────────────┘  │
│                                     │
│   [    CONTINUAR    ]               │
│   (deshabilitado si no seleccionó) │
└─────────────────────────────────────┘
                  │ click "Continuar"
                  ▼
     handleSelectRole() - Supabase Insert
                  │
                  ▼
        toast.success("¡Bienvenido!")
                  │
                  ▼
            navigate("/")
                  │
                  ▼
            [FEED PRINCIPAL]
```

### Detalles Técnicos:
- **Roles:** cliente | repartidor | restaurante
- **Validación:** Requiere usuario autenticado
- **Database:** Insert en tabla `user_roles`
- **Styling:** Accent (naranja) para cliente, Primary (verde) para otros
- **Error handling:** Duplicados, errores de DB

---

## 15. Flows de Interacción Social

**Descripción:** Flows adicionales de interacción entre usuarios.

### 15.1 Flow de Comentarios

```
┌─────────────────────────────────────┐
│   FEED - Video                      │
│                        💬 340       │
│                         ↑ click     │
└─────────────────────────────────────┘
                  │
                  ▼
        setShowComments(true)
                  │
                  ▼
┌─────────────────────────────────────┐
│   💬 COMENTARIOS (340)              │
│   ================================  │
│   [Cerrar X]                        │
│                                     │
│   ┌─────────────────────────────┐  │
│   │ @user1  ⭐                   │  │
│   │ ¡Se ve delicioso! 😍        │  │
│   │ 🕐 Hace 2 horas             │  │
│   │ [❤️ 24] [↩️ Responder]      │  │
│   └─────────────────────────────┘  │
│                                     │
│   ┌─────────────────────────────┐  │
│   │ @user2                      │  │
│   │ ¿Cuál es el precio? 🤔      │  │
│   │ 🕐 Hace 1 hora              │  │
│   │ [❤️ 8] [↩️ Responder]       │  │
│   │   └─ @restaurante: $120     │  │
│   └─────────────────────────────┘  │
│                                     │
│   [...más comentarios...]           │
│                                     │
│   [Escribe un comentario...] [📤]  │
└─────────────────────────────────────┘
```

### 15.2 Flow de Compartir

```
┌─────────────────────────────────────┐
│   FEED - Video                      │
│                        📤           │
│                         ↑ click     │
└─────────────────────────────────────┘
                  │
                  ▼
        setShowShare(true)
                  │
                  ▼
┌─────────────────────────────────────┐
│   📤 COMPARTIR                      │
│   ================================  │
│   [Cerrar X]                        │
│                                     │
│   Compartir en:                     │
│                                     │
│   ┌────┐ ┌────┐ ┌────┐ ┌────┐     │
│   │📱  │ │💬  │ │📧  │ │📋  │     │
│   │WhatsApp Messenger Email Link│  │
│   └────┘ └────┘ └────┘ └────┘     │
│                                     │
│   ┌────┐ ┌────┐ ┌────┐ ┌────┐     │
│   │📘  │ │🐦  │ │📷  │ │⋯   │     │
│   │Facebook Twitter IG  Más  │     │
│   └────┘ └────┘ └────┘ └────┘     │
│                                     │
│   [Agregar mensaje...]              │
│   [____________________________]   │
│                                     │
│   [    COMPARTIR    ]               │
└─────────────────────────────────────┘
```

### 15.3 Flow de Music Player

```
┌─────────────────────────────────────┐
│   FEED - Video                      │
│                        🎵 (spinning)│
│                         ↑ click     │
└─────────────────────────────────────┘
                  │
                  ▼
        setShowMusicPlayer(true)
                  │
                  ▼
┌─────────────────────────────────────┐
│   🎵 MÚSICA                         │
│   ================================  │
│   [Cerrar X]                        │
│                                     │
│   ┌───────────────────────────────┐│
│   │                               ││
│   │     [Carátula Album]          ││
│   │     (Animación rotate)        ││
│   │                               ││
│   └───────────────────────────────┘│
│                                     │
│   "Sonido Original"                 │
│   Tacos El Rey                      │
│                                     │
│   ─────●──────────────── 0:45/2:30 │
│                                     │
│   [◄◄] [▶️/⏸️] [►►] [🔀] [❤️]     │
│                                     │
│   Videos que usan esta música:      │
│   ┌──┐ ┌──┐ ┌──┐ ┌──┐             │
│   │[]│ │[]│ │[]│ │[]│ [Ver +]     │
│   └──┘ └──┘ └──┘ └──┘             │
│                                     │
│   [💾 Guardar Sonido]               │
└─────────────────────────────────────┘
```

---

## Mapa Completo de Navegación

```
                    [APP INIT]
                         │
                         ▼
                  [LOADING (1.5s)]
                         │
                         ▼
                  [ONBOARDING (4 slides)]
                         │
                         ▼
        [AUTH (Login/Signup/Social)]
                         │
                         ▼
            ┌────────[FEED]────────┐
            │                       │
    ┌───────┼───────────────────────┼───────┐
    │       │                       │       │
    ▼       ▼                       ▼       ▼
[Homepage][RestaurantProfile]  [Menu]  [Messages]
            │                       │       │
            ▼                       ▼       │
     [Notifications]         [Checkout]    │
            │                       │       │
            ▼                       ▼       ▼
     [UserProfile]             [Shop]   [Chat]
            │
            ▼
       [Settings]
            │
            ├─► AccountSettings
            ├─► NotificationSettings
            ├─► PaymentSettings
            ├─► PrivacySettings
            ├─► SecuritySettings
            ├─► LanguageSettings
            └─► HelpSettings
```

---

## Resumen de Archivos por Flujo

### Archivos Principales (Core):
- `src/App.tsx` - Router principal y gestor de flows
- `src/pages/Feed.tsx` - Vista principal (986 líneas)
- `src/pages/Auth.tsx` - Sistema de autenticación
- `src/pages/Onboarding.tsx` - Introducción a la app
- `src/components/LoadingScreen.tsx` - Pantalla de carga

### Componentes de Restaurante:
- `src/components/RestaurantProfile.tsx`
- `src/components/RestaurantMenu.tsx`
- `src/components/ProductDetailOverlay.tsx`

### Componentes de Checkout:
- `src/components/CheckoutTimeline.tsx`
- `src/components/Shop.tsx`

### Componentes de Comunicación:
- `src/components/MessagesLayout.tsx`
- `src/components/Notifications.tsx`

### Componentes de Perfil:
- `src/components/UserProfile.tsx`
- `src/components/Settings.tsx`
- `src/components/settings/*` (7 componentes)

### Componentes de Interacción:
- `src/components/CommentOverlay.tsx`
- `src/components/ShareOverlay.tsx`
- `src/components/MusicPlayerOverlay.tsx`

### Componentes de UI:
- `src/components/RiderRing.tsx`
- `src/components/PhotoMosaic.tsx`
- `src/components/LocationDropdown.tsx`

### Páginas Estáticas:
- `src/pages/Homepage.tsx`
- `src/pages/SelectRole.tsx`
- `src/pages/NotFound.tsx`

### Componentes de Homepage:
- `src/components/Navbar.tsx`
- `src/components/Hero.tsx`
- `src/components/Features.tsx`
- `src/components/HowItWorks.tsx`
- `src/components/AboutUs.tsx`
- `src/components/Join.tsx`
- `src/components/AppDownload.tsx`
- `src/components/Contact.tsx`
- `src/components/More.tsx`
- `src/components/Footer.tsx`

---

## Tiempos de Transición

| Flujo | Duración | Tipo de Animación |
|-------|----------|-------------------|
| Loading → Onboarding | 1.45s | Fade out |
| Onboarding slides | 0.3s | Swipe/Spring |
| Auth views | 0.3s | Slide horizontal |
| Feed scroll | 0.15s | Snap scroll |
| Restaurant Profile | 0.3s | Slide from right |
| Menu open | 0.3s | Slide up |
| Checkout stages | 10s cada uno | Auto-progress |
| Shop loading | 1.2s | Spinner circular |
| Overlays | 0.2s | Fade in/out |

---

## Estados Globales (Feed.tsx)

```typescript
// Navigation states
showProfile: boolean
showMenu: boolean
showMessages: boolean
showCheckout: boolean
showUserProfile: boolean
showNotifications: boolean
showShop: boolean
showShopLoading: boolean

// Overlay states
showComments: boolean
showShare: boolean
showMusicPlayer: boolean

// Data states
liked: number[]
saved: number[]
following: number[]
highlightedDish: number | undefined
selectedRestaurant: { name, avatar } | null
currentMusicInfo: { name, artist }

// UI states
activeTab: "following" | "foryou"
currentVideo: number
isCartOpen: boolean
```

---

## Convenciones de Diseño

### Colores Principales:
- **Primary (Verde):** `hsl(142 76% 45%)` - Acciones principales, botones, highlights
- **Accent (Naranja):** `hsl(25 95% 53%)` - CTAs importantes, cliente, promociones
- **Background:** `hsl(0 0% 5%)` - Fondo oscuro
- **Card:** `hsl(0 0% 8%)` - Elementos elevados

### Animaciones:
- **Transiciones:** 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Hovers:** scale(1.05-1.1)
- **Taps:** scale(0.9-0.95)
- **Glows:** shadow-glow para elementos destacados

### Typography:
- **Headings:** Bold, gradient text para énfasis
- **Body:** Regular, text-muted-foreground
- **Small:** 0.875rem, text-xs

---

**Última actualización:** 2024
**Versión del documento:** 1.0
**Autor:** Sistema de Documentación FoodTook
