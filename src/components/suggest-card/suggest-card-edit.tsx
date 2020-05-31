import * as React from 'react';
import styled from 'styled-components';
import SuggestCard from './suggest-card';
import { Form } from '../form';

const EditorContainerDiv = styled.div`
  background: rgba(0,0,0,.6);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100999;
`;

const EditorDiv = styled.div`
  position: absolute;
  top: ${props => props.position.top + "px"};
  left: ${props => props.position.left + "px"};
  display: flex;
  flex-direction: row;
`;

const EditorCard = styled.div`
  display: flex;
  flex-direction: column;

  ul {
    margin-left: 0;
  }
`;

function handleCardRef(node: any, id: string, cardRefs: Array<string>) {
    if (node) {
        cardRefs[id] = node;
    }
}
interface ISuggestCardEditProps {
    activeFormRefId: string;
    initialValue: any;
    position: any;
    onSaveForm: () => void;
}

const SuggestCardEdit: React.FC<ISuggestCardEditProps> = ({
    activeFormRefId,
    initialValue,
    onSaveForm,
    position,
}) => {
    var suggestCardEditRefList = {
        'mvpqdf98nt': { id: 'mvpqdf98nt'},
    };
    return (
        <EditorContainerDiv>
            <EditorDiv ref={(node) => handleCardRef(node, activeFormRefId, suggestCardEditRefList)} position={position}>
                <EditorCard>
                    <Form 
                        type='button'
                        buttonText="Save"
                        initialValue={initialValue}
                        onClickSubmit={onSaveForm}
                        placeholder={``}
                        onClickCancel={() => {}}
                    >
                    </Form>
                </EditorCard>
            </EditorDiv>
        </EditorContainerDiv>
    )
}

export default SuggestCardEdit;