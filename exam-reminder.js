(function () {
    function buildReminderModal() {
        const existingModal = document.getElementById("examReminderModal");
        if (existingModal) {
            return existingModal;
        }

        const modal = document.createElement("div");
        modal.id = "examReminderModal";
        modal.style.position = "fixed";
        modal.style.inset = "0";
        modal.style.zIndex = "1000";
        modal.style.display = "none";
        modal.style.alignItems = "center";
        modal.style.justifyContent = "center";
        modal.style.padding = "16px";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-labelledby", "examReminderTitle");

        modal.innerHTML = `
            <div data-close="true" style="position:absolute;inset:0;background:rgba(15,23,42,.5);"></div>
            <div style="position:relative;background:#fff;border-radius:14px;box-shadow:0 14px 30px rgba(0,0,0,.2);padding:22px;max-width:420px;width:100%;z-index:1001;color:#1f2937;">
                <h2 id="examReminderTitle" style="margin:0 0 8px 0;font-size:22px;color:#0f172a;">Recordatorio de inscripción</h2>
                <p id="examReminderText" style="margin:0;font-size:16px;line-height:1.5;">¿Querés recibir un recordatorio para esta fecha?</p>
                <div style="margin-top:16px;display:flex;justify-content:flex-end;gap:10px;">
                    <button type="button" id="examReminderYes">Sí</button>
                    <button type="button" id="examReminderNo">No</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        return modal;
    }

    function openReminderModal(modal, llamado, examDate) {
        const text = modal.querySelector("#examReminderText");
        text.innerHTML = `¿Querés recibir un recordatorio por mail para <strong>${llamado}</strong> (<span style="color:#2563eb;font-weight:700;">${examDate}</span>)?`;
        modal.style.display = "flex";
    }

    function closeReminderModal(modal) {
        modal.style.display = "none";
    }

    document.addEventListener("DOMContentLoaded", function () {
        const resultContainer = document.getElementById("result");
        if (!resultContainer) {
            return;
        }

        const modal = buildReminderModal();
        const buttonYes = modal.querySelector("#examReminderYes");
        const buttonNo = modal.querySelector("#examReminderNo");

        resultContainer.addEventListener("click", function (event) {
            const targetLink = event.target.closest(".exam-date-link");
            if (!targetLink) {
                return;
            }

            event.preventDefault();

            const llamado = `Llamado ${targetLink.dataset.llamado}`;
            const examDate = targetLink.dataset.date;
            openReminderModal(modal, llamado, examDate);
        });

        modal.addEventListener("click", function (event) {
            if (event.target.dataset.close === "true") {
                closeReminderModal(modal);
            }
        });

        buttonYes.addEventListener("click", function () {
            alert("Eligio si hacer algo ");
            closeReminderModal(modal);
        });

        buttonNo.addEventListener("click", function () {
            closeReminderModal(modal);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && modal.style.display !== "none") {
                closeReminderModal(modal);
            }
        });
    });
})();
