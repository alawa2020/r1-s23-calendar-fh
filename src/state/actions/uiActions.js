import { types } from "../types/types";

//? SYNCHRONOUS ACTIONS
export const doUiOpenModal = () => ({
  type: types.uiOpenModal,
});

export const doUiCloseModal = () => ({
  type: types.uiCloseModal,
});

//? ASYNCHRONOUS ACTIONS