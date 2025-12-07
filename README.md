# 🌍 Helios Protocol | AI Earth Node

> **Winner - Qubic "Hack the Future" 2025**
> *Infrastructure Arbitrage: Turning Stranded Solar Energy into Distributed Intelligence.*

![Helios Dashboard](https://via.placeholder.com/1200x600/0b0f19/10b981?text=Helios+Protocol+Dashboard)

## 🚀 The Problem & Solution
* **The Crisis:** Solar panels generate too much power at noon ("The Duck Curve"), forcing grids to waste (curtail) energy.
* **The Bottleneck:** AI companies are running out of data centers and power.
* **The Helios Solution:** A decentralized protocol that uses the **Qubic Network** to transmit "Useful Proof-of-Work" (AI Training) to homes with excess solar energy. We turn sunlight into intelligence.

---

## 🛠️ Tech Stack

### **1. Frontend (The Command Center)**
* **React + Vite:** Ultra-fast UI.
* **Tailwind CSS:** Glassmorphism design system.
* **Recharts:** Real-time data visualization.

### **2. Backend (The Brain)**
* **Python (FastAPI):** Orchestrates the mining logic.
* **PyTorch:** Runs the actual Neural Network training (LSTM/Linear models).
* **Threading:** Multi-threaded architecture to mine and serve API requests simultaneously.

### **3. Blockchain Layer (The Trust)**
* **Qubic Smart Contract (C++):** Validates the "Useful Work" and handles payouts.
* **Consensus:** "Follow-the-Sun" relay mechanism.

---

## ⚡ How to Run Locally

### **Step 1: Start the AI Node (Backend)**
This simulates the physical device (Inverter + GPU).
```bash
cd Helios-Backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000