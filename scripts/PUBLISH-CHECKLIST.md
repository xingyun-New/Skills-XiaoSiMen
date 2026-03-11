# 📤 练习题发布检查清单

**每次生成练习题后，必须完成以下步骤！**

---

## ✅ 快速发布流程

### 方式 1: 使用发布脚本（推荐）⚡

```bash
# 运行发布脚本
cd C:\Users\14108\.openclaw\workspace-dev
.\scripts\publish-playground.bat
```

脚本会自动：
1. ✅ 复制 HTML 到目标目录
2. ⚠️  提醒更新 README（需手动）
3. ✅ Git commit & push
4. ✅ 显示在线链接

---

### 方式 2: 手动执行 📝

#### 步骤 1: 复制 HTML
```powershell
Copy-Item "C:\Users\14108\.openclaw\workspace-dev\math-playgrounds\[文件名].html" `
  -Destination "D:\0.py\Skills-XiaoSiMen\math-playgrounds\" -Force
```

#### 步骤 2: 更新 README.md
在数学表格**顶部**添加：
```markdown
| [练习题名称] | Playground | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds/[文件名].html) |
```

#### 步骤 3: Git 提交
```powershell
cd D:\0.py\Skills-XiaoSiMen
git add .
git commit -m "Add [练习题名称]"
git push origin main
```

#### 步骤 4: 分享链接
```
https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds/[文件名].html
```

---

## 📋 发布检查清单

发布前逐项确认：

- [ ] HTML 文件已复制到 `D:\0.py\Skills-XiaoSiMen\math-playgrounds\`
- [ ] README.md 已更新（添加到表格**顶部**）
- [ ] Git commit 成功
- [ ] Git push 成功
- [ ] 在线链接可以访问
- [ ] 已将链接分享给用户

---

## 🚨 常见错误

### ❌ 忘记更新 README
**症状**: GitHub Pages 页面看不到新练习  
**解决**: 手动编辑 README.md，添加新条目到表格顶部

### ❌ Git push 失败
**症状**: 提示需要认证  
**解决**: 配置 Git 凭证或使用 SSH

### ❌ 链接 404
**症状**: 在线链接打不开  
**解决**: 等待 1-2 分钟（GitHub Pages 缓存），或检查文件名是否正确

---

## 💡 最佳实践

1. **立即发布**: 生成练习题后立刻发布，不要拖延
2. **检查链接**: 发布后亲自打开链接确认
3. **备份本地**: 保留源文件在 workspace-dev
4. **版本管理**: 重大更新时使用语义化版本号

---

## 📞 需要帮助？

如果发布过程遇到问题：
1. 检查 AGENTS.md 中的详细流程
2. 查看 `.learnings/LEARNINGS.md` 中的错误记录
3. 联系用户反馈问题

---

*最后更新：2026-03-11*  
*相关文件：AGENTS.md, scripts/publish-playground.bat*
