function getImageBackgroundColor(imageUrl: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject('Failed to get canvas context');
        return;
      }
      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.src = imageUrl;
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        const pixelData = ctx.getImageData(0, 0, 1, 1).data;
        const [red, green, blue] = pixelData;
        const hexCode = rgbToHex(red, green, blue);
        resolve(hexCode);
      };
  
      image.onerror = () => {
        reject('Failed to load image');
      };
    });
  }
  
  function rgbToHex(r: number, g: number, b: number): string {
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  }
  
  export default getImageBackgroundColor;
  