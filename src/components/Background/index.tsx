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
import {
  TbLock,
  TbLockOpen,
  TbMaximize,
  TbMinimize,
  TbRotateClockwise,
} from "solid-icons/tb";
import { LofiGirl } from "~/components/Backgrounds/LofiGirl";
import { usePanelContext } from "~/providers";

export const Background: Component = () => {
  const { isLocked, toggleLock } = usePanelContext();
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
        <MenuPositioner
          style={{
            "z-index": 2147483647,
          }}
        >
          <MenuContent
            class="absolute h-48 w-48 rounded-full bg-stone-900 animate-in fade-in"
            style={{
              top: `-${192 / 2}px`,
              left: `-${192 / 2}px`,
            }}
          >
            <div class="absolute left-10 top-10">
              <MenuItem id="fullscreen" onClick={toggleFullScreen}>
                <Show when={isFullscreen()} fallback={<TbMaximize />}>
                  <TbMinimize />
                </Show>
              </MenuItem>
              <MenuItem
                id="reset"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                <TbRotateClockwise />
              </MenuItem>
              <MenuItem id="lock" onClick={toggleLock}>
                <Show when={isLocked()} fallback={<TbLock />}>
                  <TbLockOpen />
                </Show>
              </MenuItem>
            </div>
          </MenuContent>
        </MenuPositioner>
      </Portal>
    </Menu>
  );
};
