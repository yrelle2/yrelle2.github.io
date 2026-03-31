// ========== DARK MODE ==========
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
} else {
    themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    }
});

// ========== DYNAMIC GREETING & TIME ==========
function updateGreeting() {
    const greetingEl = document.getElementById('greeting');
    if (!greetingEl) return;
    const now = new Date();
    const hours = now.getHours();
    let greeting;
    if (hours < 12) greeting = 'Good morning';
    else if (hours < 18) greeting = 'Good afternoon';
    else greeting = 'Good evening';
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    greetingEl.textContent = `${greeting}, Ellery! ${timeStr}`;
}
updateGreeting();
setInterval(updateGreeting, 1000);

// ========== RANDOM QUOTES ==========
const quotes = [
    '"Code is like humor. When you have to explain it, it’s bad." – Cory House',
    '"First, solve the problem. Then, write the code." – John Johnson',
    '"Experience is the name everyone gives to their mistakes." – Oscar Wilde',
    '"Programming isn\'t about what you know; it\'s about what you can figure out." – Chris Pine',
    '"The only way to learn a new programming language is by writing programs in it." – Dennis Ritchie',
    '"Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday’s code." – Dan Salomon'
];

const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuoteBtn');

if (newQuoteBtn) {
    newQuoteBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteDisplay.textContent = quotes[randomIndex];
    });
}

// ========== PROJECT FILTER ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        // update active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // filter projects
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ========== PROJECT LIKES (localStorage) ==========
let likes = JSON.parse(localStorage.getItem('projectLikes')) || {
    carolinian: 0,
    kaila: 0,
    divider: 0
};

function updateLikeDisplay(projectId) {
    const likeSpan = document.querySelector(`.like-btn[data-project="${projectId}"] .like-count`);
    if (likeSpan) likeSpan.textContent = likes[projectId];
}

document.querySelectorAll('.like-btn').forEach(btn => {
    const projectId = btn.getAttribute('data-project');
    updateLikeDisplay(projectId);
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        likes[projectId]++;
        localStorage.setItem('projectLikes', JSON.stringify(likes));
        updateLikeDisplay(projectId);
        // optional: micro-animation
        btn.style.transform = 'scale(1.1)';
        setTimeout(() => { btn.style.transform = ''; }, 200);
    });
});

// ========== SKILL PROFICIENCY ==========
const skillItems = document.querySelectorAll('#skillsList li');
skillItems.forEach(skill => {
    skill.addEventListener('click', () => {
        const proficiency = skill.getAttribute('data-proficiency');
        alert(`Proficiency: ${proficiency}`);
    });
});

// ========== CONTACT BUTTON ==========
const contactBtn = document.getElementById('contactBtn');
if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        alert('📧 ellerysalas@example.com\n📞 +63 912 345 6789');
    });
}

// ========== PRINT RESUME ==========
const printBtn = document.getElementById('printResume');
if (printBtn) {
    printBtn.addEventListener('click', () => {
        window.print();
    });
}

// ========== BACK TO TOP ==========
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== COPYRIGHT YEAR ==========
const copyrightEl = document.getElementById('copyright');
copyrightEl.textContent = `© ${new Date().getFullYear()} Ellery Salas. All rights reserved.`;

// ========== EXPANDABLE EXPERIENCE (on experience.html) ==========
const expandBtns = document.querySelectorAll('.expand-btn');
expandBtns.forEach(btn => {
    const detailsDiv = btn.closest('.experience-item').querySelector('.exp-details');
    detailsDiv.classList.remove('collapsed'); // start expanded
    btn.addEventListener('click', () => {
        detailsDiv.classList.toggle('collapsed');
        btn.textContent = detailsDiv.classList.contains('collapsed') ? '▶' : '▼';
    });
});