import React from "react";
const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};
const starContainerStyle = {
  display: "flex",
  gap: "7px",
  marginTop: "20px",
};
const textStyle = {
  lineHeigh: "1",
  margin: "0",
  marginTop: "20px",
};
export default function StartRating({ maxRating = 2 }) {
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <span>S{i + 1}</span>
        ))}
      </div>
      <p style={textStyle}>10</p>
    </div>
  );
}
