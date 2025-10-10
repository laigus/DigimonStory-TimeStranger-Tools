#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
数码宝贝拼音首字母映射表生成器
从进化路线.txt中提取所有汉字，生成拼音首字母映射表
"""

import re
import os
from pypinyin import lazy_pinyin, Style

class PinyinMapGenerator:
    def __init__(self):
        self.unique_chars = set()
        self.pinyin_map = {}
        
    def extract_chinese_chars(self, text_file):
        """从文本文件中提取所有中文字符"""
        print(f"正在读取文件: {text_file}")
        
        try:
            with open(text_file, 'r', encoding='utf-8') as f:
                content = f.read()
        except FileNotFoundError:
            print(f"错误: 找不到文件 {text_file}")
            return
        
        # 处理进化路线.txt的特殊格式
        digimon_names = []
        
        lines = content.split('\n')
        for line in lines:
            line = line.strip()
            if not line:
                continue
                
            # 分割制表符
            parts = line.split('\t')
            
            for part in parts:
                part = part.strip()
                if not part:
                    continue
                    
                # 跳过纯数字、等级信息和关键词
                if (part.isdigit() or 
                    '期' in part or 
                    part in ['退化', '进化', ''] or
                    part.startswith('①') or part.startswith('②') or 
                    part.startswith('③') or part.startswith('④') or
                    part.startswith('⑤') or part.startswith('⑥')):
                    continue
                
                # 如果包含中文字符，认为是数码宝贝名字
                if re.search(r'[\u4e00-\u9fff]', part):
                    digimon_names.append(part)
        
        print(f"找到 {len(digimon_names)} 个数码宝贝名字")
        print(f"前10个名字示例: {digimon_names[:10]}")
        
        # 提取所有中文字符
        for name in digimon_names:
            for char in name:
                if re.match(r'[\u4e00-\u9fff]', char):  # 中文字符范围
                    self.unique_chars.add(char)
        
        print(f"提取到 {len(self.unique_chars)} 个唯一中文字符")
        return sorted(list(self.unique_chars))
    
    def generate_pinyin_initials(self, chars):
        """为字符生成拼音首字母映射"""
        print("正在生成拼音首字母映射...")
        
        for char in chars:
            # 使用pypinyin获取拼音首字母
            pinyin_list = lazy_pinyin(char, style=Style.FIRST_LETTER)
            if pinyin_list:
                initial = pinyin_list[0].lower()
                self.pinyin_map[char] = initial
        
        return self.pinyin_map
    
    def format_as_js_object(self, pinyin_map):
        """格式化为JavaScript对象格式"""
        lines = []
        chars_per_line = 8  # 每行显示8个字符
        
        chars = sorted(pinyin_map.keys())
        
        for i in range(0, len(chars), chars_per_line):
            line_chars = chars[i:i + chars_per_line]
            line_parts = []
            
            for char in line_chars:
                line_parts.append(f"'{char}': '{pinyin_map[char]}'")
            
            line = "    " + ", ".join(line_parts)
            if i + chars_per_line < len(chars):
                line += ","
            lines.append(line)
        
        return "{\n" + "\n".join(lines) + "\n}"
    
    def save_output(self, pinyin_map, output_file):
        """保存输出到文件"""
        js_object = self.format_as_js_object(pinyin_map)
        
        content = f"""// 数码宝贝汉字拼音首字母映射表
// 自动生成于进化路线.txt文件
// 总计 {len(pinyin_map)} 个汉字

const digimonPinyinMap = {js_object};

// 使用示例:
// console.log(digimonPinyinMap['小']); // 输出: 'x'

// 导出映射表
if (typeof module !== 'undefined' && module.exports) {{
    module.exports = digimonPinyinMap;
}}
"""
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"映射表已保存到: {output_file}")
    
    def print_statistics(self, pinyin_map):
        """打印统计信息"""
        print("\n=== 统计信息 ===")
        print(f"总字符数: {len(pinyin_map)}")
        
        # 按拼音首字母分组统计
        initial_groups = {}
        for char, initial in pinyin_map.items():
            if initial not in initial_groups:
                initial_groups[initial] = []
            initial_groups[initial].append(char)
        
        print("\n各首字母字符数量:")
        for initial in sorted(initial_groups.keys()):
            count = len(initial_groups[initial])
            print(f"  {initial}: {count} 个字符")
        
        print(f"\n覆盖的拼音首字母: {len(initial_groups)} 个")
    
    def generate_copy_paste_format(self, pinyin_map):
        """生成可直接复制粘贴到JavaScript代码中的格式"""
        print("\n=== 可复制粘贴的JavaScript格式 ===")
        
        # 按拼音首字母分组
        initial_groups = {}
        for char, initial in pinyin_map.items():
            if initial not in initial_groups:
                initial_groups[initial] = []
            initial_groups[initial].append(char)
        
        # 生成分组显示
        lines = []
        chars_per_line = 10
        
        for initial in sorted(initial_groups.keys()):
            chars = initial_groups[initial]
            comment_line = f"    // {initial.upper()}: {len(chars)} 个字符"
            lines.append(comment_line)
            
            for i in range(0, len(chars), chars_per_line):
                line_chars = chars[i:i + chars_per_line]
                line_parts = [f"'{char}': '{initial}'" for char in line_chars]
                line = "    " + ", ".join(line_parts) + ","
                lines.append(line)
            lines.append("")  # 空行分隔
        
        # 移除最后的逗号
        if lines and lines[-2].endswith(","):
            lines[-2] = lines[-2][:-1]
        
        formatted_content = "\n".join(lines)
        print(formatted_content)
        
        return formatted_content

def main():
    generator = PinyinMapGenerator()
    
    # 输入和输出文件路径
    input_file = "进化路线.txt"
    output_file = "digimon_pinyin_map.js"
    
    # 检查输入文件是否存在
    if not os.path.exists(input_file):
        print(f"错误: 找不到文件 {input_file}")
        print("请确保在data-preprocess文件夹中运行此脚本")
        return
    
    try:
        # 提取中文字符
        chars = generator.extract_chinese_chars(input_file)
        
        if not chars:
            print("错误: 没有找到任何中文字符")
            return
        
        # 生成拼音映射
        pinyin_map = generator.generate_pinyin_initials(chars)
        
        # 保存到文件
        generator.save_output(pinyin_map, output_file)
        
        # 打印统计信息
        generator.print_statistics(pinyin_map)
        
        # 生成复制粘贴格式
        generator.generate_copy_paste_format(pinyin_map)
        
        print(f"\n✅ 成功生成拼音映射表!")
        print(f"📁 输出文件: {output_file}")
        print(f"📊 总共处理了 {len(pinyin_map)} 个汉字")
        
    except Exception as e:
        print(f"❌ 生成过程中出现错误: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()