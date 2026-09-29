# React + Vite

## API configuration

The client uses `http://localhost:7000` during development and
`https://darshanease-1-i6lx.onrender.com` in production by default. Set
`VITE_API_URL` in Vercel's project environment variables to override the API
URL, then redeploy the client.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
