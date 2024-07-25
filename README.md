
# Prueba técnica para Sinapsis
En esta plantilla se especifica como configurar el proyecto y probar en local. 


## Necesitas
Se requiere tener instalado NodeJs(superior a la version 18), Serverless Framework , y  además de MySQL 8 (puedes usar docker para configurar un contenedor de mysql)

 ## Pasos para ejecutar el proyecto
 ### Paso 1
 Descargar el proyecto del repositorio:
 `git clone https://github.com/iwttn/technical-test.git`
### Paso 2 
Ingresar al directorio descargado e instalar las dependencias:
`cd technical-test && npm install` 
### Paso 3
Si estas usando docker deberias ejecutar este comando para crear la imagen y crear el contenedor:
`docker build -t technical-test-image . && docker run -d --name technical-test-container -p 3306:3306 technical-test-image`
**Recuerda que debes tener el puerto 3306 disponible.*
En caso que no uses docker tienes que ingresar al directorio `db_scripts` copiar el contenido del archivo `main.sql` y ejecutarlo con mysql (recomiendo usar la version 8 de mysql). 
### Paso 4
Para poder ejecutar el proyecto de manera local, necesitar ejecutar el siguiente comando:
`sls offline`
Esto levantara la aplicación en el puerto 3000, puedes ver la documentación de la API en la carpeta `docs/openapi.yml`.
### Tener en cuenta
Para poder usar el servicio de Serverless Framework necesitas tener un cuenta en `Serverless Framework` y vincular tu cuenta de `AWS `.
## Despliegue
Para desplegar el proyecto a `AWS` solo necesitar ejecutar el siguiente comando:
`sls deploy`.