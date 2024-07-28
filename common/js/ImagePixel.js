export function ImagePixel(path, w, h, ratio) {
  return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const width = w;
      const height = h;
      canvas.width = width;
      canvas.height = height;

      const image = new Image();
      image.src = path;
      image.addEventListener('load', () => {
          ctx.drawImage(image, 0, 0);
          const data = ctx.getImageData(0, 0, width, height).data;
          const position = [];
          const color = [];
          const alpha = [];

          for (let y = 0; y < height; y += ratio) {
              for (let x = 0; x < width; x += ratio) {
                  const index = (y * width + x) * 4;
                  const r = data[index] / 255;
                  const g = data[index + 1] / 255;
                  const b = data[index + 2] / 255;
                  const a = data[index + 3] / 255;

                  const pX = x - width / 2;
                  const pY = -(y - height / 2);
                  const pZ = 0;

                  position.push(pX, pY, pZ), color.push(r, g, b), alpha.push(a);
              }
          }

          resolve({ position, color, alpha });
      });
  });
}