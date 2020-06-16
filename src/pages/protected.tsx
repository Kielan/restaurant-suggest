import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { SuggestCard } from '../components/suggest-card';
import axios from 'axios';

const Protected = () => {
  const [retrievedSuggestions, setRetrievedSuggestions] = React.useState([])
  const [activeSuggestion, setActiveSuggestion] = React.useState({})
  const [addSuggestionBool, setAddSuggestionBool] = React.useState(false)

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

  return (
    <Layout>
      <SEO title="Page two" />
      <Link to="/">Go back to the homepage</Link>
      <SuggestCard
        addSuggestionBool={addSuggestionBool}
        data={retrievedSuggestions}
        activeSuggestion={activeSuggestion}
        addSuggestion={addSuggestion}
        closeEditForm={closeEditForm}
        displayColor={() => "black"}
        onChangeData={onChangeData}
        setActiveSuggestion={setActiveSuggestion}
      />
    </Layout>
  )
}

export default Protected;
