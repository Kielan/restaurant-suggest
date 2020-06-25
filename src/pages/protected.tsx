import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { SuggestCard } from '../components/suggest-card';
import { StateProvider } from '@react-simply/state';
import axios from 'axios';
import MirageMockServer from '../mirage-mock-server';

const Protected = () => {
  const [retrievedSuggestions, setRetrievedSuggestions] = React.useState([])
  const [activeSuggestion, setActiveSuggestion] = React.useState({})
  const [addSuggestionBool, setAddSuggestionBool] = React.useState(false)
  const serverAPI = MirageMockServer();

  const addSuggestion = () => {
    console.log('add suggestion triggered')
    setAddSuggestionBool(true);
  }

  const closeEditForm = () => {
    setAddSuggestionBool(false);
  }

  const onChangeData = (data: any[]) => {
    setRetrievedSuggestions(data);
  }

  const onChangeActiveSuggestion = (data: any) => {
    console.log('proteced/onChangeActiveSuggestion ', data);
    setActiveSuggestion(data);
  }

  const reducer = (state, action) => {
    switch(action.type) {
      case 'set':
        return {
          ...state,
          suggestions: action.suggestions
        };
        default:
          return state;
    }
  };
//<StateProvider initialState={serverAPI} reducer={reducer}>
  return (
        <Layout>
          <SEO title="Page two" />
          <Link to="/">Go back to the homepage</Link>
          <SuggestCard
            activeSuggestion={activeSuggestion}
            addSuggestion={addSuggestion}
            addSuggestionBool={addSuggestionBool}
            closeEditForm={closeEditForm}
            data={retrievedSuggestions}
            displayColor={() => "black"}
            onChangeData={onChangeData}
            onChangeActive={onChangeActiveSuggestion}
          />
        </Layout>
  )
}

export default Protected;
