const func = (category, type) => {
    return {
        category,
        type
    }
};

const localizationCategory = (category) => {
    let objCategory;

    switch (category) {
        case "transport":
            objCategory = func("Транспорт", "expense");
            break;
        case "products":
            objCategory = func("Продукти", "expense");
            break;
        case "health":
            objCategory = func("Здоровя", "expense");
            break;
        case "alcohol":
            objCategory = func("Алкоголь", "expense");
            break;
        case "entertainment":
            objCategory = func("Розваги", "expense");
            break;
        case "housing":
            objCategory = func("Дім", "expense");
            break;
        case "tools":
            objCategory = func("Техніка", "expense");
            break;
        case "invoice":
            objCategory = func("Комуналка", "expense");
            break;
        case "hobby":
            objCategory = func("Спорт, хобі", "expense");
            break;
        case "education":
            objCategory = func("Освіта", "expense");
            break;
        case "other":
            objCategory = func("Інше", "expense");
            break;
        case "salary":
            objCategory = func("Дохід", "income");
            break;
        case "extraSalary":
            objCategory = func("Доп.дохід", "income");
            break;
        default: category = null;
    }
    return objCategory;
}

module.exports = localizationCategory;

