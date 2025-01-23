import { IService, IServices } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import storage from "redux-persist/lib/storage";
const favoritesConfig = {
  key: "favorites",
  storage,
};

type TInitialFavoriteState = { favs: IService[] };
type TInitialFavoritesState = { favs: IServices[] };
const favoritesSlice = createSlice({
  //   initialState: [] as TInitialFavoriteState,
  initialState: { favs: [] } as TInitialFavoritesState,
  name: "favorites",
  reducers: {
    // toggleFavoriteService(state, action: PayloadAction<IService>) {
    //   const container = new Set(state);
    //   const payload = action.payload;
    //   if (container.has(payload)) {
    //     container.delete(payload);
    //     state = Array.from(container);
    //   } else {
    //     container.add(payload);
    //     state = Array.from(container);
    //   }
    // },
    toggleFavoriteServices(state, action: PayloadAction<IServices>) {
      const {payload} =action;
      const existingIndex = state.favs.findIndex(item => item._id === payload._id);

      if (existingIndex >= 0) {
         // Update the existing data object in the array
         const filtered = state.favs.filter(item => item._id !== payload._id);
         state.favs = filtered;
         toast.info("Removed from favorite");
        } else {
          // Add the new data object to the array
          toast.info("Added to favorite");
         state.favs.push(payload);
      }
    },
  },
});

// Export your favoriteSlice and persist config
export { favoritesConfig };
export const { toggleFavoriteServices } = favoritesSlice.actions;
export default favoritesSlice.reducer;
