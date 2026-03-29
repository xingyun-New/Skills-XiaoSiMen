"""
PDF 文件读取工具
用于读取语文学习资料并提取文本内容
"""

import subprocess
import sys

def install_pdf_library():
    """安装 PDF 读取库"""
    try:
        import pdfplumber
        print("[OK] pdfplumber 已安装")
        return True
    except ImportError:
        print("[INFO] 正在安装 pdfplumber...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pdfplumber", "-q"])
        print("[OK] pdfplumber 安装完成")
        return True

def read_pdf_file(pdf_path):
    """读取 PDF 文件并返回文本内容"""
    try:
        import pdfplumber
    except ImportError:
        install_pdf_library()
        import pdfplumber
    
    full_text = []
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            print(f"\n[FILE] 文件：{pdf_path}")
            print(f"[INFO] 共 {len(pdf.pages)} 页\n")
            
            for i, page in enumerate(pdf.pages, 1):
                text = page.extract_text()
                if text:
                    full_text.append(f"--- 第 {i} 页 ---\n{text}")
                    print(f"[OK] 已读取第 {i} 页")
        
        return "\n\n".join(full_text)
    
    except Exception as e:
        return f"[ERROR] 读取失败：{str(e)}"

def main():
    """主函数：读取所有 PDF 文件"""
    import os
    from pathlib import Path
    
    # 当前目录
    current_dir = Path(__file__).parent
    
    # 查找所有 PDF 文件
    pdf_files = list(current_dir.glob("*.pdf"))
    
    if not pdf_files:
        print("[ERROR] 未找到 PDF 文件")
        return
    
    print(f"[INFO] 找到 {len(pdf_files)} 个 PDF 文件\n")
    
    # 读取每个 PDF
    results = {}
    for pdf_file in pdf_files:
        print("=" * 60)
        content = read_pdf_file(str(pdf_file))
        results[pdf_file.name] = content
        
        # 保存为 txt 文件
        txt_file = pdf_file.with_suffix('.txt')
        with open(txt_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"\n[SAVE] 已保存到：{txt_file.name}\n")
    
    # 显示摘要
    print("\n" + "=" * 60)
    print("[SUMMARY] 文件读取摘要")
    print("=" * 60)
    for filename, content in results.items():
        char_count = len(content)
        print(f"\n{filename}:")
        print(f"  字符数：{char_count:,}")
        preview = content[:200].replace('\n', ' ')
        print(f"  前 200 字预览：{preview}...")
    
    print("\n[DONE] 所有 PDF 文件已读取完成！")
    print("[TIP] 提示：可以查看生成的 .txt 文件获取完整内容")

if __name__ == "__main__":
    main()
