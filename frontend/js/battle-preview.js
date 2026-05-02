function decodeHtmlEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

function escapeHtmlForPre(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function buildResolvedBattleCode(qData, userAnswers) {
    if (!qData || !qData.q) return '';

    const preMatch = qData.q.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);
    if (!preMatch) return '';

    let answerIndex = 0;
    const rawCode = preMatch[1].replace(/<input\b[^>]*>/gi, function () {
        return userAnswers[answerIndex++] || '';
    });

    return decodeHtmlEntities(rawCode).trim();
}

function buildBattlePreviewSrcdoc(code) {
    const lowerCode = code.toLowerCase();
    const hasHtmlTags = /<[a-z][\s\S]*?>/i.test(code);
    const hasCssShape = !hasHtmlTags && lowerCode.includes('{') && lowerCode.includes('}') && lowerCode.includes(':');
    const hasJsShape = !hasHtmlTags && (lowerCode.includes('function') || lowerCode.includes('alert(') || lowerCode.includes('console.log('));

    if (lowerCode.includes('<html') || lowerCode.includes('<!doctype')) {
        return code;
    }

    if (hasHtmlTags) {
        return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
${code}
</body>
</html>`;
    }

    if (hasCssShape) {
        return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
${code}
  </style>
</head>
<body>
  <h1>Styled Preview</h1>
  <p>This output uses your CSS answer.</p>
  <button>Sample Button</button>
</body>
</html>`;
    }

    if (hasJsShape) {
        return `<!doctype html>
<html>
<head><meta charset="utf-8"></head>
<body>
  <h1>JavaScript Preview</h1>
  <p>Script loaded from your correct answer:</p>
  <script>
${code}
  </script>
</body>
</html>`;
    }

    return `<!doctype html>
<html>
<head><meta charset="utf-8"></head>
<body>
  <pre>${escapeHtmlForPre(code)}</pre>
</body>
</html>`;
}

function openBattlePreviewModal(qData, userAnswers) {
    const modal = document.getElementById('battlePreviewModal');
    const frame = document.getElementById('battlePreviewFrame');
    const codeBox = document.getElementById('battlePreviewCode');

    if (!modal || !frame || !codeBox) return;

    const resolvedCode = buildResolvedBattleCode(qData, userAnswers);
    const srcdoc = buildBattlePreviewSrcdoc(resolvedCode);

    frame.srcdoc = srcdoc;
    codeBox.textContent = resolvedCode || 'No previewable code block found for this question.';
    modal.classList.remove('hidden');
}

function closeBattlePreviewModal() {
    const modal = document.getElementById('battlePreviewModal');
    if (!modal) return;
    modal.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('battlePreviewModal');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeBattlePreviewModal();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const previewModal = document.getElementById('battlePreviewModal');
            if (previewModal && !previewModal.classList.contains('hidden')) {
                closeBattlePreviewModal();
            }
        }
    });
});
