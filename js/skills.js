function renderPanels(leftId, rightId, data, panelType = 'skills') {
    const leftContainer = document.getElementById(leftId);
    const rightContainer = document.getElementById(rightId);

    function createCategoryHTML(category) {
        const itemsHTML = category.items.map(item => {
            // For skills: check for projects array
            // For projects: check for description
            const projectsData = item.projects ? JSON.stringify(item.projects).replace(/"/g, '&quot;') : '[]';
            const descriptionData = item.description ? item.description.replace(/"/g, '&quot;') : '';
            const screenshotsData = item.screenshots ? JSON.stringify(item.screenshots).replace(/"/g, '&quot;') : '[]';
            const linkData = item.link || '';
            const linkNoteData = item.linkNote || '';
            const hasProjects = item.projects && item.projects.length > 0;
            const hasDescription = item.description && item.description.length > 0;
            const isInteractive = hasProjects || hasDescription;

            return `
            <div class="skill-item ${isInteractive ? 'interactive' : ''}" title="${item.name}" data-projects="${projectsData}" data-description="${descriptionData}" data-screenshots="${screenshotsData}" data-link="${linkData}" data-link-note="${linkNoteData}" data-type="${panelType}">
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

        const itemType = skillItem.dataset.type;

        // For project items, open the modal
        if (itemType === 'projects') {
            const itemName = skillItem.querySelector('.skill-content span').textContent;
            const iconElement = skillItem.querySelector('.skill-content i, .skill-content img');
            let iconHTML = '';
            if (iconElement) {
                if (iconElement.tagName === 'I') {
                    iconHTML = iconElement.className;
                } else {
                    iconHTML = iconElement.outerHTML;
                }
            }
            const description = skillItem.dataset.description || '';
            const screenshots = JSON.parse(skillItem.dataset.screenshots || '[]');
            const link = skillItem.dataset.link || '';
            const linkNote = skillItem.dataset.linkNote || '';

            if (window.openProjectModal) {
                window.openProjectModal(itemName, iconHTML, description, screenshots, link, linkNote);
            }
            return;
        }

        // For skill items, use accordion behavior
        const isCurrentlyExpanded = skillItem.classList.contains('expanded');

        // Close all other expanded items (accordion behavior)
        document.querySelectorAll('.skill-item.expanded').forEach(item => {
            item.classList.remove('expanded');
            item.querySelector('.skill-projects').innerHTML = '';
        });

        // If the clicked item wasn't expanded, expand it now
        if (!isCurrentlyExpanded) {
            skillItem.classList.add('expanded');
            const contentContainer = skillItem.querySelector('.skill-projects');

            // Show project links for skill items
            const projects = JSON.parse(skillItem.dataset.projects || '[]');
            contentContainer.innerHTML = projects.map(proj =>
                `<span class="skill-project-link" onclick="handleProjectClick('${proj}')">${proj}</span>`
            ).join('');
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
    // Find project data and open modal
    const project = window.findProjectData ? window.findProjectData(projectName) : null;
    if (project && window.openProjectModal) {
        window.openProjectModal(project.name, project.icon, project.description, project.screenshots || [], project.link || '', project.linkNote || '');
    } else if (window.sendMessage) {
        // Fallback to chat if project not found
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

const projectPriorityRegex = /project|built|created|portfolio|app|website|subspace|campus|checkers|rick|cv maker|tum|mgt/i;

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

// --- Project Modal Logic ---
const projectModalOverlay = document.getElementById('projectModalOverlay');
const projectModal = document.getElementById('projectModal');
const projectModalClose = document.getElementById('projectModalClose');
const projectModalIcon = document.getElementById('projectModalIcon');
const projectModalTitle = document.getElementById('projectModalTitle');
const projectModalDescription = document.getElementById('projectModalDescription');
const projectModalScreenshots = document.getElementById('projectModalScreenshots');

function openProjectModal(projectName, projectIcon, projectDescription, screenshots = [], link = '', linkNote = '') {
    const projectModalLink = document.getElementById('projectModalLink');
    const projectModalLinkText = document.getElementById('projectModalLinkText');

    projectModalTitle.textContent = projectName;
    projectModalIcon.innerHTML = projectIcon.startsWith('<') ? projectIcon : `<i class="${projectIcon}"></i>`;

    // Handle project link
    if (link) {
        projectModalLink.href = link;
        projectModalLink.classList.add('visible');
        projectModalLink.classList.remove('private');
        let linkText = 'Visit Project';
        if (linkNote) {
            linkText += ` (${linkNote})`;
        }
        projectModalLinkText.textContent = linkText;
    } else {
        projectModalLink.removeAttribute('href');
        projectModalLink.classList.add('visible', 'private');
        projectModalLinkText.textContent = 'Private repository';
    }

    // Format description with line breaks
    const formattedDescription = (projectDescription || 'No description available.')
        .replace(/\n/g, '<br>')
        .replace(/•/g, '<br>•');
    projectModalDescription.innerHTML = formattedDescription;

    // Render screenshots
    if (screenshots && screenshots.length > 0) {
        projectModalScreenshots.innerHTML = screenshots.map(src =>
            `<img src="${src}" alt="${projectName} screenshot" loading="lazy">`
        ).join('');
    } else {
        projectModalScreenshots.innerHTML = '';
    }

    projectModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeProjectModal() {
    projectModalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close modal events
projectModalClose.addEventListener('click', closeProjectModal);
projectModalOverlay.addEventListener('click', (e) => {
    if (e.target === projectModalOverlay) {
        closeProjectModal();
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModalOverlay.classList.contains('active')) {
        closeProjectModal();
    }
});

// Find project data by name
function findProjectData(projectName) {
    const allProjects = [
        ...projectsData.left.flatMap(cat => cat.items),
        ...projectsData.right.flatMap(cat => cat.items)
    ];
    return allProjects.find(p => p.name.toLowerCase() === projectName.toLowerCase());
}

// Expose openProjectModal globally
window.openProjectModal = openProjectModal;
window.findProjectData = findProjectData;
