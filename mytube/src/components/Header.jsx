"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Search, Upload, Bell, Menu, Mic, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Header({
  user,
  hasNotifications = true,
  onToggleSidebar,
}) {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  /*
   * Determines what "Auto" should currently display.
   * 6:00 AM - 4:59 PM = Light
   * 5:00 PM - 5:59 AM = Dark
   */
  const getAutoTheme = () => {
    const hour = new Date().getHours();

    return hour >= 6 && hour < 17 ? "light" : "dark";
  };

  /*
   * Apply Auto mode.
   */
  useEffect(() => {
    if (!mounted) return;

    const savedTheme = localStorage.getItem("mytube-theme") || "auto";

    if (savedTheme === "auto") {
      setTheme(getAutoTheme());

      // Check periodically so Auto changes while the app is open.
      const interval = setInterval(() => {
        setTheme(getAutoTheme());
      }, 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [mounted, setTheme]);

  const handleThemeChange = (selectedTheme) => {
    localStorage.setItem("mytube-theme", selectedTheme);

    if (selectedTheme === "auto") {
      setTheme(getAutoTheme());
    } else {
      setTheme(selectedTheme);
    }

    setThemeMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const currentTheme =
    mounted
      ? localStorage.getItem("mytube-theme") || "auto"
      : "auto";

  const themeLabel = {
    light: "Light",
    dark: "Dark",
    auto: "Auto",
  };

  return (
    <header
      className="
        flex items-center justify-between gap-4 px-4 py-2.5
        border-b border-gray-200 dark:border-[#272727]
        bg-white dark:bg-[#0F0F0F]
        sticky top-0 z-20
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleSidebar}
          className="
            p-2 rounded-full
            hover:bg-gray-100 dark:hover:bg-[#272727]
            text-gray-800 dark:text-[#F1F1F1]
          "
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icon.JPG"
            alt="MyTube Logo"
            width={59}
            height={59}
            priority
            className="rounded-lg object-contain"
          />

          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-[#F1F1F1]">
            MyTube
          </span>
        </Link>
      </div>

      {/* SEARCH */}
      <form
        onSubmit={handleSearch}
        className="flex-1 max-w-xl hidden md:flex items-center gap-3"
      >
        <div
          className="
            flex w-full rounded-full overflow-hidden
            border border-gray-300 dark:border-[#303030]
            focus-within:border-[#1c62b9]
          "
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="
              flex-1 px-4 py-1.5 text-sm
              bg-white dark:bg-[#121212]
              text-gray-900 dark:text-[#F1F1F1]
              placeholder:text-gray-500 dark:placeholder:text-[#8A8A8A]
              focus:outline-none
            "
          />

          <button
            type="submit"
            className="
              px-4
              bg-gray-100 dark:bg-[#222222]
              hover:bg-gray-200 dark:hover:bg-[#2c2c2c]
              text-gray-800 dark:text-[#F1F1F1]
              border-l border-gray-300 dark:border-[#303030]
            "
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          className="
            w-9 h-9 shrink-0 rounded-full
            bg-gray-100 dark:bg-[#181818]
            hover:bg-gray-200 dark:hover:bg-[#272727]
            flex items-center justify-center
          "
          aria-label="Search with voice"
        >
          <Mic className="w-4 h-4 text-gray-800 dark:text-[#F1F1F1]" />
        </button>
      </form>

      {/* RIGHT */}
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href="/create"
          className="
            hidden sm:flex items-center gap-2 rounded-full
            px-3 py-1.5 text-sm font-medium
            bg-gray-100 dark:bg-[#272727]
            text-gray-900 dark:text-[#F1F1F1]
            hover:bg-gray-200 dark:hover:bg-[#3a3a3a]
          "
        >
          <Upload className="w-4 h-4" />
          Create
        </Link>

        {user ? (
          <>
            {/* NOTIFICATIONS */}
            <button
              className="
                relative p-2 rounded-full
                hover:bg-gray-100 dark:hover:bg-[#272727]
                text-gray-800 dark:text-[#F1F1F1]
              "
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />

              {hasNotifications && (
                <span className="absolute top-1 right-1.5 w-2 h-2 rounded-full bg-[#E8352B]" />
              )}
            </button>

            {/* PROFILE */}
            <div className="relative">
              <button
                onClick={() => {
                  setMenuOpen((v) => !v);
                  setThemeMenuOpen(false);
                }}
                className="
                  w-8 h-8 rounded-full
                  flex items-center justify-center
                  text-sm font-medium text-white
                "
                style={{ background: "#E8352B" }}
                aria-label="Profile menu"
              >
                {user.name?.[0]?.toUpperCase() || "?"}
              </button>

              {menuOpen && (
                <div
                  className="
                    absolute right-0 mt-2 w-56
                    rounded-lg border
                    border-gray-200 dark:border-[#272727]
                    bg-white dark:bg-[#212121]
                    shadow-lg py-1 text-sm
                    text-gray-900 dark:text-[#F1F1F1]
                  "
                >
                  <Link
                    href="/channel/me"
                    className="
                      block px-4 py-2
                      hover:bg-gray-100 dark:hover:bg-[#3a3a3a]
                    "
                  >
                    Your channel
                  </Link>

                  <Link
                    href="/upgrade"
                    className="
                      block px-4 py-2
                      hover:bg-gray-100 dark:hover:bg-[#3a3a3a]
                    "
                  >
                    Upgrade plan
                  </Link>

                  {/* THEME */}
                  <button
                    onClick={() => setThemeMenuOpen((v) => !v)}
                    className="
                      w-full flex items-center justify-between
                      px-4 py-2 text-left
                      hover:bg-gray-100 dark:hover:bg-[#3a3a3a]
                    "
                  >
                    <span>Theme</span>

                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <span>
                        {themeLabel[currentTheme]}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>

                  {/* THEME OPTIONS */}
                  {themeMenuOpen && (
                    <div
                      className="
                        mx-2 my-1 rounded-md
                        border border-gray-200 dark:border-[#333]
                        bg-gray-50 dark:bg-[#181818]
                        overflow-hidden
                      "
                    >
                      <button
                        onClick={() => handleThemeChange("light")}
                        className={`
                          w-full text-left px-4 py-2
                          hover:bg-gray-200 dark:hover:bg-[#2c2c2c]
                          ${currentTheme === "light" ? "font-semibold" : ""}
                        `}
                      >
                        ☀️ Light
                      </button>

                      <button
                        onClick={() => handleThemeChange("dark")}
                        className={`
                          w-full text-left px-4 py-2
                          hover:bg-gray-200 dark:hover:bg-[#2c2c2c]
                          ${currentTheme === "dark" ? "font-semibold" : ""}
                        `}
                      >
                        🌙 Dark
                      </button>

                      <button
                        onClick={() => handleThemeChange("auto")}
                        className={`
                          w-full text-left px-4 py-2
                          hover:bg-gray-200 dark:hover:bg-[#2c2c2c]
                          ${currentTheme === "auto" ? "font-semibold" : ""}
                        `}
                      >
                        🌓 Auto
                      </button>
                    </div>
                  )}

                  <div className="my-1 border-t border-gray-200 dark:border-[#333]" />

                  <button
                    className="
                      w-full text-left px-4 py-2
                      hover:bg-gray-100 dark:hover:bg-[#3a3a3a]
                    "
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link
            href="/login"
            className="
              rounded-full border
              border-gray-300 dark:border-[#303030]
              px-4 py-1.5 text-sm font-medium
              text-[#065FD4] dark:text-[#3EA6FF]
              hover:bg-gray-100 dark:hover:bg-[#272727]
            "
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}