import { motion, AnimatePresence } from "framer-motion";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    isTyping,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const getMessageStatus = (status) => {
    if (status === "seen") return "Seen";
    if (status === "delivered") return "Delivered";
    return "Sent";
  };

  if (isMessagesLoading) {
    return (
      <div className="flex h-full flex-col overflow-hidden">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="flex h-full flex-col overflow-hidden"
    >
      <ChatHeader />

      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 space-y-5">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => {
            const isMe = message.senderId === authUser._id;

            return (
              <motion.div
                key={message._id}
                ref={messageEndRef}
                initial={{
                  opacity: 0,
                  y: 18,
                  scale: 0.96,
                  x: isMe ? 20 : -20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                  y: 10,
                }}
                transition={{
                  duration: 0.32,
                  ease: "easeOut",
                  delay: index > messages.length - 8 ? 0.025 : 0,
                }}
                className={`flex items-end gap-3 ${
                  isMe ? "justify-end" : "justify-start"
                }`}
              >
                {!isMe && (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    src={selectedUser.profilePic || "/avatar.png"}
                    alt="profile"
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-white/10"
                  />
                )}

                <div
                  className={`max-w-[78%] sm:max-w-[65%] ${
                    isMe ? "items-end" : "items-start"
                  } flex flex-col`}
                >
                  <motion.time
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.12 }}
                    className="mb-1 px-1 text-[11px] text-white/35"
                  >
                    {formatMessageTime(message.createdAt)}
                  </motion.time>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 350, damping: 24 }}
                    className={`rounded-[1.4rem] px-4 py-3 shadow-lg backdrop-blur-xl ${
                      isMe
                        ? "rounded-br-md bg-gradient-to-br from-[#FF4D8D] via-[#F472B6] to-[#B14AED] text-white shadow-pink-500/20"
                        : "rounded-bl-md border border-white/10 bg-white/[0.07] text-white/85 shadow-black/20"
                    }`}
                  >
                    {message.image && (
                      <motion.img
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35 }}
                        src={message.image}
                        alt="Attachment"
                        className="mb-3 max-h-72 rounded-2xl object-cover"
                      />
                    )}

                    {message.text && (
                      <p className="whitespace-pre-wrap break-words text-sm leading-6">
                        {message.text}
                      </p>
                    )}
                  </motion.div>

                  {isMe && (
                    <motion.div
                      initial={{ opacity: 0, y: -2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`mt-1 flex items-center gap-1 px-1 text-[10px] font-medium tracking-wide ${
                        message.status === "seen"
                          ? "text-pink-200/80"
                          : "text-white/35"
                      }`}
                    >
                      <span>{getMessageStatus(message.status)}</span>
                    </motion.div>
                  )}
                </div>

                {isMe && (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    src={authUser.profilePic || "/avatar.png"}
                    alt="profile"
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-pink-300/30"
                  />
                )}
              </motion.div>
            );
          })}

          {isTyping && (
            <motion.div
              key="typing-indicator"
              ref={messageEndRef}
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="flex items-end gap-3 justify-start"
            >
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                src={selectedUser.profilePic || "/avatar.png"}
                alt="profile"
                className="h-9 w-9 rounded-full object-cover ring-2 ring-white/10"
              />

              <div className="flex max-w-[78%] flex-col items-start sm:max-w-[65%]">
                <div className="rounded-[1.4rem] rounded-bl-md border border-white/10 bg-white/[0.07] px-4 py-3 shadow-lg shadow-black/20 backdrop-blur-xl">
                  <div className="flex items-center gap-1.5">
                    <motion.span
                      animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="h-2 w-2 rounded-full bg-[#FF8AB4]"
                    />
                    <motion.span
                      animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.15,
                      }}
                      className="h-2 w-2 rounded-full bg-[#FF8AB4]"
                    />
                    <motion.span
                      animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3,
                      }}
                      className="h-2 w-2 rounded-full bg-[#FF8AB4]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <MessageInput />
    </motion.div>
  );
};

export default ChatContainer;