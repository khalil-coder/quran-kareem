import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { searchLanguages } from "/public/assets/api/urls";
import { useTafsir } from "/public/assets/api/ShowTafsir";
import Tafsir from "./Tafsir";
export default function SearchResult() {
  const taf = useTafsir();
  const [allLanguages, setLanguages] = useState([]);
  const [searchFor, setSearchFor] = useState("");
  const [languageISOs, setISOs] = useState([]);
  const [prevISO, setISO] = useState("en");
  const [searchLengthWord, setSearchLengthWord] = useState();
  const [verseKey, setVerseKey] = useState([]);
  const [resultText, setResultText] = useState([]);
  const [resultTranslation, setResultTranslation] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [endIndex, setEndIndex] = useState([]);
  const [chapterIds, setChapterIds] = useState([]);
  const [verseIds, setVerseIds] = useState([]);
  const [verseId, setVerseId] = useState();
  const [chapterId, setChapterId] = useState();
  const [resultPerPage, setResultPerPage] = useState(20);
  const [searchParams, setSearchParams] = useSearchParams()
  const [translatorNames, setTranslatorName] = useState([])

  const ref = useRef();
  const handleSearch = () => {
    if (ref.current.value.length > 1) setSearchFor(ref.current.value);
    else alert("Enter word you want to search for");
    setSearchParams({query: ref.current.value.toLowerCase()})
    ref.current.value = "";
    ref.current.value.length < 1 && setPageNumber(1);
    
  };
  const handleLanguageChanging = (e) => {
    setISO(languageISOs[e.target.options.selectedIndex]);
  };
  const handlePageNumberIncrease = () => {
    pageNumber == totalPages
      ? alert("This is the last page")
      : setPageNumber((number) => number + 1);
    window.scrollTo(0, 0);
  };
  const handlePageNumberDecrease = () => {
    pageNumber < 2
      ? alert("This is the beginning")
      : setPageNumber((number) => number - 1);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    const urls = [
      "https://quran-com.p.rapidapi.com/search",
      "https://quran-com.p.rapidapi.com/resources/languages",
    ];
    const options = {
      method: "GET",
      params: {
        size: resultPerPage,
        q: searchFor,
        language: prevISO,
        page: pageNumber,
      },
      headers: {
        "content-type": "application/octet-stream",
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": "quran-com.p.rapidapi.com",
      },
    };

    Promise.all(urls.map((url) => axios.request(url, options)))
      .then(([{ data: searchWord }, { data: language }]) => {
        const { results, current_page, total_results, query, total_pages } =
          searchWord.search;
        setCurrentPage(current_page);
        setTotalPages(total_pages);

        const { languages } = language;
        function searchForKey(obj, searchKey, result = []) {
          const r = result;
          Object.keys(obj).map((key) => {
            const value = obj[key];
            if (key === searchKey && typeof value != "object") r.push(value);
            else if (typeof value == "object")
              searchForKey(value, searchKey, r);
          });
          return r;
        }

        function getEndIndex(arr, result = []) {
          const r = result;
          arr.map((details) => {
            details.words.map((key) => {
              if (key.char_type == "end") r.push(key.text);
            });
          });
          return r;
        }
        setEndIndex(getEndIndex(results));
        setSearchLengthWord(
          `<span>You searched for: <strong>${query}</strong></span> <span>Total results: <strong>${total_results.toLocaleString()}</strong></span> <span>Current Page: <strong>${current_page}</strong></span> <span>Total pages: <strong>${total_pages}</strong></span> `
        );
        setLanguages(searchLanguages);
        setISOs(searchForKey(languages, "iso_code"));
        function filterResults(arr, filter, result = []) {
          const r = result;
          arr.map((details) => r.push(details[filter]));
          return r;
        }

        function filterTranslation(valueReturn) {
          const r = [];
          results.map((details) => {
            r.push(details.translations.map((value) => value[valueReturn]));
          });
          return r;
        }
        setVerseKey(filterResults(results, "verse_key"));
        setResultText(filterResults(results, "text"));
        setResultTranslation( filterTranslation("text"))
        setTranslatorName( filterTranslation("name"))
  //Object.keys(results[0].translations[0]))
        const pattern = /\s|,|:/gim;
        const getChapterAndVerseIndex = [...String(verseKey).split(pattern)];
        const chapter = [];
        const verse = [];
        getChapterAndVerseIndex.map((chapterVerseId, index) => {
          if (index % 2 == 0) chapter.push(chapterVerseId);
          if (index % 2 === 1) verse.push(chapterVerseId);
        });
        setVerseIds(verse);
        setChapterIds(chapter);
        
      })
      .catch((error) => console.log(error));
  }, [
    searchFor,
    prevISO,
    resultTranslation,
    resultText,
    resultPerPage,
    searchLengthWord,
    pageNumber,
  ]);

  return (
    <main id="search-main">
      <div
        id="result-heading-bar"
        className="bg-primary mb-3 text-light shadow sticky-top rounded-bottom"
      >
        <div className="input-group input-group-sm mb-2">
          <input
            type="search"
            placeholder="search in your preferred language"
            className="form-control"
            ref={ref}
          />
          <button
            className="btn btn-dark bi-search"
            onClick={handleSearch}
          ></button>
        </div>
        Languages:
        <select
          className=" bg-primary text-light  border-0"
          style={{ maxWidth: "110px", marginBottom: "5px", fontSize:"10pt" }}
          onChange={handleLanguageChanging}
        >
          {allLanguages.map((language, index) => (
            <option key={index}> {language}</option>
          ))}
        </select>
        {resultText.length > 0 && (
          <>
            <p
              className="search-info mt-3"
              dangerouslySetInnerHTML={{ __html: searchLengthWord }}
            ></p>
            <div className="search-info d-flex">
           
  <div className="form-switch form-check">
                <label htmlFor="result-theme">Change theme</label>
            <input
              type="checkbox"
              className="form-check-input"
              id="result-theme"
            />
          </div>
              
              <span>
            
                Result per page:
                <select
                  onChange={(e) => setResultPerPage(e.target.value)}
                  className="border-0 bg-primary text-light"
                >
                  <option selected>20</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50</option>
                </select>
              </span>
            </div>
          </>
        )}
      </div>
      {resultText.map((result, index) => (
        <div id="result-div">
          <i
            className="bi-book tafsir-book me-3"
            onClick={() => {
              taf.handleShow();
              setVerseId(verseIds[index]);
              setChapterId(chapterIds[index]);
            }}
          ></i>
          <span key={index}>{verseKey[index]}</span>
          <p className="resultArabic" key={index}>
            {result}
            <span className="me-2 end-index">{endIndex[index]}</span>
          </p>
          <p dangerouslySetInnerHTML={{ __html: resultTranslation[index] }}></p>
          <p>Translation by:  <strong>{translatorNames[index]}</strong></p><hr/>
        </div>
      ))}

      {resultText.length > 0 && (
        <div className="input-group input-group-sm" id="pagination">
          <button
            className="btn btn-primary"
            onClick={handlePageNumberDecrease}
          >
            Previous
          </button>
          <span
            className="input-group-text pe-4 ps-4"
            dangerouslySetInnerHTML={{ __html: pageNumber }}
          ></span>
          <button
            className="btn btn-primary"
            onClick={handlePageNumberIncrease}
          >
            Next
          </button>
        </div>
      )}
      <Tafsir chapterId={chapterId} verseIndex={verseId} />
    </main>
  );
}
