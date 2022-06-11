import React from 'react';
import {useNavigate} from 'react-router';
import styled from 'styled-components';
import NavIcon from './NavIcon';
import PropTypes from 'prop-types';

const NavContainer = styled.div`
  display: flex;
  position: sticky;
  top: 0px;
  height: 100vh;
  border-right: 4px solid black;

  background-color: #F9F6EE;
`;

const NavContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 75px;

  border-top: 4px dashed black;
`;

const NavHeader = styled.div`
  font-size: 180%;
  white-space: nowrap;
  text-decoration: underline;

  margin: 20px 0px;
`;

const NavLink = styled.div`
  font-size: 120%;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
    font-size: 140%;
  }
`;

export default function Navigation({expanded, setExpanded}) {
  const navigate = useNavigate();

  return (
    <NavContainer>
      <NavIcon expanded={expanded} setExpanded={setExpanded} />
      <NavContent className={expanded ? "navContent-expanded" : "navContent-hidden"}>
        <NavHeader className={expanded ? "nav-expanded" : "nav-hidden"}>Vinyl Destination</NavHeader>
        <NavLink onClick={() => navigate("/home")} className={expanded ? "nav-expanded" : "nav-hidden"}>Home</NavLink>
        <NavLink onClick={() => navigate("/shop")} className={expanded ? "nav-expanded" : "nav-hidden"}>Shop</NavLink>
        <NavLink onClick={() => navigate("/cart")} className={expanded ? "nav-expanded" : "nav-hidden"}>Cart</NavLink>
      </NavContent>
    </NavContainer>
  )
}

Navigation.propTypes = {
  expanded: PropTypes.bool.isRequired,
  setExpanded: PropTypes.func.isRequired
}