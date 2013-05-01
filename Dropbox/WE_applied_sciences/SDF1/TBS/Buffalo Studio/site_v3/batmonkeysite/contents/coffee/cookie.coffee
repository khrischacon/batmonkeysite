#!
# * jQuery Cookie Plugin v1.3.1
# * https://github.com/carhartl/jquery-cookie
# *
# * Copyright 2013 Klaus Hartl
# * Released under the MIT license
# 
(($, document, undefined_) ->
  raw = (s) ->
    s
  decoded = (s) ->
    unRfc2068 decodeURIComponent(s.replace(pluses, " "))
  unRfc2068 = (value) ->
    
    # This is a quoted cookie as according to RFC2068, unescape
    value = value.slice(1, -1).replace(/\\"/g, "\"").replace(/\\\\/g, "\\")  if value.indexOf("\"") is 0
    value
  fromJSON = (value) ->
    (if config.json then JSON.parse(value) else value)
  pluses = /\+/g
  config = $.cookie = (key, value, options) ->
    
    # write
    if value isnt `undefined`
      options = $.extend({}, config.defaults, options)
      options.expires = -1  if value is null
      if typeof options.expires is "number"
        days = options.expires
        t = options.expires = new Date()
        t.setDate t.getDate() + days
      value = (if config.json then JSON.stringify(value) else String(value))
      # use expires attribute, max-age is not supported by IE
      return (document.cookie = [encodeURIComponent(key), "=", (if config.raw then value else encodeURIComponent(value)), (if options.expires then "; expires=" + options.expires.toUTCString() else ""), (if options.path then "; path=" + options.path else ""), (if options.domain then "; domain=" + options.domain else ""), (if options.secure then "; secure" else "")].join(""))
    
    # read
    decode = (if config.raw then raw else decoded)
    cookies = document.cookie.split("; ")
    result = (if key then null else {})
    i = 0
    l = cookies.length

    while i < l
      parts = cookies[i].split("=")
      name = decode(parts.shift())
      cookie = decode(parts.join("="))
      if key and key is name
        result = fromJSON(cookie)
        break
      result[name] = fromJSON(cookie)  unless key
      i++
    result

  config.defaults = {}
  $.removeCookie = (key, options) ->
    if $.cookie(key) isnt null
      $.cookie key, null, options
      return true
    false
) jQuery, document