<template>
  <div>
      Midi Control
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { MIDIConnect } from "./domain/MIDIConnect";
import { IMIDIInput } from "./interfaces/midi-input.interface";
import EventBus from "./utils/event-bus";
import { IMIDIDataInput } from "./interfaces/midi-data-input.interface";

@Component
export default class App extends Vue {
    
    private midiInputs!: IMIDIInput[];
    private midiConnect: MIDIConnect = new MIDIConnect();

    async mounted() {

        await this.midiConnect.initialize();
        this.midiInputs = this.midiConnect.devices.inputs;
        this.subscribeToInput();
    }

    private subscribeToInput(): void {

        if(this.midiInputs.length === 0) { 

            console.warn('no midi inputs found');
            return;
        };

        const deviceId1 = this.midiInputs[0].id;
        this.midiConnect.subscribeToMessage(deviceId1, (data: IMIDIDataInput) => {
            
            console.log(data);
        });
    }
}
</script>
<style scoped lang="scss">

</style>