import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button`
  padding: 10px;
  width: 100%;
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.blueColor};
  text-align: center;
  font-weight: 600;
  color: white;
`;

const Button = ({text}) => <Container>{text}</Container>;

Button.propTypes = {
  text: PropTypes.string.isRequired
}

export default Button;

