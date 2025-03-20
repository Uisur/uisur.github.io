new Vue({
    el: '#app',
    data: {
        isTop: true,
        isBottom: false,
        currentPage: 'home',
        dialogVisible: false,
        targetUrl: '',
        pendingUrl: null,
        navItems: [
            { name: '主页', path: 'home' },
            { name: '产品详情', path: 'products' },
            { name: '关于我们', path: 'about' },
            { name: '加入我们', path: 'join' }
        ],
        friendLinks: [
            { name: '百度搜索', url: 'https://www.baidu.com' },
            { name: '谷歌搜索', url: 'https://www.google.com' },
            { name: '必应搜索', url: 'https://www.bing.com' }
        ],
        beianInfo: '© 2024 ByteWise Studio - 京ICP备XXXXXXXX号',
        scrollAnimationFrame: null
    },
    created() {
        window.addEventListener('storage', this.handleStorageChange);
    },
    computed: {
        currentPageUrl() {
            return `./pages/${this.currentPage}.html`;
        }
    },
    methods: {
        handleScroll() {
            if (this.scrollAnimationFrame) {
                cancelAnimationFrame(this.scrollAnimationFrame);
            }
            this.scrollAnimationFrame = requestAnimationFrame(() => {
                const mainContent = document.querySelector('.main-content');
                this.isTop = mainContent.scrollTop <= 0;
                const scrollHeight = mainContent.scrollHeight;
                const scrollTop = mainContent.scrollTop;
                const clientHeight = mainContent.clientHeight;
                this.isBottom = scrollHeight - (scrollTop + clientHeight) <= 20;
            });
        },
        changePage(path) {
            this.currentPage = path;
            this.isBottom = false;
            const mainContent = document.querySelector('.main-content');
            mainContent.scrollTop = 0;
        },
        handleIframeLoad(e) {
            const iframe = e.target;
            iframe.contentWindow.postMessage({ type: 'style', styles: { margin: '0', padding: '0', overflow: 'visible' } }, '*');
        },
        handleStorageChange(e) {
            if (e.key === 'pendingPage' && e.newValue) {
                this.currentPage = e.newValue;
                localStorage.removeItem('pendingPage');
            }
        },
        handleClick(e) {
            const link = e.target.closest('a');
            if (link && link.href) {
                if (link.target === '_blank') {
                    return;
                }
                e.preventDefault();
                if (link.hasAttribute('download')) {
                    return;
                }
                this.targetUrl = link.href;
                this.pendingUrl = link.href;
                this.dialogVisible = true;
            }
        },
        confirmNavigation() {
            if (this.pendingUrl) {
                window.location.href = this.pendingUrl;
            }
            this.dialogVisible = false;
            this.pendingUrl = null;
        }
    },
    mounted() {
        const mainContent = document.querySelector('.main-content');
        document.addEventListener('click', this.handleClick, true);
        mainContent.addEventListener('scroll', this.handleScroll);
        this.$nextTick(() => {
            this.handleScroll();
            if (this.$refs.pageIframe) {
                this.$refs.pageIframe.onload = this.handleIframeLoad;
            }
        });
    },
    beforeDestroy() {
        const mainContent = document.querySelector('.main-content');
        mainContent.removeEventListener('scroll', this.handleScroll);
        document.removeEventListener('click', this.handleClick, true);
    }
});