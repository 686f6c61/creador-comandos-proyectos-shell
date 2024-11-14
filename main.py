from flask import Flask, render_template, request, jsonify
from utils import convert_to_commands, generate_project_structure, normalize_to_tree

# Inicialización de la aplicación Flask
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    """
    Ruta principal que maneja tanto la visualización del formulario (GET)
    como el procesamiento de la estructura de directorios (POST).
    
    Returns:
        render_template: Renderiza index.html con los comandos generados si existen
    """
    commands = None
    if request.method == 'POST':
        # Obtener datos del formulario
        directory_structure = request.form.get('directory_structure', '').strip()
        os_type = request.form.get('os_type', 'linux')  # Sistema operativo por defecto: Linux
        terminal = request.form.get('terminal', 'bash')  # Terminal por defecto: Bash
        
        if directory_structure:
            # Normalizar la estructura a formato árbol
            normalized_structure = normalize_to_tree(directory_structure)
            # Convertir la estructura normalizada a comandos shell
            commands = convert_to_commands(normalized_structure, os_type, terminal)
    
    return render_template('index.html', commands=commands)

@app.route('/generate-structure', methods=['POST'])
def generate_structure():
    """
    Endpoint de API que genera una estructura de directorios usando IA.
    
    Espera un JSON con el campo 'description' que contiene la descripción del proyecto.
    
    Returns:
        jsonify: JSON con la estructura generada o mensaje de error
        int: Código de estado HTTP
    """
    try:
        # Obtener y validar los datos JSON
        data = request.get_json()
        description = data.get('description', '')
        if not description:
            return jsonify({'error': 'Descripción vacía'}), 400
        
        # Generar estructura usando IA
        structure = generate_project_structure(description)
        return jsonify({'structure': structure})
    except Exception as e:
        # Manejar cualquier error que ocurra durante la generación
        return jsonify({'error': str(e)}), 500

# Ejecutar la aplicación en modo debug si se ejecuta directamente
if __name__ == '__main__':
    app.run(debug=True)
