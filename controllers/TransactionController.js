const { User, Income, incomeJoiSchema, Expense, expenseJoiSchema } = require("../models");
const createError = require("../helpers/createError");
const joiValidate = require("../helpers/joiValidate");

class TransactionController{
    async addTransactionIncome(req, res) {
        const { _id, totalBalance } = req.user;
        const { sum } = req.body;
        
        joiValidate(incomeJoiSchema, req.body);

        const incomeTransaction = await Income.create({ ...req.body, owner: _id });

        const newBalance = totalBalance + sum;
        
        if (newBalance < 0) {
            throw createError(400, "Not enough money, impossible to make a transaction");
        }

        await User.findByIdAndUpdate(_id, { totalBalance: newBalance });

        res.status(201).json({
            incomeTransaction,
            totalBalance: newBalance,
            });
    }

    async addTransactionExpense(req, res) {
        const { _id, totalBalance } = req.user;
        const { sum } = req.body;
        
        joiValidate(expenseJoiSchema, req.body);

        const expenseTransaction = await Expense.create({ ...req.body, owner: _id });

        const newBalance = totalBalance - sum;
        
        if (newBalance < 0) {
            throw createError(400, "Not enough money, impossible to make a transaction");
        }

        await User.findByIdAndUpdate(_id, { totalBalance: newBalance });

        res.status(201).json({
            expenseTransaction,
            totalBalance: newBalance,
            });
    }

    async removeTransaction(req, res) {
        const { type, transactionId } = req.params;
        const { _id, totalBalance } = req.user;

        const { sum } = type === 'income'
        ? await Income.findById(transactionId)
        : await Expense.findById(transactionId);
        
        if (!sum) {
            throw createError();
        }     
        
        const newBalance = type === "income" ? totalBalance - sum : totalBalance + sum;
        
        if (newBalance < 0) {
            throw createError(400, "Not enough money, impossible to make a transaction");
        }

        type === 'income'
        ? await Income.findByIdAndRemove(transactionId)
        : await Expense.findByIdAndRemove(transactionId);

        await User.findByIdAndUpdate({ _id }, { totalBalance: newBalance });

        res.status(200).json({
            message: `Transaction with ID: ${transactionId} deleted`,
            newBalance,
            });
    }
}

module.exports = new TransactionController();