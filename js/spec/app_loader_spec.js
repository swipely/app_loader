describe('Swipely', function () {

  beforeEach(function () {
    // create dummy dom
    var appDiv = document.createElement('div');
    appDiv.className = 'app_loader';
    appDiv.innerHTML = '<div class="feedback"></div>';
    document.querySelector('body').appendChild(appDiv);

    // add jasmine matches
    this.addMatchers({
      toBeFunction: function () {
        return typeof this.actual === 'function';
      }
    });
  });

  afterEach(function () {
    // remove dummy dom
    var appDiv = document.querySelector('.app_loader');
    document.querySelector('body').removeChild(appDiv);
  });
  
  it('is an global object', function () {
    expect( window.Swipely ).toBeDefined();
  });

  it('has an AppLoader', function () {
    expect( window.Swipely.AppLoader ).toBeFunction();
  });

  describe('AppLoader', function () {

    describe('slowness', function () {

      it('has calls slowness handler after a set time', function () {
        runs(function () {
          spyOn( Swipely.AppLoader.prototype, 'handleSlowness' );
          this.appLoader = new Swipely.AppLoader({
            slowTimeout: 250,
            errorTimeout: 500 
          });
        });

        waits(500);

        runs(function () {
          expect( Swipely.AppLoader.prototype.handleSlowness ).toHaveBeenCalled(); 
        });
      });

      it('adds a slowText to the feedback node', function () {
        var feedbackNode = document.querySelector('.feedback');

        runs(function () {
          this.appLoader = new Swipely.AppLoader({
            slowTimeout: 100,
            errorTimeout: 500
          });
        });

        runs(function () {
          expect( feedbackNode.innerText ).toBe('');
        });

        waits(250);

        runs(function () {
          expect( feedbackNode.innerText ).toBe(this.appLoader.slowText);
        });
      });

    });

    describe('erroneus', function () {

      it('has calls erroneus handler after a set time', function () {
        runs(function () {
          spyOn( Swipely.AppLoader.prototype, 'handleErroneus' );
          this.appLoader = new Swipely.AppLoader({
            slowTimeout: 100,
            errorTimeout: 250 
          });
        });

        waits(500);

        runs(function () {
          expect( Swipely.AppLoader.prototype.handleErroneus ).toHaveBeenCalled(); 
        });
      });

      it('adds an errorText to the feedback node', function () {
        var feedbackNode = document.querySelector('.feedback');

        runs(function () {
          this.appLoader = new Swipely.AppLoader({
            slowTimeout: 100,
            errorTimeout: 250
          });
        });

        runs(function () {
          expect( feedbackNode.innerHTML ).toBe('');
        });

        waits(500);

        runs(function () {
          expect( feedbackNode.innerHTML ).toBe(this.appLoader.errorText);
        });
      });

    });

  });

});
