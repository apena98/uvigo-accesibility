(function() {
  'use strict';

  function loadMenuInto(container) {
    var menuSrc = container.getAttribute('data-menu-src') || 'partials/main-menu.html';
    var menuBase = container.getAttribute('data-menu-base') || '';

    container.setAttribute('aria-busy', 'true');

    fetch(menuSrc)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('No se pudo cargar el menú compartido.');
        }
        return response.text();
      })
      .then(function(html) {
        container.innerHTML = html;

        if (menuBase) {
          container.querySelectorAll('a[href]').forEach(function(link) {
            var href = link.getAttribute('href');
            if (!href) {
              return;
            }

            var isAbsolute =
              href.charAt(0) === '#' ||
              href.charAt(0) === '/' ||
              href.indexOf('http://') === 0 ||
              href.indexOf('https://') === 0 ||
              href.indexOf('mailto:') === 0 ||
              href.indexOf('tel:') === 0;

            if (!isAbsolute) {
              link.setAttribute('href', menuBase + href);
            }
          });
        }

        container.removeAttribute('aria-busy');

        if (typeof window.initAccessibleMenu === 'function') {
          window.initAccessibleMenu(container);
        }
      })
      .catch(function() {
        container.removeAttribute('aria-busy');
        container.innerHTML = '<p role="status" aria-live="polite">No se pudo cargar el menú.</p>';
      });
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-menu-container]').forEach(loadMenuInto);
  });
})();
