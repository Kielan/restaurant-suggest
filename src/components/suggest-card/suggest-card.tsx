import * as React from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  height: auto;
  width: 100%;
  border: 1px rgb(145, 126, 126) solid;
  border-radius: 10px;
  text-align: right;
  max-width: 35rem
`;

const FadeInDiv = styled.div`
  opacity: 0;
  display: block;
  animation: slidein 1s ease-out forwards;
`;

const SuggestionHeader = styled.div`
  margin: 20px;
  text-align: left;
`;

const GenSuggestionButton = styled.button`
  cursor: pointer;
  color: blue;
  text-align: left;
  z-index: 100;
`;

interface ISuggestCardProps {
  activeSuggestion: any;
  addSuggestion: () => void | any;
  genRandom: () => void | any;
  data: any;
}
 
const SuggestCard: React.FC<ISuggestCardProps> = ({
  activeSuggestion,
  addSuggestion,
  genRandom,
  data
}) => {
  console.log('retrievedSuggestions ', activeSuggestion);
  return <FormContainer style={{ backgroundColor: "white" }}>
    <FadeInDiv>
      <SuggestionHeader>
        <p>{`this.props.quote`}</p></SuggestionHeader>
    </FadeInDiv>
    <GenSuggestionButton onClick={genRandom}>
        <p style={{ margin: 0 }}>{`random suggestion`}</p>
    </GenSuggestionButton>
  </FormContainer>;
};
 
export default SuggestCard;
   
 
