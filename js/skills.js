function renderPanels(leftId, rightId, data, panelType = 'skills') {
    const leftContainer = document.getElementById(leftId);
    const rightContainer = document.getElementById(rightId);

    function createCategoryHTML(category) {
        const itemsHTML = category.items.map(item => {
            // For skills: check for projects array
            // For projects: check for description
            const projectsData = item.projects ? JSON.stringify(item.projects).replace(/"/g, '&quot;') : '[]';
            const descriptionData = item.description ? item.description.replace(/"/g, '&quot;') : '';
            const hasProjects = item.projects && item.projects.length > 0;
            const hasDescription = item.description && item.description.length > 0;
            const isInteractive = hasProjects || hasDescription;

            return `
            <div class="skill-item ${isInteractive ? 'interactive' : ''}" title="${item.name}" data-projects="${projectsData}" data-description="${descriptionData}" data-type="${panelType}">
                <div class="skill-content">
                     ${item.icon.startsWith('<') ? item.icon : item.icon.includes('globe') ? '🌍' : `<i class="${item.icon}"></i>`}
                    <span>${item.name}</span>
                </div>
                <div class="skill-projects"></div>
            </div>
        `}).join('');

        return `
            <div class="skill-category">
                <div class="category-title">${category.title}</div>
                <div class="skill-items">${itemsHTML}</div>
            </div>
        `;
    }

    if (leftContainer && data.left) {
        leftContainer.innerHTML = data.left.map(createCategoryHTML).join('');
    }
    if (rightContainer && data.right) {
        rightContainer.innerHTML = data.right.map(createCategoryHTML).join('');
    }

    // Add generic click handler for items
    const handleItemClick = (e) => {
        const skillItem = e.target.closest('.skill-item');
        if (!skillItem || !skillItem.classList.contains('interactive')) return;

        // Prevent toggling if clicking a project link
        if (e.target.closest('.skill-project-link')) return;

        const isCurrentlyExpanded = skillItem.classList.contains('expanded');
        const itemType = skillItem.dataset.type;

        // Close all other expanded items (accordion behavior)
        document.querySelectorAll('.skill-item.expanded').forEach(item => {
            item.classList.remove('expanded');
            item.querySelector('.skill-projects').innerHTML = '';
        });

        // If the clicked item wasn't expanded, expand it now
        if (!isCurrentlyExpanded) {
            skillItem.classList.add('expanded');
            const contentContainer = skillItem.querySelector('.skill-projects');

            if (itemType === 'projects') {
                // Show description for project items
                const description = skillItem.dataset.description || '';
                contentContainer.innerHTML = `<div class="project-description">${description}</div>`;
            } else {
                // Show project links for skill items
                const projects = JSON.parse(skillItem.dataset.projects || '[]');
                contentContainer.innerHTML = projects.map(proj =>
                    `<span class="skill-project-link" onclick="handleProjectClick('${proj}')">${proj}</span>`
                ).join('');
            }
        }
    };

    [leftContainer, rightContainer].forEach(container => {
        if (container) {
            container.removeEventListener('click', handleItemClick); // Clean up potential duplicates if re-rendered
            container.addEventListener('click', handleItemClick);
        }
    });
}

function handleProjectClick(projectName) {
    if (window.sendMessage) {
        window.sendMessage(`Tell me about ${projectName}`);
    }
}
// Expose handleProjectClick globally
window.handleProjectClick = handleProjectClick;

renderPanels('skillsLeft', 'skillsRight', skillsData, 'skills');
renderPanels('projectsLeft', 'projectsRight', projectsData, 'projects');

function setSkillsVisibility(visible) {
    const body = document.body;
    if (visible) {
        body.classList.add('skills-visible');
        body.classList.remove('projects-visible');
    } else {
        body.classList.remove('skills-visible');
    }
}

function setProjectsVisibility(visible) {
    const body = document.body;
    if (visible) {
        body.classList.add('projects-visible');
        body.classList.remove('skills-visible');
    } else {
        body.classList.remove('projects-visible');
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

function checkContext(text) {
    // If talking about projects, show projects (Priority)
    if (projectPriorityRegex.test(text)) {
        return 'projects';
    }
    if (skillsRegex.test(text)) {
        return 'skills';
    }
    return null;
}
