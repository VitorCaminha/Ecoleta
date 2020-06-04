import React from 'react';

// import { Container } from './styles';

// Como fazer uma prop opcional (colocando ? antes do :) e adicionar um valor default
interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
}

export default Header;