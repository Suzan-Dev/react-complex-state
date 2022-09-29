import { styled } from "@stitches/react";

const Button = styled("button", {
  fontSize: "16px",
  minWidth: "100px",
  height: "40px",
  padding: "5px 10px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "all 0.3s ease",
  position: "relative",
  display: "inline-block",
  outline: "none",
  borderRadius: "5px",
  zIndex: 0,
  background: "#fff",
  overflow: "hidden",
  border: "2px solid #57cc99",
  color: "#57cc99",

  "&:hover": {
    color: "#fff",
  },
  "&:hover:after": {
    width: "100%",
  },
  "&:after": {
    content: "",
    position: "absolute",
    zIndex: -1,
    transition: "all 0.3s ease",
    left: 0,
    top: 0,
    width: 0,
    height: "100%",
    background: "#57cc99",
  },
});

export default Button;
