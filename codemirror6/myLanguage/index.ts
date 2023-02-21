import {parser} from "./syntax.grammar";
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, syntaxTree} from "@codemirror/language";
import {styleTags, tags as t} from "@codemirror/highlight";
import {CompletionContext} from "@codemirror/autocomplete";

const applicationEnds = /^\s*(}|\)|]|<==)$/; // Match to check whether current word is the end of an Application

const myLanguageParse = LRLanguage.define({
  parser: parser.configure({
    props: [
      // automatically indents based on our Aplpication defined in syntax.grammar
      indentNodeProp.add({
        Application: cx => cx.baseIndent + (applicationEnds.test(cx.textAfter) ? 0 : cx.unit) // will also automatically un-indent if current word matches ApplicationEnd
      }),
      // Allows Aplications to be folded in the editor (click the arrows in the gutter)
      foldNodeProp.add({
        Application: foldInside
      }),
      // Set the tags which relate to the things defined in syntax.grammar. These tags are used in /editor/extensions/themes.js for syntax highlighting
      styleTags({
        // find tag types @ // https://github.com/codemirror/highlight/blob/001764b235eba7d9a8fc0a12b3855c459e2f5f85/src/highlight.ts#L549-L757
        Type: t.typeName,
        Identifier: t.name,
        Keyword: t.keyword,
        Scope: t.namespace,
        Literal: t.literal,
        Operator: t.operator,
        Punctuation: t.punctuation,
        LineComment: t.lineComment,
        Attribute: t.attributeName,
        Declare: t.definitionKeyword,
        ApplicationEnd: t.punctuation,
        ApplicationStart: t.punctuation,
        Assignment: t.definitionOperator
      })
    ]
  }),
  languageData: {
    commentTokens: { line: "<~~" },
    indentOnInput: applicationEnds
  }
});

export function myLanguage() {
  return new LanguageSupport(
    myLanguageParse,
    myLanguageParse.data.of({
      // add automplete to our editor 😮
      autocomplete: (context: CompletionContext) => {
        const tree = syntaxTree(context.state);
        const match = /[\w<=>]*/; // <=> included for the `==>` & `<==`, if you want to just automcomplete words, use /\w*/
        const word = context.matchBefore(match)!;

        if (word.from === word.to && !context.explicit) {
          return null;
        }

        if (["Identifier", "Operator"].includes(tree.cursor(context.pos, -1).name)) { // Identifier for incomplete words, and Operator for incomplete `==>` & `<==`
          // define all the static autocomplete suggestions (keywords, built in functions etc.)
          let options = [
            // types availiable are "class", "constant", "enum", "function", "interface", "keyword", "method", "namespace", "property", "text", "type", and "variable"
            { label: "str",     type: "type"     },
            { label: "int",     type: "type"     },
            { label: "dec",     type: "type"     },
            { label: "boo",     type: "type"     },
            { label: "arr",     type: "type"     },
            { label: "lst",     type: "type"     },
            { label: "hsh",     type: "type"     },
            { label: "if",      type: "keyword"  },
            { label: "altif",   type: "keyword"  },
            { label: "else",    type: "keyword"  },
            { label: "case",    type: "keyword"  },
            { label: "other",   type: "keyword"  },
            { label: "fun",     type: "keyword"  },
            { label: "meth",    type: "keyword"  },
            { label: "obj",     type: "keyword"  },
            { label: "extract", type: "keyword"  },
            { label: "output",  type: "function" },
            { label: "Time",    type: "class"    },
            { label: "==>",     type: "text",    },
            { label: "<==",     type: "text",    }
          ]

          // super simple algorithm to add any user defined variables to the autocomplete options
          
          let identifiers: Array<string> = [];

          for (let i = 0; i < tree.length; i++) {
            const cursor = tree.cursor(i);
            if (cursor.type.name === "Identifier") {
              const identifier = context.state.sliceDoc(cursor.from, cursor.to);
              if (word.text !== identifier && !identifiers.includes(identifier)) {
                identifiers.push(identifier);
                options.push({
                  label: identifier,
                  type: "variable"
                });
              }
            }
          }
          
          return {
            from: word.from,
            options: options,
            span: match
          };
        }

        return null;
      }
    })
  );
}
