document.getElementById('run-button').addEventListener('click', function () {
    const code = document.getElementById('code-editor').value;
    const outputFrame = document.getElementById('output-frame');
    const outputDocument = outputFrame.contentDocument || outputFrame.contentWindow.document;
    
    outputDocument.open();
    outputDocument.write('<html><head></head><body>');
    outputDocument.write('<script>' + code + '</script>');
    outputDocument.write('</body></html>');
    outputDocument.close();
});
