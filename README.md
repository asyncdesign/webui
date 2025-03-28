
## **WebUI**

*The Swiss Army Knife of CSS frameworks*


[![LICENSE](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://github.com/asyncdesign/webui/blob/master/LICENSE)
[![Dependencies](https://img.shields.io/badge/dev&nbsp;dependencies-up&nbsp;to&nbsp;date-green.svg?style=flat-square)](https://github.com/asyncdesign/webui/network/dependencies)
[![Webpack](https://img.shields.io/badge/Webpack-5.89.0-blue.svg?logo=webpack&style=flat-square)](https://github.com/webpack/webpack)
[![SASS](https://img.shields.io/badge/SASS-1.69.3-pink.svg?logo=sass&style=flat-square)](https://github.com/webpack/webpack)

[![npm version](https://img.shields.io/npm/v/asyncdesign-webui?lable=npm&color=blue&style=flat-square)](https://www.npmjs.com/package/asyncdesign-webui)
[![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/asyncdesign-webui?label=npm&color=darkblue&style=flat-square)](https://www.jsdelivr.com/)
[![NuGet version](https://img.shields.io/nuget/vpre/asyncdesign-webui?label=nuget&style=flat-square)](https://www.nuget.org/packages/asyncdesign-webui/absoluteLatest)
[![Nuget](https://img.shields.io/nuget/dt/asyncdesign-webui?label=nuget&color=darkblue&style=flat-square)](https://www.nuget.org/packages/asyncdesign-webui)


\
\
WebUI is a little different to most other CSS frameworks due to an emphasis on flexibility and creativity. Although most frameworks do attempt to provide flexibility, they often enforce a particular approach or style, and come with too many limitations. WebUI has been build from the ground up with flexibility as the primary goal - even the components are made that way. WebUI is a system that allows you to invent new designs, and provides simple building blocks to construct much larger CSS components. Complex data entry forms can be created in a precise layout using the built-in grid system that doesn't throw any surprises. Add responsive behaviour exactly where you want it, with the flexibility to create fixed non-responsive layouts or layout sections.

\
**Check out the [full documentation](https://asyncdesign.github.io/webui/) to learn more about WebUI**

#

### **Installation**

#### **Simple Method**

* [Download the latest release](https://github.com/asyncdesign/webui/archive/v11.6.0.zip)
* Extract the CSS and JavaScript files from the dist folder to your project folders.
* WebUI has no dependencies, so you don't need to include jQuery.
* In your web page add a link to the CSS in the head section of your page and links to the JavaScript files at the bottom of the body section, for example:

````html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title></title>

    <link rel="stylesheet" href="css/webui-components-standard.min.css">

  </head>
  
  <body>

    <script src="js/webui-components.min.js"></script>
  </body>
</html>
````

#### **Using a CDN**

If you prefer not to download the full package and just want to try it out, then this can be done by linking to the required files on a CDN as follows.

````html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title></title> 

    <link rel="stylesheet" href="https://unpkg.com/asyncdesign-webui@latest/dist/css/webui-standard.min.css">
  </head>
  
  <body>

    <script src="https://unpkg.com/asyncdesign-webui@latest/dist/js/webui-components.min.js"></script>
  </body>
</html>
````

#### **NPM**
This is the recommended way to install WebUI if you are building websites using popular frameworks such as Angular, React, or Vue.

`npm install asyncdesign-webui`


#### **Yarn**
Alternatively, you can use Yarn to install the WebUI packages.

`yarn add asyncdesign-webui`


#### **NuGet**
If you are using Visual Studio before VS2019 to develop websites, then this is the preferred way to install WebUI.

`Install-Package asyncdesign-webui`

#### **LibMan**

If you are using Visual Studio 2019 or later, then the built-in "LibMan" utility is the best way to manage client-side libraries.

**[LibMan documentation](https://learn.microsoft.com/en-us/aspnet/core/client-side/libman/libman-vs?view=aspnetcore-8.0)**


That's it. You are ready to start developing with WebUI.

\
Be sure to look at the static **DEMO** pages at the root of the download, containing many examples that demonstrate a good selection of components.


#### **What's Included**


#### **NPM**
The NPM package includes the WebUI source files and the minified and development distribution files.

#### **Yarn**
Yarn installs the same package as with NPM, but may be better suited to certain projects or environments.

#### **NuGet**
The NuGet package includes only the minified and development distribution files.

#### **GitHub Download**
The GitHub download includes all WebUI files for the framework, docs website, demo pages, and build files.

#### **Components Available**

* Alerts
* Animation
* Carousel
* Focus Trap
* Menus
* Modals
* Navbar
* NavButton
* NavIndicator
* Radial
* Scrollspy
* Shapes
* Tabs
* Toast Container
* Tooltips
* Upload
* Validation
* Zoom		

#


### **Useage**

#### **CSS and JavaScript Files**

WebUI comes with a range of pre-built CSS and JavaScript files. The following table shows the combinations that can be used and what is included in each.

| CSS                            | JS                    | Includes                                                                                                                                              |
|--------------------------------|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| webui-all.min.css										| webui.min.js (Optional)		| Includes everything, with advanced styles, the layout grid system, and flexbox. Does not include any components.|
| webui-standard.min.css							| webui.min.js (Optional)		| Includes standard styles, the layout grid system, and flexbox. Does not include any components.|
| webui-basic.min.css									| webui.min.js (Optional)		| Includes only basic styles. Does not include any components.|
| webui-components-all.min.css				| webui-components.min.js		| Includes everything, with advanced styles, the layout grid system, flexbox, and all components.|
| webui-components-standard.min.css		| webui-components.min.js		| Includes standard styles, the layout grid system, flexbox, and all components.|
| webui-components-basic.min.css			| webui-components.min.js		| Includes only basic styles, and all components.|

#### **Styles Without JavaScript**

WebUI can be used without javascript files if you only need the CSS, so a set of style only files are provided. The filenames for these do not contain the
word "components" as in the above table. So, for the first 3 CSS files listed in the above table, .js files are optional.

#### **JavaScript Document Load Event**

All WebUI JavaScript should be enclosed in the document loaded event callback, as shown in the following examples. Use the second example to wait for all window
content to be completed and the document.readyState === "complete" before running scripts. The first example only waits for the DOMContentLoaded event.

**NOTE:** These events do not need to be used if you are using a framework lifecycle mounted or render event.

````JavaScript
webui.ready( () => {
  // Call WebUI functions here...
});

webui.ready( () => {
  // Call WebUI functions here...
}, true);
````

#### **Angular**

* From the command line, navigate to your `Angular CLI` project folder.
* Type `npm install asyncdesign-webui` and wait for the install to finish.
* In `tsconfig.json` add `"allowJs": true` to the `"compilerOptions"` object.
* In `.angular-cli.json` add `"../node_modules/asyncdesign-webui/dist/css/webui-components-standard.min.css"` to the styles array.
* In `.angular-cli.json` add `"../node_modules/asyncdesign-webui/dist/js/webui-components.min.js"` to the scripts array.
* In `typings.d.ts` add `declare var webui: any`
* In your `app.components.ts` add `import * as webui from '../../node_modules/asyncdesign-webui/dist/js/webui-components.min.js';` at the top of your file.
    
#### **React**

* From the command line, navigate to your `React` project folder.
* Type `npm install asyncdesign-webui` and wait for the install to finish.
* In your `React` root js file such as `index.js` or `App.js` add `import webui from '../node_modules/asyncdesign-webui/dist/js/webui-components.min.js'`
* Then add `import '../node_modules/asyncdesign-webui/dist/css/webui-components-standard.min.css'`
* Don't forget to use `className=""` instead of `class=""` on your html elements.
* If you need to use WebUI javascript functions, this should be done in the `componentDidMount()` lifecycle method.

#### **Vue**

* From the command line, navigate to your `Vue CLI` project folder.
* Type `npm install asyncdesign-webui` and wait for the install to finish.
* In `webpack.base.conf.js` under `resolve: alias:` add `'webui': resolve('node_modules/asyncdesign-webui/dist/js/webui-components.min.js')`
* In `main.js` add `import webui from 'webui';`
* In `main.js` add `import '../node_modules/asyncdesign-webui/dist/css/webui-components-standard.min.css';`
* Then finally, add `Vue.use(webui)` directly below your imports.

#

**Check out the [full documentation](https://asyncdesign.github.io/webui/) to learn more about WebUI**

