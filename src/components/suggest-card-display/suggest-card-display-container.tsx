import * as React from 'react';
import SuggestCardDisplay from './suggest-card-display';
 
interface ISuggestCardDisplayContainerProps {
  activeSuggestion: any;
  hookRef: string;
  position: any;
}
 
const SuggestCardDisplayContainer: React.FC<ISuggestCardDisplayContainerProps> = ({ activeSuggestion, hookRef, position }) => {
  return <SuggestCardDisplay activeSuggestion={activeSuggestion} hookRef={hookRef} position={position} />;
};
 
export default SuggestCardDisplayContainer;
   
 
