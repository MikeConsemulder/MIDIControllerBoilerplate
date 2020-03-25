<template>
    <div 
        :class="{ 'is-Visible' :isVisible }"
        id="inputConfig"
    >
        <div v-if="inputId !== null && deviceId !== null">
            {{ inputId }} {{ deviceId }}
        </div>
        <button 
            @click="close"
            class="CloseButton"
            type="button"
        >
            close
        </button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import EventBus from "../utils/event-bus";

@Component
export default class InputConfig extends Vue {

    private isVisible: boolean = true;
    private inputId: number | null = null;
    private deviceId: string | null = null;

    mounted(): void {

        EventBus.$on('OpenInputConfig', (data: any)=> {
            
            this.isVisible = true;
            this.inputId = data.input_id;
            this.deviceId = data.device_id;
        });
    }

    private close(): void {
        this.isVisible = false;
    }
}
</script>
<style scoped lang="scss">
    @import '../styling/colours.scss';        
    #inputConfig {

        display: none;
        position: absolute;

        top: 0;
        left:0;

        width: 100%;
        height: 20rem;

        padding: 0.5rem;
        box-sizing: border-box;

        background-color: $Grey;
        box-shadow: 0 4px 8px 0 rgba(63,92,110, 0.8);      

        &.is-Visible {
            display: block;
        }

        .CloseButton {

            position: absolute;
            bottom: 0.5rem;
            left: 50%;
            transform: translateX(-50%);

            padding: 0.5rem;

            font-size: 1rem;
            border-style: none;
            border-radius: 3px;
            background-color: $Neutral;
            color: $Grey;

            &:hover {
                cursor: pointer;
            }
        }
    }
</style>