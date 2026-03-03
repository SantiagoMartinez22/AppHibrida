<p align="center">
  <img src="https://img.shields.io/badge/VigiLog-Registro_Digital-6366F1?style=for-the-badge&logo=book&logoColor=white" alt="VigiLog" />
</p>

<h1 align="center">VigiLog</h1>
<p align="center">
  <strong>Aplicación híbrida (SPA)</strong> para digitalizar el registro de vigilancia en propiedad horizontal.
</p>
<p align="center">
  Reemplaza el libro físico por un flujo digital de ingreso, registro de visitantes, consulta y entrega de turno.
</p>

---

## Tecnologías

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/SCSS-1.97-CC6699?style=flat-square&logo=sass&logoColor=white" alt="SCSS" />
  <img src="https://img.shields.io/badge/Zustand-5.0-000?style=flat-square&logo=zustand&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/React_Router-6.28-CA4245?style=flat-square&logo=react-router&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Radix_UI-Primitives-000?style=flat-square&logo=radix-ui&logoColor=white" alt="Radix UI" />
  <img src="https://img.shields.io/badge/Sonner-Toasts-000?style=flat-square&logo=sonner&logoColor=white" alt="Sonner" />
  <img src="https://img.shields.io/badge/ESLint-9.13-4B32C3?style=flat-square&logo=eslint&logoColor=white" alt="ESLint" />
</p>

| Tecnología | Uso |
|------------|-----|
| **React** | UI y componentes |
| **TypeScript** | Tipado estático |
| **Vite** | Build y dev server |
| **Tailwind + SCSS** | Estilos y tokens |
| **Zustand** | Estado global + persistencia en `localStorage` |
| **React Router** | Navegación y rutas protegidas |
| **Radix UI** | Componentes accesibles (Label, Slot) |
| **Sonner** | Notificaciones toast |
| **React Icons** | Iconografía (Feather Icons) |

---

## Requisitos previos

- **Node.js** ≥ 18
- **npm** ≥ 9 (o pnpm/yarn)

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/vigilog.git
cd vigilog

# Instalar dependencias
npm install
```

---

## Cómo ejecutar

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

### Build de producción

```bash
npm run build
```

Genera la carpeta `dist/` con los archivos estáticos listos para desplegar.

### Vista previa del build

```bash
npm run preview
```

Sirve el build de producción localmente para probar antes de desplegar.

### Linting

```bash
npm run lint
```

Ejecuta ESLint sobre el código.

---

## Scripts disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| `dev` | `npm run dev` | Servidor de desarrollo con HMR |
| `build` | `npm run build` | Compila TypeScript y genera build de producción |
| `preview` | `npm run preview` | Sirve el build de producción localmente |
| `lint` | `npm run lint` | Ejecuta ESLint |

---

## Uso de la aplicación

### 1. Inicio de sesión

- En la pantalla principal elige el rol: **Vigilante** o **Administrador**.
- Ingresa **usuario** (ej: `vigilante.noche`, `admin.principal`).
- Ingresa **PIN de 4 dígitos**.
- Haz clic en **Continuar**.

### 2. Rol Vigilante

| Acción | Ruta | Descripción |
|--------|------|-------------|
| **Dashboard** | `/guard` | Resumen del día, accesos rápidos |
| **Nuevo visitante** | `/guard/register` | Formulario de registro de visitante |
| **Lista de visitantes** | `/guard/visitors` | Ver activos e historial, buscar, dar salida |
| **Detalle de visitante** | `/guard/visitors/:id` | Ver datos completos y dar salida |
| **Entrega de turno** | Dashboard → "Registrar entrega de turno" | Registra el cierre en bitácora y cierra sesión |

### 3. Rol Administrador

| Acción | Ruta | Descripción |
|--------|------|-------------|
| **Dashboard** | `/admin` | Últimos registros, entregas de turno, resumen |
| **Lista de visitantes** | `/admin/visitors` | Activos, historial y estadísticas |
| **Detalle de visitante** | `/admin/visitors/:id` | Ver datos completos (sin dar salida) |

### 4. Herramientas y funcionalidades

#### Registro de visitantes
- Nombre del visitante
- Destino / a quién visita
- Observación opcional
- Registrado por (vigilante activo, automático)

#### Lista de visitantes (Vigilante)
- Pestañas: **Activos** | **Historial**
- Búsqueda por nombre, destino o vigilante
- Botón **Dar salida** en visitantes activos

#### Lista de visitantes (Admin)
- Pestañas: **Activos** | **Historial** | **Estadísticas**
- Búsqueda por nombre, destino o vigilante
- **Estadísticas**: gráfico de barras por día y calendario mensual

#### Resumen del día (ambos roles)
- **Registros**: total del día
- **En sitio**: visitantes activos
- **Última hora**: registros recientes

#### Entrega de turno
- Solo vigilante
- Registra en bitácora y cierra sesión
- Visible en historial de entregas del admin

#### Navegación
- **Móvil**: barra inferior con Inicio, Visitantes, Salir
- **Escritorio**: barra superior con mismo menú
- **Salir**: cierra sesión (con o sin entrega de turno)

---

## Estructura del proyecto

```
src/
├── components/
│   ├── atoms/          # Botones, inputs, labels, badges, etc.
│   ├── molecules/      # FormField, VisitorCard, StatCard, modales, etc.
│   ├── organisms/      # VisitorForm, DashboardStats, RoleSelector
│   └── templates/      # PageHeader, BottomNavBar
├── pages/
│   ├── Home.tsx        # Login
│   ├── guard/          # Dashboard, registro, lista, detalle
│   └── admin/          # Dashboard, lista, detalle
├── store/
│   ├── authStore.ts    # Sesión y login
│   ├── visitorStore.ts # Visitantes (CRUD)
│   └── handoverStore.ts# Entregas de turno
├── router/
│   └── index.tsx       # Rutas y protección por rol
├── types/
│   └── index.ts        # Tipos globales
├── lib/
│   └── utils.ts        # Utilidades (cn, etc.)
├── styles/             # SCSS y tokens
├── App.tsx
└── main.tsx
```

---

## Persistencia

Los datos se guardan en **localStorage** mediante Zustand:

| Clave | Contenido |
|-------|-----------|
| `vigilog-auth` | Sesión y mensajes de estado |
| `vigilog-visitors` | Registros de visitantes |
| `vigilog-handovers` | Entregas de turno |

---

## Rutas

| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/` | Público | Login |
| `/guard` | Vigilante | Dashboard vigilante |
| `/guard/register` | Vigilante | Registro de visitante |
| `/guard/visitors` | Vigilante | Lista de visitantes |
| `/guard/visitors/:id` | Vigilante | Detalle de visitante |
| `/admin` | Admin | Dashboard admin |
| `/admin/visitors` | Admin | Lista de visitantes |
| `/admin/visitors/:id` | Admin | Detalle de visitante |
| `/dashboard` | Autenticado | Redirige a `/guard` o `/admin` según rol |

---

## Licencia

Proyecto privado. 

