import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

import authReducer, { authPersistConfig } from "./authSlice";
import bookingsReducer, { bookingsPersistConfig } from "./bookingsSlice";
import chatReducer, { chatPersistConfig } from "./chatSlice";
import notificationsReducer, {
  notificationsPersistConfig,
} from "./notificationsSlice";
import profileReducer, { profilePersistConfig } from "./profileSlice";
import providersReducer, { providersPersistConfig } from "./providersSlice";
import servicesReducer, { servicesPersistConfig } from "./servicesSlice";
import { authApi } from "../apis/auth_api";
import { providersApi } from "../apis/providers_api";
import { categoryApi } from "../apis/categories_api";
import storage from "redux-persist/lib/storage";
import { servicesApi } from "../apis/services_api";
import { reviewsApi } from "../apis/reviews_api";
import { userApi } from "../apis/user_api";
import { bookingsApi } from "../apis/bookings_api";
import favoritesReducer,{ favoritesConfig } from "./favoriteSlice";

const rootConfig = {
  key: "root",
  storage
}

const bookingsConfig = {
  key:"bookings",
  storage,
}

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [bookingsApi.reducerPath]: persistReducer(bookingsConfig, bookingsApi.reducer),
  [categoryApi.reducerPath]: persistReducer(rootConfig,categoryApi.reducer),
  [providersApi.reducerPath]: providersApi.reducer,
  [reviewsApi.reducerPath]: reviewsApi.reducer,
  [servicesApi.reducerPath]: servicesApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  favorites: persistReducer(favoritesConfig, favoritesReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  bookings: persistReducer(bookingsPersistConfig, bookingsReducer),
  chat: persistReducer(chatPersistConfig, chatReducer),
  notification: persistReducer(
    notificationsPersistConfig,
    notificationsReducer
  ),
  profile: persistReducer(profilePersistConfig, profileReducer),
  providers: persistReducer(providersPersistConfig, providersReducer),
  services: persistReducer(servicesPersistConfig, servicesReducer),
});

export default rootReducer;
