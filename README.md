<div style="display:flex; align-items: center">
  <h1 style="position:relative; top: -6px" >Movie Epic Quotes</h1>
</div>

---

Movie Epic Quotes is app where users can share quotes from their favorite movies and view other users quotes, comment on them and give them like if they find quote likable.

#

### Table of Contents

- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development](#development)
- [Project Structure](#project-structure)
- [Deployment](#deployment)

#

### Prerequisites

- <img src="readme/assets/node.png" width="25" style="position: relative; top: 8px" /> _Node JS @14.X and up_
- <img src="readme/assets/npm.png" width="35" style="position: relative; top: 4px" /> _npm @6 and up_
- <img src="readme/assets/typescript.png" width="20" style="position: relative; top: 6px" /> *TypeScript@4.9.3.X and up*

#

### Tech Stack

- <img src="readme/assets/react.png" height="18" style="position: relative; top: 4px" /> [React @18.2.0.0](https://reactjs.org) - front-end framework.
- <img src="readme/assets/next.png" height="18" style="position: relative; top: 4px" /> [Next @13.1.1](https://nextjs.org/) - front-end framework.
- <img src="readme/assets/axios.svg" height="18" style="position: relative; top: 4px; width: 18px" /> [axios @1.2.2](https://axios-http.com/) - Promise based HTTP client for the browser and node.js.
- <img src="readme/assets/react-query.svg" height="18" style="position: relative; top: 4px; width: 18px" /> [Reqct Query @3.39.2](https://react-query-v3.tanstack.com/) - Hooks for fetching, caching and updating asynchronous data in React.
- <img src="readme/assets/react-form.png" height="18" style="position: relative; top: 4px; width: 18px" /> [React Hook Form @7.41.1
  ](https://react-hook-form.com/) - Performant, flexible and extensible forms with easy-to-use validation.
- <img src="readme/assets/toolkit.jpeg" height="18" style="position: relative; top: 4px; width: 18px" /> [Redux Toolkit @1.9.1
  ](https://redux-toolkit.js.org/) - For global state management.
- <img src="readme/assets/tailwind.png" height="18" style="position: relative; top: 4px; width: 18px" /> [Tailwind @3.2.4](https://tailwindcss.com/) - Tailwind CSS is an open source CSS framework.

#

### Getting Started

1\. First of all you need to clone Movie Epic Quotes repository from github:

```sh
git clone https://github.com/RedberryInternship/tsukho-epic-movie-quotes-front.git
```

2\. Next step requires install all the dependencies.

```sh
npm ci
```

or

```sh
yarn
```

#

### Project Structure

```bash
├─── readme   # readme assets
├─── public      # public folder
│   ├─── assets       # project images and fonts
│   ├─── locales       # project locals
├─── pages    # pages folder
│   ├─── movies
│       ├─── [movie].tsx
│       ├─── index.tsx
│   ├─── _app.tsx
│   ├─── _document.tsx
│   ├─── 403.tsx
│   ├─── 404.tsx
│   ├─── index.tsx
│   ├─── news-feed.tsx
│   ├─── profile.tsx
├─── hooks        # global react hooks
├─── services     # api services / axios calls
├─── types        # global types
├─── state        # context api state management
├─── utils        # global utilities
├─── config       # global config
├─── components   # reusable components
- .env.example
- .eslintrc.json
- .prettierrc.js
- middleware.ts
- next-i18next.config.js
- package.json
- next.config.js
- tsconfig.json
- tailwind.config.cjs
- vite.config.ts
- .gitignore
- README.md
- postcss.config.cjs

```

#

### Deployment

In order to deploye project on the server you must build existing Movie Epic Quotes from terminal:

```sh
npm run build
```

After this you must restart pm2 by running following code:

```sh
pm2 restart nextjs-example
```
