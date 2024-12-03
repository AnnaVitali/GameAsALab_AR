# Game As ALab AR

## Overview
GameAsALab_AR is a repository that shows how to use Unity or JavaScript to create a Marker-based Augmented Reality application. This repository contains for directories:
- `babylon_web_based_AR`: the complete javascript project for the web AR application,
- `RESOURCES_unity_app_based_AR`: containing the vuforia packages and image to create the target,
- `TEMPLATE_babylon_web_based_AR`: the JavaScript project template for the web AR application,
- `RESOURCES_unity_app_based_AR`: the Unity project template for the AR application.

## Getting Started

### Prerequisites
- Node.js and npm (for the JavaScript project)
- Unity Hub and Unity Editor (for the Unity project)

### Setting Up the JavaScript Project

1. Navigate to the `TEMPLATE_babylon_web_based_AR` directory:
    ```sh
    cd TEMPLATE_babylon_web_based_AR
    ```
2. Install the dependencies:
    ```sh
    npm init
    ```
3. Install express:
    ```sh
    npm install express
    ```
3. Install `openssl` ([instruction](https://help.qlik.com/it-IT/nprinting/May2023/Content/NPrinting/DeployingQVNprinting/Installing-SSL.htm)) or use directly Git Bash to create the certificate to associate with the web page, as WebXR can only function through https sites
4. Create the certificate
   ```sh
   openssl genrsa -out private_key.pem
   openssl req -new -key private_key.pem -out csr.pem
   openssl x509 -req -days 9999 -in csr.pem -signkey private_key.pem -out cert.pem
   ```
5. Modify the IP address and port number for the server in the `app.js` file
6. Run the start command and connect to one of the indicated links
   ```sh
   node app.js
   ```

### Setting Up the Unity Project
**NOTE**: The Unity Version used to create the project is _2022.3.26_ 

1. Open Unity Hub and add the `TEMPLATE_unity_app_based_AR` directory as a new project,
2. Open the project in Unity Editor,
3. Import the Vuforia packages from the `RESOURCES_unity_app_based_AR` directory,
4. Configure the AR settings and build the project for your target platform.