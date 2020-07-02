import * as React from 'react';
import styled from 'styled-components';
import SuggestCard from './suggest-card';
import { Form } from '../form';
//import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { usePlacesAutocomplete } from '../use-places-autocomplete';

//import { ReactGooglePlacesSearch } from '../react-google-places-service';
//`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API}&libraries=places`
//``https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${textInput}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${process.env.GOOGLE_MAPS_API}`
//    const editorRef = React.createRef();
const EditorContainerDiv = styled.div`
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

const EditorDiv = styled.div`
  position: absolute;
  top: ${props => props.position.top + "px"};
  left: ${props => props.position.left + "px"};
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: ${props => `${props.theme.form.maxWidth}`};
`;

const SuggestionLi = styled.li`
    background: ${props => `${props.theme.formSuggestion.background.main}`};
    padding: 2rem 1rem;
    cursor: pointer;
`

const EditorCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ul {
    margin-left: 0;
  }
`;

interface IMapComponentProps {
    onSubmit: () => void;
}

function handleCardRef(node: any, id: string, cardRefs: Array<string>) {
    if (node) {
        cardRefs[id] = node;
    }
}
interface ISuggestCardEditProps {
    activeFormRefId?: any;
    addSuggestionBool: boolean;
    formListRefs?: any;
    hookRef: any;
    initialValue: any;
    position: any;
    onCancelEdit: () => void;
    onSubmitForm: (suggestion: any) => void;
    formTextVal: string;
    onChangeFormInput: (val: string) => void;
    onChangeFormVars?: (val: any) => void;
}

const SuggestCardEdit: React.FC<ISuggestCardEditProps> = ({
    activeFormRefId,
    addSuggestionBool,
    formTextVal,
    hookRef,
    initialValue,
    onCancelEdit,
    onSubmitForm,
    position,
}) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete({
        requestOptions: { /* Define search scope here */ },
        debounce: 300,
        googleMaps: hookRef,
    });

    var suggestCardEditRefList = {
        'ampda92lf': { id: 'ampda92lf'},
    };
    
    function onChangePlacesAutoComplete(val: string) {
        console.log('kdl cardedit setval ');
        setValue(val);
    }

    const renderSuggestions = () => data.map(suggestion => {
        const {
          id,
          structured_formatting: { main_text, secondary_text }
        } = suggestion;

        async function onSelectFromSuggested(e: React.SyntheticEvent) {
            e.preventDefault();
            
            return new Promise(function(resolve, reject) { 
                resolve(onSubmitForm(suggestion))
            })
        }

        return (
          <SuggestionLi
            key={id}
            onClick={e => onSelectFromSuggested(e)}
          >
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </SuggestionLi>
        );
    });

    return (
        <>{addSuggestionBool === true &&/* formListRefs[activeFormRefId] && */(
            <EditorContainerDiv>
                <EditorDiv ref={hookRef} position={position}>
                    <EditorCard>
                        <Form
                            type='button'
                            buttonText="Save"
                            initialValue={initialValue}
                            onClickSubmit={() => onSubmitForm()}
                            placeholder={``}
                            onClickCancel={onCancelEdit}
                            value={value}
                            setValue={onChangePlacesAutoComplete}
                        >
                            {status === 'OK' && <ul>{renderSuggestions()}</ul>}
                        </Form>
                    </EditorCard>
                </EditorDiv>
            </EditorContainerDiv>
        )}</>
    )
}

export default SuggestCardEdit;