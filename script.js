document.addEventListener('DOMContentLoaded', function() {
    // Recipe Database
    const recipes = {
        1: {
            id: 1,
            name: "Bruschetta Clássica",
            description: "Pão italiano tostado com tomate, manjericão e azeite",
            category: "entradas",
            time: "15 minutos",
            difficulty: "Fácil",
            difficultyStars: "★★☆☆☆",
            servings: 4,
            ingredients: [
                "1 baguete italiana",
                "4 tomates maduros",
                "2 dentes de alho",
                "Folhas de manjericão fresco",
                "4 colheres de sopa de azeite de oliva extra virgem",
                "Sal e pimenta-do-reino a gosto",
                "1 colher de chá de vinagre balsâmico (opcional)"
            ],
            instructions: [
                "Corte a baguete em fatias de aproximadamente 1,5 cm de espessura.",
                "Toste as fatias de pão no forno a 180°C por 5-7 minutos, até ficarem douradas.",
                "Esfregue levemente um dente de alho em cada fatia de pão ainda quente.",
                "Pique os tomates em cubos pequenos e coloque em uma tigela.",
                "Adicione o manjericão picado, azeite, sal, pimenta e vinagre balsâmico (se usar). Misture bem.",
                "Distribua a mistura de tomate sobre as fatias de pão e sirva imediatamente."
            ],
            tips: "Para uma bruschetta ainda mais saborosa, deixe a mistura de tomate descansar por 30 minutos antes de servir, permitindo que os sabores se integrem. Você também pode adicionar queijo parmesão ralado por cima."
        },
        2: {
            id: 2,
            name: "Carpaccio Premium",
            description: "Finas fatias de filé mignon com alcaparras e parmesão",
            category: "entradas",
            time: "20 minutos + 1 hora de refrigeração",
            difficulty: "Médio",
            difficultyStars: "★★★☆☆",
            servings: 4,
            ingredients: [
                "400g de filé mignon limpo",
                "2 colheres de sopa de alcaparras",
                "50g de queijo parmesão em lascas",
                "4 colheres de sopa de azeite de oliva extra virgem",
                "1 limão (suco)",
                "Rúcula fresca",
                "Sal e pimenta-do-reino moída na hora"
            ],
            instructions: [
                "Embrulhe o filé mignon em filme plástico e leve ao congelador por cerca de 1 hora (não deve congelar completamente, apenas ficar firme para facilitar o corte).",
                "Retire o filé do congelador e corte em fatias muito finas com uma faca bem afiada.",
                "Disponha as fatias em pratos individuais, formando uma única camada.",
                "Regue com azeite de oliva e suco de limão.",
                "Tempere com sal e pimenta a gosto.",
                "Distribua as alcaparras, as lascas de parmesão e folhas de rúcula por cima.",
                "Sirva imediatamente ou mantenha refrigerado até o momento de servir."
            ],
            tips: "O segredo para um bom carpaccio está no corte fino da carne. Se preferir, peça ao açougueiro para fatiar a carne para você. Para uma versão mais sofisticada, adicione um fio de azeite trufado por cima."
        },
        // (...) receitas 3 a 9 seguem iguais do código original
    };

    // DOM Elements
    const categoryTabs = document.querySelectorAll('.category-tab');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuCategories = document.querySelectorAll('.menu-category');
    const emptyRecipeEl = document.getElementById('empty-recipe');
    const recipeDetailsEl = document.getElementById('recipe-details');
    const recipeTitleEl = document.getElementById('recipe-title');
    const recipeDescriptionEl = document.getElementById('recipe-description');
    const recipeTimeEl = document.getElementById('recipe-time');
    const recipeDifficultyEl = document.getElementById('recipe-difficulty');
    const recipeIngredientsEl = document.getElementById('recipe-ingredients');
    const recipeInstructionsEl = document.getElementById('recipe-instructions');
    const recipeTipsEl = document.getElementById('recipe-tips');
    const decreaseServingsBtn = document.getElementById('decrease-servings');
    const increaseServingsBtn = document.getElementById('increase-servings');
    const servingsCountEl = document.getElementById('servings-count');

    let currentRecipe = null;
    let currentServings = 4;
    let originalIngredients = [];

    // Event Listeners
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.dataset.category;
            menuCategories.forEach(cat => cat.classList.add('hidden'));
            document.getElementById(category).classList.remove('hidden');
        });
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const itemId = parseInt(item.dataset.id);
            menuItems.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            showRecipeDetails(itemId);
        });
    });

    decreaseServingsBtn.addEventListener('click', () => {
        if (currentServings > 1) {
            currentServings--;
            updateServings();
        }
    });

    increaseServingsBtn.addEventListener('click', () => {
        if (currentServings < 12) {
            currentServings++;
            updateServings();
        }
    });

    // Functions
    function showRecipeDetails(recipeId) {
        currentRecipe = recipes[recipeId];
        if (!currentRecipe) return;

        originalIngredients = [...currentRecipe.ingredients];
        currentServings = currentRecipe.servings;
        
        recipeTitleEl.textContent = currentRecipe.name;
        recipeDescriptionEl.textContent = currentRecipe.description;
        recipeTimeEl.textContent = `Tempo: ${currentRecipe.time}`;
        recipeDifficultyEl.innerHTML = `Dificuldade: ${currentRecipe.difficultyStars}`;
        servingsCountEl.textContent = currentServings;

        updateIngredientsList();
        
        recipeInstructionsEl.innerHTML = '';
        currentRecipe.instructions.forEach((instruction, index) => {
            const stepEl = document.createElement('div');
            stepEl.className = 'flex items-start';
            stepEl.innerHTML = `
                <div class="step-number">${index + 1}</div>
                <p>${instruction}</p>
            `;
            recipeInstructionsEl.appendChild(stepEl);
        });

        recipeTipsEl.textContent = currentRecipe.tips;

        emptyRecipeEl.classList.add('hidden');
        recipeDetailsEl.classList.remove('hidden');
    }

    function updateIngredientsList() {
        recipeIngredientsEl.innerHTML = '';
        
        originalIngredients.forEach(ingredient => {
            const isHeader = !/\d/.test(ingredient);
            const ingredientEl = document.createElement('li');
            if (isHeader) {
                ingredientEl.className = 'font-medium mt-3';
                ingredientEl.textContent = ingredient;
            } else {
                ingredientEl.className = 'ingredient-item';
                if (currentServings !== currentRecipe.servings) {
                    ingredientEl.textContent = scaleIngredient(ingredient, currentRecipe.servings, currentServings);
                } else {
                    ingredientEl.textContent = ingredient;
                }
            }
            recipeIngredientsEl.appendChild(ingredientEl);
        });
    }

    function updateServings() {
        servingsCountEl.textContent = currentServings;
        updateIngredientsList();
    }

    function scaleIngredient(ingredient, originalServings, newServings) {
        return ingredient.replace(/(\d+(\.\d+)?)/g, (match) => {
            const num = parseFloat(match);
            const scaled = (num * newServings) / originalServings;
            return Number.isInteger(scaled) ? scaled.toString() : scaled.toFixed(1).replace(/\.0$/, '');
        });
    }
});
