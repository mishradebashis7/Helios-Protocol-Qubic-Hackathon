from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ai_engine import AIMiner
from qubic_layer.qubic_connector import QubicConnector
import threading
import time
import random

app = FastAPI()

# --- 1. ENABLE CORS (So React can talk to Python) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for the hackathon
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 2. INITIALIZE SYSTEMS ---
miner = AIMiner()
qubic = QubicConnector()
qubic.connect()
wallet_balance = 12450.0
pending_rewards = 0.0

# --- 3. BACKGROUND THREAD (The Loop) ---
# This runs the AI training in the background while the server listens
# --- 3. BACKGROUND THREAD (UPDATED WITH QUBIC) ---
def background_mining_loop():
    global pending_rewards
    while True:
        if miner.is_running:
            # 1. Train AI
            result = miner.start_training_step()
            
            if result:
                # 2. If result is good, publish to Blockchain
                if result["loss"] < 0.5: # Only submit good results
                    tx = qubic.publish_training_result(
                        result["epoch"], 
                        result["loss"], 
                        "weights.pt"
                    )
                    print(f"[CHAIN] Block #{tx['block']} | Reward Triggered")
                    
                pending_rewards += 0.005 
        
        time.sleep(0.1)

# Start the background thread immediately
mining_thread = threading.Thread(target=background_mining_loop, daemon=True)
mining_thread.start()

# --- 4. API ENDPOINTS (The "Buttons" React can press) ---

@app.get("/")
def read_root():
    return {"status": "Helios Node Online", "version": "2.4"}

@app.get("/status")
def get_status():
    """Returns the current state of the node to the Frontend"""
    return {
        "is_mining": miner.is_running,
        "loss": miner.current_loss,
        "epoch": miner.epoch,
        "balance": wallet_balance,
        "pending": pending_rewards,
        "hashrate": random.randint(440, 460) if miner.is_running else 0
    }

@app.post("/start")
def start_mining():
    miner.is_running = True
    return {"message": "Mining Started"}

@app.post("/stop")
def stop_mining():
    miner.is_running = False
    return {"message": "Mining Stopped"}

@app.post("/claim")
def claim_rewards():
    global wallet_balance, pending_rewards
    if pending_rewards > 0:
        added = pending_rewards
        wallet_balance += pending_rewards
        pending_rewards = 0.0
        return {"message": "Claimed", "amount": added}
    return {"message": "Nothing to claim"}