let pyodide;
let runInterpreter;

async function init() {
  pyodide = await loadPyodide();

  const buffer = await (await fetch("kojun-src.zip")).arrayBuffer();
  pyodide.unpackArchive(buffer, "zip");

  await pyodide.runPythonAsync(`
    import sys
    sys.path.append(".")
    from src.kojun import Kojun

    def kojun_run(source):
      import sys
      from io import StringIO
      old_stdout = sys.stdout
      buffer = StringIO()

      sys.stdout = buffer

      try:
          result = Kojun._run(source)
      finally:
          sys.stdout = old_stdout

      output = buffer.getvalue()

      if result is not None:
          output += str(result)

      return output
  `);

  runInterpreter = pyodide.globals.get("kojun_run");
}

async function run() {
  let source;
  if (window.monacoEditor) {
    source = window.monacoEditor.getValue();
  } else {
    source = "";
  }
  if (!runInterpreter) {
    document.getElementById("output").textContent = "Interpreter not ready yet.";
    return;
  }
  let result;
  try {
    result = runInterpreter(source);
  } catch (e) {
    result = e.toString();
  }
  document.getElementById("output").textContent = result;
}

init();
