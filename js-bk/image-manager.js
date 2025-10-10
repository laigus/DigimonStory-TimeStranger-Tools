// 图片管理器模块

class ImageManager {
    constructor() {
        this.initializeElements();
        this.initializeEventListeners();
        this.currentSelectedDigimon = null;
        this.previewFile = null;
    }

    initializeElements() {
        this.modal = document.getElementById('imageManagerModal');
        this.closeModal = document.getElementById('closeModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.uploadArea = document.getElementById('uploadArea');
        this.imageInput = document.getElementById('imageInput');
        this.selectImageBtn = document.getElementById('selectImageBtn');
        this.previewImage = document.getElementById('previewImage');
        this.previewPlaceholder = document.getElementById('previewPlaceholder');
        this.saveImageBtn = document.getElementById('saveImageBtn');
    }

    initializeEventListeners() {
        // 模态框控制
        this.closeModal.addEventListener('click', () => this.closeModalHandler());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModalHandler();
        });

        // 图片上传
        this.selectImageBtn.addEventListener('click', () => this.imageInput.click());
        this.imageInput.addEventListener('change', (e) => this.handleFileSelect(e));
        
        // 拖拽上传
        this.uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.uploadArea.addEventListener('drop', (e) => this.handleDrop(e));
        this.uploadArea.addEventListener('click', () => this.imageInput.click());

        // 操作按钮
        this.saveImageBtn.addEventListener('click', () => this.saveImage());

        // ESC键关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.closeModalHandler();
            }
        });
    }

    openModal(digimon) {
        this.currentSelectedDigimon = digimon;
        this.modalTitle.textContent = `编辑 ${digimon.name} 的图片`;
        
        this.resetPreview();
        this.updateButtons();
        
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModalHandler() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.resetPreview();
        this.currentSelectedDigimon = null;
    }

    updateButtons() {
        const hasDigimon = !!this.currentSelectedDigimon;
        const hasPreview = !!this.previewFile;

        this.saveImageBtn.disabled = !hasDigimon || !hasPreview;
    }

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        this.uploadArea.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        this.uploadArea.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        this.uploadArea.classList.remove('dragover');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processFile(files[0]);
        }
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }

    processFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('请选择图片文件！');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.previewFile = {
                data: e.target.result,
                name: file.name,
                type: file.type
            };
            
            this.previewImage.src = e.target.result;
            this.previewImage.style.display = 'block';
            this.previewPlaceholder.style.display = 'none';
            
            this.updateButtons();
        };
        
        reader.readAsDataURL(file);
    }

    resetPreview() {
        this.previewFile = null;
        this.previewImage.style.display = 'none';
        this.previewPlaceholder.style.display = 'block';
        this.imageInput.value = '';
        this.updateButtons();
    }

    saveImage() {
        if (!this.currentSelectedDigimon || !this.previewFile) {
            alert('请选择图片！');
            return;
        }

        // 直接下载图片到picture文件夹
        this.downloadImageToFolder();
        
        // 重新渲染数码宝贝列表以更新图片
        renderDigimonList();
        
        // 如果当前选中的数码宝贝就是我们更新的，也更新进化图
        if (selectedDigimon && selectedDigimon.id === this.currentSelectedDigimon.id) {
            renderEvolutionChart(selectedDigimon);
        }
        
        this.resetPreview();
        this.updateButtons();
        
        // 保存后自动关闭弹窗
        this.closeModalHandler();
    }

    downloadImageToFolder() {
        // 创建下载链接
        const link = document.createElement('a');
        link.href = this.previewFile.data;
        
        // 确定文件扩展名
        let extension = '.jpg';
        if (this.previewFile.type.includes('png')) extension = '.png';
        else if (this.previewFile.type.includes('gif')) extension = '.gif';
        else if (this.previewFile.type.includes('webp')) extension = '.webp';
        
        // 设置下载文件名
        link.download = `${this.currentSelectedDigimon.name}${extension}`;
        
        // 触发下载
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// 打开图片编辑器的全局函数
function openImageEditor(digimon) {
    imageManager.openModal(digimon);
}