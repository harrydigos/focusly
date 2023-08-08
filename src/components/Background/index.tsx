import {
  Menu,
  MenuArrow,
  MenuArrowTip,
  MenuContent,
  MenuContextTrigger,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuOptionItem,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerItem,
} from "@ark-ui/solid";
import { Portal } from "solid-js/web";
import { Component, Show, createSignal } from "solid-js";
import { TbMaximize, TbMinimize } from "solid-icons/tb";
import { LofiGirl } from "~/components/Backgrounds/LofiGirl";

export const Background: Component = () => {
  const [isFullscreen, setIsFullscreen] = createSignal(false);

  const toggleFullScreen = async () => {
    if (!document.fullscreenEnabled) {
      return;
    }

    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await window.document.exitFullscreen();
    }
    setIsFullscreen(!!document.fullscreenElement);
  };

  return (
    <Menu>
      <MenuContextTrigger class="absolute inset-0 h-full w-full cursor-default">
        <LofiGirl />
      </MenuContextTrigger>
      <Portal>
        <MenuPositioner>
          <MenuContent
            class="absolute h-48 w-48 rounded-full bg-stone-900 animate-in fade-in"
            style={{
              top: `-${192 / 2}px`,
              left: `-${192 / 2}px`,
            }}
          >
            <MenuItem
              id="fullscreen"
              onClick={toggleFullScreen}
              class="flex flex-row items-center gap-1"
            >
              <Show when={isFullscreen()} fallback={<TbMaximize />}>
                <TbMinimize />
              </Show>
              Fullscreen
            </MenuItem>
          </MenuContent>
        </MenuPositioner>
      </Portal>
    </Menu>
  );
};
