const chatbot = document.getElementById("chatbot");
const chatBody = document.getElementById("chat-body");

// Open / Close chatbot
document.getElementById("chatbot-btn").onclick = toggleChat;

function toggleChat() {
  chatbot.classList.toggle("hidden");

  if (chatBody.innerHTML === "") {
    botReply("Hello 👋 I am IOCL Assistant. How can I help you?");
  }
}

// When user clicks send
function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  userMessage(text);
  input.value = "";
setTimeout(async () => {
  const reply = await getBotResponse(text);
  botReply(reply);
}, 600);

}

// User message
function userMessage(msg) {
  const div = document.createElement("div");
  div.className = "user";
  div.innerText = msg;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Bot message
function botReply(msg) {
  const div = document.createElement("div");
  div.className = "bot";
  div.innerText = msg;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Bot logic
async function getBotResponse(input) {
  input = input.toLowerCase();

  // Complaint registration
  if (input.includes("register")) {
    return "You can register a complaint from the Complaint page.";
  }

  // Safety
  if (input.includes("safety")) {
    return "Safety rules: Engine off, no smoking, no mobile phones.";
  }

  // Login help
  if (input.includes("login")) {
    return "Login using your registered email and password.";
  }

  // Track complaint using ID
  if (input.includes("track")) {
    return "Please provide your complaint ID to check status.";
  }

  // Detect complaint ID (MongoDB ID = 24 characters)
  if (input.length === 24) {
    const res = await fetch(
      `http://localhost:5000/api/chatbot/status/${input}`
    );
    const data = await res.json();
    return data.message;
  }

  return "I can help with complaints, tracking, safety, or login.";
}
