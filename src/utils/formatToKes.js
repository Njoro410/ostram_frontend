const formatToKES = (amount) => {
    return `KSh ${parseFloat(amount).toLocaleString("en-KE")}`;
};

export default formatToKES