document.getElementById('run-button').addEventListener('click', function () {
    const selectedLanguage = document.getElementById('language-selector').value;
    const code = document.getElementById('code-editor').value;
    const outputFrame = document.getElementById('output-frame');
    const outputDocument = outputFrame.contentDocument || outputFrame.contentWindow.document;

    outputDocument.open();
    outputDocument.write('<html><head></head><body>');

    if (selectedLanguage === 'javascript') {
        outputDocument.write('<script>' + code + '</script>');
    } else if (selectedLanguage === 'python') {
        // Utilizando a API Repl.it para executar código Python
        executePythonCode(code)
            .then((result) => {
                outputDocument.write('<pre>' + result + '</pre>');
            })
            .catch((error) => {
                outputDocument.write('<pre>Error executing Python code: ' + error + '</pre>');
            });
    }

    outputDocument.write('</body></html>');
    outputDocument.close();
});

function executePythonCode(code) {
    // Utilizando a API Repl.it para executar código Python
    const apiUrl = 'https://replitpythonexecutor.lestrrat1.repl.co/execute';
    
    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }
        return data.output;
    });
}
