const path = require("path");
const crypto = require("crypto");

/**
 * PRODUCTION ONLY PLUGIN
 * AssetsFileName class is responsible for generating a file name with unique hash based on the ENTIRE file content, to the last byte.
 *
 * NOTE:
 * This was tested on a big production web app with tons of code splitting and this code is the
 * only approach that solved our problems with CDN and granular code updates.
 * Existing webpack plugins were simply not enough.
 */
class AssetsFileName {
    constructor(options) {
        this.options = options || {};
    }

    replaceChunkFile(chunk, file, source, nameFn) {
        const fileIndex = chunk.files.indexOf(file);
        // Remove old asset file
        delete this.compilation.assets[file];
        file = nameFn(this.createSourceHash(source));
        this.compilation.assets[file] = source;
        chunk.files[fileIndex] = file;
        return file;
    }

    createSourceHash(source, length = 10) {
        // Create hash based on new file contents
        const hash = crypto.createHash("md5");
        source.updateHash(hash);
        return hash.digest("hex").substr(0, length);
    }

    apply(compiler) {
        compiler.plugin("emit", (compilation, compileCallback) => {
            this.compilation = compilation;

            compilation.chunks.forEach(chunk => {
                chunk.files.forEach(file => {
                    if (file.indexOf("hot-update") >= 0) {
                        return;
                    }

                    const fileSource = compilation.assets[file];

                    if (file.startsWith("chunks/")) {
                        this.replaceChunkFile(chunk, file, fileSource, hash => `chunks/${hash}.js`);
                    } else {
                        const ext = path.extname(file);
                        const fileName = path.basename(file, ext);
                        this.replaceChunkFile(
                            chunk,
                            file,
                            fileSource,
                            hash => `${fileName}-${hash}${ext}`
                        );
                    }
                });
            });

            compileCallback();
        });
    }
}

module.exports = AssetsFileName;
