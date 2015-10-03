# headerDirective

Creates a header control.

**Requirements**

* [AngularJS](http://angularjs.org/)
* [bklik/styleSheetFactory](https://github.com/bklik/styleSheetFactory)

### Installation

Link to popup's CSS and Javascript files.
```html
<script src="headerDirective/headerDirective.js"></script>
```

In your app's directives.js file, add the headerDirective module.
```javascript
angular.module('myApp', ['headerDirective']);
```

Last, simply add a `<header-directive>` element.
```html
<header-directive>
    <main-header>
        <header-title>[Your Title Here]</header-title>
    </main-header>
    <sub-navigation>
        <button class="selected">Tab 1</button>
        <button>Tab 2</button>
        <button>Tab 3</button>
    </sub-navigation>
</header-directive>
```
