# 🧬 Human Gene Visualization

[![FastAPI](https://img.shields.io/badge/API-FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://human-gene.vercel.app)
[![Render](https://img.shields.io/badge/Backend%20on-Render-46E3B7?logo=render)](https://human-gene.onrender.com/docs)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python)](https://www.python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.0%2B-007ACC?logo=typescript)](https://www.typescriptlang.org/)

---

## 📄 Overview

This project was aiming to demonstrate proficiency in **React**, **FastAPI**, and **data visualization** techniques.  
The application provides an interactive interface for exploring human gene data — combining a dynamic table view, backend-driven Excel processing, and visual insights.

---

## 🌐 Live Demo

| Component        | Deployment | Link                                                                         |
| ---------------- | ---------- | ---------------------------------------------------------------------------- |
| 🧩 Frontend      | **Vercel** | [https://human-gene.vercel.app](https://human-gene.vercel.app)               |
| ⚙️ Backend (API) | **Render** | [https://human-gene.onrender.com/docs](https://human-gene.onrender.com/docs) |

---

## 🧠 Features

✅ **Dynamic Gene Table** — Displays genes from a CSV/Excel dataset using Mantine UI tables  
✅ **Interactive Detail View** — Click a gene to see charts and extra information via Plotly  
✅ **Excel & CSV Data Loading** — Efficiently handled by the **FastAPI backend**  
✅ **Modern UI** — Responsive, accessible, and styled using Mantine components  
✅ **Seamless Full Stack Integration** — React ↔ FastAPI with CORS-enabled communication

---

## ⚙️ Tech Stack

### 🧩 Frontend (React)

- **React** + **TypeScript**
- UI library: **Mantine**
- Table: **mantine-react-table**
- Charts: **Plotly (react-plotly.js)**
- Routing: **react-router-dom**
- State management: **Zustand** (used for simple app state and URL query param sync)

### 🧬 Backend (FastAPI)

- **FastAPI** for high-performance REST APIs
- **Pandas** and **openpyxl** for Excel/CSV parsing
- **Pydantic** for data validation
- **Uvicorn** for ASGI server
- Deployed on **Render**

**Run locally:**

```bash
fastapi dev main.py
```
