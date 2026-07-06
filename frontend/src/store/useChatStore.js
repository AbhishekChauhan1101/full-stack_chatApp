import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // Typing Indicator
  isTyping: false,

  getUsers: async () => {
    set({ isUsersLoading: true });

    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      set({
        messages: [...messages, res.data],
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();

    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.off("newMessage");
    socket.off("typing");
    socket.off("stopTyping");
    socket.off("messageDelivered");
    socket.off("messagesSeen");

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;

      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });

    socket.on("messageDelivered", ({ messageId, status }) => {
      set({
        messages: get().messages.map((message) =>
          message._id === messageId
            ? {
                ...message,
                status,
              }
            : message
        ),
      });
    });

    socket.on("messagesSeen", ({ seenBy }) => {
      const currentSelectedUser = get().selectedUser;

      if (!currentSelectedUser || seenBy !== currentSelectedUser._id) return;

      set({
        messages: get().messages.map((message) =>
          message.senderId !== seenBy
            ? {
                ...message,
                status: "seen",
              }
            : message
        ),
      });
    });

    // ======================
    // Typing Indicator
    // ======================

    socket.on("typing", ({ senderId }) => {
      if (senderId !== selectedUser._id) return;

      set({
        isTyping: true,
      });
    });

    socket.on("stopTyping", ({ senderId }) => {
      if (senderId !== selectedUser._id) return;

      set({
        isTyping: false,
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;

    socket.off("newMessage");
    socket.off("typing");
    socket.off("stopTyping");
    socket.off("messageDelivered");
    socket.off("messagesSeen");
  },

  setSelectedUser: (selectedUser) =>
    set({
      selectedUser,
      isTyping: false,
    }),
}));