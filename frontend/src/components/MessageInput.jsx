import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const typingTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);

  const { sendMessage, selectedUser } = useChatStore();
  const { authUser, socket } = useAuthStore();

  const handleTyping = (value) => {
    setText(value);

    if (!selectedUser || !authUser || !socket) return;

    socket.emit("typing", {
      senderId: authUser._id,
      receiverId: selectedUser._id,
    });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", {
        senderId: authUser._id,
        receiverId: selectedUser._id,
      });
    }, 1200);
  };

  const stopTypingNow = () => {
    if (!selectedUser || !authUser || !socket) return;

    socket.emit("stopTyping", {
      senderId: authUser._id,
      receiverId: selectedUser._id,
    });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!text.trim() && !imagePreview) return;

    try {
      stopTypingNow();

      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const canSend = text.trim() || imagePreview;

  return (
    <motion.div
      initial={{ y: 35, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full border-t border-white/10 bg-[#181225]/70 px-3 py-3 backdrop-blur-2xl sm:px-5 sm:py-4"
    >
      <AnimatePresence>
        {imagePreview && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="mb-3 flex items-center"
          >
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-2 shadow-xl">
              <motion.img
                src={imagePreview}
                alt="Preview"
                className="h-24 w-24 rounded-2xl object-cover"
                initial={{ scale: 0.92 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={removeImage}
                className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-[#0F0A1A] text-white/80 shadow-lg transition-all duration-300 hover:bg-pink-500 hover:text-white"
                type="button"
              >
                <X size={14} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 sm:gap-3"
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <motion.button
          whileHover={{
            scale: 1.08,
            rotate: -8,
          }}
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 ${
            imagePreview ? "text-emerald-300" : "text-white/55"
          }`}
        >
          <Image size={21} />
        </motion.button>

        <motion.div
          whileFocus={{ scale: 1.01 }}
          className="flex-1 rounded-3xl border border-white/10 bg-white/[0.06] px-4 py-2 shadow-inner backdrop-blur-xl transition-all duration-300 focus-within:border-pink-400/40 focus-within:bg-white/[0.09] focus-within:shadow-pink-500/10"
        >
          <input
            type="text"
            className="h-9 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35 sm:text-[15px]"
            placeholder="Write your heart out..."
            value={text}
            onChange={(e) => handleTyping(e.target.value)}
            onBlur={stopTypingNow}
          />
        </motion.div>

        <motion.button
          whileHover={
            canSend
              ? {
                  scale: 1.08,
                  rotate: -10,
                }
              : {}
          }
          whileTap={
            canSend
              ? {
                  scale: 0.92,
                }
              : {}
          }
          animate={
            canSend
              ? {
                  boxShadow: [
                    "0 0 0 rgba(255,77,141,0.2)",
                    "0 0 18px rgba(255,77,141,0.45)",
                    "0 0 0 rgba(255,77,141,0.2)",
                  ],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          type="submit"
          disabled={!canSend}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${
            canSend
              ? "bg-gradient-to-br from-[#FF4D8D] via-[#FF8AB4] to-[#B14AED] text-white shadow-lg shadow-pink-500/25"
              : "cursor-not-allowed border border-white/10 bg-white/5 text-white/25"
          }`}
        >
          <Send size={20} />
        </motion.button>
      </form>
    </motion.div>
  );
};

export default MessageInput;