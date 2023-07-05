import { Accessor } from "solid-js";
import { Component, JSXElement, createContext, createSignal } from "solid-js";

interface ZOrderContextProps {
  zOrder: Accessor<number>;
  incrementZ: () => void;
}

export const ZOrderContext = createContext<ZOrderContextProps>({
  zOrder: () => 0,
  incrementZ: () => null,
});

export const ZOrderProvider: Component<{ children: JSXElement }> = (props) => {
  const [zOrder, setZOrder] = createSignal(0);

  const incrementZ = () => {
    setZOrder((prev) => ++prev);
  };

  return (
    <ZOrderContext.Provider value={{ zOrder, incrementZ }}>
      {props.children}
    </ZOrderContext.Provider>
  );
};
