/*-----------------------------------------------
# Preloader
-----------------------------------------------*/
$(window).on('load', function() {
	if ($('#preloader').length) {
		$('#preloader').delay(100).fadeOut('slow', function() {
			$(this).remove();
		});
	}
});
/*==================================================
    #Back to Top Button
==================================================*/
$(window).scroll(function() {
	if ($(this).scrollTop() > 100) {
		$('.backtotop').fadeIn(100);
	} else {
		$('.backtotop').fadeOut(100);
	}
});
$('.backtotop').click(function() {
	$("html, body").animate({
		scrollTop: 0
	}, 100);
	return false;
});

$(document).ready(function() {
	/* ==================================================
	    # Copyright year auto update
	================================================== */
	$('#copyright_year').html(new Date().getFullYear());
	/*==================================================
	    # Sticky Header
	==================================================*/
	function stickyHeader() {
		if ($(window).scrollTop() > 1) {
			$('header').addClass("sticky");
		} else {
			$('header').removeClass("sticky");
		}
	}
	stickyHeader();
	$(window).scroll(function() {
		stickyHeader();
	});
	/*==================================================
	    # Smooth Scroll
	==================================================*/
	if ($(".navbar-nav").length) {
		$(".navbar-nav a[href^='#']").on('click', function(event) {
			event.preventDefault();
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top - 71
			}, 500);
		});
	}
	/*==================================================
	    # Collapse Navbar
	==================================================*/
	$('.navbar-nav a').on('click', function() {
		$('.navbar-collapse').collapse('hide');
	});
	/*==================================================
        Parallax
	==================================================*/
	if ($(".parallax").length) {
		$('.parallax').jarallax();
	}
	/*==================================================
	    Application Form
	==================================================*/
	if ($("#order-form").length) {
		$("#order-form").validate({
			errorPlacement: function(error, element) {
				return true;
			},
			rules: {
				first_name: {
					required: true,
					minlength: 3
				},
				email: {
					required: true,
					email: true
				},
				company_name: {
					required: true,
				},
				billing_address: {
					required: true,
				},
				city: {
					required: true,
				},
				state: {
					required: true,
				},
				country: {
					required: true,
				},
				zip: {
					required: true,
				},
			},
			submitHandler: function(form) {
				var formData = $('#order-form').serialize();
				$.ajax({
					type: 'POST',
					url: 'assets/php/order-form.php',
					dataType: "json",
					data: formData,
					success: function(data) {
						if (data.success) {
							$('.form-status').addClass('alert alert-success');
							$('.form-status').text('Your Message Has been Sent Successfully');
							form.submit();
							$('.form-status').slideDown().delay(3000).slideUp();
							$("#order-form").trigger("reset");
						} else {
							$('.form-status').addClass('alert alert-danger');
							$('.form-status').text('Error Occurred, Please Try Again');
							$('.form-status').slideDown().delay(3000).slideUp();
						}
					},
					error: function(xhr, status, error) {
						$('.form-status').addClass('alert alert-danger');
						$('.form-status').text('Something Went Wrong');
						$('.form-status').slideDown().delay(3000).slideUp();
					}
				});
			}
		});
	}
});