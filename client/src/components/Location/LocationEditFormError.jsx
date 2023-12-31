import { useSelector } from "react-redux";
import { selectError } from "../../redux/locationSlice";

const LocationEditFormError = () => {
  const error = useSelector(selectError);

  if (error) {
    return <div className="location-form-error">{error}</div>;
  }

  return <></>;
};

export default LocationEditFormError;
