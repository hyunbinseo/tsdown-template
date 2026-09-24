import { defineConfig } from 'tsdown';

export default defineConfig({
	dts: true,
	format: ['esm'],
	target: ['baseline-widely-available', 'node24'],
	platform: 'neutral', // 'node' if src imports built-ins (e.g. node:fs)
	exports: true,
	publint: true,
	attw: { profile: 'esm-only' },
});
