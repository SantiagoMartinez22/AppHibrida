import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'co.edu.upb.vigilog',
  appName: 'VigiLog',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config
