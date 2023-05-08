import { Link } from "react-router-dom";
export default function Chapter({
  name_complex,
  name_arabic,
  translated_name,
  index,
  id,
}) {
  const style={
    color: "hsl(215, 16.3%, 46.9%)",
    textDecoration: "none"
  }
  return (
    <main>
    <Link to={`chapter/${id}`} style={style}>
        <span className="fw-bold lead">Chapter {index+1}</span>
      <p className="arabic-index bg-dark text-light rounded-bottom"> {name_arabic} </p>
      <p className="fw-bold lead">
        {name_complex} <br /> {translated_name.name} 
      </p>
    </Link>
    </main>
  );
}
