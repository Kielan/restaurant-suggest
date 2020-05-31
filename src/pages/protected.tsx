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

  React.useEffect(() => {
    fetch("/api/suggestions")
      .then((res) => res.json())
      .then((json) => {
        setRetrievedSuggestions(json.suggestions)
      })
  }, [])

  const addSuggestion = () => {
    console.log('add suggestion triggered')
  }

  return (
    <Layout>
      <SEO title="Page two" />
      <SuggestCard
        data={retrievedSuggestions}
        activeSuggestion={activeSuggestion}
        addSuggestion={addSuggestion}
        displayColor={() => "red"}
        setActiveSuggestion={setActiveSuggestion}
      />
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default Protected
