class CharacterLimitedField

	constructor: (@field)->
		@limit = @field.data().limit
		@field.keydown @checkLimit
		@field.keyup @truncate # handle pasting

	ignoredKeys: [8,46,37,38,39,40,13,9,16,91,17]

	ignoredCode: (pressedCode)->
		(if !allowed then allowed = pressedCode == code) for code in @ignoredKeys
		allowed

	checkLimit: (event) => 
		over = !@ignoredCode(event.keyCode) and @field.val().length >= @limit
		return false if over

	truncate: =>
		if @field.val().length >= @limit			
			@field.val @field.val().slice 0,@limit
			



#=================================== jQuery binder:
$.fn.enforceCharacterLimit = ->
	$(@).each ->
		field = $(@)
		unless field.data 'limited'
			new CharacterLimitedField field
			field.data 'limited', true