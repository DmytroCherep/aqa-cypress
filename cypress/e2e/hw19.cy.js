describe("QAuto home page header and footer", () => {
  beforeEach(() => {
    cy.visit("/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
  });

  it("should display the logo in the header", () => {
    cy.get("header")
      .find("a")
      .first()
      .should("be.visible");
  });

  it("should display all navigation links in the header", () => {
    cy.get("header").within(() => {
      cy.contains("Home").should("be.visible");
      cy.contains("About").should("be.visible");
      cy.contains("Contacts").should("be.visible");
    });
  });

  it("should display login buttons in the header", () => {
    cy.get("header").within(() => {
      cy.contains("Guest log in").should("be.visible");
      cy.contains("Sign In").should("be.visible");
    });
  });

  it("should display all social links in the footer", () => {
    cy.get('a[href*="facebook.com"]').should("be.visible");
    cy.get('a[href*="t.me"]').should("be.visible");
    cy.get('a[href*="youtube.com"]').should("be.visible");
    cy.get('a[href*="instagram.com"]').should("be.visible");
    cy.get('a[href*="linkedin.com"]').should("be.visible");
  });

  it("should display website and email links in the footer", () => {
    cy.contains("a", "ithillel.ua").should("be.visible");

    cy.contains("a", "support@ithillel.ua")
    .should("be.visible")
    .and("have.attr", "href")
    .and("include", "mailto:");
  });
});