---
name: knowledge-indexer
description: 从 Markdown 文档中提取业务领域信息，通过交互式流程生成三级索引体系（Domain -> Index -> Document）。支持用户提供元数据、AI 自动生成业务标注、用户确认后写入。Use when user asks to index documents, create knowledge base, generate domain indexes, or organize business documents into a structured knowledge hierarchy.
---

# Knowledge Indexer

从 Markdown 文档中提取业务领域信息，生成三级索引体系（Domain -> Index -> Document），输出为带 YAML frontmatter 的 Markdown 文件。

## 三级架构

| 层级 | 文件 | 内容 | 谁负责 |
|------|------|------|--------|
| 第一级 Domain | `domain.md` | 领域名称、描述、关联索引列表 | 用户定义 |
| 第二级 Index | `index.md` | 权限分级、知识库元数据、业务标注 | 用户填元数据 + AI 生成标注 |
| 第三级 Document | `docs/*.md` | 元数据 frontmatter + 原始文档内容 | 用户上传 |

## 触发方式

| 触发方式 | 示例 |
|---------|------|
| 索引文档 | "帮我索引这个文档到 Wellness 领域" |
| 新建领域 | "新建一个业务领域 domain" |
| 添加文档 | "把 xxx.md 添加到知识库" |
| 生成索引 | "生成知识库索引" |
| 初始化配置 | "初始化知识管理配置" |
| 批量索引 | "把这个目录下的文档都索引到 XX 领域" |

## 输出文件结构

```
knowledge-base/
├── config.yaml                   # 组织结构配置
├── {domain-name}/                # 按 domain 组织
│   ├── domain.md                 # Level 1
│   ├── index.md                  # Level 2
│   └── docs/                     # Level 3
│       ├── doc-001.md
│       └── doc-002.md
```

## 工作流

### Step 1: 检查配置

读取项目根目录下的 `knowledge-base/config.yaml`。

- **存在**: 加载部门、科室、权限级别等配置，进入 Step 2
- **不存在**: 按 [init-config.md](scripts/init-config.md) 引导用户创建，创建完毕后进入 Step 2

### Step 2: 收集用户元数据

通过对话逐项收集以下信息（使用 AskQuestion 工具或对话方式）：

```yaml
domain: "目标领域名称"        # 选择已有 domain 或新建
source_file: "源文档路径"      # 用户指定的 Markdown 文件路径
access_level: internal         # 从 config 中选取: public / internal / confidential
department: "部门名称"         # 从 config 中选取
section: "科室代码"            # 从 config 中选取
creator: "知识发起人"          # 用户输入
```

**收集规则：**
- `department` 和 `section` 必须从 `config.yaml` 中定义的选项选取，不接受自由输入
- `access_level` 必须从 `config.yaml` 的 `access_levels` 列表中选取
- `domain` 如果是新建，需同时收集领域描述
- 如果用户一次性提供了所有信息，跳过逐项询问

### Step 3: AI 分析文档

读取用户指定的源 Markdown 文档，按照 [annotation-guide.md](references/annotation-guide.md) 中的规则生成业务标注：

| 标注字段 | 生成规则 |
|---------|---------|
| 文档用途和注释 | 概括文档的核心目的和应用方向（2-3 句话） |
| 关键内容关联词汇 | 提取文档中 5-15 个核心术语，每个标注出处段落 |
| 适用场景 | 推断 2-5 个该文档适用的业务场景 |
| 适用人群 | 推断该文档面向的目标角色/岗位 |

**关键要求：** 每个关联词汇必须能在源文档中找到出处，不可凭空生成。

### Step 4: 用户确认

将 Step 2 的元数据和 Step 3 的 AI 标注合并展示：

```
=== 文档索引预览 ===

【元数据】
- 领域: Wellness
- 文件: product-guide.md
- 权限: internal
- 部门: Mass Market Sales Department I
- 科室: MAS12
- 发起人: 张三

【AI 业务标注】
- 用途: 该文档用于指导区域销售团队了解健康产品线...
- 关键词汇: 健康管理(第2段), 产品培训(第5段), 销售话术(第8段)
- 适用场景: 新员工入职培训, 季度产品更新
- 适用人群: 一线销售人员, 区域经理

请确认以上信息是否准确，或告知需要修改的内容。
```

- 用户确认 → 进入 Step 5
- 用户要求修改 → 修改对应字段后重新展示，再次确认

### Step 5: 生成文件

按 [output-templates.md](references/output-templates.md) 中的模板生成文件。

**执行顺序：**

1. **检查 Domain 目录**
   - 目录不存在 → 创建 `knowledge-base/{domain}/` 目录及 `domain.md`、`index.md`、`docs/`
   - 目录已存在 → 跳过

2. **写入知识库文档** (Level 3)
   - 将源文档内容加上 frontmatter 写入 `knowledge-base/{domain}/docs/{filename}.md`

3. **更新索引文件** (Level 2)
   - 在 `index.md` 的文档目录中追加新条目（包含元数据和 AI 标注）

4. **更新 Domain 文件** (Level 1)
   - 如果是新 Domain，写入 `domain.md`
   - 如果 Domain 已存在，检查是否需要更新索引列表

**写入前必须完整展示最终文件内容给用户确认。**

5. **输出摘要**

```
✅ 文档索引完成

已生成/更新：
- knowledge-base/wellness/domain.md（领域定义）
- knowledge-base/wellness/index.md（索引更新，新增 1 条）
- knowledge-base/wellness/docs/product-guide.md（知识库文档）

当前 Wellness 领域共 3 份文档。
```

## 准确性保障

遵循 [validation-rules.md](references/validation-rules.md) 中的校验规则：

1. **交互式确认**: 所有 AI 标注展示给用户审核后才写入
2. **关键词回溯**: 关联词汇标注源文档出处位置
3. **模板约束**: 固定输出格式，防止信息遗漏
4. **配置校验**: 部门/科室从 config.yaml 选取，不接受自由输入
5. **重复检测**: 新增前检查 index.md 是否已有同名条目
6. **生成后展示**: 文件内容写入前完整展示

## 批量模式

用户指定目录时，对目录下每个 `.md` 文件执行 Step 2-5 流程：
- 共用同一组元数据（domain、department、section、creator、access_level）
- 每个文件单独生成 AI 标注
- 批量展示所有标注供用户统一确认
- 确认后一次性写入所有文件

## 参考资料

| 文件 | 内容 |
|------|------|
| [output-templates.md](references/output-templates.md) | 三级文件的 Markdown 模板 |
| [annotation-guide.md](references/annotation-guide.md) | AI 业务标注生成规则与示例 |
| [validation-rules.md](references/validation-rules.md) | 准确性校验与重复检测规则 |
| [init-config.md](scripts/init-config.md) | 初始化配置文件流程指引 |
