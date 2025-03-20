new Vue({
    el: '#app',
    data: {
        activeTab: 'App',
        productDialogVisible: false,
        downloadDialogVisible: false,
        navigationDialogVisible: false,
        selectedProduct: {},
        targetUrl: '',
        pendingUrl: null,
        isFromIframe: false,
        categories: [
            {
                name: 'database',
                label: '数据库',
                products: [
                    {
                        id: 1,
                        name: 'SinKoDB',
                        description: '高效查找,并发处理',
                        image: '../assets/images/1737344218779.jpg',
                        detailImage: '../assets/images/1737344218779.jpg',
                        detailDescription: `
                            <h3>产品特点</h3>
                            <ul>
                                <li>轻量化，无需单独服务运行</li>
                                <li>极高效，数万数据量秒查找</li>
                                <li>并发强，万亿请求量秒处理</li>
                            </ul>
                            <h3>技术规格</h3>
                            <p>C++库，快速安装引入，无需单独配置</p>
                            <h3>下载方式</h3>
                            <p>测试阶段，暂不提供</p>
                        `,
                        downloadable: false,
                        downloads: [
                            {
                                name: 'Windows版本',
                                url: 'https://example.com/download/windows'
                            },
                            {
                                name: 'Mac版本',
                                url: 'https://example.com/download/mac'
                            }
                        ]
                    },
                ]
            },
            {
                name: 'App',
                label: '应用程序',
                products: [
                    {
                        id: 1,
                        name: 'FindQueen 本地文件搜索',
                        description: '极速搜索，快速查找',
                        image: '../assets/images/1737344217515.jpg',
                        detailImage: '../assets/images/1737344217514.jpg',
                        detailDescription: `
                            <h3>产品特点</h3>
                            <ul>
                                <li>极速查找本地文件</li>
                                <li>查找时CPU占用不到1%</li>
                            </ul>
                            <h3>下载方式</h3>
                            <p>点击下载按钮，从我司下载源下载</p>
                        `,
                        downloadable: true,
                        downloads: [
                            {
                                name: 'Windows版本',
                                url: 'https://example.com/download/windows'
                            },
                            {
                                name: '源代码',
                                url: 'https://example.com/download/windows'
                            }
                        ]
                    },
                ]
            }
        ]
    },
    methods: {
        showProductDetail(product) {
            this.selectedProduct = product;
            this.productDialogVisible = true;
        },
        handleClose(done) {
            done();
        },
        showDownloadDialog(product) {
            if (product) {
                this.selectedProduct = product;
            }
            this.downloadDialogVisible = true;
        },
        handleDownload(url) {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = url;
            document.body.appendChild(iframe);
            
            this.$message({
                message: '开始下载...',
                type: 'success'
            });

            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 2000);
        },
        handleLinkClick(e) {
            this.targetUrl = e.target.href;
            this.pendingUrl = e.target.href;
            this.navigationDialogVisible = true;
        },
        confirmNavigation() {
            if (this.pendingUrl) {
                window.open(this.pendingUrl, '_blank');
            }
            this.navigationDialogVisible = false;
            this.pendingUrl = null;
        }
    }
});