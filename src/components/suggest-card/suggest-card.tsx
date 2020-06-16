import * as React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  font-weight: 600;
  font-size: 1rem;
  padding: 1rem 2rem;
  color: #fff;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 1px;
  background-image: linear-gradient(
    to right,
    #7060ff,
    #663399,
    #e8a148,
    #eb5424
  );
  background-size: 300% 100%;
  text-transform: uppercase;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 0 4rem 0 #663399;
  &:hover {
    background-position: 100% 0;
    box-shadow: 0 0 4rem 0 rgb(235, 84, 36, 0.7);
  }
`;

const FormContainer = styled.form`
  height: auto;
  width: 100%;
  border: 1px rgb(145, 126, 126) solid;
  border-radius: 10px;
  text-align: right;
  max-width: ${props => `${props.theme.form.maxWidth}`};
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

const SuggestionHeaderDiv = styled.div`
  margin: 20px;
  text-align: left;
  font-size: 16px;

  p {
    z-index: 99999;
  }
`;

const ButtonLayoutDiv = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 35rem;
`;

const AddSuggestionButton = styled.button`
  font-weight: 600;
  font-size: 1rem;
  padding: 1rem 2rem;
  color: #fff;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 1px;
  background-image: linear-gradient(
    to right,
    #7060ff,
    #663399,
    #e8a148,
    #eb5424
  );
  background-size: 300% 100%;
  text-transform: uppercase;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 0 4rem 0 #663399;
  margin: 1rem 1rem 1rem 1rem;

  &:hover {
    background-position: 100% 0;
    box-shadow: 0 0 4rem 0 rgb(235, 84, 36, 0.7);
  }
`;

const GenSuggestionButton = styled.button`
  font-weight: 600;
  font-size: 1rem;
  padding: 1rem 2rem;
  color: #fff;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 1px;
  background-image: linear-gradient(
    to right,
    #7060ff,
    #663399,
    #e8a148,
    #eb5424
  );
  background-size: 300% 100%;
  text-transform: uppercase;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 0 4rem 0 #663399;
  margin: 1rem 1rem 1rem 1rem;

  &:hover {
    background-position: 100% 0;
    box-shadow: 0 0 4rem 0 rgb(235, 84, 36, 0.7);
  }
`;

interface ISuggestCardProps {
  activeFormRefId: string;
  activeSuggestion?: any;
  addSuggestion: () => void | any;
  formListRefs?: any;
  formSuggestions?: any;
  genRandom: (e: any) => void | any;
  handleCardRef?: (node: any, id: string) => void;
  data: any;
  onChangeHookRef?: () => void;
  handleFormRef: (node: any, id: any) => void;
}
 
const SuggestCard: React.FC<ISuggestCardProps> = ({
  activeFormRefId,
  activeSuggestion,
  addSuggestion,
  data,
  formSuggestions,
  genRandom,
  handleFormRef,
}) => {
  console.log('random gen activeSuggestion ', activeSuggestion);
  const {
    address,
    link,
    description,
  } = activeSuggestion;
  const onPressAddSuggestion = (e) => {
    e.preventDefault();
    addSuggestion();
  }
  var suggestCardRefList = {
    'e3p40592md': { id: 'e3p40592md'},
    'oocs34kl': { id: 'oocs34kl'},
  };

  function handleComponentRef(node: any, id: string) {
    handleFormRef(node, id);
  }

  return <>
            <FormContainer
              style={{ backgroundColor: "white" }}
              onClick={(e) => onPressAddSuggestion(e)}
              ref={(node) => handleComponentRef(node, 'e3p40592md')}
            >
              <FadeInDiv>
                <SuggestionHeaderDiv
                >
                  <p style={{ color: 'black', minHeight: '26px' }}>{description}</p>
                </SuggestionHeaderDiv>
              </FadeInDiv>
            </FormContainer>
            <ButtonLayoutDiv>
              <AddSuggestionButton onClick={(e) => onPressAddSuggestion(e)}>
                  <p style={{ margin: 0 }}>{`add suggestion`}</p>
              </AddSuggestionButton>
              <GenSuggestionButton onClick={(e) => genRandom(e)}>
                  <p style={{ margin: 0 }}>{`random suggestion`}</p>
              </GenSuggestionButton>
            </ButtonLayoutDiv></>;
};
 
export default SuggestCard;
   
 
