/**
 * Random Joke Generator - Web Server
 * Express.js application for serving the web interface
 */

const express = require('express');
const axios = require('axios');
const path = require('path');
const { getRandomJoke, formatJoke } = require('./joke-generator');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes

/**
 * 首頁路由
 */
app.get('/', (req, res) => {
  res.render('index', { joke: null, error: null });
});

/**
 * API: 獲取隨機笑話
 * GET /api/joke?type=any&category=any
 */
app.get('/api/joke', async (req, res) => {
  try {
    const { type = 'any', category = 'any' } = req.query;

    const joke = await getRandomJoke({ type, category });

    res.json({
      success: true,
      data: joke,
      formatted: formatJoke(joke)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * API: 獲取多個笑話
 * GET /api/jokes?count=5&type=any&category=any
 */
app.get('/api/jokes', async (req, res) => {
  try {
    const { count = 5, type = 'any', category = 'any' } = req.query;
    const numCount = Math.min(parseInt(count), 20); // 限制最多 20 個

    const jokes = [];
    for (let i = 0; i < numCount; i++) {
      const joke = await getRandomJoke({ type, category });
      jokes.push({
        joke: joke,
        formatted: formatJoke(joke)
      });
      // 避免過度請求 API
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    res.json({
      success: true,
      count: jokes.length,
      data: jokes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * API: 獲取可用分類
 */
app.get('/api/categories', (req, res) => {
  const categories = [
    { value: 'any', label: '任意分類' },
    { value: 'General', label: '一般笑話' },
    { value: 'Programming', label: '編程笑話' },
    { value: 'Knock-knock', label: '敲門笑話' }
  ];

  res.json({
    success: true,
    data: categories
  });
});

/**
 * API: 獲取可用類型
 */
app.get('/api/types', (req, res) => {
  const types = [
    { value: 'any', label: '任意類型' },
    { value: 'single', label: '單行笑話' },
    { value: 'twopart', label: '雙行笑話' }
  ];

  res.json({
    success: true,
    data: types
  });
});

/**
 * 健康檢查
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

/**
 * 404 錯誤處理
 */
app.use((req, res) => {
  res.status(404).render('404');
});

/**
 * 啟動服務器
 */
app.listen(PORT, () => {
  console.log(`\n🎭 Random Joke Generator 已啟動！`);
  console.log(`\n📍 訪問地址: http://localhost:${PORT}`);
  console.log(`\n🌐 Web 界面已就緒！\n`);
});

module.exports = app;
