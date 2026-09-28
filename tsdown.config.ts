import { defineConfig } from 'tsdown';

export default defineConfig({
	dts: true,
	format: ['esm'],
	target: ['es2023'], // sync with tsconfig.lib.json's lib (if used)
	platform: 'neutral', // 'node' if library uses Node built-ins or globals
	exports: true,
	publint: true,
	attw: { profile: 'esm-only' },
});
