describe("App", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("Deberá mostrar el titulo", () => {
        cy.get("span").contains("CheatSheets recopiladas");
    });

    it("Deberá mostrar la imagen Blob", () => {
        // Bucle para verificar los primeros 5 elementos :nth-child(4) > img
        for (let i = 1; i <= 5; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(4) > img`).should("be.visible");
        }
    });
});
