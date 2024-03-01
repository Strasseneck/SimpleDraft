import React, { useState } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

interface SaveModalProps {
    visible: boolean;
    onClose: () => void;
  }

  const SaveModal: React.FC<SaveModalProps> = ({ visible, onClose }) => {
    return (
      <Rodal visible={visible} onClose={onClose} animation='slideDown'>
        <div>
          <h2>Save Change</h2>
          <p>Enter a short description of the changes you've made to your Draft</p>
          <textarea placeholder='Describe your change...' />
          <button onClick={onClose}>Save</button>
        </div>
      </Rodal>
    );
  };

export default SaveModal;
