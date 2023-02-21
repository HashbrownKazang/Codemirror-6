import {EditorView} from "@codemirror/view";
import {EditorState} from "@codemirror/basic-setup";

import {darkExtensions} from "./extensions/themes.js";

const state = EditorState.create({
  // initial content of editor
  doc: `a <-var str-< "cactus" <~~ Declares a string variable and assigns "cactus" to it
b <-var dec-< 567
c <-var dec-< 1.23
d <-var boo-< true

a <-< "cactus2" <~~ Assigns "cactus2" to variable 'a'

e <-con str-< "cactus" <~~ Declares a string constant and assigns "cactus" to it
f <-con dec-< 123
g <-con dec-< 1.23
h <-con boo-< false

i <-con arr dec-< [ 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 ] <~~ Arrays are fixed length and data type
k <-con lst-< [ 1.2 | "abc" | false | 17 ] <~~ Lists are any length, any data type
output(i@0) <~~ 65
output(k@2) <~~ false
output(i@-1) <~~ 74 (last element)
output(k@1..3) <~~ [ "abc" | false | 17 ] (1 to 3 inclusive)
output(k@0...3) <~~ [ 1.2 | "abc" | false ] (0 to 3 not inclusive)

l <-con hsh-< { "a" -> 123 | a -> b | [ 1 | 2 | 3 ] -> "1 or 2 or 3" }
<~~     ^^^ hash with python equivalent: 
<~~ {
<~~   "a": 123,
<~~   a: b,
<~~   1: "1 or 2 or 3",
<~~   2: "1 or 2 or 3",
<~~   3: "1 or 2 or 3",
<~~ }
output(l@"a") <~~ 123
output(l@a) <~~ 567
output(l@2) <~~ "1 or 2 or 3"


if a = b ==>
	output("nice")
<== altif c != d ==>
	output("hmmm")
<== alt ==>
	output("ok")
<==


switch e ==>
	"cactus" ?->
		output("yay")
		break
	"sipky" | "spines" ?-> <~~ If the value in variable 'e' is either "spiky" or "spines"
		output("close enough")
		break
	other ?->
		output("no")
		break
<==


fun add(a -str|dec-, b -str|dec-) =str|dec=> <~~ str|dec means string or decimal types accepted / returned
	<-- a + b <~~ returns a + b
<==


obj Cactus ==>
	#size pub var dec <~~ declare attribites
	#name pub con str
	#type pub con str
	#DoB  pri con dec
	
	meth new(name -str-, type -str-) ==>
		extract <~~ extracts all passed parameters to same named attributes

		#size <-< 0
		#DoB  <-< Time:now <~~ built in object, no need for () on methods with no paramaters
	<==

	meth grow(amount -dec-) ==>
		#size <-+-< amount <~~ #size <-< #size + amount
	<==

	meth get_DoB =dec=>
		<-- #DoB
	<==
<==

spikey <-con Cactus-< "spikey", "barrel" <~~ calls 'new' method on Cactus object with parameters "spikey" and "barrel"
spikey:grow(5) <~~ single colon for method call
output(spikey::size) <~~ double colon for attribute access
`,
  extensions: darkExtensions
});

// use window so it can be easily accessed in other files
window.editor = new EditorView({
  state: state,
  parent: document.querySelector("#editor")
});

// import our files which don't get imported anywhere else, so that they get rolled up

import "./files/upload.js";
import "./files/download.js";
