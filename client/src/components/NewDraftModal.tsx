import { useState } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

interface NewDraftModalProps {
    visible: boolean;
    onClose: () => void;
    handleNewDraftClick: (title: string) => void;
  }

  const NewDraftModal: React.FC<NewDraftModalProps> = ({ visible, onClose, handleNewDraftClick }) => {
    const [title, setTitle] = useState<string>(''); 

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value); 
  };

  const handleClick = () => {
    if (title.trim() === '') {
      setTitle('A draft needs a Title!')
    }
    else if (title.length > 30) {
      setTitle('That title is too long!')
    }
    else {
      handleNewDraftClick(title); 
    }
  };

    return (
      <Rodal className='save-modal' visible={visible} onClose={onClose} animation='slideDown' customStyles={{"background-color": "var(--paper-color)", "fontFamily": "Noto Sans Mono"}}>
        <div id='save-modal'>
          <h3 style={{marginBottom: "8px"}}>Create New Draft</h3>
          <textarea autoFocus style={{ height: "120px", backgroundColor: "var(--paper-color)", width: "100%", outline: "0", fontSize: "16px", padding: "8px", border: "hidden", resize: "none"}} id="change-description" placeholder='Give your new Draft a title!' value={title} onChange={handleChange}/>
          <button style={{height: "45px", width: "90px", borderRadius: "5px", cursor: "pointer", marginTop: "15px"}} onClick={handleClick}>Create</button>
        </div>
      </Rodal>
    );
  };

export default NewDraftModal;
