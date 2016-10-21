
##

<img src="images/webui_blue_96x96.png" alt="Webui Logo" align="right" hspace="30" /> 

## **Webui**

*Web design made easy*

[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://github.com/asyncdesign/webui/blob/master/LICENSE)


The purpose of webui is to offer an alternative to larger frameworks, providing a small, flexible, efficient and easy to use system to create websites quickly. The philosophy is to follow a <span class="color-accent-2">"Simplicity is the ultimate sophistication"</span> approach, providing simple building blocks to contruct much larger CSS components without the pain. Complex data entry forms can be created in a precise layout using the built-in grid system that doesn't throw any surprises. Add responsive behaviour exactly where you want it, with the flexibility to create fixed non-responsive layouts or layout sections.

Webui allows you to create your web app without getting distracted by complexity.

**Check out the [full documentation](https://asyncdesign.github.io/webui/) to learn more about webui**

### **Getting Started**

* [Download the latest release](https://github.com/asyncdesign/webui/archive/v4.2.1.zip)
* Extract the CSS and JavaScript files from the dist folder to your project folders.
* You will need to include a version of jQuery. Webui has been tested with jQuery 1.7.2 and later.
* In your web page add a link to the CSS in the head section of your page and links to the JavaScript files at the bottom of the body section, for example:

````html
<html>
<head>
  <link rel="stylesheet" href="css/webui.min.css"> 
</head>
<body>

  <script src="js/jquery-2.2.0.min.js"></script>
  <script src="js/webui.min.js"></script>
</body>
</html>
````

That's it. You are ready to start developing with Webui.

If you want to download and build the project please see detailed instructions on cloning the Git repository and performing builds see the [Cloning the repository](DOCUMENTATION.md#cloneRepository) and [Performing builds](DOCUMENTATION.md#performBuilds) sections.

### **Creating page layouts**

Webui uses a 20 column grid system to create layouts. In general, each row will contain from 1 to 20 columns, and each column can contain any other content. Most likely you will be using a shared layout to display common parts of your website. Here is a quick example of a shared layout structure with a container and some rows and columns:

````html
<div class="container">
  <div class="form-row">
    <div class="form-col-20">
      <!-- Your heading goes here -->
    </div>  
  </div>
  <div class="form-row">
    <div class="form-col-4">
      <!-- Your left navigation goes here -->
    </div>
    <div class="form-col-16">
      <!-- Your main content goes here -->
    </div>
  </div>
</div>
````

**Check out the [full documentation](https://asyncdesign.github.io/webui/) to learn more about webui**
