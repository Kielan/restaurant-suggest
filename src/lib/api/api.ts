import axios from 'axios';

export const fetchGetSuggestions = async () => {
        return fetch(`/api/suggestions`, {
            method: `GET`,
            headers: {
              "Content-Type": `application/json`,
            }, 
        })
        .then(response => {
                console.log('response ', response);
                return response.json();
            }) // parse JSON from request
            .then(resultData => {
            console.log('resultData ', resultData)
            return resultData.suggestions;
            }) // set data for the number of stars
}
export const getSuggestions = async () => {
    try {
        const suggestions = await axios.get("/api/suggestions", {
            headers: {
            "Access-Control-Allow-Origin": "application/json",
            "Accept": "application/json",
            "Content-Type": "application/json",
        }})
        .then((pretenderResponse) => {
            return pretenderResponse &&
                pretenderResponse.request &&
                pretenderResponse.request.response ? JSON.parse(pretenderResponse.request.response) : undefined;
        })
        .then(res => res.suggestions);
        return suggestions;
    } catch(e) {
        console.log('api get err: ', e);
        return e.response;
    }
}