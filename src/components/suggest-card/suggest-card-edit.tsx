import * as React from 'react';
import styled from 'styled-components';
import Autocomplete from 'react-google-autocomplete';
import SuggestCard from './suggest-card';
import { Form } from '../form';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
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
    hookRef: any;
    initialValue: any;
    position: any;
    onCancelEdit: () => void;
    onSubmitForm: () => void;
    formTextVal: string;
    onChangeFormInput: (val: string) => void;
    onChangeFormVars: (val: any) => void;
}

const SuggestCardEdit: React.FC<ISuggestCardEditProps> = ({
    formTextVal,
    hookRef,
    initialValue,
    onCancelEdit,
    onChangeFormVars,
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
        debounce: 300
    });

    var suggestCardEditRefList = {
        'ampda92lf': { id: 'ampda92lf'},
    };

    // async function onSubmit(e) {
    //     e.preventDefault();
    //     onSubmitForm();
    // }
    
    function onChangePlacesAutoComplete(val: string) {
        setValue(val);
    }

    console.log('kdl cardedit ', process.env.GOOGLE_MAPS_API);

    const renderSuggestions = () => data.map(suggestion => {
        const {
          id,
          structured_formatting: { main_text, secondary_text }
        } = suggestion;

        async function onSelectFromSuggested(e: React.SyntheticEvent) {
            console.log('onSelectFromSuggested ', e);
            e.preventDefault();
            return new Promise(function(resolve, reject) { 
                resolve(onChangeFormVars(suggestion))})
                .then(() => onSubmitForm())
                .then(() => {
                    console.log('onsubmitformcalled');
                    //return getSuggestions()
                });
        }

        console.log('kdl sggestcard edit FOCUSPAYATTENTIONKID', suggestion)
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
        <EditorContainerDiv>
            <EditorDiv ref={hookRef} position={position}>
                <EditorCard>
                    {/* <Form
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
                    </Form> */}
                </EditorCard>
            </EditorDiv>
        </EditorContainerDiv>
    )
}

export default SuggestCardEdit;