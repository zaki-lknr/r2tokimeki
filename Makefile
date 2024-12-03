VERSION=$(shell grep '"version"' manifest.json | cut -d ':' -f 2 | sed -e 's/[", ]//g')

r2tokimeki-$(VERSION).zip: manifest.json r2tokimeki.js search.js icons
	zip -r r2tokimeki-$(VERSION).zip manifest.json r2tokimeki.js search.js icons
