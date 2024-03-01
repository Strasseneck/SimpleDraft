import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashNavbar.css';

interface Props {
 
}

const DashNavbar: FC<Props> = () => {
  
  const navigate = useNavigate();


  return (
    <div className='DashNavbar'>
      <button>New Draft</button>
      <h1>SimpleDraft</h1>
    </div>
  );
};

export default DashNavbar;