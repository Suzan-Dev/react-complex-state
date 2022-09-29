import { styled } from "@stitches/react";

const Input = styled("input", {
  all: "unset",
  maxWidth: 175,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "2px 10px",
  height: 35,
  fontSize: 16,
  lineHeight: 1,
  color: "#333",
  boxShadow: `0 0 0 1px #555`,
  "&:focus": { boxShadow: `0 0 0 2px #555` },
});

export default Input;
