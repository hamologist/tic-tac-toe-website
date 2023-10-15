import { LineStates } from "./types";

export type LineProps = {
  state: LineStates;
};

export default function Line({ state }: LineProps) {
  let component = null;

  if (state === 'horizontal') {
    component = (
      <svg viewBox="0 0 100 5" xmlns="http://www.w3.org/2000/svg" style={{
        position: "absolute",
        width: "34%",
      }}>
        <rect width="100" height="5"></rect>
      </svg>
    );
  } else if (state === 'vertical') {
    component = (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{
        position: "absolute",
        width: "34%",
      }}>
        <rect x="0" y="-52" transform="rotate(90)" width="100" height="5"></rect>
      </svg>
    );
  } else if (state === '45-diagonal') {
    component = (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{
        position: "absolute",
        width: "34%",
      }}>
        <rect x="0" y="-3" transform="rotate(45)" width="200" height="5"></rect>
      </svg>
    );
  } else if (state === '135-diagonal') {
    component = (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{
        position: "absolute",
        width: "34%",
      }}>
        <rect x="-73" y="-73" transform="rotate(135)" width="200" height="5"></rect>
      </svg>
    );
  }

  return component;
}

