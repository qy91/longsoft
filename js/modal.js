document.addEventListener('DOMContentLoaded', function() {
    const introModal = document.getElementById('intro-modal');
    const pricingModal = document.getElementById('pricing-modal');
    const getStartedBtn = document.getElementById('get-quote-btn');
    const pricingLink = document.getElementById('pricing-link');
    const form = document.getElementById('pricing-form');

    // 打开介绍窗口
    document.querySelectorAll('.get-started').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            introModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    // 从介绍窗口跳转到报价窗口
    getStartedBtn.addEventListener('click', function() {
        introModal.classList.remove('show');
        pricingModal.classList.add('show');
    });

    // Pricing 链接直接打开报价窗口
    pricingLink.addEventListener('click', function(e) {
        e.preventDefault();
        pricingModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    // 点击窗口外部关闭
    [introModal, pricingModal].forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    });

    // 表单提交处理
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        console.log('Form submitted:', Object.fromEntries(formData));
        alert('Request submitted successfully! We will contact you soon.');
        pricingModal.classList.remove('show');
        document.body.style.overflow = '';
        form.reset();
    });
});