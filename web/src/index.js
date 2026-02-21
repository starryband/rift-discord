document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".login-button");
    button === null || button === void 0 ? void 0 : button.addEventListener("click", function () {
        window.location.href = "/api/auth/login";
    });
});
