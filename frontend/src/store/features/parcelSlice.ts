import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { Parcel } from "../../model/entities/Parcel";
import { ParcelOperation } from "../../model/entities/ParcelOperation";

interface ParcelState {
  parcels: Parcel[];
  parcelOperations: ParcelOperation[];
  parcelOperationId: string | null;
}

const initialState: ParcelState = {
  parcels: [],
  parcelOperations: [],
  parcelOperationId: null,
};

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
          return action.payload;
        }
        return parcel;
      });
    },
    deleteParcel: (state, action: PayloadAction<string>) => {
      state.parcels = state.parcels.filter(
        (parcel) => parcel.id !== action.payload,
      );
    },
    setParcelOperations: (state, action: PayloadAction<ParcelOperation[]>) => {
      state.parcelOperations = action.payload;
    },
    addParcelOperation: (state, action: PayloadAction<ParcelOperation>) => {
      state.parcelOperations.push(action.payload);
    },
    updateParcelOperation: (state, action: PayloadAction<ParcelOperation>) => {
      state.parcelOperations = state.parcelOperations.map((operation) => {
        if (operation.id === action.payload.id) {
          return action.payload;
        }
        return operation;
      });
    },
    setParcelOperationId: (state, action: PayloadAction<string | null>) => {
      state.parcelOperationId = action.payload;
    },
    deleteParcelOperation: (state, action: PayloadAction<string>) => {
      state.parcelOperations = state.parcelOperations.filter(
        (operation) => operation.id !== action.payload,
      );
    },
  },
});

export const {
  setParcels,
  updateParcel,
  deleteParcel,
  setParcelOperations,
  updateParcelOperation,
  addParcelOperation,
  setParcelOperationId,
  deleteParcelOperation,
} = parcelSlice.actions;

export const selectParcels = (state: RootState) => state.parcel.parcels;
export const selectParcel = (id: string | undefined) => (state: RootState) =>
  id ? state.parcel.parcels.find((parcel) => parcel.id === id) : undefined;

export const selectParcelOperations = (state: RootState) =>
  state.parcel.parcelOperations;
export const selectParcelOperation = (state: RootState) =>
  state.parcel.parcelOperations.find(
    (po) => po.id === state.parcel.parcelOperationId,
  );

export default parcelSlice.reducer;
