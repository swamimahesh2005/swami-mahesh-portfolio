(function () {
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".primary-nav");
  var navLinks = document.querySelectorAll(".primary-nav a");
  var year = document.getElementById("year");
  var form = document.getElementById("contact-form");
  var statusEl = document.getElementById("form-status");
  var toast = document.getElementById("toast");
  var sections = document.querySelectorAll("main section[id]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var githubUrl = (document.body.getAttribute("data-github") || "").trim();
  var linkedinUrl = (document.body.getAttribute("data-linkedin") || "").trim();
  var emailAddress = (document.body.getAttribute("data-email") || "").trim();
  var phoneNumber = (document.body.getAttribute("data-phone") || "").trim();

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function setExternalLink(nodes, url, labelEl) {
    if (!url) return;
    nodes.forEach(function (node) {
      node.setAttribute("href", url);
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noopener noreferrer");
    });
    if (labelEl) {
      labelEl.textContent = url;
    }
  }

  setExternalLink(
    document.querySelectorAll(".js-github"),
    githubUrl,
    document.getElementById("github-url-label")
  );
  setExternalLink(
    document.querySelectorAll(".js-linkedin"),
    linkedinUrl,
    document.getElementById("linkedin-url-label")
  );

  if (emailAddress) {
    document.querySelectorAll(".js-email").forEach(function (node) {
      node.setAttribute("href", "mailto:" + emailAddress);
      node.removeAttribute("target");
      if (node.id === "email-button") {
        node.textContent = emailAddress;
      }
    });
  }

  var phoneLabel = document.getElementById("phone-label");
  if (phoneLabel && phoneNumber) {
    var phoneLink = document.createElement("a");
    phoneLink.href = "tel:" + phoneNumber.replace(/\s/g, "");
    phoneLink.textContent = phoneNumber;
    phoneLabel.replaceWith(phoneLink);
  }

  var roleLine = document.getElementById("role-line");
  if (roleLine && !reduceMotion) {
    var fullText = roleLine.textContent;
    var index = 0;
    roleLine.textContent = "";
    var timer = window.setInterval(function () {
      index += 1;
      roleLine.textContent = fullText.slice(0, index);
      if (index >= fullText.length) {
        window.clearInterval(timer);
      }
    }, 28);
  }

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  function setActiveLink() {
    var scrollPos = window.scrollY + 90;
    var current = "home";

    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop) {
        current = section.id;
      }
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) !== "#") return;
      link.classList.toggle("active", href === "#" + current);
    });
  }

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  var toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.hidden = false;
    toast.textContent = message;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.hidden = true;
    }, 4200);
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = document.getElementById("name").value.trim();
      var email = document.getElementById("email").value.trim();
      var message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        statusEl.textContent = "Please fill in name, email, and message.";
        statusEl.classList.add("error");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        statusEl.textContent = "Please enter a valid email address.";
        statusEl.classList.add("error");
        return;
      }

      statusEl.classList.remove("error");

      if (!emailAddress) {
        statusEl.textContent =
          "Add your real email on the body tag (data-email) so this form can open a mail app.";
        showToast("Email is not set yet. Reply with your address to wire this form.");
        return;
      }

      var subject = encodeURIComponent("Portfolio contact from " + name);
      var body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message);
      window.location.href = "mailto:" + emailAddress + "?subject=" + subject + "&body=" + body;
      statusEl.textContent = "Opening your email app…";
    });
  }
})();
