import AudioAnalyzer from './audioAnalyzer.js';

const audioEventHandler = () => {
  const inputDOM = document.getElementById('audio-uploader');
  console.log('실행');
  inputDOM.onchange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      AudioAnalyzer.reset();

      const reader = new FileReader();

      reader.readAsArrayBuffer(file);
      reader.onload = (e) => AudioAnalyzer.setAudio(e.target.result);
    }
  };
};
audioEventHandler();
