// Application data
const applicationData = {
  "presentation_title": "DiVA Cohort 4 Selection Justification",
  "key_statistics": {
    "selected_average": 45.1,
    "non_selected_average": 51.2,
    "point_differential": 6.1,
    "sarawakian_selected_percent": 71.4,
    "sarawakian_non_selected_percent": 33
  },
  "selected_companies": [
    {"name": "Maxeon Technologies", "score": 54, "type": "Sarawakian", "focus": "Forest monitoring technology"},
    {"name": "OINC", "score": 47, "type": "Sarawakian", "focus": "Smart mushroom farming"},
    {"name": "ROBOPRENEUR", "score": 51, "type": "Non-Sarawakian", "focus": "AI service robotics"},
    {"name": "Sustainaviro Technology", "score": 42, "type": "Sarawakian", "focus": "Plastic waste to biofuel"},
    {"name": "SpaceIn", "score": 41, "type": "Non-Sarawakian", "focus": "Microsatellite development"},
    {"name": "Stinablis", "score": 40, "type": "Sarawakian", "focus": "Bio-waste composite materials"},
    {"name": "CTRL-D Studio", "score": 41, "type": "Sarawakian", "focus": "Game development"}
  ],
  "non_selected_high_scoring": [
    {"name": "Mentari Alam EKO", "score": 56, "reason": "Established digital infrastructure"},
    {"name": "Hornbill Agriculture", "score": 55, "reason": "Consistent EBITDA growth"},
    {"name": "Midwest Composites", "score": 51, "reason": "Serving major sectors"},
    {"name": "Shieldbase", "score": 47, "reason": "25+ enterprise customers"},
    {"name": "Company E", "score": 49, "reason": "Market established"},
    {"name": "Company F", "score": 48, "reason": "Revenue stable"}
  ],
  "scatter_plot_data": [
    {"x": 1, "y": 54, "type": "selected", "name": "Maxeon"},
    {"x": 2, "y": 51, "type": "selected", "name": "ROBOPRENEUR"},
    {"x": 3, "y": 47, "type": "selected", "name": "OINC"},
    {"x": 4, "y": 42, "type": "selected", "name": "Sustainaviro"},
    {"x": 5, "y": 41, "type": "selected", "name": "SpaceIn"},
    {"x": 6, "y": 41, "type": "selected", "name": "CTRL-D"},
    {"x": 7, "y": 40, "type": "selected", "name": "Stinablis"},
    {"x": 8, "y": 56, "type": "not_selected", "name": "Mentari Alam EKO"},
    {"x": 9, "y": 55, "type": "not_selected", "name": "Hornbill Agriculture"},
    {"x": 10, "y": 51, "type": "not_selected", "name": "Midwest Composites"},
    {"x": 11, "y": 49, "type": "not_selected", "name": "Company E"},
    {"x": 12, "y": 48, "type": "not_selected", "name": "Company F"},
    {"x": 13, "y": 47, "type": "not_selected", "name": "Shieldbase"}
  ]
};

// Global variables
let currentSlideIndex = 1;
let totalSlides = 13;
let scoringChart = null;

// DOM elements
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSlideSpan = document.getElementById('currentSlide');
const totalSlidesSpan = document.getElementById('totalSlides');
const slideDots = document.getElementById('slideDots');

// Initialize the presentation
document.addEventListener('DOMContentLoaded', function() {
    initializePresentation();
    setupEventListeners();
});

function initializePresentation() {
    // Set total slides
    totalSlides = slides.length;
    totalSlidesSpan.textContent = totalSlides;
    
    // Create slide dots
    createSlideDots();
    
    // Show first slide
    showSlide(1);
    
    // Update navigation buttons
    updateNavigationButtons();
}

function createSlideDots() {
    slideDots.innerHTML = '';
    for (let i = 1; i <= totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.addEventListener('click', () => goToSlide(i));
        slideDots.appendChild(dot);
    }
}

function setupEventListeners() {
    // Previous button
    prevBtn.addEventListener('click', () => {
        if (currentSlideIndex > 1) {
            goToSlide(currentSlideIndex - 1);
        }
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
        if (currentSlideIndex < totalSlides) {
            goToSlide(currentSlideIndex + 1);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                if (currentSlideIndex > 1) {
                    goToSlide(currentSlideIndex - 1);
                }
                break;
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ': // Space bar
                if (currentSlideIndex < totalSlides) {
                    goToSlide(currentSlideIndex + 1);
                }
                e.preventDefault();
                break;
            case 'Home':
                goToSlide(1);
                break;
            case 'End':
                goToSlide(totalSlides);
                break;
        }
    });
}

function goToSlide(slideNumber) {
    if (slideNumber < 1 || slideNumber > totalSlides) return;
    
    currentSlideIndex = slideNumber;
    showSlide(slideNumber);
    updateNavigationButtons();
    updateSlideDots();
    updateSlideCounter();
    
    // Initialize chart when reaching slide 3 (Scoring vs Selection Analysis)
    if (slideNumber === 3 && !scoringChart) {
        setTimeout(() => createScoringChart(), 100);
    }
}

function showSlide(slideNumber) {
    slides.forEach((slide, index) => {
        if (index + 1 === slideNumber) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

function updateNavigationButtons() {
    prevBtn.disabled = currentSlideIndex === 1;
    nextBtn.disabled = currentSlideIndex === totalSlides;
    
    if (currentSlideIndex === 1) {
        prevBtn.style.opacity = '0.5';
    } else {
        prevBtn.style.opacity = '1';
    }
    
    if (currentSlideIndex === totalSlides) {
        nextBtn.style.opacity = '0.5';
    } else {
        nextBtn.style.opacity = '1';
    }
}

function updateSlideDots() {
    const dots = slideDots.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index + 1 === currentSlideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function updateSlideCounter() {
    currentSlideSpan.textContent = currentSlideIndex;
}

function createScoringChart() {
    const canvas = document.getElementById('scoringChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Prepare data from scatter_plot_data
    const selectedData = applicationData.scatter_plot_data
        .filter(item => item.type === 'selected')
        .map(item => ({
            x: item.x,
            y: item.y,
            name: item.name
        }));
    
    const notSelectedData = applicationData.scatter_plot_data
        .filter(item => item.type === 'not_selected')
        .map(item => ({
            x: item.x,
            y: item.y,
            name: item.name
        }));
    
    scoringChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Selected Companies',
                    data: selectedData,
                    backgroundColor: '#17a2b8',
                    borderColor: '#17a2b8',
                    pointRadius: 8,
                    pointHoverRadius: 10,
                    pointBorderWidth: 2,
                    pointBorderColor: '#ffffff'
                },
                {
                    label: 'High-Scoring Not Selected',
                    data: notSelectedData,
                    backgroundColor: '#dc3545',
                    borderColor: '#dc3545',
                    pointRadius: 8,
                    pointHoverRadius: 10,
                    pointBorderWidth: 2,
                    pointBorderColor: '#ffffff'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            const point = context[0];
                            return point.raw.name || `Company ${point.raw.x}`;
                        },
                        label: function(context) {
                            return `Score: ${context.parsed.y}`;
                        }
                    },
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#ffffff',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    min: 0,
                    max: 15,
                    title: {
                        display: true,
                        text: 'Company Index',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        stepSize: 1,
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                y: {
                    min: 35,
                    max: 60,
                    title: {
                        display: true,
                        text: 'Score',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        stepSize: 5,
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'point'
            }
        }
    });
}

// Utility functions for presentation control
function goToFirstSlide() {
    goToSlide(1);
}

function goToLastSlide() {
    goToSlide(totalSlides);
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Add fullscreen support with F11 or F key
document.addEventListener('keydown', (e) => {
    if (e.key === 'F11' || e.key === 'f') {
        e.preventDefault();
        toggleFullscreen();
    }
});

// Handle window resize to redraw chart
window.addEventListener('resize', () => {
    if (scoringChart && currentSlideIndex === 3) {
        scoringChart.resize();
    }
});

// Export functions for potential external use
window.presentationController = {
    goToSlide,
    goToFirstSlide,
    goToLastSlide,
    toggleFullscreen,
    getCurrentSlide: () => currentSlideIndex,
    getTotalSlides: () => totalSlides
};