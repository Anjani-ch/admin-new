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

## Writing CSS

Do not write your own CSS files. If you must then use global CSS, but try not to write global CSS either. Use Tailwind to it's full potential.

## Project structure

The root for the actual application files is located in src folder.

### UI

#### components/ui

This directory contains components generated from shadecn/ui. These are automatically generated and do not need to be changed for things to work, but if you need to extend functionality of the components to fit needs for new requirements then feel free to do so.

#### components/form-control

This directory contains larger form component created for reusability. For example setting up a date picker multiple places without a component can feel redundant because it is made from the combination of multiple components compared to simple form components such as a text input.

#### components/form

This directory contains ready made form for a specific use-case. For example a form for creating a page or container.

#### components

Feel free to add other folder or component directly in the root if required.

### Data

#### data-access

This directory contains methods for different type of data access. Usually these are the methods for fetching i particular type of data, and is the base for the use-cases of the application. All connections to data used (API or DB) should be defined and imported from here.

#### use-cases

This directory contains alle the use-cases for the application. This basically means that every functionality the application has is defined as a use-case. A use-case takes in a context and some data. The context is an object with all dependencies for the use-case, this is typically just the definitions for the dependencies and not the actual implementation. And data is data used in your use-case including data needed for dependencies. Use-cases should not import needed dependencies directly but rather be passed in when invoking a use-case.

#### types

This directory contains all common types used in the application. Typical typing for data and dtos (data transfer objects) will be defined and imported from here.

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
