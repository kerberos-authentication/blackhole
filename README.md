my-app/
├── index.html
├── vite.config.js
├── package.json
├── public/                   # static frontend assets
│   └── favicon.ico
│
├── src/                      # frontend (Vite + React)
│   ├── main.jsx              # React entry
│   ├── App.jsx               # Root component
│   ├── components/           # Shared UI
│   ├── pages/                # Page-level React components
│   ├── assets/               # Images, fonts, etc.
│   └── styles/               # CSS/Tailwind
│
└── server/                   # backend (itty-router)
    ├── index.js              # entry point for your server
    ├── routes/               # backend route handlers
    │   ├── api.js
    │   └── ...
    ├── middleware/           # reusable middleware
    └── utils/                # helpers

# React + Vite
"scripts": {
    "dev": "vite", // start dev server, aliases: `vite dev`, `vite serve`
    "build": "vite build", // build for production
    "preview": "vite preview" // locally preview production build
  }
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.


h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
