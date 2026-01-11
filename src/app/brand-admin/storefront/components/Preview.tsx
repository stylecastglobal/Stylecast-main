import type { BrandPageConfig } from "../types";
import EditorialTemplate from "./sections/templates/EditorialTemplate";
import MinimalTemplate from "./sections/templates/MinimalTemplate";

interface PreviewProps {
  config: BrandPageConfig;
}

export default function Preview({ config }: PreviewProps) {
  return (
    <>
      {config.templateId === "minimal" ? (
        <MinimalTemplate config={config} />
      ) : (
        <EditorialTemplate config={config} />
      )}
    </>
  );
}