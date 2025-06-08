import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://your-github-username.github.io/your-repo-name/", // Replace with your GitHub username and repository name
})
