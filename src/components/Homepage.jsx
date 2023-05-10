import axios from "axios";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import Chapter from "./Chapter";
import { useTafsir } from "/public/assets/ShowTafsir";
export default function Homepage() {
  const [chapterIndex, setChapterIndex] = useState([]);
const taf = useTafsir()
  function ChaptersList() {
    const options = {
      method: "GET",
      url: "https://quran-com.p.rapidapi.com/chapters",
      params: { language: "en" },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": "quran-com.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {setChapterIndex(response.data.chapters)
   taf.setChapters(response.data.chapters)})
      .catch((error) => error.response.status==403&& ChaptersList());
  }
  useEffect(() => {
    ChaptersList();
  }, []);

  return (
    <>
      <h2 className="text-center display-5 fw-bold mt-2 mb-2">
        Chapter Index
      </h2>
      <main className="index-container">
        {chapterIndex.map((chapter, index) => (
          <Chapter key={index} {...chapter} index={index} />
        ))}
      </main>
    </>
  );
}
