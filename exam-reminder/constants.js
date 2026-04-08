(function (global) {
    const namespace = global.ExamReminder || {};

    namespace.constants = {
        EMAIL_HISTORY_KEY: "examReminderEmailHistory",
        SUBSCRIPTIONS_KEY: "examReminderSubscriptions",
        REMINDER_API_BASE_URL: "http://localhost:8787",
    };

    global.ExamReminder = namespace;
})(window);
