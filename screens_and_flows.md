# 📱 SCREENS & FLOWS - FOODTOOK APP

Documentación exhaustiva de cada pantalla, su diseño, animaciones y flujos de interacción.

---

## 🎨 ÍNDICE DE SCREENS

1. [Loading Screen](#1-loading-screen)
2. [Onboarding Screen](#2-onboarding-screen)
3. [Auth Screen (Login/Signup)](#3-auth-screen)
4. [Select Role Screen](#4-select-role-screen)
5. [Feed Screen](#5-feed-screen)
6. [Restaurant Profile Screen](#6-restaurant-profile-screen)
7. [Restaurant Menu Screen](#7-restaurant-menu-screen)
8. [Product Detail Overlay](#8-product-detail-overlay)
9. [Checkout Timeline Screen](#9-checkout-timeline-screen)
10. [Shop Screen](#10-shop-screen)
11. [User Profile Screen](#11-user-profile-screen)
12. [Settings Screen](#12-settings-screen)
13. [Messages Layout Screen](#13-messages-layout-screen)
14. [Notifications Screen](#14-notifications-screen)
15. [Music Player Overlay](#15-music-player-overlay)
16. [Share Overlay](#16-share-overlay)
17. [Comment Overlay](#17-comment-overlay)
18. [Homepage (Landing)](#18-homepage-landing)

---

## 1. LOADING SCREEN

### 📍 Ubicación
**Archivo:** `src/components/LoadingScreen.tsx`

### 🎨 Diseño

#### Fondo
- **Color:** Negro sólido (`bg-black`)
- **Posición:** Pantalla completa (`fixed inset-0`)

#### Elemento Central - Animación Geométrica
```
┌─────────────────────────────┐
│                             │
│          ╭───╮              │
│         ╱     ╲             │
│        │  🔵  │             │ 
│         ╲     ╱             │
│          ╰───╯              │
│                             │
│     "Inicializando..."      │
│      ████████████           │
│                             │
└─────────────────────────────┘
```

**Anillos Concéntricos:**
1. **Outer Ring** (32x32)
   - Gradiente: `from-primary via-accent to-primary`
   - Opacidad: 20%
   - Rotación: -360° (4s)
   
2. **Middle Ring** (Inset-4)
   - Gradiente: `from-accent via-primary to-accent`
   - Opacidad: 40%
   - Rotación: 360° (3s)
   
3. **Inner Core** (Inset-8)
   - Gradiente: `from-primary to-accent`
   - Shadow pulsante: `0 0 20px → 0 0 60px → 0 0 20px` (2s loop)

**Partículas:**
- 6 partículas rotando en círculo
- Ángulos: 0°, 60°, 120°, 180°, 240°, 300°
- Animación: se alejan 50px y regresan
- Opacidad: fade in/out

#### Barra de Progreso
- **Ancho:** 320px (w-80)
- **Color de fondo:** `bg-muted`
- **Barra activa:** Gradiente `from-primary to-accent`
- **Altura:** 8px
- **Bordes:** Redondeados (rounded-full)

#### Texto de Estado
- **Posición:** Debajo de la animación
- **Color:** `text-muted-foreground`
- **Tamaño:** text-sm
- **Animación:** Fade in cada vez que cambia (0.3s)

### 🎬 Animaciones

1. **Entrada del Screen:**
   - Opacidad: 1 (fijo)
   - Salida: fade a opacity-0 (0.45s)

2. **Anillo Externo:**
   - Rotación continua -360° (4s linear)
   - Scale pulse: 1 → 1.1 → 1 (2s loop)

3. **Anillo Medio:**
   - Rotación continua 360° (3s linear)

4. **Core Central:**
   - Box-shadow pulse: débil → fuerte → débil (2s loop)

5. **Partículas:**
   - Rotate según su ángulo
   - x: 0 → 50 → 0 (3s loop)
   - opacity: 0 → 1 → 0
   - Delay escalonado: i * 0.2s

6. **Barra de Progreso:**
   - Width aumenta gradualmente según el porcentaje
   - Transición suave (0.3s ease-out)

### 📊 Estados de Carga

```
Etapa 1: 0% → 20%   | "Inicializando módulos"           (200ms)
Etapa 2: 20% → 40%  | "Cargando recomendaciones"        (300ms)
Etapa 3: 40% → 60%  | "Preparando experiencia"          (300ms)
Etapa 4: 60% → 80%  | "Activando medidas de seguridad"  (300ms)
Etapa 5: 80% → 100% | "¡Listo!"                         (200ms)
```

**Total:** ~1.35 segundos + 450ms antes de `onReady()`

### 🔄 Flujos

#### Flow de Entrada
```
App Load
    ↓
LoadingScreen monta (opacity: 1)
    ↓
Inicia progreso automático
    ↓
[100% completado + 450ms]
    ↓
Llama onReady()
    ↓
Exit animation (fade out 0.45s)
    ↓
Screen se desmonta
```

---

## 2. ONBOARDING SCREEN

### 📍 Ubicación
**Archivo:** `src/pages/Onboarding.tsx`

### 🎨 Diseño

#### Fondo
- **Color:** `bg-background`
- **Pantalla completa:** Con safe-area-inset

#### Estructura por Slide
```
┌─────────────────────────────┐
│         [Icono 🎯]          │
│                             │
│      "Título del Slide"     │
│   "Descripción del slide"   │
│                             │
│     [Imagen Destacada]      │
│                             │
│        ● ○ ○ ○              │ ← Dots de navegación
│                             │
│    [Botón CTA Principal]    │
│         ↖️ Siguiente         │
└─────────────────────────────┘
```

### 📄 Slides Definidos

**Slide 1 - Descubre**
- Icono: `Utensils` (cubiertos)
- Gradiente: `from-primary/10 to-accent/10`
- Título: "Descubre Restaurantes"
- Descripción: "Explora miles de opciones cerca de ti"
- Imagen: Hero delivery

**Slide 2 - Ordena**
- Icono: `ShoppingCart`
- Gradiente: `from-accent/10 to-primary/10`
- Título: "Ordena Fácilmente"
- Descripción: "Pide tu comida favorita en segundos"
- Imagen: Delivery rider

**Slide 3 - Rastrea**
- Icono: `MapPin`
- Gradiente: `from-primary/10 to-secondary/10`
- Título: "Rastrea tu Pedido"
- Descripción: "Sigue tu entrega en tiempo real"
- Imagen: Chef loading

**Slide 4 - Disfruta**
- Icono: `Flame`
- Gradiente: `from-accent/10 to-primary/10`
- Título: "¡Disfruta!"
- Descripción: "Tu comida caliente y deliciosa"
- Imagen: Hero delivery

### 🎬 Animaciones

1. **Navegación entre Slides:**
   - **Tipo:** Swipe lateral (framer-motion AnimatePresence)
   - **Variantes:**
     ```javascript
     enter-right: { x: "100%", opacity: 0 }
     center:      { x: 0, opacity: 1 }
     exit-left:   { x: "-100%", opacity: 0 }
     
     enter-left:  { x: "-100%", opacity: 0 }
     exit-right:  { x: "100%", opacity: 0 }
     ```
   - **Duración:** 0.3s ease-in-out

2. **Icono del Slide:**
   - Scale in: `scale(0.5, opacity: 0) → scale(1, opacity: 1)`
   - Delay: 0.2s
   - Duración: 0.5s

3. **Título:**
   - Slide up + fade: `y: 20, opacity: 0 → y: 0, opacity: 1`
   - Delay: 0.3s

4. **Descripción:**
   - Slide up + fade: `y: 20, opacity: 0 → y: 0, opacity: 1`
   - Delay: 0.4s

5. **Imagen:**
   - Scale + fade: `scale: 0.9, opacity: 0 → scale: 1, opacity: 1`
   - Delay: 0.5s

6. **Botón CTA:**
   - Slide up + fade: `y: 20, opacity: 0 → y: 0, opacity: 1`
   - Delay: 0.6s

### 🎮 Interacciones

#### Gestos de Swipe
- **Drag habilitado:** Horizontal (x)
- **Threshold:** 50px
- **Velocity threshold:** 500
- **Acción al swipe left:** Siguiente slide
- **Acción al swipe right:** Slide anterior

#### Botones de Navegación
```
Slide 1-3:  [Saltar] ------------- [Siguiente →]
Slide 4:    [Saltar] ------------- [Comenzar! 🚀]
```

#### Dots de Progreso
- **Total:** 4 dots
- **Activo:** Más grande (w-8) + bg-primary
- **Inactivo:** Pequeño (w-2) + bg-muted-foreground/30
- **Transición:** smooth 0.3s

### 🔄 Flujos

#### Flow Principal
```
LoadingScreen completo
    ↓
Onboarding monta (Slide 1)
    ↓
Usuario swipe/next/skip
    ↓
[Si slide < 4] → Siguiente slide (animación swipe)
[Si slide = 4 o Skip] → onComplete()
    ↓
Auth Screen
```

---

## 3. AUTH SCREEN

### 📍 Ubicación
**Archivo:** `src/pages/Auth.tsx`

### 🎨 Diseño

#### Vista: LOGIN
```
┌─────────────────────────────┐
│        FOODTOOK             │
│                             │
│   [Imagen Delivery Rider]   │
│                             │
│   👤 [Usuario/Email]        │
│   🔒 [Contraseña]           │
│   ☑️  Recuérdame            │
│                             │
│   [Botón: Iniciar Sesión]   │
│                             │
│      ¿Olvidaste?            │
│                             │
│   ─── o inicia con ───      │
│                             │
│   📧  📱  🌐                │
│   Email Phone Google        │
│                             │
│   ¿No tienes cuenta?        │
│      [Regístrate]           │
└─────────────────────────────┘
```

#### Vista: SIGNUP
```
┌─────────────────────────────┐
│        FOODTOOK             │
│                             │
│   [Imagen Delivery Rider]   │
│                             │
│   👤 [Nombre completo]      │
│   📧 [Email]                │
│   🔒 [Contraseña]           │
│                             │
│   [Botón: Crear Cuenta]     │
│                             │
│   ─── o regístrate con ───  │
│                             │
│   📧  📱  🌐                │
│   Email Phone Google        │
│                             │
│   ¿Ya tienes cuenta?        │
│      [Inicia sesión]        │
└─────────────────────────────┘
```

### 🎨 Elementos de Diseño

#### Logo FOODTOOK
- **Tamaño:** text-4xl
- **Font:** Bold
- **Color:** text-primary
- **Animación entrada:** `y: -20, opacity: 0 → y: 0, opacity: 1`

#### Imagen Delivery
- **Aspect ratio:** 4/3
- **Border radius:** rounded-3xl
- **Shadow:** shadow-glow-lg
- **Animación:** `scale: 0.9, opacity: 0 → scale: 1, opacity: 1` (delay: 0.1s)

#### Inputs
- **Altura:** h-14
- **Padding izquierdo:** pl-12 (espacio para icono)
- **Fondo:** bg-card
- **Border:** border-border → focus:border-primary
- **Border radius:** rounded-2xl
- **Iconos internos:**
  - User icon (position: absolute left-4)
  - Lock icon
  - Mail icon (signup)
  - Tamaño: w-5 h-5
  - Color: text-muted-foreground

#### Checkbox "Recuérdame"
- **Tamaño:** w-4 h-4
- **Label:** text-sm text-muted-foreground

#### Botón Principal
- **Altura:** h-12
- **Fondo:** bg-primary
- **Color texto:** text-primary-foreground
- **Border radius:** rounded-xl
- **Animación hover:** hover:shadow-glow
- **Estado loading:** Spinner + "Iniciando sesión..."

#### Botones Sociales
- **Tamaño:** w-full h-12
- **Fondo:** bg-card
- **Border:** border-2 border-border
- **Border radius:** rounded-xl
- **Layout:** Icon + Text
- **Hover:** hover:border-primary

#### Link de Toggle
- **Texto:** "¿No tienes cuenta?" / "¿Ya tienes cuenta?"
- **Botón:** "Regístrate" / "Inicia sesión"
- **Color:** text-primary
- **Hover:** underline

### 🎬 Animaciones

1. **Logo:**
   - `initial: { opacity: 0, y: -20 }`
   - `animate: { opacity: 1, y: 0 }`

2. **Imagen:**
   - `initial: { opacity: 0, scale: 0.9 }`
   - `animate: { opacity: 1, scale: 1 }`
   - `delay: 0.1s`

3. **Formulario:**
   - `initial: { opacity: 0, y: 20 }`
   - `animate: { opacity: 1, y: 0 }`
   - `delay: 0.2s`

4. **Botones sociales:**
   - `initial: { opacity: 0, y: 20 }`
   - `animate: { opacity: 1, y: 0 }`
   - `delay: 0.3s`

5. **Toggle de vista:**
   - Cross-fade entre Login y Signup
   - No hay animación de swipe, solo fade

### 🔐 Validación

**Schema (Zod):**
```typescript
email:    max 255 chars, valid email
password: min 6 chars, max 100 chars
fullName: min 2 chars, max 100 chars (solo signup)
```

**Mensajes de error:**
- Aparecen como toast (sonner)
- "Email inválido"
- "La contraseña debe tener al menos 6 caracteres"
- etc.

### 🔄 Flujos

#### Flow Login
```
Usuario entra (desde Onboarding)
    ↓
Vista Login por defecto
    ↓
[Ingresa credenciales]
    ↓
Validación Zod
    ↓
[Si válido] → Toast success → onComplete() → Feed
[Si inválido] → Toast error → Permanece en Login
```

#### Flow Signup
```
Usuario presiona "Regístrate"
    ↓
Cross-fade a vista Signup
    ↓
[Ingresa datos]
    ↓
Validación Zod
    ↓
[Si válido] → Toast "Cuenta creada" → onComplete() → Feed
[Si inválido] → Toast error → Permanece en Signup
```

#### Flow Social Auth
```
Usuario presiona botón social (Email/Phone/Google)
    ↓
Loading: true
    ↓
Toast: "Conectando con [provider]..."
    ↓
Simulación 1.5s
    ↓
Toast: "¡Bienvenido!"
    ↓
onComplete() → Feed
```

---

## 4. SELECT ROLE SCREEN

### 📍 Ubicación
**Archivo:** `src/pages/SelectRole.tsx`

### 🎨 Diseño

```
┌─────────────────────────────────────────┐
│   Selecciona tu rol                     │
│   ¿Cómo quieres usar nuestra plataforma?│
│                                         │
│  ┌──────┐   ┌──────┐   ┌──────┐       │
│  │ 👤   │   │ 🚴   │   │ 🏪   │       │
│  │Cliente│  │Repartidor││Restaurante│  │
│  │      │   │      │   │      │       │
│  │✓ Feat│   │✓ Feat│   │✓ Feat│       │
│  │✓ Feat│   │✓ Feat│   │✓ Feat│       │
│  │✓ Feat│   │✓ Feat│   │✓ Feat│       │
│  └──────┘   └──────┘   └──────┘       │
│                                         │
│        [Continuar con Cliente]          │
└─────────────────────────────────────────┘
```

### 🎨 Cards de Roles

#### Card Structure
```
┌─────────────────────┐
│   [Icono en círculo] │
│                     │
│       Título        │
│    "Descripción"    │
│                     │
│   ✓ Feature 1       │
│   ✓ Feature 2       │
│   ✓ Feature 3       │
└─────────────────────┘
```

**Estados del Card:**
1. **Default:**
   - Border: `border-primary/20` (o `border-accent/40` si es Cliente)
   - Hover: `border-primary/40` + shadow-glow débil

2. **Selected:**
   - Border: `border-primary` (o `border-accent` si es Cliente)
   - Shadow: `shadow-glow` (o `shadow-[0_0_40px_accent]` si es Cliente)
   - Scale: 1.05
   - Checkmark visible (top-right)

3. **Hover:**
   - Border más brillante
   - Shadow más intenso

#### Icono del Rol
- **Background:** `bg-primary/10` (hover: `bg-primary/20`)
- **Para Cliente:** `bg-accent/10` (hover: `bg-accent/20`)
- **Padding:** p-4
- **Border radius:** rounded-xl
- **Tamaño icono:** w-8 h-8

#### Features List
- **Layout:** Vertical con gaps
- **Icono:** Check verde
- **Texto:** text-sm, text-muted-foreground

### 🎬 Animaciones

1. **Grid de Cards:**
   - Fade in + scale desde 0.9
   - Delay escalonado por card

2. **Card Selection:**
   - Scale: 1 → 1.05 (0.2s)
   - Border color transition
   - Shadow transition

3. **Checkmark:**
   - Scale in desde 0
   - Rotation 0 → 360°

### 📊 Roles Disponibles

#### 1. Cliente 👤
- **Color theme:** Accent (naranja)
- **Features:**
  - Miles de restaurantes
  - Entregas rápidas
  - Ofertas exclusivas

#### 2. Repartidor 🚴
- **Color theme:** Primary (verde)
- **Features:**
  - Horarios flexibles
  - Ganancias inmediatas
  - Seguro incluido

#### 3. Restaurante 🏪
- **Color theme:** Primary (verde)
- **Features:**
  - Sin costo inicial
  - Miles de clientes
  - Soporte 24/7

### 🔄 Flujos

#### Flow de Selección
```
Auth completo
    ↓
[Si user no tiene rol] → SelectRole
[Si user tiene rol] → Feed directamente
    ↓
Usuario clickea en un card
    ↓
Card se marca como seleccionado
    ↓
Botón "Continuar" se activa
    ↓
Usuario presiona "Continuar"
    ↓
INSERT en tabla user_roles (Supabase)
    ↓
[Si error] → Toast error
[Si success] → Toast "¡Bienvenido como [rol]!" → Navigate("/")
```

---

## 5. FEED SCREEN

### 📍 Ubicación
**Archivo:** `src/pages/Feed.tsx`

### 🎨 Diseño Principal

```
┌─────────────────────────────┐
│                             │  ← Video/Imagen de fondo
│                             │
│  @username        [🛒] [📱]│  ← Top bar derecha
│  🎵 Música                  │
│                             │
│  Descripción del video      │
│  #tags                      │
│  [Ordenar Ahora →]          │  ← Botón verde rectangular
│                             │
│                      [❤️ 12K]│  ← Botones derecha
│                      [💬 340]│
│                      [🔖]   │
│                      [↗️]   │
│                             │
└─────────────────────────────┘
```

### 📍 Posicionamiento de Elementos

#### Top Bar (Fija en top)
- **Altura:** py-4
- **Padding:** px-4
- **Elementos:**
  1. Logo Foodtook (izquierda)
  2. Shop icon (derecha, margin-right: 2)
  3. Messages icon (derecha)

#### Lado Izquierdo (Información del video)

**Estructura vertical:**
```
1. @username (bold, text-white)
   [Botón Seguir] ← Si no está siguiendo
   
2. 🎵 Música + Nombre
   └─ Click → Abre MusicPlayerOverlay
   
3. Descripción del video
   └─ max-w-xs, leading-relaxed
   
4. [Ordenar Ahora →]
   └─ Botón verde, rectangular, ancho
```

**Botón "Ordenar Ahora":**
- **Fondo:** bg-primary (verde)
- **Texto:** text-primary-foreground
- **Tamaño:** px-6 py-2.5
- **Border radius:** rounded-full
- **Font:** font-semibold text-sm
- **Hover:** hover:shadow-glow
- **Width:** Casi todo el ancho disponible
- **Click:** Abre RestaurantProfile

#### Lado Derecho (Action Buttons)

**Botones apilados verticalmente:**
```
1. [❤️] Like
   └─ Número de likes debajo
   
2. [💬] Comments
   └─ Número de comentarios
   
3. [🔖] Bookmark
   └─ Sin número
   
4. [↗️] Share
   └─ Sin número
```

**Estilo de botones:**
- **Tamaño:** w-12 h-12
- **Fondo:** bg-card/80 backdrop-blur-sm
- **Border radius:** rounded-full
- **Icon size:** w-6 h-6
- **Hover:** scale-110
- **Active/Liked:** text-accent (rojo) con fill

**Contador debajo:**
- **Tamaño:** text-xs
- **Color:** text-white
- **Font:** font-semibold

### 🎬 Animaciones

#### 1. Transición entre Videos
- **Tipo:** Vertical snap scroll
- **Scroll behavior:** snap-y snap-mandatory
- **Cada video:** snap-start snap-always
- **Altura:** h-screen

#### 2. Botones del lado derecho
- **Hover:** 
  - Scale 1.1 (transform transition-transform)
  - Duration: 0.2s
  
- **Click (Like):**
  - Burst animation (si está disponible)
  - Color change: white → accent
  - Fill transition

#### 3. Botón "Ordenar Ahora"
- **Hover:**
  - Shadow glow más intenso
  - Slight scale 1.02
  
- **Click:**
  - Scale tap: 0.98
  - Spring animation al abrir overlay

#### 4. Music Icon
- **Hover:**
  - Opacity: 0.8
  - Transition smooth

### 📱 Bottom Navigation Bar

```
┌────────────────────────────────────┐
│  [🏠]  [📱]  [+]  [🔔]  [👤]      │
│  Home  Shop  Add  Bell  Profile    │
└────────────────────────────────────┘
```

**Botones:**
1. **Home** (Feed actual)
   - Active: text-primary
   - Inactive: text-muted-foreground

2. **Shop**
   - Abre Shop overlay (slide from right)

3. **Add (Plus)**
   - Central, circular, más grande
   - bg-primary
   - Shadow glow

4. **Notifications**
   - Abre Notifications screen

5. **Profile**
   - Abre UserProfile

**Estilo:**
- **Altura:** h-20
- **Fondo:** bg-background/95 backdrop-blur-md
- **Border top:** border-t border-border
- **Safe area:** pb-safe

### 🔄 Flujos del Feed

#### Flow: Like
```
Usuario toca botón ❤️
    ↓
[Si no está liked]
    → Icon cambia a filled + accent
    → Número incrementa +1
    → Animación burst
[Si está liked]
    → Icon vuelve a outline + white
    → Número decrementa -1
```

#### Flow: Comment
```
Usuario toca botón 💬
    ↓
CommentOverlay slide up
    ↓
Muestra lista de comentarios
    ↓
Usuario puede escribir nuevo comentario
    ↓
[Submit] → Agrega a lista
[Close] → Overlay slide down
```

#### Flow: Share
```
Usuario toca botón ↗️
    ↓
ShareOverlay slide up
    ↓
Opciones: WhatsApp, Instagram, Copiar link, etc.
    ↓
Usuario selecciona opción
    ↓
[Si copiar] → Toast "Enlace copiado"
[Si compartir] → Abre app nativa
```

#### Flow: "Ordenar Ahora"
```
Usuario toca [Ordenar Ahora]
    ↓
RestaurantProfile slide in desde bottom
    ↓
Muestra perfil del restaurante
    ↓
Usuario puede:
    → Ver menú (abre RestaurantMenu)
    → Seguir
    → Enviar mensaje
    → Regresar al Feed
```

#### Flow: Music
```
Usuario toca 🎵 [Nombre música]
    ↓
MusicPlayerOverlay slide up
    ↓
Muestra:
    → Nombre de la canción
    → Artista
    → Controles de reproducción
    → Botón de like
    → Progress bar
    ↓
[Close] → Overlay slide down
```

#### Flow: Seguir
```
Usuario toca [Seguir]
    ↓
[Si no sigue]
    → Botón cambia a "Siguiendo"
    → Color cambia a muted
    → Contador de followers +1
[Si sigue]
    → Botón vuelve a "Seguir"
    → Color vuelve a primary
    → Contador de followers -1
```

### 🎥 Videos Mock Data

**Estructura:**
```typescript
{
  id: number
  username: string
  description: string
  music: string
  likes: number
  comments: number
  profileImage: string (avatar URL)
  videoUrl: string (imagen de fondo)
}
```

**Total videos:** 10 diferentes tipos de comida

---

## 6. RESTAURANT PROFILE SCREEN

### 📍 Ubicación
**Archivo:** `src/components/RestaurantProfile.tsx`

### 🎨 Diseño

```
┌─────────────────────────────┐
│  [←]                        │  ← Back button (top-left)
│                             │
│    [Cover Image con blur]   │  ← Altura 72 (h-72)
│                             │
└─────────────────────────────┘
┌─────────────────────────────┐
│       [Profile Pic]         │  ← -mt-20, circular
│                             │
│   Nombre del Restaurante    │
│      @username              │
│   📍 Location  ⭐ 4.5       │
│   Categoría: Italiana       │
│                             │
│       12.5K                 │
│      Seguidores             │
│                             │
│  [Seguir] [Ver Menú] [💬]  │  ← Action buttons
│                             │
│   "Descripción del          │
│    restaurante..."          │
│                             │
│   📍 Ubicaciones (3)        │  ← LocationDropdown
│                             │
│   ┌───┬───┬───┐            │
│   │📷│📷│📷│            │  ← PhotoMosaic
│   ├───┼───┼───┤            │
│   │📷│📷│📷│            │
│   └───┴───┴───┘            │
└─────────────────────────────┘
```

### 🎨 Elementos de Diseño

#### Cover Image
- **Altura:** h-72
- **Efecto:** 
  - `bg-cover bg-center`
  - Overlay gradient: `from-black/40 via-black/20 to-black`
- **Back button:**
  - Position: absolute top-4 left-4
  - Estilo: circular, bg-black/50, backdrop-blur-sm
  - Icon: ArrowLeft w-6 h-6 text-white

#### Profile Picture
- **Tamaño:** w-32 h-32
- **Posición:** -mt-20 (sobresale del cover)
- **Border:** 4px solid black
- **Shadow:** shadow-glow-lg
- **Shape:** rounded-full

#### Info Section
- **Nombre:** text-2xl font-bold text-white
- **Username:** text-muted-foreground
- **Location + Rating:**
  - Layout horizontal con gaps
  - Icons: MapPin, Star (w-4 h-4)
  - Star con fill-accent
  - text-sm text-muted-foreground

#### Categoría Badge
- **Fondo:** bg-card
- **Padding:** px-4 py-2
- **Border radius:** rounded-full
- **Layout:** "Categoría:" (muted) + "Italiana" (primary, semibold)

#### Stats
- **Número:** text-xl font-bold text-white
- **Label:** text-sm text-muted-foreground
- **Layout:** Centered

#### Action Buttons
- **Layout:** Flex horizontal, gap-3
- **Seguir:**
  - Flex-1
  - bg-primary (o bg-muted si siguiendo)
  - rounded-xl
  - Animación: scale 1.02 hover, 0.98 tap
  
- **Ver Menú:**
  - Flex-1
  - variant="outline"
  - rounded-xl
  
- **Mensaje (💬):**
  - Square button
  - bg-card
  - Solo icono

#### Description
- **Color:** text-muted-foreground
- **Max lines:** No limitado
- **Margin:** mb-6

#### LocationDropdown
- **Cantidad:** Muestra "Ubicaciones (3)"
- **Expandible:** Click para ver lista
- **Estilo:** Card con border

#### PhotoMosaic
- **Grid:** 3 columnas
- **Gap:** gap-2
- **Aspect:** square
- **Hover:** Overlay con opacidad

### 🎬 Animaciones

1. **Entrada del Screen:**
   - Slide from bottom (como overlay)
   - Spring animation
   - damping: 30, stiffness: 300

2. **Botón Seguir:**
   - whileHover: scale 1.02
   - whileTap: scale 0.98

3. **Botón Ver Menú:**
   - whileHover: scale 1.02
   - whileTap: scale 0.98

4. **Photo items:**
   - Hover: brightness increase
   - Transition smooth

### 🔄 Flujos

#### Flow: Entrada desde Feed
```
Feed → Usuario toca "Ordenar Ahora"
    ↓
RestaurantProfile slide up
    ↓
Datos del restaurante se cargan
    ↓
fromFeed = true
```

#### Flow: Seguir
```
Usuario toca [Seguir]
    ↓
onFollow() ejecuta
    ↓
[Si fromFeed = false]
    → Solo actualiza estado local
    → Botón cambia texto/estilo
[Si fromFeed = true]
    → Actualiza estado
    → NO navega (permanece en profile)
```

#### Flow: Ver Menú
```
Usuario toca [Ver Menú]
    ↓
onOpenMenu() ejecuta
    ↓
RestaurantMenu overlay aparece
    ↓
RestaurantProfile permanece en background
```

#### Flow: Mensaje
```
Usuario toca [💬]
    ↓
onMessage() ejecuta
    ↓
MessagesLayout aparece
    ↓
selectedConversation = restaurant.id
```

#### Flow: Back
```
Usuario toca [←]
    ↓
onBack() ejecuta
    ↓
[Si fromFeed] → Regresa al Feed
[Si no] → Regresa a pantalla anterior
```

---

## 7. RESTAURANT MENU SCREEN

### 📍 Ubicación
**Archivo:** `src/components/RestaurantMenu.tsx`

### 🎨 Diseño

```
┌─────────────────────────────┐
│ [←] Restaurant Name   [🔍]  │  ← Header con search
│ ⭐ 4.5  📍 Location         │
│                             │
│ [Todo][Popular][Entradas]   │  ← Category tabs
│                             │
│ ┌─────────────────────────┐ │
│ │ [📷]  Truffle Pasta    │ │
│ │       Desc...  $18.99  │ │
│ │                  [+]   │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ [📷]  Margherita       │ │
│ │       Desc...  $15.99  │ │
│ │                  [+]   │ │
│ └─────────────────────────┘ │
│                             │
│  ... más items ...          │
│                             │
│ ┌───────────────────────┐   │  ← Cart floating bottom
│ │ 🛒 3 items    $45.97   │   │
│ │      [Ver carrito →]   │   │
│ └───────────────────────┘   │
└─────────────────────────────┘
```

### 🎨 Elementos de Diseño

#### Header
- **Sticky:** top-0 z-10
- **Fondo:** bg-background/95 backdrop-blur-md
- **Border:** border-b border-border
- **Layout:**
  - Back button (left)
  - Restaurant info (center)
  - Search button (right)

#### Restaurant Info in Header
- **Nombre:** font-bold text-lg
- **Rating + Location:** 
  - text-xs, flex gap-3
  - Star icon: fill-accent
  - Pin icon: text-muted-foreground

#### Category Tabs
- **Layout:** Horizontal scroll (scrollbar hidden)
- **Estilo activo:**
  - bg-primary
  - text-primary-foreground
  - shadow-glow
- **Estilo inactivo:**
  - bg-card
  - text-muted-foreground
  - hover:bg-muted

**Categorías:**
- Todo
- Popular
- Entradas
- Sopas
- Carnes
- Bebidas
- Combos
- Especiales

#### Menu Item Card
```
┌──────────────────────────┐
│ [Imagen]  Nombre Platillo│
│           Descripción... │
│           $18.99    [+]  │
└──────────────────────────┘
```

**Estructura:**
- **Image:** w-20 h-20, rounded-xl, object-cover
- **Content:**
  - Nombre: font-semibold
  - Descripción: text-sm, text-muted-foreground, truncate
  - Precio: font-bold, text-primary
- **Add button:**
  - Circular, bg-primary
  - Icon: Plus
  - hover: shadow-glow

**Highlight especial:**
- Si `highlightedDishId` coincide:
  - border-2 border-primary
  - shadow-glow
  - Scroll automático al item

#### Search Overlay
```
┌─────────────────────────────┐
│ [🔍 Buscar en menú...]  [X] │
│                             │
│  Resultados:                │
│  • Pasta Truffle            │
│  • Pizza Margherita         │
│  ...                        │
└─────────────────────────────┘
```

- **Entrada:** Slide from top
- **Fondo:** bg-background/95 backdrop-blur
- **Input:** Auto-focus
- **Resultados:** Filtro en tiempo real

#### Shopping Cart (Floating Bottom)

**Estados:**

1. **Vacío:** No se muestra

2. **Con items:**
```
┌─────────────────────────────┐
│ 🛒 3 items        $45.97    │
│        [Ver carrito →]       │
└─────────────────────────────┘
```

**Estilo:**
- **Posición:** fixed bottom-20
- **Fondo:** bg-card
- **Border:** border border-border
- **Shadow:** shadow-glow-lg
- **Padding:** p-4
- **Border radius:** rounded-2xl

**Cart Details Overlay:**
```
┌─────────────────────────────┐
│ Tu Carrito            [X]   │
│                             │
│ Truffle Pasta     x2 $37.98│
│ [Notes: Sin cebolla]        │
│ [-] 2 [+]            [🗑️]  │
│                             │
│ Pizza Margherita  x1 $15.99│
│ [-] 1 [+]            [🗑️]  │
│                             │
│ ─────────────────────────   │
│ Subtotal:           $53.97  │
│ Delivery:            $3.00  │
│ Total:              $56.97  │
│                             │
│    [Proceder al pago →]     │
└─────────────────────────────┘
```

- **Slide up:** Desde bottom
- **Max height:** 85vh
- **Scroll:** Vertical en lista de items

### 🎬 Animaciones

1. **Item Cards:**
   - Fade in + slide up
   - Stagger: i * 0.05s

2. **Add to Cart:**
   - Scale tap: 0.95
   - Success feedback (opcional: burst)

3. **Cart Badge:**
   - Scale pulse cuando se agrega item
   - Número incrementa con bounce

4. **Search Overlay:**
   - Slide from top: y: -100% → y: 0
   - Backdrop fade in

5. **Cart Details:**
   - Slide from bottom
   - Spring animation

### 🔄 Flujos

#### Flow: Ver Menú desde Profile
```
RestaurantProfile → [Ver Menú]
    ↓
RestaurantMenu monta encima
    ↓
[Si highlightedDishId existe]
    → Scroll al item
    → Highlight visual
[Si autoOpenDish = true]
    → Abre ProductDetailOverlay inmediatamente
```

#### Flow: Agregar al Carrito
```
Usuario toca [+] en item
    ↓
ProductDetailOverlay aparece
    ↓
Usuario configura:
    → Cantidad
    → Notas especiales
    → Extras/Bebidas
    ↓
[Agregar al carrito]
    ↓
Overlay cierra
    ↓
Item se agrega al cart state
    ↓
Cart badge actualiza
    ↓
Floating cart aparece/actualiza
```

#### Flow: Ver Carrito
```
Usuario toca [Ver carrito]
    ↓
Cart Details slide up
    ↓
Usuario puede:
    → Modificar cantidades
    → Eliminar items
    → Agregar notas
    → Ver totales
    ↓
[Proceder al pago]
    ↓
onCheckout() ejecuta
    ↓
CheckoutTimeline aparece
```

#### Flow: Búsqueda
```
Usuario toca [🔍]
    ↓
Search overlay slide down
    ↓
Input auto-focus
    ↓
Usuario escribe
    ↓
Filtro en tiempo real
    ↓
[Click en resultado]
    → Cierra search
    → Scroll al item
    → Highlight item
```

---

## 8. PRODUCT DETAIL OVERLAY

### 📍 Ubicación
**Archivo:** `src/components/ProductDetailOverlay.tsx`

### 🎨 Diseño

```
┌─────────────────────────────┐
│                             │  ← Backdrop dark
│  ┌─────────────────────────┐│
│  │ [Drag Handle]      [X] ││  ← Top 15%
│  │                         ││
│  │ [Product Image Grande]  ││
│  │                         ││
│  │ Truffle Pasta      $18.99│
│  │ Pasta cremosa con trufa ││
│  │                         ││
│  │ ┌─ Acompañamientos ───┐ ││
│  │ │ ☑️ Papas Fritas $2.50││
│  │ │ ☐ Aros Cebolla $3.00││
│  │ └─────────────────────┘ ││
│  │                         ││
│  │ ┌─ Bebidas ───────────┐ ││
│  │ │ ☑️ Coca-Cola   $1.50││
│  │ │ ☐ Limonada    $2.00││
│  │ └─────────────────────┘ ││
│  │                         ││
│  │ [Notas especiales...]   ││
│  │                         ││
│  │ [−] 1 [+]     $18.99    ││
│  │ [Agregar al carrito]    ││
│  └─────────────────────────┘│
└─────────────────────────────┘
```

### 🎨 Elementos de Diseño

#### Backdrop
- **Fondo:** bg-black/60 backdrop-blur-sm
- **Click:** Cierra overlay

#### Overlay Container
- **Posición:** fixed, inset-x-0, bottom-0, top-0
- **Animación entrada:** y: 100% → y: 15%
- **Fondo:** bg-background
- **Border radius:** rounded-t-3xl (solo top)
- **Layout:** Flex column

#### Drag Handle
- **Posición:** Top center
- **Estilo:** Línea gris, w-12 h-1, rounded-full
- **Función:** Visual cue para drag

#### Close Button (X)
- **Posición:** Top-right (p-4)
- **Estilo:** Circular, bg-card/80, backdrop-blur
- **Icon:** X, w-5 h-5

#### Sticky Header (aparece al scroll)
```
┌─────────────────────────────┐
│ Truffle Pasta  $18.99  [X]  │  ← Blur background
└─────────────────────────────┘
```

- **Trigger:** scrollY > 200px
- **Animación:** Slide down from -100
- **Fondo:** bg-background/95 backdrop-blur-md

#### Product Image
- **Altura:** h-64
- **Width:** Full
- **Object fit:** cover
- **Border radius:** rounded-2xl
- **Margin:** mb-6

#### Product Header
- **Nombre:** text-2xl font-bold
- **Precio:** text-primary, text-xl
- **Layout:** Space-between

#### Description
- **Color:** text-muted-foreground
- **Line height:** leading-relaxed

#### Action Icons (Top-right de image)
```
[🔖] [↗️]
Save  Share
```

- **Posición:** Absolute, top-4 right-4
- **Estilo:** Circular, bg-card/80, backdrop-blur
- **Gap:** 2

#### Recommendations Sections

**Acompañamientos:**
```
┌─────────────────────────────┐
│ ☑️ Papas Fritas        $2.50│
│ ☐ Aros de Cebolla     $3.00│
│ ☐ Ensalada César      $2.00│
└─────────────────────────────┘
```

- **Header:** Chevron expandible
- **Max selection:** 3 items
- **Checkbox:** Custom styled
- **Layout:** Grid o list

**Bebidas:** Igual que acompañamientos

#### Notes Textarea
- **Placeholder:** "Instrucciones especiales..."
- **Rows:** 3
- **Border:** border-border
- **Focus:** focus:border-primary
- **Background:** bg-card

#### Quantity Selector + Add Button

```
┌─────────────────────────────┐
│ [−]  1  [+]        $18.99   │
│   [Agregar al carrito]      │
└─────────────────────────────┘
```

**Layout:** Sticky bottom, p-6

**Quantity buttons:**
- Circular, bg-card
- Icons: Minus, Plus
- Disabled si quantity <= 1 (minus)

**Total price:**
- text-2xl font-bold text-primary
- Actualiza dinámicamente

**Add button:**
- w-full, bg-primary
- text-primary-foreground
- rounded-xl
- shadow-glow

### 🎬 Animaciones

1. **Overlay Entrada:**
   - Initial: `y: 100%`
   - Animate: `y: 15%`
   - Spring: damping 30, stiffness 300

2. **Overlay Salida:**
   - Exit: `y: 100%`

3. **Backdrop:**
   - Fade in/out: opacity 0 ↔ 1

4. **Sticky Header:**
   - Slide: `y: -100, opacity: 0 → y: 0, opacity: 1`
   - Trigger: scroll > 200px

5. **Save Icon:**
   - Toggle: rotate + scale pulse

6. **Quantity buttons:**
   - Scale tap: 0.95

7. **Add to Cart:**
   - Scale tap: 0.98
   - Success: brief scale pulse

### 🔄 Flujos

#### Flow: Abrir desde Menu
```
RestaurantMenu → Usuario toca [+]
    ↓
ProductDetailOverlay monta
    ↓
Overlay slide up (y: 100% → 15%)
    ↓
Product info carga
    ↓
Usuario puede interactuar
```

#### Flow: Configurar Producto
```
Usuario selecciona acompañamientos
    ↓
[Max 3] → Disabled otros checkboxes
    ↓
Usuario selecciona bebidas
    ↓
[Max 3] → Disabled otros
    ↓
Usuario ajusta cantidad [−][+]
    ↓
Total price actualiza en tiempo real
    ↓
Usuario escribe notas especiales
```

#### Flow: Agregar al Carrito
```
Usuario toca [Agregar al carrito]
    ↓
Validación: quantity >= 1
    ↓
onAddToCart(productId, quantity, notes) ejecuta
    ↓
[Success]
    → Overlay cierra (slide down)
    → Cart badge actualiza
    → Brief success feedback
```

#### Flow: Cerrar
```
Usuario toca [X] o backdrop
    ↓
Overlay slide down
    ↓
onClose() ejecuta
    ↓
State resetea (quantity: 1, notes: "", selections: [])
```

---

## 9. CHECKOUT TIMELINE SCREEN

### 📍 Ubicación
**Archivo:** `src/components/CheckoutTimeline.tsx`

### 🎨 Diseño

```
┌─────────────────────────────┐
│ Pedido #A12B3C              │
│ ████████████░░░░ 60%        │  ← Progress bar
│                             │
│     ┌───────────┐           │
│     │ [🚴 Icon] │           │  ← Estado actual
│     └───────────┘           │
│                             │
│  Delivery en camino         │
│  Tu pedido está en camino   │
│  hacia tu ubicación         │
│                             │
│  ┌─────────────────────┐   │
│  │ ● Preparando ✓      │   │  ← Timeline
│  │ │                   │   │
│  │ ● Lista ✓           │   │
│  │ │                   │   │
│  │ ● Retirada ✓        │   │
│  │ │                   │   │
│  │ ● En camino  (now)  │   │
│  │ │                   │   │
│  │ ○ Cerca             │   │
│  │ │                   │   │
│  │ ○ En puerta         │   │
│  │ │                   │   │
│  │ ○ Entregada         │   │
│  └─────────────────────┘   │
│                             │
│  [Reportar problema]        │
└─────────────────────────────┘
```

### 🎨 Elementos de Diseño

#### Header
- **Background:** bg-card
- **Border:** border-b border-border
- **Padding:** p-6
- **Contenido:**
  - Order ID: font-semibold
  - Progress bar

#### Progress Bar
- **Container:** bg-muted, h-2, rounded-full
- **Fill:** bg-gradient-to-r from-primary to-accent
- **Width:** Dinámico según progreso
- **Transition:** smooth 0.3s

#### Current State Card (Centro)
```
┌─────────────────┐
│   [Icon Grande] │  ← bg-gradient circular
│                 │
│  Estado Label   │
│   Descripción   │
└─────────────────┘
```

- **Background:** bg-gradient-to-br from-primary/5 to-accent/5
- **Border radius:** rounded-3xl
- **Padding:** p-8
- **Shadow:** shadow-glow-lg

**Icon container:**
- **Size:** w-24 h-24
- **Background:** bg-gradient (primary/accent según estado)
- **Shape:** rounded-full
- **Animation:** Pulse subtle

#### Timeline Vertical

**Item completado:**
```
● ─── Estado ✓
│
```

**Item actual:**
```
● ─── Estado (now)  ← Pulsating
│
```

**Item pendiente:**
```
○ ─── Estado
│
```

**Estilos:**
- **Dot completado:** bg-primary, w-3 h-3, ring-4 ring-primary/20
- **Dot actual:** bg-accent, w-4 h-4, ring-6 ring-accent/30, animate-pulse
- **Dot pendiente:** bg-muted, w-3 h-3
- **Línea:** bg-border, w-0.5, conecta dots

### 📊 Estados del Timeline

```
1. PREPARING
   Icon: 👨‍🍳 ChefHat
   Label: "Preparando comida"
   Desc: "El restaurante está preparando tu pedido"
   Duration: 10s

2. READY_FOR_PICKUP
   Icon: 🔔 Bell
   Label: "Comida lista para retirar"
   Desc: "Tu comida está lista"
   Duration: 10s

3. DELIVERY_PICKED
   Icon: 🚴 Bike
   Label: "Comida retirada por delivery"
   Desc: "El repartidor ha recogido tu pedido"
   Duration: 10s

4. DELIVERY_ON_ROUTE
   Icon: 🧭 Navigation
   Label: "Delivery en camino"
   Desc: "Tu pedido está en camino"
   Duration: 10s

5. DELIVERY_NEAR
   Icon: 📍 MapPin
   Label: "Delivery cerca"
   Desc: "¡El repartidor está muy cerca!"
   Duration: 10s

6. DELIVERY_AT_DOOR
   Icon: 🏠 Home
   Label: "Delivery en puerta"
   Desc: "Tu pedido ha llegado"
   Duration: 10s

7. DELIVERED_REVIEW
   Icon: ⭐ Star
   Label: "Comida entregada — Califica"
   Desc: "¿Cómo estuvo todo?"
   Duration: ∞ (no auto-advance)
```

### 🎬 Animaciones

1. **Progress Bar:**
   - Fill width: Aumenta gradualmente
   - Transition: 0.3s ease-out

2. **Current State Icon:**
   - Pulse scale: 1 → 1.05 → 1 (2s loop)
   - Glow shadow pulse

3. **Timeline Dots:**
   - Completados: Brief scale pop al completar
   - Actual: Continuous pulse
   - Pendientes: Static

4. **State Transition:**
   - Current card: Fade out → Fade in
   - Cross-fade: 0.5s

5. **Review Stars:**
   - Hover: Scale 1.2
   - Active: Fill color + scale pulse

### 🎮 Interacciones

#### Reportar Problema
```
Usuario toca [Reportar problema]
    ↓
Alert/Modal aparece
    ↓
Opciones:
    • Pedido incorrecto
    • Demora excesiva
    • Problema con repartidor
    • Otro
    ↓
[Enviar] → Toast confirmación
```

#### Calificación (Estado REVIEW)
```
┌─────────────────────────────┐
│ ¿Cómo fue tu experiencia?   │
│                             │
│   ⭐ ⭐ ⭐ ⭐ ⭐           │  ← Selección de estrellas
│                             │
│ [Comentario opcional...]    │
│                             │
│    [Enviar calificación]    │
└─────────────────────────────┘
```

- **Stars:** Interactive hover/click
- **Comentario:** Textarea opcional
- **Submit:** Disabled si rating = 0

### 🔄 Flujos

#### Flow: Auto-progression
```
CheckoutTimeline monta
    ↓
Estado inicial: PREPARING (index 0)
    ↓
Progress incrementa cada 100ms
    ↓
[Progress llega a 100%]
    ↓
Espera 500ms
    ↓
[Si no es último estado]
    → Avanza a siguiente estado (index++)
    → Progress reset a 0
    → Repite ciclo
[Si es DELIVERED_REVIEW]
    → Stop auto-progression
    → Muestra rating interface
```

#### Flow: Submit Review
```
Usuario selecciona estrellas (1-5)
    ↓
[Opcional] Escribe comentario
    ↓
Toca [Enviar calificación]
    ↓
[Si rating > 0]
    → onComplete() ejecuta
    → Posible navegación a Feed
[Si rating = 0]
    → Botón disabled
```

---

## 10. SHOP SCREEN

### 📍 Ubicación
**Archivo:** `src/components/Shop.tsx`

### 🎨 Diseño

```
┌─────────────────────────────┐
│ 📍 Tu ubicación  Foodtook👤│  ← Header
│                             │
│ [🔍 Buscar...]  [🎙️] [⚙️] │  ← Search bar
│                             │
│ 🍔 🍕 🥗 🥩 🍹 → (scroll)   │  ← Category chips
│                             │
│ ┌───────────────────────┐   │
│ │ [Filters Active: 3]   │   │  ← Filter summary
│ └───────────────────────┘   │
│                             │
│ ┌─────────────────────────┐ │
│ │ [📷]  Plato Especial 1 │ │  ← Product cards
│ │       Restaurante 1    │ │
│ │       ⭐ 4.5  -20%     │ │
│ │       $15.00  20 min   │ │
│ └─────────────────────────┘ │
│                             │
│  ... más productos ...      │
│                             │
│ ┌───┬───┬───┬───┬───┐      │  ← Bottom nav
│ │🏠│📱│ + │🔔│👤│      │
│ └───┴───┴───┴───┴───┘      │
└─────────────────────────────┘
```

### 🎨 Elementos de Diseño

#### Header
- **Sticky:** top-0
- **Background:** bg-background/95 backdrop-blur-md
- **Border:** border-b border-border

**Ubicación:**
- Icon: MapPin, text-primary
- Text: "Tu ubicación", font-medium

**Logo + Avatar:**
- Foodtook (bold)
- Avatar circular: border-2 border-primary

#### Search Bar
```
[🔍  Buscar restaurantes, comidas...]  [🎙️]  [⚙️]
```

- **Background:** bg-card
- **Border:** border-2 (focus: border-primary)
- **Border radius:** rounded-full
- **Padding:** px-4 py-2.5
- **Icons:**
  - Search (left)
  - Mic button
  - Filters button (SlidersHorizontal)

**Estados:**
- Normal: border-border
- Focus: border-primary, shadow-glow

#### Category Chips (Horizontal scroll)
```
🍔 Burgers  🍕 Pizza  🥗 Saludable → (scroll)
```

- **Layout:** Flex row, gap-2, overflow-x-scroll
- **Chip inactivo:**
  - bg-card
  - text-muted-foreground
  - px-4 py-2, rounded-full
  
- **Chip activo:**
  - bg-primary
  - text-primary-foreground
  - shadow-glow

- **Hover:** bg-muted (inactivos)

#### Filter Summary (si hay filtros activos)
```
┌─────────────────────────────┐
│ Filtros aplicados: 3   [X]  │
│ • Precio: $0-$50            │
│ • Rating: 4+ ⭐             │
│ • Distancia: <5km           │
└─────────────────────────────┘
```

- **Background:** bg-card/50
- **Border:** border-l-4 border-primary
- **Padding:** p-3

#### Product Card
```
┌─────────────────────────┐
│ [Imagen Producto]       │
│ -20% badge (top-right)  │
│                         │
│ Nombre del Plato        │
│ Nombre Restaurante      │
│ ⭐ 4.5                  │
│ $15.00     ⏱️ 20 min   │
└─────────────────────────┘
```

**Imagen:**
- Aspect: 4/3
- Border radius: rounded-2xl
- Object-fit: cover

**Discount badge:**
- Position: absolute top-2 right-2
- bg-accent, text-white
- px-2 py-1, rounded-full
- font-semibold

**Layout info:**
- Nombre: font-bold, truncate
- Restaurante: text-sm, text-muted-foreground
- Rating: Star icon (fill-accent)
- Price: font-bold, text-primary
- Time: text-sm, text-muted-foreground

#### Filters Sheet (Slide from right)
```
┌─────────────────────────────┐
│ Filtros          [Limpiar]  │
│                             │
│ ▼ Precio                    │
│   $0 ═══●═══ $50           │
│                             │
│ ▼ Tiempo de entrega         │
│   0 min ═══●═══ 60 min     │
│                             │
│ ▼ Calificación              │
│   ⭐⭐⭐⭐☆ 4+             │
│   ⭐⭐⭐☆☆ 3+             │
│                             │
│ ▼ Tipo de comida            │
│   ☑️ Mexicana               │
│   ☐ Italiana                │
│   ☐ China                   │
│                             │
│ ▼ Distancia                 │
│   ═══●═══ 5 km             │
│                             │
│   [Aplicar filtros]         │
└─────────────────────────────┘
```

**Filtros disponibles:**
1. **Precio:** Range slider $0-$50
2. **Tiempo entrega:** Range slider 0-60 min
3. **Calificación:** Select 1-5 estrellas
4. **Tipo de comida:** Multi-select checkboxes
5. **Distancia:** Slider 0-10 km

**Collapse/Expand:**
- Cada sección con chevron
- Click para expandir/colapsar

### 🎬 Animaciones

1. **Shop Screen Entrada:**
   - Slide from right: x: 100% → x: 0
   - Spring: damping 30, stiffness 300

2. **Search Focus:**
   - Border color transition
   - Shadow glow fade in

3. **Category Chip Select:**
   - Scale tap: 0.95
   - Background color transition

4. **Product Cards:**
   - Grid fade in
   - Stagger: i * 0.1s

5. **Filters Sheet:**
   - Slide from right
   - Backdrop fade in

6. **Filter Sections:**
   - Accordion animation
   - Chevron rotate

### 🔄 Flujos

#### Flow: Abrir Shop
```
Feed → Usuario toca [🛒] en bottom nav
    ↓
Shop screen slide in desde derecha
    ↓
Carga productos populares
    ↓
Categoría default: "Burgers"
```

#### Flow: Búsqueda
```
Usuario toca search input
    ↓
Focus en input
    ↓
Usuario escribe query
    ↓
Filtro en tiempo real
    ↓
Productos filtrados aparecen
    ↓
[Si no hay resultados]
    → "No se encontraron resultados"
```

#### Flow: Seleccionar Categoría
```
Usuario toca chip de categoría
    ↓
Categoría se marca como activa
    ↓
Productos se filtran por categoría
    ↓
Scroll smooth al top de productos
```

#### Flow: Aplicar Filtros
```
Usuario toca [⚙️]
    ↓
Filters sheet slide in
    ↓
Usuario ajusta filtros:
    → Precio range
    → Delivery time
    → Rating
    → Food types
    → Distance
    ↓
[Aplicar filtros]
    ↓
Sheet cierra
    ↓
Productos re-filtrados
    ↓
Filter summary aparece si filtros activos
```

#### Flow: Limpiar Filtros
```
Usuario toca [Limpiar] en filters sheet
O toca [X] en filter summary
    ↓
Todos los filtros reset a default:
    → Precio: [0, 50]
    → Time: [0, 60]
    → Rating: null
    → Food types: []
    → Distance: [5]
    ↓
Productos muestran todos
    ↓
Filter summary desaparece
```

#### Flow: Cerrar Shop
```
Usuario toca [X] o swipe right
    ↓
Shop slide out a la derecha
    ↓
Regresa a Feed
```

---

## 11. USER PROFILE SCREEN

### 📍 Ubicación
**Archivo:** `src/components/UserProfile.tsx`

### 🎨 Diseño

```
┌─────────────────────────────┐
│ [←]  Mi Perfil        [⚙️] │
│                             │
│     [Avatar Grande]         │
│                             │
│      @usuario               │
│  "Amante de la comida 🍕"  │
│   📍 Ciudad de México       │
│                             │
│   124        2.5K      89   │
│  Publicaciones Seguidores Siguiendo│
│                             │
│  [Editar perfil]            │
│                             │
│ [Grid] [❤️] [🔖]           │  ← Tabs
│                             │
│ ┌───┬───┬───┐              │
│ │📷│📷│📷│              │  ← Posts grid
│ ├───┼───┼───┤              │
│ │📷│📷│📷│              │
│ └───┴───┴───┘              │
└─────────────────────────────┘
```

### 🎨 Elementos de Diseño

#### Header
- **Sticky:** top-0
- **Background:** bg-background/80 backdrop-blur-md
- **Border:** border-b border-border

**Botones:**
- Back (left): Circular, bg-card
- Settings (right): Circular, bg-card

#### Profile Picture
- **Tamaño:** w-24 h-24
- **Border:** Gradient border (p-1)
  - bg-gradient-to-br from-primary to-accent
- **Inner:** bg-card (white bg)
- **Shape:** rounded-full

#### User Info
- **Username:** text-2xl font-bold
- **Bio:** text-muted-foreground, text-sm
- **Location:**
  - Icon: MapPin w-4 h-4
  - Text: text-muted-foreground

#### Stats Grid
```
┌───────┬───────┬───────┐
│  124  │ 2.5K  │  89   │
│ Posts │Follower│Following│
└───────┴───────┴───────┘
```

- **Layout:** grid-cols-3
- **Número:** text-2xl font-bold
- **Label:** text-xs text-muted-foreground

#### Edit Profile Button
- **Width:** w-full
- **Variant:** outline
- **Border radius:** rounded-xl
- **Hover:** hover:bg-muted

#### Tabs
```
[Grid3x3] [Heart] [Bookmark]
```

- **Layout:** Horizontal, centered
- **Active:** text-primary, border-b-2 border-primary
- **Inactive:** text-muted-foreground

#### Posts Grid
- **Columns:** 3
- **Gap:** gap-1
- **Aspect:** square
- **Image:** object-cover

**Overlay on hover:**
- bg-black/50
- Muestra likes count
- Heart icon
- Transition smooth

### 🎬 Animaciones

1. **Profile Picture:**
   - Gradient border rotate (opcional)
   - Hover: scale 1.05

2. **Stats:**
   - Count up animation al cargar (opcional)

3. **Tabs:**
   - Border slide animation
   - Underline follows active tab

4. **Posts Grid:**
   - Fade in stagger
   - Hover: overlay fade in + scale 1.05

5. **Settings Transition:**
   - Slide from right (cuando abre Settings)

### 🔄 Flujos

#### Flow: Abrir Profile
```
Feed → Usuario toca [👤] en bottom nav
    ↓
UserProfile monta
    ↓
Carga datos del usuario
    ↓
Carga posts del usuario
```

#### Flow: Ver Tab
```
Usuario toca tab [Grid/Heart/Bookmark]
    ↓
Active tab cambia
    ↓
Contenido cambia:
    → Grid: Todos los posts
    → Heart: Posts que le gustaron
    → Bookmark: Posts guardados
    ↓
Grid actualiza con fade
```

#### Flow: Abrir Settings
```
Usuario toca [⚙️]
    ↓
setShowSettings(true)
    ↓
Settings screen slide in
    ↓
UserProfile permanece en background
```

#### Flow: Editar Perfil
```
Usuario toca [Editar perfil]
    ↓
Modal/Screen de edición aparece
    ↓
Usuario puede cambiar:
    → Avatar
    → Username
    → Bio
    → Location
    ↓
[Guardar] → Actualiza datos → Toast success
[Cancelar] → Cierra sin cambios
```

---

## 12. SETTINGS SCREEN

### 📍 Ubicación
**Archivo:** `src/components/Settings.tsx`

### 🎨 Diseño

```
┌─────────────────────────────┐
│ [←]  Configuración          │
│                             │
│ ┌─────────────────────────┐ │
│ │ 🔔 Notificaciones       │ │  ← Quick toggles
│ │              [Toggle ON]│ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ 🌙 Modo Oscuro          │ │
│ │              [Toggle ON]│ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ 👤 Cuenta          [→]  │ │  ← Settings options
│ │    Gestiona tu info     │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ 🔔 Notificaciones  [→]  │ │
│ │    Configura prefs      │ │
│ └─────────────────────────┘ │
│                             │
│  ... más opciones ...       │
│                             │
│ ┌─────────────────────────┐ │
│ │ 🚪 Cerrar sesión        │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

### 🎨 Elementos de Diseño

#### Header
- **Sticky:** top-0
- **Background:** bg-background/95 backdrop-blur-md
- **Border:** border-b border-border
- **Layout:** [Back] Title [Spacer]

#### Quick Toggles Section
```
┌─────────────────────────────┐
│ [Icon] Label                │
│        Description          │
│                  [Switch]   │
└─────────────────────────────┘
```

- **Background:** bg-card
- **Border:** border border-border
- **Border radius:** rounded-2xl
- **Padding:** p-4

**Switch:**
- Primary color cuando ON
- Smooth transition

#### Settings Options
```
┌─────────────────────────────┐
│ [Icon] Label           [→]  │
│        Description          │
└─────────────────────────────┘
```

- **Layout:** Similar a toggles
- **Hover:** hover:bg-muted/50
- **Cursor:** pointer
- **Chevron:** ChevronRight w-5 h-5

### 📋 Opciones de Settings

#### 1. Cuenta
- **Icon:** User
- **Label:** "Cuenta"
- **Description:** "Gestiona tu información personal"
- **Abre:** AccountSettings

#### 2. Notificaciones
- **Icon:** Bell
- **Label:** "Notificaciones"
- **Description:** "Configura tus preferencias"
- **Abre:** NotificationSettings

#### 3. Privacidad
- **Icon:** Lock
- **Label:** "Privacidad"
- **Description:** "Controla tu privacidad"
- **Abre:** PrivacySettings

#### 4. Idioma
- **Icon:** Globe
- **Label:** "Idioma"
- **Description:** "Español" (current)
- **Abre:** LanguageSettings

#### 5. Pagos
- **Icon:** CreditCard
- **Label:** "Pagos"
- **Description:** "Métodos de pago"
- **Abre:** PaymentSettings

#### 6. Seguridad
- **Icon:** Shield
- **Label:** "Seguridad"
- **Description:** "Contraseña y autenticación"
- **Abre:** SecuritySettings

#### 7. Ayuda
- **Icon:** HelpCircle
- **Label:** "Ayuda"
- **Description:** "Centro de ayuda y soporte"
- **Abre:** HelpSettings

#### 8. Cerrar Sesión
- **Icon:** LogOut
- **Color:** text-destructive
- **Action:** Confirmar y logout

### 🎬 Animaciones

1. **Options Hover:**
   - Background fade to muted
   - Transition: 0.2s

2. **Switch Toggle:**
   - Thumb slide animation
   - Color transition

3. **Sub-screen Transition:**
   - Slide from right
   - Spring animation

### 🔄 Flujos

#### Flow: Abrir Settings
```
UserProfile → Usuario toca [⚙️]
    ↓
Settings monta
    ↓
Slide in desde derecha
```

#### Flow: Toggle Quick Setting
```
Usuario toca Switch
    ↓
Estado toggle cambia
    ↓
[Notificaciones]
    → Activa/desactiva push notifications
[Modo Oscuro]
    → Cambia theme (dark/light)
    ↓
Toast confirmación (opcional)
```

#### Flow: Navegar a Sub-setting
```
Usuario toca opción (ej: Cuenta)
    ↓
setCurrentScreen("account")
    ↓
AccountSettings slide in
    ↓
Settings permanece en background
```

#### Flow: Cerrar Sesión
```
Usuario toca [Cerrar sesión]
    ↓
Alert Dialog aparece
    ↓
"¿Estás seguro?"
    ↓
[Cancelar] → Cierra dialog
[Confirmar] → Logout → Navigate a Auth
```

#### Sub-Settings Screens

Cada sub-setting tiene su propia pantalla con:
- Header con back button
- Contenido específico
- Botón save (si aplica)

**Ejemplo AccountSettings:**
```
┌─────────────────────────────┐
│ [←]  Cuenta                 │
│                             │
│ [Avatar para editar]        │
│                             │
│ Nombre completo             │
│ [Input field]               │
│                             │
│ Email                       │
│ [Input field]               │
│                             │
│ Teléfono                    │
│ [Input field]               │
│                             │
│ [Guardar cambios]           │
└─────────────────────────────┘
```

---

## 13. MESSAGES LAYOUT SCREEN

### 📍 Ubicación
**Archivo:** `src/components/MessagesLayout.tsx`

### 🎨 Diseño

#### Vista: INBOX
```
┌─────────────────────────────┐
│ [←]  Mensajes         [🔍]  │
│                             │
│ [🔍 Buscar conversaciones...│
│                             │
│ ┌─────────────────────────┐ │
│ │ [Avatar] Tacos El Rey  │ │
│ │          ¡Tu pedido... │ │
│ │          Hace 5 min  ②│ │  ← Unread badge
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ [Avatar] Pizza Lovers  │ │
│ │          Gracias...    │ │
│ │          Hace 1 hora   │ │
│ └─────────────────────────┘ │
│                             │
│  ... más conversaciones ... │
└─────────────────────────────┘
```

#### Vista: CHAT
```
┌─────────────────────────────┐
│ [←] [Avatar] Tacos El Rey ●│  ← Online indicator
│                        [⋮]  │
│                             │
│ ┌─ Hola ─────────────┐      │  ← User message (right)
│ │ ¿tienen disponib..?│      │
│ └────────────────────┘ ✓✓  │  ← Read status
│                             │
│     ┌─────────────────┐     │  ← Other message (left)
│     │ ¡Claro que sí! │     │
│     │ Tenemos a las 7│     │
│     └─────────────────┘     │
│                             │
│  ... más mensajes ...       │
│                             │
│ ┌───────────────────────────┐│
│ │[📎][😊] Mensaje...  [→] ││  ← Input bar
│ └───────────────────────────┘│
└─────────────────────────────┘
```

### 🎨 Elementos de Diseño

#### Inbox Header
- **Back button:** left
- **Title:** "Mensajes"
- **Search icon:** right

#### Search Bar (Inbox)
- **Placeholder:** "Buscar conversaciones..."
- **Icon:** Search (left)
- **Background:** bg-card
- **Border radius:** rounded-xl

#### Conversation Item
```
┌─────────────────────────────┐
│ [Avatar] Name          [●]  │  ← Online dot
│          Last message...    │
│          Time         [2]   │  ← Unread count
└─────────────────────────────┘
```

**Layout:**
- **Avatar:** w-12 h-12, rounded-full
- **Name:** font-semibold
- **Last message:** text-sm, text-muted-foreground, truncate
- **Time:** text-xs, text-muted-foreground
- **Unread badge:** 
  - bg-primary
  - text-primary-foreground
  - rounded-full, px-2
  - font-bold

**Online indicator:**
- **Position:** absolute, bottom-0 right-0 en avatar
- **Size:** w-3 h-3
- **Color:** bg-green-500
- **Border:** border-2 border-background

#### Chat Header
```
[←] [Avatar] Restaurant Name ● [⋮]
```

- **Avatar:** w-10 h-10
- **Name:** font-semibold
- **Online:** Green dot si online
- **Menu:** MoreVertical icon (right)

#### Message Bubbles

**User (right-aligned):**
```
        ┌─────────────────┐
        │ Hola, ¿tienen?  │
        └─────────────────┘ ✓✓
```

- **Background:** bg-primary
- **Color:** text-primary-foreground
- **Border radius:** rounded-2xl rounded-br-sm
- **Align:** ml-auto
- **Max width:** 70%

**Other (left-aligned):**
```
┌─────────────────┐
│ ¡Claro que sí!  │
└─────────────────┘
```

- **Background:** bg-card
- **Color:** text-foreground
- **Border radius:** rounded-2xl rounded-bl-sm
- **Align:** mr-auto
- **Max width:** 70%

**Timestamp:**
- **Position:** Below bubble
- **Size:** text-xs
- **Color:** text-muted-foreground

**Status icons:**
- ✓ Delivered (single check)
- ✓✓ Read (double check)
- 🕐 Sending (clock)

#### Input Bar
```
┌───────────────────────────────┐
│ [📎] [😊]  Mensaje...   [→]  │
└───────────────────────────────┘
```

- **Position:** Fixed bottom
- **Background:** bg-background
- **Border:** border-t border-border

**Botones:**
- **Paperclip:** Attachments
- **Smile:** Emoji picker
- **Send arrow:** Enviar mensaje

**Input:**
- **Placeholder:** "Escribe un mensaje..."
- **Background:** bg-card
- **Border radius:** rounded-full
- **Padding:** px-4 py-2

### 🎬 Animaciones

1. **Message Bubble Entrada:**
   - Fade + slide from bottom
   - Opacity 0 → 1
   - Y: 20 → 0

2. **Typing Indicator:**
```
● ● ● (bouncing dots)
```
- Aparece cuando el otro usuario está escribiendo
- Dots bounce animation

3. **Status Icon:**
- Sending → Delivered: Smooth transition
- Delivered → Read: Color change

4. **Scroll:**
- Auto-scroll a último mensaje
- Smooth behavior

### 🔄 Flujos

#### Flow: Abrir Messages desde Feed
```
Feed → Usuario toca [📱] en bottom nav
    ↓
MessagesLayout monta
    ↓
[Si selectedConversation]
    → Vista: CHAT directamente
[Si no]
    → Vista: INBOX
```

#### Flow: Abrir Chat desde Inbox
```
Usuario toca conversación
    ↓
setView("chat")
    ↓
Chat screen slide in
    ↓
Carga mensajes de esa conversación
    ↓
Auto-scroll al final
```

#### Flow: Enviar Mensaje
```
Usuario escribe en input
    ↓
[Typing indicator aparece para el otro]
    ↓
Usuario presiona [→]
    ↓
Mensaje se agrega a la lista
    ↓
Status: "sending" (🕐)
    ↓
Simula envío (500ms)
    ↓
Status: "delivered" (✓)
    ↓
Auto-scroll al nuevo mensaje
    ↓
Input se limpia
```

#### Flow: Búsqueda (Inbox)
```
Usuario escribe en search
    ↓
Filtro en tiempo real
    ↓
Conversaciones filtradas por nombre
    ↓
[Si no hay resultados]
    → "No se encontraron conversaciones"
```

#### Flow: Adjuntar Archivo
```
Usuario toca [📎]
    ↓
File picker aparece
    ↓
Usuario selecciona archivo
    ↓
Preview aparece en input area
    ↓
[Enviar] → Archivo se envía como mensaje
```

---

## 14. NOTIFICATIONS SCREEN

### 📍 Ubicación
**Archivo:** `src/components/Notifications.tsx`

### 🎨 Diseño

```
┌─────────────────────────────┐
│ [←]  Notificaciones         │
│                             │
│ ┌─────────────────────────┐ │
│ │ [Avatar][❤️]            │ │  ← Nueva (bg-primary/5)
│ │ @pizzalovers            │ │
│ │ le gustó tu publicación │ │
│ │ Hace 5 min         [📷] │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ [Avatar][➕]            │ │  ← Nueva
│ │ @sushimaster            │ │
│ │ comenzó a seguirte      │ │
│ │ Hace 15 min             │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ [Avatar][💬]            │ │  ← Leída (sin bg)
│ │ @burgerhouse            │ │
│ │ comentó: "¡Delicioso!"  │ │
│ │ Hace 1 hora        [📷] │ │
│ └─────────────────────────┘ │
│                             │
│  ... más notificaciones ... │
└─────────────────────────────┘
```

### 🎨 Elementos de Diseño

#### Header
- **Sticky:** top-0
- **Background:** bg-background/80 backdrop-blur-md
- **Border:** border-b border-border
- **Layout:** [Back] "Notificaciones"

#### Notification Item
```
┌─────────────────────────────┐
│ [Avatar+Badge] Content [Thumbnail]│
│                             │
│ @username                   │
│ Acción realizada            │
│ Hace X tiempo               │
└─────────────────────────────┘
```

**Avatar con Badge:**
```
┌───┐
│👤│  ← Avatar
└─┬─┘
  ❤️  ← Badge icon (bottom-right)
```

- **Avatar:** w-12 h-12, rounded-full
- **Badge:**
  - Position: absolute, -bottom-1, -right-1
  - Size: w-5 h-5
  - Background: bg-background
  - Border radius: rounded-full
  - Icon según tipo

**Content:**
- **Username:** font-semibold
- **Message:** text-sm, text-foreground
- **Time:** text-xs, text-muted-foreground

**Thumbnail (opcional):**
- **Size:** w-12 h-12
- **Border radius:** rounded-lg
- **Object-fit:** cover

**Estados:**
- **No leída:** bg-primary/5
- **Leída:** bg-transparent

### 🎨 Tipos de Notificaciones

#### 1. Like (❤️)
- **Icon:** Heart, fill-accent
- **Badge color:** bg-accent
- **Mensaje:** "le gustó tu publicación"
- **Thumbnail:** Imagen del post

#### 2. Comment (💬)
- **Icon:** MessageSquare
- **Badge color:** bg-primary
- **Mensaje:** "comentó: '[texto]'"
- **Thumbnail:** Imagen del post

#### 3. Follow (➕)
- **Icon:** UserPlus
- **Badge color:** bg-primary
- **Mensaje:** "comenzó a seguirte"
- **No thumbnail**

#### 4. Order (🔥)
- **Icon:** Flame
- **Badge color:** bg-accent
- **Mensaje:** "Tu pedido está en camino"
- **No thumbnail**

### 🎬 Animaciones

1. **Items Entrada:**
   - Fade + slide from left
   - `x: -20, opacity: 0 → x: 0, opacity: 1`
   - Stagger por item

2. **Hover:**
   - Background: hover:bg-card
   - Transition: 0.2s

3. **Badge Icon:**
   - Subtle pulse si es nueva (read: false)

### 🔄 Flujos

#### Flow: Abrir Notifications
```
Feed → Usuario toca [🔔] en bottom nav
    ↓
Notifications monta
    ↓
Carga notificaciones recientes
    ↓
Las no leídas tienen bg-primary/5
```

#### Flow: Marcar como Leída
```
Usuario toca notificación
    ↓
read: false → read: true
    ↓
Background color desaparece (fade)
    ↓
[Según tipo, navega a:]
    → Like/Comment: Abre ese post
    → Follow: Abre perfil del usuario
    → Order: Abre CheckoutTimeline
```

#### Flow: Regresar
```
Usuario toca [←]
    ↓
Notifications cierra
    ↓
Regresa a Feed (o pantalla anterior)
```

---

## 15. MUSIC PLAYER OVERLAY

### 📍 Ubicación
**Archivo:** `src/components/MusicPlayerOverlay.tsx`

### 🎨 Diseño

```
┌─────────────────────────────┐
│                             │  ← Backdrop
│  ┌─────────────────────────┐│
│  │     [Drag Handle]   [X] ││
│  │                         ││
│  │   [Album Art Circular]  ││
│  │                         ││
│  │   "Sonido Original"     ││
│  │    - Tacos El Rey       ││
│  │                         ││
│  │  ●═══════════○══════    ││  ← Progress
│  │  0:45           2:30    ││
│  │                         ││
│  │   [❤️]  [▶️]  [↗️]    ││  ← Controls
│  │                         ││
│  │  ───────────────────    ││
│  │                         ││
│  │  ¿Te gusta esta pista?  ││
│  │  [Usar en mi video]     ││
│  └─────────────────────────┘│
└─────────────────────────────┘
```

### 🎨 Elementos de Diseño

#### Backdrop
- **Background:** bg-black/60 backdrop-blur-sm
- **Click:** Cierra overlay

#### Overlay Container
- **Position:** fixed bottom-0
- **Animation:** Slide from bottom
- **Background:** bg-background
- **Border radius:** rounded-t-3xl
- **Max height:** 90vh

#### Drag Handle
- **Width:** w-12 h-1
- **Background:** bg-muted
- **Border radius:** rounded-full
- **Margin:** Centered, my-2

#### Close Button
- **Position:** Top-right
- **Style:** Circular, bg-card/80

#### Album Art
```
    ┌─────┐
   ╱       ╲
  │  Image  │  ← Circular, rotating
   ╲       ╱
    └─────┘
```

- **Size:** w-48 h-48
- **Border radius:** rounded-full
- **Shadow:** shadow-glow-lg
- **Animation:** Rotate lento si isPlaying

**Vinyl effect (opcional):**
- Anillos concéntricos
- Dot central

#### Music Info
- **Title:** text-xl font-bold, text-center
- **Artist:** text-muted-foreground, text-center
- **Margin:** mt-6 mb-8

#### Progress Bar
```
●═══════════○══════════
0:45               2:30
```

- **Container:** bg-muted, h-1, rounded-full
- **Fill:** bg-primary, rounded-full
- **Thumb:** Círculo w-3 h-3 bg-primary
- **Times:** text-xs text-muted-foreground

#### Controls Row
```
[❤️]      [▶️]      [↗️]
Like     Play      Share
```

- **Layout:** Flex, justify-center, gap-8
- **Like:**
  - Toggle: outline ↔ filled
  - Color: accent cuando liked
  
- **Play/Pause:**
  - Tamaño más grande (w-16 h-16)
  - bg-primary
  - Icon: Play o Pause
  - Hover: shadow-glow
  
- **Share:**
  - Abre ShareOverlay

#### Marketing Section
```
┌─────────────────────────────┐
│ ¿Te gusta esta pista?       │
│ Úsala en tu próximo video   │
│                             │
│  [Usar en mi video →]       │
└─────────────────────────────┘
```

- **Background:** bg-card/50
- **Border:** border-l-4 border-primary
- **Padding:** p-4
- **Button:** bg-primary, rounded-xl

### 🎬 Animaciones

1. **Overlay Entrada:**
   - Slide up: `y: 100% → y: 0`
   - Backdrop fade: `opacity: 0 → 1`

2. **Album Art:**
   - Rotate: `0deg → 360deg` (20s linear infinite)
   - Solo si `isPlaying = true`
   - Pause al tocar play/pause

3. **Play Button:**
   - Icon swap: Play ↔ Pause
   - Scale pulse al cambiar

4. **Progress Bar:**
   - Fill width aumenta gradualmente
   - Thumb se mueve con el fill
   - Smooth transition

5. **Like Button:**
   - Toggle: scale pulse
   - Color transition: white ↔ accent

6. **Drag to Close:**
   - Si drag down > 50px → Cierra overlay
   - Spring animation

### 🔄 Flujos

#### Flow: Abrir desde Feed
```
Feed → Usuario toca 🎵 [Música]
    ↓
MusicPlayerOverlay slide up
    ↓
Music info carga (nombre, artista)
    ↓
isPlaying: false (default)
```

#### Flow: Play/Pause
```
Usuario toca [▶️]
    ↓
[Si no está playing]
    → Icon cambia a Pause
    → Album art empieza a rotar
    → Progress bar empieza
    → isPlaying: true
[Si está playing]
    → Icon cambia a Play
    → Album art stop rotation
    → Progress bar pausa
    → isPlaying: false
```

#### Flow: Like
```
Usuario toca [❤️]
    ↓
[Si no liked]
    → Icon se llena (filled)
    → Color cambia a accent
    → Scale pulse
    → isLiked: true
[Si liked]
    → Icon vuelve a outline
    → Color vuelve a white
    → isLiked: false
```

#### Flow: Share
```
Usuario toca [↗️]
    ↓
ShareOverlay aparece encima
    ↓
Opciones de compartir
    ↓
[Compartir/Copiar]
    → Acción ejecuta
    → Toast confirmación
```

#### Flow: Usar en Video
```
Usuario toca [Usar en mi video]
    ↓
Navigate a create video screen (futuro)
    ↓
Música pre-seleccionada
```

#### Flow: Cerrar
```
Usuario toca [X] o backdrop
O drag down > 50px
    ↓
Overlay slide down
    ↓
Backdrop fade out
    ↓
isPlaying reset a false
    ↓
onClose() ejecuta
```

---

## 16. SHARE OVERLAY

### 📍 Ubicación
**Archivo:** `src/components/ShareOverlay.tsx`

### 🎨 Diseño

```
┌─────────────────────────────┐
│                             │  ← Backdrop
│  ┌─────────────────────────┐│
│  │ Compartir          [X]  ││
│  │                         ││
│  │ Enviar a:               ││
│  │ [María][Juan][Laura]... ││  ← Users scroll
│  │                         ││
│  │ Compartir en:           ││
│  │ [📋][📱][💬][📧]...   ││  ← Options grid
│  │ Copiar WhatsApp SMS     ││
│  │                         ││
│  │ Más opciones:           ││
│  │ • Denunciar             ││
│  │ • No me interesa        ││
│  │ • Descargar             ││
│  │ • Promocionar           ││
│  └─────────────────────────┘│
└─────────────────────────────┘
```

### 🎨 Elementos de Diseño

#### Backdrop
- **Background:** bg-black/60 backdrop-blur-sm

#### Overlay Container
- **Position:** fixed bottom-0
- **Max height:** 85vh
- **Background:** bg-background
- **Border radius:** rounded-t-3xl

#### Header
```
Compartir                [X]
```

- **Layout:** Space-between
- **Title:** text-lg font-bold
- **Close:** Circular button

#### User Selection (Horizontal Scroll)
```
[Avatar] [Avatar] [Avatar] → (scroll)
María    Juan     Laura
```

- **Layout:** Flex row, overflow-x-scroll
- **Avatar:** w-16 h-16, rounded-full
- **Name:** text-xs, text-center, mt-2
- **Selected state:**
  - Border: border-2 border-primary
  - Checkmark: Top-right badge

#### Share Options Grid
```
┌──┬──┬──┬──┐
│📋│📱│💬│📧│
├──┼──┼──┼──┤
│📱│📘│📷│✈️│
└──┴──┴──┴──┘
```

- **Grid:** 4 columns
- **Gap:** gap-4
- **Item:**
  - Size: w-full aspect-square
  - Background: bg-card
  - Border: border border-border
  - Border radius: rounded-2xl
  - Hover: hover:bg-muted

**Opción estructura:**
```
┌─────────┐
│  [Icon] │  ← Colored icon
│  Label  │
└─────────┘
```

### 📋 Share Options

#### Social/Apps
1. **Copiar enlace** 📋 (accent)
2. **WhatsApp** 💬 (green-500)
3. **SMS** 📱 (blue-500)
4. **Messenger** 💬 (blue-600)
5. **Instagram** 📷 (pink-500)
6. **Telegram** ✈️ (sky-500)
7. **Facebook** 📘 (blue-700)
8. **Correo** 📧 (gray-500)
9. **X** 🐦 (gray-900)
10. **Más** ⋯ (gray-600)

#### More Options (List)
```
• Denunciar          ⚠️
• No me interesa     👁️
• Descargar          ⬇️
• Promocionar        📈
• Velocidad          ⚡
• Receta             📖
• Ingredientes       🍴
```

- **Layout:** List vertical
- **Item:**
  - Icon (left)
  - Text
  - Hover: bg-muted/50

### 🎬 Animaciones

1. **Overlay Entrada:**
   - Slide up: `y: 100% → y: 0`
   - Spring animation

2. **User Avatar:**
   - Click: Scale tap 0.95
   - Selected: Border fade in + checkmark pop

3. **Share Option:**
   - Hover: Scale 1.05
   - Click: Scale tap 0.95

4. **Copiar enlace:**
   - Click: Icon change Copy → Check (2s)
   - Toast: "Enlace copiado"

### 🔄 Flujos

#### Flow: Abrir desde Feed
```
Feed → Usuario toca [↗️] Share
    ↓
ShareOverlay slide up
    ↓
Muestra opciones de compartir
```

#### Flow: Enviar a Usuario
```
Usuario toca avatar de amigo
    ↓
[Si no seleccionado]
    → Avatar border primary
    → Checkmark aparece
    → sharedTo array += userId
[Si seleccionado]
    → Border desaparece
    → Checkmark desaparece
    → sharedTo array -= userId
    ↓
[Opcional: Botón "Enviar"]
    → Envía a usuarios seleccionados
    → Toast "Compartido con X personas"
```

#### Flow: Copiar Enlace
```
Usuario toca [📋 Copiar enlace]
    ↓
navigator.clipboard.writeText(url)
    ↓
Icon: Copy → Check (2s)
    ↓
Toast: "Enlace copiado"
    ↓
Icon: Check → Copy (después de 2s)
```

#### Flow: Compartir en App
```
Usuario toca [💬 WhatsApp]
    ↓
Genera share URL para WhatsApp
    ↓
window.open(whatsappURL)
    ↓
[Si mobile] → Abre app nativa
[Si desktop] → Abre WhatsApp Web
```

#### Flow: More Options
```
Usuario toca [⋯ Más]
    ↓
Expande sección "Más opciones"
    ↓
Muestra lista de acciones
    ↓
Usuario selecciona acción:
    → Denunciar: Abre report modal
    → No me interesa: Hide content
    → Descargar: Download media
    → etc.
```

---

## 17. COMMENT OVERLAY

### 📍 Ubicación
**Archivo:** `src/components/CommentOverlay.tsx`

### 🎨 Diseño

```
┌─────────────────────────────┐
│                             │  ← Backdrop
│  ┌─────────────────────────┐│
│  │ 340 comentarios    [X]  ││
│  │                         ││
│  │ [Avatar] @foodlover     ││
│  │  ┌───────────────────┐  ││
│  │  │ ¡Se ve increíble! │  ││  ← Bubble
│  │  │ 😍 ¿Dónde puedo? │  ││
│  │  └───────────────────┘  ││
│  │  2h    ❤️ 145          ││
│  │                         ││
│  │ [Avatar] @chefmaster    ││
│  │  ┌───────────────────┐  ││
│  │  │ La presentación   │  ││
│  │  │ es espectacular! │  ││
│  │  └───────────────────┘  ││
│  │  5h    ❤️ 89           ││
│  │                         ││
│  │  ... más comentarios..  ││
│  │                         ││
│  │ ┌────────────────────┐  ││
│  │ │[😊] Comentar... [→]││  ← Input
│  │ └────────────────────┘  ││
│  └─────────────────────────┘│
└─────────────────────────────┘
```

### 🎨 Elementos de Diseño

#### Backdrop
- **Background:** bg-black/60 backdrop-blur-sm

#### Overlay Container
- **Position:** fixed bottom-0
- **Max height:** 85vh
- **Background:** bg-background
- **Border radius:** rounded-t-3xl
- **Layout:** Flex column

#### Header
```
340 comentarios              [X]
```

- **Layout:** Space-between
- **Title:** text-lg font-bold
- **Count:** toLocaleString() formatting

#### Comments List (ScrollArea)
- **Scroll:** Vertical
- **Padding:** px-6 py-4
- **Gap:** space-y-3

#### Comment Item
```
[Avatar]  @username
          ┌─────────────────┐
          │ Texto comentario│
          │ aquí...         │
          └─────────────────┘
          2h  ❤️ 145  Responder
```

**Avatar:**
- **Size:** w-10 h-10
- **Shape:** rounded-full

**Bubble:**
- **Background:** bg-card
- **Border radius:** rounded-2xl rounded-tl-none
- **Padding:** px-4 py-3
- **Max width:** Sin límite (se adapta)

**Username:**
- **Font:** font-semibold
- **Size:** text-xs
- **Margin:** mb-0.5

**Comment text:**
- **Color:** text-foreground
- **Size:** text-sm
- **Line height:** Normal

**Actions row:**
- **Layout:** Flex, gap-3
- **Buttons:**
  - Time (text-xs text-muted-foreground)
  - Like count con ❤️ icon
  - "Responder" button (hover effect)

#### Input Bar (Fixed Bottom)
```
┌───────────────────────────────┐
│ [😊] Añade un comentario... [→]│
└───────────────────────────────┘
```

- **Position:** Sticky bottom
- **Background:** bg-background
- **Border:** border-t border-border
- **Padding:** p-4

**Input:**
- **Background:** bg-card
- **Border radius:** rounded-full
- **Padding:** px-4 py-2
- **Flex:** flex-1

**Emoji button:**
- **Icon:** Smile
- **Position:** Left side

**Send button:**
- **Background:** bg-primary (when has text)
- **Disabled:** text-muted-foreground (when empty)
- **Shape:** Circular
- **Icon:** Send

### 🎬 Animaciones

1. **Overlay Entrada:**
   - Slide up: `y: 100% → y: 0`
   - Backdrop fade in

2. **Comment Items:**
   - Fade + slide up
   - `y: 20, opacity: 0 → y: 0, opacity: 1`
   - Stagger

3. **Like Button:**
   - Click: Heart scale pulse
   - Color fill transition

4. **Send Button:**
   - Enabled/Disabled state transition
   - Click: Brief scale

5. **New Comment:**
   - Aparece con slide up animation
   - Se agrega al final de la lista
   - Auto-scroll al nuevo comment

### 🔄 Flujos

#### Flow: Abrir desde Feed
```
Feed → Usuario toca [💬] Comments
    ↓
CommentOverlay slide up
    ↓
Carga comentarios del post
    ↓
commentCount mostrado en header
```

#### Flow: Like en Comentario
```
Usuario toca ❤️ en comentario
    ↓
[Si no liked]
    → Icon fill con accent
    → Count +1
    → Brief animation
[Si liked]
    → Icon vuelve a outline
    → Count -1
```

#### Flow: Escribir Comentario
```
Usuario toca input
    ↓
Input focus
    ↓
Usuario escribe texto
    ↓
[Send button se activa]
    ↓
Usuario toca [→]
    ↓
Nuevo comentario se agrega
    ↓
Comentario aparece al final
    ↓
Auto-scroll al nuevo comment
    ↓
Input se limpia
    ↓
Brief success feedback
```

#### Flow: Responder
```
Usuario toca "Responder"
    ↓
Input focus
    ↓
Placeholder: "Respondiendo a @username"
    ↓
Usuario escribe
    ↓
[Enviar] → Respuesta anidada
```

#### Flow: Cerrar
```
Usuario toca [X] o backdrop
    ↓
Overlay slide down
    ↓
onClose() ejecuta
    ↓
Regresa a Feed
```

---

## 18. HOMEPAGE (LANDING)

### 📍 Ubicación
**Archivo:** `src/pages/Homepage.tsx`

### 🎨 Diseño

La Homepage es una landing page compuesta por múltiples secciones:

```
┌─────────────────────────────┐
│         NAVBAR              │  ← Sticky
├─────────────────────────────┤
│                             │
│          HERO               │  ← Full viewport
│                             │
├─────────────────────────────┤
│        FEATURES             │
├─────────────────────────────┤
│      HOW IT WORKS           │
├─────────────────────────────┤
│        ABOUT US             │
├─────────────────────────────┤
│          JOIN               │
├─────────────────────────────┤
│      APP DOWNLOAD           │
├─────────────────────────────┤
│        CONTACT              │
├─────────────────────────────┤
│          MORE               │
├─────────────────────────────┤
│         FOOTER              │
└─────────────────────────────┘
```

### 🎨 Componentes

#### 1. Navbar
- **Position:** Sticky top
- **Background:** bg-background/95 backdrop-blur
- **Items:** Logo, Links (Home, Features, Contact, etc.)
- **CTA:** "Comenzar" button

#### 2. Hero
- **Background:** Gradient
- **Content:**
  - Headline grande
  - Subtitle
  - CTA buttons
  - Hero image

#### 3. Features
- **Layout:** Grid de features
- **Cards:** Icon + Title + Description
- **Animation:** Fade in on scroll

#### 4. How It Works
- **Layout:** Timeline o steps
- **Steps:** 1, 2, 3 con iconos
- **Description:** Texto explicativo

#### 5. About Us
- **Content:** Texto + imágenes
- **Stats:** Números destacados

#### 6. Join
- **CTA:** Call to action para registrarse
- **Buttons:** Sign up / Learn more

#### 7. App Download
- **Badges:** App Store + Google Play
- **Screenshot:** Preview de la app

#### 8. Contact
- **Form:** Nombre, Email, Mensaje
- **Social links:** Instagram, Twitter, etc.

#### 9. More
- **Extra info:** FAQs, links adicionales

#### 10. Footer
- **Links:** Legal, Privacy, Terms
- **Copyright:** © 2024 Foodtook

### 🎬 Animaciones

1. **Scroll Reveal:**
   - Sections fade in cuando entran viewport
   - Intersection Observer

2. **Navbar:**
   - Background blur en scroll
   - Shadow aparece al hacer scroll

3. **Hero:**
   - Headline: Slide + fade
   - CTA: Scale on hover

4. **Feature Cards:**
   - Hover: Lift effect
   - Icon: Subtle animation

### 🔄 Flujos

#### Flow: Navegación
```
Usuario entra a site (/)
    ↓
Homepage carga
    ↓
Scroll por secciones
    ↓
Click en CTA
    ↓
[Comenzar] → Auth Screen
```

---

## 🔄 FLUJOS GLOBALES

### Flow: Inicio de la App (Primera vez)
```
App carga
    ↓
LoadingScreen (1.35s)
    ↓
Onboarding (4 slides)
    ↓
[Saltar o Completar]
    ↓
Auth (Login/Signup)
    ↓
[Si primer login] → SelectRole
[Si tiene rol] → Feed directamente
```

### Flow: Login Normal
```
App carga
    ↓
LoadingScreen
    ↓
[Usuario ya vio onboarding]
    ↓
Auth directamente
    ↓
Feed
```

### Flow: Navegación Principal
```
Feed (Home)
  ├→ Shop (bottom nav)
  ├→ Notifications (bottom nav)
  ├→ Messages (bottom nav)
  ├→ Profile (bottom nav)
  │
  ├→ Restaurant Profile (from video)
  │   ├→ Restaurant Menu
  │   │   ├→ Product Detail
  │   │   └→ Checkout Timeline
  │   └→ Messages
  │
  ├→ Music Player (from music)
  ├→ Comments (from comments button)
  └→ Share (from share button)
```

---

## 📝 NOTAS FINALES

- **Todas las animaciones** usan framer-motion para consistencia
- **Colores** siguen el design system (primary, accent, muted, etc.)
- **Responsive:** Diseños optimizados para mobile-first
- **Safe areas:** Consideradas para notch y home indicator
- **Scroll behavior:** Smooth scrolling donde aplica
- **Loading states:** Spinners y skeletons para async operations
- **Error handling:** Toasts para feedback al usuario
- **Accessibility:** Semantic HTML y ARIA labels
