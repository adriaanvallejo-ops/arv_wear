/*
 * ARV Wear storefront helpers.
 * Small, dependency-free and independent from the theme's core scripts.
 * - Dialogs (size guide)
 * - Size chart unit toggle (in / cm), kept in sync across the page
 * - Review photo viewer
 * - Keeps the "Buy Now" label on forms that go straight to checkout
 */
(function () {
  'use strict';

  var strings = window.arvStrings || {};

  /* ---------- Dialogs ---------- */
  function openDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    document.documentElement.classList.add('arv-dialog-open');
  }

  function closeDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
    document.documentElement.classList.remove('arv-dialog-open');
  }

  document.addEventListener('click', function (event) {
    var opener = event.target.closest('[data-arv-dialog-open]');
    if (opener) {
      event.preventDefault();
      openDialog(document.getElementById(opener.getAttribute('data-arv-dialog-open')));
      return;
    }

    var closer = event.target.closest('[data-arv-dialog-close]');
    if (closer) {
      closeDialog(closer.closest('dialog'));
      return;
    }

    // Click on the backdrop closes the dialog.
    if (event.target.tagName === 'DIALOG' && event.target.classList.contains('arv-dialog')) {
      closeDialog(event.target);
    }
  });

  document.addEventListener(
    'close',
    function (event) {
      if (event.target.classList && event.target.classList.contains('arv-dialog')) {
        document.documentElement.classList.remove('arv-dialog-open');
      }
    },
    true
  );

  /* ---------- Size chart units ---------- */
  function setUnit(unit) {
    document.querySelectorAll('[data-arv-units]').forEach(function (chart) {
      chart.setAttribute('data-unit', unit);
      chart.querySelectorAll('[data-set-unit]').forEach(function (button) {
        button.setAttribute('aria-pressed', button.getAttribute('data-set-unit') === unit ? 'true' : 'false');
      });
    });
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-set-unit]');
    if (!button) return;
    setUnit(button.getAttribute('data-set-unit'));
  });

  /* ---------- Review photo viewer ---------- */
  var lightbox;

  function getLightbox() {
    if (lightbox) return lightbox;
    lightbox = document.createElement('dialog');
    lightbox.className = 'arv-dialog arv-lightbox';
    lightbox.innerHTML =
      '<div class="arv-lightbox__inner">' +
      '<button type="button" class="arv-dialog__close" data-arv-dialog-close aria-label="Close">&times;</button>' +
      '<img class="arv-lightbox__img" alt="">' +
      '</div>';
    document.body.appendChild(lightbox);
    return lightbox;
  }

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('[data-arv-photo]');
    if (!trigger) return;
    event.preventDefault();
    var box = getLightbox();
    var img = box.querySelector('img');
    img.src = trigger.getAttribute('data-arv-photo');
    img.alt = trigger.getAttribute('data-arv-photo-alt') || '';
    var closeLabel = trigger.getAttribute('data-arv-close-label');
    if (closeLabel) box.querySelector('[data-arv-dialog-close]').setAttribute('aria-label', closeLabel);
    openDialog(box);
  });

  /* ---------- Long review text: read more / show less ---------- */
  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-arv-more]');
    if (!button) return;
    var text = document.getElementById(button.getAttribute('aria-controls'));
    if (!text) return;
    var expanded = button.getAttribute('aria-expanded') === 'true';
    text.classList.toggle('is-expanded', !expanded);
    button.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    button.textContent = expanded ? button.getAttribute('data-label-more') : button.getAttribute('data-label-less');
  });

  /* ---------- "Buy Now" label on direct-checkout forms ----------
   * The theme resets the main button label to the generic "Add to cart" text
   * after a variant change. Forms configured to skip the cart go straight to
   * checkout, so the label must keep saying "Buy Now". */
  function keepBuyNowLabel() {
    if (!strings.buyNow || !window.variantStrings) return;
    document.querySelectorAll('product-form').forEach(function (form) {
      var idInput = form.querySelector('input[name="id"][data-skip-cart="true"]');
      var label = form.querySelector('[name="add"] > .main-atc__label');
      if (!idInput || !label) return;

      var fix = function () {
        if (label.textContent.trim() === window.variantStrings.addToCart.trim()) {
          label.textContent = strings.buyNow;
        }
      };
      fix();
      new MutationObserver(fix).observe(label, { childList: true, characterData: true, subtree: true });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', keepBuyNowLabel);
  } else {
    keepBuyNowLabel();
  }
})();
