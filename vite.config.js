import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        open: true, // Ouvre le navigateur automatiquement quand vous lancez `npx vite`
        logLevel: 'info', // Affiche les messages d'info dans la console
    }
});