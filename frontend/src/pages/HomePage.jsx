import { motion, AnimatePresence } from "framer-motion";
import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="relative h-screen overflow-hidden bg-[#0F0A1A] text-white"
    >
      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#FF4D8D]/25 blur-[130px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-[#B14AED]/25 blur-[150px]"
      />

      <motion.div
        animate={{
          x: [0, 10, 0],
          y: [0, -18, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[#FF8AB4]/10 blur-[120px]"
      />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative flex h-full items-center justify-center px-4 py-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.55,
            ease: "easeOut",
          }}
          className="h-full w-full max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-[0_25px_90px_rgba(0,0,0,0.5)] backdrop-blur-3xl"
        >
          <div className="flex h-full overflow-hidden">
            <Sidebar />

            <main className="min-w-0 flex-1 bg-[#0F0A1A]/35">
              <AnimatePresence mode="wait">
                {!selectedUser ? (
                  <motion.div
                    key="no-chat"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="h-full"
                  >
                    <NoChatSelected />
                  </motion.div>
                ) : (
                  <motion.div
                    key={selectedUser._id}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{
                      duration: 0.28,
                      ease: "easeOut",
                    }}
                    className="h-full"
                  >
                    <ChatContainer />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;