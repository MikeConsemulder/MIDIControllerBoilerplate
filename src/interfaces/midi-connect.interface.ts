import { IMIDIDevice } from "./midi-device.interface";

export interface IMIDIConnect {
    _audioContext: AudioContext | null;
    _MIDIAccess: any;
    _devices: IMIDIDevice;
}