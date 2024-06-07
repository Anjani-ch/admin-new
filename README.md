## Flyttefordel admin

_Documentation and Git log language will be English_

## Tech stack

| Tech                 | Usage                                |
| -------------------- | ------------------------------------ |
| TypeScript           | Writing statically typed code        |
| Tailwind             | Universal class first CSS framework  |
| Next.js (App router) | React server side rendered framework |

## Setup

We use node 20, so make sure your node version is set to 20. You can easily achieve this with `nvm`

Install node modules:

```bash
npm i
```

Run the project in development mode:

```
npm run dev
```

Push changes to main and the CI/CD pipeline will do the rest.

## Writing CSS

Do not write your own CSS files. If you must then use global CSS, but try not to write global CSS either. Use Tailwind to it's full potential.

## Standard Next js README

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
