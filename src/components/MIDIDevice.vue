<template>
    <div
        class="MIDIDeviceWrapper"
        :id="id"
    >
        {{ name }}
        {{ inputIds }}
        {{ messages }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { IMIDIInput } from "../interfaces/midi-input.interface";
import { IMIDIDevices } from "../interfaces/midi-device.interface";
import { IMIDIDataInput } from "../interfaces/midi-data-input.interface";

@Component
export default class MIDIDevice extends Vue {
    
    private device: IMIDIInput | null = null;
    private deviceInitialized: boolean = false;

	get id(): string {
		return this.$root.$props.id;
    }

    get name(): string {
		return this.$root.$props.name;
    }
    
    get inputIds(): any {
        return this.$store.getters.inputIds(this.id);
    }

    get messages(): any {
        return this.$store.getters.inputMessages(this.id);
    }

    mounted(): void {

        this.device = this.$store.getters.InputMIDIDevice(this.id);
        this.subscribeToMessages();
    }

    subscribeToMessages(): void {
        
        this['$MIDIConnect'].subscribeToMessage(this.id, (message: IMIDIDataInput) => {  
            
            this.$store.dispatch('processMessage', {
                id: this.id,
                message
            });
        })  
    }
}
</script>
<style scoped lang="scss">
    .MIDIDeviceWrapper {

        box-shadow: 0 4px 8px 0 rgba(63,92,110, 0.13);
        padding: 0.5rem;
        margin: 1rem 0 2rem 0;
        box-sizing: border-box;

        max-height: 10rem;
        overflow-y: scroll;
    }
</style>