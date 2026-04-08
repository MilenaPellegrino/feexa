(function (global) {
    const namespace = global.ExamReminder || {};
    const constants = namespace.constants || {};

    function getApiBaseUrl() {
        return String(constants.REMINDER_API_BASE_URL || "").replace(/\/$/, "");
    }

    async function sendSubscriptionEmail(subscription) {
        if (!constants.REMINDER_API_BASE_URL) {
            return {
                ok: false,
                message: "Falta configurar REMINDER_API_BASE_URL en constants.js.",
            };
        }

        const endpoint = `${getApiBaseUrl()}/api/reminders/subscribe`;

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(subscription),
            });

            const payload = await response.json().catch(function () {
                return null;
            });

            if (response.ok) {
                return { ok: true };
            }

            return {
                ok: false,
                message:
                    (payload && payload.message) ||
                    "No se pudo registrar el recordatorio en el servidor.",
            };
        } catch (error) {
            return {
                ok: false,
                message:
                    "No se pudo conectar con el servidor de recordatorios. Verifica REMINDER_API_BASE_URL y que el backend este levantado.",
                error: error,
            };
        }
    }

    namespace.mailer = {
        sendSubscriptionEmail: sendSubscriptionEmail,
    };

    global.ExamReminder = namespace;
})(window);
