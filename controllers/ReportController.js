

// class ReportController{
//     async getIncome(req, res) {
//         const { _id } = req.user;

//         const currentYear = new Date().getFullYear();

//     const result = await User.findById(
//       _id,
//       "-createdAt -updatedAt -password -token"
//     );

//     if (!result) {
//       throw createError(404, "User not found");
//     }

//     const transactions = await Transaction.find({ owner: _id });

//     const transactionsByMonthAndYear = transactions.filter(({ date }) => {
//       const operationYear = date.getFullYear().toString();
//       const operationMonth = (date.getMonth() + 1).toString();

//       return operationYear === year && operationMonth === month;
//     });

//     console.log(transactionsByMonthAndYear);

//     const incomeTransactions = transactionsByMonthAndYear.filter(
//       ({ type }) => type === "income"
//     );
//     const expenseTransactions = transactionsByMonthAndYear.filter(
//       ({ type }) => type === "expense"
//     );

//     const totalExpense = expenseTransactions.reduce(
//       (prevValue, { sum }) => prevValue + sum,
//       0
//     );
//     const totalIncome = incomeTransactions.reduce(
//       (prevValue, { sum }) => prevValue + sum,
//       0
//     );

//     res.status(200).json({
//         incomeTransactions,
//         expenseTransactions,
//         totalExpense,
//         totalIncome,
//       });
//     }
// }

// module.exports = new ReportController();