# Greetings with Task Manager App
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Available scripts

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
Vitest is used in browser mode. See used features section for more.

### `npm run build`

Builds the app for production to the `dist` folder.\
Due to configuration, placing all necessary resources in `public` directory
will resolve their paths for production as well.\
The app is ready to be deployed.

### `npm run preview`

Runs the app in the production mode.\
Open [http://localhost:4173](http://localhost:4173) to view it in the browser.

### `npm run lint`

Runs eslint on src folder's *.ts/tsx files.

### `npm run lint:fix`

Runs eslint on src folder's *.ts, *.tsx files with --fix option i.e. fixes all fixable lint issues.

# Used features

1. Vite has been chosen for application template creation, as create-react-app is getting deprecated.\
This affects testing library as well, Vitest is used with some basic configurations, as I am new to it (though it's pretty similar to jest).\
Browser mode has been chosen, so I included playwright installation and browser mode configs as well.

2. Folders are structured to separate:
- static resources in `public` folder,
- store options in `app` folder,
- main components in `components`,
- reducer slice logic in `features`,
- tests in `test`
- utilities for 'generating' an id and fetching data in `utilities`

3. async thunks are used for loading projects and tasks from a json file,\
other operations are not explicitly run by async thunks but still are managed by store.

4. types are separated in files, including enums for select options

5. test ids have been chosen in order to get desired elements and check for existence,\
this doesn't look ideal to me, but still nothing better got to my mind at the point.

6. A hydration fallback and an error boundary are chosen to be implementing high level catch-up.

7. A reusable Actions component is created to handle edit and delete

8. I have generated an image favicon for the project and also used test data generation\
in order not to handwrite all the id's and data for projects and tasks

