import { mount, StartClient } from "solid-start/entry-client";
import { inject } from "@vercel/analytics";

inject();
mount(() => <StartClient />, document);
