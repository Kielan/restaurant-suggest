import React from "react";//{ useState, useRef, useCallback, useEffect }
import _debounce from "lodash.debounce";

export const loadApiErr =
  "> 💡use-places-autocomplete: Google Maps Places API library must be loaded. See: https://github.com/wellyshen/use-places-autocomplete#load-the-library";

export const useLatest = (val) => {
  const ref = React.useRef(val);
  React.useEffect(() => {
    ref.current = val;
  }, [val]);

  return ref;
};

export const usePlacesAutocomplete = ({
    requestOptions,
    debounce = 200,
    googleMaps,
    callbackName,
} = {}) => {
    console.log('usePlacesAutocomplete callbackName ', googleMaps);

    const [ready, setReady] = React.useState(false);
    const [value, setVal] = React.useState("");
    const [suggestions, setSuggestions] = React.useState({
      loading: false,
      status: "",
      data: [],
    });
    const asRef = React.useRef(null);
    const requestOptionsRef = useLatest(requestOptions);
    const googleMapsRef = useLatest(googleMaps);
  
    const init = React.useCallback(() => {
      const { google } = window.window;
      const { current: gMaps } = googleMapsRef;
      const placesLib = gMaps.places || google.maps.places;
  
      if (!placesLib) {
        console.error(loadApiErr);
        return;
      }
  
      asRef.current = new placesLib.AutocompleteService();
      console.log('use-places-autocomplete x1 ', asRef.current)
      setReady(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const clearSuggestions = React.useCallback(() => {
      setSuggestions({ loading: false, status: "", data: [] });
    }, []);
  
    const fetchPredictions = React.useCallback(
      _debounce((val) => {//str
        if (!val) {
          clearSuggestions();
          return;
        }
  
        // To keep the previous suggestions
        setSuggestions((prevState) => ({ ...prevState, loading: true }));
  
        console.log('use-places-autocomplete x2 ', asRef.current)
        asRef.current.getPlacePredictions(
          { ...requestOptionsRef.current, input: val },
          (data, status) => {
            setSuggestions({ loading: false, status, data: data || [] });
          }
        );
      }, debounce),
      [debounce, clearSuggestions]
    );
  
    const setValue = React.useCallback(
      (val, shouldFetchData = true) => {
        setVal(val);
        if (shouldFetchData) fetchPredictions(val);
      },
      [fetchPredictions]
    );
  
    React.useEffect(() => {
        if (window) {// && window.google google not defined
            if (!googleMapsRef.current && !window.google.maps && callbackName) {
                (window.window)[callbackName] = init;
            } else {
                init();
            }
        
            return () => {
                if ((window)[callbackName]) delete (window)[callbackName];
            };
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callbackName, init]);
  
    return { ready, value, suggestions, setValue, clearSuggestions };
  };
  
  export default usePlacesAutocomplete;