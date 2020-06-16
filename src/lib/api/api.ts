import axios from 'axios';

export const getSuggestions = async () => {
    try {
        const suggestions = await axios.get("/api/suggestions", {
            headers: {
            "Accept": "application/json",
            "content-type": "application/json"
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