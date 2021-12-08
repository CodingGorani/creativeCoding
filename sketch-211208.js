const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080],
};

const getRadiant = (angle) => {
  return (Math.PI * angle) / 180;
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const w = width * 0.8;
    const h = height * 0.8;
    const hs = w / 60;

    const cols = w / (3 * hs);
    const rows = Math.floor(h / (Math.cos(getRadiant(30)) * hs));
    const numCells = rows * cols;

    const tx = (width - w) * 0.5;
    const ty = (height - h) * 0.5;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = hs * 3 * col;
      const y = Math.cos(getRadiant(30)) * hs * row;

      const getPosition = (a) => {
        return [hs * Math.cos(getRadiant(a)), hs * Math.sin(getRadiant(a))];
      };

      context.save();

      context.translate(tx, ty);
      context.translate(x, y);
      if (row % 2 === 1) context.translate((3 / 2) * hs, 0);
      if (Math.random() < 0.1) {
        context.scale(0.8, 0.8);
        console.log(col, row);
      }
      context.beginPath();
      context.moveTo(...getPosition(0));
      context.lineTo(...getPosition(60));
      context.lineTo(...getPosition(120));
      context.lineTo(...getPosition(180));
      context.lineTo(...getPosition(240));
      context.lineTo(...getPosition(300));
      context.lineTo(...getPosition(360));
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
