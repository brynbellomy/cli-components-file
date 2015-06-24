

BUILD_DIR=build
SRC_DIR=src
DIST_DIR=dist

_SOURCES = index.ts
SOURCES  = $(patsubst %,$(SRC_DIR)/%,$(_SOURCES))

_BUILT   = $(_SOURCES:.ts=.js)
BUILT    = $(patsubst %,$(BUILD_DIR)/%,$(_BUILT))


all: build

build: $(SOURCES) $(BUILT)

clean:
	rm -rf build

$(BUILD_DIR)/%.js: $(SOURCES)
	tsc -p .
	mkdir -p dist
	cp build/*.js     dist/
	cp build/*.js.map dist/
	cp src/*.d.ts 	  dist/













