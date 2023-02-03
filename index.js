const modes = [
    "Monochrome",
    "Monochrome-dark",
    "Monochrome-light",
    "Analogic",
    "Complement",
    "Analogic-complement",
    "Triad",
];

const colorForm = document.getElementById("color-form");
const schemeContainer = document.getElementById("scheme-container");
let schemes = [];

colorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(colorForm);
    const colorHex = formData.get("color").slice(1);
    const mode = formData.get("mode");
    const count = 5;
    const url = `https://www.thecolorapi.com/scheme?hex=${colorHex}&mode=${mode}&count=${count}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            schemes = data.colors;
            renderSchemes();
        });
});

function renderSchemes() {
    const schemesHtml = schemes
        .map((scheme) => {
            const hexValue = scheme.hex.value;
            const schemeHtml = `
            <div class="scheme">
                <div class="scheme-color" style="background: ${hexValue}" data-hex="${hexValue}"></div>
                <div class="scheme-hex" data-hex="${hexValue}">${hexValue}</div>
            </div>
        `;
            return schemeHtml;
        })
        .join("");
    schemeContainer.innerHTML = schemesHtml;
    schemeContainer.addEventListener("click", (event) => {
        const hexValue = event.target.getAttribute("data-hex");
        navigator.clipboard.writeText(hexValue);
    });
}

function renderModes() {
    const optionsHtml = modes.map(
        (mode) => `
        <option value="${mode.toLowerCase()}">${mode}</option>
    `
    );
    document.getElementById("mode").innerHTML = optionsHtml;
}

renderModes();
