// 标签页管理器模块

class TabManager {
    constructor() {
        this.activeTab = 'evolution';
        this.lastTab = 'evolution';
        this.init();
    }

    init() {
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tabId = e.target.dataset.tab;
                this.switchTab(tabId);
            });
        });
    }

    switchTab(tabId) {
        if (tabId === this.activeTab) return;
        const direction = tabId === 'training' ? 'right' : 'left';

        // 更新按钮状态
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.toggle('active', button.dataset.tab === tabId);
        });

        const currentPane = document.getElementById(`${this.activeTab}-tab`);
        const nextPane = document.getElementById(`${tabId}-tab`);

        // 清除所有动画类
        if (currentPane) {
            currentPane.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
        }
        if (nextPane) {
            nextPane.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
        }

        // 同时执行滑出和滑入动画
        if (currentPane && nextPane) {
            // 让两个页面都可见并可交互
            currentPane.style.opacity = '1';
            currentPane.style.pointerEvents = 'auto';
            currentPane.style.zIndex = '1';
            
            nextPane.classList.add('active');
            nextPane.style.opacity = '1';
            nextPane.style.pointerEvents = 'auto';
            nextPane.style.zIndex = '2';

            // 添加动画类
            if (direction === 'right') {
                currentPane.classList.add('slide-out-left');
                nextPane.classList.add('slide-in-right');
            } else {
                currentPane.classList.add('slide-out-right');
                nextPane.classList.add('slide-in-left');
            }

            // 动画结束后清理
            setTimeout(() => {
                if (currentPane) {
                    currentPane.classList.remove('active', 'slide-out-left', 'slide-out-right');
                    currentPane.style.opacity = '';
                    currentPane.style.pointerEvents = '';
                    currentPane.style.zIndex = '';
                }
                if (nextPane) {
                    nextPane.classList.remove('slide-in-left', 'slide-in-right');
                    nextPane.style.opacity = '';
                    nextPane.style.pointerEvents = '';
                    nextPane.style.zIndex = '';
                }
            }, 300);
        }

        this.lastTab = this.activeTab;
        this.activeTab = tabId;
    }

    getActiveTab() {
        return this.activeTab;
    }
}