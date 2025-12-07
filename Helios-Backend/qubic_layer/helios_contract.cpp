#include "../qubic/smart_contract_interface.h"

// --- 1. DATA STRUCTURES ---
struct TrainingEpoch {
    uint64_t epoch_id;
    uint64_t min_loss_score;     // Lower is better
    public_key miner_id;         // Who found it?
    uint8_t model_weights_hash[32]; // Checksum of the AI file
};

// --- 2. THE CONTRACT STATE ---
struct HeliosState {
    uint64_t current_epoch;
    uint64_t total_rewards_distributed;
    TrainingEpoch best_solution;
};

// --- 3. THE SMART CONTRACT LOGIC ---
class HeliosContract : public SmartContract {
public:
    // This is the persistent memory on the blockchain
    HeliosState state;

    // Constructor
    void initialize() {
        state.current_epoch = 1;
        state.total_rewards_distributed = 0;
        state.best_solution.min_loss_score = 999999999; // Start high
    }

    // --- FUNCTION: SUBMIT PROOF OF WORK ---
    // Miners call this function to submit their AI training results
    void submitTrainingResult(uint64_t loss_score, uint8_t* weights_hash) {
        
        // 1. Verify: Is this actually an improvement?
        if (loss_score >= state.best_solution.min_loss_score) {
            return; 
        }

        // 2. Update State: Record the new best miner
        state.best_solution.min_loss_score = loss_score;
        state.best_solution.miner_id = msg.sender; 
        memcpy(state.best_solution.model_weights_hash, weights_hash, 32);

        // 3. Payout Trigger: Is the AI "Good Enough"?
        // Threshold: 1000 represents 0.1000 Loss (High Accuracy)
        if (loss_score < 1000) { 
            
            uint64_t reward = calculateReward(loss_score);

            // --- SAFETY CHECK (ADD THIS) ---
            // Ensure the contract has funds before trying to pay
            if (get_contract_balance() >= reward) {
                transfer(msg.sender, reward);
                state.total_rewards_distributed += reward;
            }

            emit_event("NEW_MODEL_MINED", state.current_epoch);
            
            // 4. Reset for the next Round
            state.current_epoch++;
            state.best_solution.min_loss_score = 999999999; // Reset bar to high
        }
    }

    // Helper: Dynamic Reward Scaling
    uint64_t calculateReward(uint64_t score) {
        // The better the score, the higher the reward
        return 1000000 / (score + 1); 
    }
};