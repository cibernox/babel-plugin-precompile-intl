export default function build(runtimeImportPath?: string): (api: object, options: Record<string, any> | null | undefined, dirname: string) => {
    name: string;
    visitor: {
        Program: {
            enter(this: import("@babel/core").PluginPass): void;
            exit(this: import("@babel/core").PluginPass, path: import("@babel/traverse").NodePath<import("@babel/types").Program>): void;
        };
        ObjectProperty(this: import("@babel/core").PluginPass, { node }: import("@babel/traverse").NodePath<import("@babel/types").ObjectProperty>): void;
        VariableDeclarator(this: import("@babel/core").PluginPass, { node }: import("@babel/traverse").NodePath<import("@babel/types").VariableDeclarator>): void;
        ExportDefaultDeclaration(this: import("@babel/core").PluginPass, { node }: import("@babel/traverse").NodePath<import("@babel/types").ExportDefaultDeclaration>): void;
    };
};
