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
  opacity: ${props => {
    switch(props.activeSuggestion) {
      case props.activeSuggestion && !Object.keys(props.activeSuggestion).length: return 1;
      default: return 0;
    } 
  }};
  display: block;
  animation: slidein 1s ease-out forwards;
`;

const SuggestionHeader = styled.div`
  margin: 20px;
  text-align: left;
  font-size: 16px;

  p {
    z-index: 99999;
  }
`;

const AddSuggestionButton = styled.button`
  cursor: pointer;
  color: blue;
  text-align: left;
  z-index: 100;
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
  genRandom: (e: any) => void | any;
  handleCardRef: (node: any, id: any) => void;
  data: any;
  setFormListRefs: () => void;
  setActiveFormRefId: (id: any) => void;
}
 
const SuggestCard: React.FC<ISuggestCardProps> = ({
  activeSuggestion,
  addSuggestion,
  genRandom,
  data,
  handleCardRef,
  setFormListRefs,
  setActiveFormRefId,
}) => {
  const {
    address,
    link,
    name,
  } = activeSuggestion;
  return <FormContainer style={{ backgroundColor: "white" }}>
    <FadeInDiv>
      <SuggestionHeader
        ref={(node) => handleCardRef(node, 'ampda92lf')}
        onClick={() => setActiveFormRefId('ampda92lf')}
      >
        <p style={{ color: 'black' }}>{name}</p>
      </SuggestionHeader>
    </FadeInDiv>
    <AddSuggestionButton onClick={addSuggestion}>
        <p style={{ margin: 0 }}>{`add suggestion`}</p>
    </AddSuggestionButton>
    <GenSuggestionButton onClick={genRandom}>
        <p style={{ margin: 0 }}>{`random suggestion`}</p>
    </GenSuggestionButton>
  </FormContainer>;
};
 
export default SuggestCard;
   
 
