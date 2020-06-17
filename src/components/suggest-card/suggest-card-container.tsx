import * as React from 'react';
import SuggestCard from './suggest-card';
import SuggestCardEdit from './suggest-card-edit';
import axios from 'axios';
import * as api from '../../lib/api/api';
import { string } from 'prop-types';

function useHookWithRefCallback() {
  const ref = React.useRef(null)
  const setRef = React.useCallback(node => {
    // Save a reference to the node
    ref.current = node;
  }, []);

  return [ref, setRef];
}

interface IFormLocationProps {
  description: string;
  id: string;
 // matched_substring: Array<>
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  terms: Array<{ offset: number; value: string; }>;
  types: Array<string>;
}

interface ISuggestCardContainerProps {
  activeSuggestion: any;
  addSuggestion: () => void;
  addSuggestionBool: boolean;
  closeEditForm: () => void;
  data?: any;
  displayColor: () => any | void;
  onChangeData?: (data: any) => void;
  setActiveSuggestion: (el: any) => void;
}

const SuggestCardContainer: React.FC<ISuggestCardContainerProps> = ({ 
  activeSuggestion,
  addSuggestion,
  addSuggestionBool,
  closeEditForm,
  data,
  displayColor,
  onChangeData,
  setActiveSuggestion,
}) => {
  const randomColor = displayColor();
  const html = document.documentElement;
  html.style.backgroundColor = randomColor;
  const [formListRefs, setFormListRefs] = React.useState<any>({'e3p40592md': { id: 'e3p40592md'}});
  const [activeFormRefId, setActiveFormRefId] = React.useState<any>('e3p40592md');
  const [formVars, setFormVars] = React.useState<IFormLocationProps>({});
  const [formTextVal, setFormTextVal] = React.useState<any>('');
  const [formSuggestions, setFormSuggestions] = React.useState<any>('');
  //const [retrievedSuggestions, setRetrievedSuggestions] = React.useState([]);

  const [hookRef, setRef] = useHookWithRefCallback();
  var suggestCardRefList = {
    'e3p40592md': { id: 'e3p40592md'},
  };
  
  const returnSuggestions = async () => {
    const getSuggestions = await api.fetchGetSuggestions();
    // .then(res => res.suggestions);
    console.log('inapp pretenderRes ', getSuggestions);
    return getSuggestions;
  }

  const onSubmitSuggestCardEdit = React.useCallback(async () => {
    console.log('add suggestion triggered select triggered ', formVars);
    const postResult = await axios.post('/suggestions', {
      ...formVars
    });
    console.log('end usecallback ', postResult);
    closeEditForm();
  }, [axios, formVars, closeEditForm]);

  React.useEffect(() => {
    returnSuggestions().then((returnedSuggestions) => {
      console.log('axios finish ', returnedSuggestions);
      // @ts-ignore
      // setRetrievedSuggestions(returnedSuggestions);
      //can't use onChange via props or within this method?
      //onChange() would wrap setRetrievedSuggestions but causes an infinite render loop.
      // @ts-ignore
      onChangeData(returnedSuggestions);
    });
  }, [activeSuggestion, addSuggestionBool, formListRefs, formVars, formTextVal, formSuggestions]);

  const suggestionsReducer = (state, action) => {
    switch (action.type) {
      case 'SET_SUGGESTIONS':
        return [
          ...state, {
            ...action.suggestion,
          }
        ];
      default:
       return state;
    }
  }

 // const [suggestions, suggestionsDispatch] = React.useReducer(todoReducer, initialTodos);

  const genRandom = (e) => {
    e.preventDefault();
    const randomElement = data[Math.floor(Math.random() * data.length)];
    console.log('getrandom test activesuggestions ', data);
    setActiveSuggestion(randomElement);
  }

  function onChangeFormVars(val: any) {
    //remove prop from object
    delete val.matched_substrings
    delete val.structured_formatting.main_text_matched_substrings
    
    setFormVars(val);
  }

  function onChangeFormInput(val: string) {
    console.log('kdl onChangeFormInput ', val)
    setFormTextVal(val)
  }

  function onChangeActiveCardRefId(id: any) {
    console.log('container changeactivecard ', id);
    setActiveFormRefId(id);
    console.log('onChangeActiveCardRefId ', activeFormRefId)
  }

  function onChangeFormRef(node: any, id: any) {
    var newRefList = formListRefs;    
    newRefList[id] = node;
    setFormListRefs(newRefList);
  }

  console.log('cardcontainer ', formListRefs[activeFormRefId]);
  return <><SuggestCard 
            activeFormRefId={activeFormRefId}
            activeSuggestion={activeSuggestion}
            addSuggestion={addSuggestion}
            data={data}
            formSuggestions={formSuggestions}
            genRandom={genRandom}
            handleFormRef={onChangeFormRef}
          />
          {addSuggestionBool && formListRefs[activeFormRefId] &&
          <SuggestCardEdit
            initialValue={""}
            onCancelEdit={closeEditForm}
            position={{
              top: activeFormRefId  && formListRefs[activeFormRefId] && formListRefs[activeFormRefId].getBoundingClientRect ? formListRefs[activeFormRefId].getBoundingClientRect().top : null,
              left: activeFormRefId && formListRefs[activeFormRefId] && formListRefs[activeFormRefId].getBoundingClientRect ? formListRefs[activeFormRefId].getBoundingClientRect().left : null
            }}
            onChangeFormVars={onChangeFormVars}
            onSubmitForm={onSubmitSuggestCardEdit}
            hookRef={hookRef}
            formTextVal={formTextVal}
            onChangeFormInput={onChangeFormInput}
          />}</>; 
};
 
export default SuggestCardContainer;
   
 
