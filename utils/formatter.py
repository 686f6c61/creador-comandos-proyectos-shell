def normalize_to_tree(text: str) -> str:
    """
    Normaliza diferentes formatos de estructura de directorios al formato árbol estándar.
    
    Args:
        text (str): Texto con la estructura de directorios en cualquier formato soportado
        
    Returns:
        str: Estructura de directorios en formato árbol (con caracteres ├── y └──)
    """
    lines = text.strip().split('\n')
    
    # Detectar el formato basado en características específicas
    if any('│' in line or '├' in line or '└' in line for line in lines):
        return text  # Ya está en formato árbol, no necesita conversión
    
    # Formato VS Code (líneas que comienzan con '>' o '-')
    elif any(line.strip().startswith('>') or line.strip().startswith('-') for line in lines):
        return convert_vscode_to_tree(lines)
    
    # Formato con guiones (todas las líneas comienzan con '-' o están vacías)
    elif all(not line.strip() or line.strip().startswith('-') for line in lines):
        return convert_dash_to_tree(lines)
    
    # Formato Windows DIR (contiene '<DIR>')
    elif any('<DIR>' in line for line in lines):
        return convert_dir_to_tree(lines)
    
    # Formato JSON (comienza con '{')
    elif text.strip().startswith('{'):
        return convert_json_to_tree(text)
    
    # Formato YAML (contiene ':' y no tiene caracteres de árbol)
    elif ':' in text and not any(['│', '├', '└', '<DIR>', '{'] in line for line in lines):
        return convert_yaml_to_tree(text)
    
    # Formato indentado o texto plano (por defecto)
    else:
        return convert_indented_to_tree(lines)

def convert_vscode_to_tree(lines: list) -> str:
    """
    Convierte el formato VS Code (> carpeta, - archivo) a formato árbol.
    
    Args:
        lines (list): Lista de líneas en formato VS Code
        
    Returns:
        str: Estructura en formato árbol
    
    TODO: Implementar la conversión completa
    """
    return "\n".join(lines)

def convert_dash_to_tree(lines: list) -> str:
    """
    Convierte el formato de guiones (- carpeta/) a formato árbol.
    
    Args:
        lines (list): Lista de líneas con formato de guiones
        
    Returns:
        str: Estructura en formato árbol
    
    TODO: Implementar la conversión completa
    """
    return "\n".join(lines)

def convert_dir_to_tree(lines: list) -> str:
    """
    Convierte la salida del comando DIR de Windows a formato árbol.
    
    Args:
        lines (list): Lista de líneas de la salida de DIR
        
    Returns:
        str: Estructura en formato árbol
    
    TODO: Implementar la conversión completa
    """
    return "\n".join(lines)

def convert_json_to_tree(text: str) -> str:
    """
    Convierte una estructura JSON a formato árbol.
    
    Args:
        text (str): Texto en formato JSON
        
    Returns:
        str: Estructura en formato árbol
    
    TODO: Implementar la conversión completa
    """
    return text

def convert_yaml_to_tree(text: str) -> str:
    """
    Convierte una estructura YAML a formato árbol.
    
    Args:
        text (str): Texto en formato YAML
        
    Returns:
        str: Estructura en formato árbol
    
    TODO: Implementar la conversión completa
    """
    return text

def convert_indented_to_tree(lines: list) -> str:
    """
    Convierte texto indentado o plano a formato árbol.
    
    Args:
        lines (list): Lista de líneas con indentación o texto plano
        
    Returns:
        str: Estructura en formato árbol
    
    TODO: Implementar la conversión completa
    """
    return "\n".join(lines) 