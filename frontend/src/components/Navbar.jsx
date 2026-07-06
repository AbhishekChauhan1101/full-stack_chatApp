import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, User } from "lucide-react";
import logo from "../assets/sunonaa-logo.png";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="fixed top-0 z-40 w-full border-b border-white/10 bg-[#0F0A1A]/75 backdrop-blur-2xl"
    >
      <div className="mx-auto h-16 max-w-7xl px-4">
        <div className="flex h-full items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/"
              className="group flex items-center gap-3 transition-all duration-300 hover:opacity-90"
            >
              <motion.div
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-lg transition-all duration-300 group-hover:scale-105"
              >
                <motion.img
                  src={logo}
                  alt="SunoNaa"
                  className="h-7 w-7 object-contain"
                  animate={{ y: [0, -2, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              <div className="leading-none">
                <motion.h1
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-pink-300 via-[#FF4D8D] to-[#B14AED] bg-clip-text text-lg font-bold text-transparent"
                >
                  SunoNaa
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="hidden text-[10px] font-medium text-white/35 sm:block"
                >
                  Every Heart Has Something to Say.
                </motion.p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2"
          >
            <motion.div whileHover={{ y: -3, scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/settings"
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/70 transition-all duration-300 hover:border-pink-400/30 hover:bg-white/10 hover:text-white"
              >
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.35 }}
                >
                  <Settings size={17} />
                </motion.div>

                <span className="hidden sm:inline">Settings</span>
              </Link>
            </motion.div>

            {authUser && (
              <>
                <motion.div whileHover={{ y: -3, scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/70 transition-all duration-300 hover:border-pink-400/30 hover:bg-white/10 hover:text-white"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <User size={17} />
                    </motion.div>

                    <span className="hidden sm:inline">Profile</span>
                  </Link>
                </motion.div>

                <motion.button
                  whileHover={{
                    y: -3,
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  onClick={logout}
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF4D8D] to-[#B14AED] px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-500/20"
                >
                  <motion.div
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LogOut size={17} />
                  </motion.div>

                  <span className="hidden sm:inline">Logout</span>
                </motion.button>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;