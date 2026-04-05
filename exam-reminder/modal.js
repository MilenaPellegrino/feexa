(function (global) {
    const namespace = global.ExamReminder || {};
    const storage = namespace.storage;

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
                <div id="examReminderQuestionActions" style="margin-top:16px;display:flex;justify-content:flex-end;gap:10px;">
                    <button type="button" id="examReminderYes" style="padding:10px 14px;border:none;border-radius:8px;background:#2563eb;color:#fff;cursor:pointer;">Sí</button>
                    <button type="button" id="examReminderNo" style="padding:10px 14px;border:none;border-radius:8px;background:#e5e7eb;color:#111827;cursor:pointer;">No</button>
                </div>

                <div id="examReminderEmailStep" style="display:none;margin-top:16px;padding-top:14px;border-top:1px solid #e5e7eb;">
                    <label for="examReminderEmail" style="display:block;font-size:14px;font-weight:600;margin-bottom:6px;color:#334155;">Tu correo electrónico</label>
                    <input id="examReminderEmail" type="email" list="examReminderEmailHistoryList" autocomplete="email" placeholder="nombre@mi.unc.edu.ar" style="width:100%;padding:10px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:15px;outline:none;" />
                    <datalist id="examReminderEmailHistoryList"></datalist>
                    <p style="margin:10px 0 0 0;font-size:13px;line-height:1.45;color:#475569;">Te vamos a avisar un día antes del último día de inscripción y también el último día de inscripción.</p>
                    <p id="examReminderError" style="display:none;margin:10px 0 0 0;font-size:13px;color:#dc2626;">Ingresá un mail válido para continuar.</p>
                    <div style="margin-top:14px;display:flex;justify-content:flex-end;gap:10px;">
                        <button type="button" id="examReminderBack" style="padding:10px 14px;border:none;border-radius:8px;background:#e5e7eb;color:#111827;cursor:pointer;">Volver</button>
                        <button type="button" id="examReminderConfirm" style="padding:10px 14px;border:none;border-radius:8px;background:#1d4ed8;color:#fff;cursor:pointer;">Confirmar</button>
                    </div>
                </div>

                <div id="examReminderSuccess" style="display:none;margin-top:16px;padding:12px;border-radius:10px;background:#eff6ff;color:#1e3a8a;font-size:14px;line-height:1.5;"></div>
                <div id="examReminderSuccessActions" style="display:none;margin-top:12px;justify-content:flex-end;">
                    <button type="button" id="examReminderClose" style="padding:10px 14px;border:none;border-radius:8px;background:#2563eb;color:#fff;cursor:pointer;">Entendido</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        return modal;
    }

    function populateEmailHistorySuggestions(modal) {
        const historyList = modal.querySelector("#examReminderEmailHistoryList");
        const history = storage.getEmailHistory();

        historyList.innerHTML = "";
        history.forEach(function (email) {
            const option = document.createElement("option");
            option.value = email;
            historyList.appendChild(option);
        });
    }

    function openReminderModal(modal, llamado, examDate) {
        const text = modal.querySelector("#examReminderText");
        const emailInput = modal.querySelector("#examReminderEmail");
        const errorText = modal.querySelector("#examReminderError");

        text.innerHTML = `¿Querés recibir un recordatorio por mail para <strong>${llamado}</strong> (<span style="color:#2563eb;font-weight:700;">${examDate}</span>)?`;
        text.style.display = "block";

        modal.querySelector("#examReminderQuestionActions").style.display = "flex";
        modal.querySelector("#examReminderEmailStep").style.display = "none";
        modal.querySelector("#examReminderSuccess").style.display = "none";
        modal.querySelector("#examReminderSuccessActions").style.display = "none";

        errorText.style.display = "none";
        errorText.textContent = "Ingresá un mail válido para continuar.";

        emailInput.value = storage.getLastEmailFromHistory();
        populateEmailHistorySuggestions(modal);

        modal.style.display = "flex";
    }

    function closeReminderModal(modal) {
        modal.style.display = "none";
    }

    namespace.modal = {
        buildReminderModal: buildReminderModal,
        openReminderModal: openReminderModal,
        closeReminderModal: closeReminderModal,
    };

    global.ExamReminder = namespace;
})(window);
