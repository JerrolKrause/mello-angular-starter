An Angular Seed/Starter based on the excellent https://github.com/AngularClass/angular2-webpack-starter

Includes the following additional elements:
<ul>
<li>Angular 4</li>
<li>TypeScript 2 barrels/paths</li>
<li>Bootstrap 4</li>
<li>Ng-Boostrap</li>
<li>Ngrx-Store (Redux)</li>
</ul>

Lots and lots of scaffolding/boilerplate for rapid development:
<ul>
<li>REST API with complete state management (with loading/success/error)</li>
<li>Fully e2e Ngrx-Store with effects for API interaction</li>
<li>Intelligent application exception/error handling and logging</li>
<li>Intuitive flyout mobile nav (missing fron ng-bootstrap)</li>
<li>Title service for SEO & bookmarking</li>
<li>Boilerplate SCSS for common UI components</li>
</ul>

```bash
# clone our repo
# --depth 1 removes all but one .git commit history
git clone --depth 1 https://github.com/JerrolKrause/angular-seed-complete.git

# change directory to our repo
cd angular-seed-complete

# install the repo with yarn
yarn

# If you don't have yarn installed, install it via npm first (lol)
npm install --global yarn

# use Hot Module Replacement
npm run server:dev:hmr

```

```bash
# Build with:
npm run build:aot
```