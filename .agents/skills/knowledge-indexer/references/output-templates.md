# 三级文件输出模板

生成文件时严格按以下模板输出，不可增减 frontmatter 字段，不可更改字段名。

## Level 1 - domain.md

每个 domain 目录下有且仅有一个 `domain.md`。

```markdown
---
type: domain
name: "{domain_name}"
description: "{domain_description}"
created: {YYYY-MM-DD}
updated: {YYYY-MM-DD}
indexes:
  - "{domain_slug}/index.md"
---

# {domain_name}

{domain_description}

## 领域概览

- **创建日期**: {YYYY-MM-DD}
- **文档数量**: {doc_count}
- **索引文件**: [index.md](index.md)
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | string | 是 | 固定值 `domain` |
| name | string | 是 | 领域名称，如 "Wellness" |
| description | string | 是 | 领域描述，1-2 句话概括 |
| created | date | 是 | 创建日期，格式 YYYY-MM-DD |
| updated | date | 是 | 最后更新日期 |
| indexes | list | 是 | 关联的索引文件路径列表 |

---

## Level 2 - index.md

每个 domain 目录下有且仅有一个 `index.md`，包含该领域所有文档的索引条目。

```markdown
---
type: index
domain: "{domain_name}"
access_level: {access_level}
doc_count: {number}
created: {YYYY-MM-DD}
updated: {YYYY-MM-DD}
---

# {domain_name} 知识索引

> 该索引文件记录了 {domain_name} 领域下所有知识库文档的元数据和业务标注。

## 文档目录

### {filename}

| 属性 | 值 |
|------|-----|
| **权限** | {access_level} |
| **部门** | {department} |
| **科室** | {section} |
| **发起人** | {creator} |
| **入库日期** | {YYYY-MM-DD} |

**文档用途**

{annotation_purpose}

**关键内容关联词汇**

{annotation_keywords}

**适用场景**

{annotation_scenarios}

**适用人群**

{annotation_audience}

---
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | string | 是 | 固定值 `index` |
| domain | string | 是 | 所属领域名称 |
| access_level | string | 是 | 索引级别权限: public / internal / confidential |
| doc_count | number | 是 | 索引中的文档数量 |
| created | date | 是 | 索引创建日期 |
| updated | date | 是 | 最后更新日期 |

### 文档条目格式规范

每条文档索引由以下部分组成：

1. **三级标题**: 文件名（如 `### product-guide.md`）
2. **元数据表格**: 权限、部门、科室、发起人、入库日期
3. **四项业务标注**: 每项标注单独一段，使用加粗标题

**多文档时**：每个文档条目之间用 `---` 水平线分隔。

### 追加新条目规则

在 `## 文档目录` 下现有条目的末尾（最后一个 `---` 之后）追加新条目，同时更新 frontmatter 中的 `doc_count` 和 `updated`。

---

## Level 3 - docs/{filename}.md

知识库文档保留原始内容，在头部添加 frontmatter 元数据。

```markdown
---
type: knowledge_document
filename: "{filename}"
domain: "{domain_name}"
access_level: {access_level}
department: "{department}"
section: "{section}"
creator: "{creator}"
created: {YYYY-MM-DD}
source: "{original_file_path}"
---

{原始文档内容，保持原样不做任何修改}
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | string | 是 | 固定值 `knowledge_document` |
| filename | string | 是 | 文件名（不含路径） |
| domain | string | 是 | 所属领域名称 |
| access_level | string | 是 | 权限级别 |
| department | string | 是 | 所属部门全称 |
| section | string | 是 | 所属科室代码 |
| creator | string | 是 | 知识发起人 |
| created | date | 是 | 入库日期 |
| source | string | 是 | 源文件的原始路径 |

### 内容规则

- 原始文档内容 **不做任何修改**，原样保留
- frontmatter 与正文之间有一个空行
- 如果原始文档已有 frontmatter，将原有 frontmatter 字段合并到新 frontmatter 中（新字段优先）
