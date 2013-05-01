class Fieldset

	constructor: (@house, @form, @show_error_reports=false)->
		self = @
		field_rows = $ '.field', @house
		@fields = []
		prepared_fields = @fields
		field_rows.each -> prepared_fields.push new Field $(@), self

	is_valid: =>
		@errors = []
		for field in @fields
			field.check_value()
			error = field.report_errors()
			@errors.push error if error
		if @show_error_reports
			if @errors.length > 0 then @show_errors() else @clear_errors()
		@errors.length is 0
			

	show_errors: ->
		@error_list?.remove()
		@error_list = $('<ul />', {class: "fieldset_errors"})
		for error in @errors
			$('<li />', {text: error}).appendTo @error_list
		@house.prepend @error_list

	clear_errors: ->
		@error_list?.remove()





#======================================== jQuery binder:
# $.fn.fieldsetify = (form) ->
# 	$(@).each -> new Fieldset $(@), form