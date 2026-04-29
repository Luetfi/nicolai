/**
 * Fahrschule Nicolai · Admin · UI helpers
 * Vanilla JS, no dependencies. Loaded with `defer`.
 */
(function () {
    'use strict';

    // --- Confirm before submit on any <form data-confirm="..."> ---
    function bindConfirmForms() {
        var forms = document.querySelectorAll('form[data-confirm]');
        forms.forEach(function (form) {
            form.addEventListener('submit', function (event) {
                var message = form.getAttribute('data-confirm') || 'Bist du sicher?';
                if (!window.confirm(message)) {
                    event.preventDefault();
                }
            });
        });
    }

    // --- Image preview when a new file is selected ---
    function bindImagePreviews() {
        var inputs = document.querySelectorAll('[data-image-input]');
        inputs.forEach(function (input) {
            var scope = input.closest('.admin-uploader') || document;
            var preview = scope.querySelector('[data-image-preview]');
            var current = scope.querySelector('[data-current]');
            if (!preview) return;

            input.addEventListener('change', function () {
                var file = input.files && input.files[0];
                if (!file) return;
                if (!file.type || file.type.indexOf('image/') !== 0) return;

                if (preview.dataset.objectUrl) {
                    URL.revokeObjectURL(preview.dataset.objectUrl);
                }
                var url = URL.createObjectURL(file);
                preview.src = url;
                preview.dataset.objectUrl = url;
                preview.hidden = false;

                if (current) {
                    current.style.opacity = '0.35';
                    current.style.filter = 'grayscale(0.5)';
                }
            });
        });
    }

    // --- Auto-dismiss flash messages after 5s ---
    function bindFlashAutoDismiss() {
        var messages = document.querySelectorAll('.admin-flash--success');
        messages.forEach(function (msg) {
            setTimeout(function () {
                msg.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                msg.style.opacity = '0';
                msg.style.transform = 'translateY(-4px)';
                setTimeout(function () { msg.remove(); }, 400);
            }, 5000);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        bindConfirmForms();
        bindImagePreviews();
        bindFlashAutoDismiss();
    }
})();
