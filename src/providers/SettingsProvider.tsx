import { Component, JSX, createContext, useContext } from "solid-js";
import { makePersisted } from "@solid-primitives/storage";
import { createStore } from "solid-js/store";
import { Alarm, BgColor } from "~/config";

export interface SettingsContextProps {
  alarmSound: Alarm;
  // eslint-disable-next-line no-unused-vars
  updateAlarmSound: (value: Alarm) => void;
  bgColor: BgColor;
  // eslint-disable-next-line no-unused-vars
  updateBgColor: (value: BgColor) => void;
}

export const SettingsContext = createContext<SettingsContextProps>();

export const SettingsProvider: Component<{
  children: JSX.Element;
}> = (props) => {
  const [alarmSound, setAlarmSound] = makePersisted(
    // eslint-disable-next-line solid/reactivity
    createStore<Alarm>(
      {
        value: "bells",
        url: "bells.wav",
      },
      {
        name: "alarm-sound",
      }
    )
  );

  const updateSound = (value: Alarm) => {
    setAlarmSound(value);
  };

  const [bgColor, setBgColor] = makePersisted(
    // eslint-disable-next-line solid/reactivity
    createStore<BgColor>(
      {
        value: "stone",
        class: "bg-stone-950",
      },
      {
        name: "bg-color",
      }
    )
  );

  const updateBgColor = (value: BgColor) => {
    setBgColor(value);
    if (document.documentElement) {
      document.documentElement.style.setProperty("--bg-color", value.class);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        alarmSound,
        updateAlarmSound: updateSound,
        bgColor,
        updateBgColor: updateBgColor,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsProvider"
    );
  }
  return context;
};
