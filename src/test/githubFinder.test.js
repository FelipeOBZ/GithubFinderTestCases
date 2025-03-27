const { test, expect } = require('@playwright/test');

test.describe("Pruebas funcionales - GitHub Finder", () => {
  
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173'); 
        await page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
        });
        await page.reload();
    });

    test("1️⃣ Buscar Usuario redirige correctamente", async ({ page }) => {
        await page.click("#usersSearchButton");
        await expect(page).toHaveURL(/.*users/);
    });

    test("2️⃣ Buscar Organización redirige correctamente", async ({ page }) => {
        await page.click("#orgsSearchButton");
        await expect(page).toHaveURL(/.*orgs/);
    });

    test("3️⃣ Búsqueda de usuario válido", async ({ page }) => {
        await page.goto("http://localhost:5173/users"); 
        await page.waitForSelector("#username");
        await page.fill("#username", "octocat");
        await page.click("#searchButton");
    
        await page.waitForSelector(".userCard");
        const userCards = page.locator(".row .userCard");
        const cardCount = await userCards.count();
        expect(cardCount).toBeGreaterThan(0);

    });

    test("4️⃣ Búsqueda con usuarios inválidos muestra error o un mensaje", async ({ page }) => {
        await page.goto("http://localhost:5173/users"); 
        await page.fill("#username", "!@#$%^&*()");
        await page.click("#searchButton");
        await page.waitForSelector("#noResultsFound");
        await expect(page.locator("#noResultsFound")).toBeVisible();
    });

    test("5️⃣ Ver perfil en GitHub abre en otra pestaña", async ({ page, context }) => {
        await page.goto("http://localhost:5173/users"); 
        await page.fill("#username", "octocat");
        await page.click("#searchButton");
        const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        page.click(".userCard:first-child .github-button"),
        ]);
        await expect(newPage).toHaveURL(/https:\/\/github\.com\/octocat/);
    });

    test("6️⃣ Tiempo de respuesta menor a 3 segundos", async ({ page }) => {
        await page.goto("http://localhost:5173/users"); 
        await page.fill("#username", "octocat");
        const startTime = Date.now();
        await page.click("#searchButton");
   
        await page.waitForSelector(".userCard");
        const endTime = Date.now();
        expect(endTime - startTime).toBeLessThan(3000);
    });

    test("7️⃣ Búsqueda sin resultados muestra error o un mensaje", async ({ page }) => {
        await page.goto("http://localhost:5173/users"); 
        await page.fill("#username", "fjdgbdfjhgbdjfkbgjkdfbgbjkdbjdbvd");
        await page.click("#searchButton");
        await page.waitForSelector("#noResultsFound");
        await expect(page.locator("#noResultsFound")).toBeVisible();
    });

    test("8️⃣ Cantidad de resultados obtenidos, igual a la cantidad de resultados exhibidos", async ({ page }) => {
        await page.goto("http://localhost:5173/users"); 
        await page.waitForSelector("#username");
        await page.fill("#username", "octocat");
        await page.click("#searchButton");
    
        await page.waitForSelector(".userCard");
        const userCards = page.locator(".row .userCard");
        const cardCount = await userCards.count();
        
        const userCount = await page.locator('#usersCounter').textContent();
        const userCountNumber = parseInt(userCount.replace(/\D/g, ""), 10);
        expect(cardCount).toEqual(userCountNumber);

    });


    // test("7️⃣ Cambiar visualización de resultados", async ({ page }) => {
    //     await page.goto("http://localhost:5173/users"); 
    //     await page.fill("#username", "octocat");
    //     await page.click("#searchButton");

    //     await page.waitForSelector(".userCard");
    //     const userCards = page.locator(".row .userCard");
    //     const cardCount = await userCards.count();
    //     expect(cardCount).toBeGreaterThan(0);

    //     await page.click("#listaCards");
    //     await expect(page.locator(".lista")).toBeVisible();
    // });


});
