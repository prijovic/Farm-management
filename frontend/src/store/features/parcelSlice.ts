import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";
import {Parcel} from "../../model/entities/Parcel";

interface ParcelState {
    parcels: Parcel[];
}

const initialState: ParcelState = {
    parcels: [],
}

export const parcelSlice = createSlice({
    name: "parcel",
    initialState,
    reducers: {
        setParcels: (state, action: PayloadAction<Parcel[]>) => {
            state.parcels = action.payload;
        }
    }
});

export const {setParcels} = parcelSlice.actions;

export const selectParcels = (state: RootState) => state.parcel.parcels;
export const selectParcel = (id: string) => (state: RootState) => state.parcel.parcels.find(parcel => parcel.id === id);

export default parcelSlice.reducer;
