import { Modal, Button } from "react-bootstrap";
import { useEffect } from "react";
export default function ChapterInfo({ show, handleClose, allState }) {
  const { name_complex, text_info } = allState;

 
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        fullscreen="true"
        className="mt-3"
      >
        <Modal.Header closeButton className="sticky-top bg-primary text-light">
          <Modal.Title>
            <span id="about-surah-heading" >
              About Surah&nbsp;
              <span dangerouslySetInnerHTML={{ __html: name_complex }}></span>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div dangerouslySetInnerHTML={{ __html: text_info }}></div>
        </Modal.Body>
        <Modal.Footer className="sticky-bottom">
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              setSearchParams({});
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
