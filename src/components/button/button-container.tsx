import * as React from 'react';
import Button from './button';
 
interface IButtonContainerProps {
  text: string;
  icon: string | any;
  onClick: (e: any) => void;
  type?: 'button' | 'submit' | 'reset';
}
 
const ButtonContainer: React.FC<IButtonContainerProps> = ({ 
  type,
  text,
  icon,
  onClick, 
}) => {
  return <Button
    text={text}
    icon={null}
    onClick={() => {}}
    type={type}
  />;
};
 
export default ButtonContainer;
   
 
