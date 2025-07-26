// --- Initialize Libraries ---
lucide.createIcons();
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// --- Mobile Menu Functionality ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// --- Apple-like Title Animation ---
document.querySelectorAll('.apple-effect-title').forEach(title => {
    const text = title.textContent.trim();
    title.innerHTML = '';
    text.split('').forEach(letter => {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        title.appendChild(span);
    });
});

const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            const letters = entry.target.querySelectorAll('.letter');
            letters.forEach((letter, i) => {
                letter.style.transitionDelay = `${i * 50}ms`;
            });
            titleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.apple-effect-title').forEach(title => {
    titleObserver.observe(title);
});


// --- Project Elaboration ---
const projectModal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalLoader = document.getElementById('modal-loader');
const modalContent = document.getElementById('modal-content');

const projectDetails = {
    'AI Lunar Lander': `
        <p class="mb-4">This project tackles the classic reinforcement learning challenge of safely landing a spacecraft in a simulated lunar environment. The goal was to train an autonomous agent that could learn the optimal sequence of actions to control the lander's thrusters and bring it to a gentle stop on the landing pad.</p>
        <ul class="list-disc list-inside space-y-2">
            <li><strong>Core Technology:</strong> Implemented a Deep Q-Network (DQN), a key algorithm in deep reinforcement learning, using PyTorch.</li>
            <li><strong>Stabilization Techniques:</strong> Utilized Experience Replay to store and sample past experiences, breaking temporal correlations and stabilizing the learning process. A separate Target Network was used to provide stable Q-value targets during training.</li>
            <li><strong>Performance Tuning:</strong> Conducted extensive hyperparameter tuning (e.g., learning rate, discount factor) and developed a custom logging pipeline to monitor training metrics and agent performance over time.</li>
            <li><strong>Key Learnings:</strong> Gained hands-on experience in implementing reinforcement learning concepts from scratch, debugging complex AI models, and understanding the nuances of training an agent in a physics-based environment.</li>
        </ul>
    `,
    'CleanCity Reporter': `
        <p class="mb-4">This project is a full-stack web application designed to empower citizens to report local civic issues, such as potholes, broken streetlights, or uncollected garbage, directly to the relevant authorities.</p>
        <ul class="list-disc list-inside space-y-2">
            <li><strong>Full-Stack Architecture:</strong> Built using vanilla JavaScript, HTML, and CSS for the front-end, with a robust backend powered by Google Firebase services.</li>
            <li><strong>Real-time Database:</strong> Leveraged Firestore, a NoSQL database, to enable real-time submission and display of issue reports. The database schema was designed for efficient querying and scalability.</li>
            <li><strong>Geolocation:</strong> Integrated the browser's Geolocation API to automatically and accurately (within 10 meters) tag each report with the user's current location.</li>
            <li><strong>Deployment:</strong> The application is fully deployed and hosted using Firebase Hosting, providing a fast and secure user experience.</li>
        </ul>
    `
};

window.elaborateProject = function(button, projectName) {
    document.body.style.overflow = 'hidden';
    projectModal.classList.remove('hidden');
    modalTitle.textContent = `About: ${projectName}`;
    modalContent.innerHTML = '';
    modalLoader.classList.remove('hidden');
    
    // Simulate a brief loading period for a smoother user experience
    setTimeout(() => {
        if (projectDetails[projectName]) {
            modalContent.innerHTML = projectDetails[projectName];
        } else {
            modalContent.textContent = "Sorry, details for this project are not available.";
        }
        modalLoader.classList.add('hidden');
    }, 300); // 300ms delay
}

window.closeModal = function() {
    projectModal.classList.add('hidden');
    document.body.style.overflow = '';
}