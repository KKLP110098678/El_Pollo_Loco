function setGameVolume(value) {
    gameVolume = parseFloat(value);
}

function setMusicVolume(value) {
    musicVolume = parseFloat(value);
    if (backgroundMusic) {
        backgroundMusic.volume = musicVolume;
    }
}

function startBackgroundMusic() {
    if (!backgroundMusic) {
        backgroundMusic = new Audio('assets/music/Fartes-de-Taco.mp3');
        backgroundMusic.loop = true;
    }
    backgroundMusic.volume = musicVolume;
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
}

function stopBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }
}

function playVictorySoundWithDrums() {
  // 1. Initialize audio context
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const now = audioContext.currentTime;

  // Use gameVolume for the master gain node
  const masterGainNode = audioContext.createGain();
  masterGainNode.gain.setValueAtTime(gameVolume, now);
  masterGainNode.connect(audioContext.destination);

  // 2. Define melody and rhythm
  const melody = [
    { freq: 261.63, duration: 0.1, pause: 0.1, drum: "kick" },
    { freq: 329.63, duration: 0.1, pause: 0.1, drum: null },
    { freq: 392.0, duration: 0.1, pause: 0.1, drum: "snare" },
    { freq: 523.25, duration: 0.2, pause: 0.3, drum: "kick" },

    // Final "ta-da-daaa" phrasing
    { freq: 392.0, duration: 0.12, pause: 0.18, drum: "kick" },
    { freq: 392.0, duration: 0.12, pause: 0.18, drum: "snare" },
    { freq: 523.25, duration: 0.8, pause: 0.8, drum: "both" },
  ];

  // 3. Helper functions to synthesize drum sounds
  function createNoiseBuffer() {
    const bufferSize = audioContext.sampleRate * 0.5;
    const buffer = audioContext.createBuffer(
      1,
      bufferSize,
      audioContext.sampleRate,
    );
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }
  const noiseBuffer = createNoiseBuffer();

  function playKick(time) {
    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    osc.connect(gainNode);
    gainNode.connect(masterGainNode);

    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(40, time + 0.1);

    gainNode.gain.setValueAtTime(1.0, time);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    osc.start(time);
    osc.stop(time + 0.15);
  }

  function playSnare(time) {
    const noiseSource = audioContext.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const filter = audioContext.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1000;

    const gainNode = audioContext.createGain();

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(masterGainNode);

    gainNode.gain.setValueAtTime(0.7, time);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    noiseSource.start(time);
    noiseSource.stop(time + 0.12);
  }

  // 4. Playback scheduling loop
  let currentTime = now;

  melody.forEach((note, index) => {
    const isLastNote = index === melody.length - 1;

    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(note.freq, currentTime);

    osc.connect(gainNode);
    gainNode.connect(masterGainNode);

    const endTime = currentTime + note.duration;

    gainNode.gain.setValueAtTime(0, currentTime);
    gainNode.gain.linearRampToValueAtTime(0.4, currentTime + 0.02);

    if (isLastNote) {
      gainNode.gain.exponentialRampToValueAtTime(0.0001, endTime);
    } else {
      gainNode.gain.setValueAtTime(0.4, endTime - 0.02);
      gainNode.gain.linearRampToValueAtTime(0, endTime);
    }

    osc.start(currentTime);
    osc.stop(endTime);

    if (note.drum === "kick" || note.drum === "both") {
      playKick(currentTime);
    }
    if (note.drum === "snare" || note.drum === "both") {
      playSnare(currentTime);
    }

    currentTime += note.pause;
  });
}

function playGameOverSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const now = audioContext.currentTime;

  const masterGainNode = audioContext.createGain();
  masterGainNode.gain.setValueAtTime(gameVolume, now);
  masterGainNode.connect(audioContext.destination);

  const melody = [
    { freq: 392.00, duration: 0.15, pause: 0.20, drum: 'kick' },  // G4
    { freq: 349.23, duration: 0.15, pause: 0.20, drum: null },    // F4
    { freq: 311.13, duration: 0.15, pause: 0.25, drum: 'kick' },  // Eb4
    { freq: 246.94, duration: 0.25, pause: 0.40, drum: null },    // B3

    { freq: 220.00, duration: 0.30, pause: 0.35, drum: null },    // A3
    { freq: 207.65, duration: 0.30, pause: 0.35, drum: null },    // Ab3
    { freq: 196.00, duration: 1.20, pause: 1.20, drum: null }     // Low G3
  ];

  function createNoiseBuffer() {
    const bufferSize = audioContext.sampleRate * 0.5;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }
  const noiseBuffer = createNoiseBuffer();

  function playKick(time) {
    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    osc.connect(gainNode);
    gainNode.connect(masterGainNode);

    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(40, time + 0.1);

    gainNode.gain.setValueAtTime(1.0, time);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    osc.start(time);
    osc.stop(time + 0.15);
  }

  let currentTime = now;

  melody.forEach((note, index) => {
    const isLastNote = index === melody.length - 1;

    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(note.freq, currentTime);

    osc.connect(gainNode);
    gainNode.connect(masterGainNode);

    const endTime = currentTime + note.duration;

    gainNode.gain.setValueAtTime(0, currentTime);
    gainNode.gain.linearRampToValueAtTime(0.35, currentTime + 0.02);

    if (isLastNote) {
      gainNode.gain.exponentialRampToValueAtTime(0.0001, endTime);
    } else {
      gainNode.gain.setValueAtTime(0.35, endTime - 0.02);
      gainNode.gain.linearRampToValueAtTime(0, endTime);
    }

    osc.start(currentTime);
    osc.stop(endTime);

    if (note.drum === 'kick') {
      playKick(currentTime);
    }

    currentTime += note.pause;
  });
}
