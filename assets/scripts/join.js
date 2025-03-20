new Vue({
    el: '#app',
    data: {
        dialogVisible: false,
        targetUrl: '',
        pendingUrl: null,
        isFromIframe: false, 
                // 新增申请表单相关数据
                applyDialogVisible: false,
                selectedJob: null,
                applyForm: {
                    name: '',
                    age: '',
                    province: '',
                    city: '',
                    email: ''
                },
        benefits: [
            {
                icon: 'el-icon-medal',
                title: '领先同行',
                description: '遥遥领先，无限进步'
            },
            {
                icon: 'el-icon-coffee-cup',
                title: '弹性工作',
                description: '弹性工作，随时随地'
            },
            {
                icon: 'el-icon-reading',
                title: '持续学习',
                description: '共同学习，共同进步'
            },
            {
                icon: 'el-icon-first-aid-kit',
                title: '福利完善',
                description:'有功必赏，有答必谢'
            }
        ],
        jobs: [
            {
                id: 1,
                title: '暂无空缺职位',
                department: '我司还未有空缺职位，敬请期待',
                location: '0 person',
                description: '我们正在努力招聘更多优秀的人才，敬请期待！',
                canApply: false
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
        },
        handleApply(job) {
            this.selectedJob = job;
            this.applyDialogVisible = true;
        },

        submitApplication() {
            // 表单验证
            if (!this.applyForm.name) {
                this.$message.error('请填写姓名');
                return;
            }
            if (!this.applyForm.age) {
                this.$message.error('请填写年龄');
                return;
            }
            if (!this.applyForm.province || !this.applyForm.city) {
                this.$message.error('请填写完整的居住地信息');
                return;
            }
            if (!this.applyForm.email) {
                this.$message.error('请填写电子邮件');
                return;
            }

            // 验证邮箱格式
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.applyForm.email)) {
                this.$message.error('请输入有效的电子邮件地址');
                return;
            }

            // 构建邮件内容
            const mailtoLink = `mailto:Uisur@outlook.com?subject=应聘${this.selectedJob.title}&body=职位信息：
${this.selectedJob.title}
${this.selectedJob.description}

申请人信息：
姓名：${this.applyForm.name}
居住地：${this.applyForm.province}${this.applyForm.city}
联系邮箱：${this.applyForm.email}`;

            window.location.href = encodeURI(mailtoLink);
            this.applyDialogVisible = false;
            this.$message.success('请使用电子邮件程序继续~');
            
            // 重置表单
            this.applyForm = {
                name: '',
                age: '',
                province: '',
                city: '',
                email: ''
            };
        }
    }
})