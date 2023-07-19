import type {Component} from 'solid-js';

export const Img: Component<{
  src: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  objectFit?: 'none' | 'contain';
}> = (props) => {
  return (
    <picture>
      <source
        type={'image/webp'}
        src={`/src/assets/${props.src.replace(/jpg|jpeg|png/, 'webp')}`}
      />
      <img
        width={props.width}
        height={props.height}
        src={`/src/assets/${props.src}`}
        style={{
          'object-fit': props.objectFit,
          'border-radius': props.borderRadius,
        }}
      />
    </picture>
  );
};
