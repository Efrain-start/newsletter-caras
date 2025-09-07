

(function () {

  const form = document.getElementById('subscriptionForm');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');

  const nameErrorEl = document.getElementById('nameError');
  const emailErrorEl = document.getElementById('emailError');
  const formMessageEl = document.getElementById('formMessage');


  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  function clearErrors() {
    nameErrorEl.textContent = '';
    emailErrorEl.textContent = '';
    [nameInput, emailInput].forEach(el => el.classList.remove('is-invalid'));
    formMessageEl.textContent = '';
    formMessageEl.className = 'form-message'; // reset clases
  }

  function showFieldError(inputEl, errorEl, message) {
    errorEl.textContent = message;
    inputEl.classList.add('is-invalid');
  }

  function showFormMessage(message, type = 'success') {
    formMessageEl.textContent = message;
    formMessageEl.className = `form-message ${type === 'success' ? 'form-message--success' : 'form-message--error'}`;
  }

  function validateName() {
    const value = nameInput.value.trim();
    if (value.length === 0) {
      showFieldError(nameInput, nameErrorEl, 'Por favor, escribe tu nombre.');
      return false;
    }
    nameErrorEl.textContent = '';
    nameInput.classList.remove('is-invalid');
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (value.length === 0) {
      showFieldError(emailInput, emailErrorEl, 'El correo es obligatorio.');
      return false;
    }
    if (!emailRegex.test(value)) {
      showFieldError(emailInput, emailErrorEl, 'Escribe un correo válido (ej. nombre@dominio.com).');
      return false;
    }
    emailErrorEl.textContent = '';
    emailInput.classList.remove('is-invalid');
    return true;
  }

  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('is-invalid')) validateName();
  });
  emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('is-invalid')) validateEmail();
  });

  // Envío del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const isNameOk = validateName();
    const isEmailOk = validateEmail();

    if (isNameOk && isEmailOk) {
      showFormMessage('¡Listo! Tu suscripción se realizó con éxito. 🎉', 'success');
      form.reset();
      nameInput.focus();
    } else {
      showFormMessage('Revisa los campos marcados e intenta de nuevo.', 'error');
      if (!isNameOk) {
        nameInput.focus();
      } else if (!isEmailOk) {
        emailInput.focus();
      }
    }
  });
})();
