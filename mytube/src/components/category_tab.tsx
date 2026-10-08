const CATEGORIES = [
  "All",
  "Gaming",
  "Music",
  "Live",
  "News",
  "Comedy",
  "Education",
  "Sports",
  "Podcasts",
];

interface CategoryTabProps {
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryTab({
  active,
  onChange,
}: CategoryTabProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {CATEGORIES.map((category) => {
        const isActive = category === active;

        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className={`shrink-0 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "bg-gray-900 text-white dark:bg-[#F1F1F1] dark:text-[#0F0F0F]"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-[#272727] dark:text-[#F1F1F1] dark:hover:bg-[#3A3A3A]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}