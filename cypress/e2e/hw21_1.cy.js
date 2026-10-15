import GaragePage from "../pages/GaragePage";
import FuelExpensesPage from "../pages/FuelExpensesPage";

describe("HW 21.1 - Garage and fuel expenses", () => {
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

  beforeEach(() => {
    login();
  });

  it("should add a car and add fuel expense for it", () => {
    const brand = "Audi";
    const model = "TT";
    const carName = `${brand} ${model}`;

    const initialMileage = 100;
    const expenseMileage = 110;
    const liters = 20;
    const totalCost = 40;

    GaragePage.addCar(
      brand,
      model,
      initialMileage
    ).then((carId) => {
      GaragePage.verifyCarExists(
        brand,
        model
      );

      GaragePage.openFuelExpenses();

      FuelExpensesPage.addExpense(
        carId,
        carName,
        expenseMileage,
        liters,
        totalCost
      );
    });
  });
});