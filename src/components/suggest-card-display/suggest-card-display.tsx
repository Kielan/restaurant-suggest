import * as React from 'react';
import styled from 'styled-components';
import SuggestCard from '../suggest-card/suggest-card';

const SuggestContainerDiv = styled.div`
  background: rgba(0,0,0,.6);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100999;
  min-width: 100%;
  width: ${props => `${props.theme.form.maxWidth}`};
`;

const SuggestDisplayDiv = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 100%;
  top: ${props => props.position.top + "px"};
  left: ${props => props.position.left + "px"};
  max-width: ${props => `${props.theme.form.maxWidth}`};
`;

const SuggestCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 0px;
  background-color: #ebecf0;
  border-radius: 3px;
  width: ${props => `${props.theme.form.maxWidth}`};
  height: fit-content;
`;

const SuggestCardSpan = styled.span`
  color: black;

`;

interface ISuggestCardDisplayProps {
  activeSuggestion: {
    address: string;
    link: string;
    description: string;
  };
  hookRef: string;
  position: { top: number; left: number; };
}

const SuggestCardDisplay: React.FC<ISuggestCardDisplayProps> = ({ activeSuggestion, hookRef, position }) => {
  console.log('kdl activeSuggestion suggestcarddisplay ', activeSuggestion)
  return (
    <div>{
      activeSuggestion && Object.keys(activeSuggestion).length > 0 && activeSuggestion.constructor === Object && <SuggestContainerDiv>
        <SuggestDisplayDiv ref={hookRef} position={position}>
        <SuggestCardDiv>
          <SuggestCardSpan>{`address`}</SuggestCardSpan>
          <SuggestCardSpan>{`${activeSuggestion.address}`}</SuggestCardSpan>
          <SuggestCardSpan>{`link`}</SuggestCardSpan>
          <SuggestCardSpan>{`${activeSuggestion.link}`}</SuggestCardSpan>
          <SuggestCardSpan>{`description`}</SuggestCardSpan>
          <SuggestCardSpan>{`${activeSuggestion.description}`}</SuggestCardSpan>
        </SuggestCardDiv>
        </SuggestDisplayDiv>
      </SuggestContainerDiv>
    }</div>
  );
};
/*  */
export default SuggestCardDisplay;
   
 
