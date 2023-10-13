# Definir una referencia de ejemplo
referencia = {"ERL": "https://www.boe.es/eli/es/rdlg/2010/07/02/1/con",
              "emprendedor de responsabilidad limitada": "https://www.boe.es/eli/es/rdlg/2010/07/02/1/con"}

# Definir una función que busque las palabras clave en un texto y les añada el enlace correspondiente
def añadir_enlaces(texto, referencia):
  # Recorrer las palabras clave y sus enlaces
  for palabra, enlace in referencia.items():
    # Reemplazar la palabra por el código HTML del enlace
    texto = texto.replace(palabra, f"<a href='{enlace}'>{palabra}</a>")
  # Devolver el texto modificado
  return texto

# Ejemplo de uso de la función
texto = "Un emprendedor de responsabilidad limitada es una figura jurídica que permite a los autónomos proteger su vivienda habitual de posibles embargos derivados de su actividad profesional. Para acogerse a esta modalidad, se debe inscribir la vivienda en el Registro Mercantil y cumplir una serie de requisitos. El ERL se creó mediante el Real Decreto Legislativo 1/2010, de 2 de julio."
texto_modificado = añadir_enlaces(texto, referencia)
print(texto_modificado)
