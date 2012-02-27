(function () {

  var SLOW_TIMEOUT  = 10000,
      ERROR_TIMEOUT = 20000,

      SLOW_TEXT     = 'The rescue is going slower than expected..',
      ERROR_TEXT    = 'The rescue missing has failed ☹. Something bad happened. Try to <a href="/">refresh</a> or come back later.';

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
  **/
  var Loader = function () {
    this.initializer();
  };

  Loader.prototype = {
    initializer: function () {
      this.container  = DOM.one('.app_loader');
      this.feedback   = DOM.one('.feedback', this.container);
    
      this._startTimers();
    },

    _startTimers: function () {
      setTimeout(bind(this.handleSlowness, this), SLOW_TIMEOUT);
      setTimeout(bind(this.handleErroneus, this), ERROR_TIMEOUT);
    },

    handleSlowness: function () {
      var container = this.container,
          feedback  = this.feedback;

      if (container) {
        DOM.addClass(this.container, 'slow');

        feedback.innerHTML = SLOW_TEXT;
      }

    },

    handleErroneus: function () {
      var container = this.container,
          feedback  = this.feedback;

      if (container) {
        DOM.removeClass(container, 'slow');
        DOM.addClass(container, 'error');

        feedback.innerHTML = ERROR_TEXT;
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

  new Loader();

}());
