// Code adapted from https://www.codeply.com/go/zjZsn1ly29

const $ = require('jquery');

$('#deviceCarousel').carousel({
	interval: 10000
})

$('#groupCarousel').carousel({
	interval: 10000
})

$('.carousel .carousel-item').each(function () {
	var minPerSlide = 4;
	var next = $(this).next();
	if (!next.length) {
		next = $(this).siblings(':first');
	}
	next.children(':first-child').clone().appendTo($(this));

	for (let i = 0; i < minPerSlide; i++) {
		next = next.next();
		if (!next.length) {
			next = $(this).siblings(':first');
		}

		next.children(':first-child').clone().appendTo($(this));
	}
});
