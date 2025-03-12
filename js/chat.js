// Configuração e funcionalidades do chat n8n
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização do chat com delay para melhorar a experiência do usuário
    setTimeout(initializeChat, 2000);

    // Configuração de eventos para o botão do chat
    document.getElementById('chat-toggle-btn').addEventListener('click', toggleChat);
    document.getElementById('chat-close-btn').addEventListener('click', toggleChat);
});

// Inicializa o chat e suas animações
function initializeChat() {
    const chatButton = document.getElementById('chat-toggle-btn');
    
    // Animação de entrada do botão de chat
    chatButton.classList.add('animate-bounce');
    
    // Remove a animação após 3 segundos
    setTimeout(() => {
        chatButton.classList.remove('animate-bounce');
    }, 3000);
    
    // Adiciona animação periódica para chamar atenção
    setInterval(() => {
        chatButton.classList.add('animate-pulse');
        setTimeout(() => {
            chatButton.classList.remove('animate-pulse');
        }, 1000);
    }, 10000);
}

// Alterna a visibilidade do chat
function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    const chatButton = document.getElementById('chat-toggle-btn');
    
    if (chatContainer.classList.contains('chat-hidden')) {
        // Abre o chat
        chatContainer.classList.remove('chat-hidden');
        chatButton.classList.add('hidden');
        
        // Animação de abertura
        chatContainer.classList.add('chat-slide-in');
        setTimeout(() => {
            chatContainer.classList.remove('chat-slide-in');
        }, 500);
        
        // Foca no input do chat
        setTimeout(() => {
            const inputField = document.getElementById('chat-input');
            if (inputField) inputField.focus();
        }, 600);
    } else {
        // Fecha o chat com animação
        chatContainer.classList.add('chat-slide-out');
        
        setTimeout(() => {
            chatContainer.classList.add('chat-hidden');
            chatContainer.classList.remove('chat-slide-out');
            chatButton.classList.remove('hidden');
        }, 500);
    }
}

// Função para enviar mensagem
function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const message = inputField.value.trim();
    
    if (message) {
        // Adiciona mensagem do usuário ao chat
        addMessageToChat('user', message);
        
        // Limpa o campo de input
        inputField.value = '';
        
        // Mostra indicador de digitação
        showTypingIndicator();
        
        // Simula resposta do agente n8n (em um caso real, aqui seria a chamada para a API n8n)
        setTimeout(() => {
            // Remove indicador de digitação
            hideTypingIndicator();
            
            // Resposta do agente baseada na mensagem
            let response = '';
            
            if (message.toLowerCase().includes('agendar') || message.toLowerCase().includes('marcar')) {
                response = 'Ótimo! Para agendar um serviço para seu pet, preciso de algumas informações. Qual o nome do seu pet e que tipo de serviço você deseja agendar?';
            } else if (message.toLowerCase().includes('preço') || message.toLowerCase().includes('valor') || message.toLowerCase().includes('custo')) {
                response = 'Nossos preços variam de acordo com o porte e tipo de pelagem do seu pet. Para banho em pets de pequeno porte, os valores começam em R$52,00. Posso te dar mais detalhes sobre algum serviço específico?';
            } else if (message.toLowerCase().includes('horário') || message.toLowerCase().includes('hora') || message.toLowerCase().includes('disponível')) {
                response = 'Nosso horário de funcionamento é de segunda a sexta das 8h às 19h e aos sábados das 8h às 18h. Qual seria o melhor dia e horário para você?';
            } else {
                response = 'Olá! Sou o assistente virtual da Yulia Pet Shop. Como posso ajudar você hoje? Posso agendar serviços, informar preços ou responder dúvidas sobre nossos serviços.';
            }
            
            // Adiciona resposta do agente ao chat
            addMessageToChat('agent', response);
        }, 1500);
    }
}

// Adiciona mensagem ao chat
function addMessageToChat(sender, text) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    
    messageElement.classList.add('chat-message', `chat-message-${sender}`);
    messageElement.innerHTML = `<div class="chat-bubble">${text}</div>`;
    
    // Animação de entrada da mensagem
    messageElement.style.opacity = '0';
    messageElement.style.transform = 'translateY(20px)';
    
    chatMessages.appendChild(messageElement);
    
    // Scroll para a mensagem mais recente
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Anima a entrada da mensagem
    setTimeout(() => {
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
    }, 50);
}

// Mostra indicador de digitação
function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    const typingElement = document.createElement('div');
    
    typingElement.id = 'typing-indicator';
    typingElement.classList.add('chat-message', 'chat-message-agent', 'typing-indicator');
    typingElement.innerHTML = `
        <div class="chat-bubble">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </div>
    `;
    
    chatMessages.appendChild(typingElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Esconde indicador de digitação
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Processa tecla Enter no input
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
}
