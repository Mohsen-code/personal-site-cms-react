import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const FontAwesomeIcons = ({ icon, fontSize, onClick }) => {
  return <FontAwesomeIcon icon={icon} size={fontSize} color="inherit" onClick={onClick}/>;
};

export default FontAwesomeIcons;
