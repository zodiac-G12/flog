import type {Component} from 'solid-js';

export const Img: Component<{
  src: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  objectFit?: 'none' | 'contain';
}> = (props) => {
  const ImageWebp = () => {
    return new URL(
        `/src/assets/${props.src.replace(/jpg|jpeg|png/, 'webp')}`,
        import.meta.url
    ).href;
  };
  const Image = () => {
    return new URL(`/src/assets/${props.src}`, import.meta.url).href;
  };

  return (
    <picture>
      <source type={'image/webp'} src={ImageWebp()} />
      <img
        width={props.width}
        height={props.height}
        src={Image()}
        style={{
          'object-fit': props.objectFit,
          'border-radius': props.borderRadius,
        }}
      />
    </picture>
  );
};
