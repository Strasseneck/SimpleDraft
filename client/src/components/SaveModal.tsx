import React, { useState } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  return (
    <div>
      <button onClick={show}>show</button>

      <Rodal visible={visible} onClose={hide} animation='slideDown'>
        <div>Content</div>
      </Rodal>
    </div>
  );
};

export default App;
