
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true });

export async function compressVideo(file) {
  if (!ffmpeg.isLoaded()) await ffmpeg.load();
  ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(file));
  await ffmpeg.run('-i', 'input.mp4', '-vf', 'scale=1280:-1', '-b:v', '1M', 'output.mp4');
  const data = ffmpeg.FS('readFile', 'output.mp4');
  return new Blob([data.buffer], { type: 'video/mp4' });
}


export async function compressImage(file, maxWidth = 1280, quality = 0.8) {
    const imageBitmap = await createImageBitmap(file);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const scale = Math.min(maxWidth / imageBitmap.width, 1);
    canvas.width = imageBitmap.width * scale;
    canvas.height = imageBitmap.height * scale;
    ctx.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);

    return new Promise((resolve) => {
        canvas.toBlob(
        (blob) => resolve(blob),
        "image/jpeg",
        quality // 0 ~ 1
        );
    });
}
  