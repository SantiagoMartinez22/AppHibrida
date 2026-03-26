# VigiLog Login — Importar a Figma

Este archivo HTML replica el diseño de la pantalla de login de VigiLog para importarlo a Figma.

## Opción 1: Plugin html.to.design (recomendado)

1. Instala el plugin [html.to.design](https://www.figma.com/community/plugin/1159123024924461424/html-to-design) en Figma.
2. Sirve el archivo HTML localmente:
   ```bash
   npx serve design-figma -p 3000
   ```
3. Abre en el navegador: http://localhost:3000/vigilog-login.html
4. En Figma: Plugins → html.to.design → Import from URL
5. Pega la URL: `http://localhost:3000/vigilog-login.html`
6. El plugin convertirá el HTML en capas de Figma.

## Opción 2: Usar como referencia

Abre `vigilog-login.html` en el navegador para ver el diseño exacto y recrearlo manualmente en Figma.

## Especificaciones de diseño

| Elemento | Valor |
|----------|-------|
| **Fondo** | `#F0F4F8` |
| **Primary (azul)** | `#4A4AFB` |
| **Texto principal** | `#1E293B` |
| **Texto secundario** | `#64748B` |
| **Borde inputs** | `#E2E8F0` |
| **Card** | Blanco, `border-radius: 20px`, sombra suave |
| **Fuente** | Inter (sans-serif) |
