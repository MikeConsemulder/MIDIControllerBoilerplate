<template>
    <div 
        class="ActionsConfig"
    >
        actions
        <div 
            v-for="(action, key) in actions"
            :key="key"
            @dragleave="dragLeave({ key }, $event)" 
            :ref="key"
        >
            {{ action }}
        </div>
        <div 
            v-for="(activator, key) in actionActivators"
            :key="key"
        >
            {{ activator }}
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import EventBus from "../utils/event-bus";

@Component
export default class ActionsConfig extends Vue {

    private draggedElement: any = null;
       
    get actionActivators(): any {
        return this.$store.getters.actionActivators;
    }

    get actions(): any {
        return this.$store.getters.actions;
    }

    mounted(): void {

        EventBus.$on('setDraggedElement', element => {
            this.draggedElement = element;
        });
    }

    private dragLeave(data, event): void {

        if(!this.isDrop(event)) return;


        const action: any = this.$refs[data.key][0];
        if(action === null || this.draggedElement === null) return;
        this.addElementToPage(action, data.key);
        this.addToStore(data.key);
    }

    private isDrop(event): boolean {

        return(
            event.screenX === 0 && 
            event.screenY === 0 &&
            event.clientX === 0 &&
            event.clientY === 0
        );
    }

    private addToStore(key) {

        const action: any = this.$refs[key][0];
        if(action === null || this.draggedElement === null) return;
    
        this.$store.dispatch('setActionActivator', {
            action: key,
            deviceId: this.draggedElement.dataset.deviceId,
            inputId: this.draggedElement.dataset.id
        });
    }

    private addElementToPage(action, actionKey): void {
        
        if(this.$store.getters.isActivator({ 
            action: actionKey, 
            deviceId: this.draggedElement.dataset.deviceId, 
            inputId: this.draggedElement.dataset.id
        })) return;
       
        action.appendChild(this.draggedElement.cloneNode(true));
    }
}
</script>
<style scoped lang="scss">
    @import '../styling/colours.scss';
    #drawer {
        z-index: 10;
        position: fixed;
        
        padding: 2rem;
        
        width: 20rem;
        height: 100vh;
        
        transform: translateX(-100%);
        top: 0;

        background-color: #ffffff;
        color: $Neutral;

        box-shadow: 0 4px 8px 0 rgba(63,92,110, 0.5);

        overflow-y: scroll;

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