// Presentation data
const presentationData = {
  selectedCompanies: [
    { name: "Maxeon Technologies", score: 54, status: "Sarawakian", focus: "Forestry monitoring with AI and drone technology" },
    { name: "ROBOPRENEUR", score: 51, status: "Non-Sarawakian", focus: "AI service robotics for professional and domestic use" },
    { name: "OINC Sdn. Bhd.", score: 47, status: "Sarawakian", focus: "Smart mushroom farming using IoT and container technology" },
    { name: "Sustainaviro Technology", score: 42, status: "Sarawakian", focus: "Converting plastic waste to high-quality fuels" },
    { name: "CtrlD Studio", score: 41, status: "Sarawakian", focus: "Malaysian-made video game IP development" },
    { name: "SpaceIn Sdn Bhd", score: 41, status: "Non-Sarawakian", focus: "Satellite-based IoT communication for remote areas" },
    { name: "Stinablis Sdn Bhd", score: 40, status: "Sarawakian", focus: "Sustainable materials using recycled plastics and 3D printing" }
  ],
  notSelectedHighScoring: [
    { name: "Mentari Alam EKO", score: 56, status: "Non-Sarawakian", focus: "Digitalized food waste to resource platform" },
    { name: "Hornbill Agriculture", score: 55, status: "Sarawakian", focus: "Regenerative farming with consistent EBITDA growth" },
    { name: "Midwest Composites", score: 51, status: "Non-Sarawakian", focus: "Sustainable materials for automotive and aerospace" },
    { name: "Vespid", score: 49, status: "Sarawakian", focus: "Gamified personal finance learning app" },
    { name: "Mindnrobotics", score: 49, status: "Non-Sarawakian", focus: "Portable mesh network for agriculture automation" },
    { name: "Shieldbase", score: 47, status: "Non-Sarawakian", focus: "AI SaaS platform serving 25+ enterprises" }
  ]
};

// Chart colors
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Presentation controller
class PresentationController {
  constructor() {
    this.currentSlide = 1;
    this.totalSlides = 11;
    this.slides = document.querySelectorAll('.slide');
    this.dots = document.querySelectorAll('.dot');
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
    this.currentSlideSpan = document.getElementById('current-slide');
    this.totalSlidesSpan = document.getElementById('total-slides');
    
    this.init();
  }

  init() {
    // Set total slides
    this.totalSlidesSpan.textContent = this.totalSlides;
    
    // Add event listeners
    this.prevBtn.addEventListener('click', () => this.previousSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index + 1));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.previousSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
      if (e.key >= '1' && e.key <= '9') {
        const slideNum = parseInt(e.key);
        if (slideNum <= this.totalSlides) this.goToSlide(slideNum);
      }
    });
    
    // Initialize charts
    this.initCharts();
    
    // Update navigation
    this.updateNavigation();
  }

  goToSlide(slideNumber) {
    if (slideNumber < 1 || slideNumber > this.totalSlides) return;
    
    // Hide current slide
    this.slides[this.currentSlide - 1].classList.remove('active');
    this.dots[this.currentSlide - 1].classList.remove('active');
    
    // Show new slide
    this.currentSlide = slideNumber;
    this.slides[this.currentSlide - 1].classList.add('active');
    this.dots[this.currentSlide - 1].classList.add('active');
    
    this.updateNavigation();
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides) {
      this.goToSlide(this.currentSlide + 1);
    }
  }

  previousSlide() {
    if (this.currentSlide > 1) {
      this.goToSlide(this.currentSlide - 1);
    }
  }

  updateNavigation() {
    this.currentSlideSpan.textContent = this.currentSlide;
    this.prevBtn.disabled = this.currentSlide === 1;
    this.nextBtn.disabled = this.currentSlide === this.totalSlides;
    
    // Update button opacity
    this.prevBtn.style.opacity = this.currentSlide === 1 ? '0.5' : '1';
    this.nextBtn.style.opacity = this.currentSlide === this.totalSlides ? '0.5' : '1';
  }

  initCharts() {
    // Delay chart initialization to ensure DOM is ready
    setTimeout(() => {
      this.createScoreComparisonChart();
      this.createPortfolioDistributionChart();
      this.createGeographicChart();
    }, 100);
  }

  createScoreComparisonChart() {
    const ctx = document.getElementById('scoreComparisonChart');
    if (!ctx) return;

    const selectedScores = presentationData.selectedCompanies.map(c => c.score);
    const notSelectedScores = presentationData.notSelectedHighScoring.map(c => c.score);
    const selectedNames = presentationData.selectedCompanies.map(c => c.name);
    const notSelectedNames = presentationData.notSelectedHighScoring.map(c => c.name);

    new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Selected Companies',
            data: selectedScores.map((score, index) => ({
              x: index + 1,
              y: score
            })),
            backgroundColor: chartColors[0],
            borderColor: chartColors[0],
            borderWidth: 2,
            pointRadius: 8,
            pointHoverRadius: 10
          },
          {
            label: 'High-Scoring Not Selected',
            data: notSelectedScores.map((score, index) => ({
              x: index + 8,
              y: score
            })),
            backgroundColor: chartColors[2],
            borderColor: chartColors[2],
            borderWidth: 2,
            pointRadius: 8,
            pointHoverRadius: 10
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Score Distribution: Selected vs Not Selected',
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const datasetLabel = context.dataset.label;
                const isSelected = datasetLabel === 'Selected Companies';
                const companies = isSelected ? selectedNames : notSelectedNames;
                const index = isSelected ? context.dataIndex : context.dataIndex;
                const companyName = companies[index];
                return `${companyName}: ${context.parsed.y}`;
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Company Index'
            },
            min: 0,
            max: 15
          },
          y: {
            title: {
              display: true,
              text: 'Score'
            },
            min: 35,
            max: 60
          }
        }
      }
    });
  }

  createPortfolioDistributionChart() {
    const ctx = document.getElementById('portfolioDistributionChart');
    if (!ctx) return;

    // Categorize selected companies by focus area
    const focusAreas = {
      'AgTech': ['Smart mushroom farming using IoT and container technology'],
      'CleanTech': ['Converting plastic waste to high-quality fuels', 'Sustainable materials using recycled plastics and 3D printing'],
      'AI/Robotics': ['Forestry monitoring with AI and drone technology', 'AI service robotics for professional and domestic use'],
      'Gaming/Creative': ['Malaysian-made video game IP development'],
      'IoT/Communications': ['Satellite-based IoT communication for remote areas']
    };

    const categorizedCompanies = {
      'AgTech': 1,
      'CleanTech': 2,
      'AI/Robotics': 2,
      'Gaming/Creative': 1,
      'IoT/Communications': 1
    };

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(categorizedCompanies),
        datasets: [{
          data: Object.values(categorizedCompanies),
          backgroundColor: chartColors.slice(0, 5),
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Selected Companies by Technology Focus',
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          legend: {
            display: true,
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label;
                const value = context.parsed;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} companies (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }

  createGeographicChart() {
    const ctx = document.getElementById('geographicChart');
    if (!ctx) return;

    // Calculate geographic distribution
    const selectedSarawakian = presentationData.selectedCompanies.filter(c => c.status === 'Sarawakian').length;
    const selectedNonSarawakian = presentationData.selectedCompanies.filter(c => c.status === 'Non-Sarawakian').length;
    
    const notSelectedSarawakian = presentationData.notSelectedHighScoring.filter(c => c.status === 'Sarawakian').length;
    const notSelectedNonSarawakian = presentationData.notSelectedHighScoring.filter(c => c.status === 'Non-Sarawakian').length;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Selected Companies', 'High-Scoring Not Selected'],
        datasets: [
          {
            label: 'Sarawakian',
            data: [selectedSarawakian, notSelectedSarawakian],
            backgroundColor: chartColors[0],
            borderWidth: 1
          },
          {
            label: 'Non-Sarawakian',
            data: [selectedNonSarawakian, notSelectedNonSarawakian],
            backgroundColor: chartColors[1],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Geographic Distribution Analysis',
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataset.label;
                const value = context.parsed.y;
                return `${label}: ${value} companies`;
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Company Groups'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Number of Companies'
            },
            beginAtZero: true,
            max: 6,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }
}

// Animation utilities
class AnimationUtils {
  static fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      
      element.style.opacity = Math.min(progress / duration, 1);
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  static slideIn(element, direction = 'left', duration = 300) {
    const transforms = {
      left: 'translateX(-100%)',
      right: 'translateX(100%)',
      up: 'translateY(-100%)',
      down: 'translateY(100%)'
    };
    
    element.style.transform = transforms[direction];
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const easeProgress = this.easeOutCubic(progress / duration);
      
      element.style.transform = `${transforms[direction].replace('100%', `${100 - (easeProgress * 100)}%`)}`;
      element.style.opacity = Math.min(easeProgress, 1);
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        element.style.transform = '';
        element.style.opacity = '1';
      }
    };
    
    requestAnimationFrame(animate);
  }

  static easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
}

// Utility functions
function calculateStatistics() {
  const selectedScores = presentationData.selectedCompanies.map(c => c.score);
  const notSelectedScores = presentationData.notSelectedHighScoring.map(c => c.score);
  
  const selectedAvg = selectedScores.reduce((a, b) => a + b, 0) / selectedScores.length;
  const notSelectedAvg = notSelectedScores.reduce((a, b) => a + b, 0) / notSelectedScores.length;
  
  return {
    selectedAverage: Math.round(selectedAvg * 10) / 10,
    notSelectedAverage: Math.round(notSelectedAvg * 10) / 10,
    differential: Math.round((notSelectedAvg - selectedAvg) * 10) / 10
  };
}

function updateStatisticsDisplay() {
  const stats = calculateStatistics();
  
  // Update any dynamic statistics in the presentation
  const statElements = document.querySelectorAll('[data-stat]');
  statElements.forEach(element => {
    const statType = element.getAttribute('data-stat');
    if (stats[statType] !== undefined) {
      element.textContent = stats[statType];
    }
  });
}

// Accessibility features
function initAccessibility() {
  // Add ARIA labels and roles
  const slides = document.querySelectorAll('.slide');
  slides.forEach((slide, index) => {
    slide.setAttribute('role', 'tabpanel');
    slide.setAttribute('aria-label', `Slide ${index + 1} of ${slides.length}`);
  });
  
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.setAttribute('tabindex', '0');
    
    // Add Enter key support for dots
    dot.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dot.click();
      }
    });
  });
  
  // Add focus management
  const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      const currentSlide = document.querySelector('.slide.active');
      const focusable = currentSlide.querySelectorAll(focusableElements);
      const firstFocusable = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];
      
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    }
  });
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize presentation controller
  const presentation = new PresentationController();
  
  // Initialize accessibility features
  initAccessibility();
  
  // Update statistics display
  updateStatisticsDisplay();
  
  // Add smooth scrolling for any internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
  
  // Add print support
  window.addEventListener('beforeprint', () => {
    // Show all slides for printing
    document.querySelectorAll('.slide').forEach(slide => {
      slide.style.position = 'relative';
      slide.style.opacity = '1';
      slide.style.visibility = 'visible';
      slide.style.pageBreakAfter = 'always';
    });
  });
  
  window.addEventListener('afterprint', () => {
    // Restore normal slide behavior
    document.querySelectorAll('.slide').forEach((slide, index) => {
      slide.style.position = 'absolute';
      if (index === presentation.currentSlide - 1) {
        slide.style.opacity = '1';
        slide.style.visibility = 'visible';
      } else {
        slide.style.opacity = '0';
        slide.style.visibility = 'hidden';
      }
      slide.style.pageBreakAfter = 'auto';
    });
  });
  
  console.log('DiVA Cohort 4 Presentation initialized successfully');
});