import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function MediumModal({toggle, isOpen, children, confirm,onConfirm,onCancel, cancel, title}) {


  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onConfirm}>
            {confirm}
          </Button>  
          <Button color="secondary" onClick={onCancel}>
            {cancel}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default MediumModal;