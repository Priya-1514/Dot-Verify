document.addEventListener('DOMContentLoaded', function() {
    // Only run if we're on the login page
    if (!document.getElementById('loginForm')) return;
    
    const verifyCheckbox = document.getElementById('verifyMe');
    const dotsContainer = document.getElementById('dotsContainer');
    const dotsArea = document.getElementById('dotsArea');
    const dotsCount = document.getElementById('dotsCount');
    const submitBtn = document.getElementById('submitBtn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    let clickedDotsCount = 0;
    let currentDotIndex = 0;
    let allDotsClicked = false;
    
    // Attractive dot colors and positions
    const dotConfigs = [
        { color: 'dot-magenta', position: { top: '15%', left: '20%' } },
        { color: 'dot-cyan', position: { top: '25%', right: '15%' } },
        { color: 'dot-emerald', position: { bottom: '20%', left: '15%' } },
        { color: 'dot-amber', position: { bottom: '15%', right: '25%' } },
        { color: 'dot-violet', position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' } },
        { color: 'dot-rose', position: { top: '35%', left: '40%' } }
    ];
    
    // Shuffle array function
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    // Randomize dot order
    const randomizedDots = shuffleArray(dotConfigs).slice(0, 4);
    
    // Check if submit should be enabled
    function updateSubmitButton() {
        const hasEmail = emailInput.value.trim() !== '';
        const hasPassword = passwordInput.value.trim() !== '';
        const isVerified = verifyCheckbox.checked;
        const dotsComplete = allDotsClicked;
        
        submitBtn.disabled = !(hasEmail && hasPassword && isVerified && dotsComplete);
    }
    
    // Create and show a dot
    function showNextDot() {
        if (currentDotIndex >= 4) return;
        
        const dotConfig = randomizedDots[currentDotIndex];
        const dot = document.createElement('div');
        dot.className = `dot ${dotConfig.color}`;
        dot.id = `dot-${currentDotIndex}`;
        
        // Set position
        Object.keys(dotConfig.position).forEach(key => {
            dot.style[key] = dotConfig.position[key];
        });
        
        // Add click handler
        dot.addEventListener('click', function() {
            if (this.classList.contains('clicked')) return;
            
            this.classList.add('clicked');
            clickedDotsCount++;
            dotsCount.textContent = clickedDotsCount;
            
            // Show next dot after a short delay
            setTimeout(() => {
                currentDotIndex++;
                if (currentDotIndex < 4) {
                    showNextDot();
                } else {
                    allDotsClicked = true;
                    updateSubmitButton();
                }
            }, 600);
        });
        
        dotsArea.appendChild(dot);
    }
    
    // Reset dots
    function resetDots() {
        dotsArea.innerHTML = '';
        clickedDotsCount = 0;
        currentDotIndex = 0;
        allDotsClicked = false;
        dotsCount.textContent = '0';
        updateSubmitButton();
    }
    
    // Handle verify checkbox change
    verifyCheckbox.addEventListener('change', function() {
        if (this.checked) {
            dotsContainer.style.display = 'block';
            resetDots();
            // Start with first dot
            setTimeout(() => showNextDot(), 300);
        } else {
            dotsContainer.style.display = 'none';
            resetDots();
        }
        updateSubmitButton();
    });
    
    // Handle input changes
    emailInput.addEventListener('input', updateSubmitButton);
    passwordInput.addEventListener('input', updateSubmitButton);
    
    // Handle form submission
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!submitBtn.disabled) {
            // Add a loading effect
            submitBtn.textContent = 'Verifying...';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                window.location.href = 'success.html';
            }, 1000);
        }
    });
    
    // Initialize
    updateSubmitButton();
});