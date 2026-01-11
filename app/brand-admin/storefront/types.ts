export type EditorSection = 
  | "Template" 
  | "Hero" 
  | "About"
  | "Footer";

export type TemplateId = "minimal" | "editorial";

export interface BrandPageConfig {
  templateId: TemplateId;
  brand: {
    name: string;
    handle: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    image: string;
  };
  about?: {
    title: string;
    description: string;
    image: string;
  };
  products?: {
    id: string;
    name: string;
    price: string;
    image: string;
  }[];
  editorial?: {
    section1Image: string;
    section2Image: string;
  };
}