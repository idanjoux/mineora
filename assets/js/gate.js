/* ============================================================
   Mineora — Acquisition Page Gate
   ------------------------------------------------------------
   NOTE: Client-side gating is convenience, not security.
   The password and content live in files the browser
   downloads. Do not store anything truly confidential here.
   For real protection, use server-side auth.
   ============================================================ */

(function () {
  'use strict';

  // ---- Config ----
  // Change this single value to update the password for every
  // acquisition page on the site.
  var PASSWORD = 'mineora2026';

  // sessionStorage key — unlocks last only for the current tab session.
  var STORAGE_KEY = 'mineora_acq_unlocked';

  // ---- Behavior ----
  function unlock() {
    var gate = document.getElementById('acq-gate');
    var content = document.getElementById('acq-content');
    if (gate) gate.style.display = 'none';
    if (content) content.style.display = 'block';
  }

  function lock() {
    var gate = document.getElementById('acq-gate');
    var content = document.getElementById('acq-content');
    if (gate) gate.style.display = 'flex';
    if (content) content.style.display = 'none';
  }

  function alreadyUnlocked() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function rememberUnlocked() {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch (e) {
      // Ignore — private mode etc.
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (alreadyUnlocked()) {
      unlock();
      return;
    }

    lock();

    var form = document.getElementById('gate-form');
    var input = document.getElementById('gate-input');
    var error = document.getElementById('gate-error');

    if (!form || !input) return;

    input.focus();

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var value = (input.value || '').trim();

      if (value === PASSWORD) {
        if (error) error.textContent = '';
        rememberUnlocked();
        unlock();
      } else {
        if (error) error.textContent = 'Incorrect password.';
        input.value = '';
        input.focus();
      }
    });
  });
})();
