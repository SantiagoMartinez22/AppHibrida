#!/usr/bin/env node
import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

const svgSource = readFileSync(join(publicDir, 'vite.svg'))

async function generateIcons() {
  // Standard icons
  await sharp(svgSource)
    .resize(192, 192)
    .png()
    .toFile(join(publicDir, 'icon-192x192.png'))

  await sharp(svgSource)
    .resize(512, 512)
    .png()
    .toFile(join(publicDir, 'icon-512x512.png'))

  // Maskable icon: add padding so content is in safe zone (center 80%)
  const maskableSvg = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="#0f172a"/>
      <g transform="translate(51, 51) scale(0.8)">
        ${svgSource.toString().replace(/<svg[^>]*>|<\/svg>/g, '').trim()}
      </g>
    </svg>
  `
  await sharp(Buffer.from(maskableSvg))
    .resize(512, 512)
    .png()
    .toFile(join(publicDir, 'icon-maskable-512x512.png'))

  // Favicon 32x32
  await sharp(svgSource)
    .resize(32, 32)
    .png()
    .toFile(join(publicDir, 'favicon-32x32.png'))

  console.log('Icons generated: icon-192x192.png, icon-512x512.png, icon-maskable-512x512.png, favicon-32x32.png')
}

generateIcons().catch(console.error)
