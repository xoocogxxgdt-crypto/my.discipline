// Вкладкаларни (Табларни) алмаштириш функцияси
function switchTab(tabId) {
    // 1. Ҳамма секцияларни яширамиз (display: none қиламиз)
    document.querySelectorAll('.tab-section').forEach(section => {
        section.classList.remove('active');
    });

    // 2. Ҳамма тугмалардан "active" (кўк ранг) стилини олиб ташлаймиз
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // 3. Босилган тугмага мос секцияни топиб, кўрсатамиз
    const targetSection = document.getElementById('tab-' + tabId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // 4. Босилган тугманинг ўзини кўк рангга бўяймиз
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// Прогресс бар ва чекбоксларни хотирада сақлаш (LocalStorage)
const checkboxes = document.querySelectorAll('.task-checkbox');
const progressFill = document.getElementById('progress-fill');
const progressPercent = document.getElementById('progress-percent');

function calculateProgress() {
    const total = checkboxes.length;
    const checkedCount = document.querySelectorAll('.task-checkbox:checked').length;
    
    if (total === 0) return;
    
    const percent = Math.round((checkedCount / total) * 100);
    
    if (progressFill) progressFill.style.width = percent + '%';
    if (progressPercent) progressPercent.textContent = percent + '%';

    // Ҳар бир чекбокс ҳолатини браузер хотирасига сақлаймиз
    checkboxes.forEach(box => {
        localStorage.setItem(box.id, box.checked);
    });
}

function loadSavedTasks() {
    checkboxes.forEach(box => {
        const savedState = localStorage.getItem(box.id);
        if (savedState === "true") {
            box.checked = true;
        }
    });
    calculateProgress();
}

// Чекбокслар босилганда прогрессни янгилаш
checkboxes.forEach(box => {
    box.addEventListener('change', calculateProgress);
});

// ЖОНЛИ СОАТ МЕХАНИЗМИ (Ҳар сонияда соатни янгилайди)
function startClock() {
    setInterval(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        const clockElement = document.getElementById('live-time');
        if (clockElement) {
            clockElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }, 1000);
}

// Саҳифа юкланиши билан ҳамма тизимларни ишга туширамиз
document.addEventListener('DOMContentLoaded', () => {
    loadSavedTasks();
    startClock();
});