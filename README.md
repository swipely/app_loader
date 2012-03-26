# Swipely App loader

A simple loading animation for Single Page Application

## How to use

Simply install these files ( you should modify them to suit your design ). 
And when your Single Page Application is ready to show, you should add
the `hide` class to the `.app_loader` element. This will trigger the hiding animation
and the `.app_loader` element is safe to remove 2 seconds later.

## Customize

There is a slowness and erroneus treatment. 
By default the loader will update the `.feedback` element with a slowness text after 10 seconds.
It will update the `.feedback` element with a erroneus text after 20 seconds.

To customize the texts and timeouts, give a configuration object to the constructor like so:

```javascript
new Swipely.AppLoader({
  slowTimeout:  4000, // 4 sec
  errorTimeout: 1000, // 10 sec
  slowText:     "Wow! It's taking way longer than expected",
  errorText:    "Sorry, but it's not working - try a refresh"
});
```
