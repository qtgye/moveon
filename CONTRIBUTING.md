# Contributing

Development server is [http://moveon-dev.netlify.com](http://moveon-dev.netlify.com).


## Development Requirements
- Node v7.10.1 and above
- NPM
- Gulp, installed globally


## Local Setup

- Clone this repository.
- Install node dependencies: `npm install`
- Run `gulp watch` to boot up local development server and build tools. Normally this would boot up `localhost:3000`, or whichever port is available.
- Get some coffee. Shake up. Start coding :).

## Deployment

Pushed commits are automatically deployed to the development server, along with the compressed public files.


## Build

Run `gulp` to compile all the source files into the `public` folder.

Run `yarn zip` to create a compressed zip file. This is saved as `moveon.zip` in the `public` folder.

> This steps may not be necessary as the deployment automatically creates downloadable zip file in the development server: [http://moveon-dev.netlify.com/moveon.zip](http://moveon-dev.netlify.com/moveon.zip)


## Files and Directories

All the edittable files are located inside the `src` folder.  

The local server files are located inside the `public` folder.


### Templates

Templates are **twig** files compiled into html through `gulp pages`. They are located in `src/templates`.  

For Twig templating guides, please refer to their [site](https://twig.symfony.com/doc/2.x/templates.html).

### Stylesheets

SASS-compiled stylesheets are located in `src/styles`. 

### Scripts

Scripts are located in `src/scripts`. Please apply the [ES6 standards](http://es6-features.org/).

### Images

Raw images are located in `src/images`. They are optimized on build.

### Fonts

Fonts are located in `src/fonts`.
