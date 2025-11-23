document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            doctor: document.getElementById('doctor').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            reason: document.getElementById('reason').value
        };

        // Basic validation
        if (!validatePhone(formData.phone)) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }

        if (!validateDate(formData.date)) {
            showNotification('Please select a future date', 'error');
            return;
        }

        // Here you would typically send the data to a server
        console.log('Appointment Details:', formData);
        
        // Show success message
        showNotification('Appointment scheduled successfully!', 'success');
        
        // Reset form
        form.reset();
    });

    // Phone number validation
    function validatePhone(phone) {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        return phoneRegex.test(phone);
    }

    // Date validation
    function validateDate(date) {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
    }

    // Notification handler
    function showNotification(message, type = 'success') {
        notificationMessage.textContent = message;
        notification.style.backgroundColor = type === 'success' ? '#48bb78' : '#e53e3e';
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Time slot restrictions (9 AM to 5 PM)
    const timeInput = document.getElementById('time');
    timeInput.addEventListener('change', function() {
        const selectedTime = this.value;
        const hour = parseInt(selectedTime.split(':')[0]);
        
        if (hour < 9 || hour >= 17) {
            showNotification('Please select a time between 9 AM and 5 PM', 'error');
            this.value = '';
        }
    });
}); 