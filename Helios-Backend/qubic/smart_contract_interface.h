#ifndef QUBIC_INTERFACE_H
#define QUBIC_INTERFACE_H

#include <cstdint>
#include <cstring>
#include <string>

// --- MOCK QUBIC TYPES ---
typedef struct {
    uint8_t bytes[32];
} public_key;

struct MessageContext {
    public_key sender;
    uint64_t amount;
};

// --- MOCK SMART CONTRACT BASE CLASS ---
class SmartContract {
public:
    MessageContext msg;

    // 1. Simulate sending money
    void transfer(public_key to, uint64_t amount) {
        // In real Qubic, this moves funds
    }

    // 2. Simulate emitting a blockchain event
    void emit_event(std::string event_name, uint64_t data) {
        // In real Qubic, this logs to the chain
    }

    // 3. (NEW) Simulate checking the contract's own wallet
    uint64_t get_contract_balance() {
        return 1000000000; // Fake balance: 1 Billion Qubics (Plenty for testing)
    }
};

#endif