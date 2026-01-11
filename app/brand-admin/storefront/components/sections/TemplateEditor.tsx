import type { BrandPageConfig, TemplateId } from "../../types";

interface TemplateEditorProps {
  config: BrandPageConfig;
  onChange: (config: BrandPageConfig) => void;
}

const templates = [
  {
    id: "editorial" as TemplateId,
    name: "Editorial",
    description: "Story-driven layout for fashion brands",
    badge: "FREE",
    thumbnail: "/thumbnail-editorial.jpg",
    heroImage: "/hero-editorial.jpg", // ADD THIS
  },
  {
    id: "minimal" as TemplateId,
    name: "Minimal",
    description: "Product-focused clean layout",
    badge: "FREE",
    thumbnail: "/thumbnail-minimal.jpg",
    heroImage: "/hero-minimal.jpg", // ADD THIS
  },
];

export default function TemplateEditor({
  config,
  onChange,
}: TemplateEditorProps) {
  const handleTemplateChange = (templateId: TemplateId) => {
    const selectedTemplate = templates.find((t) => t.id === templateId);
    
    onChange({
      ...config,
      templateId,
      hero: {
        ...config.hero,
        image: selectedTemplate?.heroImage || config.hero.image, // Update hero image
      },
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-black mb-2">Templates</h2>
      <p className="text-sm text-gray-500 mb-6">
        Choose a layout. Your preview updates instantly.
      </p>

      <div className="space-y-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border rounded-2xl p-4 transition cursor-pointer ${
              config.templateId === template.id
                ? "border-black ring-2 ring-black"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleTemplateChange(template.id)}
          >
            {/* Thumbnail Image */}
            <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 overflow-hidden">
              <img
                src={template.thumbnail}
                alt={`${template.name} template`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-black">{template.name}</h3>
                <p className="text-sm text-gray-500">{template.description}</p>
              </div>
              <span className="text-xs font-medium text-gray-500">
                {template.badge}
              </span>
            </div>

            <div className="mt-3">
              {config.templateId === template.id ? (
                <span className="text-sm text-black font-medium">Selected</span>
              ) : (
                <button className="text-sm px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-900 transition">
                  Use this template
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}