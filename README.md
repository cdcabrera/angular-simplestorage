Angular.Simple Storage
=====================
AngularJS based localStorage service alongside an include/template enhancement directive.


How it works
---------------------
The project contains two separate aspects.

First, a service that's essentially a wrapper for a localStorage project I did awhile back. I
figured it'd be useful for someone else. There isn't a cookie fallback, however localStorage is
supported as far back as IE-8.

The second aspect I included was an enhancement directive for ngInclude. In your HTML markup
you add the directive to ngInclude from there **localStorage** helps take over from caching:


```html
<div data-ng-include="'subdemo.html'" data-local-storage=""></div>
```


I've set the local-storage attribute up with 3 potential values. Feel free to update, I'm looking
for a better alternative.

- {String} **'' an empty value/string**: Initial data loaded and placed in localStorage
- {String} **'expire'** or **'clear'**: Expires/clears the associated localStorage.
- {String} **'reload'**: clears/expires the associated localStorage, reloads the data, and populates localStorage again.



Browser compatibility
-----------------------
I only did minimal Chrome and Firefox testing. IE supports localStorage down to version 8.


License
---------------------
My aspect is released under the <a href="http://opensource.org/licenses/mit-license.php">MIT License</a>.

I did include <a href="http://necolas.github.com/normalize.css">Normalize.css</a> for general formatting purposes
within the demo.

