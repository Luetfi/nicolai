interface PictureProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding?: 'async' | 'sync' | 'auto';
  className?: string;
  sizes?: string;
}

/**
 * <picture>-Wrapper mit WebP-Source und JPG/PNG-Fallback.
 * Erwartet, dass eine .webp-Sibling-Datei existiert (generiert via scripts/generate-webp.mjs).
 */
export function Picture({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  fetchPriority = 'auto',
  decoding = 'async',
  className,
  sizes,
}: PictureProps) {
  const webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');
  const isOptimizable = webpSrc !== src;

  if (!isOptimizable) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        className={className}
        sizes={sizes}
      />
    );
  }

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" sizes={sizes} />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        className={className}
        sizes={sizes}
      />
    </picture>
  );
}
