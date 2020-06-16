import * as React from 'react';
//import { shallow } from 'enzyme';
import axios from 'axios';
import MirageMockServer from './mirage-mock-server';
import { Response } from 'miragejs';
import * as api from './lib/api/api';

//in test MirageMockServer is provided via beforeAll
//in app in seo.js <Helmet /> component
var testExpect = {
  suggestionResponse: [
    {
      link: 'http://ivah.info',
      address: '182 Hettinger Square Apt. 697',
      name: 'Hamill - Blanda',
      id: '0',
      description: 'Suggestion 0'
    }
  ],
  suggestionResponseLengthTwo: [
    {
      link: 'http://ivah.info',
      address: '182 Hettinger Square Apt. 697',
      name: 'Hamill - Blanda',
      id: '0',
      description: 'Suggestion 0'
    },
    {
      link: 'http://ivah.info',
      address: '182 Hettinger Square Apt. 697',
      name: 'Hamill - Blanda',
      id: '0',
      description: 'Suggestion 0' 
    }
  ]
}

describe('< Protected />', () => {
  var server;

  beforeEach(() => {
    server = MirageMockServer();
  });

  afterEach(() => {
    server.shutdown();
  });

  it("shows an error if the server is down", function () {
    // Override the existing /suggestions route handler, just for this test
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    server.get("/suggestions", () => new Response(500));
  });

  it("returns a list of documents", async function() {
    let suggestions = await api.getSuggestions();

    const firstSuggestion = suggestions[0];
    // @ts-ignore
    //expect(typeof suggestions.address).toBe('string');
    expect(suggestions.length).toBe(1);
    expect(typeof firstSuggestion.description).toBe('string');
    expect(typeof firstSuggestion.link).toBe('string');
    expect(typeof firstSuggestion.name).toBe('string');
  });

  it('should post a document to the list and return an updated list', async () => {
  let emptyData = {};
  
  let createSuggestionResponse = await axios.post("/api/suggestions", emptyData, {
    headers: {
      "Accept": "application/json",
      "content-type": "application/json",
      // @ts-ignore
    },
  })
  .then((pretenderResponse) => pretenderResponse.request.response)
  // @ts-ignore
  let suggestions = await axios.get("/api/suggestions", {headers: {
    "Accept": "application/json",
    "content-type": "application/json"
  }})
  .then((pretenderResponse) => {
    return pretenderResponse &&
            pretenderResponse.request &&
            pretenderResponse.request.response ? JSON.parse(pretenderResponse.request.response) : undefined;
  })
  .then(res => res.suggestions);

  expect(suggestions.length).toBe(2);
  });
});