// --- Skills Data ---
const skillsData = {
    left: [
        {
            title: "Programming Languages",
            items: [
                { name: "Python", icon: "devicon-python-plain colored", projects: ["American Checkers", "TUM MGT Chatbot", "Smart Parking Lot"] },
                { name: "C++", icon: "devicon-cplusplus-plain colored", projects: ["University", "Personal Projects"] },
                { name: "Java", icon: "devicon-java-plain colored", projects: ["University", "Personal Projects"] },
                { name: "C#", icon: "devicon-csharp-plain colored", projects: ["Subspace", "Rick"] },
                { name: "OCaml", icon: "devicon-ocaml-plain colored", projects: ["University"] },
                { name: "JavaScript", icon: "devicon-javascript-plain colored", projects: ["Campus Connect", "CV Maker", "TUM MGT Chatbot"] },
                { name: "TypeScript", icon: "devicon-typescript-plain colored", projects: ["Campus Connect", "CV Maker", "TUM MGT Chatbot"] }
            ]
        },
        {
            title: "AI & ML Libraries",
            items: [
                { name: "TensorFlow", icon: "devicon-tensorflow-original colored", projects: ["American Checkers"] },
                { name: "PyTorch", icon: "devicon-pytorch-original colored", projects: ["University", "Personal Projects"] },
                { name: "Keras", icon: "devicon-keras-plain colored", projects: ["American Checkers"] },
                { name: "NumPy", icon: '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" />', projects: ["American Checkers"] },
                { name: "Pandas", icon: "devicon-pandas-plain-wordmark colored", projects: ["University", "Personal Projects"] }
            ]
        },
        {
            title: "Tools & Technologies",
            items: [
                { name: "Git", icon: "devicon-git-plain colored", projects: ["All Projects"] },
                { name: "Docker", icon: "devicon-docker-plain colored", projects: ["TUM MGT Chatbot"] },
                { name: "LaTeX", icon: "devicon-latex-original", projects: ["University", "Personal Projects"] },
                { name: "Cyber-Physical Systems", icon: "devicon-raspberrypi-plain colored", projects: ["Smart Parking Lot"] }
            ]
        }
    ],
    right: [
        {
            title: "Data & Cloud",
            items: [
                { name: "Firebase", icon: "devicon-firebase-plain colored", projects: ["Subspace"] },
                { name: "Supabase", icon: "devicon-supabase-plain colored", projects: ["Campus Connect"] },
                { name: "AWS", icon: '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" />', projects: ["Personal Projects"] },
                { name: "SQL", icon: "devicon-mysql-plain colored", projects: ["TUM MGT Chatbot", "Campus Connect"] }
            ]
        },
        {
            title: "Game Engines & 3D",
            items: [
                { name: "Unity", icon: "devicon-unity-plain colored", projects: ["Subspace", "Rick"] },
                { name: "Unreal Engine 5", icon: "devicon-unrealengine-original", projects: ["Professional Work", "Personal Projects"] },
                { name: "Blender", icon: "devicon-blender-original colored", projects: ["Subspace", "Rick"] }
            ]
        },
        {
            title: "Spoken Languages",
            items: [
                { name: "English", icon: '<img src="https://flagcdn.com/w40/us.png" alt="US Flag" />', description: "C1 - Advanced" },
                { name: "German", icon: '<img src="https://flagcdn.com/w40/de.png" alt="German Flag" />', description: "B1 - Intermediate" },
                { name: "Russian", icon: '<img src="https://flagcdn.com/w40/ru.png" alt="Russian Flag" />', description: "Native" }
            ]
        }
    ]
};

const projectsData = {
    left: [
        {
            title: "Game Development",
            items: [
                {
                    name: "Subspace",
                    icon: "devicon-unity-plain colored",
                    description: "Mobile FPS game built with Unity featuring a complex 3D portal system utilizing inverse transforms and quaternion rotations for seamless, momentum-conserving teleportation.\n\nKey achievements:\n• Engineered portal mechanics for players and physics objects with smooth transitions\n• Architected a robust security framework with custom memory obfuscation and AES-256 encryption with HMAC integrity\n• Built a modular anti-cheat system to prevent injection and tampering\n• Integrated Firebase for real-time cloud synchronization\n• Optimized mobile performance through dynamic resolution scaling and mesh combining",
                    screenshots: ["img/subspace_screenshot_1.jpg", "img/subspace_screenshot_2.jpg", "img/subspace_screenshot_3.jpg"]
                },
                {
                    name: "Rick",
                    icon: "devicon-unity-plain colored",
                    description: "Published Unity-based mobile game achieving 20,000+ downloads.\n\nKey achievements:\n• Full-cycle development handling everything from C# scripting to UI implementation\n• Iterated on user interface designs based on A/B testing data to improve player retention and usability\n• Implemented ad monetization strategies",
                    screenshots: ["img/rick_kpi_screenshot.png", "img/rick_advertising.JPG"]
                }
            ]
        },
        {
            title: "AI & Machine Learning",
            items: [
                {
                    name: "American Checkers",
                    icon: "devicon-python-plain colored",
                    description: "Reinforcement Learning project developing an AI agent to play American Checkers.\n\nKey achievements:\n• Implemented Q-Learning and Deep Q-Learning algorithms\n• Designed the AI to learn strategies and adapt gameplay accordingly\n• Created efficient board state representations with feature extraction techniques to reduce computational complexity\n• Analyzed QL vs DQL performance through competitive testing\n• Built graph visualizations comparing agent performance across approaches",
                    screenshots: ["img/american_checkers_screenshot_1.png"],
                    link: "https://github.com/zzirkell/checkers_game"
                },
                {
                    name: "Smart Parking Lot",
                    icon: "devicon-python-plain colored",
                    description: "Cyber-Physical Systems project integrating computer vision with hardware control.\n\nKey achievements:\n• Engineered a computer vision system in Python to detect parking space occupancy\n• Controlled physical actuators (barriers) demonstrating hardware-software integration\n• Implemented OCR pipelines for license plate recognition using open-source libraries",
                    screenshots: ["img/smart_parkig_lot_screenshot_1.png", "img/smart_parkig_lot_screenshot_2.png"],
                    link: "https://github.com/CPSCourse-TUM-HN/smart-parking-lot-system"
                }
            ]
        }
    ],
    right: [
        {
            title: "Web Applications",
            items: [
                {
                    name: "TUM MGT Chatbot",
                    icon: "devicon-nextjs-plain",
                    description: "AI-powered chatbot for the Technical University of Munich School of Management website.\n\nKey achievements:\n• Provides intelligent assistance to students, faculty, and visitors with program navigation, course information, and FAQ support\n• Developed responsive UI with React, Next.js, TypeScript, and Tailwind CSS\n• Built admin dashboard for monitoring chatbot performance and user interactions\n• Created RESTful API with Python FastAPI and Pydantic for type-safe data validation\n• Integrated SharePoint as a knowledge source for document retrieval",
                    screenshots: ["img/chatbot_screenshot_1.png", "img/chatbot_screenshot_2.png"],
                    link: "https://chat.it.tum.de/chat",
                    linkNote: "Requires TUM credentials to access"
                }
            ]
        },
        {
            title: "Mobile Applications",
            items: [
                {
                    name: "Campus Connect",
                    icon: "devicon-react-original colored",
                    description: "React Native university app for student community and academic support.\n\nKey achievements:\n• Developed and integrated the AI Assistant feature for intelligent tutoring and real-time study assistance\n• Engineered a complete friend request and management system to foster community and social networking\n• Implemented a robust smart notification system using Supabase Realtime for priority-based alerts across the platform",
                    screenshots: ["img/campus_connect_screenshot_1.jpg", "img/campus_connect_screenshot_2.jpg", "img/campus_connect_screenshot_3.jpg"]
                },
                {
                    name: "CV Maker",
                    icon: "devicon-react-original colored",
                    description: "React Native app for AI-powered CV generation.\n\nKey achievements:\n• Coordinated development process and task handover for job scraping and CV generation features\n• Designed and implemented a module converting AI-generated LaTeX CVs to PDF via API\n• Collaborated with team to align app features with user needs for a seamless job seeker experience",
                    screenshots: ["img/cv_maker_screenshot_1.png", "img/cv_maker_screenshot_2.png", "img/cv_maker_screenshot_3.png"],
                    link: "https://github.com/ahmedeltayyeb/GenAI"
                }
            ]
        }
    ]
};
