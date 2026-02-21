document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".login-button");
    button?.addEventListener("click", () => {
        window.location.href = "/api/auth/login";
    });
});
//# sourceMappingURL=index.js.map