import { searchUsers, searchOrganization, getUserData } from "../utils/axios";

describe("Pruebas de integración con la API de GitHub", () => {
  
  jest.setTimeout(10000); 

  test("Probar la solicitud con caracteres inválidos", async () => {
    const invalidUsername = "!@#$%^&*()"; 
    const result = await searchUsers(invalidUsername);
    
    expect(result).toEqual([]); 
  });
  test("Probar la solicitud con un usuario válido", async () => {
    const validUser = "felipeobz"; 
    const response = await getUserData(validUser);

    expect(response).toHaveProperty("login");
    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("url");
  });

  test("Probar la solicitud con una organización válida", async () => {
    const validOrganization = "github";
    const response = await searchOrganization(validOrganization);
    
    expect(response).toHaveProperty("login");
    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("url");
  });

  test("Validación de uso excesivo del API de GitHub", async () => {
    try {
      for (let i = 0; i < 1000; i++) {
        await searchUsers("octocat"); 
      }
    } catch (error) {
      expect(error.response.status).toBe(403); 
      expect(error.response.data.message).toMatch(/rate limit exceeded/i);
    }
  });

});
