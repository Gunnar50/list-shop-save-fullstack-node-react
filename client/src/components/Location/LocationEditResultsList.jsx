import { shortenString } from "../../utils/locationUtils";

const LocationEditResultsList = ({ results, onClick, onHover, resultSelected = 0 }) => {
  return (
    <div className="location-results">
      {results &&
        results.map((result, i) => (
          <p
            key={i}
            onMouseOver={() => onHover(i)}
            onClick={() => onClick(i)}
            className={resultSelected === i ? "location-result-item location-result-item-selected" : "location-result-item"}
          >
            <span className="bolder">{result.postcode}</span> - <span className="lighter">{shortenString(result.admin_ward, 25)}</span>
          </p>
        ))}
    </div>
  );
};

export default LocationEditResultsList;
