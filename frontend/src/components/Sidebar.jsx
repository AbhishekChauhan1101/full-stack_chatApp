import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Search, Heart } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users
    .filter((user) => (showOnlineOnly ? onlineUsers.includes(user._id) : true))
    .filter((user) =>
      user.fullName?.toLowerCase().includes(search.toLowerCase())
    );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="h-full w-20 lg:w-80 border-r border-white/10 bg-white/[0.04] backdrop-blur-2xl flex flex-col"
    >
      <div className="p-4 lg:p-5 border-b border-white/10">
        <div className="flex items-center justify-center lg:justify-between gap-3">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.45 }}
            className="flex items-center gap-3"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 12px 28px rgba(255,77,141,0.18)",
                  "0 16px 42px rgba(177,74,237,0.32)",
                  "0 12px 28px rgba(255,77,141,0.18)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#FF4D8D] to-[#B14AED] flex items-center justify-center shadow-lg shadow-pink-500/25"
            >
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="h-5 w-5 text-white fill-white" />
              </motion.div>
            </motion.div>

            <div className="hidden lg:block">
              <h2 className="font-black text-xl tracking-tight">SunoNaa</h2>
              <p className="text-xs text-white/45">Private conversations</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.22, duration: 0.4 }}
            className="hidden lg:flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-emerald-400"
            />
            {Math.max(onlineUsers.length - 1, 0)}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.45 }}
          className="hidden lg:block mt-5"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
            <input
              type="text"
              placeholder="Search hearts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#FF4D8D]/70 focus:bg-white/[0.09]"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.45 }}
          className="mt-4 hidden lg:flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
        >
          <div>
            <p className="text-sm font-medium text-white/80">Online only</p>
            <p className="text-xs text-white/35">
              {Math.max(onlineUsers.length - 1, 0)} available now
            </p>
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => setShowOnlineOnly(!showOnlineOnly)}
            className={`relative h-6 w-11 rounded-full transition ${
              showOnlineOnly
                ? "bg-gradient-to-r from-[#FF4D8D] to-[#B14AED]"
                : "bg-white/15"
            }`}
          >
            <motion.span
              animate={{ left: showOnlineOnly ? 24 : 4 }}
              transition={{ type: "spring", stiffness: 520, damping: 30 }}
              className="absolute top-1 h-4 w-4 rounded-full bg-white"
            />
          </motion.button>
        </motion.div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3 lg:px-3">
        <AnimatePresence mode="popLayout">
          {filteredUsers.map((user, index) => {
            const isOnline = onlineUsers.includes(user._id);
            const isSelected = selectedUser?._id === user._id;

            return (
              <motion.button
                layout
                key={user._id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ delay: index * 0.035, duration: 0.28 }}
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedUser(user)}
                className={`group mb-2 w-full rounded-2xl p-3 flex items-center gap-3 transition-all duration-300 ${
                  isSelected
                    ? "bg-gradient-to-r from-[#FF4D8D]/25 to-[#B14AED]/20 border border-[#FF8AB4]/25 shadow-lg shadow-pink-500/10"
                    : "border border-transparent hover:border-white/10 hover:bg-white/[0.06]"
                }`}
              >
                <div className="relative mx-auto lg:mx-0">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-white/10"
                  />

                  {isOnline && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 24 }}
                      className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-400 ring-2 ring-[#181225]"
                    />
                  )}
                </div>

                <div className="hidden lg:block min-w-0 text-left flex-1">
                  <div className="truncate font-semibold text-white/90">
                    {user.fullName}
                  </div>

                  <div className="mt-0.5 text-sm text-white/40">
                    {isOnline ? "Online now" : "Offline"}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>

        {filteredUsers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden lg:block text-center text-white/40 py-10"
          >
            No users found
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;