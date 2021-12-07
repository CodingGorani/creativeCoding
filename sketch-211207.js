const canvasSketch = require('canvas-sketch');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [1080, 1080],
  animation: true,
};

const params = {
  start: { x: 0, y: 0 },
  end: { x: 1080, y: 1080 },
  cp1: { x: 540, y: 540 },
  cp2: { x: 540, y: 540 },
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    const { start, end, cp1, cp2 } = params;

    context.save();
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    context.stroke();
    context.restore();
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({ title: 'Points' });
  folder.addInput(params, 'start', {
    x: { min: 0, max: 1080 },
    y: { min: 0, max: 1080 },
  });
  folder.addInput(params, 'end', {
    x: { min: 0, max: 1080 },
    y: { min: 0, max: 1080 },
  });
  folder.addInput(params, 'cp1', {
    x: { min: 0, max: 1080 },
    y: { min: 0, max: 1080 },
  });
  folder.addInput(params, 'cp2', {
    x: { min: 0, max: 1080 },
    y: { min: 0, max: 1080 },
  });
};

createPane();

canvasSketch(sketch, settings);
