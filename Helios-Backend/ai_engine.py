import torch
import torch.nn as nn
import torch.optim as optim
import time

# --- 1. DEFINE THE NEURAL NETWORK ---
# A simple "Feed Forward" network that learns patterns
class SimpleQubicNet(nn.Module):
    def __init__(self):
        super(SimpleQubicNet, self).__init__()
        self.fc1 = nn.Linear(10, 50)  # Input layer
        self.relu = nn.ReLU()         # Activation function
        self.fc2 = nn.Linear(50, 1)   # Output layer

    def forward(self, x):
        return self.fc2(self.relu(self.fc1(x)))

# --- 2. THE MINING MANAGER ---
class AIMiner:
    def __init__(self):
        # Initialize the Brain
        self.model = SimpleQubicNet()
        self.optimizer = optim.SGD(self.model.parameters(), lr=0.01)
        self.criterion = nn.MSELoss()
        
        # State variables
        self.is_running = False
        self.current_loss = 1.0
        self.epoch = 0

    def start_training_step(self):
        """
        Runs ONE step of training (Epoch).
        This is the actual 'Useful Proof of Work'.
        """
        if not self.is_running:
            return None

        # 1. Generate Fake Data (Simulating a Qubic Job)
        inputs = torch.randn(10)  # Random input vector
        target = torch.randn(1)   # Random target

        # 2. Forward Pass (Prediction)
        output = self.model(inputs)
        loss = self.criterion(output, target)

        # 3. Backward Pass (Learning)
        self.optimizer.zero_grad()
        loss.backward()
        self.optimizer.step()

        # 4. Update State
        self.current_loss = loss.item()
        self.epoch += 1
        
        # Simulate slight delay so CPU usage isn't 100% instantly
        time.sleep(0.1) 
        
        return {
            "epoch": self.epoch,
            "loss": self.current_loss,
            "status": "MINING"
        }