import { arabicNumbers } from "/public/assets/api/urls";
import { useTafsir } from "/public/assets/api/ShowTafsir";
import {useEffect} from "react"
export default function VerseOnly({chapter}) {
const taf= useTafsir()
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
  }, [taf.face, taf.font_size])
  return (
    <div>
      {chapter.map((verses, index) => {
    return  (<div style={{display:"inline"}}>
          <span key={index} className="verse-list x"
style={{fontSize: `${taf.font_size}pt`}}>{verses}</span>
          <span key={index}className="verse-number m-0 p-1">{arabicNumbers[index]}</span>
        </div>)
      })}
    </div>
  );
}
