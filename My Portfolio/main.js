const imageSlider = document.getElementById('imageSlider');
let currentIndex = 0;
let slideInterval;

function startSliding() {
    slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % 4;
        imageSlider.style.transform = `translateX(-${currentIndex * 25}%)`;
    }, 2000);
}

document.addEventListener('DOMContentLoaded', startSliding);

const imageContainer = document.getElementById('imageContainer');
imageContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
imageContainer.addEventListener('mouseleave', startSliding);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            if (targetId === '#about') {
                document.getElementById('about').classList.add('visible');
            }

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });

            if (targetId !== '#about') { 
                const navLink = document.querySelector(`.nav-link[href="${targetId}"]`);
                if (navLink) navLink.classList.add('active');
            }
            
            target.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
});

window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

$(document).ready(function() {
    $('.project-item').hover(
        function() {
            $(this).css({
                'transform': 'scale(1.05)'
            });
            $(this).siblings().css({
                'transform': 'scale(0.95)'
            });
        },
        function() {
            $('.project-item').css({
                'transform': 'scale(0.95)'
            });
        }
    );
});

document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.progress-bar');
    const circularProgress = document.getElementById('circularProgress');

    function animateOnScroll() {
        const skillsSection = document.getElementById('skills');
        const sectionTop = skillsSection.offsetTop;
        const sectionHeight = skillsSection.offsetHeight;
        const scrollPosition = window.pageYOffset;

        if (scrollPosition > sectionTop - window.innerHeight + sectionHeight/2) {
            progressBars.forEach(bar => {
                bar.style.width = bar.style.getPropertyValue('--target-width');
            });
            
            let progress = 0;
            const targetProgress = 40;
            const duration = 1500;
            const increment = targetProgress / (duration / 16);
            
            const animate = () => {
                progress += increment;
                if (progress >= targetProgress) {
                    progress = targetProgress;
                    circularProgress.style.background = `conic-gradient(var(--accent-yellow) ${progress}%, #333 0%)`;
                    return;
                }
                
                circularProgress.style.background = `conic-gradient(var(--accent-yellow) ${progress}%, #333 0%)`;
                requestAnimationFrame(animate);
            };
            
            animate();
        }
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.project-gallery');
    const projects = document.querySelectorAll('.project-item');
    
    const originalProjects = Array.from(projects).map(project => project.outerHTML);
    gallery.innerHTML += gallery.innerHTML;

    let position = 0;
    let speed = 1.5;
    const totalWidth = gallery.scrollWidth / 2;
    let animationId;
    let isPaused = false;

    function animateProjects() {
        if (!isPaused) {
            position -= speed;
            if (position <= -totalWidth) {
                position = 0;
            }
            gallery.style.transform = `translateX(${position}px)`;
        }
        animationId = requestAnimationFrame(animateProjects);
    }

    animateProjects();

    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            isPaused = true;
        });
        item.addEventListener('mouseleave', () => {
            isPaused = false;
        });
    });

    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationId);
    });
});