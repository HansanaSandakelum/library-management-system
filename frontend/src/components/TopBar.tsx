import { Search, Sun, Moon, Bell, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hooks/useTheme";

export default function TopBar() {
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="top-bar">
      {/* Search */}
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-[#a0a3b1]" />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-72 pl-10 pr-4 py-2 text-[13px] bg-[#f4f5f7] dark:bg-[#0c0e14] border border-transparent dark:border-[#1c1f2e]
            rounded-xl text-[#1a1d26] dark:text-[#e2e4e9] placeholder:text-[#a0a3b1] dark:placeholder:text-[#5a5d6e]
            outline-none focus:border-[#6c5ce7] dark:focus:border-[#6c5ce7] focus:ring-2 focus:ring-[#6c5ce7]/15 focus:bg-white
            transition-all duration-200"
        />
        <div className="ml-2 flex items-center gap-0.5 px-1.5 py-1 rounded-lg bg-[#f4f5f7] dark:bg-[#1c1f2e] border border-[#edeef1] dark:border-[#2a2d3e]">
          <span className="text-[10px] font-semibold text-[#a0a3b1] dark:text-[#8b8fa3]">
            ⌘K
          </span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-[#8b8fa3] hover:text-[#1a1d26] dark:hover:text-[#e2e4e9]
            hover:bg-[#f4f5f7] dark:hover:bg-[#1c1f2e] transition-all duration-150"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Sun className="w-[18px] h-[18px]" />
          ) : (
            <Moon className="w-[18px] h-[18px]" />
          )}
        </button>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-xl text-[#8b8fa3] hover:text-[#1a1d26] dark:hover:text-[#e2e4e9]
            hover:bg-[#f4f5f7] dark:hover:bg-[#1c1f2e] transition-all duration-150"
        >
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#6c5ce7] rounded-full border-2 border-white dark:border-[#12141c]" />
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-[#edeef1] dark:bg-[#1c1f2e] mx-1" />

        {/* User */}
        {user && (
          <button className="flex items-center gap-2.5 pl-1 pr-2 py-1.5 rounded-xl hover:bg-[#f4f5f7] dark:hover:bg-[#1c1f2e] transition-all duration-150">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#6c5ce7] text-white text-xs font-bold">
              {user.username.slice(0, 2).toUpperCase()}
            </div>
            <div className="hidden sm:flex flex-col items-start leading-none">
              <span className="text-[13px] font-semibold text-[#1a1d26] dark:text-[#e2e4e9]">
                {user.username}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#a0a3b1]" />
          </button>
        )}
      </div>
    </header>
  );
}
