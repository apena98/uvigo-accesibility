(function(global) {
  'use strict';

  function initAccessibleMenu(container) {
    var scope = container || document;
    var root = scope.querySelector ? scope : document;
    var mainMenu = root.querySelector('#main-menu');
    var menuToggle = document.querySelector('.menu-toggle');

    if (!mainMenu) {
      return;
    }

    if (mainMenu.dataset.menuInitialized === 'true') {
      return;
    }

    mainMenu.dataset.menuInitialized = 'true';

    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        var isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!isExpanded));
        menuToggle.classList.toggle('active');
        mainMenu.classList.toggle('menu-open');
        menuToggle.setAttribute(
          'aria-label',
          isExpanded ? 'Abrir menú de navegación' : 'Cerrar menú de navegación'
        );
      });
    }

    function closeButtons(selector, except) {
      mainMenu.querySelectorAll(selector).forEach(function(btn) {
        if (btn === except) {
          return;
        }

        btn.setAttribute('aria-expanded', 'false');
        var controlsId = btn.getAttribute('aria-controls');
        var controlled = document.getElementById(controlsId);
        if (controlled) {
          controlled.hidden = true;
        }
      });
    }

    function closeAllSubmenus3(except) {
      closeButtons('.submenu3-item-has-children > button', except);
    }

    function closeAllSubmenus2(except) {
      closeButtons('.submenu-item-has-children > button', except);
      closeAllSubmenus3(null);
    }

    function closeAllSubmenus(except) {
      closeButtons('.menu-item-has-children > button', except);
      closeAllSubmenus2(null);
    }

    function bindButtons(selector, onToggle) {
      mainMenu.querySelectorAll(selector).forEach(function(button) {
        button.addEventListener('click', onToggle);
        button.addEventListener('keydown', function(event) {
          if (event.key === 'Escape') {
            button.setAttribute('aria-expanded', 'false');
            var controlsId = button.getAttribute('aria-controls');
            var controlled = document.getElementById(controlsId);
            if (controlled) {
              controlled.hidden = true;
            }
            button.focus();
          }
        });
      });
    }

    bindButtons('.menu-item-has-children > button', function() {
      var submenu = document.getElementById(this.getAttribute('aria-controls'));
      var isExpanded = this.getAttribute('aria-expanded') === 'true';
      closeAllSubmenus(this);
      this.setAttribute('aria-expanded', String(!isExpanded));
      if (submenu) {
        submenu.hidden = isExpanded;
      }
    });

    bindButtons('.submenu-item-has-children > button', function(event) {
      event.stopPropagation();
      var submenu2 = document.getElementById(this.getAttribute('aria-controls'));
      var isExpanded = this.getAttribute('aria-expanded') === 'true';
      closeAllSubmenus2(this);
      this.setAttribute('aria-expanded', String(!isExpanded));
      if (submenu2) {
        submenu2.hidden = isExpanded;
      }
    });

    bindButtons('.submenu3-item-has-children > button', function(event) {
      event.stopPropagation();
      var submenu3 = document.getElementById(this.getAttribute('aria-controls'));
      var isExpanded = this.getAttribute('aria-expanded') === 'true';
      closeAllSubmenus3(this);
      this.setAttribute('aria-expanded', String(!isExpanded));
      if (submenu3) {
        submenu3.hidden = isExpanded;
      }
    });

    document.addEventListener('click', function(event) {
      var clickedToggle = menuToggle && menuToggle.contains(event.target);
      if (!mainMenu.contains(event.target) && !clickedToggle) {
        closeAllSubmenus(null);
      }
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        closeAllSubmenus(null);
      }
    });
  }

  global.initAccessibleMenu = initAccessibleMenu;
})(window);
