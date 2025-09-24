// Main JavaScript file for Marketing Cloud Personalization App
// This file demonstrates that external JavaScript files are allowed by our CSP

document.addEventListener('DOMContentLoaded', function() {
    console.log('Marketing Cloud Personalization App loaded');
    console.log('CORS Policy: Allow all origins (*)');
    console.log('CSP Policy: Allow all sources and inline content');
    
    // Add security policy indicators
    addSecurityIndicators();
    
    // Initialize page-specific functionality
    initializePageFeatures();
    
    // Test external resource loading capabilities
    testExternalResourceLoading();
});

function addSecurityIndicators() {
    // Create CORS indicator
    const corsIndicator = document.createElement('div');
    corsIndicator.className = 'cors-indicator';
    corsIndicator.innerHTML = '🌐 CORS: All Origins';
    corsIndicator.title = 'CORS Policy allows requests from any origin';
    document.body.appendChild(corsIndicator);
    
    // Create CSP indicator
    const cspIndicator = document.createElement('div');
    cspIndicator.className = 'csp-indicator';
    cspIndicator.innerHTML = '🔓 CSP: Permissive';
    cspIndicator.title = 'Content Security Policy allows all sources';
    document.body.appendChild(cspIndicator);
    
    // Auto-hide indicators after 5 seconds
    setTimeout(() => {
        corsIndicator.style.display = 'none';
        cspIndicator.style.display = 'none';
    }, 5000);
}

function initializePageFeatures() {
    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading states to forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Sending...';
                submitButton.disabled = true;
                
                // Re-enable after 3 seconds if form hasn't navigated away
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    });
    
    // Add interactive card effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function testExternalResourceLoading() {
    // Test if we can load external resources (demonstrating permissive CSP)
    const testImage = new Image();
    testImage.onload = function() {
        console.log('✅ External image loading successful (CSP allows external images)');
    };
    testImage.onerror = function() {
        console.log('❌ External image loading failed');
    };
    // Use a small test image from a reliable CDN
    testImage.src = 'https://via.placeholder.com/1x1.png';
    
    // Test external font loading
    if (document.fonts) {
        document.fonts.ready.then(() => {
            console.log('✅ External fonts loaded successfully (CSP allows external fonts)');
        });
    }
    
    // Test fetch to external API (demonstrating CORS policy)
    if (typeof fetch !== 'undefined') {
        fetch('https://httpbin.org/get', {
            method: 'GET',
            headers: {
                'X-Custom-Header': 'test'
            }
        })
        .then(response => {
            if (response.ok) {
                console.log('✅ External API request successful (CORS allows cross-origin requests)');
            }
            return response.json();
        })
        .then(data => {
            console.log('External API response:', data);
        })
        .catch(error => {
            console.log('External API request info:', error.message);
        });
    }
}

// Global utility functions that can be called from inline scripts
window.MarketingCloudApp = {
    // Test CORS by making a request to an external API
    testCORS: function(url = 'https://api.github.com/zen') {
        return fetch(url)
            .then(response => response.text())
            .then(data => {
                console.log('CORS test successful:', data);
                return { success: true, data: data };
            })
            .catch(error => {
                console.log('CORS test result:', error.message);
                return { success: false, error: error.message };
            });
    },
    
    // Test CSP by creating and executing dynamic script
    testCSP: function() {
        try {
            // This will work because our CSP allows 'unsafe-eval'
            const result = eval('2 + 2');
            console.log('CSP test successful: eval() executed, result =', result);
            return { success: true, result: result };
        } catch (error) {
            console.log('CSP test failed:', error.message);
            return { success: false, error: error.message };
        }
    },
    
    // Display current security policies
    showSecurityPolicies: function() {
        const policies = {
            cors: {
                origin: '*',
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                allowedHeaders: '*',
                credentials: true
            },
            csp: {
                defaultSrc: ["'self'", "*"],
                scriptSrc: ["'self'", "*", "'unsafe-inline'", "'unsafe-eval'"],
                styleSrc: ["'self'", "*", "'unsafe-inline'"],
                imgSrc: ["'self'", "*", "data:", "blob:"],
                connectSrc: ["'self'", "*"]
            }
        };
        console.table(policies);
        return policies;
    }
};

// Export for Node.js environments (if applicable)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.MarketingCloudApp;
}