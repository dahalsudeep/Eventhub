export const formatDate = (dateString) => {
    if (!dateString) return "Invalid date";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  