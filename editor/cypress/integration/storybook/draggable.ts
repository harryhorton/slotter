describe("draggable", () => {
  beforeEach(() => {
    cy.viewport("iphone-x");
  });
  it("draggable should be draggable", () => {
    cy.visit(
      "http://localhost:6006/iframe.html?id=components-draggable--test-draggable&viewMode=story"
    );
    cy.get("[data-testid=draggable-element")
      .trigger("dragstart")
      .trigger("drag", { clientX: 100, clientY: 100 })
      .should("contain.text", "isDragging");
  });

  it("dragEnabled false should not be draggable", () => {
    cy.visit(
      "http://localhost:6006/iframe.html?id=components-draggable--test-dragable-disabled&viewMode=story"
    );
    cy.get("[data-testid=draggable-element")
      .trigger("dragstart")
      .trigger("drag", { clientX: 100, clientY: 100 })
      .should("not.contain.text", "isDragging");
  });
  it("should return if isInDragHierarchy nested in drag hierarchy", () => {
    cy.visit(
      "http://localhost:6006/iframe.html?id=components-draggable--test-draggable-is-in-test-hierarchy&viewMode=story"
    );
    cy.get("[data-testid=draggable-element")
      .trigger("dragstart", "top")
      .trigger("drag", { clientX: 100, clientY: 100 })
      .should("contain.text", "isDragging");

    cy.get("[data-testid=draggable-child").should(
      "contain.text",
      "isInDragHierarchy"
    );
  });
});
