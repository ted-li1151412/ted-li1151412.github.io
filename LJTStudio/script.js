// ==========================
//  修复后的完整 script.js
// ==========================

document.addEventListener('DOMContentLoaded', function () {
    /* ---------- 1. 移动端菜单 ---------- */
    const hamburger = document.querySelector('.hamburger');
    const navMenu   = document.querySelector('.nav-menu');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击链接后关闭移动端菜单
    document.querySelectorAll('.nav-link').forEach(link =>
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        })
    );

    /* ---------- 2. 只对锚点启用平滑滚动 ---------- */
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // 外链或普通页面直接放行
            if (!href || !href.startsWith('#')) return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    /* ---------- 3. 导航栏滚动效果 ---------- */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255,255,255,0.98)';
            navbar.style.boxShadow  = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255,255,255,0.95)';
            navbar.style.boxShadow  = 'none';
        }
    });

    /* ---------- 4. 滚动更新高亮链接 ---------- */
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const id = section.getAttribute('id');
            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                document.querySelector(`.nav-link[href="#${id}"]`)?.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveNavLink);

    /* ---------- 5. 数字计数动画 ---------- */
    function animateNumbers() {
        document.querySelectorAll('.stat-number').forEach(num => {
            const target = parseInt(num.textContent.replace(/\D/g, ''));
            let current = 0;
            const inc = target / 50;
            const timer = setInterval(() => {
                current += inc;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                num.textContent = Math.floor(current) + '+';
            }, 30);
        });
    }

    /* ---------- 6. 滚动触发动画 ---------- */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                if (entry.target.classList.contains('about')) animateNumbers();
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.service-card, .project-card, .about-content, .contact-content')
            .forEach(el => observer.observe(el));

    /* ---------- 7. 联系表单 ---------- */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            const name    = contactForm.querySelector('input[type="text"]').value.trim();
            const email   = contactForm.querySelector('input[type="email"]').value.trim();
            const message = contactForm.querySelector('textarea').value.trim();

            if (!name || !email || !message) return alert('请填写所有必填字段');
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('请输入有效的邮箱地址');

            alert('感谢您的留言！我们会尽快回复您。');
            contactForm.reset();
        });
    }

    /* ---------- 8. 打字机效果 ---------- */
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const txt = '创新科技驱动未来';
        heroTitle.textContent = '';
        let i = 0;
        function type() {
            if (i < txt.length) {
                heroTitle.textContent += txt.charAt(i++);
                setTimeout(type, 150);
            }
        }
        setTimeout(type, 1000);
    }

    /* ---------- 9. 视差 & 悬停 ---------- */
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        document.querySelectorAll('.floating-card').forEach((el, idx) => {
            const speed = 0.5 + idx * 0.1;
            el.style.transform = `translateY(${scroll * speed}px)`;
        });
    });

    /* ---------- 10. 返回顶部按钮 ---------- */
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.className = 'back-to-top';
    btn.style.cssText = `
        position:fixed; bottom:20px; right:20px; width:50px; height:50px;
        background:linear-gradient(135deg,#6366f1,#8b5cf6); color:#fff;
        border:none; border-radius:50%; cursor:pointer; opacity:0; visibility:hidden;
        transition:all .3s ease; z-index:1000; box-shadow:0 4px 12px rgba(0,0,0,.15);
    `;
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        btn.style.opacity   = window.pageYOffset > 300 ? '1' : '0';
        btn.style.visibility = window.pageYOffset > 300 ? 'visible' : 'hidden';
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ---------- 11. 鼠标跟随（桌面端） ---------- */
    if (window.innerWidth > 768) {
        const follower = document.createElement('div');
        follower.className = 'mouse-follower';
        follower.style.cssText = `
            position:fixed; width:20px; height:20px;
            background:radial-gradient(circle,rgba(99,102,241,.3),transparent);
            border-radius:50%; pointer-events:none; z-index:9999;
            transition:transform .1s ease;
        `;
        document.body.appendChild(follower);
        document.addEventListener('mousemove', e => {
            follower.style.left = e.clientX - 10 + 'px';
            follower.style.top  = e.clientY - 10 + 'px';
        });
    }

    /* ---------- 12. 加载动画 ---------- */
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        document.querySelectorAll('.service-card, .project-card').forEach((card, i) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all .6s ease';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            }, i * 100);
        });
    });
});

/* ---------- 13. 动画类 ---------- */
const style = document.createElement('style');
style.textContent = `
.animate-in{animation:slideInUp .6s ease forwards}
@keyframes slideInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
.back-to-top:hover{transform:scale(1.1);box-shadow:0 6px 20px rgba(0,0,0,.2)}
body{opacity:0;transition:opacity .3s ease} body.loaded{opacity:1}
`;
document.head.appendChild(style);
