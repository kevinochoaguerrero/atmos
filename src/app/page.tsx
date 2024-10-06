"use client"; 

import React, { useEffect, useState } from "react";
import { StickyScroll } from "./components/ui/sticky-scroll-reveal";
import enContent from "../locales/en.json"; 
import esContent from "../locales/es.json";
import Image from "next/image";

interface ContentItem {
  title: string;
  description: string;
  content?: React.ReactNode;
}

interface LocaleContent {
  content: {
    title: string;
    description: string;
    image: string;
  }[];
}
const createContent = (data: LocaleContent["content"]): ContentItem[] => {
  return data.map((item) => ({
    title: item.title,
    description: item.description,
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src={item.image}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt={item.title}
        />
      </div>
    ),
  }));
};

export default function Home() {
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [content, setContent] = useState<ContentItem[]>(createContent(enContent.content));

  useEffect(() => {
    const currentContent = language === "en" ? enContent.content : esContent.content;
    setContent(createContent(currentContent));
  }, [language]);

  const switchLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "es" : "en"));
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <button onClick={switchLanguage} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
        {language === "en" ? "Switch to Spanish" : "Cambiar a Inglés"}
      </button>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <StickyScroll content={content} />
      </main>
    </div>
  );
}
