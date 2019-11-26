import { createAction } from "redux-actions";

export const handleError = createAction("[Error] error");
export const clearErrors = createAction("[Error] clear error");
