import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations, LANGUAGES } from "../i18n/translations";

const LanguageContext = createContext(undefined);

const STORAGE_KEY = "shiftcomp_lang";
const DEFAULT_LANG = "id";

function loadInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;
  } catch {
    // ignore, pakai default
  }
  return DEFAULT_LANG;
}

function resolvePath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

function interpolate(str, vars) {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (match, key) => (vars[key] !== undefined ? vars[key] : match));
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(loadInitialLang);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const setLang = (next) => {
    if (translations[next]) setLangState(next);
  };

  const toggleLang = () => {
    setLangState((current) => (current === "id" ? "en" : "id"));
  };

  const t = useMemo(() => {
    return (key, vars) => {
      const dict = translations[lang] || translations[DEFAULT_LANG];
      const fallbackDict = translations[DEFAULT_LANG];
      const value = resolvePath(dict, key) ?? resolvePath(fallbackDict, key) ?? key;
      if (typeof value === "string") return interpolate(value, vars);
      return value;
    };
  }, [lang]);

  const value = {
    lang,
    setLang,
    toggleLang,
    t,
    languages: LANGUAGES,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage harus dipakai di dalam <LanguageProvider>");
  }
  return ctx;
}
