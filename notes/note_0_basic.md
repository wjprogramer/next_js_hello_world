# Basic

1. 安裝 `yarn create next-app --typescript`
1. 建置 `yarn build`
1. 啟動 `yarn start`
1. 建置與啟動 (windows 10) `yarn build | yarn start`

## [Pre-rendering](https://nextjs.org/docs/basic-features/pages#pre-rendering)

...

Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called _hydration_.)

### [Two forms of Pre-rendering](https://nextjs.org/docs/basic-features/pages#two-forms-of-pre-rendering)

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

-   [**Static Generation (Recommended)**](https://nextjs.org/docs/basic-features/pages#static-generation-recommended): The HTML is generated at **build time** and will be reused on each request.
-   [**Server-side Rendering**](https://nextjs.org/docs/basic-features/pages#server-side-rendering): The HTML is generated on **each request**.

...

### [Static Generation with data](https://nextjs.org/docs/basic-features/pages#static-generation-with-data)

Some pages require fetching external data for pre-rendering. There are two scenarios, and one or both might apply. In each case, you can use these functions that Next.js provides:

1.  Your page **content** depends on external data: Use `getStaticProps`.
2.  Your page **paths** depend on external data: Use `getStaticPaths` (usually in addition to `getStaticProps`).

...

---


