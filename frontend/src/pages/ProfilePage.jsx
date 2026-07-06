import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, CalendarHeart, CheckCircle2, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen overflow-hidden bg-[#0F0A1A] px-4 pt-24 text-white"
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none fixed left-[-120px] top-16 h-80 w-80 rounded-full bg-pink-500/20 blur-[130px]"
      />

      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none fixed bottom-[-120px] right-[-80px] h-96 w-96 rounded-full bg-purple-500/20 blur-[140px]"
      />

      <div className="relative mx-auto max-w-3xl pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.05] shadow-2xl backdrop-blur-3xl"
        >
          <div className="relative h-40 bg-gradient-to-br from-[#FF4D8D] via-[#FF8AB4] to-[#B14AED]">
            <div className="absolute inset-0 bg-black/10" />

            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-6 left-6"
            >
              <h1 className="text-3xl font-bold">Profile</h1>
              <p className="mt-1 text-sm text-white/75">
                Your SunoNaa identity
              </p>
            </motion.div>
          </div>

          <div className="px-6 pb-8">
            <div className="-mt-16 flex flex-col items-center gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.25,
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                }}
                className="relative"
              >
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="h-32 w-32 rounded-full border-4 border-[#181225] object-cover shadow-2xl ring-4 ring-pink-300/20"
                />

                <motion.label
                  whileHover={{ scale: 1.1, rotate: -8 }}
                  whileTap={{ scale: 0.92 }}
                  htmlFor="avatar-upload"
                  className={`absolute bottom-1 right-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-[#FF4D8D] to-[#B14AED] text-white shadow-lg transition-all duration-300 ${
                    isUpdatingProfile
                      ? "pointer-events-none animate-pulse opacity-70"
                      : ""
                  }`}
                >
                  <Camera size={19} />

                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </motion.label>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold">{authUser?.fullName}</h2>
                <p className="mt-1 text-sm text-white/50">
                  {isUpdatingProfile
                    ? "Updating your photo..."
                    : "Click the camera icon to update your photo"}
                </p>
              </motion.div>
            </div>

            <div className="mt-10 grid gap-4">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl"
              >
                <div className="mb-2 flex items-center gap-2 text-sm text-pink-200">
                  <User size={17} />
                  Full Name
                </div>
                <p className="rounded-2xl border border-white/10 bg-[#0F0A1A]/60 px-4 py-3 text-white/85">
                  {authUser?.fullName}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.56 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl"
              >
                <div className="mb-2 flex items-center gap-2 text-sm text-pink-200">
                  <Mail size={17} />
                  Email Address
                </div>
                <p className="rounded-2xl border border-white/10 bg-[#0F0A1A]/60 px-4 py-3 text-white/85">
                  {authUser?.email}
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.64 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="mt-6 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl"
            >
              <h3 className="mb-5 text-lg font-semibold">
                Account Information
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <span className="flex items-center gap-2 text-white/55">
                    <CalendarHeart size={16} />
                    Member Since
                  </span>
                  <span className="font-medium text-white/85">
                    {authUser.createdAt?.split("T")[0]}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2 text-white/55">
                    <CheckCircle2 size={16} />
                    Account Status
                  </span>

                  <motion.span
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(52,211,153,0.12)",
                        "0 0 18px rgba(52,211,153,0.25)",
                        "0 0 0 rgba(52,211,153,0.12)",
                      ],
                    }}
                    transition={{ duration: 2.4, repeat: Infinity }}
                    className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300"
                  >
                    Active
                  </motion.span>
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.78 }}
              className="mt-6 text-center text-sm text-white/35"
            >
              Every Heart Has Something to Say.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;