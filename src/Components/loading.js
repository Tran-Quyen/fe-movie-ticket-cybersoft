import React from "react";

export default function Loading() {
  return (
    <svg
      className="spinner"
      width="150px"
      height="150px"
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="path"
        fill="none"
        strokeWidth={6}
        strokeLinecap="round"
        cx={33}
        cy={33}
        r={30}
      />
    </svg>
  );
}
