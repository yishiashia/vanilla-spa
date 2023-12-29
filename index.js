(function () {
  // Register Service Worker
  const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("./sw.js", {
          scope: "/",
        });
        if (registration.installing) {
          console.log("Service worker installing");
        } else if (registration.waiting) {
          console.log("Service worker installed");
        } else if (registration.active) {
          console.log("Service worker active");
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
  };

  registerServiceWorker();

  // init
  window.onload = async function () {
    let counter = 0;
    const btn = document.getElementById("test-btn");
    const resultSpan = document.getElementById("result");
    if (btn !== null) {
      btn.addEventListener("click", function () {
        counter++;
        resultSpan.textContent = `Counter: ${counter}`;
      });
    }
  };
})();
