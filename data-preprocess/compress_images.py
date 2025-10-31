"""
图片批量压缩脚本
压缩picture文件夹中的所有图片，保持原始图片质量的同时减小文件大小
"""

from PIL import Image
import os
from pathlib import Path

def compress_image(input_path, output_path, quality=85, max_width=800):
    """
    压缩单张图片
    
    Args:
        input_path: 输入图片路径
        output_path: 输出图片路径
        quality: JPEG质量 (1-100)，默认85
        max_width: 最大宽度（像素），默认800
    """
    try:
        with Image.open(input_path) as img:
            # 转换RGBA为RGB（如果是PNG）
            if img.mode in ('RGBA', 'LA', 'P'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            
            # 调整大小（保持宽高比）
            if img.width > max_width:
                ratio = max_width / img.width
                new_size = (max_width, int(img.height * ratio))
                img = img.resize(new_size, Image.Resampling.LANCZOS)
            
            # 保存压缩后的图片
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            
            # 计算压缩率
            original_size = os.path.getsize(input_path) / 1024
            compressed_size = os.path.getsize(output_path) / 1024
            ratio = (1 - compressed_size / original_size) * 100
            
            print(f"✓ {Path(input_path).name}: {original_size:.1f}KB → {compressed_size:.1f}KB (减少 {ratio:.1f}%)")
            
            return True
    except Exception as e:
        print(f"✗ 压缩失败 {Path(input_path).name}: {str(e)}")
        return False

def compress_folder(input_folder, output_folder=None, quality=85, max_width=800):
    """
    批量压缩文件夹中的所有图片
    
    Args:
        input_folder: 输入文件夹路径
        output_folder: 输出文件夹路径（None则覆盖原文件）
        quality: JPEG质量
        max_width: 最大宽度
    """
    input_path = Path(input_folder)
    
    # 如果没有指定输出文件夹，创建一个备份文件夹
    if output_folder is None:
        output_path = input_path.parent / f"{input_path.name}_compressed"
    else:
        output_path = Path(output_folder)
    
    output_path.mkdir(exist_ok=True)
    
    # 支持的图片格式
    image_extensions = {'.png', '.jpg', '.jpeg', '.bmp', '.tiff', '.webp'}
    
    # 获取所有图片文件
    image_files = [f for f in input_path.iterdir() 
                   if f.is_file() and f.suffix.lower() in image_extensions]
    
    total = len(image_files)
    success = 0
    
    print(f"\n开始压缩 {total} 张图片...")
    print(f"输出目录: {output_path}\n")
    
    for i, img_file in enumerate(image_files, 1):
        print(f"[{i}/{total}] ", end="")
        
        # 输出文件名（统一为.jpg）
        output_file = output_path / f"{img_file.stem}.jpg"
        
        if compress_image(img_file, output_file, quality, max_width):
            success += 1
    
    print(f"\n压缩完成！成功: {success}/{total}")
    
    # 计算总大小
    original_size = sum(f.stat().st_size for f in image_files) / (1024 * 1024)
    compressed_size = sum(f.stat().st_size for f in output_path.iterdir()) / (1024 * 1024)
    
    print(f"原始大小: {original_size:.2f} MB")
    print(f"压缩后: {compressed_size:.2f} MB")
    print(f"节省空间: {original_size - compressed_size:.2f} MB ({(1-compressed_size/original_size)*100:.1f}%)")

if __name__ == "__main__":
    import sys
    
    # 获取脚本所在目录
    script_dir = Path(__file__).parent
    
    # 配置参数
    PICTURE_FOLDER = script_dir.parent / "picture"  # 使用相对路径 ../picture
    QUALITY = 85  # 图片质量 (1-100)，85是质量和大小的平衡点
    MAX_WIDTH = 800  # 最大宽度（像素），适合网页显示
    
    print("=" * 60)
    print("数码宝贝图片批量压缩工具")
    print("=" * 60)
    print(f"输入文件夹: {PICTURE_FOLDER}")
    print(f"压缩质量: {QUALITY}")
    print(f"最大宽度: {MAX_WIDTH}px")
    print("=" * 60)
    
    # 确认
    response = input("\n是否开始压缩？(y/n): ")
    if response.lower() != 'y':
        print("已取消")
        sys.exit(0)
    
    # 执行压缩
    compress_folder(PICTURE_FOLDER, quality=QUALITY, max_width=MAX_WIDTH)
    
    print("\n提示：压缩后的图片保存在 picture_compressed 文件夹中")
    print("请检查图片质量，如果满意，可以替换原文件夹")
