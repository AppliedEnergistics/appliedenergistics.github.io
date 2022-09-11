This is the source code for the [Applied Energistics 2 Website](https://appliedenergistics.github.io/).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the content in the [content](./content) subfolder.

The site uses data and images exported from the game using the `/ae2export` client-side command.

It is only available if developer tools are enabled in the config.

## Learn More

This web site is built using Next.js. To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## How to Update Game Data

Run AE2 in Fabric from your development environment. A quick way to do this is to check out the main repository,
and run `gradlew runData` followed by `gradlew runClient`. Create a new creative-mode void-world (use superflat + the void template).

Run `/ae2export`. After it is done exporting, it will link the export folder in chat. Open it and copy all contents into this
repository.
