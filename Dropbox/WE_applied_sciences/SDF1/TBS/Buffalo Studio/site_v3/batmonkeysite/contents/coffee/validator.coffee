
class Validator

	constructor: ->
		#=== you can pass ?disable_validation in query string: 
		@disabled = $.inArray("disable_validation",location.search.substr(1).split("&")) != -1

	test: (method,input)->
		unless @disabled
			if @[method]
				return @[method] input
			else
				return @not_empty input
		else true


	#================================================ methods:

	not_empty: (input)->
		input.val().length > 0

	email: (input)->
		input.val().match @patterns.email

	checked: (input)->
		input.is ':checked'

	match: (input)->
		input.val() is $("##{input.parent().data().matchedFieldId}").val()

	password: (input)->
		input.val().length > 0
		# input.val().match @patterns.password

	phone: (input) ->
		input.val().match @patterns.phone



	#================================================ regular expressions:
	patterns: 

		email: /// ^ # start regular expression
			([\w.-]+)         #one or more letters, numbers, _ . or -
			@                 #followed by an @ sign
			([\w.-]+)         #then one or more letters, numbers, _ . or -
			\.                #followed by a period
			([a-zA-Z.]{2,6})  #followed by 2 to 6 letters or periods
			$ ///i            #end of line and ignore case
		
		password: /// ^
			(?=.*\d)
			(?=.*[a-z])
			(?=.*[A-Z])
			(?!.*\s).{6,32}
			$ ///i

		phone: ///^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$///i



		

pocLib.validator = new Validator() 
