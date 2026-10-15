class GaragePage {
  addCar(brand, model, mileage) {
    cy.intercept("POST", "**/api/cars").as("createCar");

    cy.contains("button", "Add car").click();

    cy.get("#addCarBrand").select(brand);
    cy.get("#addCarModel").select(model);

    cy.get("#addCarMileage")
      .clear()
      .type(String(mileage));

    cy.get(".modal-content")
      .contains("button", "Add")
      .click();

    return cy.wait("@createCar").then(({ response }) => {
      expect(response.statusCode).to.be.oneOf([200, 201]);

      return response.body.data.id;
    });
  }

  verifyCarExists(brand, model) {
    cy.contains(`${brand} ${model}`).should("be.visible");
  }

  openFuelExpenses() {
    cy.contains("a", "Fuel expenses").click();

    cy.url().should("include", "/panel/expenses");
  }
}

export default new GaragePage();