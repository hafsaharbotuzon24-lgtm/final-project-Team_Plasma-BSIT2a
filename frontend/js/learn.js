// =============================================
// LEARN PAGE - Quiz Logic
// =============================================

// Quiz answer keys
const quizAnswers = {
    html: {
        Q1: 'B',
        Q2: 'C',
        Q3: 'False',
        Q4: 'B',
        Q5: 'B'
    },
    css: {
        Q1: 'B',
        Q2: 'C',
        Q3: 'True',
        Q4: 'B',
        Q5: 'A'
    },
    js: {
        Q1: 'D',
        Q2: 'A',
        Q3: 'False',
        Q4: 'B',
        Q5: 'B'
    }
};

// Quiz explanations
const quizExplanations = {
    html: {
        Q1: 'HTML stands for <strong>HyperText Markup Language</strong>. It is the standard language for creating web pages.',
        Q2: '<strong>&lt;h1&gt;</strong> creates the largest heading. &lt;h6&gt; is the smallest heading size.',
        Q3: '<strong>False!</strong> HTML is a markup language, not a programming language. It structures content but cannot perform logic or calculations.',
        Q4: 'The <strong>&lt;a&gt;</strong> (anchor) tag creates hyperlinks. Example: &lt;a href="https://example.com"&gt;Click here&lt;/a&gt;',
        Q5: 'HTML <strong>cannot perform calculations</strong> on its own. That requires JavaScript or a backend language! HTML can create forms and display images.'
    },
    css: {
        Q1: 'CSS stands for <strong>Cascading Style Sheets</strong>. It controls the visual presentation and layout of web pages.',
        Q2: 'The <strong>color</strong> property changes text color. Example: color: red; There is no "font-color" or "text-color" property in CSS.',
        Q3: '<strong>True!</strong> CSS can create animations using @keyframes rules and transition properties for smooth effects.',
        Q4: '<strong>#header</strong> selects an element by its ID. The dot (.) prefix is for classes (example: .header), and # is for IDs (example: #header).',
        Q5: '<strong>margin: 0 auto;</strong> centers a block element horizontally by setting the top/bottom margin to 0 and left/right to auto (equal split).'
    },
    js: {
        Q1: '<strong>All of the above!</strong> var, let, and const are all valid ways to declare variables in JavaScript. let and const were introduced in ES6 (2015).',
        Q2: 'document.querySelector(".box") <strong>selects the first element</strong> with class "box". To select all matching elements, use querySelectorAll(".box") instead.',
        Q3: '<strong>False!</strong> JavaScript can also run on servers via Node.js. It is not limited to just web browsers.',
        Q4: 'Outputs <strong>"22"</strong> — When using the + operator with a number and a string, JavaScript converts the number to a string and concatenates them (type coercion).',
        Q5: 'An event listener <strong>waits for user actions</strong> like clicks, keypresses, mouse movement, scrolling, or form submissions to trigger code.'
    }
};

// Toggle topic dropdown
function toggleTopic(topic) {
    const content = document.getElementById(topic + 'Content');
    const arrow = document.getElementById(topic + 'Arrow');
    
    if (content.classList.contains('hidden')) {
        // Close all other topics first
        document.querySelectorAll('.topic-content').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.topic-arrow').forEach(el => el.textContent = '▼');
        
        // Open this topic
        content.classList.remove('hidden');
        arrow.textContent = '▲';
    } else {
        content.classList.add('hidden');
        arrow.textContent = '▼';
    }
}

// Show warning modal
function showWarningModal(message) {
    document.getElementById('warningModalTitle').textContent = '⚠️ INCOMPLETE QUIZ';
    document.getElementById('warningModalMessage').textContent = message;
    document.getElementById('warningModal').classList.remove('hidden');
}

// Close warning modal
function closeWarningModal() {
    document.getElementById('warningModal').classList.add('hidden');
}

// Check quiz answers
function checkQuiz(topic) {
    let score = 0;
    let total = 5;
    let feedbackHTML = '';
    let allAnswered = true;
    let unansweredQuestions = [];
    
    // Check if all questions are answered
    for (let i = 1; i <= total; i++) {
        const selected = document.querySelector(`input[name="${topic}Q${i}"]:checked`);
        if (!selected) {
            allAnswered = false;
            unansweredQuestions.push(i);
        }
    }
    
    if (!allAnswered) {
        const questionList = unansweredQuestions.join(', ');
        showWarningModal(`Please answer all questions before submitting!\n\nUnanswered questions: ${questionList}\n\nScroll back up and select an answer for each question.`);
        return;
    }
    
    for (let i = 1; i <= total; i++) {
        const selected = document.querySelector(`input[name="${topic}Q${i}"]:checked`);
        const correctAnswer = quizAnswers[topic][`Q${i}`];
        
        if (selected && selected.value === correctAnswer) {
            score++;
            feedbackHTML += `<p class="correct">✅ Question ${i}: Correct!</p>`;
        } else {
            feedbackHTML += `<p class="incorrect">❌ Question ${i}: Incorrect (Correct answer: ${correctAnswer})</p>`;
        }
        feedbackHTML += `<p class="explanation">${quizExplanations[topic][`Q${i}`]}</p><br>`;
    }
    
    // Build results
    const title = topic.toUpperCase() + ' Quiz Results';
    const scoreHTML = `<h4>Score: ${score}/${total}</h4>`;
    let message = '';
    if (score === total) message = '<p class="perfect">🏆 Perfect Score! You\'re a web development master!</p>';
    else if (score >= 3) message = '<p class="good">👍 Good job! You\'re on the right track. Keep learning!</p>';
    else message = '<p class="keep-trying">📚 Keep studying! Practice makes perfect. You\'ll get better!</p>';
    
    const fullContent = scoreHTML + message + '<hr>' + feedbackHTML;
    
    // Show in modal
    document.getElementById('quizModalTitle').textContent = title;
    document.getElementById('quizModalContent').innerHTML = fullContent;
    document.getElementById('quizModal').classList.remove('hidden');
    
    // Also show inline results
    const resultsDiv = document.getElementById(topic + 'Results');
    resultsDiv.innerHTML = fullContent;
    resultsDiv.classList.remove('hidden');
}

// Close quiz modal
function closeQuizModal() {
    document.getElementById('quizModal').classList.add('hidden');
}

// Close warning modal on overlay click
document.addEventListener('DOMContentLoaded', function() {
    const warningModal = document.getElementById('warningModal');
    if (warningModal) {
        warningModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeWarningModal();
            }
        });
    }
    
    const quizModal = document.getElementById('quizModal');
    if (quizModal) {
        quizModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeQuizModal();
            }
        });
    }
});

// Close modals on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const warningModal = document.getElementById('warningModal');
        if (warningModal && !warningModal.classList.contains('hidden')) {
            closeWarningModal();
        }
        const quizModal = document.getElementById('quizModal');
        if (quizModal && !quizModal.classList.contains('hidden')) {
            closeQuizModal();
        }
    }
});