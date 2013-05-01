#========================= polyfills	
# Modernizr.load 
# 	test: Modernizr.input.placeholder
# 	nope: 'js/polyfills/placeholder.js'

	
#========================= namespace
@pocLib = 
	forms: []
	selections: {}
	environment: {}


#======================== initializations & domready bindings
$ ->

	#=== common selection caching + environmental capture:
	pocLib.selections.body = $ document.body
	pocLib.selections.html = $ 'html'
	form = $ 'form[action="complete.html"]'

	#=== bind form on account section (only)
	if form.length 
		main_form = new Form $('form[action="complete.html"]'), false #this bool eliminates error report summary display

	#=== Credit Card change state
	$('#cvv input').remote_focus $ "#card_imagery"

	form_nav_links = $ 'body > nav a'

	$('#preferences section').personalize()

	$("[data-modal-id]").modalize()


	#============== the "advance" event fires each time the user advances to the next fieldset:

	$(main_form).bind("advance", -> 

		#===== dom selections (with caching):
		pocLib.selections.profile_widget ?= $ '#profile_widget'
		profile_widget = pocLib.selections.profile_widget
		pocLib.selections.promo_boxes ?= $ '.promo-box', profile_widget
		promo_boxes = pocLib.selections.promo_boxes

		#===== highlight nav:
		form_nav_links
			.removeClass('active')
			.eq(@current_fieldset_index+1).addClass "active"	

		# console.log @offset_handle.attr('class')

		unless @current_fieldset_index is 3
			#===== slide fieldsets over:	
			@offset_handle
				.stop(true, false)
				.animate {"margin-left": "-#{@current_fieldset_index*100}%"}, 500, "swing"
		switch @current_fieldset_index
			when 0  
				profile_widget.delay(500).fadeIn 750
				promo_boxes
					.not(':eq(0)').slideUp(500).end()
					.filter(':eq(0)').delay(1000).slideDown 500
			when 1 
				promo_boxes
					.not(':eq(1)').slideUp(500).end()
					.filter(':eq(1)').delay(1000).slideDown 500
			when 2
				promo_boxes
					.not(':eq(2)').slideUp(500).end()
					.filter(':eq(2)').delay(1000).slideDown 500
		)
		.trigger("advance")
		.bind "post", ->

			#===== dom selections (with caching):
			pocLib.selections.profile_widget ?= $ '#profile_widget'
			profile_widget = pocLib.selections.profile_widget

			# white overlay:
			$('<div />', {class: "cover"}).appendTo(@house).fadeTo(500,.8)

			# actually submit form:
			setTimeout (=>@house.unbind().submit()), 2500
			profile_widget.fadeOut 500 
			false

	#======================== ie 7 conditional hacks		
	if pocLib.selections.html.hasClass('lt-ie8')
		$(':input').focus(->
			$(this).addClass 'focus'
		).blur ->
  			$(this).removeClass 'focus'
