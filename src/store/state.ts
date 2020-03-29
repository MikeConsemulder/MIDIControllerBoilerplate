import { IState } from "../interfaces/state.interface";

const state: IState = {
    devices: {
        inputs: [],
        outputs: []
    },
    input_messages: [],
    maxAmountIncommingMessages: 100,
    actions: {
        action_1: {
            activators: []
        },
        action_2: {
            activators: []
        },
        action_3: {
            activators: []
        }
    }
};

export { state };