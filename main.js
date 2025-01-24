document.addEventListener('DOMContentLoaded', () => {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#00ff9d'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00ff9d',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });

    // 初始化技能条动画
    const progressBars = document.querySelectorAll('.progress');
    const observerOptions = {
        threshold: 0.5
    };

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const percent = progress.getAttribute('data-percent');
                progress.style.width = `${percent}%`;
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // 照片分类筛选
    const categoryBtns = document.querySelectorAll('.category-btn');
    const photoItems = document.querySelectorAll('.photo-item');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新按钮状态
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 筛选照片
            const category = btn.dataset.category;
            photoItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 初始显示所有照片
    photoItems.forEach(item => {
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
    });

    // 图片懒加载
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // 照片查看器功能
    const photoViewer = document.querySelector('.photo-viewer');
    const viewerImage = photoViewer.querySelector('.viewer-image img');
    const viewerTitle = photoViewer.querySelector('.viewer-info h3');
    const viewerDesc = photoViewer.querySelector('.viewer-info p');
    const closeBtn = photoViewer.querySelector('.viewer-close');

    // 打开照片查看器
    function openPhotoViewer(photo) {
        viewerImage.src = photo.src;
        viewerTitle.textContent = photo.title;
        viewerDesc.textContent = photo.description;
        photoViewer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // 关闭查看器
    closeBtn.addEventListener('click', () => {
        photoViewer.classList.remove('active');
        document.body.style.overflow = '';
    });

    // 键盘控制 (仅保留 Escape 关闭功能)
    document.addEventListener('keydown', (e) => {
        if (!photoViewer.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeBtn.click();
        }
    });

    // 为每个照片添加点击事件
    document.querySelectorAll('.photo-item').forEach(item => {
        item.addEventListener('click', () => {
            const photo = {
                src: item.querySelector('img').src,
                title: item.querySelector('h3').textContent,
                description: item.querySelector('p').textContent
            };
            openPhotoViewer(photo);
        });
    });

    // 检查图片加载
    document.querySelectorAll('.photo-item img').forEach(img => {
        img.addEventListener('error', function() {
            console.error('图片加载失败:', this.src);
            // 可以设置一个默认图片
            // this.src = 'default.jpg';
        });
        
        img.addEventListener('load', function() {
            console.log('图片加载成功:', this.src);
        });
    });

    // 移动端菜单控制
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // 添加汉堡菜单动画
        menuToggle.classList.toggle('active');
    });

    // 点击导航链接后关闭菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // 添加汉堡菜单动画样式
    const menuToggleStyle = `
    .menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    `;

    // 将样式添加到页面
    const styleSheet = document.createElement('style');
    styleSheet.textContent = menuToggleStyle;
    document.head.appendChild(styleSheet);
}); 