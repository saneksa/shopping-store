/** @jsx jsx */
import { jsx } from "@emotion/core";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { Spin as AntSpin } from "antd";
import { SpinProps } from "antd/lib/spin";
import { createPortal } from "react-dom";
import { spinnerWrapperStyle } from "./Spinner.style";

interface ISpinnerProps extends SpinProps {}

export const Spin = (props: ISpinnerProps) => {
  return createPortal(
    <div css={spinnerWrapperStyle}>
      <AntSpin size="large" />
    </div>,
    document.body,
  );
};

export const Spinner = Spin;
