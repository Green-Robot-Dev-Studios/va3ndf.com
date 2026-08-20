import baseService from 'astro/assets/services/sharp';
import type { LocalImageService } from 'astro';
import type { FormatEnum } from 'sharp';

/**
 * Wraps Astro's sharp service with two behaviours it doesn't have on its own.
 *
 * 1. A build-time size cap. Source photos here are straight off a phone —
 *    3024x4032 and up — and the stock service resizes by width only, so a
 *    markdown image with no explicit width ships at full resolution. We clamp
 *    the long edge instead, which is what actually bounds the byte count for
 *    the portrait shots that dominate the builds.
 *
 * 2. Real cover-cropping. The stock `transform` ignores `height` entirely, so
 *    asking for 1200x630 returns a 1200-wide image of the original aspect
 *    ratio. Social cards need a genuine crop, so when a caller supplies both
 *    dimensions we crop to them using sharp's attention strategy, which keeps
 *    the subject (a face, the object on the bench) in frame.
 */

/** Cap for images whose width the caller chose — heroes, thumbnails, cards. */
const MAX_EDGE_REQUESTED = 1600;

/**
 * Cap for images with no requested width, i.e. every `![](…)` in a post body.
 * Those render in the 608px prose column, so 1280 is comfortably past 2x.
 */
const MAX_EDGE_INTRINSIC = 1280;

const isImportedImage = (src: unknown): src is { width: number; height: number } =>
	typeof src === 'object' && src !== null && 'width' in src && 'height' in src;

const service: LocalImageService = {
	...baseService,

	validateOptions(options, imageConfig) {
		const validated = baseService.validateOptions!(options, imageConfig) as typeof options;

		// Both dimensions given means "crop to this box" — leave it alone.
		if (validated.height || !isImportedImage(validated.src)) return validated;

		const { width: naturalWidth, height: naturalHeight } = validated.src;
		if (!naturalWidth || !naturalHeight) return validated;

		const requested = validated.width ?? naturalWidth;
		const cap = validated.width ? MAX_EDGE_REQUESTED : MAX_EDGE_INTRINSIC;
		const longEdge = Math.max(requested, requested * (naturalHeight / naturalWidth));

		if (longEdge > cap) {
			validated.width = Math.round(requested * (cap / longEdge));
		}

		return validated;
	},

	async transform(inputBuffer, transformOptions, config) {
		const transform = transformOptions as { width?: number; height?: number };

		// Only a caller asking for both dimensions wants a crop; everything else
		// falls through to the stock behaviour.
		if (!transform.width || !transform.height) {
			return baseService.transform(inputBuffer, transformOptions, config);
		}

		const sharp = (await import('sharp')).default;
		const format = ((transformOptions as { format?: string }).format ??
			'webp') as keyof FormatEnum;
		const quality = (transformOptions as { quality?: number }).quality;

		const pipeline = sharp(inputBuffer, { failOnError: false, pages: -1 })
			.rotate()
			.resize({
				width: Math.round(transform.width),
				height: Math.round(transform.height),
				fit: 'cover',
				position: sharp.strategy.attention,
			})
			.toFormat(format, { quality: typeof quality === 'number' ? quality : undefined });

		const { data, info } = await pipeline.toBuffer({ resolveWithObject: true });
		return { data, format: info.format as never };
	},
};

export default service;
