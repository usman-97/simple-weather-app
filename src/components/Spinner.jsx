import React from "react";
import { ClipLoader } from "react-spinners";
import PropTypes from "prop-types";

const Spinner = ({
  colour = "#f5f9e9",
  loading = true,
  override = {},
  size = 150,
}) => {
  return (
    <ClipLoader
      color={colour}
      loading={loading}
      cssOverride={override}
      size={size}
    />
  );
};

Spinner.propTypes = {
  color: PropTypes.string,
  loading: PropTypes.bool,
  cssOverride: PropTypes.object,
  size: PropTypes.number,
};

export default Spinner;
