const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const getRadiant = (angle) => {
  return (Math.PI * angle) / 180;
};

const sketch = () => {
  return ({ frame, context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const w = width * 0.95;
    const h = height * 0.95;
    const hs = w / 40;

    const cols = Math.floor(w / (3 * hs));
    const rows = Math.floor(h / (Math.cos(getRadiant(30)) * hs));
    const numCells = rows * cols;

    const tx = (width - w) * 0.5;
    const ty = (height - h) * 0.5;

    const getPosition = (a) => {
      return [hs * Math.cos(getRadiant(a)), hs * Math.sin(getRadiant(a))];
    };
    const drawHexagon = () => {
      const hexagon = new Path2D();
      for (let i = 0; i < 6; i++) {
        if (i === 0) {
          hexagon.moveTo(...getPosition(0));
          continue;
        }
        hexagon.lineTo(...getPosition(i * 60));
      }
      return hexagon;
    };

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = hs * 3 * col;
      const y = Math.cos(getRadiant(30)) * hs * row;

      const noise = random.noise3D(x, y, frame * 10, 0.001, 1);
      const scale = math.mapRange(noise, -1, 1, 0, 1);

      context.save();
      context.translate(tx + x + hs, ty + y + hs);
      if (row % 2 === 1) context.translate((3 / 2) * hs, 0);
      context.scale(scale, scale);
      context.fillStyle = 'black';
      context.fill(drawHexagon());
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
