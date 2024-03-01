import { useState } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

interface SaveModalProps {
    visible: boolean;
    onClose: () => void;
    handleSaveChange: () => void;
  }

  const SaveModal: React.FC<SaveModalProps> = ({ visible, onClose, handleSaveChange}) => {
    const [description, setDescription] = useState<string>(''); 

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value); 
  };

  const handleClick = () => {
    handleSaveChange(description); 
  };

    return (
      <Rodal visible={visible} onClose={onClose} animation='slideDown'>
        <div>
          <h2>Save Change</h2>
          <p>Enter a short description of the changes you've made to your Draft</p>
          <textarea className="change-description" placeholder='Describe your change...' value={description} onChange={handleChange}/>
          <button onClick={handleClick}>Save</button>
        </div>
      </Rodal>
    );
  };

export default SaveModal;
