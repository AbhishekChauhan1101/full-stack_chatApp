import { motion, AnimatePresence } from "framer-motion";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Check, Palette, Send, Sparkles } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! SunoNaa feels so premium now ❤️",
    isSent: true,
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen overflow-hidden bg-[#0F0A1A] px-4 pt-24 pb-10 text-white"
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none fixed -left-32 top-20 h-80 w-80 rounded-full bg-pink-500/20 blur-[130px]"
      />

      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none fixed -right-24 bottom-0 h-96 w-96 rounded-full bg-purple-500/20 blur-[140px]"
      />

      <div className="relative mx-auto max-w-6xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="rounded-[34px] border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-3xl sm:p-8"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                whileHover={{ scale: 1.03 }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-pink-200"
              >
                <Sparkles size={16} />
                SunoNaa Preferences
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="text-3xl font-bold"
              >
                Settings
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 text-sm text-white/55"
              >
                Choose the look and feel of your chat experience.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.82, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                delay: 0.25,
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
              whileHover={{ scale: 1.08, rotate: -8 }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF4D8D] to-[#B14AED] shadow-lg shadow-pink-500/20"
            >
              <Palette size={24} />
            </motion.div>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18, duration: 0.55, ease: "easeOut" }}
            className="rounded-[34px] border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-3xl sm:p-8"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Theme</h2>
              <p className="mt-2 text-sm text-white/50">
                Pick a DaisyUI theme for the app interface.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {THEMES.map((t, index) => {
                const isActive = theme === t;

                return (
                  <motion.button
                    key={t}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.25 + index * 0.025,
                      duration: 0.3,
                    }}
                    whileHover={{ y: -5, scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTheme(t)}
                    className={`group relative rounded-2xl border p-2.5 transition-all duration-300 hover:bg-white/[0.08] ${
                      isActive
                        ? "border-pink-400/60 bg-pink-500/10 shadow-lg shadow-pink-500/10"
                        : "border-white/10 bg-white/[0.04]"
                    }`}
                  >
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 18,
                          }}
                          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#FF4D8D] to-[#B14AED] text-white shadow-lg"
                        >
                          <Check size={14} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div
                      className="relative h-12 w-full overflow-hidden rounded-xl"
                      data-theme={t}
                    >
                      <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                        <div className="rounded bg-primary" />
                        <div className="rounded bg-secondary" />
                        <div className="rounded bg-accent" />
                        <div className="rounded bg-neutral" />
                      </div>
                    </div>

                    <span className="mt-2 block w-full truncate text-center text-[11px] font-medium text-white/70">
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.24, duration: 0.55, ease: "easeOut" }}
            className="rounded-[34px] border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-3xl sm:p-8"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Preview</h2>
              <p className="mt-2 text-sm text-white/50">
                See how your selected theme feels in chat.
              </p>
            </div>

            <motion.div
              key={theme}
              initial={{ opacity: 0.7, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-base-100 shadow-2xl"
              data-theme={theme}
            >
              <div className="border-b border-base-300 bg-base-200/80 px-4 py-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-content"
                  >
                    S
                  </motion.div>

                  <div>
                    <h3 className="text-sm font-semibold">SunoNaa</h3>
                    <p className="text-xs text-base-content/60">Online</p>
                  </div>
                </div>
              </div>

              <div className="min-h-[240px] space-y-4 bg-base-100 p-4">
                {PREVIEW_MESSAGES.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{
                      opacity: 0,
                      y: 14,
                      x: message.isSent ? 18 : -18,
                    }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ delay: 0.15 + index * 0.12 }}
                    className={`flex ${
                      message.isSent ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[82%] rounded-2xl p-3 shadow-sm ${
                        message.isSent
                          ? "rounded-br-md bg-primary text-primary-content"
                          : "rounded-bl-md bg-base-200 text-base-content"
                      }`}
                    >
                      <p className="text-sm leading-6">{message.content}</p>
                      <p
                        className={`mt-1.5 text-[10px] ${
                          message.isSent
                            ? "text-primary-content/70"
                            : "text-base-content/60"
                        }`}
                      >
                        12:00 PM
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-base-300 bg-base-100 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input input-bordered h-11 flex-1 rounded-2xl text-sm"
                    placeholder="Type a message..."
                    value="This is a preview"
                    readOnly
                  />

                  <motion.button
                    whileHover={{ scale: 1.08, rotate: -8 }}
                    whileTap={{ scale: 0.94 }}
                    className="btn btn-primary h-11 min-h-0 rounded-2xl px-4"
                  >
                    <Send size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="mt-5 text-center text-sm text-white/35"
            >
              Every Heart Has Something to Say.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;