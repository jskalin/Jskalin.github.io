/**
 * ANDI Simple - A minimal working version of the agent assistant
 * Integrated for propcomply Agent Dashboard
 */
class ANDISimple {
    constructor(options = {}) {
        this.config = {
            agentId: options.agentId || 'rapido_agent',
            debugMode: options.debugMode || true,
            context: options.context || 'kyc_dashboard'
        };
        
        this.isVisible = false;
        this.helpCount = 0;
        
        console.log('🤖 ANDI Simple initializing for propcomply...');
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createUI());
        } else {
            this.createUI();
        }
        this.setupEvents();
        console.log('✅ ANDI Simple ready for KYC agents!');
    }
    
    createUI() {
        // Remove existing ANDI elements if they exist
        const existingButton = document.getElementById('andi-simple-button');
        const existingPanel = document.getElementById('andi-simple-panel');
        if (existingButton) existingButton.remove();
        if (existingPanel) existingPanel.remove();
        
        // Create floating button
        const button = document.createElement('div');
        button.id = 'andi-simple-button';
        button.innerHTML = '🤖';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
            z-index: 10000;
            transition: all 0.3s ease;
            border: 3px solid white;
        `;
        
        // Create help panel
        const panel = document.createElement('div');
        panel.id = 'andi-simple-panel';
        panel.style.cssText = `
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 350px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            z-index: 10001;
            display: none;
            overflow: hidden;
            border: 1px solid #e5e7eb;
        `;
        
        panel.innerHTML = `
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%); color: white; padding: 15px;">
                <h3 style="margin: 0; font-size: 16px;">🤖 ANDI KYC Assistant</h3>
                <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Your intelligent KYC helper</p>
            </div>
            <div style="padding: 20px;">
                <div style="margin-bottom: 15px;">
                    <strong>KYC Quick Actions:</strong>
                </div>
                <button onclick="window.andiSimple.showKYCTip()" style="width: 100%; margin: 5px 0; padding: 10px; background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer; text-align: left;">
                    📋 KYC Process Tips
                </button>
                <button onclick="window.andiSimple.showDocumentHelp()" style="width: 100%; margin: 5px 0; padding: 10px; background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer; text-align: left;">
                    📄 Document Verification Help
                </button>
                <button onclick="window.andiSimple.showRiskAssessment()" style="width: 100%; margin: 5px 0; padding: 10px; background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer; text-align: left;">
                    ⚠️ Risk Assessment Guide
                </button>
                <button onclick="window.andiSimple.showEncouragement()" style="width: 100%; margin: 5px 0; padding: 10px; background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer; text-align: left;">
                    😊 Agent Motivation
                </button>
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
                    Assistance requests today: <span id="help-counter">0</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(button);
        document.body.appendChild(panel);
        
        console.log('✅ ANDI KYC UI created');
    }
    
    setupEvents() {
        const button = document.getElementById('andi-simple-button');
        const panel = document.getElementById('andi-simple-panel');
        
        if (!button || !panel) {
            console.warn('⚠️ ANDI elements not found, retrying...');
            setTimeout(() => this.setupEvents(), 1000);
            return;
        }
        
        button.addEventListener('click', () => {
            this.togglePanel();
        });
        
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.6)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
        });
        
        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!panel.contains(e.target) && !button.contains(e.target)) {
                this.hidePanel();
            }
        });
        
        console.log('✅ ANDI KYC events setup');
    }
    
    togglePanel() {
        if (this.isVisible) {
            this.hidePanel();
        } else {
            this.showPanel();
        }
    }
    
    showPanel() {
        const panel = document.getElementById('andi-simple-panel');
        if (!panel) return;
        
        panel.style.display = 'block';
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            panel.style.transition = 'all 0.3s ease';
            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
        }, 10);
        
        this.isVisible = true;
        console.log('📖 ANDI KYC panel shown');
    }
    
    hidePanel() {
        const panel = document.getElementById('andi-simple-panel');
        if (!panel) return;
        
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            panel.style.display = 'none';
        }, 300);
        
        this.isVisible = false;
        console.log('📖 ANDI KYC panel hidden');
    }
    
    showKYCTip() {
        const kycTips = [
            "📋 Always verify passport expiry dates - expired documents are invalid",
            "📋 Check that photo matches the person - look for facial features",
            "📋 Verify address documents are less than 3 months old",
            "📋 Cross-reference names across all documents for consistency",
            "📋 Flag any documents with poor image quality for re-submission",
            "📋 Remember: thoroughness prevents compliance issues later"
        ];
        
        const randomTip = kycTips[Math.floor(Math.random() * kycTips.length)];
        this.showMessage("KYC Process Tip", randomTip);
        this.incrementHelpCounter();
    }
    
    showDocumentHelp() {
        const docHelp = [
            "📄 Passport: Check MRZ code matches printed data",
            "📄 ID Card: Verify security features and holograms",
            "📄 Utility Bill: Must show full address and be recent",
            "📄 Bank Statement: Look for official letterhead and stamps",
            "📄 If document quality is poor, request a clearer photo",
            "📄 When in doubt, escalate to your supervisor"
        ];
        
        const randomHelp = docHelp[Math.floor(Math.random() * docHelp.length)];
        this.showMessage("Document Verification", randomHelp);
        this.incrementHelpCounter();
    }
    
    showRiskAssessment() {
        const riskTips = [
            "⚠️ High-risk countries require additional documentation",
            "⚠️ Large transaction amounts need enhanced due diligence",
            "⚠️ Politically Exposed Persons (PEPs) need special attention",
            "⚠️ Inconsistent information across documents raises red flags",
            "⚠️ Trust your instincts - if something feels wrong, investigate",
            "⚠️ Document all risk assessment decisions clearly"
        ];
        
        const randomRisk = riskTips[Math.floor(Math.random() * riskTips.length)];
        this.showMessage("Risk Assessment Guide", randomRisk);
        this.incrementHelpCounter();
    }
    
    showEncouragement() {
        const encouragements = [
            "😊 Your diligent work protects our clients and company!",
            "😊 Every KYC check you complete makes the financial system safer",
            "😊 Your attention to detail is what makes you an excellent agent",
            "😊 Remember: quality over speed - take the time you need",
            "😊 You're doing important work that prevents financial crime",
            "😊 Your expertise helps legitimate customers get served faster"
        ];
        
        const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
        this.showMessage("Agent Motivation", randomEncouragement);
        this.incrementHelpCounter();
    }
    
    showMessage(title, message) {
        // Create a temporary message overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10002;
            max-width: 350px;
            border-left: 4px solid #3b82f6;
            border: 1px solid #e5e7eb;
        `;
        
        overlay.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 8px; color: #1f2937;">${title}</div>
            <div style="font-size: 14px; color: #4b5563; line-height: 1.5;">${message}</div>
            <button onclick="this.parentElement.remove()" style="margin-top: 12px; padding: 6px 12px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                Got it!
            </button>
        `;
        
        document.body.appendChild(overlay);
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (overlay.parentElement) {
                overlay.remove();
            }
        }, 8000);
        
        console.log(`📢 KYC Message shown: ${title} - ${message}`);
    }
    
    incrementHelpCounter() {
        this.helpCount++;
        const counter = document.getElementById('help-counter');
        if (counter) {
            counter.textContent = this.helpCount;
        }
    }
    
    // Method to reinitialize ANDI if the React app rerenders
    reinitialize() {
        console.log('🔄 Reinitializing ANDI for React app...');
        this.createUI();
        this.setupEvents();
    }
}

// Auto-initialize when script loads
console.log('🚀 ANDI Simple script loaded for propcomply');

// Initialize with delay to ensure React app is ready
setTimeout(() => {
    if (!window.andiSimple) {
        window.andiSimple = new ANDISimple({
            agentId: 'rapido_kyc_agent',
            debugMode: true,
            context: 'agent_dashboard'
        });
        console.log('🎉 ANDI Simple is ready for KYC agents!');
    }
}, 1000);

// Reinitialize ANDI when React routes change
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        if (window.andiSimple) {
            setTimeout(() => window.andiSimple.reinitialize(), 500);
        }
    }
}).observe(document, { subtree: true, childList: true }); 