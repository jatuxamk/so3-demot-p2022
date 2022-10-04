import React from 'react';
import UutisLista from './components/UutisLista';
import Valikko from './components/Valikko';

const App : React.FC = () : React.ReactElement => {
  return (
    <div>
      <Valikko />
      <UutisLista />    
    </div>
  );
}

export default App;
