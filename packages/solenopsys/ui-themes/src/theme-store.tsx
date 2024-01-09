// colorSchemesStore.tsx
import { createSignal, onCleanup } from "solid-js";

import { ColorSchemesStore, Theme } from "./interface";

export const createThemesStore = (themes: Theme[]): ColorSchemesStore => {
  const [schemes] = createSignal(themes); // todo move to props

  const [current, setCurrent] = createSignal(localStorage.getItem('colorScheme') || 'white');
  const [style, setStyle] = createSignal<any>(null);

  const refreshStyle = () => {
    const scheme = schemes()[current()];
    Object.keys(scheme).forEach(color => {
      style().setProperty('--' + color, scheme[color]);
    });
  };

  const initColors = (styleInstance: any) => {
    setStyle(styleInstance);
    refreshStyle();

    onCleanup(() => {
      // Cleanup tasks, if any
    });
  };

  return {
    schemes,
    current,
    style,
    initColors,
    refreshStyle,
  };
};

 
