$(function(){
	$('.banner-tab-item').click(function(){
		$('.banner-tab-item').removeClass('active');
		$(this).addClass('active');
		$('.biometric').css('display','none');
		var _obj = $('.biometric').eq($(this).index());
		_obj.css('display','block')
	})
})