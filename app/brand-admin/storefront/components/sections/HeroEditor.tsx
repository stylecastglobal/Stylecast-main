import type { BrandPageConfig } from "../../types";

interface HeroEditorProps {
  config: BrandPageConfig;
  onChange: (config: BrandPageConfig) => void;
}

export default function HeroEditor({ config, onChange }: HeroEditorProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({
          ...config,
          hero: { ...config.hero, image: reader.result as string },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-black mb-2">Hero Section</h2>
      <p className="text-sm text-gray-500 mb-6">
        Customize your hero content and image.
      </p>

      <div className="space-y-4">
        {/* IMAGE UPLOAD */}
        <div>
          <label className="text-sm text-gray-700 mb-2 block">Hero Image</label>
          
          {/* Preview */}
          {config.hero.image && (
            <div className="mb-3 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={config.hero.image}
                alt="Hero preview"
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          
          {/* Upload button */}
          <label className="cursor-pointer inline-block">
            <span className="px-4 py-2 bg-gray-100 text-black text-sm rounded-lg hover:bg-gray-200 transition inline-block">
              {config.hero.image ? "Change image" : "Upload image"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <div>
          <label className="text-sm text-gray-700 mb-2 block">Headline</label>
          <input
            type="text"
            value={config.hero.headline}
            onChange={(e) =>
              onChange({
                ...config,
                hero: { ...config.hero, headline: e.target.value },
              })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 mb-2 block">Subheadline</label>
          <textarea
            value={config.hero.subheadline}
            onChange={(e) =>
              onChange({
                ...config,
                hero: { ...config.hero, subheadline: e.target.value },
              })
            }
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black resize-none"
          />
        </div>
      </div>
    </div>
  );
}