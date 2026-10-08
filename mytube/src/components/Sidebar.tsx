"use client";

import { useState } from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Home,
  Zap,
  Rss,
  ChevronDown,
  ChevronUp,
  User,
  History,
  ListVideo,
  Clock,
  ThumbsUp,
  Video,
  Download,
  Tv,
  Radio,
  Sparkles,
  BarChart3,
  Music,
  BookOpen,
} from "lucide-react";

const MOCK_SUBSCRIPTIONS = [
  { name: "MYTUBER 1 ", color: "#E8352B" },
  { name: "MYTUBER 2", color: "#8B5CF6" },
  { name: "MYTUBER 3 ", color: "#3B82F6" },
  { name: "MYTUBER 4 ", color: "#16A34A" },
  { name: "MYTUBER 5 ", color: "#F97316" },
  { name: "MYTUBER 6", color: "#DC2626" },
  { name: "MYTUBER 7 ", color: "#7C3AED" },
];

const YOU_ITEMS = [
  { label: "Your channel", href: "/channel/me", icon: User },
  { label: "Upgrade to Premium", href: "/premium", icon: Sparkles },
  { label: "History", href: "/history", icon: History },
  { label: "Playlists", href: "/playlists", icon: ListVideo },
  { label: "Watch later", href: "/watch-later", icon: Clock },
  { label: "Liked videos", href: "/liked", icon: ThumbsUp },
  { label: "Your videos", href: "/channel/me/videos", icon: Video },
  { label: "Downloads", href: "/downloads", icon: Download },
];

const MORE_FROM_MYTUBE = [
  { label: "MyTube Premium", href: "/premium", icon: Sparkles },
  { label: "MyTube Studio", href: "/studio", icon: BarChart3 },
  { label: "MyTube Music", href: "/music", icon: Music },
  { label: "MyTube Kids", href: "/kids", icon: BookOpen },
];

const FOOTER_LINKS = [
  "About",
  "Press",
  "Copyright",
  "Contact",
  "Creators",
  "Advertise",
  "Developers",
  "Terms",
  "Privacy",
  "Policy & Safety",
  "How MyTube works",
];

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  collapsed?: boolean;
  active?: boolean;
}

function NavLink({
  href,
  icon: Icon,
  label,
  collapsed = false,
  active = false,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-4 px-5 py-2.5 mx-2 rounded-lg text-sm transition-colors ${
        active
          ? "bg-gray-200 text-gray-900 dark:bg-[#272727] dark:text-[#F1F1F1] font-medium"
          : "text-gray-800 hover:bg-gray-100 dark:text-[#F1F1F1] dark:hover:bg-[#272727]"
      } ${collapsed ? "justify-center px-0" : ""}`}
    >
      <Icon className="w-5 h-5 shrink-0" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

export default function Sidebar({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();
  const [youOpen, setYouOpen] = useState(true);
  const [subsOpen, setSubsOpen] = useState(true);
  const [showAllSubs, setShowAllSubs] = useState(false);

  if (collapsed) {
    return (
      <aside className="hidden sm:flex flex-col shrink-0 border-r border-gray-200 bg-white dark:border-[#272727] dark:bg-[#0F0F0F] py-3 w-[72px]">
        <NavLink href="/" icon={Home} label="Home" collapsed active={pathname === "/"} />
        <NavLink href="/shorts" icon={Zap} label="Shorts" collapsed active={pathname === "/shorts"} />
        <NavLink href="/subscriptions" icon={Rss} label="Subscriptions" collapsed active={pathname === "/subscriptions"} />
      </aside>
    );
  }

  const visibleSubs = showAllSubs
    ? MOCK_SUBSCRIPTIONS
    : MOCK_SUBSCRIPTIONS.slice(0, 6);

  return (
    <aside className="hidden sm:flex flex-col shrink-0 border-r border-gray-200 bg-white dark:border-[#272727] dark:bg-[#0F0F0F] w-[240px] py-3 overflow-y-auto max-h-[calc(100vh-56px)] sticky top-[56px]">
      <NavLink href="/" icon={Home} label="Home" active={pathname === "/"} />
      <NavLink href="/shorts" icon={Zap} label="Shorts" active={pathname === "/shorts"} />
      <NavLink href="/subscriptions" icon={Rss} label="Subscriptions" active={pathname === "/subscriptions"} />

      <div className="h-px bg-gray-200 dark:bg-[#272727] my-3 mx-4" />

      <button
        onClick={() => setYouOpen((v) => !v)}
        className="flex items-center justify-between px-5 py-2 mx-2 text-sm font-medium text-gray-900 dark:text-[#F1F1F1]"
      >
        You
        {youOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {youOpen &&
        YOU_ITEMS.map((item) => (
          <NavLink key={item.href} {...item} active={pathname === item.href} />
        ))}

      <div className="h-px bg-gray-200 dark:bg-[#272727] my-3 mx-4" />

      <button
        onClick={() => setSubsOpen((v) => !v)}
        className="flex items-center justify-between px-5 py-2 mx-2 text-sm font-medium text-gray-900 dark:text-[#F1F1F1]"
      >
        Subscriptions
        {subsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {subsOpen && (
        <>
          {visibleSubs.map((sub) => (
            <Link
              key={sub.name}
              href={`/channel/${encodeURIComponent(sub.name.trim())}`}
              className="flex items-center gap-4 px-5 py-2 mx-2 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-[#F1F1F1] dark:hover:bg-[#272727]"
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium text-white shrink-0"
                style={{ background: sub.color }}
              >
                {sub.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </span>
              <span className="truncate">{sub.name}</span>
            </Link>
          ))}

          {!showAllSubs && MOCK_SUBSCRIPTIONS.length > 6 && (
            <button
              onClick={() => setShowAllSubs(true)}
              className="flex items-center gap-4 px-5 py-2 mx-2 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-[#F1F1F1] dark:hover:bg-[#272727]"
            >
              <ChevronDown className="w-5 h-5" />
              Show more
            </button>
          )}
        </>
      )}

      <div className="h-px bg-gray-200 dark:bg-[#272727] my-3 mx-4" />

      <NavLink href="/movies" icon={Tv} label="Movies & TV" active={pathname === "/movies"} />
      <NavLink href="/podcasts" icon={Radio} label="Podcasts" active={pathname === "/podcasts"} />

      <div className="h-px bg-gray-200 dark:bg-[#272727] my-3 mx-4" />

      <p className="px-5 py-1 text-sm font-medium text-gray-900 dark:text-[#F1F1F1]">
        More from MyTube
      </p>

      {MORE_FROM_MYTUBE.map((item) => (
        <NavLink
          key={item.label}
          href={item.href}
          icon={item.icon}
          label={item.label}
          active={pathname === item.href}
        />
      ))}

      <div className="h-px bg-gray-200 dark:bg-[#272727] my-3 mx-4" />

      <div className="px-5 py-2 flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-[#AAAAAA]">
        {FOOTER_LINKS.map((link) => (
          <span key={link} className="hover:underline cursor-pointer">
            {link}
          </span>
        ))}
      </div>

      <p className="px-5 pt-3 pb-4 text-xs text-gray-400 dark:text-[#717171]">
        © {new Date().getFullYear()} MyTube LLC
      </p>
    </aside>
  );
}