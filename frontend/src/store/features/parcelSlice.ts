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
        },
        updateParcel: (state, action: PayloadAction<Parcel>) => {
            state.parcels = state.parcels.map((parcel) => {
                if (parcel.id === action.payload.id) {
                    return action.payload
                }
                return parcel;
            })
        }
    }
});

export const {setParcels, updateParcel} = parcelSlice.actions;

export const selectParcels = (state: RootState) => state.parcel.parcels;
export const selectParcel = (id: string | undefined) => (state: RootState) => id ? state.parcel.parcels.find(parcel => parcel.id === id) : undefined;

export default parcelSlice.reducer;
