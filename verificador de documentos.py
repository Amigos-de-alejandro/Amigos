# Importamos el módulo hashlib para generar el hash
import hashlib

# Definimos la función que calcula el hash de un archivo
def calcular_hash(archivo):
  # Abrimos el archivo en modo binario
  with open(archivo, "rb") as f:
    # Creamos un objeto hash usando el algoritmo SHA-256
    h = hashlib.sha256()
    # Leemos el archivo por bloques de 1024 bytes
    bloque = f.read(1024)
    while bloque:
      # Actualizamos el hash con cada bloque
      h.update(bloque)
      bloque = f.read(1024)
    # Devolvemos el valor hexadecimal del hash
    return h.hexdigest()

# Definimos la función que compara el hash de dos archivos
def comparar_hash(archivo1, archivo2):
  # Calculamos el hash de cada archivo
  hash1 = calcular_hash(archivo1)
  hash2 = calcular_hash(archivo2)
  # Comparamos los hashes y mostramos el resultado
  if hash1 == hash2:
    print("Los archivos son iguales")
  else:
    print("Los archivos son diferentes")

# Definimos una matriz o lista con las direcciones de los archivos que queremos comparar
# Cada elemento de la matriz es una cadena con la dirección del archivo de la web
matriz = [
  "https://example.com/documento1.pdf",
  "https://example.com/documento2.pdf",
  "https://example.com/documento3.pdf"
]

# Recorremos la matriz con un bucle for
for elemento in matriz:
  # Obtenemos la dirección del archivo de cada elemento
  direccion = elemento
  # Descargamos el archivo de la web usando la librería requests
  import requests
  respuesta = requests.get(direccion)
  # Guardamos el contenido del archivo en una variable temporal
  import tempfile
  temp = tempfile.NamedTemporaryFile()
  temp.write(respuesta.content)
  temp.seek(0)
  # Obtenemos el nombre del archivo subido por el usuario usando la librería os
  import os
  nombre = os.path.basename(respuesta.url)
  # Comparamos el hash del archivo subido por el usuario con el hash del archivo descargado de la web
  print(f"Comparando {nombre} con {direccion}:")
  comparar_hash(nombre, temp.name)
  # Cerramos y eliminamos el archivo temporal
  temp.close()
