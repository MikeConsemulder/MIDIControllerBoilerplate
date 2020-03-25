import { IMIDIDevices } from "../interfaces/midi-device.interface";

const actions = {
    addDevices({ commit }, devices: IMIDIDevices): void {
        commit("addDevices", devices);
    },
    processMessage({ commit, state, dispatch }, { id, message }): void {
        
        const device = state.input_messages.filter(device => {
            return device.id === id;
        })[0];

        
        if (device === null || typeof device === 'undefined') {
            commit('saveNewMessage', { id, message });
            return;
        }

        commit('saveMessage', { id, message });
    }
};

export { actions };