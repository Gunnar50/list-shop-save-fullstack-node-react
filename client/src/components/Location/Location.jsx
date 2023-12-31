import { useDispatch, useSelector } from "react-redux";
import { selectLocation, setError, setSearchResults } from "../../redux/locationSlice";
import { useEffect, useRef, useState } from "react";
import LocationEditForm from "./LocationEditForm";
import "./location.scss";
import LocationBarInterface from "./LocationBarInterface";
import { locationHasChanged, syncLocation } from "../../controllers/locationController";
import { store } from "../../redux/store";

const Location = () => {
  const [editingLocation, setEditingLocation] = useState(false);
  const location = useSelector(selectLocation);
  const locationBarRef = useRef();
  const dispatch = useDispatch();

  // check for store changes and fire API sync
  useEffect(() => {
    syncLocation();
    const unsubscribe = store.subscribe(locationHasChanged);
    return () => {
      unsubscribe();
    };
  }, []);

  // Close location edit box if user clicks outside
  useEffect(() => {
    const onDocumentClick = (e) => {
      if (locationBarRef && !locationBarRef.current.contains(e.target)) {
        setEditingLocation(false);
      }
    };
    document.addEventListener("click", onDocumentClick, true);
    return () => {
      document.removeEventListener("click", onDocumentClick, true);
    };
  }, []);

  // Close/open edit box is user clicks on the button (or if editing completes)
  const toggleEdit = () => {
    setEditingLocation(!editingLocation);
    dispatch(setError(""));
    dispatch(setSearchResults([]));
  };

  return (
    <div className="location-container">
      <div className="location-bar" ref={locationBarRef}>
        <LocationBarInterface
          location={location}
          editingLocation={editingLocation}
          toggleEdit={toggleEdit}
        />
        {editingLocation && <LocationEditForm onCancel={toggleEdit} />}
      </div>
    </div>
  );
};

export default Location;
