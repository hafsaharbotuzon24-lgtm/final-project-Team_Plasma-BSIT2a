// motd-logic.js
// Dynamic MOTD system - Safe, non-interfering version

(function() {
    'use strict';
    
    // Store previous state to detect changes
    let prevLevel = null;
    let prevSite = null;
    let prevChoice = null;
    let choiceStack = []; // Track choices for combination messages
    
    // MOTD database
    const MOTD = {
        1: { // FOREST
            1: { default: "Grass touched. adventure begins." },
            2: { chest: "Loot acquired. This shall be useful.", room: "Door closed behind you. Finally some rest.", battle: "battle mode: ON." },
            3: { "chest&battle": "Loot first, violence later. or both.", "chest&room": "Door opens, treasure sits, you grin.", "battle&room": "Step inside, throw hands immediately. Good thing I stayed alive." },
            4: { chest: "Chest goblin approved. He's my best bud now.", room: "no turning back now. Rest is important!", battle: "Violence initiated. Took it down like a champ!" },
            5: { boss: "The howling winds is immense, danger must be up ahead." }
        },
        2: { // RUINS
            1: { default: "Ruins ahead. roof optional." },
            2: { chest: "Pockets got heavier. I'd make sure to trade theses back at the town square.", room: "Room entered. no going back now.", battle: "Bonk o'clock. That fight was exhilarating!" },
            3: { "chest&battle": "Grab and stab. simple.", "chest&room": "enter the room, claim the prize.", "battle&room": "Room's occupied. time to evict." },
            4: { chest: "Looting gives me a rush!", room: "This place shall be my camp for now", battle: "Hands: thrown." },
            5: { boss: "This corridor is awfuly cold, I hear buzzing sounds nearby..." }
        },
        3: { // VOLCANIC RUINS
            1: { default: "Lava on the left. danger on the right." },
            2: { chest: "Shiny thing, I get!", room: "Awww rest is over?", battle: "It singed me a bald spot!" },
            3: { "chest&battle": "Treasure and trouble. classic combo.", "chest&room": "That room was like a sauna, I feel rested!", "battle&room": "I don't \"Lava\" this. Get it?" },
            4: { chest: "Loot goblin provides you with... stuff.", room: "Whatever's inside, it's yours now.", battle: "Pyroclastic activity ended." },
            5: { boss: "This is it, the eternal flame shall be mine to extinguish." }
        }
    };
    
    // Get the h1 element
    function getMotdElement() {
        return document.querySelector('.container.text-center h1.pixel-font.text-white');
    }
    
    // Update choice stack based on current site and lastChoice
    function updateChoiceStack(level, site, lastChoice) {
        if (!lastChoice) return;
        
        // Reset at new level or site 1
        if (prevLevel !== level || site === 1) {
            choiceStack = [];
        }
        
        // Add to stack if not already there (avoid duplicates for same site)
        if (choiceStack.length < 2 && !choiceStack.includes(lastChoice)) {
            choiceStack.push(lastChoice);
        }
        
        // Keep only last 2
        if (choiceStack.length > 2) {
            choiceStack = choiceStack.slice(-2);
        }
    }
    
    // Get the correct MOTD based on game state
    function getMOTD(level, site, lastChoice) {
        if (!level || !site) return "Give it your best shot, Adventurer!";
        
        const levelData = MOTD[level];
        if (!levelData) return "Give it your best shot, Adventurer!";
        
        const siteData = levelData[site];
        if (!siteData) return "Give it your best shot, Adventurer!";
        
        // Site 1 - Entry
        if (site === 1) {
            return siteData.default || "Give it your best shot, Adventurer!";
        }
        
        // Site 5 - Boss
        if (site === 5) {
            return siteData.boss || "A powerful foe awaits!";
        }
        
        // Site 2 - First choice (single)
        if (site === 2 && lastChoice && siteData[lastChoice]) {
            return siteData[lastChoice];
        }
        
        // Site 3 - Second choice (combination of two)
        if (site === 3 && choiceStack.length >= 2) {
            const key = choiceStack.sort().join('&');
            if (siteData[key]) return siteData[key];
            
            // Try original order
            const originalKey = choiceStack.join('&');
            if (siteData[originalKey]) return siteData[originalKey];
        }
        
        // Site 4 - Final choice before boss
        if (site === 4 && lastChoice && siteData[lastChoice]) {
            return siteData[lastChoice];
        }
        
        // Fallback for site 3 with stack not ready
        if (site === 3 && lastChoice) {
            // Use lastChoice as fallback
            if (siteData[lastChoice]) return siteData[lastChoice];
        }
        
        return "Give it your best shot, Adventurer!";
    }
    
    // Main update function - called only when needed
    function updateMOTD() {
        const motdEl = getMotdElement();
        if (!motdEl) return;
        
        // Check if gameState exists (from level-logic.js)
        if (typeof gameState !== 'undefined' && gameState) {
            const level = gameState.currentLevel;
            const site = gameState.currentSite;
            const lastChoice = gameState.lastChoice;
            
            // Detect changes
            const stateChanged = (prevLevel !== level || prevSite !== site || prevChoice !== lastChoice);
            
            if (stateChanged) {
                // Update choice stack for combination tracking
                updateChoiceStack(level, site, lastChoice);
                
                // Get new MOTD
                const newMotd = getMOTD(level, site, lastChoice);
                motdEl.textContent = newMotd;
                
                // Store current state
                prevLevel = level;
                prevSite = site;
                prevChoice = lastChoice;
            }
        } else {
            // Fallback if gameState not ready
            if (motdEl.textContent === "Give it your best shot, Adventurer!") {
                // Keep default, don't change
            }
        }
    }
    
    // Hook into the existing updateUI function from level-logic.js
    // This is the SAFEST way - no polling, just piggyback on existing updates
    function hookIntoLevelLogic() {
        // Wait for the original updateUI to be defined
        const checkInterval = setInterval(function() {
            if (typeof updateUI === 'function') {
                clearInterval(checkInterval);
                
                // Store original function
                const originalUpdateUI = updateUI;
                
                // Override with wrapped version
                window.updateUI = function() {
                    // Call original first
                    originalUpdateUI();
                    // Then update MOTD
                    setTimeout(updateMOTD, 10);
                };
                
                // Initial update
                setTimeout(updateMOTD, 100);
            }
        }, 50);
        
        // Also hook into proceed function if it exists
        setTimeout(function() {
            if (typeof proceed === 'function') {
                const originalProceed = proceed;
                window.proceed = function() {
                    originalProceed();
                    setTimeout(updateMOTD, 50);
                };
            }
            
            if (typeof advanceToNextLevel === 'function') {
                const originalAdvance = advanceToNextLevel;
                window.advanceToNextLevel = function() {
                    // Reset choice stack on level change
                    choiceStack = [];
                    originalAdvance();
                    setTimeout(updateMOTD, 50);
                };
            }
        }, 100);
    }
    
    // Also listen for modal closes (battle/chest/room modals affect gameState)
    function listenForModalEvents() {
        document.addEventListener('hidden.bs.modal', function() {
            setTimeout(updateMOTD, 50);
        });
    }
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Apply font styling (keep pixel-font but ensure white color)
        const motdEl = getMotdElement();
        if (motdEl) {
            motdEl.style.color = "#ffffff";
            motdEl.style.textShadow = "2px 2px 4px rgba(0,0,0,0.5)";
            // Keep the existing pixel-font class, don't change it
        }
        
        hookIntoLevelLogic();
        listenForModalEvents();
        
        // One-time initial update after gameState loads
        setTimeout(updateMOTD, 200);
        setTimeout(updateMOTD, 500);
    });
    
    // Expose for debugging if needed
    window.debugMOTD = function() {
        console.log('Choice stack:', choiceStack);
        console.log('Prev state:', prevLevel, prevSite, prevChoice);
        if (typeof gameState !== 'undefined') {
            console.log('Current gameState:', gameState.currentLevel, gameState.currentSite, gameState.lastChoice);
            console.log('MOTD:', getMOTD(gameState.currentLevel, gameState.currentSite, gameState.lastChoice));
        }
    };
})();