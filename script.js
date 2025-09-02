let uploadedImageBase64 = '';

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-theme');
  
  const themeToggle = document.querySelector('.theme-toggle');
  if (body.classList.contains('dark-theme')) {
    themeToggle.textContent = 'Light Theme';
  } else {
    themeToggle.textContent = 'Dark Theme';
  }
}

function previewImage(event) {
  const file = event.target.files[0];
  const preview = document.getElementById('preview');
  preview.innerHTML = '';

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      uploadedImageBase64 = e.target.result;
      const img = document.createElement('img');
      img.src = uploadedImageBase64;
      preview.appendChild(img);
      document.getElementById('generateBtn').classList.add('show');
    }
    reader.readAsDataURL(file);
  }
}

function generateCode() {
  const codeOutput = document.getElementById('codeOutput');
  if (!uploadedImageBase64) return;
  
  codeOutput.value = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Image</title>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background: #f8f9fa;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    img {
      max-width: 90%;
      max-height: 90%;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
  </style>
</head>
<body>
  <img src="${uploadedImageBase64}" alt="Generated Image">
</body>
</html>`;
}

function copyCode() {
  const codeOutput = document.getElementById('codeOutput');
  codeOutput.select();
  document.execCommand('copy');
  
  const copyBtn = document.getElementById('copyBtn');
  const originalText = copyBtn.textContent;
  copyBtn.textContent = "Copied!";
  setTimeout(() => copyBtn.textContent = originalText, 2000);
}

function downloadCode() {
  const code = document.getElementById('codeOutput').value;
  if (!code) return;
  
  const blob = new Blob([code], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "generated_code.html";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
