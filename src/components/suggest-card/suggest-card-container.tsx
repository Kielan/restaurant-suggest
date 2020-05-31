import * as React from 'react';
import SuggestCard from './suggest-card';
import SuggestCardEdit from './suggest-card-edit';
 
interface ISuggestCardContainerProps {
  activeSuggestion: any;
  addSuggestion: () => void;
  data: any;
  displayColor: () => any | void;
  setActiveSuggestion: (el: any) => void;
}
 
const SuggestCardContainer: React.FC<ISuggestCardContainerProps> = ({ 
  activeSuggestion,
  addSuggestion,
  data,
  displayColor,
  setActiveSuggestion,
}) => {
  const randomColor = displayColor();
  const html = document.documentElement;
  html.style.backgroundColor = randomColor;
  const [formListRefs, setFormListRefs] = React.useState({});
  const [activeFormRefId, setActiveFormRefId] = React.useState(false);

  const genRandom = (e) => {
    e.preventDefault();
    const randomElement = data[Math.floor(Math.random() * data.length)];
    setActiveSuggestion(randomElement);
  }
//            setFormListRefs={}
function onChangeActiveCardRefId(id: any) {
  setActiveFormRefId(id);
}

function onChangeCardRef(node: any, id: any) {
  var newRefList = formListRefs;
  newRefList[id] = node;
  setFormListRefs(newRefList)
}

  return <><SuggestCard 
            activeSuggestion={activeSuggestion}
            addSuggestion={addSuggestion}
            data={data}
            genRandom={genRandom}
            handleCardRef={onChangeCardRef}
            setActiveFormRefId={onChangeActiveCardRefId}
          />
          {activeFormRefId && formListRefs[activeFormRefId] && <SuggestCardEdit 
            activeFormRefId={activeFormRefId}
            formListRefs={formListRefs}
            initialValue={""}
            position={{
              top: activeFormRefId  && formListRefs[activeFormRefId] && formListRefs[activeFormRefId].getBoundingClientRect ? formListRefs[activeFormRefId].getBoundingClientRect().top : null,
              left: activeFormRefId && formListRefs[activeFormRefId] && formListRefs[activeFormRefId].getBoundingClientRect ? formListRefs[activeFormRefId].getBoundingClientRect().left : null
            }}
          />}</>;
};
 
export default SuggestCardContainer;
   
 
