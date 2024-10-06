"use client";

import React, { useEffect, useState } from "react";
import { StickyScroll } from "./components/ui/sticky-scroll-reveal";
import enContent from "../locales/en.json";
import esContent from "../locales/es.json";
import { Logo } from "./components/logo";
import Lottie from "lottie-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BaseContentItem {
  title: string;
  description: string;
}

interface ContentItem {
  title: string;
  description: string;
  content?: React.ReactNode;
}

interface LottieContentItem extends BaseContentItem {
  lottie: string;
}

interface ImageContentItem extends BaseContentItem {
  image: string;
}

type LocaleContent = {
  content: (LottieContentItem | ImageContentItem)[];
};

const createContent = async (
  data: LocaleContent["content"]
): Promise<ContentItem[]> => {
  const contentItems = await Promise.all(
    data.map(async (item) => {
      let animationData = null;

      if ("lottie" in item) {
        // Importa el archivo Lottie usando la ruta relativa correcta
        animationData = await import(`../lotties/${item.lottie}`);
      }

      return {
        title: item.title,
        description: item.description,
        content: (
          <div className="h-full w-full flex items-center justify-center text-white">
            {animationData ? (
              <Lottie
                animationData={animationData.default}
                className="w-[240px]"
                loop={true}
              />
            ) : // Aquí puedes renderizar una imagen si es necesario
            null}
          </div>
        ),
      };
    })
  );
  return contentItems;
};

export default function Home() {
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [content, setContent] = useState<ContentItem[]>([]);

  useEffect(() => {
    const loadContent = async () => {
      const currentContent =
        language === "en" ? enContent.content : esContent.content;
      const newContent = await createContent(currentContent);
      setContent(newContent);
    };
    loadContent();
  }, [language]);

  const switchLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "es" : "en"));
  };

  return (
    <div className="bg-[#11131D] h-screen flex flex-col items-center">
      <main className="flex flex-col items-center">
        <div className="container flex flex-row items-center justify-between px-12 p-1 mt-12 md:mt-28 mb-14">
          <button
            onClick={switchLanguage}
            className="px-4 py-2 hidden bg-blue-500 text-white rounded"
          >
            {language === "en" ? "Switch to Spanish" : "Cambiar a Inglés"}
          </button>
        </div>

        <div className="flex flex-col gap-4 justify-center items-center mb-10">
          <Logo className="fill-white w-[300px] h-fit" />
          <div className="flex justify-center md:hidden ">
            <Link href="/map" passHref>
              <Button className="text-2xl border-2 mt-6 border-[#0052B0]">
                Go to the map
              </Button>
            </Link>
          </div>
        </div>
        <StickyScroll content={content} />
      </main>
    </div>
  );
}
