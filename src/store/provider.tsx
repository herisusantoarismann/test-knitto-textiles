"use client";
import React, { useRef } from "react";

import { makeStore, AppStore } from "../store";
/* Core */
import { Provider } from "react-redux";

/* Instruments */

export const ReduxProvider = (props: React.PropsWithChildren) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{props.children}</Provider>;
};
