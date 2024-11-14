# Creador de comandos para estructuras de proyectos 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Flask](https://img.shields.io/badge/flask-3.1.0-green.svg)](https://flask.palletsprojects.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-blue.svg)](https://openai.com/)

Una herramienta web potente y flexible que convierte estructuras de directorios en comandos shell ejecutables, con soporte para múltiples formatos y generación de estructuras mediante IA.

## 🌟 Características

- 🤖 **Generación con IA**: Crea estructuras de proyectos mediante descripción en lenguaje natural
- 🔄 **Múltiples formatos de entrada**: Soporta 9 formatos diferentes de estructuras de directorios
- 🖥️ **Multi-plataforma**: Compatible con Windows, Linux y MacOS
- 🛠️ **Múltiples terminales**: Soporte para Bash, Zsh, CMD y PowerShell
- 🌍 **Internacionalización**: Interfaz en español e inglés
- 📋 **Plantillas predefinidas**: Para frameworks y lenguajes populares
- 📱 **Diseño responsive**: Adaptable a cualquier dispositivo


## 🚀 Instalación

1. Clona el repositorio:
   ```
   bash
   git clone https://github.com/686f6c61/creador-comandos-proyectos-shell.git
   cd directory-to-commands 
   ```
2. Crea un entorno virtual:
   ```
   python3 -m venv venv
   source venv/bin/activate # En Windows: venv\Scripts\activate

   ```

3. Instala las dependencias:
   ```
   pip install -r requirements.txt
   ```  
4. Configura las variables de entorno:
   ```
   .env
   Edita .env y añade tu OPENAI_API_KEY

   ```
5. Ejecuta la aplicación:
   ```
    bash
    python main.py
   ```

## 🎯 Uso

### Método 1: Generación con IA

1. Describe tu proyecto en lenguaje natural
2. La IA generará una estructura de directorios completa
3. Selecciona el sistema operativo y terminal
4. Obtén los comandos shell para crear la estructura

Ejemplo:
Quiero un proyecto de comercio electrónico con React y Node.js


### Método 2: Plantillas predefinidas

1. Selecciona un lenguaje/framework
2. Elige una plantilla predefinida
3. Personaliza la estructura si lo deseas
4. Genera los comandos

### Método 3: Estructura manual

1. Pega tu estructura de directorios en cualquier formato soportado
2. Selecciona el sistema operativo y terminal
3. Obtén los comandos shell

## 📝 Formatos Soportados

1. **Estilo Árbol** (Por defecto)
    ```
    project/
    ├── src/
    │   ├── main.py
    │   └── utils/
    └── tests/
        └── test_main.py
    ```

[Ver todos los formatos soportados](#-formatos-soportados)

## 🤖 Generación con IA

### Prompt de IA

La herramienta utiliza GPT-3.5-turbo con un prompt especializado:
python
SYSTEM_PROMPT = """Eres un experto en arquitectura de software que genera estructuras de directorios detalladas.
REGLAS IMPORTANTES:

1. SIEMPRE incluye archivos dentro de cada carpeta
2. Usa las extensiones correctas para cada tipo de archivo
3. Incluye archivos de configuración específicos del framework
4. Incluye estructura típica de cada framework/lenguaje
5. Los directorios DEBEN terminar en /
6. Usa el formato árbol con ├── y └──

### Ejemplos de uso

1. **Aplicación React con TypeScript**
   
```
Quiero una aplicación React con TypeScript, testing y storybook
    
```

## 📚 Plantillas

La herramienta incluye plantillas para:

- Python (Basic, Django, FastAPI)
- JavaScript (React, Node.js, Next.js)
- PHP (WordPress Theme, Plugin, Laravel)
- Java (Spring Boot, Android, Maven)
- C# (ASP.NET Core, WPF, Blazor)
- C++ (CMake, Qt, Library)
- Go (API, CLI, Microservice)

## 🔌 API

### Generar estructura con IA
bash
curl -X POST http://localhost:5000/generate-structure \
-H "Content-Type: application/json" \
-d '{"description": "proyecto react con typescript"}'



### Tecnologías utilizadas

- **Backend**: Flask
- **Frontend**: Bootstrap 5
- **IA**: OpenAI GPT-3.5-turbo
- **Internacionalización**: JavaScript
- **Estilos**: CSS personalizado

## 👥 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.


