

$(function () {

	var owl1 = $('#carousel1');
	owl1.owlCarousel({
		items:1,
		loop:true,
		margin:0,
		autoplay:true,
		autoplayTimeout:6000,
		autoplayHoverPause:true
	});
	$('.play').on('click',function(){
			owl1.trigger('play.owl.autoplay',[1000])
	})
	$('.stop').on('click',function(){
			owl1.trigger('stop.owl.autoplay')
	})
	
	var owl2 = $('#carousel2')
	owl2.owlCarousel({
		center: false,
		items:1,
		loop:true,
		margin:20,
		responsive:{
			479:{
				items:1
			},
			640:{
				items:2
			},
			991:{
				items:3
			},
			1199:{
				items:4
			},
			1600:{
				items:5
			}                        
		}
	});
	
	var owl3 = $('#carousel3')
	owl3.owlCarousel({
		center: false,
		items:1,
		loop:true,
		margin:20,
		responsive:{
			479:{
				items:1
			},
			640:{
				items:2
			},
			991:{
				items:3
			},
			1199:{
				items:4
			},
			1600:{
				items:5
			}                        
		}
	});

	/*
	var owl4 = $('#carousel4');
	owl4.owlCarousel({
		items:1,
		loop:true,
		margin:0,
		autoplay:true,
		autoplayTimeout:10000,
		autoplayHoverPause:true
	});
	$('.play').on('click',function(){
			owl1.trigger('play.owl.autoplay',[1000])
	})
	$('.stop').on('click',function(){
			owl1.trigger('stop.owl.autoplay')
	})
	*/

});