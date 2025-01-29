"use client";

import React, { ReactNode } from "react";
import { persistor, store } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageLoader from "@/components/PageLoarder";

function ReduxWrapper({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ToastContainer />
      <PersistGate persistor={persistor} loading={<PageLoader />}>
        {children}
      </PersistGate>
  //  </Provider>
  );
}

export default ReduxWrapper;
