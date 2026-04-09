import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isGitHubActionsBuild = process.env.GITHUB_ACTIONS === 'true'

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [react()],
  base: isGitHubActionsBuild ? '/regnumdecimarum-web/' : '/',
}))
