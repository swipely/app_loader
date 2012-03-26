(function (context) {

  /**
  @method bind
  @description bind a context to a function
  **/
  var bind = function (fn, context) {
    return function () {
      return fn.apply(context, arguments);
    }
  };

  /**
  @singleton DOM
  @description cleaner DOM methods
  **/
  DOM = {
    one: function (selector, node) {
      node = node || window.document;

      return node.querySelector(selector);
    },

    addClass: function (node, className) {
      if (node.className.indexOf(className) === -1) {
        node.className = node.className += ' ' + className;
      }
    },

    removeClass: function (node, className) {
      if (node.className.indexOf(className) !== -1) {
        node.className = node.className.replace(className, '');
      }
    }
  }

  // Loader
  // --------------------------------- //

  /**
  @constructor AppLoader
  **/
  var AppLoader = function () {
    this.initializer.apply(this, arguments);
  };

  AppLoader.prototype = {

    // default configuration
    slowTimeout:  10000, // 10 sec
    errorTimeout: 20000, // 20 sec
    slowText:     'The rescue is going slower than expected..',
    errorText:    'The rescue mission has failed ☹. Something bad happened. Try to <a href="/">refresh</a> or come back later.',

    initializer: function (config) {
      config = config || {};

      // overwrite default config
      if ('slowTimeout'   in config)  this.slowTimeout  = config.slowTimeout;
      if ('errorTimeout'  in config)  this.errorTimeout = config.errorTimeout;
      if ('slowText'      in config)  this.slowText     = config.slowText;
      if ('errorText'     in config)  this.errorText    = config.errorText;

      this.container  = DOM.one('.app_loader');
      this.feedback   = DOM.one('.feedback', this.container);
    
      this._startTimers();
    },

    _startTimers: function () {
      setTimeout(bind(this.handleSlowness, this), this.slowTimeout);
      setTimeout(bind(this.handleErroneus, this), this.errorTimeout);
    },

    handleSlowness: function () {
      var container = this.container,
          feedback  = this.feedback;

      if (container) {
        DOM.addClass(this.container, 'slow');

        feedback.innerHTML = this.slowText;
      }

    },

    handleErroneus: function () {
      var container = this.container,
          feedback  = this.feedback;

      if (container) {
        DOM.removeClass(container,  'slow');
        DOM.addClass(container,     'error');

        feedback.innerHTML = this.errorText;
      }
    },

    hide: function () {
      DOM.addClass(this.container, 'hide');

      setTimeout(bind(this.remove, this), 2000);
    },

    remove: function () {
      var container = this.container,
          parent    = container.parentNode;
          
      parent.removeChild(container);
    }
  };

  var Swipely = {
    AppLoader: AppLoader
  };

  context.Swipely = Swipely;

}(this));
