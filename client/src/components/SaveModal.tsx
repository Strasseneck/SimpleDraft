import { useState } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

interface SaveModalProps {
    visible: boolean;
    onClose: () => void;
    handleSaveChange: (description: string) => void;
  }

  const SaveModal: React.FC<SaveModalProps> = ({ visible, onClose, handleSaveChange}) => {
    const [description, setDescription] = useState<string>(''); 

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value); 
  };

  const handleClick = () => {
    if (description.trim() !== '' && description.length <= 50) {
      handleSaveChange(description); 
    }
    else if (description.trim() === '') {
      setDescription('Please describe your change!')
    }
    else if (description.length > 50 ) {
      setDescription('Description too long!')
    }
  };

    return (
      <Rodal className='save-modal' visible={visible} onClose={onClose} animation='slideDown' customStyles={{"background-color": "var(--paper-color)", "fontFamily": "Noto Sans Mono"}}>
        <div id='save-modal'>
          <h3 style={{marginBottom: "8px"}}>Save Change</h3>
          <textarea autoFocus style={{ height: "120px", backgroundColor: "var(--paper-color)", width: "100%", outline: "0", fontSize: "16px", padding: "8px", border: "hidden", resize: "none"}} id="change-description" placeholder='Provide a short description of the changes made.' value={description} onChange={handleChange}/>
          <button style={{height: "45px", width: "90px", borderRadius: "5px", cursor: "pointer", marginTop: "15px"}} onClick={handleClick}>Save</button>
        </div>
      </Rodal>
    );
  };

export default SaveModal;
