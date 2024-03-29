import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;

  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
  &:hover {
    color: skyblue;
  }
  border-bottom: 2px solid
    ${(props) => (props.current ? 'skyblue' : 'transparent')};
  transition: border-bottom 0.5s ease-in-out;
`;

const Mov = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default () => {
  const { pathname } = useLocation();
  return (
    <Header>
      <List>
        <Item current={pathname === '/'}>
          <Mov to='/'>영화</Mov>
        </Item>
        <Item current={pathname === '/tv'}>
          <Mov to='/tv'>TV</Mov>
        </Item>
        <Item current={pathname === '/search'}>
          <Mov to='/search'>검색</Mov>
        </Item>
      </List>
    </Header>
  );
};
