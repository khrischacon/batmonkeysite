
$.fn.remote_focus = (remote_target)->
	$(@).each ->		
		$(@).focus(->
			remote_target.addClass "focus"
		).blur ->
			remote_target.removeClass "focus"

