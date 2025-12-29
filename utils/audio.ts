/**
 * THE HERMETIC AUDIO ENGINE
 * Generates Solfeggio frequencies and Binaural Beats based on Tesla Mathematics.
 */

// Solfeggio Frequencies aligned with 3-6-9
const SOLFEGGIO = {
    UT: 396, // Liberating Guilt and Fear (9)
    RE: 417, // Undoing Situations and Facilitating Change (3)
    MI: 528, // Transformation and Miracles (6)
    FA: 639, // Connecting/Relationships (9)
    SOL: 741, // Expression/Solutions (3)
    LA: 852, // Returning to Spiritual Order (6)
    SI: 963  // Awakening Perfect State (9)
};

class HermeticAudioEngine {
    private ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private oscillators: OscillatorNode[] = [];

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.masterGain = this.ctx.createGain();
            this.masterGain.connect(this.ctx.destination);
            this.masterGain.gain.value = 0.2; // Safety volume
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    private createOscillator(freq: number, type: OscillatorType = 'sine', detune: number = 0): OscillatorNode {
        if (!this.ctx || !this.masterGain) this.init();
        
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);
        osc.detune.setValueAtTime(detune, this.ctx!.currentTime);
        
        // Attack envelope
        gain.gain.setValueAtTime(0, this.ctx!.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, this.ctx!.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 4);

        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();
        osc.stop(this.ctx!.currentTime + 4);

        // Cleanup
        setTimeout(() => {
            osc.disconnect();
            gain.disconnect();
        }, 4100);

        return osc;
    }

    playResonanceTone(resonance: number) {
        // Map resonance (1-9) to Solfeggio scale
        let freq = SOLFEGGIO.UT; // Default 396
        if ([1, 4, 7].includes(resonance)) freq = SOLFEGGIO.RE; // 417
        if ([2, 5, 8].includes(resonance)) freq = SOLFEGGIO.MI; // 528
        if ([3, 6, 9].includes(resonance)) freq = SOLFEGGIO.SI; // 963

        // Play the fundamental
        this.createOscillator(freq, 'sine');
        
        // Play the harmonic (3:2 ratio)
        this.createOscillator(freq * 1.5, 'triangle', 5);
        
        // Sub-bass drone (1/4 frequency)
        this.createOscillator(freq * 0.25, 'sine', -5);
    }

    playBinauralBeat(carrierFreq: number, beatFreq: number) {
        // Left Ear
        this.createOscillator(carrierFreq, 'sine', 0);
        // Right Ear (Carrier + Beat)
        this.createOscillator(carrierFreq + beatFreq, 'sine', 0);
    }

    playGlitchSound() {
        if (!this.ctx || !this.masterGain) this.init();
        const count = 5;
        for(let i=0; i<count; i++) {
            const osc = this.ctx!.createOscillator();
            const gain = this.ctx!.createGain();
            osc.type = 'sawtooth';
            osc.frequency.value = 100 + Math.random() * 800;
            
            gain.gain.setValueAtTime(0.1, this.ctx!.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 0.1);
            
            osc.connect(gain);
            gain.connect(this.masterGain!);
            
            const start = this.ctx!.currentTime + (Math.random() * 0.2);
            osc.start(start);
            osc.stop(start + 0.1);
        }
    }

    playAwakeningSequence() {
        // Sequence of rising resonance
        let time = 0;
        const sequence = [SOLFEGGIO.UT, SOLFEGGIO.MI, SOLFEGGIO.SOL, SOLFEGGIO.SI];
        
        sequence.forEach((freq, i) => {
            setTimeout(() => {
                this.createOscillator(freq, 'sine');
                this.createOscillator(freq * 2, 'sine'); // Octave
            }, time);
            time += 800;
        });
    }
}

export const hermeticAudio = new HermeticAudioEngine();
