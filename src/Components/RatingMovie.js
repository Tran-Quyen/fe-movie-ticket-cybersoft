import React from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
export default function SimpleRating(props) {
  return (
    <>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating name="read-only" value={props.danhGia} readOnly />
      </Box>
    </>
  );
}
