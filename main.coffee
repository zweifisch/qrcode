
getQuery = (name)->
	params = (param.split '=' for param in window.location.href.slice(window.location.href.indexOf('?') + 1).split '&')
	ret= {}
	ret[key] = val for [key,val] in params
	if name then ret[name] else ret

getTable = (text, size, bg, fg)->
	qrcode = new QRCode -1, QRErrorCorrectLevel.H
	qrcode.addData text
	qrcode.make()
	counts = qrcode.getModuleCount()
	tds = ("""<td style="width: #{size}px; background: #{if qrcode.isDark(row, col) then bg else fg}"></td>""" for col in [0...counts] for row in [0...counts])
	trs = ("""<tr style="height: #{size}px">#{row.join ''}</tr>""" for row in tds)
	"""<table style="width: #{size*counts}px; height: #{size*counts}px">#{trs.join ''}</table>"""
	
gen = (text)->
	qrcode = document.getElementById 'qrcode'
	size = Math.min qrcode.clientWidth, qrcode.clientHeight
	qrcode.innerHTML = getTable text, Math.min(10, Math.floor(size/21)), '#000', '#fff'

window.go = ->
	text = document.getElementById('text').value
	if text
		[base] = window.location.href.split '?'
		window.location.href = "#{base}?text=#{encodeURIComponent text}"

text = getQuery 'text'
if text
	gen decodeURIComponent text
