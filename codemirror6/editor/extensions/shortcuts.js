import {keymap} from "@codemirror/view";
import {acceptCompletion} from "@codemirror/autocomplete";
import {defaultKeymap, indentLess, indentMore} from "@codemirror/commands";

export const shortcuts = keymap.of([
  ...defaultKeymap,
  {
    key: "Tab",
    preventDefault: true,
    run: acceptCompletion,
  },
  {
    key: "Tab",
    preventDefault: true,
    run: indentMore,
  },
  {
    key: "Shift-Tab",
    preventDefault: true,
    run: indentLess,
  },
  {
    key: "Alt-Shift-l",
    preventDefault: true,
    run: () => { document.querySelector(".theme-change[data-theme='light']").click() }
  },  
  {
    key: "Alt-Shift-g",
    preventDefault: true,
    run: () => { document.querySelector(".theme-change[data-theme='green']").click() }
  },
  {
    key: "Alt-Shift-d",
    preventDefault: true,
    run: () => { document.querySelector(".theme-change[data-theme='dark']").click() }
  },
  {
    key: "Mod-s",
    preventDefault: true,
    run: () => { document.querySelector("#download").click() }
  },
  {
    key: "Mod-o",
    preventDefault: true,
    run: () => { document.querySelector("#upload").click() }
  }
]);
