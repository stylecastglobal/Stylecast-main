import type { EditorSection } from "../types";

interface SidebarProps {
  active: EditorSection;
  onSelect: (section: EditorSection) => void;
}

const sections: EditorSection[] = [
  "Template",
  "Hero",
  "About",
  "Footer"
];

export default function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <nav className="p-4 border-b border-gray-200">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => onSelect(section)}
          className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium mb-1 transition ${
            active === section
              ? "bg-black text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {section}
        </button>
      ))}
    </nav>
  );
}