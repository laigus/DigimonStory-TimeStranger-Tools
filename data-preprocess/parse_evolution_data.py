#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
数码宝贝进化路线数据解析器
用于分析进化路线.txt文件并生成digimonData格式的JavaScript数据
"""

import re
import json
from typing import Dict, List, Tuple, Optional

class DigimonEvolutionParser:
    def __init__(self, input_file: str):
        self.input_file = input_file
        self.digimon_data = {}
        self.level_mapping = {
            "①幼年期1": "幼年期Ⅰ",
            "②幼年期2": "幼年期Ⅱ", 
            "③成长期": "成长期",
            "④成熟期": "成熟期",
            "④装甲体": "装甲体",
            "④混合体": "混合体",
            "⑤完全体": "完全体",
            "⑥究极体": "究极体",
            "⑥混合体": "混合体",
            "⑦超究极体": "超究极体"
        }
    
    def parse_file(self) -> Dict:
        """解析进化路线文件"""
        with open(self.input_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 按行分割
        lines = content.strip().split('\n')
        
        current_digimon = None
        i = 0
        
        while i < len(lines):
            line = lines[i].strip()
            if not line:
                i += 1
                continue
            
            # 检查是否是数码宝贝基本信息行（以数字开头）
            if re.match(r'^\d+', line):
                # 分割行数据
                parts = line.split('\t')
                if len(parts) >= 4:
                    try:
                        digimon_id = int(parts[0].strip())
                        name = parts[1].strip()
                        level_raw = parts[2].strip()
                        # parts[3] 是 "退化"
                        
                        # 获取退化来源（第4个制表符之后的部分）
                        devolves_from = []
                        if len(parts) > 4:
                            for j in range(4, len(parts)):
                                if parts[j].strip():
                                    devolves_from.append(parts[j].strip())
                        
                        # 转换等级格式
                        level = self.level_mapping.get(level_raw, level_raw)
                        
                        current_digimon = {
                            'id': digimon_id,
                            'name': name,
                            'level': level,
                            'devolves_from': devolves_from,
                            'evolves_to': []
                        }
                        
                        self.digimon_data[digimon_id] = current_digimon
                        print(f"解析: ID {digimon_id} - {name} ({level}) 退化自: {devolves_from}")
                        
                    except (ValueError, IndexError) as e:
                        print(f"解析错误 - 行 {i+1}: {line}")
                        print(f"错误详情: {e}")
            
            # 检查下一行是否是进化信息
            elif line.strip().startswith('进化'):
                if current_digimon:
                    # 分割进化行数据
                    parts = line.split('\t')
                    evolves_to = []
                    # 跳过第一个"进化"，获取后面的所有进化目标
                    for j in range(1, len(parts)):
                        if parts[j].strip():
                            evolves_to.append(parts[j].strip())
                    
                    current_digimon['evolves_to'] = evolves_to
                    print(f"  -> 进化到: {evolves_to}")
            
            i += 1
        
        return self.digimon_data
    
    def create_name_to_id_mapping(self) -> Dict[str, int]:
        """创建名称到ID的映射"""
        name_to_id = {}
        for digimon_id, data in self.digimon_data.items():
            name_to_id[data['name']] = digimon_id
        return name_to_id
    
    def convert_to_js_format(self) -> List[Dict]:
        """转换为JavaScript格式的数据"""
        name_to_id = self.create_name_to_id_mapping()
        js_data = []
        
        for digimon_id in sorted(self.digimon_data.keys()):
            data = self.digimon_data[digimon_id]
            
            # 转换退化来源为ID列表
            evolves_from_ids = []
            for name in data['devolves_from']:
                if name in name_to_id:
                    evolves_from_ids.append(name_to_id[name])
                else:
                    print(f"警告: 找不到 '{name}' 的ID (在 {data['name']} 的退化来源中)")
            
            # 转换进化目标为ID列表
            evolves_to_ids = []
            for name in data['evolves_to']:
                if name in name_to_id:
                    evolves_to_ids.append(name_to_id[name])
                else:
                    print(f"警告: 找不到 '{name}' 的ID (在 {data['name']} 的进化目标中)")
            
            # 生成进化目标的注释
            evolves_to_comment = ", ".join(data['evolves_to']) if data['evolves_to'] else ""
            
            js_item = {
                'id': digimon_id,
                'name': data['name'],
                'level': data['level'],
                'image': f'getDigimonImagePath("{data["name"]}")',
                'evolvesTo': evolves_to_ids,
                'evolvesToComment': evolves_to_comment,
                'evolvesFrom': evolves_from_ids
            }
            
            js_data.append(js_item)
        
        return js_data
    
    def generate_js_code(self, js_data: List[Dict]) -> str:
        """生成JavaScript代码"""
        js_lines = []
        js_lines.append("// 数码宝贝数据 - 根据进化路线文本导入")
        js_lines.append("const digimonData = [")
        
        for i, item in enumerate(js_data):
            js_lines.append("    {")
            js_lines.append(f"        id: {item['id']},")
            js_lines.append(f"        name: \"{item['name']}\",")
            js_lines.append(f"        level: \"{item['level']}\",")
            js_lines.append(f"        image: {item['image']},")
            
            # 处理evolvesTo
            if item['evolvesTo']:
                evolves_to_str = "[" + ", ".join(map(str, item['evolvesTo'])) + "]"
                if item['evolvesToComment']:
                    js_lines.append(f"        evolvesTo: {evolves_to_str}, // {item['evolvesToComment']}")
                else:
                    js_lines.append(f"        evolvesTo: {evolves_to_str},")
            else:
                if item['evolvesToComment']:
                    js_lines.append(f"        evolvesTo: [], // {item['evolvesToComment']}")
                else:
                    js_lines.append("        evolvesTo: [],")
            
            # 处理evolvesFrom
            if item['evolvesFrom']:
                evolves_from_str = "[" + ", ".join(map(str, item['evolvesFrom'])) + "]"
                js_lines.append(f"        evolvesFrom: {evolves_from_str}")
            else:
                js_lines.append("        evolvesFrom: []")
            
            if i < len(js_data) - 1:
                js_lines.append("    },")
            else:
                js_lines.append("    }")
        
        js_lines.append("];")
        js_lines.append("")
        js_lines.append("// 创建数码宝贝索引映射")
        js_lines.append("const digimonMap = new Map();")
        js_lines.append("digimonData.forEach(digimon => {")
        js_lines.append("    digimonMap.set(digimon.id, digimon);")
        js_lines.append("});")
        js_lines.append("")
        js_lines.append("// 导出数据供其他文件使用")
        js_lines.append("if (typeof module !== 'undefined' && module.exports) {")
        js_lines.append("    module.exports = { digimonData, digimonMap };")
        js_lines.append("}")
        
        return "\n".join(js_lines)
    
    def generate_statistics(self, js_data: List[Dict]) -> Dict:
        """生成统计信息"""
        stats = {
            'total_count': len(js_data),
            'by_level': {},
            'missing_evolutions': [],
            'orphaned_digimon': []
        }
        
        # 按等级统计
        for item in js_data:
            level = item['level']
            if level not in stats['by_level']:
                stats['by_level'][level] = 0
            stats['by_level'][level] += 1
        
        # 找出缺失进化关系的数码宝贝
        for item in js_data:
            if not item['evolvesTo'] and item['evolvesToComment']:
                stats['missing_evolutions'].append({
                    'id': item['id'],
                    'name': item['name'],
                    'missing_targets': item['evolvesToComment']
                })
        
        # 找出孤立的数码宝贝（没有退化来源且不是幼年期Ⅰ）
        for item in js_data:
            if not item['evolvesFrom'] and item['level'] != '幼年期Ⅰ':
                stats['orphaned_digimon'].append({
                    'id': item['id'],
                    'name': item['name'],
                    'level': item['level']
                })
        
        return stats
    
    def save_results(self, output_js_file: str, output_stats_file: str):
        """保存解析结果"""
        # 解析数据
        print("正在解析进化路线数据...")
        self.parse_file()
        
        # 转换为JS格式
        print("正在转换为JavaScript格式...")
        js_data = self.convert_to_js_format()
        
        # 生成JavaScript代码
        print("正在生成JavaScript代码...")
        js_code = self.generate_js_code(js_data)
        
        # 生成统计信息
        print("正在生成统计信息...")
        stats = self.generate_statistics(js_data)
        
        # 保存JavaScript文件
        with open(output_js_file, 'w', encoding='utf-8') as f:
            f.write(js_code)
        
        # 保存统计文件
        with open(output_stats_file, 'w', encoding='utf-8') as f:
            json.dump(stats, f, ensure_ascii=False, indent=2)
        
        print(f"JavaScript数据已保存到: {output_js_file}")
        print(f"统计信息已保存到: {output_stats_file}")
        
        # 打印简要统计
        print(f"\n=== 解析统计 ===")
        print(f"总数码宝贝数量: {stats['total_count']}")
        print(f"按等级分布:")
        for level, count in sorted(stats['by_level'].items()):
            print(f"  {level}: {count}只")
        
        if stats['missing_evolutions']:
            print(f"\n缺失进化目标的数码宝贝: {len(stats['missing_evolutions'])}只")
            for item in stats['missing_evolutions'][:5]:  # 只显示前5个
                print(f"  {item['name']} (ID:{item['id']}) -> {item['missing_targets']}")
            if len(stats['missing_evolutions']) > 5:
                print(f"  ... 还有 {len(stats['missing_evolutions']) - 5} 只")
        
        if stats['orphaned_digimon']:
            print(f"\n孤立的数码宝贝 (非幼年期Ⅰ但无退化来源): {len(stats['orphaned_digimon'])}只")
            for item in stats['orphaned_digimon'][:5]:  # 只显示前5个
                print(f"  {item['name']} (ID:{item['id']}, {item['level']})")
            if len(stats['orphaned_digimon']) > 5:
                print(f"  ... 还有 {len(stats['orphaned_digimon']) - 5} 只")


def main():
    """主函数"""
    import os
    
    # 设置文件路径
    script_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(script_dir)
    
    input_file = os.path.join(script_dir, "进化路线.txt")
    output_js_file = os.path.join(script_dir, "generated_digimon_data.js")
    output_stats_file = os.path.join(script_dir, "parsing_statistics.json")
    
    if not os.path.exists(input_file):
        print(f"错误: 找不到输入文件 {input_file}")
        return
    
    # 创建解析器并运行
    parser = DigimonEvolutionParser(input_file)
    parser.save_results(output_js_file, output_stats_file)


if __name__ == "__main__":
    main()