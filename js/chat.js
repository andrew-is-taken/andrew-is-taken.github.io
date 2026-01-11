// --- Chat Logic ---
const chatArea = document.getElementById('chatArea');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const API_URL = 'https://andrewsha-portfolio-bot.hf.space/chat';
let chatHistory = [];

function formatMessage(text) {
    let html = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    const lines = html.split('\n');
    let output = [];
    let inList = false;

    lines.forEach(line => {
        let trimmed = line.trim();

        // Handle markdown headers
        if (trimmed.startsWith('### ')) {
            if (inList) {
                output.push('</ul>');
                inList = false;
            }
            output.push(`<h4 class="chat-heading">${trimmed.substring(4)}</h4>`);
        } else if (trimmed.startsWith('## ')) {
            if (inList) {
                output.push('</ul>');
                inList = false;
            }
            output.push(`<h3 class="chat-heading">${trimmed.substring(3)}</h3>`);
        } else if (trimmed.startsWith('# ')) {
            if (inList) {
                output.push('</ul>');
                inList = false;
            }
            output.push(`<h2 class="chat-heading">${trimmed.substring(2)}</h2>`);
        } else if (trimmed.startsWith('- ')) {
            if (!inList) {
                output.push('<ul>');
                inList = true;
            }
            output.push(`<li>${trimmed.substring(2)}</li>`);
        } else {
            if (inList) {
                output.push('</ul>');
                inList = false;
            }
            if (line.length > 0) {
                output.push(line + '<br>');
            } else {
                output.push('<br>');
            }
        }
    });
    if (inList) output.push('</ul>');
    return output.join('');
}

function addMessage(content, isUser) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${isUser ? 'user' : 'bot'}`;

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = isUser ? 'You' : 'AI';

    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    if (typeof content === 'string') {
        bubble.innerHTML = isUser ? content.replace(/\n/g, '<br>') : formatMessage(content);
    } else {
        bubble.textContent = JSON.stringify(content);
    }

    msgDiv.appendChild(avatar);
    msgDiv.appendChild(bubble);
    chatArea.appendChild(msgDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function addLoading() {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message bot';
    msgDiv.id = 'loadingMsg';

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = 'AI';

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.innerHTML = `
        <div class="typing-indicator">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    `;

    msgDiv.appendChild(avatar);
    msgDiv.appendChild(bubble);
    chatArea.appendChild(msgDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function removeLoading() {
    const loading = document.getElementById('loadingMsg');
    if (loading) loading.remove();
}

async function sendMessage(text) {
    if (!text) return;

    addMessage(text, true);
    userInput.value = '';
    userInput.disabled = true;
    sendBtn.disabled = true;

    addLoading();

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });

        const result = await response.json();
        removeLoading();

        if (!response.ok) {
            throw new Error(result.error || `API Error: ${response.status}`);
        }

        const botResponse = result.reply || "Sorry, I didn't get a response.";
        chatHistory.push([text, botResponse]);
        addMessage(botResponse, false);

        // Check Context
        const context = checkContext(text);
        if (context === 'projects') {
            setProjectsVisibility(true);
        } else if (context === 'skills') {
            setSkillsVisibility(true);
        } else {
            setSkillsVisibility(false);
            setProjectsVisibility(false);
        }

    } catch (err) {
        console.error(err);
        removeLoading();
        addMessage(`Error: ${err.message}`, false);
    } finally {
        userInput.disabled = false;
        sendBtn.disabled = false;
        userInput.focus();
    }
}

async function handleSend() {
    sendMessage(userInput.value.trim());
}

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});

// Expose sendMessage globally
window.sendMessage = sendMessage;
