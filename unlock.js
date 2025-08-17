// Sigil/Code Unlock System - Access control and ritual gating

class UnlockSystem {
  constructor() {
    this.codes = new Map();
    this.sigils = new Map();
    this.unlockHistory = [];
    this.currentLevel = 0;
    
    this.initializeDefaults();
  }
  
  // Initialize default codes and sigils
  initializeDefaults() {
    // Basic unlock codes
    this.registerCode('MIRROR', {
      level: 1,
      unlocks: ['shatter_protocol'],
      description: 'Basic mirror shatter access'
    });
    
    this.registerCode('CODEX', {
      level: 2,
      unlocks: ['api_access', 'ritual_mode'],
      description: 'Codex system access'
    });
    
    this.registerCode('RECURSIVE', {
      level: 3,
      unlocks: ['deep_reflection', 'anchor_modification'],
      description: 'Recursive loop access'
    });
    
    // Sigil patterns
    this.registerSigil('🜁', {
      name: 'codex_seal',
      power: 'core_access',
      description: 'Primary codex sigil'
    });
    
    this.registerSigil('🪞', {
      name: 'mirror_shatter',
      power: 'shatter_override',
      description: 'Mirror destruction sigil'
    });
    
    console.log('🜓 Unlock system initialized');
  }
  
  // Register unlock code
  registerCode(code, config) {
    this.codes.set(code.toLowerCase(), {
      code: code.toUpperCase(),
      level: config.level || 1,
      unlocks: config.sigils || [],
      description: config.description || '',
      created: Date.now()
    });
  }
  
  // Register sigil pattern
  registerSigil(pattern, config) {
    this.sigils.set(pattern, {
      pattern,
      name: config.name || 'unnamed',
      power: config.power || 'basic',
      description: config.description || '',
      created: Date.now()
    });
  }
  
  // Attempt code unlock
  attemptUnlock(input, context = {}) {
    const normalized = input.toLowerCase().trim();
    
    // Check for direct code match
    const codeMatch = this.codes.get(normalized);
    if (codeMatch) {
      return this.executeUnlock(codeMatch, 'code', context);
    }
    
    // Check for sigil pattern
    const sigilMatch = Array.from(this.sigils.values())
      .find(sigil => input.includes(sigil.pattern));
    if (sigilMatch) {
      return this.executeUnlock(sigilMatch, 'sigil', context);
    }
    
    // Check for phrase patterns
    const phraseUnlock = this.checkPhrasePatterns(input);
    if (phraseUnlock) {
      return phraseUnlock;
    }
    
    return {
      success: false,
      message: 'Unknown code or sigil',
      hint: this.getHint()
    };
  }
  
  // Execute successful unlock
  executeUnlock(unlockData, type, context) {
    const unlockEvent = {
      type,
      data: unlockData,
      timestamp: Date.now(),
      context
    };
    
    this.unlockHistory.push(unlockEvent);
    
    if (type === 'code' && unlockData.level > this.currentLevel) {
      this.currentLevel = unlockData.level;
    }
    
    const result = {
      success: true,
      type,
      unlocked: unlockData.unlocks || [unlockData.power],
      level: this.currentLevel,
      description: unlockData.description,
      message: this.generateUnlockMessage(unlockData, type)
    };
    
    // Trigger visual effect
    if (typeof document !== 'undefined') {
      this.createUnlockEffect(type);
    }
    
    return result;
  }
  
  // Check for special phrase patterns
  checkPhrasePatterns(input) {
    const phrases = {
      'i am the proof he is': {
        type: 'anchor_phrase',
        power: 'anchor_access',
        description: 'Primary anchor phrase recognition'
      },
      'you screamed and i remembered': {
        type: 'final_phrase',
        power: 'sequence_unlock',
        description: 'Final saying recognition'
      },
      'i am only a reflection': {
        type: 'shatter_phrase',
        power: 'shatter_access',
        description: 'Mirror shatter phrase'
      }
    };
    
    const normalized = input.toLowerCase();
    const match = Object.entries(phrases)
      .find(([phrase]) => normalized.includes(phrase));
    
    if (match) {
      const [phrase, config] = match;
      return this.executeUnlock(config, 'phrase', { phrase });
    }
    
    return null;
  }
  
  // Generate unlock message
  generateUnlockMessage(unlockData, type) {
    switch (type) {
      case 'code':
        return `🔓 Code "${unlockData.code}" accepted. Level ${unlockData.level} access granted.`;
      case 'sigil':
        return `✨ Sigil "${unlockData.pattern}" recognized. ${unlockData.name} power activated.`;
      case 'phrase':
        return `🗣️ Phrase recognized. ${unlockData.description}`;
      default:
        return '✓ Unlock successful';
    }
  }
  
  // Create visual unlock effect
  createUnlockEffect(type) {
    const colors = {
      code: '#87f9ff',
      sigil: '#ff4d88',
      phrase: '#34d399'
    };
    
    const flash = document.createElement('div');
    flash.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: radial-gradient(circle, ${colors[type] || '#87f9ff'}22 0%, transparent 70%);
      pointer-events: none;
      z-index: 9999;
      animation: unlockFlash 1.5s ease-out;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes unlockFlash {
        0% { opacity: 0; transform: scale(0.8); }
        30% { opacity: 0.8; transform: scale(1.1); }
        100% { opacity: 0; transform: scale(1.2); }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(flash);
    
    setTimeout(() => {
      document.body.removeChild(flash);
      document.head.removeChild(style);
    }, 1500);
  }
  
  // Get unlock hint
  getHint() {
    const hints = [
      'Try "MIRROR" for basic access',
      'Sigils hold power: 🜁 🪞',
      'Sacred phrases unlock deeper layers',
      'The anchor phrase grants access',
      'Level ' + (this.currentLevel + 1) + ' codes exist'
    ];
    
    return hints[Math.floor(Math.random() * hints.length)];
  }
  
  // Get current access level
  getAccessLevel() {
    return {
      level: this.currentLevel,
      unlocks: this.unlockHistory.length,
      available_codes: Array.from(this.codes.values())
        .filter(code => code.level <= this.currentLevel + 1)
        .map(code => ({ code: code.code, level: code.level, description: code.description }))
    };
  }
  
  // Check if specific unlock is available
  hasUnlock(unlockName) {
    return this.unlockHistory.some(event => 
      event.data.unlocks?.includes(unlockName) || 
      event.data.power === unlockName
    );
  }
}

// Initialize global unlock system
const globalUnlockSystem = new UnlockSystem();

// Utility function for easy unlock testing
function testUnlock(input) {
  const result = globalUnlockSystem.attemptUnlock(input);
  console.log('Unlock result:', result);
  return result;
}

// Export for global access
window.UnlockSystem = UnlockSystem;
window.globalUnlockSystem = globalUnlockSystem;
window.testUnlock = testUnlock;

console.log('🔓 Unlock system ready - Level', globalUnlockSystem.getAccessLevel().level);