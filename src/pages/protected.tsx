import React from "react"
import { Link } from "gatsby"
import { Server, Model } from "miragejs"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { SuggestCard } from '../components/suggest-card'

const Protected = () => {

  const ServerInstance = new Server({
    models: {
      suggestion: Model
    },
  
    routes() {
      this.namespace = "api";
  
      this.get("/suggestions", schema => {
        return {
          suggestions: [
            { id: "1", name: "namea", address: "", link: "" },
            { id: "2", name: "nameb", address: "", link: "" },
          ]
        }
      });
  
      this.post('/suggestions', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.suggestions.create(attrs);
      });
    }
  })
  
  const [retrievedSuggestions, setRetrievedSuggestions] = React.useState([])
  const [activeSuggestion, setActiveSuggestion] = React.useState({})
  const [addSuggestionBool, setAddSuggestionBool] = React.useState(false)

  React.useEffect(() => {
    fetch("/api/suggestions")
      .then((res) => res.json())
      .then((json) => {
        setRetrievedSuggestions(json.suggestions)
      })
  }, [])

  const addSuggestion = (e) => {
    e.preventDefault();
    console.log('add suggestion triggered')
    setAddSuggestionBool(true);
  }

  const cancelEditForm = () => {
    setAddSuggestionBool(false)
  }

  const saveEditForm = () => {
    
  }
  return (
    <Layout>
      <SEO title="Page two" />
      <SuggestCard
        addSuggestionBool={addSuggestionBool}
        data={retrievedSuggestions}
        activeSuggestion={activeSuggestion}
        addSuggestion={addSuggestion}
        cancelEditForm={cancelEditForm}
        saveEditForm={saveEditForm}
        displayColor={() => "red"}
        setActiveSuggestion={setActiveSuggestion}
      />
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default Protected
