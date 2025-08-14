"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
// Remove the routing import since it doesn't exist
import { GrLanguage } from "react-icons/gr";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

// Type definitions
interface LanguageInfo {
  name: string;
  nativeName: string;
  flag: string;
}

interface LanguageSwitcherProps {
  isUp?: boolean;
}

type Locale = string;

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isUp = false }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Define available locales directly (since routing is not available)
  const availableLocales: Locale[] = ["en", "ar"];

  // Language display mapping
  const languageMap: Record<string, LanguageInfo> = {
    en: { name: "English", nativeName: "English", flag: "🇺🇸" },
    ar: { name: "Arabic", nativeName: "العربية", flag: "🇸🇦" }
  };

  const changeLanguage = (newLocale: Locale): void => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    // Extract the path without the current locale (similar to your lastLink)
    const segments: string[] = pathname.split("/");
    const currentLocaleFromPath = segments[1];
    
    // Remove current locale if it exists, get the rest of the path
    const pathWithoutLocale = segments.slice(2).join("/");
    
    // Build new path similar to your old approach: /locale/restOfPath
    const newPath: string = `/${newLocale}/${pathWithoutLocale}`;
    
    // Handle search parameters similar to your old way
    const searchParams = new URLSearchParams(window.location.search);
    const search = searchParams.get('id');
    const searchSingle = searchParams.get('single');
    
    let queryString = '';
    if (search) {
      queryString = `?id=${search}`;
    } else if (searchSingle) {
      queryString = `?single=${searchSingle}`;
    }
    
    const fullPath: string = `${newPath}${queryString}`;
    
    router.replace(fullPath);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const currentLanguage: LanguageInfo | undefined = languageMap[currentLocale];

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="relative  z-50 " 
      ref={dropdownRef}
    >
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between gap-2 px-3 py-2 
           border border-white  rounded-lg shadow-sm hover:shadow-md
          transition-all duration-200 hover:border-gray-300  focus:outline-none focus:ring-2
          focus:ring-blue-500 focus:border-transparent
        `}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <div className="flex items-center gap-2">
          <GrLanguage className="w-4 h-4 text-gray-600 " />
          <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <span className="text-base">{currentLanguage?.flag}</span>
            <span className="hidden sm:inline">{currentLanguage?.nativeName}</span>
          </span>
        </div>
        <FaChevronDown 
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`} 
        />
      </button>
      
      <AnimatePresence>
        {/* Dropdown Menu */}
        {isOpen && (
          <motion.div 
            exit={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 100 }}
            className={`
              ${isUp ? "bottom-full mb-1" : "top-full mt-1"}
              absolute left-0 right-0 bg-gradient-to-r
              from-[#4e5ae2] to-[#d552d8] border border-[var(--grey-medium)]  
              rounded-lg shadow-lg z-50
            `}
          >
            {availableLocales.map((locale: Locale) => {
              const language: LanguageInfo | undefined = languageMap[locale];
              const isSelected: boolean = locale === currentLocale;
              
              return (
                <button
                  key={locale}
                  onClick={() => changeLanguage(locale)}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 
                    text-left hover:bg-[var(--primary-dark)] hover:text-gray-200 rounded-lg
                    transition-colors duration-150 ${
                    isSelected 
                      ? "  text-white" 
                      : "bg-blue-50"
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{language?.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{language?.nativeName}</span>
                      <span className={`text-xs  ${
                        isSelected 
                        ? " text-white" 
                        : "text-gray-500"
                    }`}>
                        {language?.name}
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <FaCheck className="w-4 h-4 text-blue-600 " />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LanguageSwitcher;