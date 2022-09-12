const {Income, Expense } = require("../models");
const localizationCategory = require("../helpers/localizationCategory");

class ReportController{
    async getReportByMonthForYear(req, res) {
        const { _id } = req.user;
        const { month, year } = req.params;

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
        
        const totalIncomeByCategory = incomeForMonthOfYear.reduce((stack, { category, sum }) => {
            stack[category] ? stack[category] = stack[category] + sum : stack[category] = sum
            return stack
        }, {});
        const totalExpanseByCategory = expenseForMonthOfYear.reduce((stack, { category, sum }) => {
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

    async getSumAllDescriptionByCategory(req, res) {
        const { _id } = req.user;
        const { category, month, year } = req.params;
        
        const localCategory = localizationCategory(category);
        const report = localCategory.type === 'income'
            ? await Income.find({ owner: _id, category: localCategory.category })
            : await Expense.find({ owner: _id, category: localCategory.category });
        
        const reportByYear = report.filter(({ date }) => {
            const operationYear = date.getFullYear().toString();
            const operationMonth = (date.getMonth() + 1).toString();
            return operationMonth === month && operationYear === year;
        });

        const reportByMonthForYear = reportByYear.reduce((stack, { description, sum }) => {
            stack[description] ? stack[description] = stack[description] + sum : stack[description] = sum;
            return stack;
        }, {});

        res.status(200).json({
            reportByMonthForYear
        });
    }

    async getReportByMonthsSum(req, res) {
        const { _id } = req.user;
        const { type, year } = req.params;

        const report = type === 'income'
            ? await Income.find({ owner: _id })
            : await Expense.find({ owner: _id });

        const reportByYear = report.filter(({ date }) => {
            const operationYear = date.getFullYear().toString();
            return operationYear === year;
        });
        
        const reportByMonthForYear = reportByYear.reduce((stack, { date, sum }, index) => {
            const month = date.getMonth() + 1;
            stack[month] ? stack[month] = stack[month] + sum : stack[month] = sum
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

    async getReportByDay(req, res) {

        const { _id } = req.user;
        const { date } = req.params;
        
        const [year, month, day] = date.split('-');
        const incomeTransactions = await Income.find({ owner: _id });

        const incomeByDay = incomeTransactions.filter(({ date }) => {
            const operationYear = date.getFullYear().toString();
            const operationMonth = (date.getMonth() + 1).toString().padStart(2, '0');
            const operationDay = (date.getDate()).toString().padStart(2, '0');

            return operationYear === year && operationMonth === month && operationDay === day;
        });
        
        const expenseTransactions = await Expense.find({ owner: _id });
        
        const expenseByDay = expenseTransactions.filter(({ date }) => {
            const operationYear = date.getFullYear().toString();
            const operationMonth = (date.getMonth() + 1).toString().padStart(2, '0');
            const operationDay = (date.getDate()).toString().padStart(2, '0');

            return operationYear === year && operationMonth === month && operationDay === day;
        });


        res.status(200).json({
            incomeByDay,
            expenseByDay,
        });
    }
}

module.exports = new ReportController();