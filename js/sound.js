setVolumeFromLocalStorage();

function setGameVolume(value) {
    gameVolume = parseFloat(value);
    localStorage.setItem('gameVolume', gameVolume);
}

function setMusicVolume(value) {
    musicVolume = parseFloat(value);
    localStorage.setItem('musicVolume', musicVolume);
    if (backgroundMusic) {
        backgroundMusic.volume = musicVolume;
    }
}

function setVolumeFromLocalStorage() {
    const storedGameVolume = localStorage.getItem('gameVolume');
    const storedMusicVolume = localStorage.getItem('musicVolume');
    const gameVolumeInput = document.getElementById('volumeSlider');
    const musicVolumeInput = document.getElementById('musicSlider');

    if (storedGameVolume !== null && gameVolumeInput) {
        gameVolumeInput.value = storedGameVolume;
    }
    if (storedMusicVolume !== null && musicVolumeInput) {
        musicVolumeInput.value = storedMusicVolume;
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

function playGameSound(gameVolume, type) {
  // 1. Audio-Kontext initialisieren
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const now = audioContext.currentTime;

  // Master Gain Node für die Lautstärke
  const masterGainNode = audioContext.createGain();
  masterGainNode.gain.setValueAtTime(gameVolume, now);
  masterGainNode.connect(audioContext.destination);

  // 2. Daten & Einstellungen je nach Typ bestimmen
  const isVictory = type === 'victory';
  const oscType = isVictory ? 'triangle' : 'sawtooth';
  const volumeLevel = isVictory ? 0.4 : 0.35;

  const melody = isVictory 
    ? [
        { freq: 261.63, duration: 0.1, pause: 0.1, drum: "kick" },
        { freq: 329.63, duration: 0.1, pause: 0.1, drum: null },
        { freq: 392.0, duration: 0.1, pause: 0.1, drum: "snare" },
        { freq: 523.25, duration: 0.2, pause: 0.3, drum: "kick" },
        { freq: 392.0, duration: 0.12, pause: 0.18, drum: "kick" },
        { freq: 392.0, duration: 0.12, pause: 0.18, drum: "snare" },
        { freq: 523.25, duration: 0.8, pause: 0.8, drum: "both" },
      ]
    : [
        { freq: 392.00, duration: 0.15, pause: 0.20, drum: 'kick' },
        { freq: 349.23, duration: 0.15, pause: 0.20, drum: null },
        { freq: 311.13, duration: 0.15, pause: 0.25, drum: 'kick' },
        { freq: 246.94, duration: 0.25, pause: 0.40, drum: null },
        { freq: 220.00, duration: 0.30, pause: 0.35, drum: null },
        { freq: 207.65, duration: 0.30, pause: 0.35, drum: null },
        { freq: 196.00, duration: 1.20, pause: 1.20, drum: null }
      ];

  // 3. Drum-Synthesizer (Hilfsfunktionen)
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
    // Noise Buffer wird nur bei Bedarf (Snare) erzeugt
    const bufferSize = audioContext.sampleRate * 0.5;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noiseSource = audioContext.createBufferSource();
    noiseSource.buffer = buffer;

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

  // 4. Abspiel-Schleife (Scheduling Loop)
  let currentTime = now;

  melody.forEach((note, index) => {
    const isLastNote = index === melody.length - 1;
    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    osc.type = oscType;
    osc.frequency.setValueAtTime(note.freq, currentTime);

    osc.connect(gainNode);
    gainNode.connect(masterGainNode);

    const endTime = currentTime + note.duration;

    // Ein- und Ausblenden der Note gegen Knackgeräusche
    gainNode.gain.setValueAtTime(0, currentTime);
    gainNode.gain.linearRampToValueAtTime(volumeLevel, currentTime + 0.02);

    if (isLastNote) {
      gainNode.gain.exponentialRampToValueAtTime(0.0001, endTime);
    } else {
      gainNode.gain.setValueAtTime(volumeLevel, endTime - 0.02);
      gainNode.gain.linearRampToValueAtTime(0, endTime);
    }

    osc.start(currentTime);
    osc.stop(endTime);

    // Drums triggern
    if (note.drum === "kick" || note.drum === "both") {
      playKick(currentTime);
    }
    if (note.drum === "snare" || note.drum === "both") {
      playSnare(currentTime);
    }

    currentTime += note.pause;
  });
}
