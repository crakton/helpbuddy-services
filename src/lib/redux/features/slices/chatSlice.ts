import { IConvo, IMsg } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
const chatPersistConfig = {
  key: "chat",
  storage,
};

type TInitialChatState = {
  convo: IConvo[];
  messages: IMsg[];
};
const chatSlice = createSlice({
	name: "Chat",
	initialState: {convo:[],messages:[]} as TInitialChatState,
	reducers: {
		updateConvo(state, action: PayloadAction<IConvo[]>) {
			state.convo = action.payload;
		},
		updateMessages(state, action: PayloadAction<IMsg[]>) {
			state.messages = action.payload;
		},
	},
});

// Export your chatSlice and persist config
export { chatPersistConfig };
export const {updateConvo, updateMessages } = chatSlice.actions;
export default chatSlice.reducer;
