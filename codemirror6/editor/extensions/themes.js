import {baseExtensions} from "./base.js";

import {EditorView} from "@codemirror/view";
import {StateEffect} from "@codemirror/state";
import {tags as t, HighlightStyle} from "@codemirror/highlight";

// In your themes, change just the colours, leave the general things like fonts, margins etc. to your css files (unless they change per theme)

// Light Theme styles

const lightTheme = EditorView.theme(
  {
    "&": {
      color: "#000",
      backgroundColor: "#F1F8F6"
    },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: "black"
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "#A4CDFF"
    },
    ".cm-gutters": {
      color: "#A4A4A4",
    },
    ".cm-activeLine, .cm-activeLineGutter": {
      backgroundColor: "#62a7452a"
    },
    ".cm-activeLineGutter": {
      color: "black"
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "#D9D9D9",
      color: "#6E6E6E"
    }
  }
);

const lightHighlight =  HighlightStyle.define(
  [
    { tag: t.name,               color: "#292929" },
    { tag: t.literal,            color: "#c04abc" },
    { tag: t.comment,            color: "#949790" },
    { tag: t.keyword,            color: "#f41623" },
    { tag: t.typeName,           color: "#f75590" },
    { tag: t.operator,           color: "#129C12" },
    { tag: t.namespace,          color: "#23967f" },
    { tag: t.punctuation,        color: "#f58a07" },
    { tag: t.lineComment,        color: "#949790" },
    { tag: t.attributeName,      color: "#4364a8" },
    { tag: t.definitionKeyword,  color: "#2892d7" },
    { tag: t.definitionOperator, color: "#129C12" }
  ]
);

const lightExtensions = [
  ...baseExtensions,
  lightTheme,
  lightHighlight
]


// Green Theme Styles

const greenTheme = EditorView.theme(
  {
    "&": {
      color: "#fff",
      backgroundColor: "#021712"
    },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: "white"
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "#345D7F"
    },
    ".cm-gutters": {
      color: "#929292",
      backgroundColor: "#132f1b",
      borderRightColor: "#3f5548"
    },
    ".cm-activeLine, .cm-activeLineGutter": {
      backgroundColor: "#abcab12a"
    },
    ".cm-activeLineGutter": {
      color: "white"
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "#243b26",
      color: "#b2b5b7"
    }
  }
);

const greenHighlight =  HighlightStyle.define(
  [
    { tag: t.name,               color: "#ffe9e9" },
    { tag: t.literal,            color: "#e12adb" },
    { tag: t.comment,            color: "#77a6a8" },
    { tag: t.keyword,            color: "#f70000" },
    { tag: t.typeName,           color: "#ff67af" },
    { tag: t.operator,           color: "#29CE29" },
    { tag: t.namespace,          color: "#1aecc2" },
    { tag: t.punctuation,        color: "#f5d007" },
    { tag: t.lineComment,        color: "#77a6a8" },
    { tag: t.attributeName,      color: "#7ba7ff" },
    { tag: t.definitionKeyword,  color: "#00dbff" },
    { tag: t.definitionOperator, color: "#29CE29" }
  ]
);

const greenExtensions = [
  ...baseExtensions,
  greenTheme,
  greenHighlight
]

// Dark Theme Styles

const darkTheme = EditorView.theme(
  {
    "&": {
      color: "#fff",
      backgroundColor: "#000"
    },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: "white"
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "#345D7F"
    },
    ".cm-gutters": {
      color: "#929292",
      backgroundColor: "#010201",
      borderRightColor: "#65716a"
    },
    ".cm-activeLine, .cm-activeLineGutter": {
      backgroundColor: "#8f91922a"
    },
    ".cm-activeLineGutter": {
      color: "white"
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "#151421",
      color: "#a4b1b2"
    }
  }
);

const darkHighlight =  HighlightStyle.define(
  [
    { tag: t.name,               color: "#ffe9e9" },
    { tag: t.literal,            color: "#ff00f7" },
    { tag: t.comment,            color: "#a3a89a" },
    { tag: t.keyword,            color: "#f70000" },
    { tag: t.typeName,           color: "#ff67af" },
    { tag: t.operator,           color: "#39B539" },
    { tag: t.namespace,          color: "#1aecc2" },
    { tag: t.punctuation,        color: "#f5d007" },
    { tag: t.lineComment,        color: "#a3a89a" },
    { tag: t.attributeName,      color: "#7ba7ff" },
    { tag: t.definitionKeyword,  color: "#00dbff" },
    { tag: t.definitionOperator, color: "#39B539" }
  ]
);

// export this one as it will be the default, so needed in editor.js
export const darkExtensions = [
  ...baseExtensions,
  darkTheme,
  darkHighlight
]


let currentTheme = "dark";
document.querySelectorAll(".theme-change").forEach(button => {
  const newTheme = button.getAttribute("data-theme");
  button.addEventListener("click", () => {
    if (newTheme === currentTheme) return;

    currentTheme = newTheme;
    
    editor.dispatch({
      effects: StateEffect.reconfigure.of({
        light: lightExtensions,
        green: greenExtensions,
        dark: darkExtensions
      }[newTheme])
    });
  });
});
