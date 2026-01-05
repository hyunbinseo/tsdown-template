import { defineConfig } from 'tsdown';

export default defineConfig({
	format: ['esm'],
	platform: 'neutral',
	exports: true,
});
