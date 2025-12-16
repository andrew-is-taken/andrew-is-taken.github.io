function renderSkills() {
    const leftContainer = document.getElementById('skillsLeft');
    const rightContainer = document.getElementById('skillsRight');

    function createCategoryHTML(category) {
        const itemsHTML = category.items.map(item => `
            <div class="skill-item" title="${item.name}">
                ${item.icon.startsWith('<') ? item.icon : item.icon.includes('globe') ? '🌍' : `<i class="${item.icon}"></i>`}
                <span>${item.name}</span>
            </div>
        `).join('');

        return `
            <div class="skill-category">
                <div class="category-title">${category.title}</div>
                <div class="skill-items">${itemsHTML}</div>
            </div>
        `;
    }

    if (leftContainer && skillsData.left) {
        leftContainer.innerHTML = skillsData.left.map(createCategoryHTML).join('');
    }
    if (rightContainer && skillsData.right) {
        rightContainer.innerHTML = skillsData.right.map(createCategoryHTML).join('');
    }
}

renderSkills();

function setSkillsVisibility(visible) {
    const body = document.body;
    if (visible) {
        body.classList.add('skills-visible');
    } else {
        body.classList.remove('skills-visible');
    }
}

// --- Context Detection ---
const allSkillNames = [
    ...skillsData.left.flatMap(cat => cat.items.map(item => item.name)),
    ...skillsData.right.flatMap(cat => cat.items.map(item => item.name))
];

const wordSkills = ['skill', 'skills', 'stack', 'technology', 'technologies', 'language', 'program', 'code', 'coding', 'develop', 'framework', 'frameworks'];
const symbolSkills = [];

allSkillNames.forEach(name => {
    if (/^\w+$/.test(name)) {
        wordSkills.push(name);
    } else {
        symbolSkills.push(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    }
});

const wordPart = `\\b(${wordSkills.join('|')})\\b`;
const symbolPart = symbolSkills.length > 0 ? `(${symbolSkills.join('|')})` : '';
const finalRegexString = [wordPart, symbolPart].filter(Boolean).join('|');
const skillsRegex = new RegExp(finalRegexString, 'i');

const projectPriorityRegex = /project|built|created|portfolio|app|website|subspace|campus|checkers|ric|cv maker/i;

function checkSkillContext(text) {
    // If talking about projects, hide skills (Priority)
    if (projectPriorityRegex.test(text)) {
        return null;
    }
    if (skillsRegex.test(text)) {
        return 'skills';
    }
    return null;
}
