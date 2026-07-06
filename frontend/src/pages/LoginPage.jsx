import { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/sunonaa-logo.png";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, Heart } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0F0A1A] text-white flex items-center justify-center px-4 py-10">
      {/* Background Glow */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#FF4D8D]/30 blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.42, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-[#B14AED]/30 blur-[140px]"
      />
      <motion.div
        animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 h-72 w-72 rounded-full bg-[#FF8AB4]/10 blur-[110px]"
      />

      <motion.div
        animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity }}
        className="absolute left-[12%] top-[22%] h-3 w-3 rounded-full bg-pink-300/50 blur-[1px]"
      />
      <motion.div
        animate={{ y: [0, 12, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute right-[18%] top-[28%] h-2 w-2 rounded-full bg-purple-300/50 blur-[1px]"
      />
      <motion.div
        animate={{ y: [0, -10, 0], opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 4.5, repeat: Infinity }}
        className="absolute bottom-[24%] left-[20%] h-2.5 w-2.5 rounded-full bg-pink-400/40 blur-[1px]"
      />
      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-[18%] right-[28%] h-3 w-3 rounded-full bg-purple-400/40 blur-[1px]"
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 items-center gap-10">
        {/* Left Branding */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="hidden lg:block"
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-xl"
          >
            <Heart className="h-4 w-4 text-[#FF4D8D] fill-[#FF4D8D]" />
            Private messages. Real feelings.
          </motion.div>

          <h1 className="mt-8 text-6xl font-black tracking-tight leading-tight">
            Say it softly.
            <br />
            <span className="bg-gradient-to-r from-[#FF4D8D] via-[#FF8AB4] to-[#B14AED] bg-clip-text text-transparent">
              Feel it deeply.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-white/60">
            SunoNaa is your private space for meaningful conversations,
            memories, and emotions.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {["Private", "Romantic", "Smooth"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.12, duration: 0.55 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 text-center backdrop-blur-xl"
              >
                <p className="text-sm font-semibold text-white/80">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md"
        >
          <motion.div
            animate={{ opacity: [0.22, 0.42, 0.22] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-1 rounded-[2.2rem] bg-gradient-to-r from-[#FF4D8D] to-[#B14AED] opacity-30 blur-2xl"
          />

          <div className="relative rounded-[2.3rem] border border-white/15 bg-white/[0.07] p-7 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-3xl overflow-hidden">
            <div className="absolute inset-0 rounded-[2.3rem] bg-gradient-to-br from-white/10 via-transparent to-pink-500/10 pointer-events-none" />
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#FF4D8D]/20 blur-3xl pointer-events-none"
            />

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="text-center"
              >
                <div className="flex justify-center">
                  <motion.img
                    src={logo}
                    alt="SunoNaa Logo"
                    className="w-36 h-36 object-contain select-none drop-shadow-[0_10px_35px_rgba(255,77,141,0.35)]"
                    draggable={false}
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                <h1 className="mt-4 text-5xl font-black tracking-tight">
                  SunoNaa
                </h1>

                <p className="mt-3 text-base text-white/65 font-light tracking-wide">
                  Every Heart Has Something to Say.
                </p>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.6 }}
              >
                <div>
                  <label className="text-sm font-medium text-white/70">
                    Email
                  </label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#FF8AB4]/70" />
                    <input
                      type="email"
                      required
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 pl-12 text-white placeholder:text-white/30 shadow-inner outline-none transition-all duration-300 focus:border-[#FF4D8D] focus:bg-white/10 focus:shadow-[0_0_25px_rgba(255,77,141,0.25)]"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white/70">
                    Password
                  </label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#FF8AB4]/70" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 pl-12 text-white placeholder:text-white/30 shadow-inner outline-none transition-all duration-300 focus:border-[#FF4D8D] focus:bg-white/10 focus:shadow-[0_0_25px_rgba(255,77,141,0.25)]"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />

                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 transition hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoggingIn}
                  className="group relative h-14 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#FF4D8D] via-[#F472B6] to-[#B14AED] font-semibold text-white shadow-[0_12px_35px_rgba(255,77,141,0.35)] transition-all duration-300 hover:shadow-[0_18px_45px_rgba(255,77,141,0.5)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 overflow-hidden rounded-2xl">
                    <span className="absolute -left-1/2 top-0 h-full w-1/3 -skew-x-12 bg-white/30 blur-sm transition-all duration-700 group-hover:left-[120%]" />
                  </span>

                  <span className="relative flex items-center justify-center gap-2">
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Opening your space...
                      </>
                    ) : (
                      <>Continue ❤️</>
                    )}
                  </span>
                </motion.button>
              </motion.form>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="mt-7 text-center text-sm text-white/55"
              >
                Don&apos;t have a private space?{" "}
                <Link
                  to="/signup"
                  className="font-bold text-[#FF8AB4] transition hover:text-white"
                >
                  Create one
                </Link>
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;