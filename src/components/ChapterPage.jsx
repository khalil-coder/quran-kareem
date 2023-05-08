import VerseOnly from "./VerseOnly"
import ChapterPageMenu from "./ChapterPageMenu";
import ChapterInfo from "./ChapterInfo";
import VerseAndTranslation from "./VerseAndTranslation";
import { useState, useEffect } from "react";
export default function ChapterPage({ allState, verseKey, chapterId, setTranslationId, translation_id}) {
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isReading, setIsReading] = useState(false);


  const handleCloseMenu = () => setShowMenu(false);
  const handleShowMenu = () => {
    setShowMenu(true); 
 
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const { name_arabic, name_complex, bismillah , translation_language, chapter} = allState;
  

  return (
    <main className="pe-1 ps-1 text-end main-page-container">
      <div className="mb-4 head-container shadow p-1 sticky-top bg-primary text-light">
        <div id="chapter-page-options">
          <i
            className="bi-segmented-nav menu-icon"
            onClick={() => {
              handleShowMenu();
            }}
          ></i>
          <i
            className="bi-info-circle-fill info-icon"
            onClick={() => {
              handleShow();
            }}
          ></i>
          <div className="form-switch form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="theme"
            />
          </div>
        </div>
        <div className="text-center">
          <span
            className="head"
            dangerouslySetInnerHTML={{ __html: name_arabic }}
          ></span>
          <br />
          <span
            dangerouslySetInnerHTML={{ __html: name_complex }}
            className="header"
          ></span>
        </div>
        <div className="p-2 text-center"><button className={isReading==false ? `btn btn-outline-light btn-sm active`:  `btn btn-outline-light btn-sm` } onClick={()=> setIsReading(false)}>Reading with Translation and Tafsir</button> <button className={isReading==true ? `btn btn-outline-dark btn-sm active`:  `btn btn-outline-dark btn-sm` } onClick={()=> setIsReading(true)}>Reading</button></div>
      </div>
      <div>
        {bismillah.length > 0 && (
          <p className="text-center bismillah mb-4 mt-2 fw-bold">
            بِسْمِ ٱللَّهِ ٱلرحْمَـٰنِ ٱلرَّحِيمِ
          </p>
        )}
      
    { 
    isReading == true?
     <VerseOnly chapter={chapter}/>
     :
     <VerseAndTranslation
          allState={allState}
          verseKey={verseKey}
          chapterId={chapterId}
        />
      
    }
        <ChapterInfo
          handleClose={handleClose}
          allState={allState}
          show={show}
        />
      </div>
      <ChapterPageMenu
        showMenu={showMenu}
        handleCloseMenu={handleCloseMenu}
        allState={allState}
        chapterId={chapterId}
        translation_id={translation_id}
        setTranslationId={setTranslationId}
      />
      
      <i className="bi-arrow-up bg-dark text-light rounded p-1" style={{position: "fixed", bottom:"1em", right:"20px"}} onClick={()=> window.scrollTo(0,0)}></i>
    </main>
  );
}
