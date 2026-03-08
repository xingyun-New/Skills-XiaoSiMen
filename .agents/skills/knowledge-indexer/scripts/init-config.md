# 初始化配置文件流程

当 `knowledge-base/config.yaml` 不存在时，按以下流程引导用户创建。

## 前置条件

确认项目根目录下没有 `knowledge-base/config.yaml` 文件。

## 初始化步骤

### Step 1: 创建目录

```
knowledge-base/
```

### Step 2: 收集组织结构信息

通过对话或 AskQuestion 工具逐项收集：

**2.1 部门信息**

向用户询问：
```
请提供需要纳入知识管理的部门信息。

每个部门需要：
- 部门全称（如 "Mass Market Sales Department I"）
- 部门代码（如 "MMS1"，用于简写标识）
- 下属科室列表（每个科室需要名称和代码）

请逐个输入，输入"完成"结束。
```

**2.2 权限级别**

默认提供三个级别，询问是否需要调整：
```
默认权限级别：
- public（公开）
- internal（内部）
- confidential（机密）

是否需要增加或修改权限级别？
```

**2.3 标注字段**

默认提供四个字段，询问是否需要调整：
```
默认业务标注字段：
- 文档用途和相关注释信息
- 关键内容关联词汇
- 适用场景
- 适用人群

是否需要增加、删除或修改标注字段？
```

**2.4 输出目录**

默认 `knowledge-base`，询问是否需要更改。

### Step 3: 生成 config.yaml

根据收集的信息，按以下模板生成配置文件：

```yaml
# Knowledge Indexer 配置文件
# 定义组织结构、权限级别和标注模板

organization:
  departments:
    - name: "{部门全称}"
      code: "{部门代码}"
      sections:
        - name: "{科室名称}"
          code: "{科室代码}"

access_levels:
  - public
  - internal
  - confidential

output_dir: "knowledge-base"

annotation_template:
  fields:
    - "文档用途和相关注释信息"
    - "关键内容关联词汇"
    - "适用场景"
    - "适用人群"
```

### Step 4: 展示并确认

将生成的 config.yaml 内容完整展示给用户：
```
以下是生成的配置文件内容：

---
（完整 YAML 内容）
---

请确认是否正确。确认后将写入 knowledge-base/config.yaml。
```

### Step 5: 写入文件

用户确认后，使用 Write 工具写入 `knowledge-base/config.yaml`。

## 后续修改

配置创建后，用户可随时要求修改：
- "添加一个新部门到知识库配置"
- "修改权限级别"
- "新增一个标注字段"

修改时读取现有 config.yaml，更新对应部分，展示差异后写入。
