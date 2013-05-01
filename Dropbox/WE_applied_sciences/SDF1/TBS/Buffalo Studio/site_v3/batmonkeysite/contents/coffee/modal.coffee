
class ModalShell

	fadeSpeed: 500

	screen: $('<div />', {'class': 'modalScreen'})

	house: $('<div />', {'class': 'modalHouse'})

	closeButton: $('<abbr />', {text: 'x'})

	stilt: $('<span />', {'class': 'stilt'})

	constructor: ->
		@screen.add(@closeButton).click @close
		@house.click @closeIfOutsideContentArea
		@stilt.add(@closeButton).appendTo @house

	populate: (@content) ->
		@content.insertAfter @stilt
		@

	closeIfOutsideContentArea: (e) =>
		if ($(e.target).is(@house)) then @close()			

	close: =>
		$('.close', @content).unbind 'click', @close
		if !Modernizr.csstransitions
			@house.stop(true,true).fadeOut @speed, =>
				@house.add(@content).detach()
				@screen.stop(true,true).fadeOut @fadeSpeed, =>
					@screen.detach()
		else
			@house.removeClass "viewable"
			setTimeout (=> @screen.removeClass "viewable"; @house.add(@content).detach();), 500
			setTimeout (=> @screen.detach()), 1000
		pocLib.selections.body.off 'keyup',@escape
		@content.trigger "modalUnload"
		
	open: ->
		@content.trigger "modalLoad"
		if !Modernizr.csstransitions
			@screen.stop(true, true).hide().appendTo(pocLib.selections.body).fadeIn @fadeSpeed*1.5
			@house.hide().appendTo(pocLib.selections.body).stop(true,true).fadeIn @fadeSpeed
		else
			@screen.add(@house).appendTo(pocLib.selections.body).show().addClass "viewable"
		pocLib.selections.body.on 'keyup', @escape
		$('.close', @content).click @close
		
	escape:(e) =>
		@close() unless e.keyCode != 27

		


#===================================== jQuery binding helper

$.fn.modalize = (openCallback, closeCallback) ->
	pocLib.modal ?= new ModalShell
	$(@).each ->
		self = $ @
		self
			.data('modalFriend', $("#"+self.data().modalId))
			.click (e)->
				e.preventDefault()
				e.stopPropagation()
				if self.data().modalFriend.length > 0
					pocLib.modal.populate(self.data().modalFriend).open()
					openCallback(@) unless typeof openCallback != "function"						
		$('.close',self.data().modalFriend).click ->
		    pocLib.modal.close()
		    closeCallback(@) unless typeof closeCallback != "function"

