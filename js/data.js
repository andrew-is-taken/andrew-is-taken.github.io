// --- Skills Data ---
const skillsData = {
    left: [
        {
            title: "Programming Languages",
            items: [
                { name: "Python", icon: "devicon-python-plain colored", projects: ["American Checkers", "TUM MGT Chatbot"] },
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
                { name: "LaTeX", icon: "devicon-latex-original", projects: ["University", "Personal Projects"] }
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
                { name: "English", icon: '<img src="https://flagcdn.com/w40/us.png" alt="US Flag" />' },
                { name: "German", icon: '<img src="https://flagcdn.com/w40/de.png" alt="German Flag" />' },
                { name: "Russian", icon: '<img src="https://flagcdn.com/w40/ru.png" alt="Russian Flag" />' }
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
                    description: "Mobile FPS with portal mechanics and custom rendering optimization for low-end devices."
                },
                {
                    name: "Rick",
                    icon: "devicon-unity-plain colored",
                    description: "Released Unity game with 20k+ downloads. Ad monetization and A/B testing for retention."
                }
            ]
        },
        {
            title: "AI & Machine Learning",
            items: [
                {
                    name: "American Checkers",
                    icon: "devicon-python-plain colored",
                    description: "RL agent using Q-Learning and Deep Q-Learning with performance comparison analysis."
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
                    description: "Full-stack AI assistant with Next.js frontend and Python FastAPI backend, using OpenAI services."
                }
            ]
        },
        {
            title: "Mobile Applications",
            items: [
                {
                    name: "Campus Connect",
                    icon: "devicon-react-original colored",
                    description: "React Native uni app with AI chatbot, friend connections, and event planning."
                },
                {
                    name: "CV Maker",
                    icon: "devicon-react-original colored",
                    description: "Generative AI app using GPT-4o to create and convert LaTeX CVs to PDF."
                }
            ]
        }
    ]
};
