# Manual Checkers

A checkers game in which you do everything yourself:

* Wanna move a piece? Drag it over.
* Wanna remove a piece? Double click it.
  - If that didn't do the trick, double click it again.
  - If you need to add a piece, just double click on an empty cell.
* Whose turn is it? That's up to you.
* Who won? It's not about winning, man.
* Doubles as a terrible Go board.

I don't know what "kinging a piece" means. I'm not like an expert on every single rule of the game.

## Running locally

Use Yarn.

```
yarn install
yarn start
```

Or NPM is fine, too.

```
npm install
npm start
```

## Playing

Oh that's easy 👉 https://garrettgsb.github.io/manual-checkers/

Or maybe you're on a transatlantic voyage and have spotty WiFi, so you want to play locally. You can do that too: After you've `yarn start`ed, go to **localhost:8080**.

Works on Chrome and Firefox. Maybe works on other browsers too, if there are any.

## Restarting the game

Cmd/Ctrl+R

## Deploying to Github Pages

This advice applies to Webpack/React apps in general. If you checkout the `gh-pages` branch in this repo, you'll notice two differences with the master branch:

* index.html points to `dist/main.js` instead of `main.js`
* There is a `dist/main.js`

`dist/main.js` is a bundled version of the app, completely unreadable and ready to deploy. If you make a change, it won't be reflected in the `gh-pages` branch until you rebuild `dist/main.js`. To do that, follow these steps:

* `git checkout gh-pages`
* `git merge master`
* `yarn run build` (Which just calls `webpack`. See package.json)
* `git add`/`commit`/`push`

When you've done that, you should see the game available at https://garrettgsb.github.io/manual-checkers/ if you're me, or https://someotherusername.github.io/manual-checkers if you're not.
