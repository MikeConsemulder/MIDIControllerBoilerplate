<template>
    <div
        :class="{ 'is-Open' : isOpen }"
        id="drawer"
    >
        Settings
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IMIDIInput } from "../interfaces/midi-input.interface";

@Component
export default class Drawer extends Vue {

    private isOpen: boolean = true;
    
    mounted(): void {

        this.attachInteractions();
    }

    attachInteractions(): void {

        document.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
        })

        document.addEventListener("keydown", (event: KeyboardEvent) => {

            if (event.isComposing || event.keyCode === 82) {
                this.isOpen = !this.isOpen
                return;
            }
        });

        this.preventCloseWhenClickOnDrawer();
    }

    preventCloseWhenClickOnDrawer(): void {

        const drawer = document.getElementById('drawer');
        if(drawer === null) return;
        drawer.addEventListener('click', e => {
            e.stopPropagation();
        });
    }
}
</script>
<style scoped lang="scss">
    #drawer {
        z-index: 1000;
        position: fixed;
        
        padding: 2rem;
        
        width: 20rem;
        height: 100vh;
        
        transform: translateX(-100%);
        top: 0;

        background-color: white;

        box-shadow: 0 4px 8px 0 rgba(63,92,110, 0.5);


        animation-name: outgoing;
        
        animation-timing-function: ease-in-out;
        animation-duration: 0.5s;            
        
        &.is-Open {
                    
        animation-timing-function: ease-in-out;
        animation-duration: 0.5s;     
        animation-name: incomming;  
        transform: translateX(0);
        }
    }

    @keyframes incomming {
        from { transform: translateX(-100%) }
        to { transform: translateX(0) }
    }

    @keyframes outgoing {
        from { transform: translateX(0) }
        to { transform: translateX(-100%) }
    }
</style>