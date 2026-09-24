import { getImage } from 'astro:assets';

// Lesson images live in src/assets so the build converts them to WebP,
// resizes them for each screen, and fails if a referenced file is missing.
// Each page globs its own folder (import.meta.glob needs a literal path)
// and passes the result here.

const IMAGE_SIZES = '(max-width: 767px) calc(100vw - 32px), 760px';

export type LessonImageModules = Record<string, { default: ImageMetadata }>;

/**
 * Optimizes every image in a lesson folder and returns a lookup that gives
 * the src/srcset/size attributes for an image, by file name without ".png".
 */
export async function createLessonImages(modules: LessonImageModules) {
  const images = new Map(
    await Promise.all(
      Object.entries(modules).map(async ([path, mod]) => {
        const name = path.split('/').pop()!.replace(/\.png$/, '');
        const image = await getImage({
          src: mod.default,
          widths: [480, 960, 1440],
          sizes: IMAGE_SIZES,
          format: 'webp',
        });
        return [name, image] as const;
      }),
    ),
  );

  return function img(name: string) {
    const image = images.get(name);
    if (!image) throw new Error(`Missing lesson image: ${name}.png`);
    return {
      src: image.src,
      srcset: image.srcSet.attribute,
      sizes: IMAGE_SIZES,
      width: image.attributes.width,
      height: image.attributes.height,
    };
  };
}
