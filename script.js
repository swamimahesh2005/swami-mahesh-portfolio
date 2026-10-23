(function () {
  "use strict";

  // Elements
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".primary-nav");
  var navLinks = document.querySelectorAll(".primary-nav a");
  var year = document.getElementById("year");
  var form = document.getElementById("contact-form");
  var statusEl = document.getElementById("form-status");
  var toast = document.getElementById("toast");
  var sections = document.querySelectorAll("main section[id]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Swami's Profile Information (from Resume)
  var SWAMI_DATA = {
    name: "Mahesh Sangram Swami",
    displayName: "Swami Mahesh Sangram",
    phone: "+91 9022731301",
    phoneClean: "9022731301",
    email: "swamimahesh202@gmail.com",
    whatsapp: "919022731301",
    college: "M.G.M.'s College of Engineering, Nanded",
    university: "DBATU Lonere",
    cgpa: "7.58",
    batch: "2023 – 2027",
    degree: "B.E. / B.Tech in Information Technology",
    location: "Nanded, Maharashtra, India",
    github: "https://github.com/swammahesh2005",
    linkedin: "https://www.linkedin.com/in/mahesh-sangram-swami-915a6028b"
  };

  // Sync year
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  // Set external links helper
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

  // Bind GitHub & LinkedIn links
  setExternalLink(
    document.querySelectorAll(".js-github"),
    SWAMI_DATA.github,
    document.getElementById("github-url-label")
  );
  setExternalLink(
    document.querySelectorAll(".js-linkedin"),
    SWAMI_DATA.linkedin,
    document.getElementById("linkedin-url-label")
  );

  // Bind Email links
  document.querySelectorAll(".js-email").forEach(function (node) {
    node.setAttribute("href", "mailto:" + SWAMI_DATA.email);
    node.removeAttribute("target");
    if (node.id === "email-button") {
      node.textContent = SWAMI_DATA.email;
    }
  });

  // Bind Phone
  var phoneLabel = document.getElementById("phone-label");
  if (phoneLabel) {
    var phoneLink = document.createElement("a");
    phoneLink.href = "tel:" + SWAMI_DATA.phone.replace(/\s/g, "");
    phoneLink.textContent = SWAMI_DATA.phone;
    phoneLabel.replaceWith(phoneLink);
  }

  // Dynamic Multi-Role Typing Effect
  var roleLine = document.getElementById("role-line");
  if (roleLine && !reduceMotion) {
    var roles = [
      "Full Stack Developer",
      "IT Engineering Student @ MGM Nanded",
      "Cybersecurity Enthusiast",
      "Software & Web Developer"
    ];
    var rIndex = 0;
    var cIndex = 0;
    var isDeleting = false;
    var typeSpeed = 60;

    function tick() {
      var currentRole = roles[rIndex];
      if (isDeleting) {
        cIndex--;
        roleLine.textContent = currentRole.substring(0, cIndex);
      } else {
        cIndex++;
        roleLine.textContent = currentRole.substring(0, cIndex);
      }

      var speed = isDeleting ? 30 : typeSpeed;

      if (!isDeleting && cIndex === currentRole.length) {
        speed = 1800; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && cIndex === 0) {
        isDeleting = false;
        rIndex = (rIndex + 1) % roles.length;
        speed = 400; // Pause before typing next
      }

      window.setTimeout(tick, speed);
    }

    tick();
  }

  // Mobile Navigation toggle
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

  // Active section indicator
  function setActiveLink() {
    var scrollPos = window.scrollY + 100;
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

  // Toast Notification
  var toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.hidden = false;
    toast.textContent = message;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.hidden = true;
    }, 4500);
  }

  // -------------------------------------------------------------------------
  // CONTACT MODAL SYSTEM: "After that any people contact me then show my data"
  // -------------------------------------------------------------------------
  var contactModalBackdrop = document.getElementById("contact-data-modal");
  var modalCloseBtn = document.getElementById("modal-close-btn");
  var openModalBtns = document.querySelectorAll(".js-open-data-modal");
  var vcardDownloadBtn = document.getElementById("download-vcard-btn");

  function openContactModal(customMessage) {
    if (!contactModalBackdrop) return;
    contactModalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";

    var noteEl = document.getElementById("modal-custom-note");
    if (noteEl && customMessage) {
      noteEl.textContent = customMessage;
      noteEl.style.display = "block";
    }
  }

  function closeContactModal() {
    if (!contactModalBackdrop) return;
    contactModalBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeContactModal);
  }

  if (contactModalBackdrop) {
    contactModalBackdrop.addEventListener("click", function (e) {
      if (e.target === contactModalBackdrop) {
        closeContactModal();
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && contactModalBackdrop && contactModalBackdrop.classList.contains("active")) {
      closeContactModal();
    }
  });

  openModalBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openContactModal("Here is Swami's complete contact card and personal data. Feel free to call, WhatsApp, or email directly!");
    });
  });

  // Generate & Download vCard
  function downloadVCard() {
    var vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:" + SWAMI_DATA.name,
      "N:Sangram;Swami;Mahesh;;",
      "TITLE:" + SWAMI_DATA.degree + " - Full Stack & Cyber",
      "ORG:" + SWAMI_DATA.college,
      "TEL;TYPE=CELL,VOICE:" + SWAMI_DATA.phone,
      "EMAIL;TYPE=INTERNET,PREF:" + SWAMI_DATA.email,
      "URL:" + SWAMI_DATA.github,
      "ADR;TYPE=HOME:;;" + SWAMI_DATA.location + ";;;",
      "NOTE:IT Engineering Student (2023-2027), DBATU. Contacted via portfolio website.",
      "END:VCARD"
    ].join("\r\n");

    var blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "Swami_Mahesh_Sangram.vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Contact card (vCard) downloaded to your device!");
  }

  if (vcardDownloadBtn) {
    vcardDownloadBtn.addEventListener("click", downloadVCard);
  }

  // LocalStorage message storing & viewing
  function saveInquiry(inquiry) {
    try {
      var existing = JSON.parse(localStorage.getItem("swami_portfolio_inquiries") || "[]");
      existing.unshift(inquiry);
      localStorage.setItem("swami_portfolio_inquiries", JSON.stringify(existing));
      renderInquiries();
    } catch (e) {
      console.warn("Storage error", e);
    }
  }

  function renderInquiries() {
    var listEl = document.getElementById("inbox-list");
    var countEl = document.getElementById("inbox-count");
    if (!listEl) return;

    try {
      var inquiries = JSON.parse(localStorage.getItem("swami_portfolio_inquiries") || "[]");
      if (countEl) countEl.textContent = "(" + inquiries.length + ")";

      if (inquiries.length === 0) {
        listEl.innerHTML = '<p class="muted" style="font-size:0.82rem; margin:0.5rem 0;">No messages stored in this browser yet.</p>';
        return;
      }

      listEl.innerHTML = inquiries
        .map(function (item) {
          return (
            '<div class="inbox-item">' +
            '<div class="inbox-meta"><strong>' +
            escapeHtml(item.name) +
            "</strong> <span>" +
            item.date +
            "</span></div>" +
            '<div style="font-size:0.75rem; color:#93a4bb;">' +
            escapeHtml(item.email) +
            "</div>" +
            '<p class="inbox-text">' +
            escapeHtml(item.message) +
            "</p>" +
            "</div>"
          );
        })
        .join("");
    } catch (e) {
      console.warn(e);
    }
  }

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text || "";
    return div.innerHTML;
  }

  var inboxToggle = document.getElementById("toggle-inbox-btn");
  var inboxDrawer = document.getElementById("inbox-drawer");
  if (inboxToggle && inboxDrawer) {
    inboxToggle.addEventListener("click", function () {
      inboxDrawer.classList.toggle("active");
      renderInquiries();
    });
  }

  // Handle Contact Form Submit
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var nameInput = document.getElementById("name");
      var emailInput = document.getElementById("email");
      var messageInput = document.getElementById("message");

      var name = nameInput.value.trim();
      var email = emailInput.value.trim();
      var message = messageInput.value.trim();

      if (!name || !email || !message) {
        statusEl.textContent = "Please fill in all fields (name, email, and message).";
        statusEl.classList.add("error");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        statusEl.textContent = "Please enter a valid email address.";
        statusEl.classList.add("error");
        return;
      }

      statusEl.classList.remove("error");

      // Save inquiry to localStorage
      var inquiryData = {
        name: name,
        email: email,
        message: message,
        date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      saveInquiry(inquiryData);

      // Reset form
      nameInput.value = "";
      emailInput.value = "";
      messageInput.value = "";

      // Show immediate status
      statusEl.textContent = "✓ Message recorded! Showing Swami Mahesh's contact details...";

      // Open Modal to show Swami's full data
      openContactModal(
        "Thank you, " + name + "! Your inquiry has been logged. Swami's contact information is displayed below so you can connect directly via WhatsApp, Call, or Email."
      );

      // Pre-populate modal mail button
      var modalMailBtn = document.getElementById("modal-direct-mail");
      if (modalMailBtn) {
        var subject = encodeURIComponent("Portfolio Inquiry from " + name);
        var body = encodeURIComponent("Hello Swami Mahesh,\n\n" + message + "\n\nFrom: " + name + " (" + email + ")");
        modalMailBtn.href = "mailto:" + SWAMI_DATA.email + "?subject=" + subject + "&body=" + body;
      }

      // Pre-populate WhatsApp button
      var modalWaBtn = document.getElementById("modal-direct-wa");
      if (modalWaBtn) {
        var waText = encodeURIComponent("Hi Swami Mahesh! My name is " + name + " (" + email + "). " + message);
        modalWaBtn.href = "https://wa.me/" + SWAMI_DATA.whatsapp + "?text=" + waText;
      }

      showToast("Thank you " + name + "! Swami's contact data has opened on screen.");
    });
  }

  // Quick Copy Helper
  window.copyToClipboard = function (text, message) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast(message || "Copied to clipboard!");
      });
    } else {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      showToast(message || "Copied to clipboard!");
    }
  };

  // Initial render of inquiries
  renderInquiries();
})();
