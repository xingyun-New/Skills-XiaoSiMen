# 练习题发布脚本
# 用法：.\publish-playground.ps1 -FileName "sqrt-abs-explorer.html" -Title "二次根式&绝对值探索器"

param(
    [Parameter(Mandatory=$true)]
    [string]$FileName,
    
    [Parameter(Mandatory=$true)]
    [string]$Title,
    
    [string]$SourcePath = "C:\Users\14108\.openclaw\workspace-dev\math-playgrounds",
    [string]$DestPath = "D:\0.py\Skills-XiaoSiMen\math-playgrounds",
    [string]$RepoPath = "D:\0.py\Skills-XiaoSiMen"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  练习题发布工具" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 步骤 1: 复制 HTML 文件
Write-Host "[1/4] 复制 HTML 文件..." -ForegroundColor Yellow
$sourceFile = Join-Path $SourcePath $FileName
$destFile = Join-Path $DestPath $FileName

if (Test-Path $sourceFile) {
    Copy-Item $sourceFile -Destination $destFile -Force
    Write-Host "  ✅ 已复制：$destFile" -ForegroundColor Green
} else {
    Write-Host "  ❌ 错误：源文件不存在 $sourceFile" -ForegroundColor Red
    exit 1
}

Write-Host ""

# 步骤 2: 更新 README.md
Write-Host "[2/4] 更新 README.md..." -ForegroundColor Yellow
$readmePath = Join-Path $RepoPath "README.md"
$onlineUrl = "https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds/$FileName"
$newLine = "| $Title | Playground | [开始练习]($onlineUrl) |"

Write-Host "  新条目：$newLine" -ForegroundColor Gray
Write-Host "  ⚠️  请手动将上述内容添加到 README.md 的数学表格顶部" -ForegroundColor Yellow
Write-Host "  按任意键继续..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host ""

# 步骤 3: Git 提交
Write-Host "[3/4] Git 提交..." -ForegroundColor Yellow
Set-Location $RepoPath

git add .
Write-Host "  ✅ git add 完成" -ForegroundColor Green

$commitMsg = "Add $Title"
git commit -m $commitMsg
Write-Host "  ✅ git commit: $commitMsg" -ForegroundColor Green

git push origin main
Write-Host "  ✅ git push 完成" -ForegroundColor Green

Write-Host ""

# 步骤 4: 显示在线链接
Write-Host "[4/4] 发布完成！" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  🎉 在线访问链接：" -ForegroundColor Cyan
Write-Host "  $onlineUrl" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 询问是否打开链接
$response = Read-Host "是否在浏览器中打开链接？(y/n)"
if ($response -eq "y" -or $response -eq "Y") {
    Start-Process $onlineUrl
    Write-Host "  ✅ 已在浏览器中打开" -ForegroundColor Green
}

Write-Host ""
Write-Host "发布流程完成！" -ForegroundColor Green
