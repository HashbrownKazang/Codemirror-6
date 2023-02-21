import {indentUnit} from "@codemirror/language";
import {basicSetup} from "@codemirror/basic-setup";
import {highlightActiveLineGutter} from "@codemirror/gutter";
import {EditorView, highlightActiveLine} from "@codemirror/view";

import {shortcuts} from "./shortcuts.js";
import {myLanguage} from "../../myLanguage/index.js";

export const baseExtensions = [
  basicSetup,
  EditorView.lineWrapping,
  shortcuts,
  indentUnit.of("	"),
  highlightActiveLine(),
  highlightActiveLineGutter(),
  myLanguage()
];
