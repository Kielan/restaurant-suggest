import * as React from 'react';
import SuggestCard from './suggest-card';
 
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

  const genRandom = () => {
    const randomElement = data[Math.floor(Math.random() * data.length)];
    setActiveSuggestion(randomElement);
  }

  return <SuggestCard 
            activeSuggestion={activeSuggestion}
            addSuggestion={addSuggestion}
            genRandom={genRandom}
            data={data}
          />;
};
 
export default SuggestCardContainer;
   
 
