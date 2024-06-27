# What the hell is this?

This is a wipe tracker for my raid team. It's a fully client-side sveltekit app that uses PocketBase as a backend. This started as a complete joke, but the stack is actually kinda sick for this type of thing so I figured I'd fully build it out.

Would I recommend this for anything serious? Probably not. But it's fun, insanely fast to develop with, and I think I'm honestly gonna use this for a bunch of personal internal tools. I'll open source those as well so there will be better examples then f-ing ***burgology***.

## Stack
- SvelteKit
- PocketBase
- Tailwind

## How to run
1. Clone the repo
2. Download PocketBase from here: https://pocketbase.io/docs/ and put it in the POCKETBASE_DIR folder
3. Start pocketbase with `./POCKETBASE_DIR/pocketbase serve`
4. Install dependencies with `bun i`
5. Fill in the .env file with your PocketBase credentials (just need the url as PUBLIC_PB_URL)
6. Run the app with `bun run dev`