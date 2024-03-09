import { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import './DashNavbar.css';

interface Props {
  onShowModal: () => void;
}

const DashNavbar: FC<Props> = ({ onShowModal }) => {

  return (
    <div className='DashNavbar'>
      <button onClick={onShowModal}><AddIcon style={{ color: 'white' }} />
      </button>
      <h1 className='Logo'>SimpleDraft</h1>
    </div>
  );
};

export default DashNavbar;