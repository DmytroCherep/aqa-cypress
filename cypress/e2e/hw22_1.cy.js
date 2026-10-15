import GaragePage from "../pages/GaragePage";

describe("HW 22.1 - API testing with Cypress", () => {
  const brand = "Audi";
  const model = "TT";

  const initialMileage =
    100000 + (Date.now() % 800000);

  const expenseMileage = initialMileage + 10;
  const liters = 20;
  const totalCost = 40;

  let createdCarId;

  const login = () => {
    cy.visit("/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });

    cy.env(["userEmail", "userPassword"]).then(
      ({ userEmail, userPassword }) => {
        cy.contains("button", "Sign In").click();

        cy.get("#signinEmail")
          .clear()
          .type(userEmail);

        cy.get("#signinPassword")
          .clear()
          .type(userPassword, {
            log: false,
          });

        cy.contains("button", "Login").click();

        cy.url().should("include", "/panel/garage");
      }
    );
  };

  before(() => {
    login();

    GaragePage.addCar(
      brand,
      model,
      initialMileage
    ).then((carId) => {
      createdCarId = carId;

      expect(createdCarId).to.exist;
    });
  });

  it("should verify car via API, create expense via API and verify it in UI", () => {
    cy.request({
      method: "GET",
      url: "/api/cars",

      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal("ok");
      expect(response.body.data).to.be.an("array");

      const createdCar = response.body.data.find(
        (car) => car.id === createdCarId
      );

      expect(createdCar).to.exist;
      expect(createdCar.id).to.equal(createdCarId);
      expect(createdCar.brand).to.equal(brand);
      expect(createdCar.model).to.equal(model);
      expect(createdCar.mileage).to.equal(
        initialMileage
      );
    });

    const today = new Date();

    const reportedAt =
      `${today.getFullYear()}-` +
      `${String(today.getMonth() + 1).padStart(2, "0")}-` +
      `${String(today.getDate()).padStart(2, "0")}`;

    cy.createExpense({
      carId: createdCarId,
      reportedAt,
      mileage: expenseMileage,
      liters,
      totalCost,
      forceMileage: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201]);
      expect(response.body.status).to.equal("ok");
    });

    GaragePage.openFuelExpenses();

    cy.contains(String(expenseMileage))
      .should("be.visible");

    cy.contains(`${liters}L`)
      .should("be.visible");

    cy.contains(String(totalCost))
      .should("be.visible");
  });
});