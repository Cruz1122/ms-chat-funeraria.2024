# Microservicio de Chat - Funeraria Digital

Este microservicio está diseñado para proporcionar funcionalidades de chat en tiempo real para el sistema funerario, utilizando Node.js, Express y Socket.IO.

> **ADVERTENCIA IMPORTANTE:** Este microservicio se encuentra en un estado de prototipo y **no es funcional ni seguro para un entorno de producción**. Contiene vulnerabilidades críticas de seguridad y errores de lógica que impiden su correcto funcionamiento. Se recomienda una reescritura completa antes de su uso.

## Tabla de Contenidos

1.  [Descripción General](#descripción-general)
2.  [Funcionalidades Previstas](#funcionalidades-previstas)
3.  [Tecnologías Utilizadas](#tecnologías-utilizadas)
4.  [Problemas Críticos y Funcionalidad Incompleta](#problemas-críticos-y-funcionalidad-incompleta)
5.  [Instalación y Ejecución (Para Fines de Depuración)](#instalación-y-ejecución-para-fines-de-depuración)
6.  [Eventos de Socket.IO](#eventos-de-socketio)

## Descripción General

La intención de este microservicio es ofrecer un sistema de chat que permita a los usuarios comunicarse en salas específicas, enviar mensajes privados y tener un historial de conversaciones persistente. Se conecta a una base de datos MySQL para almacenar usuarios y mensajes. El servidor se levanta sobre Express y utiliza Socket.IO para la comunicación en tiempo real.

## Funcionalidades Previstas

Aunque la implementación es defectuosa, el código intenta ofrecer las siguientes características:

* **Salas de Chat:** Los usuarios pueden unirse a salas específicas mediante un código único.
* **Mensajería General:** Envío de mensajes a todos los miembros de una sala de chat.
* **Mensajería Privada:** Envío de mensajes directos entre dos usuarios.
* **Persistencia de Mensajes:** Los mensajes se guardan en una base de datos MySQL para poder cargarlos posteriormente.
* **Bloqueo de Usuarios:** Una función para que un administrador con una "llave maestra" pueda bloquear a un usuario de una sala.
* **Endpoint de Verificación:** Un endpoint HTTP (`/check-chat-room/:codigo`) para verificar la existencia de una sala de chat.

## Tecnologías Utilizadas

* **Backend:** Node.js
* **Framework:** Express
* **Comunicación Real-Time:** Socket.IO
* **Base de Datos:** MySQL

## Problemas Críticos y Funcionalidad Incompleta

* **Credenciales Hardcodeadas:** Las credenciales de la base de datos (host, usuario, contraseña) están escritas directamente en el código fuente (`server.js`), lo cual es una vulnerabilidad de seguridad extremadamente grave.
* **Vulnerabilidad a Inyección SQL:** Las consultas a la base de datos se construyen concatenando strings directamente con la entrada del usuario, lo que hace al sistema vulnerable a ataques de inyección SQL.
* **Falta de Autenticación de Usuarios:** El sistema no verifica la identidad de un usuario cuando se une a una sala. Cualquiera puede usar cualquier nombre de usuario, permitiendo la suplantación de identidad.
* **Gestión de Estado Volátil:** El estado de los usuarios conectados (`users`, `codes`) se almacena en memoria, por lo que se perderá cada vez que el servidor se reinicie.
* **Lógica de Bloqueo Defectuosa:** La función `isUserBlocked` contiene errores de sintaxis en la consulta SQL y su lógica para determinar si un usuario está bloqueado no es fiable.

## Instalación y Ejecución (Para Fines de Depuración)

Siga estos pasos únicamente para inspeccionar el código. **No lo ejecute en un entorno de producción.**

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/cruz1122/ms-chat-funeraria.2024.git](https://github.com/cruz1122/ms-chat-funeraria.2024.git)
    cd ms-chat-funeraria.2024
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar la Base de Datos:**
    El servidor intentará conectarse a una base de datos MySQL en AWS. Dado que las credenciales están expuestas, esta base de datos no debe ser considerada segura.

4.  **Ejecutar el servidor:**
    ```bash
    node server.js
    ```

El servidor se iniciará en `http://localhost:3002`.

## Eventos de Socket.IO

* **`join (username, codigo)`**: Unirse a una sala de chat.
* **`message (data)`**: Enviar un mensaje a la sala.
* **`privateMessage (data)`**: Enviar un mensaje privado a otro usuario.
* **`loadMessages ()`**: Solicitar el historial de mensajes de la sala.
* **`blockUser (data)`**: Intentar bloquear a un usuario de la sala.
