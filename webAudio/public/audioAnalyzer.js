class AudioAnalyzer {
  constructor() {
    if (!window.AudioContext) {
      const errMsg = 'Audio Api 지원 안됨';
      alert(errMsg);
      throw new Error(errMsg);
    }
    // this.audioContext = new (AudioContext || webkitAudioContext)();
    this.audioBuffer = null;
    this.sampleRate = 0;
    this.peaks = [];

    this.waveFormBox = document.getElementById('waveform');
    this.waveFormPathGroup = document.getElementById('waveform-path-group');
  }

  reset() {
    this.audioContext = new (AudioContext || webkitAudioContext)();
    this.audioBuffer = null;
    this.sampleRate = 0;
    this.peaks = [];
  }

  updateViewboxSize() {
    this.waveFormBox.setAttribute('viewBox', `0 -1 ${this.sampleRate} 2`);
  }

  setAudio(audioFile) {
    this.audioContext.decodeAudioData(audioFile).then((buffer) => {
      this.audioBuffer = buffer;
      this.sampleRate = buffer.sampleRate;
      this.updateViewboxSize();

      const peaks = this.audioBuffer.getChannelData(0);
      const resultPeaks = [];
      const sampleSize = peaks.length / this.sampleRate;
      const sampleStep = Math.floor(sampleSize / 10);

      Array(this.sampleRate)
        .fill()
        .forEach((v, newPeakIdx) => {
          const start = Math.floor(newPeakIdx * sampleSize);
          const end = Math.floor(start + sampleSize);

          let min = peaks[0];
          let max = peaks[0];

          for (
            let sampleIndex = start;
            sampleIndex < end;
            sampleIndex += sampleStep
          ) {
            const v = peaks[sampleIndex];
            if (v > max) {
              max = v;
            } else if (v < min) {
              min = v;
            }
          }

          resultPeaks[2 * newPeakIdx] = max;
          resultPeaks[2 * newPeakIdx + 1] = min;
        });

      this.peaks = resultPeaks;
      this.draw();
    });
  }

  draw() {
    console.log(this.audioBuffer);
    if (this.audioBuffer) {
      const peaks = this.peaks;
      const totalPeaks = peaks.length;
      console.log(peaks);

      let d = '';
      for (let peakIdx = 0; peakIdx < totalPeaks; peakIdx++) {
        if (peakIdx % 2 === 0) {
          d += ` M${Math.floor(peakIdx / 2)} ${peaks.shift()}`;
        } else {
          d += ` L${Math.floor(peakIdx / 2)} ${peaks.shift()}`;
        }
      }

      const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      path.setAttributeNS(null, 'd', d);

      this.waveFormPathGroup.appendChild(path);
    }
  }
}

export default new AudioAnalyzer();
