ab_content = $ '.about-content'
ab_contentW = ab_content.find('.container').width()
col = ab_content.find '.column'
colW = col.width()
colNum = ab_contentW/colW
colNum = (if colNum > 1 then Math.floor  colNum else Math.ceil colNum)

if colNum is 1
	for curEl in col
		curEl = Array::pop.apply(col)
		$(curEl).css {"border": "none"}
else
	els = (for curEl in [col.length-1..0] by -1 when colNum > 0
					colNum--;
					Array::pop.apply(col)

				)
	$(curEl).css("border-bottom": "none") for curEl in els




