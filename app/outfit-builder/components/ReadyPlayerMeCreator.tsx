"use client";

import { useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";

interface ReadyPlayerMeCreatorProps {
  /** Called with the .glb URL when the user finishes creating their avatar */
  onAvatarCreated: (glbUrl: string) => void;
  /** Called when the user closes the iframe without creating */
  onClose?: () => void;
  className?: string;
}

/**
 * Embeds the ReadyPlayerMe avatar creator in an iframe.
 * Listens for the `v1.avatar.exported` postMessage event
 * to extract the generated .glb URL.
 *
 * Docs: https://docs.readyplayer.me/ready-player-me/integration-guides/web
 */
export default function ReadyPlayerMeCreator({
  onAvatarCreated,
  onClose,
  className = "",
}: ReadyPlayerMeCreatorProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      // RPM sends JSON strings
      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        // Avatar export complete
        if (data?.source === "readyplayerme" && data?.eventName === "v1.avatar.exported") {
          const glbUrl = data.data?.url;
          if (glbUrl && typeof glbUrl === "string") {
            onAvatarCreated(glbUrl);
          }
        }

        // User closed the creator
        if (data?.source === "readyplayerme" && data?.eventName === "v1.frame.close") {
          onClose?.();
        }
      } catch {
        // Not a JSON message — ignore
      }
    },
    [onAvatarCreated, onClose]
  );

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  // RPM subdomain — uses the default demo partner
  // Replace with your own subdomain for production: https://yourgame.readyplayer.me
  // bodyType=fullbody for full-body avatar, quality=high for realistic textures
  const rpmUrl = "https://demo.readyplayer.me/avatar?frameApi&bodyType=fullbody&quality=high&morphTargets=ARKit";

  return (
    <div className={`relative w-full ${className}`}>
      <iframe
        ref={iframeRef}
        src={rpmUrl}
        allow="camera *; microphone *; clipboard-write"
        className="w-full h-full rounded-2xl border-0"
        style={{ minHeight: 600 }}
        title="Ready Player Me Avatar Creator"
      />

      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
