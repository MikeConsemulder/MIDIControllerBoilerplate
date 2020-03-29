<template>
    <div 
        class="Dragable"
        ref="DragableElement"
        draggable="true"
        @dragstart="dragstart"
        @dragend="dragEnd"
    >
        <slot>
        </slot>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IMIDIInput } from "../interfaces/midi-input.interface";
import EventBus from "../utils/event-bus";

@Component({
    components: {
    }
})
export default class Drawer extends Vue {

    private elementClone: any = null;
    
    private dragstart(e): void {
        console.log('wow');
        EventBus.$emit('setDraggedElement', this.$refs.DragableElement);
    }

    private dragEnd(): void {
        EventBus.$emit('setDraggedElement', null);
    }
}
</script>
<style scoped lang="scss">
    @import '../styling/colours.scss';
    
    .Dragable {
        
        &.is-Dragged {
            position: fixed;
            top:0;
            left:0;
            z-index: 1000;
        }

        &:hover {
            box-shadow: 0 4px 8px 0 rgba(63,92,110, 0.13);
        }

        &:active {
            cursor: pointer;
        }
    }
</style>