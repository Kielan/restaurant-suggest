import * as React from 'react';
import SuggestCard from './suggest-card';
import SuggestCardEdit from './suggest-card-edit';
import { SuggestCardDisplay } from '../suggest-card-display';
import axios from 'axios';
import * as api from '../../lib/api/api';
import { string } from 'prop-types';

function useHookWithRefCallback() {
  const ref = React.useRef(null);
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
  onChangeActive: (data: any) => void;
}

/*
  This component features a test suite with ref component
  and lastActiveUpdateItem pattern in react
*/
const SuggestCardContainer: React.FC<ISuggestCardContainerProps> = ({ 
  activeSuggestion,
  addSuggestion,
  addSuggestionBool,
  closeEditForm,
  data,
  displayColor,
  onChangeActive,
  onChangeData,
}) => {
  const randomColor = displayColor();
  const html = document.documentElement;
  html.style.backgroundColor = randomColor;
  const [formListRefs, setFormListRefs] = React.useState<any>({'e3p40592md': { id: 'e3p40592md'}});
  const [activeFormRefId, setActiveFormRefId] = React.useState<string>('e3p40592md');
  const [formVars, setFormVars] = React.useState<IFormLocationProps | any>({});
  const [formTextVal, setFormTextVal] = React.useState<any>('');
  const [formSuggestions, setFormSuggestions] = React.useState<any>('');
  const [lastActiveUpdateItem, setLastActiveUpdateItem] = React.useState<any>();

  const [hookRef, setRef] = useHookWithRefCallback();

  var suggestCardRefList = {
    'e3p40592md': { id: 'e3p40592md'},
  };
  
  const returnSuggestions = async () => {
    const getSuggestions = await api.fetchGetSuggestions();
    return getSuggestions;
  }

  const postSuggestion = async (formVars: any) => {
    const postSuggestionsResponse = await axios.post('/api/suggestions', {
      data: { ...formVars },
      config: {
        headers: {
          "Accept": "application/json",
          "content-type": "application/json",
          // @ts-ignore
        },
      }
    });
    return postSuggestionsResponse;
  }

  const onSubmitSuggestCardEdit = React.useCallback(async (suggestion: any) => {

    return new Promise(function(resolve, reject) {
      resolve(onChangeFormVars(suggestion));
    }).then(async () => {
      const postResult = await axios.post('/api/suggestions', {
        data: { ...formVars }
      });
      setLastActiveUpdateItem(formVars);
    }).then(() => {
      closeEditForm();
    })
  }, [axios, formVars, closeEditForm]);

  //this should send a post request after the hook is updated
  React.useEffect(() => {
    if (Object.keys(formVars).length > 0 && formVars.constructor === Object) {
      postSuggestion(formVars).then((returnedSuggestions) => {});
    }
  }, [activeFormRefId, formListRefs, formTextVal, formSuggestions, formVars]);

  //HTTP get all saved suggestions when lastActiveUpdateItem changes 
  //and on first load
  React.useEffect(() => {
      returnSuggestions().then((returnedSuggestions) => {
        // @ts-ignore
        onChangeData(returnedSuggestions);
      });
  }, [lastActiveUpdateItem]);
  
  const genRandom = (e) => {
    e.preventDefault();
    const randomElement = data[Math.floor(Math.random() * data.length)];
    console.log('suggestcardcontainer/genRandom ', data);

    onChangeActive(randomElement);
  }

  const onChangeFormVars = (val: any) => {
    //remove prop from object
    delete val.matched_substrings
    delete val.structured_formatting.main_text_matched_substrings

    setFormVars(val);
  }

  function onChangeFormInput(val: string) {
    setFormTextVal(val);
  }

  function onChangeActiveCardRefId(id: any) {
    setActiveFormRefId(id);
  }

  function onChangeFormRef(node: any, id: any) {
    var newRefList = formListRefs;    
    newRefList[id] = node;
    setFormListRefs(newRefList);
  }

  return <><SuggestCard 
            activeFormRefId={activeFormRefId}
            addSuggestion={addSuggestion}
            data={data}
            formSuggestions={formSuggestions}
            genRandom={genRandom}
            handleFormRef={onChangeFormRef}
          />
          <SuggestCardEdit
            activeFormRefId={activeFormRefId}
            addSuggestionBool={addSuggestionBool}
            formListRefs={formListRefs}
            initialValue={""}
            onCancelEdit={closeEditForm}
            position={{
              top: activeFormRefId  && formListRefs[activeFormRefId] && formListRefs[activeFormRefId].getBoundingClientRect ? formListRefs[activeFormRefId].getBoundingClientRect().top : null,
              left: activeFormRefId && formListRefs[activeFormRefId] && formListRefs[activeFormRefId].getBoundingClientRect ? formListRefs[activeFormRefId].getBoundingClientRect().left : null
            }}
            onSubmitForm={onSubmitSuggestCardEdit}
            hookRef={hookRef}
            formTextVal={formTextVal}
            onChangeFormInput={onChangeFormInput}
          />
          <SuggestCardDisplay
              activeSuggestion={activeSuggestion}
              hookRef={hookRef}
              position={{
                top: activeFormRefId  && formListRefs[activeFormRefId] && formListRefs[activeFormRefId].getBoundingClientRect ? formListRefs[activeFormRefId].getBoundingClientRect().top : null,
                left: activeFormRefId && formListRefs[activeFormRefId] && formListRefs[activeFormRefId].getBoundingClientRect ? formListRefs[activeFormRefId].getBoundingClientRect().left : null
              }}
          /></>;
};
 
export default SuggestCardContainer;
   
 
