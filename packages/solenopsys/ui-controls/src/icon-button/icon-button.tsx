import { Component, JSX, onCleanup } from 'solid-js';

interface IconButtonProps {
  icon?: string;
}

export const IconButton: Component<IconButtonProps> = (props) => {
  return (
    <img
      src={`${props.icon || ''}`}
      style={{ height: '16px', cursor: 'pointer', margin: '5px', filter: 'var(--invertIcons)' }}
    />
  );
};

 