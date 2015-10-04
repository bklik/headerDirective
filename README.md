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

If you'd like to custome style the header, use the following SCSS template.
'''scss
$header-color: #2563D9;

header-directive {
    background-color: $header-color;

    main-header {
        background-color: transparent;

        header-title {
            font-size: 24px;
        }
    }
    sub-navigation {
        background-color: darken($header-color, 10%);

        &:after {}
        &.show:after {}

        button {
            &.selected {}
        }
    }
}
'''