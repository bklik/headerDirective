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

Last, simply add a `<modal-directive>` element.
```html
<header-directive>
    <main-header>
        <header-title>[Your Title Here]</header-title>
    </main-header>
    <sub-navigation>
        <navigation-tab class="selected">Tab 1</navigation-tab>
        <navigation-tab>Tab 2</navigation-tab>
        <navigation-tab>Tab 3</navigation-tab>
    </sub-navigation>
</header-directive>
```