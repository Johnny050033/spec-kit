# 🎭 Random Joke Generator

使用外部 API 生成隨機笑話的 Node.js 應用程序。

## ✨ 功能特色

- 🎯 **獲取隨機笑話** - 使用免費的 JokeAPI
- 📂 **笑話分類** - 支持編程、敲門笑話、一般笑話等多個分類
- 🔀 **笑話類型過濾** - 選擇單行或雙行笑話
- ⚙️ **錯誤處理** - 完善的異常捕獲和錯誤提示
- 📦 **模塊化設計** - 可作為模塊導入或直接運行
- 🚀 **易於使用** - 命令行工具和可編程 API

## 📋 前置要求

- Node.js 12.0 或更高版本
- npm（通常隨 Node.js 一起安裝）

## 🚀 快速開始

### 1. 安裝依賴

```bash
# 此項目沒有外部依賴
# 只需要標準的 Node.js 庫
```

### 2. 運行笑話生成器

```bash
# 獲取任意笑話
node joke-generator.js

# 獲取編程笑話
node joke-generator.js --programming

# 獲取敲門笑話
node joke-generator.js --knockknock

# 獲取單行笑話
node joke-generator.js --single

# 獲取雙行笑話
node joke-generator.js --twopart

# 組合使用選項
node joke-generator.js --programming --single
```

## 📖 使用示例

### 作為命令行工具

```bash
$ node joke-generator.js
🎭 Fetching a random joke...

Why do Java developers wear glasses?
Because they don't C#

✅ Joke generated successfully!
```

### 在代碼中作為模塊使用

```javascript
const { getRandomJoke, formatJoke } = require('./joke-generator');

// 獲取編程笑話
getRandomJoke({ category: 'Programming', type: 'single' })
  .then(joke => {
    console.log(formatJoke(joke));
  })
  .catch(err => {
    console.error('Error:', err.message);
  });
```

### 使用 async/await

```javascript
const { getRandomJoke, formatJoke } = require('./joke-generator');

async function displayJoke() {
  try {
    const joke = await getRandomJoke({ category: 'General' });
    console.log(formatJoke(joke));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

displayJoke();
```

## 🔧 API 文檔

### `getRandomJoke(options)`

獲取隨機笑話的異步函數。

**參數：**
- `options` (Object, 可選)
  - `type` (string): 笑話類型
    - `'single'` - 單行笑話
    - `'twopart'` - 雙行笑話（需要 setup 和 delivery）
    - `'any'` - 任意類型（默認）
  - `category` (string): 笑話分類
    - `'General'` - 一般笑話
    - `'Programming'` - 編程笑話
    - `'Knock-knock'` - 敲門笑話
    - `'any'` - 任意分類（默認）

**返回值：** Promise<Object> - 笑話對象

**範例：**
```javascript
const joke = await getRandomJoke({ 
  category: 'Programming', 
  type: 'single' 
});
```

### `formatJoke(joke)`

格式化笑話對象為可讀的字符串。

**參數：**
- `joke` (Object) - JokeAPI 返回的笑話對象

**返回值：** string - 格式化的笑話文本

**範例：**
```javascript
const formattedText = formatJoke(joke);
console.log(formattedText);
```

## 🌐 API 信息

本項目使用 **JokeAPI** - https://jokeapi.dev/

**特點：**
- ✅ 完全免費，無需 API 密鑰
- ✅ 支持多個笑話分類
- ✅ 返回 JSON 格式
- ✅ 無速率限制（對合理使用）

**可用分類：**
- General（一般笑話）
- Programming（編程笑話）
- Knock-knock（敲門笑話）
- Any（隨機）

## 📂 項目結構

```
spec-kit/
├── joke-generator.js    # 主程序文件
├── README.md           # 項目文檔
└── package.json        # (可選) Node.js 項目配置
```

## 🛠️ 開發

### 本地測試

```bash
# 運行基本測試
node joke-generator.js

# 運行多次以看不同的笑話
for i in {1..5}; do node joke-generator.js --programming; done
```

### 擴展功能

您可以擴展此項目：

1. **添加數據庫** - 保存您喜歡的笑話
2. **創建 Web UI** - 使用 Express.js 構建網頁界面
3. **批量操作** - 一次獲取多個笑話
4. **翻譯功能** - 翻譯笑話到其他語言
5. **評分系統** - 對笑話進行評分

## 🐛 故障排除

### 錯誤："Cannot find module 'https'"

確保您正在使用 Node.js 12.0 或更高版本。

```bash
node --version
```

### 錯誤："API Error: No jokes found"

這意味著沒有符合您的過濾條件的笑話。嘗試：

```bash
# 使用更廣泛的分類
node joke-generator.js --programming  # 改為 General
```

### 網絡連接超時

檢查您的互聯網連接或 JokeAPI 服務狀態。

## 📝 許可證

MIT License

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 💡 想法和建議

如果您有任何改進建議，請提交 Issue。

---

**作者：** Johnny050033  
**創建日期：** 2026-05-18  
**語言：** JavaScript (Node.js)  
**狀態：** ✅ 活躍開發
