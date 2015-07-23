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
        <button>Menu</button>
        <header-title>
            This is a super long title to see what that's like.
        </header-title>
        <button>Username</button>
    </main-header>
    <sub-navigation>
        <navigation-tab class="selected">Tab 01</navigation-tab>
        <navigation-tab>Tab 02</navigation-tab>
        <navigation-tab>Tab 03</navigation-tab>
        <navigation-tab>Tab 04</navigation-tab>
    </sub-navigation>
</header-directive>
```