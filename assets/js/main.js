/**
* Template Name: Lonely
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-lonely/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/


function countdown() {
	const countdownElement = document.getElementById('countdown');
	const weddingDate = new Date('2025-10-04T00:00:00');

	function updateCountdown() {
		const now = new Date();
		const difference = weddingDate - now;
		if (difference <= 0) {
			countdownElement.textContent = "Oggi è il grande giorno!";
			return;
		}
		const days = Math.floor(difference / (1000 * 60 * 60 * 24));
		const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((difference / (1000 * 60)) % 60);
		const seconds = Math.floor((difference / 1000) % 60);
		countdownElement.textContent = `${days} giorni, ${hours}:${minutes}:${seconds}`;
	}
	setInterval(updateCountdown, 1000);
}

function mostraTimeline() {
	debugger;
	document.getElementById("timeline").classList.toggle("show");
}


function gestioneCampiConferma(){
  const nome = document.getElementById("nome");
  const cognome = document.getElementById("cognome");
	const confermaInputs = document.getElementsByName("conferma");
	const partnerSection = document.getElementById("partnerSection");
	const partnerFields = document.getElementById("nomeCognomePartner");
	const figliSection = document.getElementById("figliSection");
	const etaContainer = document.getElementById("etaContainer");
	const partnerInput = document.getElementsByName("partner");
	const figliInput = document.getElementById("figli");

	function aggiornaVisibilità() {
		const conferma = document.querySelector('input[name="conferma"]:checked')?.value;
		if (conferma === "si") {
			partnerSection.style.display = "block";
			figliSection.style.display = "block";
		} else {
			partnerSection.style.display = "none";
			figliSection.style.display = "none";
			partnerFields.style.display = "none";
			etaContainer.innerHTML = "";
		}
	}
	// Gestione partner
	partnerInput.forEach(input => {
		input.addEventListener("change", () => {
			if (input.value === "si" && input.checked) {
				partnerFields.style.display = "block";
			} else if (input.value === "no" && input.checked) {
				partnerFields.style.display = "none";
			}
		});
	});
	// Gestione figli
	figliInput.addEventListener("input", () => {
		etaContainer.innerHTML = "";
		const numero = parseInt(figliInput.value) || 0;
		for (let i = 1; i <= numero; i++) {
			const label = document.createElement("label");
			label.textContent = `Età`;
			label.className = "form-label";
			const input = document.createElement("input");
			input.type = "number";
			input.name = `età`;
			input.className = "form-control";
			input.required = true;
			input.min = 0;
			const div = document.createElement("div");
			div.className = "mb-3";
			div.appendChild(label);
			div.appendChild(input);
			etaContainer.appendChild(div);
		}
	});
	// Cambi conferma
	confermaInputs.forEach(input => {
		input.addEventListener("change", aggiornaVisibilità);
	});
	aggiornaVisibilità(); // iniziale
  }

function fetchDati(){
  document.getElementById("rsvp-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {};
    debugger;
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Aggiunge le età dei bambini se presenti
    const numBambini = parseInt(data.figli || 0);
    for (let i = 1; i <= numBambini; i++) {
      const eta = document.getElementById(`etai`);
      if (eta) data[`eta{i}`] = eta.value;
    }

    debugger;
    sendDataToSheet(data);
  });
}

async function sendDataToSheet(data) {
    const url = 'https://script.google.com/macros/s/AKfycbzM3bn60tNY4rqUe8WHrIsN6gQKtfy9Tth6UfeW-oUQemkeKjPkUFDHkww0z2R3yvML1Q/exec';

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data), // Invia i dati come JSON
    });
    const result = await response.text();
    if(response.ok){
      alert("Conferma inviata!");
    }else{
      alert("Errore durante l'invio.");
    }
    console.log(result);
}

document.addEventListener("DOMContentLoaded", function() {
	countdown();

  gestioneCampiConferma();

  fetchDati();
});

/**
 * Apply .scrolled class to the body as the page is scrolled down
 */
function toggleScrolled() {
	const selectBody = document.querySelector('body');
	const selectHeader = document.querySelector('#header');
	if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
	window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
}
document.addEventListener('scroll', toggleScrolled);
window.addEventListener('load', toggleScrolled);
/**
 * Mobile nav toggle
 */
const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

function mobileNavToogle() {
	document.querySelector('body').classList.toggle('mobile-nav-active');
	mobileNavToggleBtn.classList.toggle('bi-list');
	mobileNavToggleBtn.classList.toggle('bi-x');
}
mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
/**
 * Hide mobile nav on same-page/hash links
 */
document.querySelectorAll('#navmenu a').forEach(navmenu => {
	navmenu.addEventListener('click', () => {
		if (document.querySelector('.mobile-nav-active')) {
			mobileNavToogle();
		}
	});
});
/**
 * Toggle mobile nav dropdowns
 */
document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
	navmenu.addEventListener('click', function(e) {
		e.preventDefault();
		this.parentNode.classList.toggle('active');
		this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
		e.stopImmediatePropagation();
	});
});
/**
 * Preloader
 */
const preloader = document.querySelector('#preloader');
if (preloader) {
	window.addEventListener('load', () => {
		preloader.remove();
	});
}
/**
 * Scroll top button
 */
let scrollTop = document.querySelector('.scroll-top');

function toggleScrollTop() {
	if (scrollTop) {
		window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
	}
}
scrollTop.addEventListener('click', (e) => {
	e.preventDefault();
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
});
window.addEventListener('load', toggleScrollTop);
document.addEventListener('scroll', toggleScrollTop);
/**
 * Animation on scroll function and init
 */
function aosInit() {
	AOS.init({
		duration: 600,
		easing: 'ease-in-out',
		once: true,
		mirror: false
	});
}
window.addEventListener('load', aosInit);
/**
 * Animate the skills items on reveal
 */
let skillsAnimation = document.querySelectorAll('.skills-animation');
skillsAnimation.forEach((item) => {
	new Waypoint({
		element: item,
		offset: '80%',
		handler: function(direction) {
			let progress = item.querySelectorAll('.progress .progress-bar');
			progress.forEach(el => {
				el.style.width = el.getAttribute('aria-valuenow') + '%';
			});
		}
	});
});
/**
 * Initiate glightbox
 */
const glightbox = GLightbox({
	selector: '.glightbox'
});
/**
 * Init isotope layout and filters
 */
document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
	let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
	let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
	let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
	let initIsotope;
	imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
		initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
			itemSelector: '.isotope-item',
			layoutMode: layout,
			filter: filter,
			sortBy: sort
		});
	});
	isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
		filters.addEventListener('click', function() {
			isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
			this.classList.add('filter-active');
			initIsotope.arrange({
				filter: this.getAttribute('data-filter')
			});
			if (typeof aosInit === 'function') {
				aosInit();
			}
		}, false);
	});
});
/**
 * Init swiper sliders
 */
function initSwiper() {
	document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
		let config = JSON.parse(
			swiperElement.querySelector(".swiper-config").innerHTML.trim()
		);
		if (swiperElement.classList.contains("swiper-tab")) {
			initSwiperWithCustomPagination(swiperElement, config);
		} else {
			new Swiper(swiperElement, config);
		}
	});
}
window.addEventListener("load", initSwiper);
/**
 * Correct scrolling position upon page load for URLs containing hash links.
 */
window.addEventListener('load', function(e) {
	if (window.location.hash) {
		if (document.querySelector(window.location.hash)) {
			setTimeout(() => {
				let section = document.querySelector(window.location.hash);
				let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
				window.scrollTo({
					top: section.offsetTop - parseInt(scrollMarginTop),
					behavior: 'smooth'
				});
			}, 100);
		}
	}
});
/**
 * Navmenu Scrollspy
 */
let navmenulinks = document.querySelectorAll('.navmenu a');

function navmenuScrollspy() {
	navmenulinks.forEach(navmenulink => {
		if (!navmenulink.hash) return;
		let section = document.querySelector(navmenulink.hash);
		if (!section) return;
		let position = window.scrollY + 200;
		if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
			document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
			navmenulink.classList.add('active');
		} else {
			navmenulink.classList.remove('active');
		}
	})
}
window.addEventListener('load', navmenuScrollspy);
document.addEventListener('scroll', navmenuScrollspy);
