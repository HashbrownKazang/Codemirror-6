document.querySelector("#download").addEventListener("click", () => {
  const fileName = "myProgram.txt"; // default file name
  const file = new Blob([editor.state.doc.toString()], { type: "text" });
  
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, fileName);
  } else {
    const a = document.createElement("a");
    const url = URL.createObjectURL(file);

    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      a.remove();
      window.URL.revokeObjectURL(url);
    }, 0);    
  }
});
