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

Last, simply add a `<header>` element.
```html
<header>
    <nav>
        <button class="selected">Tab 1</button>
        <button>Tab 2</button>
        <button>Tab 3</button>
    </nav>
</header>
```

If you'd like to customize the header style, use the following SCSS template:
```scss
$header-color: #2563D9;

header {
    background-color: $header-color;

    nav {
        background-color: darken($header-color, 10%);

        &:after {}
        &.show:after {}

        button {
            &.selected {}
        }
    }
}
```