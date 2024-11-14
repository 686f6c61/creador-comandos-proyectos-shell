# Importaciones necesarias
import os
from openai import OpenAI  # Cliente oficial de OpenAI
from dotenv import load_dotenv  # Para cargar variables de entorno

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Inicializar el cliente de OpenAI con la API key del entorno
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def generate_project_structure(project_description: str) -> str:
    """
    Genera una estructura de directorios basada en la descripción del proyecto usando GPT-3.5-turbo.
    
    Args:
        project_description (str): Descripción en lenguaje natural del proyecto deseado
        
    Returns:
        str: Estructura de directorios en formato árbol
        
    Raises:
        Exception: Cualquier error durante la generación se captura y se devuelve como mensaje
    """
    try:
        # Crear la solicitud a la API de OpenAI
        response = client.chat.completions.create(
            # Modelo a utilizar
            model="gpt-3.5-turbo",
            
            # Mensajes que definen el comportamiento y la solicitud
            messages=[
                {
                    # Mensaje del sistema que define el rol y las reglas
                    "role": "system",
                    "content": """Eres un experto en arquitectura de software que genera estructuras de directorios detalladas.
                    
                    REGLAS IMPORTANTES:
                    1. SIEMPRE incluye archivos dentro de cada carpeta
                    2. Usa las extensiones correctas para cada tipo de archivo
                    3. Incluye archivos de configuración específicos del framework
                    4. Incluye estructura típica de cada framework/lenguaje
                    5. Los directorios DEBEN terminar en /
                    6. Usa el formato árbol con ├── y └── 
                    
                    EJEMPLO Next.js:
                    nextjs_project/
                    ├── pages/
                    │   ├── api/
                    │   │   └── hello.js
                    │   ├── index.js
                    │   └── _app.js
                    ├── components/
                    │   ├── Header.js
                    │   ├── Footer.js
                    │   └── Layout.js
                    ├── public/
                    │   ├── images/
                    │   │   └── logo.png
                    │   └── favicon.ico
                    ├── styles/
                    │   ├── globals.css
                    │   └── Home.module.css
                    ├── lib/
                    │   └── utils.js
                    ├── .env.local
                    ├── .gitignore
                    ├── next.config.js
                    ├── package.json
                    └── README.md

                    NO incluyas explicaciones, solo la estructura."""
                },
                {
                    # Mensaje del usuario con la descripción del proyecto
                    "role": "user",
                    "content": f"Genera una estructura de directorios completa y detallada para: {project_description}"
                }
            ],
            # Parámetros de generación
            temperature=0.7,  # Control de creatividad (0.0 = determinista, 1.0 = más creativo)
            max_tokens=1000   # Límite de tokens en la respuesta
        )
        
        # Extraer y limpiar la respuesta
        return response.choices[0].message.content.strip()
    
    except Exception as e:
        # Capturar y formatear cualquier error
        return f"Error al generar la estructura: {str(e)}" 