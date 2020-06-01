import * as React from 'react';
import SuggestCard from './suggest-card';
import SuggestCardEdit from './suggest-card-edit';
 
interface ISuggestCardContainerProps {
  activeSuggestion: any;
  addSuggestion: (e: any) => void;
  addSuggestionBool: boolean;
  cancelEditForm: () => void;
  saveEditForm: () => void;
  data: any;
  displayColor: () => any | void;
  setActiveSuggestion: (el: any) => void;
}
 
const SuggestCardContainer: React.FC<ISuggestCardContainerProps> = ({ 
  activeSuggestion,
  addSuggestion,
  addSuggestionBool,
  cancelEditForm,
  data,
  displayColor,
  saveEditForm,
  setActiveSuggestion,
}) => {
  const randomColor = displayColor();
  const html = document.documentElement;
  html.style.backgroundColor = randomColor;
  const [formListRefs, setFormListRefs] = React.useState({});
  const [activeFormRefId, setActiveFormRefId] = React.useState<any>(false);

  const genRandom = (e) => {
    e.preventDefault();
    const randomElement = data[Math.floor(Math.random() * data.length)];
    setActiveSuggestion(randomElement);
  }

  function onChangeActiveCardRefId(id: any) {
    setActiveFormRefId(id);
  }

  function onChangeFormRef(node: any, id: any) {
    var newRefList = formListRefs;
    newRefList[id] = node;
    setFormListRefs(newRefList)
  }

  return <><SuggestCard 
            activeSuggestion={activeSuggestion}
            addSuggestion={addSuggestion}
            data={data}
            genRandom={genRandom}
            handleCardRef={onChangeFormRef}
            setActiveFormRefId={onChangeActiveCardRefId}
          />
          {addSuggestionBool && <SuggestCardEdit 
            activeFormRefId={activeFormRefId}
            formListRefs={formListRefs}
            initialValue={""}
            onCancelEdit={cancelEditForm}
            position={{
              top: activeFormRefId  && formListRefs[activeFormRefId] && formListRefs[activeFormRefId].getBoundingClientRect ? formListRefs[activeFormRefId].getBoundingClientRect().top : null,
              left: activeFormRefId && formListRefs[activeFormRefId] && formListRefs[activeFormRefId].getBoundingClientRect ? formListRefs[activeFormRefId].getBoundingClientRect().left : null
            }}
            onSaveForm={saveEditForm}
          />}</>;
};
 
export default SuggestCardContainer;
   
 
