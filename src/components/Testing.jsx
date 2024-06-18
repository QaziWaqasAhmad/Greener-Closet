import React, { useState } from 'react' 
import Buttons from './Buttons';
import MediumModal from "./MediumModal"
import BasicTable from './table/Table';

 
const Testing = () => {
  const [modal, setModal] = useState(false);

const toggle = () => setModal(!modal);
  return (
    <>
      <h1>test</h1>
      <Buttons
        name="Click" 
        className="p-2 m-5"
        onClick={toggle}
      />

<MediumModal
        isOpen={modal}
        toggle={toggle}
        title="Modal Title" 
        confirm="Confirm"
        cancel="Cancel"
        onClick={toggle}
      >
        {/* You can include more content in the ModalBody here */}
        <div>
          <p>This is additional content in the modal body.</p>
          <p>You can add more elements and text here.</p>
        </div>
      </MediumModal>


      <BasicTable/>
    </>
  )
}

export default Testing
