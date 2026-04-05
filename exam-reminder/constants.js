(function (global) {
    const namespace = global.ExamReminder || {};

    namespace.constants = {
        EMAIL_HISTORY_KEY: "examReminderEmailHistory",
        SUBSCRIPTIONS_KEY: "examReminderSubscriptions",
    };

    global.ExamReminder = namespace;
})(window);
