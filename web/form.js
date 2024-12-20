document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Получаем данные формы
        const formData = {
            lastName: form.lastName.value,
            firstName: form.firstName.value,
            middleName: form.middleName.value,
            citizenship: form.citizenship.value,
            agreement: form.agreement.checked
        };

        try {
            // Отправляем данные на сервер
            const response = await fetch('http://localhost:2999/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                // Скрываем форму
                form.style.display = 'none';
                // Показываем сообщение об успехе
                successMessage.classList.remove('hidden');
                // Очищаем форму
                form.reset();
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
            console.error('Ошибка:', error);
        }
    });

    // Валидация полей осталась без изменений
    const requiredInputs = form.querySelectorAll('input[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#ff4444';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
    });
});