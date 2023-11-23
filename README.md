# PRI-ENFERMERAS 2023 (B)





	

     
**MANUAL TÉCNICO**





                                        





`                                             `**DOCENTE:**  	        Ing. Gaston Silva Sanchez

`                                             `**ESTUDIANTES:**      Roger Brandon Farfan Villamonte

`		                                            `Danny Rafael Corani Beltran

`		                                            `Jhohann Antonio Claros Vega



**Fecha: 21/11/2023**





**Manual Técnico**

1. **Introducción.**

   Los pacientes suelen requerir muchas veces, servicios de salud básicos y generales, sin embargo en ocasiones se les hace muy difícil llegar hasta el hospital. Es por dicha razón que se creó esta solución de software. Nuestro proyecto es capaz de solucionar mencionada problemática de muy buena manera, abriendo la posibilidad de ser atendidos en diferentes lugares del departamento, además de brindar oportunidades laborales.

1. **Descripción de proyecto.**

El proyecto PRI-ENFERMERAS, con su aplicación móvil SISEEM(Sistema de servicios de enfermeros móvil) es una herramienta muy útil para  un gran grupo de personas las cuales requieres de servicios de salud generales, y prefieren evitar tener que ir hasta el hospital por ellos. Es así que mediante el uso de nuestra aplicación móvil, los clientes podrán solicitar los servicios que requieran, y el enfermero que acepte podrá brindar su trabajo a domicilio, brindando también oportunidades de empleo. Además que el encargado de administrar esta lógica de negocio podrá tener acceso a toso lo necesario para gestionar el mismo, quedando para una primera versión muy funcional, esperando por actualizaciones con pequeños detalles que lo conviertan en un software listo para ser vendido o subido a la tienda

1. **Roles / integrantes.**

|**Integrantes**|Rol|
| :-: | :-: |
|Farfan Villamonte Roger Brandon|Team Leader / DB Architect|
|Corani Beltran Danny Rafael|Developer / Scrum Master  |
|Claros Vega Johan Antonio|Git Master|

1. **Arquitectura del software.**

Para el correcto funcionamiento de nuestro sistema, se realizó uso de varios componentes, muchos de ellos van de la mano con FIREBASE y sus servicios que nos brinda para aplicaciones móviles

Se hizo el uso de la arquitectura cliente-servidor además estamos siguiendo una arquitecura basada en servicios en la nube.

Para la mayor parte de módulos de software de nuestro proyecto, utilizamos firestore, para tener nuestros datos centralizados y correctamente ordenados. También se usó Realtime Database de Firebase, esto con el objetivo de obtener ciertos datos en tiempo real de forma más sencilla y menos costosa en cuanto a recursos

Como ambas base de datos ya vienen con la API de Firebase, simplemente es necesario crearlas de manera correcta y empezar a trabajar

La lógica de la aplicación e interfaces de usuario se la desarrollo en REACT NATIVE, haciendo uso de javascript. Además se uso Expo con el objetivo de trabajar en multiplataforma y gestionar las configuraciones de manera sencilla

Adicionalmete usamos Cloud Functions, para ejecutar determinadas funciones con métodos http en la nube, para obtener cierta información, enviar mensajes, correos, etc.

Para el proceso de autenticación y autorización se usó Firebase Authentication


**Interacciones entre componentes:**

Nuestro sistema se comunica con la base de datos a través de la API de Firebase. Obtenemos, actualizamos y usamos los datos a través de los métodos que nos brinda firebase.

Con los datos obtenidos se puede desarrollar las interfaces de usuario de forma cómoda usando los conceptos básicos de React, además de poder hacer las acciones de lectura y escritura fácilmente

Además, se tiene una clase específica para comunicarnos con nuestro Cloud Functions (mediante solicitudes HTTP), para que ejecute una función en específico.

**Patrones de diseño:**

Para el desarrollo del proyecto tratamos de realizar una variante del patrón de diseño DAO, contando por un lado con la interfaz de usuario, por otro lado las clases Modelo y por otro un conjunto de clases específicas para la comunicación con la fuente de datos o datasource, que en este caso serían las base de datos de FIREBASE.

Además es importante mencionar que cada lógica de la aplicación estamos usando el patrón de Diseño Observer con el objetivo de mantener los diferentes roles comunicados durantes los distintos procesos.

Se separó la interfaz de su lógica e interacción con la base de datos. Sin embargo algunos métodos en tiempo real se mantuvieron en los archivps de interfaz para facilitar su uso y lograr resultados óptimos

1. **Requisitos del sistema.**

   **Requerimientos de Hardware (mínimo):**  Android  y/o IOS. 2 GB RAM

**Requerimientos de Software: (cliente):**

Android 6 y posterior. IOS

**Requerimientos de Hardware (server/ hosting/BD)**

La base de datos se encuentra en la nube. Es decir que se aloja en los servidores de Google.

1. **Instalación y configuración.** 

   Si el sistema se mantendrá en fase de desarrollo, lo único que se debe hacer es acceder al APK de la aplicación Móvil y ejecutar la aplicación.

Es de **suma importancia** tener la ubicación del teléfono activada y tener ACCESO a INTERNET.

Es probable que al momento de instalar la aplicación salte una advertencia de que no es confiable ya que cuenta con una clave SHA1 y no ha sido subida a la tienda. Así que se debe desplegar y ver completa la advertencia, y colocar “instalar de todos modos”.

Para acceder a la aplicación contamos con 3 usuarios de prueba:

<robra137@gmail.com>   **Contraseña**:12345678 **Rol**: Paciente

<brand8n123@gmail.com>   **Contraseña**:12345678 **Rol**: Administrador

<flor@gmail.com>   **Contraseña**:12345678.  **Rol**: Enfermero

También se puede ejecutar la aplicación en un ambiente de prueba usando Expo. Una vez obtenido el proyecto de git. Ejecutamos el comando npm install y luego “npx exp start” y ya podremos ejecutar la aplicación con funcionalidades básicas tanto en ANDROID como en IOS. (Desde la aplicación expo go se debe escanear el QR)

` `Sin embargo si se llevará la aplicación a un ambiente de producción, se debe de crear las claves API de google (para el uso del mapa) y el proyecto nuevo de Firebase desde la respectiva cuenta institucional.

Para IOS el proceso de instalación es más complejo, ya que debemos tener una cuenta de paga de desarrollador. Una vez contamos con esa cuenta se debe generar el archivo “.ipa” (se puede usar cualquier herramienta, nosotros recomendamos usar expo, adjuntaremos la documentación oficial en caso de dudas) subir la aplicación a AppStore Connect y ahí podemos probarla en los dispositivos IOS usando TestFlight, o subiéndola a AppStore, pero en ese caso debemos esperar que aprueben nuestra app.

1. **Procedimiento de hosteado / hosting.**

   Es muy importante comprender que nuestra aplicación móvil está trabajando con servicios en la nube de Firebase. Por lo que **las conexiones con dichos servicios se realizan de forma automática** al conectar nuestra aplicación al proyecto de firebase. Es por dicha razón que es obligatorio tener acceso a Internet para usar nuestra Aplicación.

Entonces, una vez generado el APK o el IPA(ios**), se puede ejecutar y usar la aplicación desde cualquier parte del mundo.**

Entonces, mientras no se ponga en producción la app, no hace falta realizar procedimientos adicionales ni complicadas configuraciones. Simplemente ejecutar la app.

Sin embargo**, si la aplicación se va a poner en producción**, hay una serie de pasos que deben realizarse:

- Se debe crear un proyecto en FIREBASE con la cuenta que tenga habilitada la facturación. A este proyecto añadir 3 apps Android, IOS y WEB, con el objetivo de hacer configuraciones más adelante.
- Se debe habilitar los siguientes servicios: Firestore, RealtimeDatabase, Storage, Authentication y Functions
- Es importante que Firestore tenga las colecciones que facilitamos a continuación:

  ![Texto alternativo](https://i.imgur.com/b5CGVXn.png)


- Es importante que RealtimeDatabase tenga la siguiente estructura simple:


 ![Texto alternativo](https://i.imgur.com/Zva38ns.png)

- Storage debe tener las siguientes carpetas:

   ![Texto alternativo](https://i.imgur.com/OaeocqF.png)

- Authentication debe tener el proveedor de correo electrónico y Google.

  Además, en el repositorio git facilitamos la carpeta FIREBASE CLI. En functions, index, se debe cambiar el correo por el nuevo, institucional. (El password debe ser la clave que nos proporciona google al habilitar nuestra cuenta gmail para aplicaciones de terceros. En “referencias” dejamos documentación oficial en caso de que se desconozca del tema)

- Ir a configuración del proyecto de firebase, y en configuración del sdk web copiar la función “firebaseconfig” y pegarla en el archivo del mismo nombre de nuestro proyecto.
- Navegar por consola hasta la carpeta firebasecli y colocar “firebase use idProyectoFirebase  –add” y finalmente: “firebase deploy --only functions”

  (añadir “npx” delante de firebase si es que no se tiene la consola de firebase en el dispositivo, u ocurre algún error), De ese modo ya tenemos la función de enviar correos de firebase en la nube. 

- En tools/mailsender del proyecto, cambiar simplemente la url de la solicitud por la nueva creada.




Contamos con diferentes ApiKey de **DESARROLLO** las cuales están con cuentas gratuitas. Tenemos dos ApiKey para el inicio de sesión con Google (Android y IOS). Otras dos ApiKey para el uso de mapas  (Android y IOS). Y una ApiKey para el trazado de rutas.

Entonces, es importante que estas ApiKey se vuelvan a generar con la cuenta de producción de Google Cloud, la cual debe tener habilitada la facturación:

**ApiKey(credencial oAuth) inicio sesión Google:**

Es importante tener en cuenta que nuestro **package name** es: **com.pri.enfermeros ,** esto puede servir para configuraciones adicionales que se quieran hacer en un futuro. (si se quiere cambiar el mismo, se debe hacerlo en el archivo app.json de nuestro proyecto)

- Una vez creada la cuenta de google cloud, se debe crear un PROYECTO de la forma tradicional y luego se debe añadir las credenciales (Oauth) de la siguiente manera:

   ![Texto alternativo](https://i.imgur.com/Z7fMOC3.png)

Colocar en huella digital la misma que se muestra, o si se decidió generar una nueva  colocar la que corresponda.

Para IOS se debe hacer lo mismo:

  ![Texto alternativo](https://i.imgur.com/R2x4RsO.png)

Estas dos claves o “Id Cliente” simplemente se deben poner reemplazando las que se encuentran en el componente “Login.js” de nuestro proyecto.

Además en el servicio auth de firebase se debe añadir estas dos claves, en la sección de Proveedor Google: 
![Texto alternativo](https://i.imgur.com/oxZxanM.png)

Finalmente se deben generar 3 apiKey más. Dos para mapas (IOS y Android) y una para rutas.

En el proyecto de google cloud se debe habilitar el sdk de mapas para IOS y Android. Luego, generamos el api key de forma tradicional (sección credenciales), sin embargo **es importante que esta sea restringida,** de la siguiente manera:

![Texto alternativo](https://i.imgur.com/SSNNXne.png)

(Se deben colocar el nombre del paquete y la huella de anteriormente mencionados. O si se cambió, colocar las nuevas.

Se repite el proceso para la Api key de IOS.

Una vez obtenidas estas dos api key se las debe colocar en el archivo “app.json” reemplazando las anteriores de prueba.

Finalmente generar la última api key para rutas, de forma tradicional y sin restricciones.

(habilitar rutas en el proyecto de cloud storage).

Esta api key se debe colocar en todos los componentes <MapViewDirections>

Y de esa manera ya tendrá listo el sistema para subirlo a cualquier tienda

Para generar el apk firmado, nosotros usamos expo. Por lo que compartimos los pasos básicos para generar el apk:

- Se debe tener cuenta en expo.
- Nuestro proyecto subido a git, simplemente requiere que se ejecute el siguiente comando:
- “npm install” (por si fue hecho antes) y “eas build -p android --profile preview”.
- Si ocurre algún error, generalmente se debe a que no se tiene instalada la consola para “eas”, eso se soluciona instalando la misma con npm. 
- Borrar el projectid de app.json antes de generar el apk la primera vez.
- Deberá acceder a su cuenta de expo desde la consola, al generar el apk puede usar una clave SHA ya creada o crear una nueva. Recomendamos crear una nueva.
- Seguir los pasos indicados por la consola que suelen ser intuitivos.
- Finalmente se debe esperar y descargar el apk.
- Para IOS el proceso es muy similar, sin embargo también tendrá que acceder a su cuenta de AppStoreConnect (la cual es de paga).
- Debe mandar el archivo a su proyecto de app store connect.
- Subirlo a la tienda o compartirlo por testflight

Verificar que las reglas de los servicios de Firebase permitan lectura y escritura: Ejemplo:

rules\_version = '2';

service cloud.firestore {

`  `match /databases/{database}/documents {

`    `match /{document=\*\*} {

`      `allow write, read: if true;

`    `}

`  `}

}

Cualquier inconveniente recomendamos revisar la documentación oficial que facilitaremos más adelante.

1. **GIT.**

   **Link al Git del proyecto**

<https://github.com/Jhohann28/PRI-ENFERMERAS.git>

Link a Descarga APK:

<https://expo.dev/artifacts/eas/pFV18uvvaxARiencwjHkzz.apk>

1. **Personalización y configuración.**

El sistema no requiere de personalización o alguna configuración adicional. En caso de querer cambiar la paleta de colores o detalles de la interfaz, se deben dirigir a la carpeta “Styles”, que es donde manejamos toda la parte de la estética y presentación de la aplicación.

1. **Seguridad.**

   El sistema cuenta con una capa de seguridad bastante sólida.

El sistema esta aprovechando al máximo todos los servicios que nos brinda firebase, es por eso que para el proceso de autenticación y autorización se está realizando el uso del servicio Authentication. Tenemos dos proveedores: Uno, que es la forma tradicional de loguearse, con correo y contraseña, y el otro proveedor es Google, el cual da acceso a nuestro aplicación (Solo como paciente) mediante el uso de las cuentas de Gmail.

Adicionalmente en la base de datos estamos gestionando los roles de usuario, esto con el fin de autorizar y redireccionar  a la ventana que corresponda.

Es muy útil el uso de este servicio ya que no tenemos que encriptar la contraseña porque practicamente nunca tenemos acceso a ella, simplemente el servicio se encarga de gestionarlas por el mismo.

Al haber implementado este servicio, es imposible que alguien no identificado ingrese al sistema. Todo usuario del sistema debe de haber pasado antes por la autenticación, al menos la primera vez que ingrese.

Finalmente al haber separado el login según el rol. Se está verificando que el usuario tenga los permisos correspondientes para acceder a determinada funcionalidad.

1. **Depuración y solución de problemas.**

   En caso de error al enviar cualquier formulario de registro se debe verificar la conexión a internet.

Para identificar y comprender adecuadamente los problemas específicos relacionados con la arquitectura de mi proyecto, se recomienda seguir estos pasos:

a) Reproducción del problema: Intentar recrear el problema de manera sistemática para comprender su origen y los pasos necesarios para replicarlo de manera consistente.

b) Análisis de registros y mensajes de error: Examinar los registros de la aplicación y los mensajes de error para obtener información relevante sobre el problema en cuestión. 

c) En caso de no encontrar mensaje de error aparente, conectar el dispositivo a Android Studio y revisar el Logcat

Solución de problemas:

Según el problema encontrado se debe seguir lo siguiente

a) Verificación de la configuración: Asegurarse de que todas las configuraciones necesarias para la interacción con la base de datos y los servicios de Firebase se hayan hecho de forma correcta

b) Examen del código: Analizar minuciosamente el código relacionado con el problema específico, revisar los archivos de la carpeta DATA, si es un problema relacionado a la base de datos. O los archivos “Components” si es relacionado a la interfaz de usuario. Normalmente, cuando hay errores, se recomienda ejectar la aplicación en “Expo Go” con el objetivo de obtener el mensaje de error lo más descriptivo posible

Posibles conflictos con otros sistemas o componentes:

Durante el desarrollo de mi proyecto, es importante tener en cuenta posibles conflictos con otros sistemas o componentes específicos en el entorno de Azure. Aquí hay algunas recomendaciones para evitar o resolver estos conflictos en el contexto de mi proyecto:

a) Verificación de la configuración de Firebase: Se debe asegurar de tener todos los servicios de firebase habilitados, además de tener las reglas de uso adecuadas de cada uno de ellos

c) Actualización de las versiones y compatibilidad: Para futuras actualizaciones es importante mantener actualizados los componentes y librerías usadas, no sin antes verificar que dicha actualización no afectará el funcionamiento del sistema.

1. **Glosario de términos.**
- **Firestore:** 



Firestore es un servicio de base de datos en la nube proporcionado por Firebase, que es una plataforma de desarrollo de aplicaciones móviles y web creada por Google. Firestore es una base de datos NoSQL en tiempo real que permite almacenar y sincronizar datos entre los clientes y la nube de forma eficiente. Está diseñado para ser escalable, permitiendo el acceso y la actualización rápida de datos en aplicaciones web y móviles. 



- **Firebase:** 



Firebase es una plataforma integral de desarrollo de aplicaciones móviles y web desarrollada por Google. Proporciona una variedad de herramientas y servicios para ayudar a los desarrolladores a crear, mejorar y hacer crecer sus aplicaciones. Algunos de los servicios que ofrece Firebase incluyen bases de datos en tiempo real, autenticación de usuarios, almacenamiento en la nube, análisis, mensajería, pruebas y más. 



- **Storage:** 



En el contexto de la informática, el almacenamiento (Storage en inglés) se refiere al lugar donde se guardan y conservan datos, archivos y cualquier otro tipo de información digital. Puede ser almacenamiento en la nube, como el ofrecido por servicios como Firebase, o almacenamiento local en dispositivos físicos como discos duros, unidades flash USB, tarjetas de memoria, entre otros. 



- **Expo:** 



Expo es una plataforma de código abierto que simplifica el proceso de desarrollo de aplicaciones móviles utilizando React Native. Proporciona herramientas, bibliotecas y servicios listos para usar que permiten a los desarrolladores crear aplicaciones móviles de manera más rápida y sencilla, incluyendo características como la vista previa en tiempo real de la aplicación en dispositivos móviles y la gestión de activos. 



- **React Native:** 



React Native es un marco de desarrollo de aplicaciones móviles creado por Facebook. Permite a los desarrolladores construir aplicaciones nativas para iOS y Android utilizando JavaScript y React, un popular marco de trabajo para la creación de interfaces de usuario. React Native permite el desarrollo de aplicaciones móviles multiplataforma, lo que significa que gran parte del código base se puede reutilizar entre las diferentes plataformas. 



- **Javascript:** 



JavaScript es un lenguaje de programación ampliamente utilizado en el desarrollo web. Es un lenguaje de programación de alto nivel, interpretado, orientado a objetos y con tipado dinámico. Se utiliza principalmente para agregar interactividad a las páginas web, pero también se emplea en el desarrollo de aplicaciones web, servidores, aplicaciones móviles y una variedad de otros contextos de desarrollo de software. 



1. **Referencias y recursos adicionales.**

   **GENERAR CLAVE PARA GMAIL (Envío de Correos)**

[**https://support.google.com/mail/answer/185833?hl=es-419**](https://support.google.com/mail/answer/185833?hl=es-419)

**Construcción de Apks y IOS con expo:**

[**https://docs.expo.dev/build-reference/apk/**](https://docs.expo.dev/build-reference/apk/)

**Google Sign In, Firebase:**

[**https://youtu.be/hLRPkVwgg7w?si=j0k_oGroskzow0hw**](https://youtu.be/hLRPkVwgg7w?si=j0k_oGroskzow0hw)


1. **Herramientas de implementación.**
- Visual Studio Code.
- GIT HUB
- Firebase
- Expo 
- React Native
- Javascript
- Google Cloud (Maps, Routes, SDK android y IOS)


1. **Bibliografía:**
- *Introduction · REACT NATIVE* (2023) *React Native RSS*. Available at: https://reactnative.dev/docs/getting-started (Accessed: 22 November 2023).  

- (No date) *DevDocs*. Available at: https://devdocs.io/javascript/ (Accessed: 22 November 2023).  

- MozDevNet (no date) *JavaScript: MDN*, *MDN Web Docs*. Available at: https://developer.mozilla.org/es/docs/Web/JavaScript (Accessed: 22 November 2023).  


- _Documentación de **Firebase**_** (no date) _Google_. Available at: https://firebase.google.com/docs?hl=es-419 (Accessed: 22 November 2023).  

- *Create amazing apps that run everywhere* (no date) ***Expo Documentation*.** Available at: https://docs.expo.dev/ (Accessed: 22 November 2023).  





