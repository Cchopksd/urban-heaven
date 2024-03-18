import { defineConfig } from 'vite';
import fs from 'fs';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		// https: {
		// 	key: fs.readFileSync('./ssl/private-key.key'),
		// 	cert: fs.readFileSync('./ssl/urban-heaven_me.crt'),
		// 	ca: fs.readFileSync('./ssl/urban-heaven_me.ca-bundle'),
		// },
		watch: {
			usePolling: true,
		},
		host: true,
		strictPort: true,
		port: 5173, // you can replace this port with any port
	},
});
