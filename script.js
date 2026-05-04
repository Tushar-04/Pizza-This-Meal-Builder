import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js';
import { getFirestore, doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js';
import { firebaseConfig, ADMIN_PASSWORD, ADMIN_USERNAME } from './firebase-config.js';

const MENU_DOCUMENT_PATH = ['menus', 'pizza-this'];
const firebaseConfigured = Boolean(firebaseConfig?.apiKey && firebaseConfig.apiKey !== 'PASTE_YOUR_API_KEY_HERE');
const firebaseApp = firebaseConfigured ? initializeApp(firebaseConfig) : null;
const db = firebaseApp ? getFirestore(firebaseApp) : null;
const menuDocRef = db ? doc(db, ...MENU_DOCUMENT_PATH) : null;

const defaultMenuData = {
    meals: [
        { id: 'margherita-pizza-meal', name: 'Margherita Pizza', price: 250, items: ['Margherita Pizza (1x)'] },
        { id: 'ham-pizza-meal', name: 'Ham Pizza', price: 250, items: ['Ham Pizza (1x)'] },
        { id: 'salami-pizza-meal', name: 'Salami Pizza', price: 250, items: ['Salami Pizza (1x)'] },
        { id: 'pepperoni-pizza-meal', name: 'Pepperoni Pizza', price: 250, items: ['Pepperoni Pizza (1x)'] },
        { id: 'vegetarian-pizza-meal', name: 'Vegetarian Pizza', price: 260, items: ['Vegetarian Pizza (1x)'] },
        { id: 'hawaiian-pizza-meal', name: 'Hawaiian Pizza', price: 240, items: ['Hawaiian Pizza (1x)'] },
        { id: 'diavola-pizza-meal', name: 'Diavola Pizza', price: 280, items: ['Diavola Pizza (1x)'] },
        { id: 'breadstick-meal', name: 'Breadstick', price: 80, items: ['Breadstick (1x)'] },
        { id: 'water-meal', name: 'Water', price: 15, items: ['Water (1x)'] },
        { id: 'koka-meal', name: 'Koka', price: 30, items: ['Koka (1x)'] },
        { id: 'frezzi-meal', name: 'Frezzi', price: 30, items: ['Frezzi (1x)'] },
        { id: 'sprunk-meal', name: 'Sprunk', price: 30, items: ['Sprunk (1x)'] },
        { id: 'tanga-meal', name: 'Tanga', price: 30, items: ['Tanga (1x)'] },
        { id: 'beer-meal', name: 'Beer', price: 45, items: ['Beer (1x)'] },
        { id: 'kopri-sip-meal', name: 'Kopri Sip', price: 40, items: ['Kopri Sip (1x)'] },
        { id: 'green-apple-meal', name: 'Green Apple', price: 80, items: ['Green Apple (1x)'] },
        { id: 'pineapple-smoothie-meal', name: 'Pineapple Smoothie', price: 110, items: ['Pineapple Smoothie (1x)'] },
        { id: 'classic-starter', name: 'Classic Starter', price: 300, items: ['Margherita Pizza (1x)', 'Koka (2x)'] },
        { id: 'veggie-starter-supreme', name: 'Veggie Starter Supreme', price: 350, items: ['Vegetarian Pizza (1x)', 'Green Apple (2x)'] },
        { id: 'tropical-starter-feast', name: 'Tropical Starter Feast', price: 400, items: ['Hawaiian Pizza (1x)', 'Pineapple Smoothie (2x)'] },
        { id: 'ems-meal', name: 'EMS Meal', price: 650, items: ['Hawaiian Pizza (2x)', 'Tanga (5x)'] },
        { id: 'pd-meal', name: 'PD Meal', price: 750, items: ['Hawaiian Pizza (2x)', 'Green Apple (5x)', 'Frezzi (4x)'] },
        { id: 'doj-meal', name: 'DOJ Meal', price: 500, items: ['Hawaiian Pizza (2x)', 'Tanga (2x)', 'Pineapple Smoothie (2x)'] },
        { id: 'mechanic-meal', name: 'Mechanic Meal', price: 600, items: ['Vegetarian Pizza (2x)', 'Koka (6x)'] },
        { id: 'double-classic-combo', name: 'Double Classic Combo', price: 550, items: ['Margherita Pizza (1x)', 'Salami Pizza (1x)', 'Koka (2x)', 'Beer (2x)'] },
        { id: 'veggie-supreme-combo', name: 'Veggie Supreme Combo', price: 700, items: ['Vegetarian Pizza (1x)', 'Diavola Pizza (1x)', 'Green Apple (2x)', 'Sprunk (2x)'] },
        { id: 'tropical-duo-combo', name: 'Tropical Duo Combo', price: 720, items: ['Hawaiian Pizza (1x)', 'Pepperoni Pizza (1x)', 'Tanga (2x)', 'Pineapple Smoothie (2x)'] },
        { id: 'large-classic-party-pack', name: 'Large Classic Party Pack', price: 950, items: ['Margherita Pizza (1x)', 'Salami Pizza (1x)', 'Pepperoni Pizza (1x)', 'Sprunk (4x)', 'Beer (2x)', 'Green Apple (1x)'] },
        { id: 'mega-tropical-party-pack', name: 'Mega Tropical Party Pack', price: 1150, items: ['Hawaiian Pizza (1x)', 'Diavola Pizza (1x)', 'Ham Pizza (1x)', 'Koka (4x)', 'Tanga (2x)', 'Pineapple Smoothie (2x)'] }
    ],
    foodItems: [
        { id: 'pizza-dough', name: 'Pizza Dough', icon: '\u{1F956}', servingSize: 1, ingredients: { 'Olive Oil': 1, 'Yeast Packet': 1, Flour: 1 } },
        { id: 'breadstick', name: 'Breadstick', icon: '\u{1F956}', servingSize: 1, ingredients: { 'Pizza Dough': 1 } },
        { id: 'margherita-pizza', name: 'Margherita Pizza', icon: '\u{1F355}', servingSize: 1, ingredients: { 'Pizza Dough': 1, 'Tomato Sauce': 1, Mozzarella: 2, 'Pizza Cheese': 1 } },
        { id: 'ham-pizza', name: 'Ham Pizza', icon: '\u{1F355}', servingSize: 1, ingredients: { 'Pizza Dough': 1, 'Tomato Sauce': 1, 'Pizza Cheese': 1, Ham: 2 } },
        { id: 'salami-pizza', name: 'Salami Pizza', icon: '\u{1F355}', servingSize: 1, ingredients: { 'Pizza Dough': 1, 'Tomato Sauce': 1, 'Pizza Cheese': 1, Salami: 2 } },
        { id: 'pepperoni-pizza', name: 'Pepperoni Pizza', icon: '\u{1F355}', servingSize: 1, ingredients: { 'Pizza Dough': 1, 'Tomato Sauce': 1, 'Pizza Cheese': 1, Pepperoni: 2 } },
        { id: 'vegetarian-pizza', name: 'Vegetarian Pizza', icon: '\u{1F355}', servingSize: 1, ingredients: { 'Pizza Dough': 1, 'Tomato Sauce': 1, 'Pizza Cheese': 1, Olives: 2, 'Sliced Bell Peppers': 2 } },
        { id: 'hawaiian-pizza', name: 'Hawaiian Pizza', icon: '\u{1F355}', servingSize: 1, ingredients: { 'Pizza Dough': 1, 'Tomato Sauce': 1, 'Pizza Cheese': 1, 'Pineapple Slices': 2, Ham: 1 } },
        { id: 'diavola-pizza', name: 'Diavola Pizza', icon: '\u{1F355}', servingSize: 1, ingredients: { 'Pizza Dough': 1, 'Tomato Sauce': 1, 'Pizza Cheese': 1, Pepperoni: 1, Jalapeno: 1, 'Black Olives': 1 } },
        { id: 'water', name: 'Water', icon: '\u{1F4A7}', servingSize: 1, ingredients: { Water: 1 } },
        { id: 'koka', name: 'Koka', icon: '\u{1F964}', servingSize: 1, ingredients: { Koka: 1 } },
        { id: 'frezzi', name: 'Frezzi', icon: '\u{1F964}', servingSize: 1, ingredients: { Frezzi: 1 } },
        { id: 'sprunk', name: 'Sprunk', icon: '\u{1F964}', servingSize: 1, ingredients: { Sprunk: 1 } },
        { id: 'tanga', name: 'Tanga', icon: '\u{1F964}', servingSize: 1, ingredients: { Tanga: 1 } },
        { id: 'beer', name: 'Beer', icon: '\u{1F37A}', servingSize: 1, ingredients: { Beer: 1 } },
        { id: 'kopri-sip', name: 'Kopri Sip', icon: '\u{1F964}', servingSize: 1, ingredients: { 'Kopri Sip': 1 } },
        { id: 'green-apple', name: 'Green Apple', icon: '\u{1F34F}', servingSize: 1, ingredients: { 'Green Apple': 1 } },
        { id: 'pineapple-smoothie', name: 'Pineapple Smoothie', icon: '\u{1F379}', servingSize: 1, ingredients: { Pineapple: 3, Water: 2 } }
    ]
};

const ingredientIcons = {
    'Olive Oil': '\u{1FAD2}', 'Yeast Packet': '\u{1F9C2}', Flour: '\u{1F35E}', 'Pizza Dough': '\u{1F956}', 'Tomato Sauce': '\u{1F345}', Mozzarella: '\u{1F9C0}', 'Pizza Cheese': '\u{1F9C0}', Ham: '\u{1F969}', Salami: '\u{1F356}', Pepperoni: '\u{1F355}', Olives: '\u{1FAD2}', 'Black Olives': '\u{1FAD2}', 'Sliced Bell Peppers': '\u{1FAD1}', 'Pineapple Slices': '\u{1F34D}', Pineapple: '\u{1F34D}', Jalapeno: '\u{1F336}\uFE0F', Water: '\u{1F4A7}', Koka: '\u{1F964}', Frezzi: '\u{1F964}', Sprunk: '\u{1F964}', Tanga: '\u{1F964}', Beer: '\u{1F37A}', 'Kopri Sip': '\u{1F964}', 'Green Apple': '\u{1F34F}'
};

let menuData = clone(defaultMenuData);
let selectedMeals = {};
let selectedItems = {};
let currentMealId = menuData.meals[0]?.id || '';
let currentItemId = menuData.foodItems[0]?.id || '';
let activeAdminMealId = currentMealId;
let activeAdminItemId = currentItemId;
let adminUnlocked = false;

const $ = (id) => document.getElementById(id);
const parseLines = (value) => value.split('\n').map((line) => line.trim()).filter(Boolean);

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

async function loadMenuData() {
    if (!menuDocRef) {
        showAdminStatus('Add Firebase config to enable online menu data.');
        return clone(defaultMenuData);
    }

    try {
        const snapshot = await getDoc(menuDocRef);
        const stored = snapshot.exists() ? snapshot.data() : null;
        if (stored?.meals?.length && stored?.foodItems?.length) return clone(stored);
        showAdminStatus('Firestore is empty. Using built-in menu defaults.');
    } catch (error) {
        showAdminStatus(`Could not load Firestore menu: ${error.message}`);
    }
    return clone(defaultMenuData);
}

async function saveMenuData() {
    if (!menuDocRef) throw new Error('Firebase is not configured.');
    await setDoc(menuDocRef, {
        meals: menuData.meals,
        foodItems: menuData.foodItems,
        updatedAt: new Date().toISOString()
    });
}

function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function formatIngredients(ingredients) {
    return Object.entries(ingredients || {}).map(([name, amount]) => `${name}: ${amount}`).join('\n');
}

function parseIngredients(value) {
    return parseLines(value).reduce((ingredients, line) => {
        const separatorIndex = line.lastIndexOf(':');
        const name = separatorIndex === -1 ? line : line.slice(0, separatorIndex);
        const amount = separatorIndex === -1 ? '1' : line.slice(separatorIndex + 1);
        const quantity = Number(amount.trim());
        if (name.trim() && Number.isFinite(quantity) && quantity > 0) ingredients[name.trim()] = quantity;
        return ingredients;
    }, {});
}

function populateSelect(select, items, getLabel) {
    if (!select) return;
    select.replaceChildren(...items.map((item) => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = getLabel(item);
        return option;
    }));
}

function initMenuPage() {
    if (!$('mealDropdown') || !$('itemDropdown')) return;
    renderMenuDropdowns();
    $('mealDropdown').addEventListener('change', (event) => {
        currentMealId = event.target.value;
        updateQuantityDisplays();
    });
    $('itemDropdown').addEventListener('change', (event) => {
        currentItemId = event.target.value;
        updateQuantityDisplays();
    });
    $('mealIncreaseBtn').addEventListener('click', () => updateSelection(selectedMeals, currentMealId, 1));
    $('mealDecreaseBtn').addEventListener('click', () => updateSelection(selectedMeals, currentMealId, -1));
    $('itemIncreaseBtn').addEventListener('click', () => updateSelection(selectedItems, currentItemId, 1));
    $('itemDecreaseBtn').addEventListener('click', () => updateSelection(selectedItems, currentItemId, -1));
    $('resetBtn').addEventListener('click', resetSelections);
    updateSummary();
}

function renderMenuDropdowns() {
    currentMealId = menuData.meals.some(({ id }) => id === currentMealId) ? currentMealId : menuData.meals[0]?.id || '';
    currentItemId = menuData.foodItems.some(({ id }) => id === currentItemId) ? currentItemId : menuData.foodItems[0]?.id || '';
    populateSelect($('mealDropdown'), menuData.meals, (meal) => meal.price > 0 ? `${meal.name} ($${meal.price})` : meal.name);
    populateSelect($('itemDropdown'), menuData.foodItems, (item) => `${item.icon} ${item.name}`);
    $('mealDropdown').value = currentMealId;
    $('itemDropdown').value = currentItemId;
    updateQuantityDisplays();
}

function updateSelection(selection, id, delta) {
    if (!id) return;
    const quantity = Math.max((selection[id] || 0) + delta, 0);
    if (quantity) selection[id] = quantity;
    else delete selection[id];
    updateQuantityDisplays();
    updateSummary();
}

function updateQuantityDisplays() {
    if ($('mealDropdownQty')) $('mealDropdownQty').textContent = selectedMeals[currentMealId] || 0;
    if ($('itemDropdownQty')) $('itemDropdownQty').textContent = selectedItems[currentItemId] || 0;
}

function resetSelections() {
    selectedMeals = {};
    selectedItems = {};
    updateQuantityDisplays();
    updateSummary();
}

function updateSummary() {
    renderSelectedList();
    renderFoodItemsBreakdown();
    renderIngredientsBreakdown();
}

function renderSelectedList() {
    const rows = [
        ...Object.entries(selectedMeals).map(([id, quantity]) => {
            const meal = menuData.meals.find((item) => item.id === id);
            return meal && quantity > 0 ? { name: meal.name, quantity: `${quantity}x` } : null;
        }),
        ...Object.entries(selectedItems).map(([id, quantity]) => {
            const item = menuData.foodItems.find((food) => food.id === id);
            return item && quantity > 0 ? { name: `${item.icon} ${item.name}`, quantity: `${quantity}x` } : null;
        })
    ].filter(Boolean);
    $('selectedList').innerHTML = rows.length ? rows.map(({ name, quantity }) => summaryRow('selected-item', 'selected-item-name', 'selected-item-quantity', name, quantity)).join('') : '<div class="empty-state">No meals or items selected yet</div>';
}

function renderFoodItemsBreakdown() {
    const rows = Object.entries(calculateTotalFoodItems()).sort(([a], [b]) => a.localeCompare(b));
    $('foodItemsList').innerHTML = rows.length ? rows.map(([name, quantity]) => summaryRow('food-item-summary', 'food-item-name', 'food-item-quantity', `${getFoodItemIcon(name)} ${name}`, quantity)).join('') : '<div class="empty-state">No food items selected yet</div>';
}

function renderIngredientsBreakdown() {
    const rows = Object.entries(calculateTotalIngredients()).sort(([a], [b]) => a.localeCompare(b));
    $('ingredientsList').innerHTML = rows.length ? rows.map(([name, quantity]) => summaryRow('ingredient-item', 'ingredient-name', 'ingredient-quantity', `${getIngredientIcon(name)} ${name}`, quantity)).join('') : '<div class="empty-state">No ingredients needed</div>';
}

function summaryRow(rowClass, nameClass, quantityClass, name, quantity) {
    return `<div class="${rowClass}"><span class="${nameClass}">${escapeHtml(name)}</span><span class="${quantityClass}">${escapeHtml(quantity)}</span></div>`;
}

function calculateTotalFoodItems() {
    const totals = {};
    Object.entries(selectedMeals).forEach(([mealId, quantity]) => {
        const meal = menuData.meals.find(({ id }) => id === mealId);
        if (!meal || quantity <= 0) return;
        meal.items.forEach((line) => {
            const item = parseMealItem(line);
            totals[item.name] = (totals[item.name] || 0) + item.count * quantity;
        });
    });
    Object.entries(selectedItems).forEach(([itemId, quantity]) => {
        const item = menuData.foodItems.find(({ id }) => id === itemId);
        if (item && quantity > 0) totals[item.name] = (totals[item.name] || 0) + quantity * (item.servingSize || 1);
    });
    return totals;
}

function parseMealItem(line) {
    const match = line.match(/^(.*?)\s*\((\d+)x\)$/i);
    return match ? { name: match[1].trim(), count: Number(match[2]) } : { name: line.trim(), count: 1 };
}

function calculateTotalIngredients() {
    const totals = {};
    const addIngredients = (ingredients, multiplier) => {
        Object.entries(ingredients || {}).forEach(([name, amount]) => {
            totals[name] = (totals[name] || 0) + amount * multiplier;
        });
    };
    Object.entries(selectedMeals).forEach(([mealId, quantity]) => {
        const meal = menuData.meals.find(({ id }) => id === mealId);
        if (!meal || quantity <= 0) return;
        meal.items.forEach((line) => {
            const mealItem = parseMealItem(line);
            const foodItem = menuData.foodItems.find(({ name }) => name === mealItem.name);
            if (foodItem) addIngredients(foodItem.ingredients, quantity * mealItem.count);
        });
    });
    Object.entries(selectedItems).forEach(([itemId, quantity]) => {
        const item = menuData.foodItems.find(({ id }) => id === itemId);
        if (item && quantity > 0) addIngredients(item.ingredients, quantity);
    });
    return totals;
}

function getFoodItemIcon(foodName) {
    return menuData.foodItems.find(({ name }) => name === foodName)?.icon || '\u{1F37D}\uFE0F';
}

function getIngredientIcon(ingredient) {
    return ingredientIcons[ingredient] || '\u{1F95F}';
}

function initAdminPage() {
    if (!$('adminMealList')) return;
    renderAdmin();
    initAdminAuth();
    $('addMealBtn').addEventListener('click', addMeal);
    $('addFoodItemBtn').addEventListener('click', addFoodItem);
    $('addMealItemBtn').addEventListener('click', addMealItemRow);
    $('saveMealBtn').addEventListener('click', saveActiveMeal);
    $('deleteMealBtn').addEventListener('click', deleteActiveMeal);
    $('addIngredientBtn').addEventListener('click', addIngredientRow);
    $('saveFoodItemBtn').addEventListener('click', saveActiveFoodItem);
    $('deleteFoodItemBtn').addEventListener('click', deleteActiveFoodItem);
    $('resetMenuBtn').addEventListener('click', resetMenuData);
}

function initAdminAuth() {
    $('adminLoginBtn')?.addEventListener('click', signInAdmin);
    $('adminPasswordInput')?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') signInAdmin();
    });
    $('adminLogoutBtn')?.addEventListener('click', () => {
        adminUnlocked = false;
        updateAdminAuthState();
    });
    updateAdminAuthState();
}

function signInAdmin() {
    const username = $('adminUsernameInput')?.value.trim();
    const password = $('adminPasswordInput')?.value;
    if (!username || !password) {
        showAdminStatus('Enter admin ID and password.');
        return;
    }
    if (username !== ADMIN_USERNAME) {
        showAdminStatus('Invalid admin ID.');
        return;
    }
    if (password !== ADMIN_PASSWORD) {
        showAdminStatus('Invalid password.');
        return;
    }

    adminUnlocked = true;
    if ($('adminPasswordInput')) $('adminPasswordInput').value = '';
    updateAdminAuthState();
    showAdminStatus('Admin unlocked.');
}

function updateAdminAuthState() {
    const canEdit = Boolean(menuDocRef && adminUnlocked);
    const loginForm = $('adminLoginForm');
    const userLabel = $('adminUserLabel');
    const logoutBtn = $('adminLogoutBtn');

    if (loginForm) loginForm.hidden = adminUnlocked;
    if (logoutBtn) logoutBtn.hidden = !adminUnlocked;
    if (userLabel) userLabel.textContent = adminUnlocked ? `Admin: ${ADMIN_USERNAME}` : '';

    document.querySelectorAll('[data-admin-write]').forEach((element) => {
        element.disabled = !canEdit;
    });

    if (!menuDocRef) showAdminStatus('Add Firebase config to enable online saves.');
    else if (!adminUnlocked) showAdminStatus('Enter admin/admin to save menu changes.');
}

function renderAdmin() {
    activeAdminMealId = menuData.meals.some(({ id }) => id === activeAdminMealId) ? activeAdminMealId : menuData.meals[0]?.id || '';
    activeAdminItemId = menuData.foodItems.some(({ id }) => id === activeAdminItemId) ? activeAdminItemId : menuData.foodItems[0]?.id || '';
    $('adminMealList').innerHTML = menuData.meals.map((meal) => adminListButton(meal, activeAdminMealId, 'meal')).join('');
    $('adminFoodItemList').innerHTML = menuData.foodItems.map((item) => adminListButton(item, activeAdminItemId, 'food')).join('');
    document.querySelectorAll('[data-admin-meal-id]').forEach((button) => button.addEventListener('click', () => {
        activeAdminMealId = button.dataset.adminMealId;
        renderAdmin();
    }));
    document.querySelectorAll('[data-admin-food-id]').forEach((button) => button.addEventListener('click', () => {
        activeAdminItemId = button.dataset.adminFoodId;
        renderAdmin();
    }));
    renderMealEditor();
    renderFoodItemEditor();
    renderIngredientSuggestions();
    updateAdminAuthState();
}

function adminListButton(item, activeId, type) {
    const attr = type === 'meal' ? 'data-admin-meal-id' : 'data-admin-food-id';
    const label = type === 'meal' ? `${item.name} - $${item.price}` : `${item.icon} ${item.name}`;
    return `<button class="admin-list-item ${item.id === activeId ? 'active' : ''}" ${attr}="${escapeHtml(item.id)}" type="button">${escapeHtml(label)}</button>`;
}

function renderMealEditor() {
    const meal = menuData.meals.find(({ id }) => id === activeAdminMealId);
    $('mealEditorEmpty').hidden = Boolean(meal);
    $('mealEditorForm').hidden = !meal;
    if (!meal) return;
    $('mealNameInput').value = meal.name;
    $('mealPriceInput').value = meal.price;
    renderMealItemRows(meal.items);
}

function renderMealItemRows(items) {
    const editor = $('mealItemsEditor');
    editor.innerHTML = '';
    const rows = items.length ? items.map(parseMealItem) : [{ name: menuData.foodItems[0]?.name || '', count: 1 }];
    rows.forEach((item) => editor.appendChild(createMealItemRow(item)));
}

function createMealItemRow(item = {}) {
    const row = document.createElement('div');
    row.className = 'meal-item-row';

    const select = document.createElement('select');
    select.className = 'meal-item-select';
    select.setAttribute('aria-label', 'Meal item');

    const knownNames = new Set(menuData.foodItems.map(({ name }) => name));
    if (item.name && !knownNames.has(item.name)) {
        const legacyOption = document.createElement('option');
        legacyOption.value = item.name;
        legacyOption.textContent = `${item.name} (missing recipe)`;
        select.appendChild(legacyOption);
    }

    menuData.foodItems.forEach((foodItem) => {
        const option = document.createElement('option');
        option.value = foodItem.name;
        option.textContent = `${foodItem.icon} ${foodItem.name}`;
        select.appendChild(option);
    });
    select.value = item.name || menuData.foodItems[0]?.name || '';

    const count = document.createElement('input');
    count.className = 'meal-item-count';
    count.type = 'number';
    count.min = '1';
    count.step = '1';
    count.value = Math.max(Number(item.count) || 1, 1);
    count.setAttribute('aria-label', 'Meal item quantity');

    const remove = document.createElement('button');
    remove.className = 'danger-btn compact-btn';
    remove.type = 'button';
    remove.textContent = 'Remove';
    remove.dataset.adminWrite = 'true';
    remove.addEventListener('click', () => {
        row.remove();
        if (!$('mealItemsEditor').children.length) addMealItemRow();
    });

    row.append(select, count, remove);
    return row;
}

function renderFoodItemEditor() {
    const item = menuData.foodItems.find(({ id }) => id === activeAdminItemId);
    $('foodItemEditorEmpty').hidden = Boolean(item);
    $('foodItemEditorForm').hidden = !item;
    if (!item) return;
    $('foodItemNameInput').value = item.name;
    $('foodItemIconInput').value = item.icon;
    $('foodItemServingInput').value = item.servingSize || 1;
    renderIngredientRows(item.ingredients);
}

function saveActiveMeal() {
    const meal = menuData.meals.find(({ id }) => id === activeAdminMealId);
    if (!meal) return;
    meal.name = $('mealNameInput').value.trim() || meal.name;
    meal.price = Math.max(Number($('mealPriceInput').value) || 0, 0);
    meal.items = getMealItemRows();
    delete meal.ingredients;
    persistAdminChange('Meal saved.');
}

function addMealItemRow() {
    $('mealItemsEditor').appendChild(createMealItemRow({ name: menuData.foodItems[0]?.name || '', count: 1 }));
}

function getMealItemRows() {
    return [...$('mealItemsEditor').querySelectorAll('.meal-item-row')]
        .map((row) => {
            const name = row.querySelector('.meal-item-select').value;
            const count = Math.max(Number(row.querySelector('.meal-item-count').value) || 1, 1);
            return name ? `${name} (${count}x)` : '';
        })
        .filter(Boolean);
}

function saveActiveFoodItem() {
    const item = menuData.foodItems.find(({ id }) => id === activeAdminItemId);
    if (!item) return;
    item.name = $('foodItemNameInput').value.trim() || item.name;
    item.icon = $('foodItemIconInput').value.trim() || '\u{1F37D}\uFE0F';
    item.servingSize = Math.max(Number($('foodItemServingInput').value) || 1, 1);
    item.ingredients = getIngredientRows();
    persistAdminChange('Food item saved.');
}

function renderIngredientSuggestions() {
    const suggestions = $('ingredientSuggestions');
    if (!suggestions) return;
    const names = new Set();
    menuData.foodItems.forEach((item) => {
        Object.keys(item.ingredients || {}).forEach((name) => names.add(name));
    });
    suggestions.replaceChildren(...[...names].sort((a, b) => a.localeCompare(b)).map((name) => {
        const option = document.createElement('option');
        option.value = name;
        return option;
    }));
}

function renderIngredientRows(ingredients) {
    const editor = $('foodItemIngredientsEditor');
    editor.innerHTML = '';
    const rows = Object.entries(ingredients || {});
    if (rows.length) {
        rows.forEach(([name, amount]) => editor.appendChild(createIngredientRow({ name, amount })));
    } else {
        editor.appendChild(createIngredientRow());
    }
}

function createIngredientRow(ingredient = {}) {
    const row = document.createElement('div');
    row.className = 'ingredient-row';

    const name = document.createElement('input');
    name.className = 'ingredient-name-input';
    name.type = 'text';
    name.value = ingredient.name || '';
    name.placeholder = 'Ingredient name';
    name.setAttribute('list', 'ingredientSuggestions');
    name.setAttribute('aria-label', 'Ingredient name');

    const amount = document.createElement('input');
    amount.className = 'ingredient-amount-input';
    amount.type = 'number';
    amount.min = '1';
    amount.step = '1';
    amount.value = Math.max(Number(ingredient.amount) || 1, 1);
    amount.setAttribute('aria-label', 'Ingredient quantity');

    const remove = document.createElement('button');
    remove.className = 'danger-btn compact-btn';
    remove.type = 'button';
    remove.textContent = 'Remove';
    remove.dataset.adminWrite = 'true';
    remove.addEventListener('click', () => {
        row.remove();
        if (!$('foodItemIngredientsEditor').children.length) addIngredientRow();
    });

    row.append(name, amount, remove);
    return row;
}

function addIngredientRow() {
    $('foodItemIngredientsEditor').appendChild(createIngredientRow());
}

function getIngredientRows() {
    return [...$('foodItemIngredientsEditor').querySelectorAll('.ingredient-row')].reduce((ingredients, row) => {
        const name = row.querySelector('.ingredient-name-input').value.trim();
        const amount = Math.max(Number(row.querySelector('.ingredient-amount-input').value) || 1, 1);
        if (name) ingredients[name] = (ingredients[name] || 0) + amount;
        return ingredients;
    }, {});
}

function addMeal() {
    const firstItemName = menuData.foodItems[0]?.name || 'New Item';
    const meal = { id: uniqueId('new-meal', menuData.meals), name: 'New Meal', price: 0, items: [`${firstItemName} (1x)`] };
    menuData.meals.push(meal);
    activeAdminMealId = meal.id;
    persistAdminChange('Meal added.');
}

function addFoodItem() {
    const item = { id: uniqueId('new-food-item', menuData.foodItems), name: 'New Food Item', icon: '\u{1F37D}\uFE0F', servingSize: 1, ingredients: {} };
    menuData.foodItems.push(item);
    activeAdminItemId = item.id;
    persistAdminChange('Food item added.');
}

function uniqueId(baseId, items) {
    const ids = new Set(items.map(({ id }) => id));
    let id = baseId;
    let counter = 2;
    while (ids.has(id)) id = `${baseId}-${counter++}`;
    return id;
}

function deleteActiveMeal() {
    if (!activeAdminMealId || !confirm('Delete this meal?')) return;
    menuData.meals = menuData.meals.filter(({ id }) => id !== activeAdminMealId);
    activeAdminMealId = menuData.meals[0]?.id || '';
    persistAdminChange('Meal deleted.');
}

function deleteActiveFoodItem() {
    if (!activeAdminItemId || !confirm('Delete this food item?')) return;
    menuData.foodItems = menuData.foodItems.filter(({ id }) => id !== activeAdminItemId);
    activeAdminItemId = menuData.foodItems[0]?.id || '';
    persistAdminChange('Food item deleted.');
}

function resetMenuData() {
    if (!confirm('Restore the original menu data?')) return;
    menuData = clone(defaultMenuData);
    selectedMeals = {};
    selectedItems = {};
    activeAdminMealId = menuData.meals[0]?.id || '';
    activeAdminItemId = menuData.foodItems[0]?.id || '';
    persistAdminChange('Menu restored.');
}

async function persistAdminChange(message) {
    try {
        await saveMenuData();
        renderAdmin();
        showAdminStatus(`${message} Firestore updated.`);
    } catch (error) {
        renderAdmin();
        updateAdminAuthState();
        showAdminStatus(`Save failed: ${error.message}`);
    }
}

function showAdminStatus(message) {
    const status = $('adminStatus');
    if (!status) return;
    status.textContent = message;
    window.clearTimeout(showAdminStatus.timer);
    showAdminStatus.timer = window.setTimeout(() => {
        status.textContent = '';
    }, 2500);
}

document.addEventListener('DOMContentLoaded', async () => {
    menuData = await loadMenuData();
    currentMealId = menuData.meals[0]?.id || '';
    currentItemId = menuData.foodItems[0]?.id || '';
    activeAdminMealId = currentMealId;
    activeAdminItemId = currentItemId;
    initMenuPage();
    initAdminPage();
});
