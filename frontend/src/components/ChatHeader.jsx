import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-20 border-b border-white/10 bg-[#181225]/70 backdrop-blur-2xl"
    >
      <div className="flex items-center justify-between px-5 py-4">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-white/10 shadow-lg"
            />

            {/* Online Indicator */}
            <motion.span
              animate={
                isOnline
                  ? {
                      scale: [1, 1.25, 1],
                      opacity: [1, 0.7, 1],
                    }
                  : {}
              }
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#181225] ${
                isOnline ? "bg-emerald-400" : "bg-zinc-500"
              }`}
            />
          </motion.div>

          {/* User Info */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col"
          >
            <h2 className="text-[16px] font-semibold tracking-wide text-white">
              {selectedUser.fullName}
            </h2>

            <div className="mt-0.5 flex items-center gap-2">
              <motion.span
                animate={
                  isOnline
                    ? {
                        scale: [1, 1.3, 1],
                        opacity: [1, 0.6, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                }}
                className={`h-2 w-2 rounded-full ${
                  isOnline ? "bg-emerald-400" : "bg-zinc-500"
                }`}
              />

              <p
                className={`text-xs font-medium ${
                  isOnline ? "text-emerald-300" : "text-white/45"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right */}
        <motion.button
          whileHover={{
            scale: 1.08,
            rotate: 90,
          }}
          whileTap={{
            scale: 0.92,
          }}
          transition={{
            type: "spring",
            stiffness: 350,
          }}
          onClick={() => setSelectedUser(null)}
          className="rounded-2xl border border-white/10 bg-white/5 p-2.5 text-white/70 transition-all duration-300 hover:border-pink-400/30 hover:bg-gradient-to-r hover:from-pink-500/15 hover:to-purple-500/15 hover:text-white"
        >
          <X size={20} />
        </motion.button>
      </div>
    </motion.header>
  );
};

export default ChatHeader;