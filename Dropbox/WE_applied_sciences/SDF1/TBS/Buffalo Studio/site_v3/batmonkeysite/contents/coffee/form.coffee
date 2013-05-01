class Form

	speed: 500

	constructor: (@house, show_error_reports=true)->
		self = @
		bound_sets = []
		@current_fieldset_index = 0
		@house.submit @process_submission
		sets = @house.children('fieldset').each ->
			bound_sets.push new Fieldset $(@), self, show_error_reports
		@fieldsets = bound_sets
		@offset_handle = @fieldsets[0].house
		if pocLib.selections.html.hasClass('lt-ie8')
			sets.wrapAll $('<div class="form_contents" />')			
			@offset_handle = sets.parent()



	process_submission: =>
		return false unless @current_fielset().is_valid()
		unless @current_fieldset_index is @fieldsets.length - 1 
			@advance_to_next_fieldset()			
		else
			$(@).trigger 'post'
		false

	advance_to_next_fieldset: ->
		unless @current_fieldset_index is @fieldsets.length - 1 
			@current_fieldset_index = @current_fieldset_index + 1
			$(@).trigger 'advance'

	current_fielset: ->
		@fieldsets[@current_fieldset_index]



# $.fn.formulate = (show_error_reports)->
# 	$(@).each -> new Form $(@), show_error_reports
	