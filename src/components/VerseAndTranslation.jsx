import { useState, useEffect } from "react";
import Tafsirs from "./Tafsir";
import { arabicNumbers } from "/public/assets/api/urls";
import { useTafsir } from "/public/assets/api/ShowTafsir";
export default function VerseAndTranslation({
  allState,
  verseKey,
  chapterId,
}) {
  const taf = useTafsir()
  const style = {
    display: taf.showTranslation,
  };
  const { translation, chapter } = allState;
  const [verseIndex, setIndex] = useState("1");
 useEffect(() => {
    var junction_font = new FontFace(
      "Thuluth",
      `url("../ar_fonts/${taf.face}.ttf")`
    );
   junction_font.load()
      .then((loaded_face) => {
        document.fonts.add(loaded_face);
   const classes=document.getElementsByClassName("x")
   for(var i=0; i<classes.length; i++) classes[i].style.fontFamily = '"Thuluth", Arial'
      })
      .catch((error) => console.log(error.message));
  }, [taf.face, taf.font_size, taf.showTranslation])
  
  return (
    <div>
      {chapter.map((verse, index) => (
        <ul id="verse-parent">
          <div className="shadow verse-container">
            <div className="text-start p-2 mb-2">
              <span
                className="bi-book me-4 tafsir-book text-start"
                onClick={() => {
                  setIndex(index + 1);
                  taf.handleShow()
                }}
              ></span>
              <span className="me-3 text-start">{verseKey[index]}</span>
            </div>
            <div className="text-end">
              <span key={index} className="verse-list x" style={{fontSize: `${taf.font_size}pt`}}>
                {verse}
              </span>
              <span className="verse-number">
                {arabicNumbers[index]}
              </span>
            </div>
            <p
              style={style}
              className="mt-2 p-1 text-start"
              dangerouslySetInnerHTML={{ __html: translation[index] }}
            ></p>
          </div>
        </ul>
      ))}
      <Tafsirs
        chapterId={chapterId}
        verseIndex={verseIndex}
      />
    </div>
  );
}
