(function () {
    const EMAIL_HISTORY_KEY = "examReminderEmailHistory";

    function getEmailHistory() {
        return JSON.parse(localStorage.getItem(EMAIL_HISTORY_KEY) || "[]");
    }

    function saveEmailToHistory(email) {
        const normalizedEmail = email.trim().toLowerCase();
        const history = getEmailHistory().filter(function (item) {
            return item !== normalizedEmail;
        });

        history.unshift(normalizedEmail);
        localStorage.setItem(EMAIL_HISTORY_KEY, JSON.stringify(history.slice(0, 10)));
    }

    function getLastEmailFromHistory() {
        const history = getEmailHistory();
        return history[0] || "";
    }

    function populateEmailHistorySuggestions(modal) {
        const historyList = modal.querySelector("#examReminderEmailHistoryList");
        const history = getEmailHistory();

        historyList.innerHTML = "";
        history.forEach(function (email) {
            const option = document.createElement("option");
            option.value = email;
            historyList.appendChild(option);
        });
    }

    function parseDateFromDDMMYYYY(dateText) {
        const parts = dateText.split("/").map(Number);
        if (parts.length !== 3 || parts.some(Number.isNaN)) {
            return null;
        }

        const [day, month, year] = parts;
        const date = new Date(year, month - 1, day);

        if (
            date.getFullYear() !== year ||
            date.getMonth() !== month - 1 ||
            date.getDate() !== day
        ) {
            return null;
        }

        return date;
    }

    function formatDateDDMMYYYY(date) {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function isBusinessDay(date) {
        const dayOfWeek = date.getDay();
        return dayOfWeek !== 0 && dayOfWeek !== 6;
    }

    function addBusinessDays(baseDate, amount) {
        const date = new Date(baseDate);
        const step = amount >= 0 ? 1 : -1;
        let remaining = Math.abs(amount);

        while (remaining > 0) {
            date.setDate(date.getDate() + step);
            if (isBusinessDay(date)) {
                remaining -= 1;
            }
        }

        return date;
    }

    function buildReminderSchedule(examDateText) {
        const examDate = parseDateFromDDMMYYYY(examDateText);
        if (!examDate) {
            return null;
        }

        const inscriptionCloseDate = addBusinessDays(examDate, -3);
        const reminderOneDate = addBusinessDays(inscriptionCloseDate, -1);

        return {
            examDate,
            inscriptionCloseDate,
            reminderOneDate,
        };
    }

    function saveReminderSubscription(subscription) {
        const storageKey = "examReminderSubscriptions";
        const current = JSON.parse(localStorage.getItem(storageKey) || "[]");
        current.push(subscription);
        localStorage.setItem(storageKey, JSON.stringify(current));
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

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

    function openReminderModal(modal, llamado, examDate) {
        const text = modal.querySelector("#examReminderText");
        text.innerHTML = `¿Querés recibir un recordatorio por mail para <strong>${llamado}</strong> (<span style="color:#2563eb;font-weight:700;">${examDate}</span>)?`;
        text.style.display = "block";

        modal.querySelector("#examReminderQuestionActions").style.display = "flex";
        modal.querySelector("#examReminderEmailStep").style.display = "none";
        modal.querySelector("#examReminderSuccess").style.display = "none";
        modal.querySelector("#examReminderSuccessActions").style.display = "none";
        modal.querySelector("#examReminderError").style.display = "none";
        modal.querySelector("#examReminderError").textContent = "Ingresá un mail válido para continuar.";
        modal.querySelector("#examReminderEmail").value = getLastEmailFromHistory();
        populateEmailHistorySuggestions(modal);

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
        const buttonBack = modal.querySelector("#examReminderBack");
        const buttonConfirm = modal.querySelector("#examReminderConfirm");
        const buttonClose = modal.querySelector("#examReminderClose");
        const emailInput = modal.querySelector("#examReminderEmail");
        const errorText = modal.querySelector("#examReminderError");
        const questionActions = modal.querySelector("#examReminderQuestionActions");
        const emailStep = modal.querySelector("#examReminderEmailStep");
        const successBox = modal.querySelector("#examReminderSuccess");
        const successActions = modal.querySelector("#examReminderSuccessActions");
        let selectedCall = "";
        let selectedDate = "";

        resultContainer.addEventListener("click", function (event) {
            const targetLink = event.target.closest(".exam-date-link");
            if (!targetLink) {
                return;
            }

            event.preventDefault();

            const llamado = `Llamado ${targetLink.dataset.llamado}`;
            const examDate = targetLink.dataset.date;
            selectedCall = llamado;
            selectedDate = examDate;
            openReminderModal(modal, llamado, examDate);
        });

        modal.addEventListener("click", function (event) {
            if (event.target.dataset.close === "true") {
                closeReminderModal(modal);
            }
        });

        buttonYes.addEventListener("click", function () {
            modal.querySelector("#examReminderText").style.display = "none";
            questionActions.style.display = "none";
            emailStep.style.display = "block";
            emailInput.focus();
        });

        buttonNo.addEventListener("click", function () {
            closeReminderModal(modal);
        });

        buttonBack.addEventListener("click", function () {
            modal.querySelector("#examReminderText").style.display = "block";
            emailStep.style.display = "none";
            questionActions.style.display = "flex";
            errorText.style.display = "none";
        });

        buttonConfirm.addEventListener("click", function () {
            const email = emailInput.value.trim();

            if (!isValidEmail(email)) {
                errorText.style.display = "block";
                return;
            }

            saveEmailToHistory(email);

            const schedule = buildReminderSchedule(selectedDate);
            if (!schedule) {
                errorText.textContent = "No pude calcular la fecha. Probá de nuevo.";
                errorText.style.display = "block";
                return;
            }

            const closeDateText = formatDateDDMMYYYY(schedule.inscriptionCloseDate);
            const reminderOneText = formatDateDDMMYYYY(schedule.reminderOneDate);

            saveReminderSubscription({
                email,
                call: selectedCall,
                examDate: selectedDate,
                inscriptionCloseDate: closeDateText,
                reminders: [
                    {
                        type: "oneBusinessDayBeforeClose",
                        date: reminderOneText,
                    },
                    {
                        type: "closeDate",
                        date: closeDateText,
                    },
                ],
                createdAt: new Date().toISOString(),
            });

            errorText.style.display = "none";
            emailStep.style.display = "none";
            successBox.innerHTML = `Perfecto. Vamos a enviar <strong>2 recordatorios</strong> a <strong>${email}</strong> para <strong>${selectedCall}</strong> (<span style="color:#2563eb;font-weight:700;">${selectedDate}</span>).<br><br>
                <strong>Recordatorio 1:</strong> ${reminderOneText} (1 día hábil antes del cierre).<br>
                <strong>Recordatorio 2:</strong> ${closeDateText} (último día de inscripción).`;
            successBox.style.display = "block";
            successActions.style.display = "flex";
        });

        buttonClose.addEventListener("click", function () {
            closeReminderModal(modal);
        });

        emailInput.addEventListener("input", function () {
            if (errorText.style.display === "block") {
                errorText.style.display = "none";
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && modal.style.display !== "none") {
                closeReminderModal(modal);
            }
        });
    });
})();
