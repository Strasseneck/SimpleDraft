import { FC } from 'react';
import './DashNavbar.css';

interface Props {
  onShowModal: () => void;
}

const DashNavbar: FC<Props> = ({ onShowModal }) => {
  
  return (
    <div className='DashNavbar'>
      <button onClick={onShowModal}>New Draft</button>
    </div>
  );
};

export default DashNavbar;