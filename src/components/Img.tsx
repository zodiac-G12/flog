import type { Component } from "solid-js";

export const Img: Component<{
  src: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  objectFit?: "none" | "contain";
}> = ({ src, width, height, borderRadius, objectFit }) => {
  return (
    <picture>
      <source
        type={"image/webp"}
        src={`/src/assets/${src.replace(/jpg|jpeg|png/, "webp")}`}
      />
      <img
        width={width}
        height={height}
        src={`/src/assets/${src}`}
        style={{ "object-fit": objectFit, "border-radius": borderRadius }}
      />
    </picture>
  );
};
