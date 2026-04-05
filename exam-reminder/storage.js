(function (global) {
    const namespace = global.ExamReminder || {};
    const constants = namespace.constants;

    function readArrayFromStorage(key) {
        try {
            const raw = localStorage.getItem(key);
            return JSON.parse(raw || "[]");
        } catch (error) {
            return [];
        }
    }

    function writeArrayToStorage(key, items) {
        localStorage.setItem(key, JSON.stringify(items));
    }

    function getEmailHistory() {
        return readArrayFromStorage(constants.EMAIL_HISTORY_KEY);
    }

    function saveEmailToHistory(email) {
        const normalizedEmail = email.trim().toLowerCase();
        const history = getEmailHistory().filter(function (item) {
            return item !== normalizedEmail;
        });

        history.unshift(normalizedEmail);
        writeArrayToStorage(constants.EMAIL_HISTORY_KEY, history.slice(0, 10));
    }

    function getLastEmailFromHistory() {
        const history = getEmailHistory();
        return history[0] || "";
    }

    function saveReminderSubscription(subscription) {
        const subscriptions = readArrayFromStorage(constants.SUBSCRIPTIONS_KEY);
        subscriptions.push(subscription);
        writeArrayToStorage(constants.SUBSCRIPTIONS_KEY, subscriptions);
    }

    namespace.storage = {
        getEmailHistory: getEmailHistory,
        saveEmailToHistory: saveEmailToHistory,
        getLastEmailFromHistory: getLastEmailFromHistory,
        saveReminderSubscription: saveReminderSubscription,
    };

    global.ExamReminder = namespace;
})(window);
