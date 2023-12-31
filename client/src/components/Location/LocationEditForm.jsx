import { useEffect, useRef, useState } from "react";
import LocationEditResultsList from "./LocationEditResultsList";
import { useDispatch, useSelector } from "react-redux";
import { selectLocation, selectSearchResults, setError, setLocation, setSearchResults } from "../../redux/locationSlice";
import LocationGPSButton from "./LocationGPSButton";
import { getPostcodesFromQuery } from "../../controllers/locationController";
import LocationEditFormError from "./LocationEditFormError";

const LocationEditForm = ({ onCancel }) => {
  const [locationInput, setLocationInput] = useState("");
  const [resultSelected, setresultSelected] = useState(0);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const searchResults = useSelector(selectSearchResults);
  const location = useSelector(selectLocation);
  const prevPref = useRef();

  useEffect(() => {
    inputRef && inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (prevPref.location && prevPref.location !== location) {
      onCancel();
    }
    prevPref.location = location;
  }, [location]);

  useEffect(() => {
    if (searchResults && resultSelected) setLocationInput(searchResults[resultSelected].postcode);
  }, [resultSelected]);

  const onLocationChange = (value) => {
    setLocationInput(value);
    setresultSelected(0);
    getPostcodesFromQuery(value);
  };

  const onKeyDown = ({ key }) => {
    if (searchResults.length === 0) return;
    const searchResultsMax = searchResults ? searchResults.length - 1 : -1;
    if (key === "ArrowDown") setresultSelected(resultSelected < searchResultsMax ? resultSelected + 1 : searchResultsMax);
    if (key === "ArrowUp") setresultSelected(resultSelected > 0 ? resultSelected - 1 : 0);
    if (key === "Escape") onCancel();
    if (key === "Enter") onChooseResult(resultSelected);
  };

  const onHover = (i) => {
    setresultSelected(i);
  };

  const onChooseResult = (i) => {
    const { latitude: lat, longitude: lon, admin_ward: place } = searchResults[i] || {};
    dispatch(setLocation({ place, lat, lon }));
  };

  return (
    <>
      <div className="location-form">
        <input
          type="text"
          ref={inputRef}
          placeholder="Postcode"
          onKeyDown={onKeyDown}
          value={locationInput}
          onChange={(e) => onLocationChange(e.target.value)}
        ></input>
        <p>or</p>
        <LocationGPSButton />
      </div>
      <LocationEditFormError />

      {searchResults && searchResults.length > 0 && (
        <LocationEditResultsList results={searchResults} onClick={onChooseResult} onHover={onHover} resultSelected={resultSelected} />
      )}
    </>
  );
};

export default LocationEditForm;
