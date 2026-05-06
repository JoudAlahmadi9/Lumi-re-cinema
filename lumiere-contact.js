// دالة إظهار المودال
function showLumiereMessage(message) {
    const modal = document.getElementById('myModal');
    const modalMessage = document.getElementById('modalMessage');
    if (modal && modalMessage) {
        modalMessage.textContent = message;
        modal.style.display = "block";
    }
}

// دالة إغلاق المودال
document.querySelector('.close-btn').onclick = function() {
    document.getElementById('myModal').style.display = "none";
}

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // جلب العناصر
    const firstNameEl = document.getElementById('firstName');
    const lastNameEl = document.getElementById('lastName');
    const emailEl = document.getElementById('email');
    const dobEl = document.getElementById('dob');
    const opinionEl = document.getElementById('opinion');

    // التحقق من وجود الحقول في الـ HTML
    if (!firstNameEl || !lastNameEl || !emailEl || !dobEl || !opinionEl) {
        console.error("Critical: Some IDs are missing in HTML!");
        return;
    }

    const formData = {
        firstName: firstNameEl.value.trim(),
        lastName: lastNameEl.value.trim(),
        email: emailEl.value.trim(),
        dob: dobEl.value || null,
        opinion: opinionEl.value.trim(),
        userId: localStorage.getItem('userId') || null // يدعم الإرسال بدون تسجيل دخول
    };

    fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showLumiereMessage("Lumière Cinema: Your message has been sent successfully!");
            document.getElementById('contactForm').reset();
        } else {
            showLumiereMessage("Error: " + data.message);
        }
    })
    .catch(err => {
        console.error("Error:", err);
        showLumiereMessage("Server error. Please ensure node server.js is running.");
    });
});