 "use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Monitor,
  Palette,
  CheckCircle2,
} from "lucide-react";

type ThemeType = "light" | "dark" | "system";

interface ThemeCard {
  id: ThemeType;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function AppearancePage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themes: ThemeCard[] = [
    {
      id: "light",
      title: "Light",
      description:
        "Bright interface that's perfect for daytime viewing.",
      icon: <Sun size={30} className="text-yellow-500" />,
    },
    {
      id: "dark",
      title: "Dark",
      description:
        "Comfortable viewing experience in low-light environments.",
      icon: <Moon size={30} className="text-blue-400" />,
    },
    {
      id: "system",
      title: "System",
      description:
        "Automatically follows your device appearance.",
      icon: <Monitor size={30} className="text-green-500" />,
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="flex items-center gap-4 mb-10">

          <div className="bg-red-600 p-4 rounded-2xl">

            <Palette className="text-white" size={30} />

          </div>

          <div>

            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
              Appearance
            </h1>

            <p className="text-zinc-600 dark:text-zinc-400 mt-2">
              Personalize how MyTube looks across your device.
            </p>

          </div>

        </div>

        <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm">

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
            Choose your theme
          </h2>

          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Your preference is saved automatically.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
                        {themes.map((item) => (
              <button
                key={item.id}
                onClick={() => setTheme(item.id)}
                className={`relative rounded-2xl border-2 p-6 text-left transition-all duration-300 hover:scale-[1.02]
                ${
                  theme === item.id
                    ? "border-red-600 shadow-lg"
                    : "border-zinc-200 dark:border-zinc-700 hover:border-red-400"
                }`}
              >
                {theme === item.id && (
                  <CheckCircle2
                    size={24}
                    className="absolute top-4 right-4 text-green-500"
                  />
                )}

                <div className="mb-5">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>

                <div
                  className={`mt-6 inline-flex rounded-full px-4 py-2 text-sm font-medium transition-colors
                  ${
                    theme === item.id
                      ? "bg-red-600 text-white"
                      : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  {theme === item.id ? "Selected" : "Select"}
                </div>
              </button>
            ))}
          </div>

        </section>

        <section className="mt-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm">

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
            Live Preview
          </h2>

          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            See how your selected appearance affects the interface.
          </p>

          <div className="mt-8 grid lg:grid-cols-2 gap-8">
                            {/* Preview Window */}

            <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700">

              <div className="bg-red-600 px-5 py-4 text-white font-semibold">
                MyTube Preview
              </div>

              <div
                className={`transition-all duration-300 p-6 min-h-[300px]
                ${
                  theme === "light"
                    ? "bg-white text-black"
                    : "bg-zinc-950 text-white"
                }`}
              >

                <div className="w-full h-40 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold text-xl">
                  Featured Video
                </div>

                <div className="mt-6 space-y-4">

                  <div
                    className={`h-5 rounded-full w-3/4 ${
                      theme === "light"
                        ? "bg-gray-300"
                        : "bg-zinc-700"
                    }`}
                  />

                  <div
                    className={`h-4 rounded-full w-1/2 ${
                      theme === "light"
                        ? "bg-gray-200"
                        : "bg-zinc-800"
                    }`}
                  />

                  <div
                    className={`h-4 rounded-full w-5/6 ${
                      theme === "light"
                        ? "bg-gray-200"
                        : "bg-zinc-800"
                    }`}
                  />

                </div>

              </div>

            </div>

            {/* Theme Information */}

            <div className="flex flex-col justify-center">

              <span className="uppercase tracking-widest text-sm text-zinc-500 dark:text-zinc-400">
                Current Theme
              </span>

              <h2 className="mt-3 text-4xl font-bold text-zinc-900 dark:text-white capitalize">
                {theme}
              </h2>

              <p className="mt-5 leading-7 text-zinc-600 dark:text-zinc-400">

                {theme === "light" &&
                  "Light mode offers a clean and bright interface that's ideal for daytime viewing."}

                {theme === "dark" &&
                  "Dark mode reduces eye strain and provides a more cinematic experience."}

                {theme === "system" &&
                  "System mode automatically follows your operating system's appearance settings."}

              </p>

              <div className="mt-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 p-5">

                <div className="flex justify-between">

                  <span className="text-zinc-600 dark:text-zinc-300">
                    Active Theme
                  </span>

                  <span className="font-semibold capitalize text-zinc-900 dark:text-white">
                    {theme}
                  </span>

                </div>

                <div className="flex justify-between mt-4">

                  <span className="text-zinc-600 dark:text-zinc-300">
                    Status
                  </span>

                  <span className="text-green-500 font-semibold">
                    Active
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>

        <section className="mt-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm"> 
                      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
            About Themes
          </h2>

          <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
            Choosing <span className="font-semibold">System</span> lets MyTube
            automatically match your operating system's appearance. If your
            device switches between Light Mode and Dark Mode, MyTube will follow
            automatically without requiring any manual changes.
          </p>

          <div className="mt-8 rounded-2xl bg-zinc-100 dark:bg-zinc-800 p-5">

            <div className="flex items-center justify-between">

              <span className="text-zinc-600 dark:text-zinc-300">
                Selected Theme
              </span>

              <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white capitalize">
                {theme}
              </span>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}