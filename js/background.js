const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

// 设置canvas尺寸
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

// 创建点类
class Point {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
    }
}

// 创建点阵
const points = Array.from({ length: 100 }, () => new Point());

// 动画循环
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    points.forEach(point => {
        point.update();
    });

    // 绘制点和线
    points.forEach((point, i) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();

        // 连接临近的点
        points.slice(i + 1).forEach(otherPoint => {
            const distance = Math.hypot(point.x - otherPoint.x, point.y - otherPoint.y);
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(otherPoint.x, otherPoint.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 100)})`;
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animate);
}

animate();