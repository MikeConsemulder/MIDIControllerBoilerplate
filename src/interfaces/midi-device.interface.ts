import { IMIDIInput } from "./midi-input.interface";
import { IMIDIOutput } from "./midi-output-interface";

export interface IMIDIDevice {
    inputs: IMIDIInput[],
    outputs: IMIDIOutput[]
}