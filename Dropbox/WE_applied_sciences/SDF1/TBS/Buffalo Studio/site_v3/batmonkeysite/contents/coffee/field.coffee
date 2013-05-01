
class Field
	
	constructor: (@house,@fieldset)->
		d = @house.data()
		@validation_method = d.validate || false
		@error_message = d.errorMessage || "invalid field"
		@input = $ 'input', @house
		@input
			.keyup(@check_value)
			.blur @check_value
		@requires_validation = @validation_method || @house.is '.required'
		@valid = !@requires_validation
		

	check_value: (event) =>
		if @requires_validation
			if @is_valid() then @accept_value() else @reject_value !event or event.type is "blur"
		else true

	is_valid: ->
		@valid = pocLib.validator.test @validation_method, @input

	accept_value: ->
		@house
			.removeClass('field-with-errors')
			.addClass 'completed'

	reject_value: (apply_error_class) ->
		@house
			.addClass(if apply_error_class then 'field-with-errors' else null)
			.removeClass 'completed'

	report_errors: ->
		if @valid then null else @error_message

#======================== jQuery binder
# $.fn.fieldify = (fieldset)->
# 	$(@).each -> new Field $(@), fieldset




