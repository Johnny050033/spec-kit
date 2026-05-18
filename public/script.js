/**
 * Random Joke Generator - Frontend Script
 * Handles UI interactions and API calls
 */

// State Management
const state = {
  totalJokes: 0,
  totalRequests: 0,
  successfulRequests: 0,
  isLoading: false
};

// DOM Elements
const elements = {
  categorySelect: document.getElementById('category'),
  typeSelect: document.getElementById('type'),
  generateBtn: document.getElementById('generateBtn'),
  generateMultipleBtn: document.getElementById('generateMultipleBtn'),
  clearBtn: document.getElementById('clearBtn'),
  loading: document.getElementById('loading'),
  error: document.getElementById('error'),
  jokeContainer: document.getElementById('jokeContainer'),
  jokesContainer: document.getElementById('jokesContainer'),
  emptyState: document.getElementById('emptyState'),
  jokeText: document.getElementById('jokeText'),
  jokeCategory: document.getElementById('jokeCategory'),
  jokeType: document.getElementById('jokeType'),
  totalJokesDisplay: document.getElementById('totalJokes'),
  totalRequestsDisplay: document.getElementById('totalRequests'),
  successRateDisplay: document.getElementById('successRate')
};

/**
 * Initialize Event Listeners
 */
function initEventListeners() {
  elements.generateBtn.addEventListener('click', generateSingleJoke);
  elements.generateMultipleBtn.addEventListener('click', generateMultipleJokes);
  elements.clearBtn.addEventListener('click', clearDisplay);
}

/**
 * Generate a Single Joke
 */
async function generateSingleJoke() {
  try {
    setLoading(true);
    const category = elements.categorySelect.value;
    const type = elements.typeSelect.value;

    const response = await fetch(`/api/joke?category=${category}&type=${type}`);
    const result = await response.json();

    state.totalRequests++;

    if (result.success) {
      state.totalJokes++;
      state.successfulRequests++;
      displayJoke(result.data, result.formatted);
      hideError();
    } else {
      showError(result.error);
    }

    updateStatistics();
  } catch (error) {
    state.totalRequests++;
    showError(`錯誤: ${error.message}`);
    updateStatistics();
  } finally {
    setLoading(false);
  }
}

/**
 * Generate Multiple Jokes
 */
async function generateMultipleJokes() {
  try {
    setLoading(true);
    const category = elements.categorySelect.value;
    const type = elements.typeSelect.value;
    const count = 5; // 默認生成 5 個笑話

    const response = await fetch(
      `/api/jokes?count=${count}&category=${category}&type=${type}`
    );
    const result = await response.json();

    state.totalRequests++;

    if (result.success) {
      state.totalJokes += result.count;
      state.successfulRequests++;
      displayMultipleJokes(result.data);
      hideError();
    } else {
      showError(result.error);
    }

    updateStatistics();
  } catch (error) {
    state.totalRequests++;
    showError(`錯誤: ${error.message}`);
    updateStatistics();
  } finally {
    setLoading(false);
  }
}

/**
 * Display Single Joke
 */
function displayJoke(joke, formatted) {
  elements.jokeText.textContent = formatted;
  elements.jokeCategory.textContent = `分類: ${joke.category || 'Unknown'}`;
  elements.jokeType.textContent = `類型: ${joke.type}`;

  elements.emptyState.classList.add('hidden');
  elements.jokesContainer.classList.add('hidden');
  elements.jokeContainer.classList.remove('hidden');
}

/**
 * Display Multiple Jokes
 */
function displayMultipleJokes(jokes) {
  const jokesHTML = jokes
    .map((jokeWrapper, index) => {
      const joke = jokeWrapper.joke;
      const formatted = jokeWrapper.formatted;
      return `
        <div class="joke-card-small">
          <div class="joke-text">${escapeHtml(formatted)}</div>
          <div class="badge">分類: ${escapeHtml(joke.category || 'Unknown')}</div>
        </div>
      `;
    })
    .join('');

  elements.jokesContainer.innerHTML = jokesHTML;
  elements.emptyState.classList.add('hidden');
  elements.jokeContainer.classList.add('hidden');
  elements.jokesContainer.classList.remove('hidden');
}

/**
 * Clear Display
 */
function clearDisplay() {
  elements.jokeContainer.classList.add('hidden');
  elements.jokesContainer.classList.add('hidden');
  elements.emptyState.classList.remove('hidden');
  hideError();
}

/**
 * Show Loading State
 */
function setLoading(isLoading) {
  state.isLoading = isLoading;
  if (isLoading) {
    elements.loading.classList.remove('hidden');
    elements.generateBtn.disabled = true;
    elements.generateMultipleBtn.disabled = true;
  } else {
    elements.loading.classList.add('hidden');
    elements.generateBtn.disabled = false;
    elements.generateMultipleBtn.disabled = false;
  }
}

/**
 * Show Error Message
 */
function showError(message) {
  elements.error.textContent = `❌ ${message}`;
  elements.error.classList.remove('hidden');
}

/**
 * Hide Error Message
 */
function hideError() {
  elements.error.classList.add('hidden');
}

/**
 * Update Statistics Display
 */
function updateStatistics() {
  elements.totalJokesDisplay.textContent = state.totalJokes;
  elements.totalRequestsDisplay.textContent = state.totalRequests;

  const successRate =
    state.totalRequests > 0
      ? Math.round((state.successfulRequests / state.totalRequests) * 100)
      : 0;

  elements.successRateDisplay.textContent = `${successRate}%`;
}

/**
 * Escape HTML Special Characters
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Initialize Application
 */
function init() {
  console.log('🎭 隨機笑話生成器已加載');
  initEventListeners();
  updateStatistics();
}

// Start Application on DOM Ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
