import { images } from "/public/assets/urls";
import {Link} from "react-router-dom"
import { useTafsir } from "/public/assets/ShowTafsir";
export default function QuranImages() {
  const taf = useTafsir()
  return <>
  <h3 className="text-center mt-2">AlQuran - The Glorious Book</h3>
  <p className="text-center">Indeed, it is We who sent down the Qur'an and indeed, We will be its guardian.
  <br/><samp className="bg-primary pe-2 ps-2 text-light badge">Quran 15:9</samp></p>
  {
    images.map(image=>{
     return( <div className="card card-flush mb-2" >
      <img src={image} className="img-fluid" alt={image}/>
      <div className="btn-group btn-group-sm">
      <Link to={`/quran-image/${image}`} className="btn btn-dark" onClick={()=> taf.setImgSrc(image)}>
      <i className="bi-play"></i> Preview</Link>
      <a href={image} download={image} className="btn btn-primary"><i className="bi-download"></i> Download</a>
      </div>
      </div>)
    })
  }
  </>;
}
