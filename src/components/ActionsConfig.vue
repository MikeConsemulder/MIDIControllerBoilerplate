<template>
    <div 
        class="ActionsConfig"
    >
        <div 
            v-for="(action, key) in actions"
            :key="key"
            @dragleave="dragLeave({ key }, $event)" 
            class="Action"
        >
            {{ action }}        
            <div 
                class="InputContainer"
                :ref="key"
            >
                <span class="InputPlaceholder">...</span>
            </div>
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
    
    get inputMessages(): any {
        return this.$store.getters.inputMessages('input-0');
    }

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

        this.$store.dispatch('setActionActivator', {
            action: data.key,
            deviceId: this.draggedElement.dataset.deviceId,
            inputId: this.draggedElement.dataset.id
        });
    }

    private isDrop(event): boolean {

        return(
            event.screenX === 0 && 
            event.screenY === 0 &&
            event.clientX === 0 &&
            event.clientY === 0
        );
    }

    private addElementToPage(action, actionKey): void {
        
        if(this.$store.getters.isActivator({ 
            action: actionKey, 
            deviceId: this.draggedElement.dataset.deviceId, 
            inputId: this.draggedElement.dataset.id
        })) return;
       
        action.insertBefore(
            this.draggedElement.cloneNode(true),
            action.querySelector('.InputPlaceholder')
        );
    }
}
</script>
<style scoped lang="scss">
    @import '../styling/colours.scss';
    
    .ActionsConfig {

        .Action{

            min-height: 5rem;
            padding: 0.5rem;
            margin: 1rem 0;
            box-sizing: border-box;
            box-shadow: 0 4px 8px 0 rgba(63,92,110, 0.13);

            .InputContainer {
                display: flex;

                .InputPlaceholder {

                    background-color: $Neutral;
                    opacity: 0.3;
                    color: $Grey;
                    text-align: center;
                    line-height: 1rem;
                    width: 1rem;
                    height: 1rem;
                    padding: 0.5rem;
                    margin: 0.5rem;
                    border-radius: 3px;  
                    
                }
            }
        }
    }
</style>