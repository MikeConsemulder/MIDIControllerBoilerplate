<template>
  <div>
      Midi Control
      <div id="content">
        <div class="button" data-key="q"
            data-sound="https://dl.dropboxusercontent.com/s/h9sow482vkw06xe/dinky-kick.mp3"></div>
        <div class="button" data-key="w"
            data-sound="https://dl.dropboxusercontent.com/s/kkikcupdg9n1qiy/dinky-snare.mp3"></div>
        <div class="button" data-key="e"
            data-sound="https://dl.dropboxusercontent.com/s/d7jlxp5v4z0n62q/dinky-hat-2.mp3"></div>
        <div class="button" data-key="r" data-sound="https://dl.dropboxusercontent.com/s/rblgnob6tvriudy/dinky-cym.mp3">
        </div>
        <div class="button" data-key="t"
            data-sound="https://dl.dropboxusercontent.com/s/umm8cmrmn8n4a46/dinky-cym-noise.mp3"></div>
    </div>
    <div id="device_info">
        <div id="key_data"></div>
    </div>
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