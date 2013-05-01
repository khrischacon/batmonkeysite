class ToolTip

	speed: 250

	all_tips: []

	constructor: (@trigger)->
		@trigger.click @toggle_tip
		@active = false
		@details_pane = @trigger.siblings '.tip'
		#register this tip in the all_tips array:
		ToolTip::all_tips.push @

	toggle_tip: (event)=>
		event.preventDefault()
		if @active then @conceal() else @reveal()

	conceal: ->
		@active = false
		@details_pane.stop(true, false).slideUp @speed
		@trigger.removeClass 'active'

	reveal: ->
		tip.conceal() for tip in ToolTip::all_tips
		@active = true
		@details_pane.stop(true, false).slideDown @speed
		@trigger.addClass 'active'



$.fn.tooltipify = ->
	$(@).each -> new ToolTip $ @




