describe("HW 20.1 - Registration", () => {
  const openRegistration = () => {
    cy.visit("/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });

    cy.contains("button", "Sign up").click();

    cy.contains("Registration").should("be.visible");
  };

  const checkInvalidField = (selector, message) => {
    cy.get(selector).should("have.class", "is-invalid");

    cy.get(selector)
      .parent()
      .contains(message)
      .should("be.visible");
  };

  beforeEach(() => {
    openRegistration();
  });

  it("should show errors for all required fields", () => {
    cy.get("#signupName").focus().blur();
    checkInvalidField("#signupName", "Name required");

    cy.get("#signupLastName").focus().blur();
    checkInvalidField("#signupLastName", "Last name required");

    cy.get("#signupEmail").focus().blur();
    checkInvalidField("#signupEmail", "Email required");

    cy.get("#signupPassword").focus().blur();
    checkInvalidField("#signupPassword", "Password required");

    cy.get("#signupRepeatPassword").focus().blur();
    checkInvalidField(
      "#signupRepeatPassword",
      "Re-enter password required"
    );

    cy.contains("button", "Register").should("be.disabled");
  });

  it("should validate Name field", () => {
    cy.get("#signupName")
      .type("Dmytro1")
      .blur();

    checkInvalidField("#signupName", "Name is invalid");

    cy.get("#signupName")
      .clear()
      .type("D")
      .blur();

    checkInvalidField(
      "#signupName",
      "Name has to be from 2 to 20 characters long"
    );

    cy.get("#signupName")
      .clear()
      .type("ABCDEFGHIJKLMNOPQRSTU")
      .blur();

    checkInvalidField(
      "#signupName",
      "Name has to be from 2 to 20 characters long"
    );

    const validName = " Dmytro ".trim();

    cy.get("#signupName")
      .clear()
      .type(validName)
      .blur()
      .should("have.value", "Dmytro")
      .and("not.have.class", "is-invalid");
  });

  it("should validate Last name field", () => {
    cy.get("#signupLastName")
      .type("Tester1")
      .blur();

    checkInvalidField(
      "#signupLastName",
      "Last name is invalid"
    );

    cy.get("#signupLastName")
      .clear()
      .type("T")
      .blur();

    checkInvalidField(
      "#signupLastName",
      "Last name has to be from 2 to 20 characters long"
    );

    cy.get("#signupLastName")
      .clear()
      .type("ABCDEFGHIJKLMNOPQRSTU")
      .blur();

    checkInvalidField(
      "#signupLastName",
      "Last name has to be from 2 to 20 characters long"
    );

    const validLastName = " Tester ".trim();

    cy.get("#signupLastName")
      .clear()
      .type(validLastName)
      .blur()
      .should("have.value", "Tester")
      .and("not.have.class", "is-invalid");
  });

  it("should validate Email field", () => {
    cy.get("#signupEmail")
      .type("wrong-email")
      .blur();

    checkInvalidField(
      "#signupEmail",
      "Email is incorrect"
    );
  });

  it("should validate Password and Re-enter password fields", () => {
    cy.get("#signupPassword")
      .type("password", {
        sensitive: true,
      })
      .blur();

    checkInvalidField(
      "#signupPassword",
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    cy.get("#signupPassword")
      .clear()
      .type("Test12345", {
        sensitive: true,
      });

    cy.get("#signupRepeatPassword")
      .type("Test12346", {
        sensitive: true,
      })
      .blur();

    checkInvalidField(
      "#signupRepeatPassword",
      "Passwords do not match"
    );

    cy.contains("button", "Register").should("be.disabled");
  });

  it("should register a new user and login using custom command", () => {
    const email = `dmytro.qa.${Date.now()}@gmail.com`;
    const password = "Test12345";

    cy.get("#signupName").type("Dmytro");
    cy.get("#signupLastName").type("Tester");
    cy.get("#signupEmail").type(email);

    cy.get("#signupPassword").type(password, {
      sensitive: true,
    });

    cy.get("#signupRepeatPassword").type(password, {
      sensitive: true,
    });

    cy.contains("button", "Register")
      .should("be.enabled")
      .click();

    cy.url().should("include", "/panel/garage");

    cy.clearCookies();
    cy.clearLocalStorage();

    cy.login(email, password);
  });
});