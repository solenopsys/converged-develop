
import { lazy, signal } from '@solenopsys/converged';

export function lazyLoadComponentFromModule(component, liburl) {
  const [Comp, setComp] = signal<JSX.Element>(null);

  return (props: any) => {
    (async () => {
      try {
        const mod = await import(liburl);
        setComp(() => mod[component]);
      } catch (error) {
        console.error('Error loading module:', error);
      }
    })();

    return Comp && <Comp {...props} />;
  };
}