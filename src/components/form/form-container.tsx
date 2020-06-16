import * as React from 'react';
import Form from './form';
 
interface IFormContainerProps {
  children?: any;
  buttonText: string;
  initialValue: string;
  onClickCancel: () => void;
  onClickSubmit: (submitContent: any) => void;
  placeholder: string;
  type?: 'button' | 'submit' | 'reset';
  value?: string;
  setValue?: (val: string) => void;
}
 
const FormContainer: React.FC<IFormContainerProps> = ({
  buttonText="",
  children,
  initialValue="",
  onClickCancel,
  onClickSubmit,
  placeholder,
  type,
  value,
  setValue
}) => {
  
  return <Form 
    buttonText={buttonText}
    children={children}
    initialValue={initialValue}
    onClickCancel={onClickCancel}
    onClickSubmit={onClickSubmit}
    placeholder={placeholder}
    type={type}
    value={value}
    setValue={setValue}
  />;
};
 
export default FormContainer;
   
 
