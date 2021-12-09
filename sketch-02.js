import canvasSketch from 'canvas-sketch';
import math from 'canvas-sketch-util/math';
import random from 'canvas-sketch-util/random';
const canvas = document.querySelector('canvas');

const settings = {
  dimensions: [1080, 1080],
  canvas: canvas,
};

const degToRad = (degrees) => {
  return (degrees / 180) * Math.PI;
};

const sketch = () => {
  return ({ canvas, context, width, height }) => {
    canvas.fillStyle = 'white';
    canvas.fillRect(0, 0, width, height);

    canvas.fillStyle = 'black';

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;
    const radius = width * 0.3;
    let x, y;

    const num = 30;

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      canvas.save();

      canvas.translate(x, y);
      canvas.rotate(-angle);
      canvas.scale(random.range(0.2, 0.5), random.range(0.2, 0.5));

      canvas.beginPath();
      canvas.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
      canvas.fill();

      canvas.restore();

      canvas.save();
      canvas.translate(cx, cy);
      canvas.rotate(-angle);

      canvas.lineWidth = 20;

      canvas.beginPath();
      canvas.arc(
        0,
        0,
        radius * random.range(0.7, 1.3),
        slice * random.range(1, -8),
        slice * random.range(1, 5)
      );
      canvas.stroke();

      canvas.restore();
    }
  };
};

canvasSketch(sketch, settings);
