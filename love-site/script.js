// 平滑滚动
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

// 相册筛选
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 更新按钮状态
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // 筛选图片
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// 淡入动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);

// 滚动动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为时光轴项目添加动画
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// 为相册项目添加动画
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.9)';
    item.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
    observer.observe(item);
});

// 留言功能
function addMessage() {
    const input = document.getElementById('messageInput');
    const messagesList = document.getElementById('messagesList');
    const content = input.value.trim();
    
    if (!content) {
        alert('请输入留言内容 💕');
        return;
    }
    
    const now = new Date();
    const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
    
    const messageItem = document.createElement('div');
    messageItem.className = 'message-item';
    messageItem.style.opacity = '0';
    messageItem.style.transform = 'translateY(20px)';
    messageItem.innerHTML = `
        <div class="message-content">${escapeHtml(content)}</div>
        <div class="message-meta">Teemo · ${dateStr}</div>
    `;
    
    messagesList.insertBefore(messageItem, messagesList.firstChild);
    
    // 动画显示
    setTimeout(() => {
        messageItem.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        messageItem.style.opacity = '1';
        messageItem.style.transform = 'translateY(0)';
    }, 10);
    
    input.value = '';
}

// HTML 转义防止 XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 回车发送留言
document.getElementById('messageInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addMessage();
    }
});

// 计算在一起的天数
function calculateDays() {
    // 可以修改这个日期为实际的开始日期
    const startDate = new Date('2023-05-20');
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // 更新页面上的天数显示
    const daysElements = document.querySelectorAll('.days-number, .countdown-number .number');
    if (daysElements.length > 0) {
        daysElements[0].textContent = diffDays;
    }
}

// 页面加载时计算天数
calculateDays();

// 导航栏滚动效果
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 30px rgba(255, 107, 157, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(255, 107, 157, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// 图片点击放大（简单版）
document.querySelectorAll('.gallery-item img, .timeline-photo img').forEach(img => {
    img.addEventListener('click', function() {
        // 创建模态框
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: zoom-out;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        
        const modalImg = document.createElement('img');
        modalImg.src = this.src;
        modalImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            transform: scale(0.9);
            transition: transform 0.3s;
        `;
        
        modal.appendChild(modalImg);
        document.body.appendChild(modal);
        
        // 动画显示
        setTimeout(() => {
            modal.style.opacity = '1';
            modalImg.style.transform = 'scale(1)';
        }, 10);
        
        // 点击关闭
        modal.addEventListener('click', () => {
            modal.style.opacity = '0';
            modalImg.style.transform = 'scale(0.9)';
            setTimeout(() => modal.remove(), 300);
        });
    });
});

console.log('💕 Teemo & Angela 的网站已加载完成！');
console.log('由 Uzi 精心制作 🎯');