# 🌐 SoftBank Frontend

![Angular](https://img.shields.io/badge/Angular-v15+-DD0031?style=flat-square&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CSS3-CC6699?style=flat-square&logo=sass&logoColor=white)
![Status](https://img.shields.io/badge/Status-Development-blue?style=flat-square)

**SoftBank Frontend** es una aplicación web desarrollada con Angular bajo el paradigma de *Single Page Application (SPA)*. Su objetivo es ofrecer una interfaz modular, escalable y responsiva, con componentes reutilizables y navegación fluida.  
Este proyecto forma parte del ecosistema **SoftBank**, actuando como capa de presentación y punto de interacción principal para los usuarios finales.

---

## 📁 Tabla de Contenidos

1. [Descripción General](#-descripción-general)
2. [Características Principales](#-características-principales)
3. [Arquitectura y Estructura](#-arquitectura-y-estructura)
4. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
5. [Instalación y Ejecución](#-instalación-y-ejecución)
6. [Estructura de Carpetas](#-estructura-de-carpetas)
7. [Rutas y Navegación](#-rutas-y-navegación)
8. [Componentes Principales](#-componentes-principales)
9. [Búsqueda y Filtrado](#-búsqueda-y-filtrado)
10. [Estilos y Diseño](#-estilos-y-diseño)
11. [Pruebas y Validación](#-pruebas-y-validación)
12. [Futuras Extensiones](#-futuras-extensiones)
13. [Licencia](#-licencia)

---

## 📜 Descripción General

El proyecto **SoftBank Frontend** constituye la interfaz del sistema SoftBank. Está diseñado para proporcionar:

- Navegación fluida sin recarga de página (*SPA*).
- Componentes reutilizables y escalables.
- Arquitectura modular orientada a la mantenibilidad.
- Interfaz moderna, limpia y responsiva.

Su desarrollo se centra en principios de **componentización**, **separación de responsabilidades** y **buenas prácticas de desarrollo frontend**.

---

## ✨ Características Principales

- ✅ Aplicación SPA desarrollada con Angular  
- 🧩 Componentes standalone reutilizables  
- 🔍 Cuadro de búsqueda con filtrado dinámico y redirección automática  
- 📍 Sistema de enrutamiento interno con rutas semánticas  
- 📱 Diseño responsivo con SCSS y Flexbox   
- 📦 Integración con GitHub para control de versiones y despliegue

---

## 🏗️ Arquitectura y Estructura

El proyecto sigue el patrón **Component-Based Architecture**, con una jerarquía clara:

- `AppComponent`: Componente raíz, inicializa la aplicación.
- `HeaderComponent`: Barra de navegación global.
- `SearchComponent`: Lógica de búsqueda y filtrado.
- `Features`: Conjunto de vistas o secciones principales.
- `RouterOutlet`: Punto de montaje para las rutas.

Cada componente separa estructura (`.html`), lógica (`.ts`) y estilos (`.scss`).

---

## 🧰 Tecnologías Utilizadas

| Tecnología | Uso principal |
|------------|---------------|
| **Angular** | Framework base de la aplicación SPA |
| **TypeScript** | Lenguaje de programación tipado |
| **HTML5** | Estructura de la interfaz |
| **SCSS (Sass)** | Estilos avanzados y responsivos |
| **Angular Router** | Enrutamiento y navegación |
| **FormsModule** | Manejo de formularios y binding |
| **Signals API** | Estado reactivo en componentes |
| **Git / GitHub** | Control de versiones y repositorio |

---

## 🛠️ Instalación y Ejecución

### 📥 Clonar el repositorio
```bash
git clone https://github.com/tuusuario/SoftBank.git
cd SoftBank/frontend
````

### 📦 Instalar dependencias

```bash
npm install
```

### 🚀 Ejecutar en modo desarrollo

```bash
ng serve
```

La aplicación se iniciará en:
👉 `http://localhost:4200`


---

## 📂 Estructura de Carpetas

```
frontend/
│
├─ public/
│  ├─ assets/
├─ src/
│  ├─ app/
│  │  ├─ features/
│  │  │  ├─ header/
│  │  │  ├─ pages/
│  │  ├─ app.component.ts
│  │  ├─ app.html
│  │  └─ app.scss
│  └─ main.ts
│
├─ angular.json
├─ package.json
└─ README.md
```

---

## 🌐 Rutas y Navegación

El sistema de enrutamiento define las rutas principales de la aplicación:

| Ruta           | Componente             | Descripción           |
| -------------- | ---------------------- | --------------------- |
| `/`            | `HomeComponent`        | Página principal      |
| `/productos`   | `ProductosComponent`   | Catálogo de productos |
| `/informacion` | `InformacionComponent` | Información general   |

---

## 🎨 Estilos y Diseño

* **SCSS (Sass)**: variables, anidación y modularidad.
* **Flexbox / Grid**: estructura responsiva.

### ✍️ Autores

- Daniel Barrera
- Juliana Betancour
- Jhon Edward
- Yulieth Acevedo
📍 Proyecto académico — Ingeniería de Software
📅 2025