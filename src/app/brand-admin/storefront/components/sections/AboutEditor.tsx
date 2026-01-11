import type { BrandPageConfig } from "../../types";

interface AboutEditorProps {
  config: BrandPageConfig;
  onChange: (config: BrandPageConfig) => void;
}

export default function AboutEditor({ config, onChange }: AboutEditorProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({
          ...config,
          about: { 
            ...config.about,
            title: config.about?.title || "",
            description: config.about?.description || "",
            image: reader.result as string 
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-black mb-2">About Section</h2>
      <p className="text-sm text-gray-500 mb-6">
        Tell your brand story.
      </p>

      <div className="space-y-4">
        {/* IMAGE UPLOAD */}
        <div>
          <label className="text-sm text-gray-700 mb-2 block">About Image</label>
          
          {config.about?.image && (
            <div className="mb-3 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={config.about.image}
                alt="About preview"
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          
          <label className="cursor-pointer inline-block">
            <span className="px-4 py-2 bg-gray-100 text-black text-sm rounded-lg hover:bg-gray-200 transition inline-block">
              {config.about?.image ? "Change image" : "Upload image"}
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
          <label className="text-sm text-gray-700 mb-2 block">Title</label>
          <input
            type="text"
            value={config.about?.title || ""}
            onChange={(e) =>
              onChange({
                ...config,
                about: { 
                  ...config.about,
                  title: e.target.value,
                  description: config.about?.description || "",
                  image: config.about?.image || ""
                },
              })
            }
            placeholder="Our Story"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 mb-2 block">Description</label>
          <textarea
            value={config.about?.description || ""}
            onChange={(e) =>
              onChange({
                ...config,
                about: { 
                  ...config.about,
                  title: config.about?.title || "",
                  description: e.target.value,
                  image: config.about?.image || ""
                },
              })
            }
            rows={5}
            placeholder="Tell your brand story..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black resize-none"
          />
        </div>
      </div>
    </div>
  );
}