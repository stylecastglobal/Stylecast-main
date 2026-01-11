import type { EditorSection, BrandPageConfig } from "../types";
import TemplateEditor from "./sections/TemplateEditor";
import HeroEditor from "./sections/HeroEditor";
import AboutEditor from "./sections/AboutEditor";

interface SectionEditorProps {
  section: EditorSection;
  config: BrandPageConfig;
  onChange: (config: BrandPageConfig) => void;
}

export default function SectionEditor({
  section,
  config,
  onChange,
}: SectionEditorProps) {
  return (
    <div className="p-6">
      {section === "Template" && (
        <TemplateEditor config={config} onChange={onChange} />
      )}
      {section === "Hero" && (
        <HeroEditor config={config} onChange={onChange} />
      )}
      {section === "About" && (
        <AboutEditor config={config} onChange={onChange} />
      )}
      {section === "Footer" && (
        <div className="text-gray-500">Footer editor coming soon</div>
      )}
    </div>
  );
}