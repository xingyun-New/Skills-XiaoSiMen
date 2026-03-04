# 英语题型模板与示例

所有题型的标准格式、命题要求和完整示例。

## 一、词汇辨析（choice）

### 格式要求
- 4个选项（A/B/C/D），有且仅有1个正确答案
- 题干为含空格的完整英文句子，提供真实语境
- 考查内容：近义词辨析、词性选择、固定搭配、词义理解
- 知识点卡片用中文解析

### 示例

```json
{
  "id": 1,
  "type": "choice",
  "difficulty": 2,
  "question": "My mother asked me to ______ the table for dinner.",
  "options": ["lay", "lie", "put", "place"],
  "answer": 0,
  "hints": [
    "💡 方向提示：本题考查近义词辨析，关注固定搭配",
    "📖 关键知识：lay the table 是固定搭配，意为「摆放餐具/布置餐桌」",
    "🎯 解题思路：lay the table 是习惯表达，其他选项不与 table 构成此搭配"
  ],
  "knowledgeCard": {
    "topic": "lay vs. lie 辨析及固定搭配",
    "source": "外研版八年级上册 Module 3",
    "keyMemory": "lay the table = set the table（摆桌子）；lay-laid-laid（放置，及物）；lie-lay-lain（躺，不及物）",
    "commonMistake": "lay 和 lie 是中考高频混淆词：lay 是及物动词（后接宾语），lie 是不及物动词（不接宾语）",
    "relatedTopics": "易混动词辨析：lay/lie, rise/raise, sit/seat"
  }
}
```

## 二、语法选择（choice）

### 格式要求
- 4个选项，考查单一语法点
- 题干语境自然，避免刻意生造
- 覆盖：时态、语态、从句、非谓语、情态动词、冠词、介词、代词等
- 干扰项基于学生常见错误设计

### 示例——时态

```json
{
  "id": 2,
  "type": "choice",
  "difficulty": 2,
  "question": "— Have you ever ______ to the Great Wall?\n— Yes, I ______ there last summer.",
  "options": [
    "been; went",
    "gone; went",
    "been; have been",
    "gone; have gone"
  ],
  "answer": 0,
  "hints": [
    "💡 方向提示：本题考查现在完成时 have been to 与 have gone to 的区别",
    "📖 关键知识：have been to 表示去过（已回来），have gone to 表示去了（未回来）；答语中 last summer 是过去时标志词",
    "🎯 解题思路：第一空用 been（人已回来才能对话），第二空用 went（last summer 是一般过去时标志）"
  ],
  "knowledgeCard": {
    "topic": "have been to vs. have gone to",
    "source": "外研版八年级下册 Module 6",
    "keyMemory": "been to = 去过（已回来）；gone to = 去了（人不在这里）；been in = 待在某地多久",
    "commonMistake": "第二空容易误选 have been，但 last summer 是明确的过去时间，必须用一般过去时",
    "relatedTopics": "现在完成时的标志词：ever, never, yet, already, just, since, for"
  }
}
```

### 示例——定语从句

```json
{
  "id": 3,
  "type": "choice",
  "difficulty": 3,
  "question": "The boy ______ father is a doctor studies very hard.",
  "options": ["who", "whom", "whose", "which"],
  "answer": 2,
  "hints": [
    "💡 方向提示：本题考查定语从句的关系代词选择",
    "📖 关键知识：空后是名词 father，需要用表示所属关系的 whose",
    "🎯 解题思路：whose father = his father，whose 在从句中作定语修饰 father"
  ],
  "knowledgeCard": {
    "topic": "定语从句——关系代词 whose",
    "source": "外研版九年级上册 Module 5",
    "keyMemory": "whose + 名词 = 某人的...；who 作主语/宾语，whom 作宾语，whose 作定语，which/that 指物",
    "commonMistake": "看到空后紧跟名词（father），应首先想到 whose；who 后面通常接动词",
    "relatedTopics": "定语从句关系代词选择：that/which/who/whom/whose"
  }
}
```

## 三、完形填空（material）

### 格式要求
- 一篇 150-250 词的英文短文
- 设 8-10 个空（编号标注在文中）
- 每空 4 个选项
- 短文题材贴近初中生生活
- 使用 material 类型，每空作为一个 subQuestion

### JSON 格式

```json
{
  "id": 4,
  "type": "material",
  "difficulty": 2,
  "material": "Tom is a 14-year-old boy. He loves playing basketball very much. Every day after school, he __<b>(1)</b>__ to the playground with his friends. Last week, they had a basketball __<b>(2)</b>__ against Class Two. Tom was very __<b>(3)</b>__ because he wanted to win.\n\nDuring the game, Tom played really __<b>(4)</b>__. He scored 20 points! But in the last minute, he __<b>(5)</b>__ and hurt his leg. His teammates were worried about him. The doctor said he needed to __<b>(6)</b>__ for two weeks.\n\nTom felt sad because he couldn't play basketball. His friends came to __<b>(7)</b>__ him every day. They told him funny stories and helped him with homework. Tom was moved by their __<b>(8)</b>__. He understood that friendship is more important than winning games.",
  "materialLabel": "完形填空 (8 blanks)",
  "subQuestions": [
    {
      "id": 1,
      "question": "(1)",
      "points": 1,
      "answer": "A. goes    B. went    C. go    D. going\n\n正确答案：A\n解析：Every day 是一般现在时标志，主语 he 用三单 goes。",
      "scoring": ["选A得1分"]
    },
    {
      "id": 2,
      "question": "(2)",
      "points": 1,
      "answer": "A. class    B. game    C. party    D. meeting\n\n正确答案：B\n解析：basketball game（篮球比赛）是固定搭配，against Class Two 表示对阵。",
      "scoring": ["选B得1分"]
    },
    {
      "id": 3,
      "question": "(3)",
      "points": 1,
      "answer": "A. tired    B. bored    C. excited    D. relaxed\n\n正确答案：C\n解析：因为想赢，所以是兴奋/激动的（excited），不是累的或无聊的。",
      "scoring": ["选C得1分"]
    },
    {
      "id": 4,
      "question": "(4)",
      "points": 1,
      "answer": "A. good    B. well    C. bad    D. badly\n\n正确答案：B\n解析：修饰动词 played 用副词 well，不用形容词 good。",
      "scoring": ["选B得1分"]
    },
    {
      "id": 5,
      "question": "(5)",
      "points": 1,
      "answer": "A. fell down    B. sat down    C. turned around    D. looked up\n\n正确答案：A\n解析：and hurt his leg 说明受伤了，fell down（摔倒）符合语境。",
      "scoring": ["选A得1分"]
    },
    {
      "id": 6,
      "question": "(6)",
      "points": 1,
      "answer": "A. play    B. run    C. rest    D. study\n\n正确答案：C\n解析：受伤后医生建议休息（rest）两周。",
      "scoring": ["选C得1分"]
    },
    {
      "id": 7,
      "question": "(7)",
      "points": 1,
      "answer": "A. teach    B. visit    C. call    D. find\n\n正确答案：B\n解析：朋友们每天来看望（visit）他。",
      "scoring": ["选B得1分"]
    },
    {
      "id": 8,
      "question": "(8)",
      "points": 1,
      "answer": "A. talent    B. courage    C. kindness    D. humor\n\n正确答案：C\n解析：朋友们来看望、讲故事、帮忙做作业——这些都是善意（kindness），与文末友谊主题呼应。",
      "scoring": ["选C得1分"]
    }
  ],
  "hints": [
    "💡 方向提示：这是一篇关于篮球和友谊的完形填空，注意上下文语境",
    "📖 关键知识：注意时态（every day用一般现在时，last week用过去时）和词性（修饰动词用副词）",
    "🎯 解题思路：先通读全文理解大意，再逐空根据语法和语境选择"
  ],
  "knowledgeCard": {
    "topic": "完形填空综合训练",
    "source": "八年级英语综合",
    "keyMemory": "完形填空三遍法：①通读大意 ②逐空推敲 ③回读验证",
    "commonMistake": "第4空 good/well 是高频考点：good是形容词修饰名词，well是副词修饰动词",
    "relatedTopics": "时态判断、形容词副词辨析、动词短语",
    "answerTechnique": "完形填空答题技巧：①先看首尾句抓主题 ②利用上下文线索 ③注意复现词和同义词 ④语法与语义双重验证"
  }
}
```

## 四、阅读理解（material）

### 格式要求
- 一篇 200-350 词的英文短文
- 设 3-5 个选择题，覆盖主旨、细节、推理、词义猜测
- 题材多样：记叙文、说明文、应用文
- 使用 material 类型，选择题作为 subQuestion

### 示例

```json
{
  "id": 5,
  "type": "material",
  "difficulty": 2,
  "material": "<b>School Library Notice</b>\n\nDear students,\n\nOur school library will be updated during the winter holiday. Here are some important changes:\n\n<b>New Opening Hours</b> (Starting from March 1)\n• Monday to Friday: 8:00 a.m. — 6:00 p.m.\n• Saturday: 9:00 a.m. — 4:00 p.m.\n• Sunday: Closed\n\n<b>New Rules</b>\n• Each student can borrow up to 5 books at a time (it was 3 before).\n• The borrowing period is extended to 21 days (it was 14 days before).\n• E-books are now available on the library website.\n• Please return all books borrowed before the holiday by February 28.\n\n<b>New Sections</b>\n• A reading corner with comfortable sofas has been added on the 2nd floor.\n• A group study room (Room 201) is now open for booking.\n\nFor more information, please visit our website: www.schoollib.cn\n\nSchool Library\nFebruary 20, 2026",
  "materialLabel": "阅读理解 — 应用文（通知）",
  "subQuestions": [
    {
      "id": 1,
      "question": "How many books can each student borrow at a time after the update?",
      "points": 2,
      "answer": "A. 3    B. 4    C. 5    D. 7\n\n正确答案：C\n解析：原文明确写 \"Each student can borrow up to 5 books at a time\"。",
      "scoring": ["选C得2分"]
    },
    {
      "id": 2,
      "question": "When should students return the books borrowed before the holiday?",
      "points": 2,
      "answer": "A. By February 20    B. By February 28    C. By March 1    D. By March 21\n\n正确答案：B\n解析：原文 \"Please return all books borrowed before the holiday by February 28\"。",
      "scoring": ["选B得2分"]
    },
    {
      "id": 3,
      "question": "What can students do in Room 201?",
      "points": 2,
      "answer": "A. Borrow e-books    B. Read quietly alone    C. Study with a group    D. Return books\n\n正确答案：C\n解析：原文 \"A group study room (Room 201) is now open for booking\"，group study room 是小组学习室。",
      "scoring": ["选C得2分"]
    },
    {
      "id": 4,
      "question": "Which of the following is TRUE according to the notice?",
      "points": 2,
      "answer": "A. The library is open 7 days a week.\nB. Students can now keep books for 3 weeks.\nC. The reading corner is on the 1st floor.\nD. The new opening hours start from February 28.\n\n正确答案：B\n解析：21 days = 3 weeks；A错（Sunday closed）；C错（2nd floor）；D错（March 1）。",
      "scoring": ["选B得2分"]
    }
  ],
  "hints": [
    "💡 方向提示：这是一篇应用文（学校图书馆通知），注意抓取关键数字和日期",
    "📖 关键知识：应用文阅读重点关注时间、数量、规则的变化",
    "🎯 解题思路：先看题目再回原文定位，注意 before/after 的对比信息"
  ],
  "knowledgeCard": {
    "topic": "阅读理解——应用文",
    "source": "中考英语阅读理解",
    "keyMemory": "应用文阅读策略：先扫标题/小标题了解结构，再带着问题回原文找答案",
    "commonMistake": "容易混淆更新前后的数字（3 books → 5 books, 14 days → 21 days），审题时注意 before/after",
    "relatedTopics": "阅读理解四大题型：主旨大意、细节理解、推理判断、词义猜测",
    "answerTechnique": "应用文答题技巧：①标注关键数字和日期 ②对比新旧信息 ③逐选项回原文验证"
  }
}
```

## 五、句型转换 / 补全句子（fillblank）

### 格式要求
- 给出原句和改写要求，学生填写关键词
- 类型包括：同义句转换、按要求改写、首字母填空、汉语提示完成句子
- 多空用中文分号「；」分隔答案

### 示例——同义句转换

```json
{
  "id": 6,
  "type": "fillblank",
  "difficulty": 2,
  "question": "同义句转换：\nHe is too young to go to school.\n= He is not ______ ______ to go to school.",
  "answer": ["old enough"],
  "hints": [
    "💡 方向提示：本题考查 too...to... 与 not...enough to... 的同义转换",
    "📖 关键知识：too + adj. + to do = not + 反义adj. + enough + to do",
    "🎯 解题思路：young的反义词是old，too young to = not old enough to"
  ],
  "knowledgeCard": {
    "topic": "too...to... 与 enough 的同义转换",
    "source": "外研版八年级英语语法",
    "keyMemory": "too...to = not...enough to = so...that...can't（三种同义转换）",
    "commonMistake": "enough 放在形容词后面（old enough），不是前面（enough old 是错的）",
    "relatedTopics": "so...that 句型、adj. + enough + to do 结构"
  }
}
```

### 示例——首字母填空

```json
{
  "id": 7,
  "type": "fillblank",
  "difficulty": 2,
  "question": "根据首字母提示完成句子：\nWe should p______ the environment and stop polluting the rivers.",
  "answer": ["protect"],
  "hints": [
    "💡 方向提示：本题考查环保话题词汇，首字母为 p",
    "📖 关键知识：protect the environment（保护环境）是常见搭配",
    "🎯 解题思路：should 后接动词原形，p开头且与 environment 搭配的是 protect"
  ],
  "knowledgeCard": {
    "topic": "环保话题核心词汇",
    "source": "外研版八年级下册 Module 9",
    "keyMemory": "protect the environment / reduce pollution / recycle waste / save energy",
    "commonMistake": "注意拼写：protect（不是 pretect），environment（不是 enviroment）",
    "relatedTopics": "环保话题写作词汇、should 的用法"
  }
}
```

### 示例——汉语提示完成句子（多空）

```json
{
  "id": 8,
  "type": "fillblank",
  "difficulty": 2,
  "question": "根据汉语意思完成句子：\n她过去常常步行上学。\nShe ______ ______ walk to school.",
  "answer": ["used to"],
  "hints": [
    "💡 方向提示：本题考查「过去常常做某事」的表达",
    "📖 关键知识：used to do sth. = 过去常常做某事",
    "🎯 解题思路：「过去常常」= used to，后接动词原形 walk"
  ],
  "knowledgeCard": {
    "topic": "used to do vs. be used to doing",
    "source": "外研版九年级上册 Module 5",
    "keyMemory": "used to do = 过去常常（现在不了）；be used to doing = 习惯于做某事（现在的状态）",
    "commonMistake": "used to 后接动词原形，be used to 后接动名词，两者含义完全不同",
    "relatedTopics": "be used to do = 被用来做某事（被动语态）"
  }
}
```

## 六、情景对话（choice）

### 格式要求
- 模拟真实交际场景
- 给出对话语境和空缺，选择最恰当的应答
- 注意中西方文化差异

### 示例

```json
{
  "id": 9,
  "type": "choice",
  "difficulty": 1,
  "question": "— Your English is very good!\n— ______",
  "options": [
    "No, no. My English is poor.",
    "Thank you.",
    "Yes, I think so.",
    "No, you are wrong."
  ],
  "answer": 1,
  "hints": [
    "💡 方向提示：本题考查日常交际用语——对赞美的回应",
    "📖 关键知识：西方文化中，收到赞美应大方感谢，用 Thank you 回应",
    "🎯 解题思路：中国人习惯谦虚否认（A），但英语中应该直接说 Thank you"
  ],
  "knowledgeCard": {
    "topic": "日常交际——赞美与回应",
    "source": "中考英语情景对话",
    "keyMemory": "收到赞美说 Thank you；收到帮助说 Thank you / That's very kind of you",
    "commonMistake": "中国学生常受中文思维影响选A（谦虚否认），但英语文化中应大方接受赞美",
    "relatedTopics": "道歉与回应、感谢与回应、建议与回应、邀请与回应"
  }
}
```

## 七、提示设计原则

| 级别 | 内容要求 | 扣分 |
|------|---------|------|
| 提示1（方向） | 指出考查的语法点/知识范围，不透露具体内容 | -30% |
| 提示2（知识） | 给出解题需要的核心语法规则/词汇知识 | -60% |
| 提示3（思路） | 给出排除法或推理过程，接近给出答案 | -90% |

## 八、命题质量自检清单

每组题目生成后，按此清单自检：

- [ ] 语法规则是否准确
- [ ] 英文句子是否自然地道（无 Chinglish）
- [ ] 选择题干扰项是否基于真实错误设计
- [ ] 正确答案分布是否均匀（A/B/C/D各约25%）
- [ ] 难度分布是否符合要求
- [ ] 每题是否都附有完整的知识点卡片和3级提示
- [ ] 知识点是否覆盖了不同语法点（避免重复）
- [ ] 完形填空的文章是否流畅、逻辑通顺
- [ ] 阅读理解的问题是否覆盖不同题型（主旨/细节/推理/词义）
- [ ] 填空题的答案是否唯一或已列明等价答案
- [ ] 知识点卡片中的中文解析是否清晰易懂
