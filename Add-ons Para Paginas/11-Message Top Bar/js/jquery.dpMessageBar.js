/*
 * jQuery DP Message Bar v1.0
 *
 * Copyright 2011, Diego Pereyra
 *
 * @Web: http://www.dpereyra.com
 * @Email: info@dpereyra.com
 *
 * Depends:
 * jquery.js
 */


(function($){
    $.fn.dpMessageBar = function(options) {
		
		/* Setting vars*/
		var opts, $t = $(this), element_id = $t.attr('id'), $list_arr, actual_pos, $arrow_left, $arrow_right, $arrow_show;
		
		opts = $.extend({}, $.fn.dpMessageBar.defaults, options);
		general_vars = $.extend({}, $.fn.dpMessageBar.general_vars, options);
		
		$.fn.dpMessageBar.defaults = opts;
		actual_pos = general_vars.actual_pos;
		$.fn.dpMessageBar.general_vars.element_id = element_id;
		
		$t.before($("<div />").attr('id', element_id));
		$t.addClass('dpMessageBar_list');
		$t.removeAttr('id');
		$("#"+element_id).append($t);
		$t = $("#"+element_id);
		$t.addClass('dpMessageBar').css("background-image", "url(css/dpMessageBar/"+opts.theme+"/bg.png)");
		
		$list_arr = $t.find('.dpMessageBar_list').find('li');
		$.fn.dpMessageBar.general_vars.list_arr = $list_arr;
		
		if(opts.showArrows) {
			$arrow_left = $("<a />").addClass('arrow_left').attr({href: 'javascript:void(0);', id: 'arrow_left'}).css("background-image", "url(css/dpMessageBar/"+opts.theme+"/arrows.png)");
			$arrow_right = $("<a />").addClass('arrow_right').attr({href: 'javascript:void(0);', id: 'arrow_right'}).css("background-image", "url(css/dpMessageBar/"+opts.theme+"/arrows.png)");
			
			$t.append($arrow_left);
			$t.append($arrow_right);
			
			$($arrow_left).click(function() {
				$.fn.dpMessageBar.prev();
			});
			
			$($arrow_right).click(function() {
				$.fn.dpMessageBar.start();
			});
		}

		$arrow_show = $("<a />").attr({href: 'javascript:void(0);', id: 'dpMessageBar_show'}).css("background-image", "url(css/dpMessageBar/"+opts.theme+"/show.png)");
		$t.after($arrow_show);
		
		$($arrow_show).click(function() {
			$.fn.dpMessageBar.show();
		});
		
		$arrow_hide = $("<a />").attr({href: 'javascript:void(0);', id: 'dpMessageBar_hide'}).css("background-image", "url(css/dpMessageBar/"+opts.theme+"/show.png)");
		$t.after($arrow_hide);
		
		$($arrow_hide).click(function() {
			$.fn.dpMessageBar.hide();
		});
		
		if(opts.position == "top") {
			$t.css("position", "relative");
			$arrow_show.css("position", "absolute");
			$arrow_hide.css("position", "absolute");
		}
		
		$.fn.dpMessageBar.hideMessages();
		$($list_arr[0]).show();
		if(opts.showArrows && !opts.loop) {
			$('#arrow_right').show();
			$('#arrow_left').hide();
		}
		
		if(opts.autoload) {
			$($arrow_show).css('marginTop', '-100px');
			general_vars.time_out = setTimeout("$.fn.dpMessageBar.start()", opts.delay);
		} else {
			
			$($t).css('marginTop', '-72px');
			$($arrow_hide).css('marginTop', '-144px');
		}
		
		if(opts.loadDelay > 0) {
			setTimeout("$.fn.dpMessageBar.show()", opts.delay);
		}
    };
	
	/* Default Parameters */
	$.fn.dpMessageBar.defaults = {  
		loop: true,
		autoload: true,
		speedAnimation: "slow",
		delay: 3000,
		loadDelay: 0,
		theme: "cream",
		showArrows: true,
		position: "fixed"
	};
	
	/* general_vars vars */
	$.fn.dpMessageBar.general_vars = {  
		actual_pos: 0,
		list_arr: '',
		time_out: '',
		element_id: '',
		disabled: false
	};  
	
	$.fn.dpMessageBar.start = function(){
		var opts = $.fn.dpMessageBar.defaults, general_vars = $.fn.dpMessageBar.general_vars, next_pos;
		
		if((general_vars.actual_pos <= (general_vars.list_arr.length - 1) && !general_vars.disabled)) {
			general_vars.disabled = true;
			if(opts.showArrows && !opts.loop) {
				if((general_vars.actual_pos + 1) >= (general_vars.list_arr.length - 1)) {
					$('#arrow_right').fadeOut('fast');
				} else {
					$('#arrow_right').fadeIn('fast');
				}
				$('#arrow_left').fadeIn('fast');
				
			}
			
			$(general_vars.list_arr[general_vars.actual_pos]).fadeOut(opts.speedAnimation, function(){
				if(opts.loop && general_vars.actual_pos >= (general_vars.list_arr.length - 1)) {
					next_pos = 0;
				} else {
					next_pos = (general_vars.actual_pos + 1);
				}
				$(general_vars.list_arr[next_pos]).fadeIn(opts.speedAnimation, function(){
					general_vars.actual_pos = next_pos;
					general_vars.disabled = false;
					
					clearTimeout(general_vars.time_out);
					general_vars.time_out = setTimeout("$.fn.dpMessageBar.start()", opts.delay);
					
					if(!opts.loop && (next_pos >= (general_vars.list_arr.length - 1))) {
						clearTimeout(general_vars.time_out);
						return false;
					}
				});
			});
			
			
		}
	};
	
	$.fn.dpMessageBar.prev = function(){
		var opts = $.fn.dpMessageBar.defaults, general_vars = $.fn.dpMessageBar.general_vars, next_pos;
		
		if((general_vars.actual_pos >= 0) && !general_vars.disabled) {
			general_vars.disabled = true;
			if(opts.showArrows && !opts.loop) {
				if((general_vars.actual_pos - 1) == 0) {
					$('#arrow_left').fadeOut('fast');
				} else {
					$('#arrow_left').fadeIn('fast');
				}
				$('#arrow_right').fadeIn('fast');
			}
			$(general_vars.list_arr[general_vars.actual_pos]).fadeOut(opts.speedAnimation, function(){
				if(opts.loop && (general_vars.actual_pos - 1) < 0) {
					next_pos = (general_vars.list_arr.length - 1);
				} else {
					next_pos = (general_vars.actual_pos - 1);
				}
				$(general_vars.list_arr[next_pos]).fadeIn(opts.speedAnimation, function(){
					general_vars.actual_pos = next_pos;
					general_vars.disabled = false;
					
					clearTimeout(general_vars.time_out);
					general_vars.time_out = setTimeout("$.fn.dpMessageBar.start()", opts.delay);
				});
			});
		}
		clearTimeout(general_vars.time_out);
	}; 
	
	$.fn.dpMessageBar.stop = function(){
		var opts = $.fn.dpMessageBar.defaults, general_vars = $.fn.dpMessageBar.general_vars;
		
		clearTimeout(general_vars.time_out);
	};
	
	$.fn.dpMessageBar.play = function(){
		var opts = $.fn.dpMessageBar.defaults, general_vars = $.fn.dpMessageBar.general_vars;
		
		$.fn.dpMessageBar.start();
	};
	
	$.fn.dpMessageBar.show = function(){
		var opts = $.fn.dpMessageBar.defaults, general_vars = $.fn.dpMessageBar.general_vars;
		
		clearTimeout(general_vars.time_out);
		
		$.fn.dpMessageBar.hideMessages();
		$.fn.dpMessageBar.general_vars.actual_pos = 0;
		$(general_vars.list_arr[0]).show();
		if(opts.showArrows && !opts.loop) {
			$('#arrow_right').show();
			$('#arrow_left').hide();
		}
		
		$('#dpMessageBar_show').animate({marginTop: '-100px'}, 500, function() {
			$('#'+general_vars.element_id).animate({marginTop: '0'}, {duration: opts.speedAnimation});
			$('#dpMessageBar_hide').animate({marginTop: '0'}, opts.speedAnimation);
			general_vars.time_out = setTimeout("$.fn.dpMessageBar.start()", opts.delay);
		});
		
	};
	
	$.fn.dpMessageBar.hide = function(){
		var opts = $.fn.dpMessageBar.defaults, general_vars = $.fn.dpMessageBar.general_vars;
		
		clearTimeout(general_vars.time_out);
		
		$('#'+general_vars.element_id).animate({marginTop: '-72px'}, opts.speedAnimation, function() {
			
			$('#dpMessageBar_show').animate({marginTop: '0'}, 500);
		});
		$('#dpMessageBar_hide').animate({marginTop: '-144px'}, opts.speedAnimation);
	};
	
	$.fn.dpMessageBar.hideMessages = function(){
		var opts = $.fn.dpMessageBar.defaults, general_vars = $.fn.dpMessageBar.general_vars;
		
		$(general_vars.list_arr).each(function(i) {
			$(this).hide();
		});
	};
	
}(jQuery));