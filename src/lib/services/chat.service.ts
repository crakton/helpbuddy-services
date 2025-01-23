
import { Store } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { store } from "../redux/store";
import { updateConvo, updateMessages } from "../redux/features/slices/chatSlice";
import { IMsg } from "@/interfaces";

class Chat {
	protected store!: Store;
	constructor() {
		this.store = store;
		this.getConversations();
	}
	async getConversations() {
		try {
			const { data } = await axios.get("/api/conversations", {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			});
			this.store.dispatch(updateConvo(data.data));
		} catch (error) {
			console.log(error);
		}
	}
	async getMessage(id: string) {
		try {
			const { data } = await axios.get("/api/messages/" + id, {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			});
			// Reverse the order of chat messages to show the last one at the top
			const messages: IMsg[] = data.data.slice().reverse();
			this.store.dispatch(updateMessages(messages));
			this.getConversations();
			return messages;
		} catch (error) {
			console.log(error);
		}
	}
	async sendMessage(payload: { to: string; message: string }) {
		try {
			const { data } = await axios.post("/api/messages/", payload, {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			});
			const id = data.data.message.conversation;
			this.getMessage(id);
		} catch (error) {
			console.log(error);
		}
	}
}
export default Chat;