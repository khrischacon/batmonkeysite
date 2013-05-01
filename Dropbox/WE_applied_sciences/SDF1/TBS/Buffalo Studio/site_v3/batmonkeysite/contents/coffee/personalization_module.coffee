class PersonalizationModule

	speed: 500

	constructor: (@house)->
		@opened = false
		@details = $ 'fieldset', @house
		$('.action a, header',@house).click @toggle_details

	toggle_details: =>
		if @opened then @hide_details() else @show_details()
		false

	show_details: ->
		@details.stop(true, false).slideDown @speed
		@house.addClass "opened"
		@opened = true

	hide_details: ->
		@details.stop(true, false).slideUp @speed
		@house.removeClass("opened").addClass "edited"
		@opened = false






$.fn.personalize = ->
	$(@).each -> new PersonalizationModule $ @