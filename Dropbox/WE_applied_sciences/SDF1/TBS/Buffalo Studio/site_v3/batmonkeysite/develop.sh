# this is shady and temporary 
killall ruby

cd contents/coffee
coffee --map --watch --join ../js/all.js --compile \
	global.coffee form.coffee fieldset.coffee field.coffee validator.coffee \
	character_limited_field.coffee tooltip.coffee remote_focus.coffee \
	personalization_module.coffee modal.coffee &

cd ../
sass --watch sass/global.scss:css/global.css &

cd ../
wintersmith preview