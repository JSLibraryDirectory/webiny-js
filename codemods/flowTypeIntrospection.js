const serialize = require("babel-literal-to-ast");

module.exports = function({ types: t }, state) {
    function runtimeType(identifier, type) {
        const variable = t.variableDeclarator(t.identifier(`${identifier}Type`), serialize(type));
        return t.variableDeclaration("const", [variable]);
    }

    function parse(typeDef) {
        const toDelete = ["start", "end", "static", "kind", "loc", "extra", "proto", "method"];
        toDelete.map(k => delete typeDef[k]);

        const toParse = [
            "id",
            "name",
            "key",
            "value",
            "returnType",
            "typeAnnotation",
            "qualification",
            "typeParameters"
        ];

        toParse.map(k => {
            if (typeDef[k]) {
                typeDef[k] = parse(typeDef[k]);
            }
        });

        const toMap = ["params", "types", "properties"];
        toMap.map(k => {
            if (typeDef[k]) {
                typeDef[k] = typeDef[k].map(parse);
            }
        });

        return typeDef;
    }

    return {
        visitor: {
            TypeAlias(path) {
                const identifier = path.node.id.name;
                const parsed = parse(path.node.right);
                const variable = runtimeType(identifier, parsed);

                path.replaceWith(t.exportNamedDeclaration(variable, []));
            }
        }
    };
};
