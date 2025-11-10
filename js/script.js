// Insert current year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.getElementById('primary-navigation');
if(navToggle && primaryNav){
	navToggle.addEventListener('click', ()=>{
		const isVisible = primaryNav.getAttribute('data-visible') === 'true';
		primaryNav.setAttribute('data-visible', String(!isVisible));
		navToggle.setAttribute('aria-expanded', String(!isVisible));
	});

	// close nav when pressing Escape
	document.addEventListener('keydown', (e)=>{
		if(e.key === 'Escape'){
			primaryNav.setAttribute('data-visible','false');
			navToggle.setAttribute('aria-expanded','false');
		}
	});
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
	link.addEventListener('click', function(e){
		const targetId = this.getAttribute('href').slice(1);
		if(!targetId) return;
		const target = document.getElementById(targetId);
		if(target){
			e.preventDefault();
			target.scrollIntoView({behavior:'smooth',block:'start'});
			// close mobile nav after click
			if(primaryNav) { primaryNav.setAttribute('data-visible','false'); navToggle && navToggle.setAttribute('aria-expanded','false'); }
			history.replaceState(null, '', '#'+targetId);
		}
	});
});

// Simple form validation + inline error messages
const form = document.getElementById('contactForm');
if(form){
	const name = form.elements['name'];
	const email = form.elements['email'];
	const message = form.elements['message'];

	function setError(el, msg){
		if(!el) return;
		el.classList.add('invalid');
		el.setAttribute('aria-invalid','true');
		const desc = el.getAttribute('aria-describedby');
		if(desc){
			const node = document.getElementById(desc);
			if(node) node.textContent = msg || '';
		}
	}
	function clearError(el){
		if(!el) return;
		el.classList.remove('invalid');
		el.removeAttribute('aria-invalid');
		const desc = el.getAttribute('aria-describedby');
		if(desc){
			const node = document.getElementById(desc);
			if(node) node.textContent = '';
		}
	}

	// clear errors while typing
	[name,email,message].forEach(el=>{
		if(!el) return;
		el.addEventListener('input', ()=>clearError(el));
	});

	form.addEventListener('submit', (e)=>{
		e.preventDefault();
		let firstInvalid = null;
		// name validation
		if(!name.value || name.value.trim().length < 2){
			setError(name, 'Nombre requerido (mínimo 2 caracteres).');
			firstInvalid = firstInvalid || name;
		} else {
			clearError(name);
		}
		// email validation
		const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
		if(!email.value || !emailRe.test(email.value)){
			setError(email, 'Correo inválido.');
			firstInvalid = firstInvalid || email;
		} else {
			clearError(email);
		}
		// message (optional but give feedback if too short)
		if(message && message.value && message.value.trim().length > 0 && message.value.trim().length < 6){
			setError(message, 'El mensaje es muy corto. Agrega más detalles.');
			firstInvalid = firstInvalid || message;
		} else if(message){
			clearError(message);
		}

		if(firstInvalid){
			firstInvalid.focus();
			// also show the existing alert for accessibility/fallback
			alert('Por favor corrige los errores en el formulario.');
			return;
		}

		// Placeholder: aquí enviarías el formulario al servidor
		alert('Mensaje enviado. Gracias, ' + (name.value || '') + '!');
		form.reset();
		// clear any lingering errors
		[name,email,message].forEach(clearError);
	});
}

// add class to body to trigger animations when DOM is loaded
document.addEventListener('DOMContentLoaded', ()=>{
	// Run hero animation only the first time the user visits (persist in localStorage)
	try{
		const key = 'heroAnimationShown_v1';
		const shown = localStorage.getItem(key);
		if(!shown){
			// allow browser paint then trigger animation
			window.setTimeout(()=>{
				document.body.classList.add('is-loaded');
				try{ localStorage.setItem(key, '1'); }catch(e){}
			}, 80);
		}else{
			// ensure the illustration is visible without animation on repeat visits
			document.body.classList.add('no-anim');
		}
	}catch(e){
		// fallback: always animate if storage fails
		window.setTimeout(()=>document.body.classList.add('is-loaded'), 80);
	}
});