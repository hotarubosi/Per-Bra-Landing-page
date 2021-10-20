/* ===================================================================
 * Viewport切り替え
=================================================================== */
$(function() {
var ua = navigator.userAgent;
if((ua.indexOf('Android') > 0 && ua.indexOf('Mobile') == -1) || ua.indexOf('iPad') > 0 || ua.indexOf('Kindle') > 0 || ua.indexOf('Silk') > 0){
	//タブレット
	$('head>meta[name="viewport"]').replaceWith('<meta name="viewport" content="width=1280">');
} else if ((ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) || ua.indexOf('iPhone') > 0 || ua.indexOf('Blackberry') > 0 || ua.indexOf('iPhone') > 0){
	//SP
	$('head>meta[name="viewport"]').replaceWith('<meta name="viewport" content="width=device-width, initial-scale=1">');
} else {
	//PC
	$('head>meta[name="viewport"]').replaceWith('<meta name="viewport" content="width=device-width, initial-scale=1">');
}
});

$(function() {

$(window).resize(function(){
	$('#oden .title, #printer .title, #cube .title, #sushisingularity .title').height( $(window).height() );
});
$(window).trigger('resize');

$('.menu ul a, .title .btn').click(function(){
	var speed = 500;
	var href= $(this).attr("href");
	var target = $(href === "#" || href === "" ? 'html' : href);
	var position = target.offset().top;
	$("html, body").animate({scrollTop:position}, speed, "swing");
	if($('.menu').hasClass('opened')){
		$('.menu').removeClass('opened');
	}
	return false;
});

var Slider ={
    init: function(){
    var $setElm = $('.loopslider');
    var slideTime = 15000; // スピード調整：スライド全体一周にかかる秒数（25000 = 25秒で一周）

    $setElm.each(function(){
        var classFilter = $(this).attr('rel'); // 'loopleft' or 'loopright'

        var targetObj = $(this);
        var loopsliderWidth = targetObj.width();
        var loopsliderHeight = targetObj.height();
        targetObj.children('ul').wrapAll('<div class="loopslider_wrap"></div>');

        var findWrap = targetObj.find('.loopslider_wrap');

if(window.matchMedia('(max-width:768px)').matches){
        var listWidth = findWrap.children('ul').children('li').width()+6;
}else{
        var listWidth = findWrap.children('ul').children('li').width()+12;
}
        var listCount = findWrap.children('ul').children('li').length;

        var loopWidth = (listWidth)*(listCount);

        findWrap.css({
            top: '0',
            left: '0',
            width: ((loopWidth) * 2),
            height: (loopsliderHeight),
            overflow: 'hidden',
            position: 'absolute'
        });

        findWrap.children('ul').css({
            width: (loopWidth)
        });

        if(classFilter == 'loopleft') {
            loopPosLeft();
            findWrap.children('ul').clone().appendTo(findWrap);
        }
        if(classFilter == 'loopright') {
            loopPosRight();
            findWrap.children('ul').clone().prependTo(findWrap);
        }

        function loopPosLeft(){
            findWrap.css({left:'0'});
            findWrap.stop().animate({left:'-' + (loopWidth) + 'px'},slideTime,'linear');
            setTimeout(function(){
                loopPosLeft();
            },slideTime);
        };
        function loopPosRight(){
            var wrapWidth = findWrap.width();
            findWrap.css({left:'-' + ((wrapWidth) / 2) + 'px'});
            findWrap.stop().animate({left:'0'},slideTime,'linear');
            setTimeout(function(){
                loopPosRight();
            },slideTime);
        };
    });
    }
}

// 実行
$('.projects').imagesLoaded( { background: true }, function() {
	Slider.init();
});

window.sr = ScrollReveal().reveal( '.sr', {
	delay: 50,
	distance: '40px',
	scale: 1,
	reset:true,
	easing:'cubic-bezier(0.39, 0.575, 0.565, 1)',
	viewFactor:0.4
});

function changeContents(url) {
	$("#foodBasePop").load(url+" .detail", function(){
		$('#foodBasePop').append('<a href="javascript:void(0);" class="hover"><img src="../img/index/btn_close.png" alt="" class="close"></a>').fadeIn();
		$('#foodBasePop .detail').fadeIn(function(){
			var popHeight = $('#foodBasePop .detail').height();
			$('#foodBasePop').css({height: popHeight});
		});
	});
}
function movieClose(){
	mVideo = document.getElementById("video");
	mVideo.addEventListener("ended", function(){
		$('#foodBasePop').fadeOut(function(){
			$('#mask, #foodBasePop').remove();
		});
	}, true);
};
var popHeight = 0;
var scrollTop = 0;
$(document).on('click', '.loopslider a', function(e){
	e.preventDefault();
	scrollTop = $(window).scrollTop();
	var popUpID = $(this).attr('href');
	if(window.matchMedia('(max-width:768px)').matches){
		popHeight = $('#foodBasePop .detail').height();
		$('#foodBasePop').css({top: scrollTop + 10});
	}else{
		$('#foodBasePop').css({top: scrollTop + 50});
	}
	$('#mask').fadeIn(300, function(){
		$('#foodBasePop').fadeIn(300, function(){
			$(popUpID).fadeIn(300, function(){
				popHeight = $(popUpID).height();
				$('#foodBasePop').css({height: popHeight});
			});
		});
	});
});
$(document).on('click', '#foodBasePop .left a, #foodBasePop .right a', function(e){
	e.preventDefault();
	var popUpID = $(this).attr('href');
	if($('.printBtn').hasClass('stop')){
		$('.printBtn').removeClass('stop');
		$('.printing').removeClass('show');
		setTimeout(function(){
			$('.printing').remove();
		}, 600);
	}
	$('#foodBasePop .detail').fadeOut(function(){
		setTimeout(function(){
			$(popUpID).fadeIn(300, function(){
				popHeight = $(popUpID).height();
				$('#foodBasePop').css({height: popHeight});
			});
		}, 500);
	});
});
$(document).on('click', '#foodBasePop .movie', function(e){
	e.preventDefault();
	var movieURL = $(this).attr('href');
	$('#foodBasePop .detail').fadeOut(function(){
		$('#foodBasePop .detail').remove();
		setTimeout(function(){
			$('#foodBasePop').append('<div class="videoBlock"><video id="video" autoplay muted playsinline><source src="' + movieURL + '" type="video/mp4"></video></div>');
			movieClose();
		}, 500);
	});
});
$(document).on('click', '#foodBasePop .printBtn', function(){
	if(!$(this).hasClass('stop')){
		$(this).addClass('stop');
		var stopID = $(this).closest('.detail').attr('id');
		if(window.matchMedia('(max-width:768px)').matches){
			$('#' + stopID + ' .bg').append('<figure class="printing"><img src="../img/projects/aimg_printing_sp.gif"></figure>');
		}else{
			$('#' + stopID + ' .bg').append('<figure class="printing"><img src="../img/projects/aimg_printing.gif"></figure>');
		}
		setTimeout(function(){
			$('.printing').addClass('show');
		}, 100);
	}else{
		$(this).removeClass('stop');
		$('.printing').removeClass('show');
		setTimeout(function(){
			$('.printing').remove();
		}, 600);
	}
});
$(document).on('click', '#foodBasePop .close, #mask', function(){
	$('#mask').fadeOut(300);
	$('#foodBasePop').fadeOut(function(){
		$('#foodBasePop .detail').hide();
	});
});

$('.menuBtn').click(function(){
	$('.menu').toggleClass('opened');
});

if(window.matchMedia('(min-width:769px)').matches){
	$('#menu2').closest('li').hover(function(){
		$(this).children('.projectMenu').stop(true).slideDown(300, function(){$(this).css({height: ''});});
	}, function(){
		$(this).children('.projectMenu').stop(true).slideUp(300, function(){$(this).css({height: ''});});
	});
	$('.anchorOpen').hover(function(){
		$(this).children('.anchorMenu').stop(true).slideDown(300, function(){$(this).css({height: ''});});
	}, function(){
		$(this).children('.anchorMenu').stop(true).slideUp(300, function(){$(this).css({height: ''});});
	});
}

var scrollTop = 0;
$('.popLink .btn').click(function(){
	scrollTop = $(window).scrollTop();
	if(!$(this).hasClass('eng')){
		if(window.matchMedia('(max-width:768px)').matches){
			$('body').append('<div id="mask"></div><div id="pop"><img src="../img/index/txt_sect2_02_sp.png" alt=""><a href="javascript:void(0);" class="hover btmClose"><img src="../img/index/btn_close_01_sp.png" alt=""></a><a href="javascript:void(0);" class="hover closeBtn"><img src="../img/index/btn_close.png" alt=""></a></div>');
			$('#pop').css({top: scrollTop + 10}).fadeIn();
		}else{
			$('body').append('<div id="mask"></div><div id="pop"><img src="../img/index/txt_sect2_02.png" alt=""><a href="javascript:void(0);" class="hover btmClose"><img src="../img/index/btn_close_01_sp.png" alt=""></a><a href="javascript:void(0);" class="hover closeBtn"><img src="../img/index/btn_close.png" alt=""></a></div>');
			$('#pop').css({top: scrollTop + 95}).fadeIn();
		}
	}else{
		if(window.matchMedia('(max-width:768px)').matches){
			$('body').append('<div id="mask"></div><div id="pop"><img src="../img/index/txt_sect2_02_sp_e.png" alt=""><a href="javascript:void(0);" class="hover btmClose"><img src="../img/index/btn_close_01_sp.png" alt=""></a><a href="javascript:void(0);" class="hover closeBtn"><img src="../img/index/btn_close.png" alt=""></a></div>');
			$('#pop').css({top: scrollTop + 10}).fadeIn();
		}else{
			$('body').append('<div id="mask"></div><div id="pop"><img src="../img/index/txt_sect2_02_e.png" alt=""><a href="javascript:void(0);" class="hover btmClose"><img src="../img/index/btn_close_01_sp.png" alt=""></a><a href="javascript:void(0);" class="hover closeBtn"><img src="../img/index/btn_close.png" alt=""></a></div>');
			$('#pop').css({top: scrollTop + 95}).fadeIn();
		}
	}
});
$(document).on('click', '#pop .btmClose, #pop .closeBtn, #mask', function(){
	$('#pop').fadeOut(function(){
		$('#mask, #pop').remove();
	});
});


});