import * as React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
  background-color: ${props => props.type === "success" ? "#5aac44" : "rgba(0,0,0,.6)"};
  border: none;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 3px;
  font-weight: 600;
  padding: 0px 15px;
  outline: none;
  display: flex;
  flex-direction: row;

  &:hover {
    background-color: ${props => props.type === "success" ? "#61bd4f" : "rgba(0,0,0,.8)"};
    transform: ${props => props.type === "editor" ? "translateX(5px)" : null};
  }
`;

const ButtonIconDiv = styled.div`
  font-size: 15px;
  line-height: 35px;
  margin-right: 5px;
`;

const ButtonTextDiv = styled.div`
  line-height: 35px;
`;

interface IButtonProps {
  text: string;
  icon: null;
  onClick: () => void;
  type: "button" | "submit" | "reset";
  /*Inverts the background and font color of the button variant.
  @default false*/
  invert?: boolean;
  /*The rounding of the border radius.
  @default false*/
  squared?: boolean;
}
 
const Button: React.FC<IButtonProps> = ({ text = '', icon = null, onClick = null, type="button" }) => {
  return (
    <ButtonContainer
      onClick={onClick} 
      type={type}
    >
      { icon !== null ? <ButtonIconDiv>{ icon }</ButtonIconDiv> : null }
      <ButtonTextDiv>{ text }</ButtonTextDiv>
    </ButtonContainer>
  );
};
 
export default Button;
   
 
