import { motion } from "framer-motion";
import { MessageCircleHeart } from "lucide-react";
import logo from "../assets/sunonaa-logo.png";

const NoChatSelected = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex h-full w-full flex-1 items-center justify-center overflow-hidden bg-[#0F0A1A]"
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
        className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-pink-500/20 blur-[120px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-purple-500/20 blur-[140px]"
      />

      <motion.div
        animate={{
          y: [0, -18, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400/5 blur-[120px]"
      />

      {/* Floating Blur Circles */}
      <motion.div
        animate={{ y: [0, -15, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity }}
        className="absolute left-24 top-24 h-5 w-5 rounded-full bg-pink-400/40"
      />

      <motion.div
        animate={{ y: [0, 15, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute right-32 top-40 h-3 w-3 rounded-full bg-purple-400/50"
      />

      <motion.div
        animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4.5, repeat: Infinity }}
        className="absolute bottom-28 left-1/3 h-4 w-4 rounded-full bg-pink-300/30"
      />

      <motion.div
        animate={{ y: [0, 12, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-40 right-1/4 h-6 w-6 rounded-full bg-purple-400/20"
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.65,
          ease: "easeOut",
        }}
        className="relative mx-6 max-w-xl rounded-[34px] border border-white/10 bg-white/[0.05] px-10 py-14 text-center shadow-2xl backdrop-blur-3xl"
      >
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 rgba(255,77,141,.15)",
                "0 0 45px rgba(255,77,141,.35)",
                "0 0 0 rgba(255,77,141,.15)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl"
          >
            <motion.img
              src={logo}
              alt="SunoNaa"
              className="h-24 w-24 object-contain"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex justify-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
            }}
            className="rounded-full bg-gradient-to-br from-[#FF4D8D]/20 to-[#B14AED]/20 p-4"
          >
            <MessageCircleHeart
              size={34}
              className="text-[#FF8AB4]"
            />
          </motion.div>
        </motion.div>

        {/* Brand */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-pink-300 via-pink-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent"
        >
          SunoNaa
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-3 text-lg font-medium text-pink-200"
        >
          Every Heart Has Something to Say.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mx-auto mt-6 max-w-md leading-7 text-white/60"
        >
          Choose a conversation from the sidebar and begin sharing your
          thoughts, memories, and moments in a private, beautiful space made
          just for meaningful conversations.
        </motion.p>

        {/* Bottom Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.03 }}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/70 backdrop-blur-xl"
        >
          <motion.span
            animate={{
              scale: [1, 1.35, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
            className="h-2.5 w-2.5 rounded-full bg-emerald-400"
          />

          Ready to start a conversation
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NoChatSelected;