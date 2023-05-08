import axios from "axios";
import { reducer, ACTION } from "/public/assets/api/urls";
import ChapterPage from "./ChapterPage";
import { useState, useEffect, useReducer, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";

export default function ChapterPages() {
  const { chapterId } = useParams();
  const [verseKey, setVerseKey] = useState([]);
  const [translation_id, setTranslationId]=useState(131)
  
  const style = {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeContent: "center",
  };
  const urls = [
    `https://quran-com.p.rapidapi.com/chapters`,
    `https://quran-com.p.rapidapi.com/quran/verses/uthmani`,
    `https://quran-com.p.rapidapi.com/chapters/${chapterId}`,
    `https://quran-com.p.rapidapi.com/quran/translations/${translation_id}`,
    `https://quran-com.p.rapidapi.com/chapters/${chapterId}/info`,

    "https://quran-com.p.rapidapi.com/resources/translations", //languages endpoint for all translations
  ];
  const options = {
    params: {
      chapter_number: chapterId,
      language: "en",
    },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "quran-com.p.rapidapi.com",
    },
  };

  const initialState = {
    name_complex: "",
    name_arabic: "",
    bismillah: [],
    translation: [],
    chapter: [],
    text_info: "",
    chapter_lists:[],
    translation_language: []
  };

  const {
    NAME_COMPLEX,
    NAME_ARABIC,
    BISMILLAH,
    TRANSLATION,
    CHAPTER,
    TEXT_INFO,
    CHAPTER_LISTS,
    TRANSLATION_LANGUAGE
  } = ACTION;

  const [allState, dispatch] = useReducer(reducer, initialState);

  function Chapter() {
    Promise.all(urls.map((endpoint) => axios.request(endpoint, options)))
      .then(
        ([
          {data : chaptersList},
          { data: verse },
          { data: chapter },
          { data: translate },
          { data: info },
          { data: allLanguagesEndpoint },
        ]) => {
          const {chapters} = chaptersList
          const { verses } = verse;
          const { name_complex, name_arabic, translated_name } =
            chapter.chapter;
          const { translations } = translate;
          const { text } = info.chapter_info;
        //  alert(Object.entries(tafsirs[0]));
           //Object
const languagesEndpoint = allLanguagesEndpoint.translations
      // alert(Object.keys(languagesEndpoint[0]))
          
          const result = [];
          const vKey = [];
          verses.map((text) => {
            vKey.push(text.verse_key);
            result.push(text.text_uthmani);
          });
          setVerseKey(vKey);

          const searchForKey = (obj, searchValue, result = []) => {
            const r = result;
            Object.keys(obj).map((key) => {
              const value = obj[key];
              if (key == searchValue && typeof value != "object")
                r.push(value);
              else if (typeof value == "object")
                searchForKey(value, searchValue, r);
            });
            return r;
          };
        
     //  searchForKey(tafsirs)
          const bismillahi = [];
          function manageBismillahi(arr) {
            const tawbah =
              "بَرَآءَةٌ مِّنَ ٱللَّهِ وَرَسُولِهِۦٓ إِلَى ٱلَّذِينَ عَـٰهَدتُّم مِّنَ ٱلْمُشْرِكِينَ";
            const alif = "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ";
            if (arr[0] == alif || arr[0] == tawbah) return arr;
            else return bismillahi.push(alif);
            return arr;
          }
          manageBismillahi(result);
          //Chapter list
          dispatch({
            type: CHAPTER_LISTS,
            payload: chapters
          });
          //      Surah Header
          dispatch({
            type: NAME_ARABIC,
            payload: `سورة${name_arabic}`,
          });
          dispatch({
            type: NAME_COMPLEX,
            payload: `${name_complex} <br/> ${translated_name.name}`,
          });
          // Verse Text and translations
          dispatch({
            type: CHAPTER,
            payload: result,
          });
          dispatch({
            type: TRANSLATION,
            payload: searchForKey(translations, "text"),
          });
          //bismillah
          dispatch({
            type: BISMILLAH,
            payload: bismillahi,
          });
          // Text information
          dispatch({
            type: TEXT_INFO,
            payload: text,
          });
          // Text information
          dispatch({
            type: TRANSLATION_LANGUAGE,
            payload: languagesEndpoint
          });
  //  alert(searchForKey(languagesEndpoint))      
//alert(Object.keys(languagesEndpoint[0]))

        }
      )
      .catch((error) => console.log(error.message));
  }

  useEffect(() => {
    Chapter();
  }, [chapterId, translation_id]);

  return (
    <>
      <ChapterPage allState={allState} verseKey={verseKey} chapterId={chapterId}
      translation_id={translation_id}
      setTranslationId={setTranslationId}/>
    </>
  );
}
