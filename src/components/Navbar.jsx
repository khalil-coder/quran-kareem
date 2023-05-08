import { Button, Container, Nav, Navbar, Offcanvas, Dropdown, NavDropdown } from "react-bootstrap";
import { useState, useEffect} from "react";
import { NavLink, Link } from "react-router-dom";
import { useTafsir } from "../assets/api/ShowTafsir";
function QuranNavbar() {
  const taf= useTafsir()
  const styleSpecial={
backgroundColor:"white", textDecoration:"none", display:"flex",fontSize:"13pt", color:"black", gap:"0.4em"
  }
  const style = ({ isActive }) => ({
  color: "black",
    textDecoration: "none",
    fontSize: "13pt",
    border: isActive && "1px inset hsl(215, 19.3%, 34.5%)",
    borderRadius: isActive&& "10px",
    borderTop:isActive&&"0", borderLeft:isActive&&"0", borderRight:isActive&&"0",

  });
  const [show, setShow] = useState(false);
  useEffect(()=>{}, [taf.img_src])
  return (
    <Navbar bg="dark" expand="lg" className="sticky-top" variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <Link
            to="/"
            style={{
              fontWeight: "bolder",
              textDecoration: "none",
              color: "white",
            }}
          >
            <span id="nav-brand">AlQur'an Kareem</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle onClick={() => setShow(true)} />
        <Offcanvas
          show={show}
          onHide={() => setShow(false)}
          responsive="lg"
          className="w-75"
        >
          <Offcanvas.Header className="bg-dark text-light" closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
          <ul className="list-group list-group-flush">
            <li className="list-group-item mb-2"><NavLink style={style} to="/">
<i className="bi-house text-secondary"></i> Home 
            </NavLink></li>
            <li className="mb-2 list-group-item"><NavLink style={style} to="search">
 <i className="bi-search text-secondary"></i> Search
            </NavLink></li>
            <li className="mb-2 list-group-item">
 <NavLink style={styleSpecial}><i className="bi-book text-secondary"></i> Chapters<Dropdown align="start"autoClose="inside">
                  <Dropdown.Toggle
                    className="btn btn-light btn-sm border-0"
                  ></Dropdown.Toggle>
                <Dropdown.Menu style={{ height: "200px", overflow: "scroll" }}>
                {
                taf.chapters.length > 0 ?
                  <>{taf.chapters.map((list, i) => (
             <Dropdown.Item className="text-center">
                      <Link to={`/chapter/${i + 1}`} className="menu-chapter">
                        {i + 1}. {list.name_simple} &nbsp; &nbsp; سورة
                        {list.name_arabic}
                      </Link>
                    </Dropdown.Item>
                  ))}</> : <Dropdown.Item> Check your internet connection 🚫 </Dropdown.Item>}
                </Dropdown.Menu>
              </Dropdown></NavLink>
 </li>
 <li className="mb-2 list-group-item">
 <NavLink style={style} to="quran-images" onClick={()=> taf.setImgSrc("")}><i className="bi-images text-secondary"></i> Quran Pictures</NavLink></li>
 
<li className="mb-2 list-group-item"> <NavLink style={style} to="about-quran" onClick={()=> taf.setImgSrc("")}><i className="bi-info text-secondary"></i> About Quran</NavLink></li>
<li className="mb-2 list-group-item"> <NavLink style={style} to="about-developer"><span className="text-secondary">&lt;/&gt;</span> About Developer</NavLink></li>
 
 <li className="mb-2 list-group-item">
{taf.img_src.length > 0 && <NavLink style={style} to={`quran-image/${taf.img_src}`}><i className="bi-play text-secondary"></i> Previewing... <img src={`../src/assets/alquran/${taf.img_src}`}
        alt={taf.img_src} className="img-fluid w-100" />
</NavLink>
}
</li>
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  );
}

export default QuranNavbar;
