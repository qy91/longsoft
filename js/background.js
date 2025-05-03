document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    let mousePosition = { x: 0, y: 0 };
    let points = [];
    const numberOfPoints = 50;
    const connectionRadius = 150;
    const pointRadius = 2;

    // 调整画布大小
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // 初始化点
    function initPoints() {
        points = [];
        for (let i = 0; i < numberOfPoints; i++) {
            points.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2
            });
        }
    }

    // 更新点的位置
    function updatePoints() {
        points.forEach(point => {
            point.x += point.vx;
            point.y += point.vy;

            // 边界检查
            if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
            if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

            // 与鼠标的互动
            const dx = mousePosition.x - point.x;
            const dy = mousePosition.y - point.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionRadius) {
                point.vx += (dx / distance) * 0.1;
                point.vy += (dy / distance) * 0.1;
            }
        });
    }

    // 绘制点和连线
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制点之间的连线
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 245, 160, 0.1)';
        
        points.forEach((point, i) => {
            points.forEach((otherPoint, j) => {
                if (i !== j) {
                    const dx = point.x - otherPoint.x;
                    const dy = point.y - otherPoint.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionRadius) {
                        ctx.moveTo(point.x, point.y);
                        ctx.lineTo(otherPoint.x, otherPoint.y);
                    }
                }
            });

            // 与鼠标位置连线
            const mouseDistance = Math.sqrt(
                Math.pow(point.x - mousePosition.x, 2) + 
                Math.pow(point.y - mousePosition.y, 2)
            );

            if (mouseDistance < connectionRadius) {
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(mousePosition.x, mousePosition.y);
            }
        });
        
        ctx.stroke();

        // 绘制点
        points.forEach(point => {
            ctx.beginPath();
            ctx.fillStyle = 'rgba(0, 245, 160, 0.5)';
            ctx.arc(point.x, point.y, pointRadius, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // 动画循环
    function animate() {
        updatePoints();
        draw();
        requestAnimationFrame(animate);
    }

    // 监听鼠标移动
    canvas.addEventListener('mousemove', function(e) {
        mousePosition.x = e.clientX;
        mousePosition.y = e.clientY;
    });

    // 监听窗口大小变化
    window.addEventListener('resize', function() {
        resizeCanvas();
        initPoints();
    });

    // 初始化
    resizeCanvas();
    initPoints();
    animate();
});