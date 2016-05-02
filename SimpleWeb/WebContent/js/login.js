$(window, document, undefined)
		.ready(
				function() {

					var u = 'admin';
					var p = 'pass';
					$('input').blur(function() {
						var $this = $(this);
						if ($this.val())
							$this.addClass('used');
						else
							$this.removeClass('used');
					});

					var $ripples = $('.ripples');

					$ripples.on('click.Ripples', function(e) {

						var $this = $(this);
						var $offset = $this.parent().offset();
						var $circle = $this.find('.ripplesCircle');

						var x = e.pageX - $offset.left;
						var y = e.pageY - $offset.top;

						$circle.css({
							top : y + 'px',
							left : x + 'px'
						});

						$this.addClass('is-active');

					});

					$ripples
							.on(
									'animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd',
									function(e) {
										$(this).removeClass('is-active');
									});

					$('#login_btn').on(
							'click',
							function() {
								var user = $('#userid').val();
								var pwd = $('#password').val();
								if(user == '' || pwd == ''){
									return;
								}else if (user == u && pwd == p) {
									sessionStorage.setItem('auth', 'authenticated');
									window.location = './iPet.html';
									return false;
								} else {
									$('#error').removeClass('hidden');
									return false;
								}
							});

				});