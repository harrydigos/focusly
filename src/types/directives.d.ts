/* eslint-disable no-unused-vars */
import "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      sortable: boolean;
    }
  }
}
