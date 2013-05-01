wintersmith build -X -I .sass-cache -I sass -I coffee

cd build 
zip -evr -P citi ../poc.zip *
