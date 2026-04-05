(function (global) {
    const namespace = global.ExamReminder || {};

    function parseDateFromDDMMYYYY(dateText) {
        const parts = dateText.split("/").map(Number);
        if (parts.length !== 3 || parts.some(Number.isNaN)) {
            return null;
        }

        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
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
            examDate: examDate,
            inscriptionCloseDate: inscriptionCloseDate,
            reminderOneDate: reminderOneDate,
        };
    }

    namespace.dateUtils = {
        parseDateFromDDMMYYYY: parseDateFromDDMMYYYY,
        formatDateDDMMYYYY: formatDateDDMMYYYY,
        isBusinessDay: isBusinessDay,
        addBusinessDays: addBusinessDays,
        buildReminderSchedule: buildReminderSchedule,
    };

    global.ExamReminder = namespace;
})(window);
