const createError = require("../helpers/createError");
const { User, Income, Expense } = require("../models");

class ReportController{
    async getReportByMonth(req, res) {
        const { _id } = req.user;
        const { month, year } = req.params;

        const result = await User.findById(
        _id,
        "-createdAt -updatedAt -password -token"
        );

        if (!result) {
        throw createError(404, "User not found");
        }

        const incomeTransactions = await Income.find({ owner: _id });

        const incomeForMonthOfYear = incomeTransactions.filter(({ date }) => {
            const operationYear = date.getFullYear().toString();
            const operationMonth = (date.getMonth() + 1).toString();

            return operationYear === year && operationMonth === month;
        });
            
        const expenseTransactions = await Expense.find({ owner: _id });

        const expenseForMonthOfYear = expenseTransactions.filter(({ date }) => {
            const operationYear = date.getFullYear().toString();
            const operationMonth = (date.getMonth() + 1).toString();

            return operationYear === year && operationMonth === month;
        });

        const totalIncome = incomeForMonthOfYear.reduce((prevValue, { sum }) => prevValue + sum, 0);
        const totalExpense = expenseForMonthOfYear.reduce((prevValue, { sum }) => prevValue + sum, 0);

        console.log(incomeForMonthOfYear);

        const totalIncomeByCategory = incomeForMonthOfYear.reduce((stack, { category, sum }, index) => {
            stack[category] ? stack[category] = stack[category] + sum : stack[category] = sum
            return stack
        }, {});
        const totalExpanseByCategory = expenseForMonthOfYear.reduce((stack, { category, sum }, index) => {
            stack[category] ? stack[category] = stack[category] + sum : stack[category] = sum
            return stack
        }, {});

        res.status(200).json({
            totalIncome,
            totalExpense,
            totalIncomeByCategory,
            totalExpanseByCategory,
        });
    }

    async getReportByMonthsSum(req, res) {
        const { _id } = req.user;
        const { type } = req.params;

        const currentYear = new Date().getFullYear();
        console.log(type);
        console.log(currentYear);
        const report = type === 'income' ? await Income.find({ owner: _id }) : await Expense.find({ owner: _id });

        const reportByYear = report.filter(({ date }) => {
            const operationYear = date.getFullYear();
            return operationYear === currentYear;
        });
        
        const reportByMonthForYear = reportByYear.reduce((stack, { date, sum }, index) => {
            stack[date.getMonth()] ? stack[date.getMonth()] = stack[date.getMonth()] + sum : stack[date.getMonth()] = sum
            return stack;
        }, {});

        const arrReport = Object.entries(reportByMonthForYear);

        const reportByMonthForYearText = arrReport.reduce((acc, item, index) => {
        switch(item[0]) {
            case '1':
                acc["Січень"] = item[1];
                break;
            case '2':
                acc["Лютий"] = item[1];
                break;
            case '3':
                acc["Березень"] = item[1];
                break;
            case '4':
                acc["Квітень"] = item[1];
                break;
            case '5':
                acc["Травень"] = item[1];
                break;
            case '6':
                acc["Червень"] = item[1];
                break;
            case '7':
                acc["Липень"] = item[1];
                break;
            case '8':
                acc["Серпень"] = item[1];
                break;
            case '9':
                acc["Вересень"] = item[1];
                break;
            case '10':
                acc["Жовтень"] = item[1];
                break;
            case '11':
                acc["Листопад"] = item[1];
                break;
            case '12':
                acc["Грудень"] = item[1];
                break;
            default:
                acc[index + 1] = item[index + 1];
            }
            return acc
        },{})

        const reportByType = type === 'income' ? "incomeReportByMonthForYear" : "expenseReportByMonthForYear";

        res.status(200).json({
            [reportByType]: reportByMonthForYearText
        });
    }
}

module.exports = new ReportController();