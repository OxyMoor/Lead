const days = document.querySelector('.days');
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const emailInput = document.querySelector('.subscription-form__email-input');
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const body = document.querySelector('body');
const responseTitle = document.querySelector('.response__title');
const responseSubtitle = document.querySelector('.response__subtitle');
const otherEventsLink = document.querySelector('.subscription__events-link');
const eventItems = Array.from(document.querySelectorAll('.accordion__item'));
// timer
function setTimer() {
    const deadline = new Date(2023, 4, 31);
    let timerId = 'timer';
    let diff = deadline - new Date();
    let d = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
    let h = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    let m = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    let s = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    days.textContent = d < 10 ? '0' + d : d;
    hours.textContent = h < 10 ? '0' + h : h;
    minutes.textContent = m < 10 ? '0' + m : m;
    seconds.textContent = s < 10 ? '0' + s : s;
    timerId = setTimeout(setTimer, 1000);
    if (diff <= 0) {
        clearTimeout(timerId);
    }
}
setTimer();
// form validation
function isEmailValid(value) {
    return EMAIL_REGEXP.test(value);
}
function validateEmail() {
    if (isEmailValid(emailInput.value)) {
        emailInput.style.color = 'rgba(0, 0, 0, 0.6)';
    } else {
        emailInput.style.color = 'rgba(252, 97, 97, 0.6)';
    }
}
emailInput.addEventListener('input', validateEmail);
// sending data
$(document).ready(function() {
    $('#form').submit(function() {
        if (!isEmailValid(emailInput.value)) {
            return false;
        }
        $.ajax({
			type: "POST",
			url: "https://reqbin.com/echo/post/json",
            dataType: 'json',
			data: $(this).serialize(),
            success: () => {
                $('.overlay').fadeIn();
                $(this).find('input').val('');
                $('#form').trigger('reset');
                responseTitle.textContent = 'Success!';
                responseSubtitle.textContent = 'You have successfully subscribed to the email newsletter!';
                body.classList.add('body-no-scroll');
            },
            error: () => {
                responseTitle.textContent = 'Error!';
                responseSubtitle.textContent = 'Something is wrong...';
            }
		});
        return false;
    });
});
$('.response__close-btn').click(function() {
	$('.overlay').fadeOut();
    body.classList.remove('body-no-scroll');
});
$('.response__crist-btn').click(function() {
	$('.overlay').fadeOut();
    body.classList.remove('body-no-scroll');
});
$(document).mouseup(function (e) {
	let response = $('.response');
	if (e.target !== response[0] && response.has(e.target).length === 0){
		$('.overlay').fadeOut();
        body.classList.remove('body-no-scroll');
	}
});
// smooth scroll
otherEventsLink.addEventListener('click', (event) => {
    event.preventDefault();
    const id = otherEventsLink.getAttribute('href').substring(1);
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
        });
    }
});
// accordion
eventItems.forEach(item => {
    item.addEventListener('click', function(event) {
        eventItems.forEach(i => {
            i.classList.remove('active');
            event.currentTarget.classList.add('active');
        });
    });
});