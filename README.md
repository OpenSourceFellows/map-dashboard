<!-- PROJECT LOGO & DESCRIPTION -->

<div align="center">
   <h1>Map Dashboard Web Application</h1>
   <p>
      This repository houses the source code for the Map Visualization Dashboard web app project. It uses
      <a href="https://vuejs.org/"><strong>Vue 3</strong></a>
      and
      <a href="https://vuetifyjs.com/en/"><strong>Vuetify</strong></a>.
   </p>
</div>

## Recommended IDE Setup

We **highly** recommend [VS Code](https://code.visualstudio.com/) for its great plugins. The project is also setup for auto-linting with VSCode on file save! You'll need at least the [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) plugin. Once you open the source code in VSCode, some other convenient plugins should also be recommended to you.

## Running the App

Using Docker is the best way to run the app for development, but if you have `pnpm` installed locally you can run it like any old Vue application. **Please use only pnpm to run the project or handle dependencies!** Different tools like `yarn` and `npm` are not interoperable with `pnpm` (or each other) and will cause problems when intermingled.

Once you have Docker running, you can build a container and enter it with

```
./scripts/start.sh
```

Once inside, run

```
pnpm install
```

To install the necessary packages, then run

```
pnpm dev
```

to start the development server. The app will run on port 8080 so make sure that is available on your local machine or you probably won't be able to access the app in your browser.

![Home Page](assets/images/home-page.png)

To exit the conainer, shut down the dev server with `ctrl + c` and you can just type `exit`.

To shut down the container, use

```
./scripts/stop.sh
```

You may need to rebuild the container from time to time and can do that with

```
./scripts/rebuild.sh
```

## Testing

We use Vitest for testing, which has a hot reloading feature. This means you can write a test and it will re-run when you save the test file or the source file for the code you're testing. You can start this with

```
pnpm test
```
