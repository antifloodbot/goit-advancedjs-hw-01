import '../css/styles.css';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const { email, message } = form.elements;

loadFormData();

form.addEventListener(
  'input',
  throttle(event => {
    const { name, value } = event.target;

    if (!(name in formData)) return;

    formData[name] = value.trim();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, 500)
);

form.addEventListener('submit', event => {
  event.preventDefault();

  formData.email = email.value.trim();
  formData.message = message.value.trim();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  form.reset();
  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';
});

function loadFormData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);

    formData.email = parsed.email?.trim() || '';
    formData.message = parsed.message?.trim() || '';

    email.value = formData.email;
    message.value = formData.message;
  } catch (error) {
    console.error('Error parsing saved form data:', error);
  }
}