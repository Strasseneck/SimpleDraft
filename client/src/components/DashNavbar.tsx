import { FC } from 'react';
import './DashNavbar.css';

interface Props {
  onShowModal: () => void;
}

const DashNavbar: FC<Props> = ({ onShowModal }) => {
  
  return (
    <div className='DashNavbar'>
      <button onClick={onShowModal}>New Draft</button>
      <h1>SimpleDraft</h1>
    </div>
  );
};

export default DashNavbar;