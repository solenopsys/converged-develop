import { Component } from '@solenopsys/converged-renderer';
 
import {IconButton} from './icon-button'

export type ActionButton = {
    key: string;
    title: string;
    icon: string;
}


interface ButtonGroupProps {
  actions: ActionButton[];
  emmitAction: (action: string) => void;
}

export const ButtonGroup: Component<ButtonGroupProps> = (props) => {
  return (
    <>
      {props.actions.map((action) => (
        <IconButton
          key={action.key}
          icon={action.icon}
          title={action.title}
          onClick={() => props.emmitAction(action.key)}
        />
      ))}
    </>
  );
};

 