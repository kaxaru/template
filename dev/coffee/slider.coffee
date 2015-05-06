class slider
		constructor: (@el, numOnPage, time, width) ->
			@numOnPage = numOnPage or 1;
			@time = time or .73 
			#@width = width or @setWidth()
		init: ->
			do @setElsSlide
			do @control
			do @events
			return
		control: ->
			controlEl = @blockEls.find 'div[class$=control]'
			listControl = $ '<ul></ul>'
			listControl.append $('<li></li>').addClass 'slide' + i for i in [0...@elsSlide.length]
			listControl.children().first().addClass 'active'
			controlEl.append listControl
			return
		setElsSlide: ->
			@blockEls = $ 'div[class^='+@el.slice(1)+']'
			@elsSlide = if @blockEls.find('li[class$=el]').length is 0
					@blockEls.find('div[class$=el]')
				else
					 @blockEls.find('li[class$=el]')
			return
		setWidth: ->
			@width = @elsSlide[0].offsetWidth
			return
		events: ->
			$('li[class^=slide]').on 'click', @clickSlide
		clickSlide: (e)=> # i don't known about this thing like =>  
			do e.preventDefault
			classListEl = $ e.target.classList
			if 'active' in classListEl
				return
			else
				elSlideNum = classListEl[0].slice(-1)
				#search click element at slider
				controlBlock = $(e.target).parent().parent()
				controlBlockClass = controlBlock[0].classList[0]
				sliderBlockClass = controlBlockClass.slice(0,controlBlockClass.indexOf('__'))
				sliderBlock = $ '.' + sliderBlockClass
				elsSlide = sliderBlock.find 'li[class$=el]'
				#search active element
				activeSlide = controlBlock.find('.active')
				activeSlideClassL = activeSlide[0].classList
				activeSlideNum =(currentClass.slice(-1) for currentClass in activeSlideClassL when currentClass.includes 'slide')
				if activeSlideNum.length is 1
					activeSlide.removeClass 'active'
					$(e.target).addClass 'active'
					if +activeSlideNum[0] < +elSlideNum #then
						@forward +elSlideNum, +activeSlideNum[0]
					else
						@backward +elSlideNum, +activeSlideNum[0]
				return
		forward: (clickNum, activeNum)=>
				do @setWidth
				offsetEls = clickNum - activeNum
				for el, i in @elsSlide when i < clickNum
					mLeft = $(el).css('margin-left') if $(el).css('margin-left')?
					mLeft = +mLeft.slice(0, mLeft.length - 2)
					TweenMax.to el, @time, {css: {'margin-left': -(@width + 40)*offsetEls+mLeft , ease: Elastic.easeOut}}
					offsetEls-- if i >= activeNum
				return
		backward: (clickNum, activeNum)=>
			#clickNum = @elsSlide.length - 1 - clickNum
			#activeNum = @elsSlide.length - 1 - activeNum
			#elsSlideRev = @elsSlide.slice(0)
			#elsSlideRev = Array::reverse.apply(elsSlideRev)
			offsetEls = activeNum - clickNum
			for el, i in @elsSlide
				mLeft = $(el).css('margin-left') if $(el).css('margin-left')?
				mLeft = +mLeft.slice(0, mLeft.length - 2)
				offset = (@width + 40)*offsetEls+mLeft
				offset = 0 if offset > 0
				TweenMax.to el, @time, {css: {'margin-left': offset, ease: Elastic.easeOut}}
				offset-- if i >= clickNum and offset > 0
			return

if !!($ '.content-slider')
	content_slider = new slider '.content-slider',2,.8
	do content_slider.init 

if !!($ '.about-wordpress')
	about_slider = new slider '.about-wordpress'
	do about_slider.init

