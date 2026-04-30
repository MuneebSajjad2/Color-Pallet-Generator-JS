const generateBTN = document.getElementById("generate-btn")
const palletContainer = document.querySelector(".pallet-container");


// Event Listeners
generateBTN.addEventListener("click", generatePallet)
palletContainer.addEventListener("click", (e) => {
    const target = e.target;
    // Check if clicked element is the button or the text
    const btn = target.classList.contains("copyBtn") ? target : target.querySelector(".copyBtn");
    const hexValue = target.closest(".color-box").querySelector(".hex-value").textContent.trim();

    if (hexValue) {
        navigator.clipboard.writeText(hexValue)
            .then(() => showSuccess(btn)) // Pass the specific button here
            .catch((err) => console.log(err));
    }
});

//Functions


function generatePallet() {
    const colors = [];
    for (let i = 0; i < 5; i++) {

        colors.push(generateRandomColor());
    }


    displayPallet(colors);
}

function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;

}


function displayPallet(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");
    colorBoxes.forEach((box, index) => {
        const color = colors[index];
        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");

        colorDiv.style.backgroundColor = color;
        hexValue.innerHTML = color + "  " + '<i class="fa-regular fa-copy copyBtn"></i>';
    });
}


function showSuccess(btn) {
    if (!btn) return;

    btn.classList.replace("fa-copy", "fa-check");
    btn.classList.replace("fa-regular", "fa-solid");
    btn.style.color = "#48bb78";

    setTimeout(() => {
        btn.classList.replace("fa-check", "fa-copy");
        btn.classList.replace("fa-solid", "fa-regular");
        btn.style.color = "#000";
    }, 1500);
}
