import { useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useTafsir } from "../assets/api/ShowTafsir";
export default function QuranImage() {
const taf = useTafsir()
  const style = {
    position: "absolute",
    inset: "0",
    background: `linear-gradient(rgba(0,0,0,0.5), rgb(0,0,0,0.5)), url("../src/assets/alquran/${taf.img_src}")`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundPosition:"center center",
    display: "grid",
    placeContent: "center",
  };
  useEffect(() => {
    window.scrollTo(0, -30);
  }, [taf.img_src]);
  return (
    <div style={style}>
      <img
        src={`../src/assets/alquran/${taf.img_src}`}
        alt={taf.img_src}
        className="object-fit-contain img-fluid"
      />
      <br />
      <a
        href={`../src/assets/alquran/${taf.img_src}`}
        download={taf.img_src}
        className="btn btn-primary"
      >
        <i className="bi-download"></i> Download
      </a>
      <i
        className="bi-arrow-left text-light text-center info-icon back-arrow"
        style={{ fontSize: "11pt" }}
        onClick={() =>{ history.back()
          taf.setImgSrc("")
        }}
      >
        <br />
        Go back
      </i>
    </div>
  );
}
