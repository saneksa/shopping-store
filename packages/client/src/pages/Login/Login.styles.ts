import { ObjectInterpolation } from "@emotion/core";

export const wrapperLoginStyles: ObjectInterpolation<any> = {
  minWidth: "400px",
  minHeight: "200px",
  maxHeight: "600px",
  overflowY: "auto",
  backgroundColor: "rgba(184, 181, 171, 0.2)",
  borderRadius: "30px",
  textAlign: "center",
  lineHeight: 1,
  backdropFilter: "blur(10px)",
  padding: "20px 40px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: "0px 0px 19px 3px beige"
};

export const buttonsWrapperStyle: ObjectInterpolation<any> = {
  display: "flex",
  justifyContent: "space-around"
};
