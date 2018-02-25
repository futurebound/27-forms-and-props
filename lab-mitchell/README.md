# Lab 27 ~ Reddit Search Engine

**Author**: Mitchell

**Version**: 1.0.0

# Overview
This application is an exploration into using an external API to make HTTP requests and dynamically generate, update, and display data on a page from those requests. The focus is on updating the state of various React componenets, and passing data from parent to child while creating ways for child componenets to update state information on their parent components.

Users can access a simple search form, entering their desired search topic into the first input as well as determine the amount of results returned from those searches within the range of 1-20. Clicking the `Search` button will submit their inputs, and a user will be informed of an error if there was any from their search. Results will display below the search form.

# Getting Started
To get this application up and running, fork and/or clone this repository using the `git clone <git repository link>` command in your terminal. Next, run the `npm install` command, which will install all the necessary dependencies in the accompanying package.json file. If wanting to view tests, enter `npm install -D` into the command line. After those packages have installed, you can run `npm test` to explore the included tests and functionality of their respective solutions. You can open up the code in your favorite editor to explore/modify the code, see how the tests are structured, and create tests of your own if desired.

# Description
## SRC
**Styles**
The `styles` directory contains some basic styling for displaying search results in the `main.scss` file, limiting the size of images return from API calls, and triggering a red border on form inputs when an error was incurred by the user.

**Index.html**
The `index.html` file contains simple `HTML` content that allows `Webpack`, through its configuration file, and `React` to target the `div` element with an ID of `root` to render `HTML` through `React`.

**Main.js**
The `main.js` file contains a few different `React` components: `App`, `SearchForm`, and `SearchResultList`.
* **`App`** This is the main, high-level component of the application. It defines a few methods, `updateState()` and `searchApi()`. It renders both the `SearchForm` and `SearchResultList` components, and passes them necessary props.
**<details>**
  <summary>Details</summary>
  
  * **`updateState()`** Expects a single `state` argument, calls the `searchApi` method with the passed state argument, and returns the `this.setState` method with the data returned from the API call.
  * **`searchApi()`** Expects a single `state` argument, and executes a `superagent.get()` request to the `API_URL`, with a specific topic and search results limit passed by the `SearchForm` components' state.
</details>

* **`SearchForm`** This component renders an input form where users can enter specfics to be passed to the API calls. It utilizes methods passed as props from the `App` component, and updates its own state of the `toSearch` and `searchLimit` properties. Information entered by the user into the form is updated set to the components state upon submission of the form.
**<details>**
  <summary>Details</summary>
  
  * **`handleChange()`** Determines whether the input form it's tracking changes from is supposed to update the `toSearch` or `searchLimit` state, and sets state accordingly.
  * **`handleSubmit()`** Uses the components current state values to make a dynamic API call, with the `updateState()` method passed from the `App` component.
</details>

* **`SearchResultList`** This component renders the actual submitted search results. It maps through the `topics` prop passed by the `App` component, and generates list items containing data returned from the API calls that is now stored in the `App` state. If there is an error from that call, it will display a different result to the user in the same space that alerts the user to the error and highlights the input boxes with red.

# Credits 
**<details>**
  <summary>Tools and Libraries [click to expand]</summary>

  * [Babel Core](https://www.npmjs.com/package/babel-core) ~ npmjs.com/package/babel-core
  * [Babel Loader](https://www.npmjs.com/package/babel-loader) ~ npmjs.com/package/babel-loader 
  * [Babel Preset Env](https://www.npmjs.com/package/babel-preset-env) ~ npmjs.com/package/babel-preset-env
  * [Babel Preset React](https://www.npmjs.com/package/babel-preset-react) ~ npmjs.com/package/babel-preset-react
  * [CSS Loader](https://www.npmjs.com/package/css-loader) ~ npmjs.com/package/css-loader 
  * [ESLint](https://www.npmjs.com/package/eslint) ~ npmjs.com/package/eslint
  * [Extract Text Webpack Plugin](https://www.npmjs.com/package/extract-text-webpack-plugin) ~ npmjs.com/package/extract-text-webpack-plugin
  * [HTML Webpack Plugin](https://www.npmjs.com/package/html-webpack-plugin) ~ npmjs.com/package/html-webpack-plugin
  * [Node SASS](https://www.npmjs.com/package/node-sass) ~ npmjs.com/package/node-sass
  * [React](https://www.npmjs.com/package/react) ~ npmjs.com/package/react
  * [React DOM](https://www.npmjs.com/package/react-dom) ~ npmjs.com/package/react-dom
  * [SASS Loader](https://www.npmjs.com/package/sass-loader) ~ npmjs.com/package/sass-loader
  * [Superagent](https://www.npmjs.com/package/superagent) ~ npmjs.com/package/superagent
  * [Webpack](https://www.npmjs.com/package/webpack) ~ npmjs.com/package/webpack
  * [Webpack Dev Server](https://www.npmjs.com/package/webpack-dev-server) ~ npmjs.com/package/webpack-dev-server
</details>