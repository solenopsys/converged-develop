
import { lazy } from "@solenopsys/converged-renderer";
import $ from "@solenopsys/converged-reactive";

export function lazyLoadComponentFromModule(component, liburl) {
  const Comp = $.signal(null);

  return (props: any) => {
    (async () => {
      try {
        const mod = await import(liburl);
        Comp.set(() => mod[component]);
      } catch (error) {
        console.error('Error loading module:', error);
      }
    })();

    return Comp && <Comp {...props} />;
  };
}