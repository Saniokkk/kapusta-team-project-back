const income = (category) => {
    switch (category) {
        case "salary":
            category = "Дохід";
            break;
        case "extraSalary":
            category = "Доп.дохід";
            break;
        default: category = null;
    }
    return {
        category,
        type: "income",
    };   
}

const expense = (category) => {
    switch (category) {
        case "transport":
            category = "Транспорт";
            break;
        case "products":
            category = "Продукти";
            break;
        case "health":
            category = "Здоровя";
            break;
        case "alcohol":
            category = "Алкоголь";
            break;
        case "entertainment":
            category = "Розваги";
            break;
        case "housing":
            category = "Дім";
            break;
        case "tools":
            category = "Техніка";
            break;
        case "invoice":
            category = "Комуналка";
            break;
        case "hobby":
            category = "Спорт, хобі";
            break;
        case "education":
            category = "Освіта";
            break;
        case "other":
            category = "Інше";
            break;
        default: category = null;
    }
    return {
        category,
        type: "expense",
    };    
}

module.exports = {
    income,
    expense,
}

