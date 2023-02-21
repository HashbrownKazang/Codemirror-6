function readFileContent(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result);
    reader.onerror = error => reject(error);
    reader.readAsText(file);
  });
}

document.querySelector("#upload").addEventListener("change", (event) => {
  if ("files" in event.target && event.target.files.length > 0) {
    readFileContent(event.target.files[0])
      .then(content => {
        editor.update([editor.state.update({ changes: { from: 0, to: editor.state.doc.length, insert: content } })]);
      }).catch(error => console.log(error));
  }
});
