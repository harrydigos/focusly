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
import styles from "./chart.module.css";

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
            class="relative h-40 w-40 overflow-hidden rounded-full bg-stone-900"
            style={{
              top: `-${160 / 2}px`,
              left: `-${160 / 2}px`,
            }}
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* Closes the Menu when pressing the middle of the circle */}
            {/* <MenuTrigger class="h-full w-full cursor-default rounded-full" /> */}
            {/*
            <MenuItem
              id="fullscreen"
              class={styles.sector}
              // class="absolute inset-0 h-[100px] w-[80px] skew-y-[155deg] bg-red-500"
              onClick={toggleFullScreen}
            >
              <Show when={isFullscreen()} fallback={<TbMaximize />}>
                <TbMinimize />
              </Show>
            </MenuItem>
            <MenuItem
              id="reset"
              class={styles.sector}
              // class="absolute right-0 top-0 h-[100px] w-[80px] skew-y-[-145deg] bg-sky-500"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              <TbRotateClockwise />
            </MenuItem>
            <MenuItem
              id="lock"
              class={styles.sector}
              // class="absolute top-1/2 h-[100px] rotate-[-60deg] w-[80px] skew-y-[-145deg] left-1/2 -translate-x-1/2 bg-violet-500"
              onClick={toggleLock}
            >
              <Show when={isLocked()} fallback={<TbLock />}>
                <TbLockOpen />
              </Show>
            </MenuItem>

            <MenuItem id="lock" class={styles.sector}>
              <Show when={isLocked()} fallback={<TbLock />}>
                <TbLockOpen />
              </Show>
            </MenuItem>
            <MenuItem id="lock" class={styles.sector}>
              <Show when={isLocked()} fallback={<TbLock />}>
                <TbLockOpen />
              </Show>
            </MenuItem>
            */}

            <div
              class={styles.sector}
              style={{ transform: "rotate(55deg) skew(18deg)" }}
            />
            <div
              class={styles.sector}
              style={{ transform: "rotate(127deg) skew(18deg)" }}
            />
            <div
              class={styles.sector}
              style={{ transform: "rotate(199deg) skew(18deg)" }}
            />
            <div
              class={styles.sector}
              style={{ transform: "rotate(271deg) skew(18deg)" }}
            />
            <div
              class={styles.sector}
              style={{ transform: "rotate(343deg) skew(18deg)" }}
            />

            {/*
            <div
              class={styles.sector}
              style={{ transform: "rotate(75deg) skew(60deg)" }}
            />
            <div
              class={styles.sector}
              style={{ transform: "rotate(105deg) skew(60deg)" }}
            />
            <div
              class={styles.sector}
              style={{ transform: "rotate(135deg) skew(60deg)" }}
            />
            <div
              class={styles.sector}
              style={{ transform: "rotate(165deg) skew(60deg)" }}
            />
            <div
              class={styles.sector}
              style={{ transform: "rotate(195deg) skew(60deg)" }}
            />
            <div
              class={styles.sector}
              style={{ transform: "rotate(225deg) skew(60deg)" }}
            />
            */}
            {/*
            <div
              class={styles.sector}
              style={{ transform: "rotate(255deg) skew(60deg)" }}
            />
            <div
              class={styles.sector}
              style={{ transform: "rotate(285deg) skew(60deg)" }}
            />
            <div
              class={styles.sector}
              style={{ transform: "rotate(315deg) skew(60deg)" }}
            />
            <div
              class={styles.sector}
              style={{ transform: "rotate(345deg) skew(60deg)" }}
            />
            <div
              class={styles.sector}
              style={{ transform: "rotate(375deg) skew(60deg)" }}
            />
            <div
              class={styles.sector}
              style={{ transform: "rotate(405deg) skew(60deg)" }}
            /> */}
            <MenuTrigger class="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 cursor-default rounded-full bg-white" />
          </MenuContent>
        </MenuPositioner>
      </Portal>
    </Menu>
  );
};
