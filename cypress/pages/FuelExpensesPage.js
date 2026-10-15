class FuelExpensesPage {
  addExpense(carId, carName, mileage, liters, totalCost) {
    cy.intercept("POST", "**/api/expenses").as("createExpense");

    cy.contains("button", "Add an expense").click();

    cy.get("#addExpenseCar option").then(($options) => {
      const matchingOptions = [...$options].filter(
        (option) => option.textContent.trim() === carName
      );

      expect(matchingOptions.length).to.be.greaterThan(0);

      const firstMatchingValue = matchingOptions[0].value;

      cy.get("#addExpenseCar").select(firstMatchingValue);
    });

    cy.get("#addExpenseMileage")
      .clear()
      .type(String(mileage));

    cy.get("#addExpenseLiters")
      .clear()
      .type(String(liters));

    cy.get("#addExpenseTotalCost")
      .clear()
      .type(String(totalCost));

    cy.get(".modal-content")
      .contains("button", "Add")
      .click();

    cy.wait("@createExpense").then(({ request, response }) => {
      expect(response.statusCode).to.be.oneOf([200, 201]);

      expect(request.body.carId).to.equal(carId);
    });

    cy.get(".modal-content").should("not.exist");
  }
}

export default new FuelExpensesPage();