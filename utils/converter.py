def get_cmd_template(os_type: str, terminal: str) -> dict:
    """
    Obtiene la plantilla de comandos según el sistema operativo y terminal.
    
    Args:
        os_type (str): Sistema operativo ('windows', 'linux', 'mac')
        terminal (str): Terminal ('cmd', 'powershell', 'bash', 'zsh')
        
    Returns:
        dict: Diccionario con los comandos específicos para el SO y terminal
    """
    templates = {
        'windows': {
            'cmd': {
                'mkdir': 'mkdir "{}"',        # Crear directorio en CMD
                'touch': 'type nul > "{}"',   # Crear archivo vacío en CMD
                'comment': 'REM {}',          # Formato de comentarios en CMD
                'sep': '\\'                   # Separador de rutas en Windows
            },
            'powershell': {
                'mkdir': 'New-Item -ItemType Directory -Path "{}" -Force',  # Crear directorio en PowerShell
                'touch': 'New-Item -ItemType File -Path "{}" -Force',       # Crear archivo en PowerShell
                'comment': '# {}',                                          # Formato de comentarios en PowerShell
                'sep': '\\'                                                 # Separador de rutas en Windows
            }
        },
        'linux': {
            'bash': {
                'mkdir': 'mkdir -p "{}"',     # Crear directorio en Bash (-p para crear padres)
                'touch': 'touch "{}"',        # Crear archivo vacío en Bash
                'comment': '# {}',            # Formato de comentarios en Bash
                'sep': '/'                    # Separador de rutas en Linux
            },
            'zsh': {
                'mkdir': 'mkdir -p "{}"',     # Crear directorio en Zsh
                'touch': 'touch "{}"',        # Crear archivo vacío en Zsh
                'comment': '# {}',            # Formato de comentarios en Zsh
                'sep': '/'                    # Separador de rutas en Linux
            }
        },
        'mac': {
            'bash': {
                'mkdir': 'mkdir -p "{}"',     # Crear directorio en Bash (macOS)
                'touch': 'touch "{}"',        # Crear archivo vacío en Bash (macOS)
                'comment': '# {}',            # Formato de comentarios en Bash
                'sep': '/'                    # Separador de rutas en macOS
            },
            'zsh': {
                'mkdir': 'mkdir -p "{}"',     # Crear directorio en Zsh (macOS)
                'touch': 'touch "{}"',        # Crear archivo vacío en Zsh (macOS)
                'comment': '# {}',            # Formato de comentarios en Zsh
                'sep': '/'                    # Separador de rutas en macOS
            }
        }
    }
    return templates[os_type][terminal]

def convert_to_commands(directory_structure: str, os_type: str, terminal: str, format_type: str = None) -> str:
    """
    Convierte una estructura de directorios en comandos shell.
    
    Args:
        directory_structure (str): Estructura de directorios en formato árbol
        os_type (str): Sistema operativo objetivo
        terminal (str): Terminal objetivo
        format_type (str, optional): Tipo de formato de entrada
        
    Returns:
        str: Comandos shell para crear la estructura
    """
    if not directory_structure:
        return ""
        
    # Filtrar líneas vacías
    lines = [line for line in directory_structure.split('\n') if line.strip()]
    
    # Obtener plantilla de comandos para el SO y terminal
    cmd_template = get_cmd_template(os_type, terminal)
    
    # Estructuras para almacenar rutas
    current_path = []    # Ruta actual en el árbol
    directories = set()  # Conjunto de directorios únicos
    files = set()       # Conjunto de archivos únicos
    
    def get_depth_and_name(line):
        """
        Extrae la profundidad y nombre de una línea del árbol.
        
        Args:
            line (str): Línea del árbol de directorios
            
        Returns:
            tuple: (profundidad, nombre_del_elemento)
        """
        # Calcular profundidad basada en caracteres de formato
        depth = 0
        for char in line:
            if char in ['│', ' ', '├', '└']:
                depth += 1
            else:
                break
        depth = depth // 2  # Normalizar la profundidad
        
        # Limpiar el nombre de caracteres de formato
        name = line.strip()
        for char in ['├──', '└──', '│', '─', '├', '└']:
            name = name.replace(char, '')
        name = name.strip()
        
        return depth, name

    # Procesar cada línea de la estructura
    for line in lines:
        if not line.strip():
            continue
            
        # Obtener profundidad y nombre del elemento
        depth, name = get_depth_and_name(line)
        
        # Ajustar la ruta actual según la profundidad
        while len(current_path) > depth:
            current_path.pop()
            
        # Procesar directorios y archivos
        if name.endswith('/'):
            # Es un directorio
            name = name.rstrip('/')
            current_path.append(name)
            full_path = cmd_template['sep'].join(current_path)
            directories.add(full_path)
        else:
            # Es un archivo
            full_path = cmd_template['sep'].join(current_path + [name])
            files.add(full_path)
            if current_path:
                # Añadir el directorio padre
                parent_path = cmd_template['sep'].join(current_path)
                directories.add(parent_path)
    
    # Generar comandos shell
    commands = []
    # Comandos para crear directorios
    commands.append(cmd_template['comment'].format('Crear directorios'))
    if directories:
        commands.append(cmd_template['mkdir'].format('" "'.join(sorted(directories))))
    
    commands.append('')
    # Comandos para crear archivos
    commands.append(cmd_template['comment'].format('Crear archivos'))
    if files:
        commands.append(cmd_template['touch'].format('" "'.join(sorted(files))))
    
    return '\n'.join(commands) 