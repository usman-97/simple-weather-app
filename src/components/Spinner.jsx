import React from "react";
import { ClipLoader } from "react-spinners";
import PropTypes from "prop-types";

const FadeSpinner = ({
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

FadeSpinner.propTypes = {
  color: PropTypes.string,
  loading: PropTypes.bool,
  cssOverride: PropTypes.object,
  size: PropTypes.number,
};

export default FadeSpinner;
