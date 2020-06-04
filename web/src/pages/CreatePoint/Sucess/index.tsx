import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

import './styles.css';

const Sucess = () => {
  return (
    <div id="success">
      <FiCheckCircle size={55} color='#34CB79'/>
      <h1>Cadastro concluído</h1>
    </div>
  );
};

export default Sucess;