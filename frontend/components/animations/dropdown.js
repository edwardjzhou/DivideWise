export const expandSection = function (element) {
  const sectionHeight = element.scrollHeight;

  element.style.height = sectionHeight + "px";

  function finishExpandTransition() {
    element.removeEventListener("transitionend", finishExpandTransition);
    element.style.height = null;
  }

  element.functionStorage = finishExpandTransition;
  element.addEventListener("transitionend", finishExpandTransition);
  element.setAttribute("data-collapsed", "false");
};

export const handleDropdown = function (e) {
  const section = document.querySelector(
    `.section.collapsible#comments` + e.currentTarget.attributes.id.value
  );

  const isCollapsed = section.getAttribute("data-collapsed") === "true";

  if (isCollapsed) {
    expandSection(section);
    section.setAttribute("data-collapsed", "false");
  } else {
    collapseSection(section);
  }
};

export const collapseSection = function (element) {
  element.removeEventListener("transitionend", element.functionStorage);

  const sectionHeight = element.scrollHeight;
  const elementTransition = element.style.transition;
  element.style.transition = "";

  requestAnimationFrame(function () {
    element.style.height = sectionHeight + "px";
    element.style.transition = elementTransition;

    requestAnimationFrame(function () {
      element.style.height = 0 + "px";
    });
  });

  element.setAttribute("data-collapsed", "true");
};
