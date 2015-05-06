icon = $ '.content__icon-el'
icon.on {
	'mouseenter': ->
		$(@).parent().find('.content__icon-text').css('color': 'red')
	,'mouseleave': ->
		$(@).parent().find('.content__icon-text').css('color': '#666666')
	}