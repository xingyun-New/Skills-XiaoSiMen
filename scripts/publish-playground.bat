@echo off
chcp 65001 >nul
echo ========================================
echo   练习题快速发布工具
echo ========================================
echo.

set /p filename="请输入 HTML 文件名 (例如：sqrt-abs-explorer.html): "
set /p title="请输入练习题标题 (例如：二次根式&绝对值探索器): "

echo.
echo [1/4] 复制 HTML 文件...
copy /Y "C:\Users\14108\.openclaw\workspace-dev\math-playgrounds\%filename%" "D:\0.py\Skills-XiaoSiMen\math-playgrounds\"
if errorlevel 1 (
    echo   ❌ 复制失败
    pause
    exit /b 1
)
echo   ✅ 复制完成

echo.
echo [2/4] 请手动更新 README.md
echo   添加以下内容到数学表格顶部：
echo.
echo   | %title% | Playground | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds/%filename%) |
echo.
pause

echo.
echo [3/4] Git 提交...
cd /d "D:\0.py\Skills-XiaoSiMen"
git add .
git commit -m "Add %title%"
git push origin main

echo.
echo [4/4] 发布完成！
echo.
echo ========================================
echo   🎉 在线访问链接：
echo   https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds/%filename%
echo ========================================
echo.

pause
