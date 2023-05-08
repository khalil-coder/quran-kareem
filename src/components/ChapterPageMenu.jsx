import { Alert, Button, Offcanvas, Dropdown } from "react-bootstrap";
import { allTranslationLanguages, fonts } from "/public/assets/api/urls";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { useTafsir } from "/public/assets/api/ShowTafsir";
function ChapterPageMenu({
  showMenu,
  handleCloseMenu,
  allState,
  chapterId,
  translation_id,
  setTranslationId,
}) {
  const taf = useTafsir();
  const { chapter_lists, translation_language } = allState;
  const ref = useRef();
  const [languageOpt, setLanguageOpt] = useState([]);
  const [ids, setIds] = useState([]);
  const [languages, setLanguage] = useState("english");
  const [font_faces, setFontFaces] = useState([]);
  const [arabicFont, setArabicFont] = useState(15);
  
  const handleShowTranslation = (e) => {
    e.target.checked == true
      ? taf.setShowTranslation("block")
      : taf.setShowTranslation("none");
  };
  function searchForCertainKey(obj, searchKey, resource_id, text, result = []) {
    const r = result;
    Object.keys(obj).map((key) => {
      const value = obj[key][searchKey];
      if (value === resource_id) r.push(obj[key][text]);
    });
    return r;
  }

  const handleFontSizeIncrease = () => {
    setArabicFont((f) => f + 1);
  };
  const handleFontSizeDecrease = () => {
    arabicFont == 1
      ? alert("1pt is the smallest font.")
      : setArabicFont((f) => f - 1);
  };
  useEffect(() => {
    taf.setFontSize(arabicFont);
    setIds(
      searchForCertainKey(
        translation_language,
        "language_name",
        languages,
        "id"
      )
    );
    setLanguageOpt(
      searchForCertainKey(
        translation_language,
        "language_name",
        languages,
        "name"
      )
    );
    const check = document.querySelector("#checkbutton");
    taf.showTranslation == "block"
      ? (check.checked = true)
      : (check.checked = false);

    const FONTS = [];
    fonts.map((f) => FONTS.push(f));
    setFontFaces(FONTS);
  }, [
    languages,
    translation_language,
    chapterId,
    taf.showTranslation,
    arabicFont,
  ]);

  return (
    <>
      <Offcanvas
        show={showMenu}
        onHide={handleCloseMenu}
        responsive="lg"
        className="w-75"
      >
        <Offcanvas.Header className="bg-dark text-light" closeButton>
          <Offcanvas.Title>Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-group list-group-flush">
            <li className="mb-2 list-group-item">
              <div className="form-check form-switch me-1">
                <label htmlFor="checkbutton">Enable Translation</label>
                <input
                  type="checkbox"
                  name="translation-toggle"
                  className="form-check-input"
                  ref={ref}
                  onChange={handleShowTranslation}
                  id="checkbutton"
                />
              </div>
            </li>
          
            <li className="mb-2 list-group-item">
              <Dropdown align="end" autoClose="inside">
                <div className="input-group input-group-sm">
                  <span className="input-group-text pe-5 bg-white border-0">
                   Qur'an Chapters
                  </span>
                  <Dropdown.Toggle
                    className="btn btn-light btn-sm"
                  ></Dropdown.Toggle>
                </div>
                <Dropdown.Menu style={{ height: "200px", overflow: "scroll" }}>
                  {chapter_lists.map((list, i) => (
                    <Dropdown.Item className={(i+1) == chapterId && 'active'}>
                      <Link to={`/chapter/${i + 1}`} className="active menu-chapter">
                        {i + 1}. {list.name_simple} &nbsp; &nbsp; سورة
                        {list.name_arabic}
                      </Link>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </li>

            <li className="mb-2 list-group-item">
              Translation Languages
              <select
                className="form-select form-select-sm"
                onChange={(e) => {
                  setLanguage(e.target.value.toLowerCase());
                }}
              >
                {allTranslationLanguages.map((langs, index) => (
                  <option key={index} value={langs}>
                    {langs}
                  </option>
                ))}
              </select>
            </li>

            <li className="mb-2 list-group-item">
              
              <Dropdown align="end" autoClose="outside">
                <div className="input-group input-group-sm">
                  <span className="input-group-text pe-5 bg-white border-0">
                    Tanslation by
                  </span>
                  <Dropdown.Toggle className="btn btn-light btn-sm"></Dropdown.Toggle>
                </div>
                <Dropdown.Menu
                  style={{
                    height: "200px",
                    overflow: "scroll",
                    paddingRight: "1em",
                  }}
                >
                  {languageOpt.map((language, i) => (
                    <Dropdown.Item onClick={() => setTranslationId(ids[i])} className={ids[i] == translation_id && `active`}>
                      {i + 1}. {language}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>{" "}
            </li>

            <li className="mb-2 list-group-item">
              Font-face:{" "}
              <select
                className="form-select form-select-sm"
                id="arabic-font-index"
                onChange={(e) => {taf.setFace(e.target.value)
             
                }}
              >
                {font_faces.map((f) => (
                  <option key={f} onChange={()=>alert("++")}>{f}</option>
                ))}
              </select>
            </li>
            <li className="mb-2 list-group-item">
              <div className="input-group input-group-sm">
               Arabic font size <button
                  className="btn btn-light btn-sm"
                  onClick={handleFontSizeDecrease}
                >
                  -
                </button>
                <span
                  className="pe-2 ps-2 input-group-text bg-white border-0"
                  style={{ fontSize: "10pt" }}
                >
                  {arabicFont}pt
                </span>
                <button
                  className="btn btn-light btn-sm"
                  onClick={handleFontSizeIncrease}
                >
                  +
                </button>
            </div>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ChapterPageMenu;
