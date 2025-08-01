// src/components/panel/hook/compress.js

let ffmpegInstance = null;
let fetchFileFn = null;

async function getFFmpeg() {
    if (window.FFmpeg) {
      return window.FFmpeg;
    }
    // 動態載入 CDN
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@ffmpeg/ffmpeg@0.12.6/dist/ffmpeg.min.js";
    document.body.appendChild(script);
    await new Promise((resolve) => (script.onload = resolve));
  
    const { createFFmpeg, fetchFile } = FFmpeg;
    const ffmpeg = createFFmpeg({ log: true });
    if (!ffmpeg.isLoaded()) await ffmpeg.load();
  
    window.FFmpeg = { ffmpeg, fetchFile }; // cache
    return window.FFmpeg;
  }
  

// 圖片壓縮
export async function compressImage(file, maxWidth = 1280, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const scale = Math.min(maxWidth / img.width, 1);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => resolve(blob),
          "image/jpeg",
          quality
        );
      };
      img.onerror = reject;
      img.src = event.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// 影片壓縮
export async function compressVideo(file) {
  const { ffmpeg, fetchFile } = await getFFmpeg();
  ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(file));
  await ffmpeg.run('-i', 'input.mp4', '-vf', 'scale=1280:-1', '-b:v', '1M', 'output.mp4');
  const data = ffmpeg.FS('readFile', 'output.mp4');
  return new Blob([data.buffer], { type: 'video/mp4' });
}
