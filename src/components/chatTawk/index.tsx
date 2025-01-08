"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Tawk_API?: {
      setAttributes: (
        attributes: { lang: string },
        callback?: (error: any) => void
      ) => void;
    };
  }
}

const TawkToWidget: React.FC = () => {
  const pathname = usePathname();
  const lang = pathname?.split("/")[1] || "en";
  const [widgetID, setWidgetId] = useState<any>();
  useEffect(() => {
    if (lang === "en") {
      setWidgetId("1icsgg12q");
    } else {
      setWidgetId("1icsk134u");
    }
  }, [pathname]);
  const widget = lang === "en" ? "1icsgg12q" : "1icsk134u";
  useEffect(() => {
    const initializeTawkTo = () => {
      const scriptExists = !!document.querySelector("script[src*='tawk.to']");
      if (!scriptExists) {
        // Add the Tawk.to script if it doesn't exist
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://embed.tawk.to/67399ba62480f5b4f59f3ac6/${widget}`;
        script.charset = "UTF-8";
        script.setAttribute("crossorigin", "*");
        document.body.appendChild(script);
      }
    };

    const updateLanguage = (language: string) => {
      if (window.Tawk_API) {
        // Check if Tawk_API is ready and call setAttributes
        if (typeof window.Tawk_API.setAttributes === "function") {
          window.Tawk_API.setAttributes({ lang: language }, (error) => {
            if (error)
              console.error("Failed to update Tawk.to language:", error);
          });
        } else {
          console.warn("Tawk_API.setAttributes is not a function yet.");
        }
      } else {
        console.warn("Tawk_API is not initialized yet.");
      }
    };

    // Initialize Tawk.to script
    initializeTawkTo();

    // Poll until Tawk_API is ready and update the language
    const interval = setInterval(() => {
      if (
        window.Tawk_API &&
        typeof window.Tawk_API.setAttributes === "function"
      ) {
        clearInterval(interval);
        updateLanguage(lang); // Update the language dynamically
      }
    }, 500);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [lang, widgetID]);

  return null;
};

export default TawkToWidget;
