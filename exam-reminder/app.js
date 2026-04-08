(function (global) {
    const namespace = global.ExamReminder || {};
    const dateUtils = namespace.dateUtils;
    const storage = namespace.storage;
    const modalApi = namespace.modal;
    const mailer = namespace.mailer;

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function initializeExamReminder() {
        const resultContainer = document.getElementById("result");
        if (!resultContainer) {
            return;
        }

        const modal = modalApi.buildReminderModal();
        const buttonYes = modal.querySelector("#examReminderYes");
        const buttonNo = modal.querySelector("#examReminderNo");
        const buttonBack = modal.querySelector("#examReminderBack");
        const buttonConfirm = modal.querySelector("#examReminderConfirm");
        const buttonClose = modal.querySelector("#examReminderClose");
        const emailInput = modal.querySelector("#examReminderEmail");
        const errorText = modal.querySelector("#examReminderError");
        const questionText = modal.querySelector("#examReminderText");
        const questionActions = modal.querySelector("#examReminderQuestionActions");
        const emailStep = modal.querySelector("#examReminderEmailStep");
        const successBox = modal.querySelector("#examReminderSuccess");
        const successActions = modal.querySelector("#examReminderSuccessActions");
        const confirmButtonInitialText = buttonConfirm.textContent;
        let selectedCall = "";
        let selectedDate = "";

        resultContainer.addEventListener("click", function (event) {
            const targetLink = event.target.closest(".exam-date-link");
            if (!targetLink) {
                return;
            }

            event.preventDefault();
            selectedCall = `Llamado ${targetLink.dataset.llamado}`;
            selectedDate = targetLink.dataset.date;
            modalApi.openReminderModal(modal, selectedCall, selectedDate);
        });

        modal.addEventListener("click", function (event) {
            if (event.target.dataset.close === "true") {
                modalApi.closeReminderModal(modal);
            }
        });

        buttonYes.addEventListener("click", function () {
            questionText.style.display = "none";
            questionActions.style.display = "none";
            emailStep.style.display = "block";
            emailInput.focus();
        });

        buttonNo.addEventListener("click", function () {
            modalApi.closeReminderModal(modal);
        });

        buttonBack.addEventListener("click", function () {
            questionText.style.display = "block";
            emailStep.style.display = "none";
            questionActions.style.display = "flex";
            errorText.style.display = "none";
        });

        buttonConfirm.addEventListener("click", async function () {
            const email = emailInput.value.trim();

            if (!isValidEmail(email)) {
                errorText.style.display = "block";
                return;
            }

            const schedule = dateUtils.buildReminderSchedule(selectedDate);
            if (!schedule) {
                errorText.textContent = "No pude calcular la fecha. Probá de nuevo.";
                errorText.style.display = "block";
                return;
            }

            const closeDateText = dateUtils.formatDateDDMMYYYY(schedule.inscriptionCloseDate);
            const reminderOneText = dateUtils.formatDateDDMMYYYY(schedule.reminderOneDate);

            const subscription = {
                email: email,
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
            };

            buttonConfirm.disabled = true;
            buttonConfirm.textContent = "Enviando...";

            let sendResult = { ok: false, message: "No se pudo enviar el mail." };
            if (mailer && typeof mailer.sendSubscriptionEmail === "function") {
                sendResult = await mailer.sendSubscriptionEmail(subscription);
            } else {
                sendResult = {
                    ok: false,
                    message: "No esta disponible el servicio de envio de mails.",
                };
            }

            buttonConfirm.disabled = false;
            buttonConfirm.textContent = confirmButtonInitialText;

            if (!sendResult.ok) {
                errorText.textContent = sendResult.message;
                errorText.style.display = "block";
                return;
            }

            storage.saveEmailToHistory(email);
            storage.saveReminderSubscription(subscription);

            errorText.style.display = "none";
            emailStep.style.display = "none";
            successBox.innerHTML = `Perfecto. Vamos a enviar <strong>2 recordatorios</strong> a <strong>${email}</strong> para <strong>${selectedCall}</strong> (<span style="color:#2563eb;font-weight:700;">${selectedDate}</span>).<br><br>
                <strong>Recordatorio 1:</strong> ${reminderOneText} (1 día hábil antes del cierre).<br>
                <strong>Recordatorio 2:</strong> ${closeDateText} (último día de inscripción).`;
            successBox.style.display = "block";
            successActions.style.display = "flex";
        });

        buttonClose.addEventListener("click", function () {
            modalApi.closeReminderModal(modal);
        });

        emailInput.addEventListener("input", function () {
            if (errorText.style.display === "block") {
                errorText.style.display = "none";
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && modal.style.display !== "none") {
                modalApi.closeReminderModal(modal);
            }
        });
    }

    document.addEventListener("DOMContentLoaded", initializeExamReminder);
})(window);
