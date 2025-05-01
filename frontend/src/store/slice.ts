import {createSlice} from "@reduxjs/toolkit";


const Slice = createSlice({
    name: 'Name',
    initialState:{
        machineBase: [],
        serviceBase: [],
        complaintBase: [],
        Id: [],
        CategoryBase: [],
        machineListBase: [],
        Status: '',
    },
    reducers: {
        addStatus(state, action) {
            state.Status = action.payload;
        },
        addMachineBase(state, action) {
            state.machineBase = action.payload.sort((a: any, b: any) =>
            `${a.shipping_date > b.shipping_date ? -1 : 1}`);
        },
        addMachineListBase(state, action) {
            state.machineListBase = action.payload
        },
        addId(state, action) {
            state.Id = action.payload;
        },
        addCategory(state, action) {
            state.CategoryBase = action.payload;

        },
        addServiceBase(state, action) {
            state.serviceBase = action.payload.sort((a: any, b: any) =>
                `${a.service_date > b.service_date ? -1 : 1}`);
            if (state.Status === 'Client') {
                state.serviceBase = state.serviceBase.filter((item: any) =>
                    ( item.machine_id.client.name === localStorage.getItem('company')));
            }
        },
        addComplaintBase(state, action) {
            state.complaintBase = action.payload.sort((a: any, b: any) =>
                `${a.refusal_date > b.refusal_date ? -1 : 1}`);
            if (state.Status === 'Client') {
                state.complaintBase = state.complaintBase.filter((item: any) =>
                    ( item.machine_id.client.name === localStorage.getItem('company')));
            }
        },
    }
});


export const {addMachineBase, addServiceBase, addComplaintBase,addId, addCategory, addStatus,
    addMachineListBase} = Slice.actions;
export default Slice.reducer;
