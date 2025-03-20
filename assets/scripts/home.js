new Vue({
    el: '#app',
    data: {
        dialogVisible: false,
        targetUrl: '',
        pendingUrl: null,
        isFromIframe: false, 
        features: [
            {
                icon: 'el-icon-cpu',
                title: '技术创新',
                description: '持续推动技术边界，引领行业发展'
            },
            {
                icon: 'el-icon-user',
                title: '用户至上',
                description: '以用户需求为中心，提供极致体验'
            },
            {
                icon: 'el-icon-connection',
                title: '开放合作',
                description: '携手合作伙伴，共创美好未来'
            }
        ],
        activities: [
            {
                content: '新一代轻量化数据库开始研发',
                date: '2025-01-05'
            },
            {
                content: 'MudChat正式发布🌚',
                date: '2024-12-31'
            },
            {
                content: '328Cloud正式发布',
                date: '2024-12-12'
            }
        ]
    },
    mounted() {
        // 添加全局点击事件监听
        document.addEventListener('click', this.handleClick, true);
        
        // 监听iframe内的点击事件
        this.$refs.pageIframe.onload = () => {
            try {
                this.$refs.pageIframe.contentWindow.document.addEventListener('click', this.handleClick, true);
            } catch (e) {
                console.warn('无法访问iframe内容，可能是跨域限制');
            }
        }
    },
    methods: {
        goToProducts() {
            localStorage.setItem('pendingPage', 'products');
        },
        handleClick(e) {
            const link = e.target.closest('a');
            if (link && link.href) {
                e.preventDefault();
                
                if (link.hasAttribute('download')) {
                    return;
                }
                
                this.isFromIframe = e.target.ownerDocument !== document;
                this.targetUrl = link.href;
                this.pendingUrl = link.href;
                this.dialogVisible = true;
            }
        },
        
        confirmNavigation() {
            if (this.pendingUrl) {
                // 所有链接都在新标签页打开
                window.open(this.pendingUrl, '_blank');
            }
            this.dialogVisible = false;
            this.pendingUrl = null;
        }
    }
})