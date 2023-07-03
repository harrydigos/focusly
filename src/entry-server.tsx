import { redirect } from "solid-start";
import {
  StartServer,
  createHandler,
  renderAsync,
} from "solid-start/entry-server";

export default createHandler(
  ({ forward }) => {
    return async (event) => {
      const pathname = new URL(event.request.url).pathname;

      /* Redirect all routes to "/" */

      if (pathname === "/") {
        return forward(event);
      }

      return redirect("/");
    };
  },
  renderAsync((event) => <StartServer event={event} />)
);
