// import { redirect } from "solid-start";
// import {
//   StartServer,
//   createHandler,
//   renderAsync,
// } from "solid-start/entry-server";

// export default createHandler(
//   ({ forward }) => {
//     return async (event) => {
//       const pathname = new URL(event.request.url).pathname;
//
//       /* Redirect all routes to "/" */
//
//       if (pathname === "/") {
//         return forward(event);
//       }
//
//       return redirect("/");
//     };
//   },
//   renderAsync((event) => <StartServer event={event} />)
// );

import { createHandler } from "@solidjs/start/entry";
import { StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
          <link rel="icon" href="/favicon.ico" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossorigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lexend:wght@200;300;400;500;600&display=swap"
            rel="stylesheet"
          />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));

// @refresh reload
// import { Suspense } from "solid-js";
// import {
//   Body,
//   ErrorBoundary,
//   FileRoutes,
//   Head,
//   Html,
//   Meta,
//   Routes,
//   Scripts,
//   Title,
// } from "solid-start";
// import "./root.css";
// import { useAssets } from "solid-js/web";
// import { YoutubeProvider } from "./providers";
//
// export default function Root() {
//   return (
//     <Html lang="en">
//       <Head>
//         <Title>Focusly</Title>
//         <Meta charset="utf-8" />
//         <Meta />
//       </Head>
//
//       <Body class="bg-black font-lexend text-white">
//         <Suspense>
//           <ErrorBoundary>
//             <YoutubeProvider>
//               <Routes>
//                 <FileRoutes />
//               </Routes>
//             </YoutubeProvider>
//           </ErrorBoundary>
//         </Suspense>
//         <Scripts />
//       </Body>
//     </Html>
//   );
// }
