import PropTypes from "prop-types";

function Empty({ sourceName }) {
  return <p>No {sourceName} could be found.</p>;
}

export default Empty;

Empty.propTypes = {
  sourceName: PropTypes.node,
};
