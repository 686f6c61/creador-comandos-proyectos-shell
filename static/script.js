function loadExample(key) {
    const [language, templateKey] = key.split('_');
    const template = projectTemplates[language][templateKey];
    
    if (template) {
        const textarea = document.getElementById('directory_structure');
        textarea.value = template.template;
        textarea.scrollIntoView({ behavior: 'smooth' });
        textarea.focus();
    }
}

// Update terminal options based on selected OS
document.getElementById('os_type').addEventListener('change', function() {
    const terminal = document.getElementById('terminal');
    const os = this.value;
    
    // Clear existing options
    terminal.innerHTML = '';
    
    // Add appropriate options based on OS
    if (os === 'windows') {
        terminal.add(new Option('Command Prompt', 'cmd'));
        terminal.add(new Option('PowerShell', 'powershell'));
    } else if (os === 'linux') {
        terminal.add(new Option('Bash', 'bash'));
        terminal.add(new Option('Zsh', 'zsh'));
    } else if (os === 'mac') {
        terminal.add(new Option('Bash', 'bash'));
        terminal.add(new Option('Zsh', 'zsh'));
    }
});

// Trigger the change event on page load to set initial options
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('os_type').dispatchEvent(new Event('change'));
});

// Definir las traducciones
const translations = {
    'es': {
        'title': 'Creador de comandos para estructuras de proyectos',
        'subtitle': 'Convierte tu estructura de directorios en comandos shell',
        'generateWithAI': 'Generar con IA',
        'describeProject': 'Describe tu proyecto',
        'projectPlaceholder': 'Ejemplo: Quiero un proyecto de comercio electrónico con React y Node.js...',
        'generateStructure': 'Generar Estructura',
        'languageFramework': 'Lenguaje/Framework',
        'selectLanguage': 'Selecciona un lenguaje',
        'directoryStructure': 'Estructura de Directorios',
        'directoryPlaceholder': 'Pega tu estructura de directorios aquí o usa el generador de IA arriba...',
        'operatingSystem': 'Sistema Operativo',
        'terminal': 'Terminal',
        'convert': 'Convertir',
        'generatedCommands': 'Comandos Generados:',
        'copyClipboard': 'Copiar al Portapapeles',
        'formatGuide': 'Guía de Formatos',
        'supportedFormats': 'Formatos Soportados:',
        'osLabel': 'Sistema Operativo',
        'terminalLabel': 'Terminal',
        'formatLabel': 'Formato de Entrada',
        'convertButton': 'Convertir',
        'useTemplate': 'Usar Plantilla',
        'commonStructures': 'Estructuras Comunes de Proyectos:',
        'copyButton': 'Copiar al Portapapeles',
        'copiedMessage': '¡Copiado!',
        'previewPlaceholder': 'Los comandos aparecerán aquí...',
        'createDirs': 'Crear directorios',
        'createFiles': 'Crear archivos',
        'formatGuideButton': 'Guía de Formatos',
        'treeStyle': 'Estilo Árbol (Por defecto)',
        'vscodeStyle': 'Estilo VS Code',
        'dashStyle': 'Lista con Guiones',
        'windowsDirStyle': 'Estilo DIR de Windows',
        'dotStyle': 'Notación con Puntos',
        'jsonStyle': 'Formato JSON',
        'yamlStyle': 'Formato YAML',
        'indentedStyle': 'Estilo Indentado',
        'plainStyle': 'Texto Plano',
        'specialNotations': 'Notaciones Especiales:',
        'permissionsNote': 'Permisos',
        'symlinksNote': 'Enlaces simbólicos',
        'structurePlaceholder': 'Pega tu estructura de directorios aquí o selecciona una plantilla arriba...',
        'generatingStructure': 'Generando estructura...',
        'errorGenerating': 'Error al generar la estructura'
    },
    'en': {
        'title': 'Project Structure Command Creator',
        'subtitle': 'Convert your directory structure into shell commands',
        'generateWithAI': 'Generate with AI',
        'describeProject': 'Describe your project',
        'projectPlaceholder': 'Example: I want an e-commerce project with React and Node.js...',
        'generateStructure': 'Generate Structure',
        'languageFramework': 'Language/Framework',
        'selectLanguage': 'Select a language',
        'directoryStructure': 'Directory Structure',
        'directoryPlaceholder': 'Paste your directory structure here or use the AI generator above...',
        'operatingSystem': 'Operating System',
        'terminal': 'Terminal',
        'convert': 'Convert',
        'generatedCommands': 'Generated Commands:',
        'copyClipboard': 'Copy to Clipboard',
        'formatGuide': 'Format Guide',
        'supportedFormats': 'Supported Formats:',
        'osLabel': 'Operating System',
        'terminalLabel': 'Terminal',
        'formatLabel': 'Input Format',
        'convertButton': 'Convert',
        'useTemplate': 'Use Template',
        'commonStructures': 'Common Project Structures:',
        'copyButton': 'Copy to Clipboard',
        'copiedMessage': 'Copied!',
        'previewPlaceholder': 'Commands will appear here...',
        'createDirs': 'Create directories',
        'createFiles': 'Create files',
        'formatGuideButton': 'Format Guide',
        'treeStyle': 'Tree Style (Default)',
        'vscodeStyle': 'VS Code Style',
        'dashStyle': 'List with Dashes',
        'windowsDirStyle': 'Windows DIR Style',
        'dotStyle': 'Dot Notation',
        'jsonStyle': 'JSON Format',
        'yamlStyle': 'YAML Format',
        'indentedStyle': 'Indented Style',
        'plainStyle': 'Plain Text',
        'specialNotations': 'Special Notations:',
        'permissionsNote': 'Permissions',
        'symlinksNote': 'Symlinks',
        'structurePlaceholder': 'Paste your directory structure here or select a template above...',
        'generatingStructure': 'Generating structure...',
        'errorGenerating': 'Error generating structure'
    }
};

// Inicializar el idioma
let currentLang = localStorage.getItem('preferredLanguage') || 'es';

// Función para cambiar el idioma
function switchLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    const t = translations[currentLang];

    // Actualizar todos los elementos
    document.querySelector('h1').textContent = t.title;
    document.querySelector('.lead').textContent = t.subtitle;
    document.querySelector('.card-header h5').textContent = t.generateWithAI;
    document.querySelector('label[for="project_description"]').textContent = t.describeProject;
    document.getElementById('project_description').placeholder = t.projectPlaceholder;
    document.querySelector('[onclick="generateStructure()"]').innerHTML = `<i class="bi bi-robot"></i> ${t.generateStructure}`;
    document.querySelector('label[for="language_select"]').textContent = t.languageFramework;
    document.getElementById('language_select').firstElementChild.textContent = t.selectLanguage;
    document.querySelector('label[for="directory_structure"]').textContent = t.directoryStructure;
    document.getElementById('directory_structure').placeholder = t.directoryPlaceholder;
    document.querySelector('label[for="os_type"]').textContent = t.operatingSystem;
    document.querySelector('label[for="terminal"]').textContent = t.terminal;
    document.querySelector('button[type="submit"]').textContent = t.convert;

    // Actualizar elementos condicionales
    const commandsTitle = document.querySelector('.result .h5');
    if (commandsTitle) commandsTitle.textContent = t.generatedCommands;

    const copyButton = document.querySelector('.copy-button');
    if (copyButton) copyButton.innerHTML = `<i class="bi bi-clipboard"></i> ${t.copyClipboard}`;

    // Actualizar guía de formatos
    const formatGuideButton = document.querySelector('.format-guide button');
    if (formatGuideButton) {
        formatGuideButton.innerHTML = `<i class="bi bi-question-circle"></i> ${t.formatGuide}`;
    }
    
    const formatsTitle = document.querySelector('.supported-formats-text');
    if (formatsTitle) formatsTitle.textContent = t.supportedFormats;
}

// Inicializar la página con el idioma correcto al cargar
document.addEventListener('DOMContentLoaded', function() {
    updatePageText();
    document.documentElement.lang = currentLang;
});

const projectTemplates = {
    python: {
        basic: {
            name: "Proyecto Python Básico",
            description: "Estructura básica para un proyecto Python",
            template: `python_project/
├── src/
│   ├── __init__.py
│   └── main.py
├── tests/
│   └── test_main.py
├── README.md
└── requirements.txt`
        },
        django: {
            name: "Proyecto Django",
            description: "Estructura para una aplicación web Django",
            template: `django_project/
├── manage.py
├── requirements.txt
├── static/
│   ├── css/
│   ├── js/
│   └── images/
├── templates/
│   └── base.html
└── myapp/
    ├── __init__.py
    ├── settings.py
    ├── urls.py
    ├── wsgi.py
    └── apps/
        └── main/
            ├── __init__.py
            ├── models.py
            ├── views.py
            └── templates/`
        },
        fastapi: {
            name: "Proyecto FastAPI",
            description: "Estructura para una API REST con FastAPI",
            template: `fastapi_project/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── dependencies.py
│   ├── routers/
│   │   └── api.py
│   ├── models/
│   │   └── models.py
│   └── schemas/
│       └── schemas.py
├── tests/
├── alembic/
├── .env
└── requirements.txt`
        }
    },
    javascript: {
        react: {
            name: "Proyecto React",
            description: "Estructura para una aplicación React moderna",
            template: `react_project/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   ├── hooks/
│   ├── context/
│   ├── pages/
│   ├── styles/
│   └── App.js
└── package.json`
        },
        node: {
            name: "Proyecto Node.js/Express",
            description: "API REST con Express.js",
            template: `express_project/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── app.js
├── config/
├── tests/
└── package.json`
        },
        next: {
            name: "Proyecto Next.js",
            description: "Aplicación full-stack con Next.js",
            template: `nextjs_project/
├── pages/
│   ├── api/
│   └── _app.js
├── components/
├── public/
├── styles/
└── package.json`
        }
    },
    php: {
        wordpress_theme: {
            name: "Theme WordPress",
            description: "Estructura para un tema de WordPress",
            template: `my-theme/
├── style.css
├── functions.php
├── index.php
├── header.php
├── footer.php
├── sidebar.php
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── template-parts/
    ├── content.php
    └── navigation.php`
        },
        wordpress_plugin: {
            name: "Plugin WordPress",
            description: "Estructura para un plugin de WordPress",
            template: `my-plugin/
├── my-plugin.php
├── includes/
│   ├── class-main.php
│   └── admin/
├── public/
│   ├── css/
│   └── js/
└── admin/
    ├── css/
    └── js/`
        },
        laravel: {
            name: "Proyecto Laravel",
            description: "Estructura para una aplicación Laravel",
            template: `laravel_project/
├── app/
│   ├── Http/
│   ├── Models/
│   └── Services/
├── resources/
│   ├── views/
│   └── js/
├── routes/
└── database/`
        }
    },
    java: {
        spring: {
            name: "Proyecto Spring Boot",
            description: "API REST con Spring Boot",
            template: `spring_project/
├── src/
│   ├── main/
│   │   ├── java/
│   │   └── resources/
│   └── test/
├── pom.xml
└── README.md`
        },
        android: {
            name: "Proyecto Android",
            description: "Aplicación Android nativa",
            template: `android_project/
├── app/
│   ├── src/
│   │   ├── main/
│   │   └── test/
│   └── build.gradle
└── gradle/`
        },
        maven: {
            name: "Proyecto Maven",
            description: "Estructura Maven estándar",
            template: `maven_project/
├── src/
│   ├── main/
│   │   ├── java/
│   │   └── resources/
│   └── test/
├── pom.xml
└── README.md`
        }
    },
    csharp: {
        webapi: {
            name: "ASP.NET Core Web API",
            description: "API REST con .NET Core",
            template: `webapi_project/
├── Controllers/
├── Models/
├── Services/
├── Program.cs
└── Startup.cs`
        },
        wpf: {
            name: "Aplicación WPF",
            description: "Aplicación de escritorio con WPF",
            template: `wpf_project/
├── Views/
├── ViewModels/
├── Models/
├── Services/
└── App.xaml`
        },
        blazor: {
            name: "Proyecto Blazor",
            description: "Aplicación web con Blazor",
            template: `blazor_project/
├── Pages/
├── Shared/
├── Data/
└── Program.cs`
        }
    },
    cpp: {
        cmake: {
            name: "Proyecto CMake",
            description: "Estructura con CMake",
            template: `cpp_project/
├── src/
├── include/
├── tests/
├── CMakeLists.txt
└── README.md`
        },
        qt: {
            name: "Aplicación Qt",
            description: "Aplicación de escritorio con Qt",
            template: `qt_project/
├── src/
├── include/
├── resources/
└── CMakeLists.txt`
        },
        library: {
            name: "Biblioteca C++",
            description: "Estructura para una biblioteca",
            template: `cpp_library/
├── src/
├── include/
├── examples/
└── tests/`
        }
    },
    go: {
        api: {
            name: "API Go",
            description: "API REST con Go",
            template: `go_api/
├── cmd/
│   └── server/
├── internal/
│   ├── handlers/
│   ├── models/
│   └── database/
── pkg/
└── go.mod`
        },
        cli: {
            name: "CLI Go",
            description: "Aplicación de línea de comandos",
            template: `go_cli/
├── cmd/
├── internal/
├── pkg/
└── go.mod`
        },
        microservice: {
            name: "Microservicio Go",
            description: "Microservicio con Go",
            template: `go_service/
├── api/
├── internal/
├── pkg/
├── deployments/
└── go.mod`
        }
    }
};

function updateTemplates() {
    const language = document.getElementById('language_select').value;
    const container = document.getElementById('template_container');
    
    if (!language) {
        container.style.display = 'none';
        return;
    }

    container.style.display = 'flex';
    container.innerHTML = '';

    const templates = projectTemplates[language];
    for (const [key, template] of Object.entries(templates)) {
        container.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h6 class="mb-0">${template.name}</h6>
                        <button class="btn btn-sm btn-outline-secondary" onclick="loadExample('${language}_${key}')">
                            <i class="bi bi-code-square"></i> ${translations[currentLang].useTemplate}
                        </button>
                    </div>
                    <div class="card-body">
                        <p class="text-muted small mb-2">${template.description}</p>
                        <pre class="mb-0"><code>${template.template}</code></pre>
                    </div>
                </div>
            </div>
        `;
    }
}

async function copyToClipboard() {
    const commandsText = document.getElementById('generated-commands').textContent;
    try {
        await navigator.clipboard.writeText(commandsText);
        
        // Mostrar mensaje de éxito
        const copyButton = document.querySelector('.copy-button');
        const originalText = copyButton.innerHTML;
        
        copyButton.innerHTML = '<i class="bi bi-check"></i> ¡Comandos Copiados!';
        copyButton.classList.remove('btn-secondary');
        copyButton.classList.add('btn-success');
        
        setTimeout(() => {
            copyButton.innerHTML = originalText;
            copyButton.classList.remove('btn-success');
            copyButton.classList.add('btn-secondary');
        }, 2000);
        
    } catch (err) {
        console.error('Error al copiar:', err);
        alert('Error al copiar los comandos');
    }
}

// Actualizar opciones de terminal según el SO
document.getElementById('os_type')?.addEventListener('change', function() {
    const terminal = document.getElementById('terminal');
    const os = this.value;
    
    terminal.innerHTML = ''; // Limpiar opciones existentes
    
    if (os === 'windows') {
        terminal.innerHTML = `
            <option value="cmd">Command Prompt (CMD)</option>
            <option value="powershell">PowerShell</option>
        `;
    } else {
        terminal.innerHTML = `
            <option value="bash">Bash</option>
            <option value="zsh">Zsh</option>
        `;
    }
});

// Trigger inicial para establecer las opciones de terminal
document.addEventListener('DOMContentLoaded', function() {
    const osSelect = document.getElementById('os_type');
    if (osSelect) {
        osSelect.dispatchEvent(new Event('change'));
    }
});

// Función para generar estructura con IA
async function generateStructure() {
    const description = document.getElementById('project_description').value;
    const generateButton = document.querySelector('[onclick="generateStructure()"]');
    const originalButtonText = generateButton.innerHTML;
    const t = translations[currentLang];

    if (!description.trim()) {
        alert(t.errorGenerating);
        return;
    }

    try {
        generateButton.innerHTML = `<i class="bi bi-hourglass-split"></i> ${t.generatingStructure}`;
        generateButton.disabled = true;

        const response = await fetch('/generate-structure', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: description })
        });

        const data = await response.json();

        if (response.ok && data.structure) {
            document.getElementById('directory_structure').value = data.structure;
            // Opcional: hacer scroll al textarea
            document.getElementById('directory_structure').scrollIntoView({ behavior: 'smooth' });
        } else {
            throw new Error(data.error || t.errorGenerating);
        }
    } catch (error) {
        alert(error.message);
    } finally {
        generateButton.innerHTML = originalButtonText;
        generateButton.disabled = false;
    }
}