import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useTafsir } from "../assets/api/ShowTafsir";
import { useState, useEffect } from "react";
export default function Tafsirs({chapterId, verseIndex }) {
  const taf = useTafsir()
  const [tafsir, setTafsir] = useState([]);
  const [tafsirId, setTafsirId] = useState(169);
  const [tafsirIds, setTafsirIds] = useState([]);
  const [tafsirLanguage, setLanguage] = useState("english");
  const [tafsirer, setTafsirer] = useState([]);

  function Tafsir() {
    const urls = [
      "https://quran-com.p.rapidapi.com/quran/tafsirs/160", //tafsirs in many languages. 160 ibn Kathir
      "https://quran-com.p.rapidapi.com/resources/tafsirs",
    ]; //all tafsirs endpoint
    const options = {
      method: "GET",
      params: {
        verse_key: `${chapterId}:${verseIndex}`,
      },
      headers: {
        "X-RapidAPI-Key":import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": "quran-com.p.rapidapi.com",
      },
    };
    Promise.all(urls.map((url) => axios.request(url, options)))
      .then(([{ data: tafsir }, { data: tafsirEndpoint }]) => {
        function searchForKey(obj, searchKey, resource_id, text, result = []) {
          const r = result;
          Object.keys(obj).map((key) => {
            const value = obj[key][searchKey];
            if (value === resource_id) r.push(obj[key][text]);
          });
          return r;
        }
        const { tafsirs } = tafsir;
        const tafsirPoint = tafsirEndpoint.tafsirs;

        setTafsir(searchForKey(tafsirs, "resource_id", tafsirId, "text"));

        setTafsirer(
          searchForKey(tafsirPoint, "language_name", tafsirLanguage, "name")
        );
        setTafsirIds(
          searchForKey(tafsirPoint, "language_name", tafsirLanguage, "id")
        );
        function checkIf(language, id){
        if(tafsirLanguage == language) setTafsirId(id) }
        
        
      })
      .catch((error) => console.log(error));
  }

  useEffect(
    () => Tafsir(),
    [verseIndex, tafsirId, tafsir, chapterId, tafsirer, tafsirLanguage,tafsirIds]
  );
  return (
    <>
      <Modal
        show={taf.show}
        onHide={() => {
          taf.handleHide()
          setLanguage("english");
          setTafsirId(169);
        }}
        className="mt-5"
        fullscreen={true}
      >
        <Modal.Header
          closeButton
       className="sticky-top bg-dark text-light"
        >
          <Modal.Title>
            <span style={{ fontSize: "15px" }}>
              Tafsir {chapterId}:{verseIndex}
            </span>

            <select
              className="text-light ms-2"
              style={{ fontSize: "15px" }}
              onChange={(e) => {
                setLanguage(e.target.value.toLowerCase());
              }}
            >
              <option>English</option>
              <option>Arabic</option>
              <option>Bengali</option>
              <option>Urdu</option>
              <option>Russian</option>
            </select>
          </Modal.Title>
          <div className="mb-3 tafsir-btn">
            {tafsirer.map((tafsirer_names, i) => {
            const btnColor = ["primary", "warning", "secondary", "success", "danger", "light", "dark", "info"]
              return (
                <button
                  onClick={() => 
                  setTafsirId(tafsirIds[i])
                  }
                  className={`btn btn-sm btn-${btnColor[i]}`}>
                  {tafsirer_names}
                </button>
              );
            })}
          </div>
        </Modal.Header>
        <Modal.Body>
          {tafsir.length > 0 ? (
            tafsir.map((t, i) => {
              return (
                <p style={{textDecoration:"none", color:"black", paddingBottom:"1em"}}
                  dangerouslySetInnerHTML={{ __html: t }}
                  className="text-start tafsir-font"
                ></p>
              );
            })
          ) : (
            <span className="text-center">No commentary.</span>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
