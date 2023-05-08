import { createContext, useContext, useState } from "react";

const HandleTafsir = createContext(null);

export function ShowTafsir({ children }) {
  const [show, setShow] = useState(false);
  const [face, setFace] = useState("me_quran.ttf");
  const [showTranslation, setShowTranslation] = useState("block");
  const [chapters, setChapters] = useState([]);
  const [font_size, setFontSize] = useState();
  const [img_src, setImgSrc] = useState("");
  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);
  return (
    <HandleTafsir.Provider value={{ show, handleShow, handleHide, face, setFace, font_size, setFontSize, showTranslation, setShowTranslation, chapters, setChapters, img_src, setImgSrc }}>
      {children}
    </HandleTafsir.Provider>
  );
}

export const useTafsir =()=>{
  return useContext(HandleTafsir)
}
