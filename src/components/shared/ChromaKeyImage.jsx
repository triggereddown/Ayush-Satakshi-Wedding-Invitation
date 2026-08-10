import { useEffect, useState } from 'react';

/**
 * ChromaKeyImage
 * Dynamically removes solid background colors using HTML5 Canvas.
 * Supports Green-Screen (#00FF00), Magenta-Screen (#FF00FF), or RGB tolerance keying.
 * Preserves black hair, skin tones, white clothes, and jewelry.
 */
export function ChromaKeyImage({
  src,
  alt,
  className,
  keyColor = { r: 0, g: 255, b: 0 },
  mode = 'auto',
  tolerance = 60,
  ...props
}) {
  const [processedSrc, setProcessedSrc] = useState(src);

  useEffect(() => {
    let active = true;
    if (!src) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        const isMagentaMode = mode === 'magenta' || (keyColor.r > 200 && keyColor.b > 200 && keyColor.g < 50);

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          let removePixel = false;

          if (isMagentaMode) {
            // Magenta screen: High Red, High Blue, Low Green
            if (r > 140 && b > 140 && g < 110) {
              removePixel = true;
            }
          } else {
            // Green screen (default): High Green dominant over Red & Blue
            if (g > 120 && g > (r * 1.2) && g > (b * 1.2)) {
              removePixel = true;
            }
          }

          // Fallback Euclidean distance check
          const dist = Math.sqrt(
            Math.pow(r - keyColor.r, 2) +
            Math.pow(g - keyColor.g, 2) +
            Math.pow(b - keyColor.b, 2)
          );
          if (dist < tolerance) {
            removePixel = true;
          }

          if (removePixel) {
            data[i + 3] = 0; // Set Alpha to 0 (make fully transparent)
          }
        }

        ctx.putImageData(imgData, 0, 0);
        if (active) {
          setProcessedSrc(canvas.toDataURL());
        }
      } catch (err) {
        console.warn("ChromaKey error:", err);
        if (active) setProcessedSrc(src);
      }
    };

    img.onerror = () => {
      if (active) setProcessedSrc(src);
    };

    img.src = src;

    return () => {
      active = false;
    };
  }, [src, keyColor.r, keyColor.g, keyColor.b, mode, tolerance]);

  return <img src={processedSrc} alt={alt} className={className} {...props} />;
}
