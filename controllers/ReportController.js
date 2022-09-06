const createError = require("../helpers/createError");
const { User, Income, Expense } = require("../models");

class ReportController{
    async getTransaction(req, res) {
        const { _id } = req.user;
        const { month, year } = req.params;
        // const currentYear = new Date().getFullYear();

        const result = await User.findById(
        _id,
        "-createdAt -updatedAt -password -token"
        );

        console.log(result);

        if (!result) {
        throw createError(404, "User not found");
        }

        const incomeTransactions = await Income.find({ owner: _id });

        const incomeByMonthAndYear = incomeTransactions.filter(({ date }) => {
            const operationYear = date.getFullYear().toString();
            const operationMonth = (date.getMonth() + 1).toString();

            return operationYear === year && operationMonth === month;
        });
            
        const expenseTransactions = await Expense.find({ owner: _id });

        const expenseByMonthAndYear = expenseTransactions.filter(({ date }) => {
            const operationYear = date.getFullYear().toString();
            const operationMonth = (date.getMonth() + 1).toString();

            return operationYear === year && operationMonth === month;
        });

        const totalExpense = expenseByMonthAndYear.reduce((prevValue, { sum }) => prevValue + sum, 0);
        const totalIncome = incomeByMonthAndYear.reduce((prevValue, { sum }) => prevValue + sum, 0);

        res.status(200).json({
            totalIncome,
            totalExpense,
            incomeByMonthAndYear,
            expenseByMonthAndYear,
        });
    }

    async getIncome(req, res){
        const { _id } = req.user;

        const currentYear = new Date().getFullYear();

        const incomeTransactions = await Income.find({ owner: _id });

        const incomeByYear = incomeTransactions.filter(({ date }) => {
            const operationYear = date.getFullYear();
            return operationYear === currentYear;
        });
        
        const incomeByMonthForYear = incomeByYear.reduce(function (stack, { date, sum }) {

            stack[date.getMonth()] ? stack[date.getMonth()] = stack[date.getMonth()] + sum : stack[date.getMonth()] = sum
            return stack;
        }, {});

        console.log(incomeByMonthForYear);

        res.status(200).json({
            incomeByMonthForYear
        });
    }

    async getExpense(req, res){
        const { _id } = req.user;

        const currentYear = new Date().getFullYear();

        const expenseTransactions = await Expense.find({ owner: _id });

        const expenseByYear = expenseTransactions.filter(({ date }) => {
            const operationYear = date.getFullYear();
            return operationYear === currentYear;
        });
        
        const expenseByMonthForYear = expenseByYear.reduce(function (stack, { date, sum }) {

            stack[date.getMonth()] ? stack[date.getMonth()] = stack[date.getMonth()] + sum : stack[date.getMonth()] = sum
            return stack;
        }, {});

        console.log(expenseByMonthForYear);



        res.status(200).json({
            expenseByMonthForYear
        });
    }
}

module.exports = new ReportController();