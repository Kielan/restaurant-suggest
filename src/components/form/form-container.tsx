import * as React from 'react';
import Form from './form';
 
interface IFormContainerProps {
  buttonText: string;
  initialValue: string;
  onClickCancel: () => void;
  onClickSubmit: () => void;
  placeholder: string;
  type?: 'button' | 'submit' | 'reset';
}
 
const FormContainer: React.FC<IFormContainerProps> = ({
  buttonText="",
  initialValue="",
  onClickCancel,
  onClickSubmit,
  placeholder,
  type,
}) => {
  return <Form 
    buttonText={buttonText}
    initialValue={initialValue}
    onClickCancel={onClickCancel}
    onClickSubmit={onClickSubmit}
    placeholder={placeholder}
    type={type}
  />;
};
 
export default FormContainer;
   
 
