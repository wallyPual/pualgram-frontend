import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.input`
  ${props => props.theme.resetButton};
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.bgColor};
  height: 35px;
  padding: 0 15px;
  font-size: 12px;
`;

const Input = ({placeholder, required = true, value, onChange, type}) => (
  <Container
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    type={type}
  />
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
}


/* 나중에 이걸로 교체
const LabelContainer = ({text, className, forText}) => (
  <label
    className={className}
    for={forText}
  >
    {text}
  </label>
);

const StyledLabel = styled(LabelContainer)`
  clip-path: inset(100%);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const InputContainer = ({placeholder, className, id}) => (
  <input
    id={id}
    className={className}
    placeholder={ placeholder }
  />
);

const StyledInput = styled(InputContainer)`
  ${props => props.theme.resetButton};
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.bgColor};
  height: 35px;
  padding: 0 15px;
  font-size: 12px;
`;

const Input = ({labelText, id, placeholder, required = true}) => (
  <Fragment>
    <StyledLabel labelText={labelText} forText={id} />
    <StyledInput placeholder={placeholder} id={id} required={required} />
  </Fragment>
);
 */
export default Input;