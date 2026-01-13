const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const form = document.getElementById("payment-form");
const formCard = document.getElementById("form-card");
const statusCard = document.getElementById("status");
const statusText = document.getElementById("status-text");
const resetBtn = document.getElementById("reset-btn");

const subtotalNode = document.getElementById("subtotal");
const processingNode = document.getElementById("processing");
const totalNode = document.getElementById("total");

const BASE_TUITION = 25500;

function recalcTotals() {
  const subtotal = BASE_TUITION;
  const processing = Math.round(subtotal * 0.0025);
  const total = subtotal + processing;

  subtotalNode.textContent = currency.format(subtotal);
  processingNode.textContent = currency.format(processing);
  totalNode.textContent = currency.format(total);
}

function getLast4(val) {
  const digits = (val || "").replace(/\D/g, "");
  return digits.slice(-4) || "----";
}

function buildSummary(data) {
  const name = data.get("studentName");
  const id = data.get("studentId");
  const course = data.get("course");
  const semester = data.get("semester");
  const amount = totalNode.textContent;
  const bank = data.get("bankName");
  const mode = data.get("paymentMode");
  const accLast = getLast4(data.get("accountNumber"));

  return `Payment request for ${name} (${id}), ${course} Sem ${semester}. ${amount} to be debited via ${mode} from ${bank} account ending ${accLast}. This demo keeps data in-browser only.`;
}

function attachListeners() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    recalcTotals();

    const formData = new FormData(form);
    statusText.textContent = buildSummary(formData);

    formCard.classList.add("hidden");
    statusCard.classList.remove("hidden");
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    recalcTotals();
    statusCard.classList.add("hidden");
    formCard.classList.remove("hidden");
  });
}

function init() {
  attachListeners();
  recalcTotals();
}

init();

