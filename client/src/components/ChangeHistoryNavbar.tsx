import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChangeHistoryNavbar.css';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';


interface Props {
  draftId: number;
  draftTitle: string;
}

const ChangeHistoryNavbar: FC<Props> = ({ draftId }) => {
  const navigate = useNavigate();

  const onDashboardClick = () => {
    navigate('/')
  };

  const onEditorClick = () => {
    const id = draftId;
    navigate('/editor', { state: { id } })
  }


  return (
    <div className='ChangeHistoryNavbar'>
      <button onClick={onDashboardClick}><HomeIcon style={{ color: 'white' }} /></button>
      <button onClick={onEditorClick}><EditIcon style={{ color: 'white' }} /></button>
    </div>
  );
};

export default ChangeHistoryNavbar;