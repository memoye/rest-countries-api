import { useParams } from "react-router-dom";

function CountryDetails() {
  const { id } = useParams();

  return <div>Country {id}</div>;
}
export default CountryDetails;
