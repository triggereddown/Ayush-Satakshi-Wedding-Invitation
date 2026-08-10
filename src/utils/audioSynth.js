/**
 * audioSynth.js
 * Procedural synthesis of traditional Bengali wedding sounds:
 * 1. Shankha Blow (Conch shell) - Deep, resonant, hollow horn sound with breath vibrato.
 * 2. Shehnai Flourish - Piercing double-reed woodwind melody with microtonal glides.
 */

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Procedurally synthesizes a Shankha (Conch shell) blow.
 * Timbre: Rich low-to-mid fundamental, strong harmonics, focused bandpass resonance, breath vibrato.
 */
export function playShankhaSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const duration = 4.0; // 4 seconds total

    // Create Oscillators
    // Osc 1: Sawtooth (buzzing lips)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(140, now);
    osc1.frequency.exponentialRampToValueAtTime(180, now + 0.5); // Glide up
    osc1.frequency.setValueAtTime(180, now + 2.5);
    osc1.frequency.exponentialRampToValueAtTime(150, now + duration - 0.2); // Glide down at end

    // Osc 2: Triangle (warm core tone, slightly detuned)
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(141, now);
    osc2.frequency.exponentialRampToValueAtTime(181, now + 0.5);
    osc2.frequency.setValueAtTime(181, now + 2.5);
    osc2.frequency.exponentialRampToValueAtTime(151, now + duration - 0.2);

    // Osc 3: Sub-fundamental sine (deep bass rumble)
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(90, now);
    subOsc.frequency.exponentialRampToValueAtTime(90, now + 0.5);

    // LFO for breath vibrato (amplitude and pitch wobble)
    const vibratoLfo = ctx.createOscillator();
    vibratoLfo.frequency.value = 5.5; // 5.5 Hz wobble
    const vibratoGain = ctx.createGain();
    vibratoGain.gain.value = 3; // detune by 3 Hz
    vibratoLfo.connect(vibratoGain);
    vibratoGain.connect(osc1.frequency);
    vibratoGain.connect(osc2.frequency);

    // Noise Generator (breath hiss)
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1800; // hiss above 1.8kHz

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.04, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.005, now + duration - 0.5);

    noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);

    // Main Bandpass Filter (isolates the conch shell's natural cylindrical resonance cavity)
    const conchFilter = ctx.createBiquadFilter();
    conchFilter.type = 'bandpass';
    conchFilter.frequency.setValueAtTime(500, now);
    conchFilter.frequency.exponentialRampToValueAtTime(560, now + 0.5); // shift resonance with breath
    conchFilter.Q.value = 5.5; // sharp focus

    // LFO for conch resonance wobble
    const resonanceLfo = ctx.createOscillator();
    resonanceLfo.frequency.value = 4.0;
    const resonanceGain = ctx.createGain();
    resonanceGain.gain.value = 15; // modulate filter by 15Hz
    resonanceLfo.connect(resonanceGain);
    resonanceGain.connect(conchFilter.frequency);

    // Mixer
    const oscMixer = ctx.createGain();
    oscMixer.gain.value = 0.5;
    
    const subMixer = ctx.createGain();
    subMixer.gain.value = 0.25;

    osc1.connect(oscMixer);
    osc2.connect(oscMixer);
    subOsc.connect(subMixer);

    // Main Envelope
    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(0, now);
    mainGain.gain.linearRampToValueAtTime(0.7, now + 0.6); // smooth blow attack
    mainGain.gain.setValueAtTime(0.7, now + 2.5);
    mainGain.gain.exponentialRampToValueAtTime(0.0001, now + duration); // slow fade-out

    // Tremolo (LFO modulating gain for breath shake)
    const tremoloLfo = ctx.createOscillator();
    tremoloLfo.frequency.value = 6.0;
    const tremoloGain = ctx.createGain();
    tremoloGain.gain.value = 0.05; // 5% volume ripple
    tremoloLfo.connect(tremoloGain);
    tremoloGain.connect(mainGain.gain);

    // Routing
    oscMixer.connect(conchFilter);
    subMixer.connect(mainGain); // bypass filter for deep bass rumble
    conchFilter.connect(mainGain);
    noiseGain.connect(mainGain);
    
    mainGain.connect(ctx.destination);

    // Start all sources
    osc1.start(now);
    osc2.start(now);
    subOsc.start(now);
    vibratoLfo.start(now);
    resonanceLfo.start(now);
    tremoloLfo.start(now);
    noiseNode.start(now);

    // Stop all sources
    osc1.stop(now + duration);
    osc2.stop(now + duration);
    subOsc.stop(now + duration);
    vibratoLfo.stop(now + duration);
    resonanceLfo.stop(now + duration);
    tremoloLfo.stop(now + duration);
    noiseNode.stop(now + duration);

  } catch (err) {
    console.warn('Web Audio synthesis blocked or unsupported:', err);
  }
}

/**
 * Procedurally synthesizes a brief traditional Shehnai flourish.
 * Timbre: Highly nasal, bright double-reed, sharp filter cutoffs, ornamentations.
 */
export function playShehnaiFlourish() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // We will play a quick ornamental 3-note motif (welcome phrase)
    const notes = [
      { pitch: 587.33, start: 0.0, duration: 0.12 },  // D5
      { pitch: 659.25, start: 0.12, duration: 0.12 }, // E5
      { pitch: 783.99, start: 0.24, duration: 0.7 }   // G5
    ];

    // Master volume envelope
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.35, now + 0.05);
    masterGain.gain.setValueAtTime(0.35, now + 0.85);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    masterGain.connect(ctx.destination);

    // Filter to simulate double-reed nasal tube
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1300, now); // center around nasal mids
    filter.Q.setValueAtTime(3.5, now);
    filter.connect(masterGain);

    notes.forEach((note, idx) => {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth'; // bright harmonic source

      // Set pitch
      const noteStart = now + note.start;
      osc.frequency.setValueAtTime(note.pitch, noteStart);
      
      // Portamento (glide) between notes
      if (idx > 0) {
        osc.frequency.setValueAtTime(notes[idx - 1].pitch, noteStart - 0.02);
        osc.frequency.exponentialRampToValueAtTime(note.pitch, noteStart + 0.04);
      }

      // Add intense, fast vibrato (essential for woodwinds)
      const vibratoLfo = ctx.createOscillator();
      vibratoLfo.frequency.value = 7.5; // fast finger wobble
      const vibratoGain = ctx.createGain();
      vibratoGain.gain.value = 6; // pitch shift depth
      vibratoLfo.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);

      // Local envelope per note
      const noteGain = ctx.createGain();
      noteGain.gain.setValueAtTime(0, noteStart);
      noteGain.gain.linearRampToValueAtTime(0.7, noteStart + 0.02);
      noteGain.gain.setValueAtTime(0.7, noteStart + note.duration - 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + note.duration);

      osc.connect(noteGain);
      noteGain.connect(filter);

      vibratoLfo.start(noteStart);
      osc.start(noteStart);
      
      vibratoLfo.stop(noteStart + note.duration);
      osc.stop(noteStart + note.duration);
    });

  } catch (err) {
    console.warn('Web Audio synthesis blocked or unsupported:', err);
  }
}
