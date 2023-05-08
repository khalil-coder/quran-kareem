import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
const LazyHomepage = lazy(() => import("./components/Homepage"));
const LazyChapter = lazy(() => import("./components/ChapterPages"));
const LazyImages = lazy(() => import("./components/QuranImages"));
const LazyAbout = lazy(() => import("./components/AboutQuran"));
import SearchResult from "./components/SearchResult"
import NoMatch from "./components/NoMatch";
import QuranNavbar from "./components/Navbar";
import { ShowTafsir } from "/public/assets/ShowTafsir";
import QuranImage from "./components/QuranImage"
import AboutDeveloper from "./components/AboutDeveloper"
const style = {
  position: "absolute",
  inset: 0,
  display: "grid",
  placeContent: "center",
  background: 'url("abdullah-arif-Dxi6KbpvUgA-unsplash.jpg")',
  backgroundAttachment: "fixed",
  backgroundSize:"cover",
};

function App() {
  return (
      <ShowTafsir>
      <QuranNavbar />
    <Routes>
      <Route
        path="/"
        element={
          <Suspense
            fallback={
              <div style={style}><span>
                <i className="spinner-border text-primary"> </i> Loading...</span>
              </div>
            }
          >
            <LazyHomepage />
          </Suspense>
        }
      />
      
  
      <Route
        path="chapter/:chapterId"
        element={
          <Suspense
            fallback={
              <div style={style}><span>
                <i className="spinner-border text-primary"> </i> Loading...</span>
              </div>
            }
          >
            <LazyChapter />
          </Suspense>
        }
      />
      <Route
        path="about-quran"
        element={
          <Suspense
            fallback={
              <div style={style}><span>
                <i className="spinner-border text-primary"> </i> Loading...</span>
              </div>
            }
          >
            <LazyAbout />
          </Suspense>
        }
      />
         
   
      <Route
        path="quran-images"
        element={
          <Suspense
            fallback={
              <div style={style}><span>
                <i className="spinner-border text-primary"> </i> Loading...</span>
              </div>
            }
          >
            <LazyImages />
          </Suspense>
        }
      />
      <Route path="quran-image/:imageName" element={<QuranImage />} />
      <Route path="about-developer" element={<AboutDeveloper />} />
      
      <Route path="search" element={<SearchResult />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
      </ShowTafsir>
  );
}

export default App;
