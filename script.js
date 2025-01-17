// Inicialización de EmailJS con tu clave pública
emailjs.init("wbCqcAhegRPvLQpZt"); // Reemplaza con tu clave pública desde EmailJS

// Función para cambiar los atributos del círculo según el ancho de la pantalla
function changeCircleAttributesOnMediaQuery() {
    const circle = document.getElementById('myCircle');
    const mediaQuery768 = window.matchMedia("(min-width: 768px)");
    const mediaQuery1024 = window.matchMedia("(min-width: 1024px)");

    function handleMediaChange() {
        if (mediaQuery1024.matches) {
            // Cambios cuando la pantalla tiene un ancho mínimo de 1024px
            circle.setAttribute('cx', '187');
            circle.setAttribute('cy', '187');
            circle.setAttribute('r', '187');
        } else if (mediaQuery768.matches) {
            // Cambios cuando la pantalla tiene un ancho mínimo de 768px
            circle.setAttribute('cx', '75');
            circle.setAttribute('cy', '75');
            circle.setAttribute('r', '75');
        } else {
            // Cambios cuando la pantalla es menor a 768px
            circle.setAttribute('cx', '50');
            circle.setAttribute('cy', '50');
            circle.setAttribute('r', '50');
        }
    }

    // Escuchar los cambios en ambas consultas de medios
    mediaQuery768.addEventListener('change', handleMediaChange);
    mediaQuery1024.addEventListener('change', handleMediaChange);

    // Ejecutar inicialmente para establecer los valores correctos
    handleMediaChange();
}

changeCircleAttributesOnMediaQuery();

// Manejo del formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const asunto = document.getElementById('asunto');
    const mensaje = document.getElementById('mensaje');

    let isValid = true;

    // Validación de campo "Nombre"
    if (nombre.value.trim() === "") {
        showError('nombre-error', 'Por favor, ingrese su nombre.');
        isValid = false;
    } else {
        hideError('nombre-error');
    }

    // Validación de campo "Email"
    if (email.value.trim() === "") {
        showError('email-error', 'Por favor, ingrese su correo electrónico.');
        isValid = false;
    } else if (!validateEmail(email.value)) {
        showError('email-error', 'Ingrese un correo electrónico válido.');
        isValid = false;
    } else {
        hideError('email-error');
    }

    // Validación de campo "Asunto"
    if (asunto.value.trim() === "") {
        showError('asunto-error', 'Por favor, ingrese el asunto.');
        isValid = false;
    } else {
        hideError('asunto-error');
    }

    // Validación de campo "Mensaje"
    if (mensaje.value.trim() === "") {
        showError('mensaje-error', 'Por favor, ingrese su mensaje.');
        isValid = false;
    } else {
        hideError('mensaje-error');
    }

    // Si todos los campos son válidos, se puede enviar el formulario
    if (isValid) {
        const serviceID = 'service_8eucqyt';
        const templateID = 'template_gqerkjo';

        // Enviar el formulario usando EmailJS
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                alert('Formulario enviado con éxito');
            }, (error) => {
                alert('Hubo un error: ' + JSON.stringify(error));
            });
    }
});

// Función para mostrar mensajes de error
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.color = 'red';
}

// Función para ocultar mensajes de error
function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = '';
}

// Función para validar el formato de email
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
