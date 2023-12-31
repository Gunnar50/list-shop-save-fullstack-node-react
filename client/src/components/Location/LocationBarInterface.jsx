import { shortenString } from "../../utils/locationUtils";

const LocationBarInterface = ({ location, editingLocation, toggleEdit }) => {
  return (
    <div className="location-view">
      {location && location.place && (
        <>
          <p>
            <span className="location-view-caption">Location: </span>
            <span className="location-view-short-place">{shortenString(location.place, 18)}</span>
            <span className="location-view-long-place">{shortenString(location.place, 40)}</span>
          </p>
          <button
            className={editingLocation ? "button-color-2" : "button-color-3"}
            onClick={toggleEdit}
          >
            {editingLocation ? "Cancel" : "Change"}
          </button>
        </>
      )}
      {location && !location.place && (
        <button
          className={editingLocation ? "button-color-2" : "button-color-3"}
          onClick={toggleEdit}
        >
          {editingLocation ? "Cancel" : "Set Location"}
        </button>
      )}
    </div>
  );
};

export default LocationBarInterface;
