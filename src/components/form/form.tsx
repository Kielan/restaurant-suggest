import * as React from 'react';
import styled from 'styled-components';
import { IoMdClose as CancelIcon } from 'react-icons/io';
import { Button } from '../button';

const FormContainer = styled.form`
  padding: ${props => props.type === "list" ? "10px" : "0px"};
  background-color: ${props => props.type === "list" ? "#ebecf0" : null};
  border-radius: 3px;
  width: ${props => {
    switch(props.type) {
      case 'list': return '275px';
      case 'editor': return '270px';
      case 'card': return '250px';
      default: return '250px';
    }
  }};
  height: fit-content;
`;

const FormHeader = styled.div`
  background-color: #fff;
  border-radius: 3px 3px 0px 0px;
`;

const FormTextArea = styled.textarea`
  background-color: #fff;
  border-radius: ${props => props.formHasHeader ? "0px 0px 3px 3px" : "3px"};
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
  margin-bottom: 8px;
  min-height: 50px;
  max-height: 250px;
  padding: 10px;
  font-size: 14px;
  border: none;
  overflow: hidden;
  resize: none;
  width: 250px;
  outline: none;
`;

const FormInput = styled.input`
  background-color: #fff;
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  border: none;
  box-shadow: inset 0 0 0 2px #0079bf;
  overflow: hidden;
  overflow-y: scroll;
  display: block;
  margin-bottom: 5px;
  width: 250px;
  outline: none;
`;

const ButtonsContainer = styled.div`
  align-items: center;  
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const CancelIconStyled = styled(CancelIcon)`
  cursor: pointer;
  color: #6b778c;
  font-size: 25px;

  &:hover {
    color: #172b4d;
  }
`;

interface IFormProps {
  buttonText: string;
  initialValue: any;
  onClickCancel: () => void;
  onClickSubmit: (inputText: any) => void;
  placeholder: string;
  type?: "text" | "button" | "submit" | "reset";
}
 
const Form: React.FC<IFormProps> = ({ buttonText, children, initialValue, onClickCancel, onClickSubmit, placeholder, type }) => {
  const [inputText, setInputText] = React.useState(initialValue || '');
  const form = React.createRef();
  const textarea = React.createRef();
  const input = React.createRef();

  function handleOnKeyDown(e: any) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      handleOnSubmit(e);
    }
  }

  React.useEffect(() => {
    if (input && input.current) {
      input.current.focus();
    }
    if (textarea && textarea.current) {
      textarea.current.focus();
    }
  });

//  useClickOutsideEffect(form, props.onClickCancel);

  const options = {
    type: "text", 
    value: inputText,
    placeholder: placeholder,
    onChange: handleOnChangeText
  };

  return (
    <FormContainer type={type} ref={form}>
    <FormHeader>
      {/* { children } */}
    </FormHeader>
    {
      type === 'list' || type === 'labels' 
      ? <FormInput 
          {...options}
          ref={input}
        /> 
      : <FormTextArea
          {...options} 
          ref={textarea} 
          editor={type === "editor"}
          formHasHeader={children ? true : false}
          onKeyDown={handleOnKeyDown} 
        />
    } 
    <ButtonsContainer>
      <Button 
        text={buttonText}
        onClick={handleOnSubmit}
        icon={''}
        type={type}
      />
      {
        onClickCancel &&
        <CancelIconStyled onClick={onClickCancel} />
      }
    </ButtonsContainer>
  </FormContainer>
  );
};
 
export default Form;
   
 
