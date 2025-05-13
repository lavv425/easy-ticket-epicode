export const readableDate = (date) => {
    if (!date) return null;

    if (!(date instanceof Date)) {
        date = new Date(date);

        if (isNaN(d.getTime())) {
            return null;
        }
    }

    return new Date(date).toLocaleDateString("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}