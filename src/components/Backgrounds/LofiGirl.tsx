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
import lofiGirlVideo from "~/assets/lofi_girl.mp4";
import { TbArrowsMaximize, TbArrowsMinimize } from "solid-icons/tb";

export const LofiGirl: Component = () => {
  const [isFullscreen, setIsFullscreen] = createSignal(false);

  const toggleFullScreen = async () => {
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
        <video
          autoplay
          muted
          loop
          class="h-full w-full object-cover"
          onContextMenu={(e) => e.preventDefault()}
        >
          <source src={lofiGirlVideo} type="video/mp4" />
        </video>
      </MenuContextTrigger>
      <Portal>
        <MenuPositioner>
          <MenuContent class="rounded-2xl bg-stone-900">
            <MenuItem
              id="fullscreen"
              onClick={toggleFullScreen}
              class="flex flex-row items-center gap-1"
            >
              <Show when={isFullscreen()} fallback={<TbArrowsMaximize />}>
                <TbArrowsMinimize />
              </Show>
              Fullscreen
            </MenuItem>
          </MenuContent>
        </MenuPositioner>
      </Portal>
    </Menu>
  );
};
