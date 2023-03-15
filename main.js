Vue.createApp({
    data() {
      return {
        expenses: [],
        nextId: 1,
        expenseCategory: "",
        salary: null,
        dateToday: new Date().toISOString().substr(0,10),
        selectedDay: null,
        sumString:"",
        date: new Date('2023-03-25'),
        expenseMonth:""
      }
    },
    computed: {
        totalAmount() {
            let total = 0;
            this.expenses.forEach(expense => {
              if (expense.category === 'salary') {
                total += expense.amount;
              } else {
                total -= expense.amount;
              }
            });
            return total;
          },
          expensesByCategory() {
            return this.expenses.reduce((result, expense) => {
              const category = expense.category;
              if (category !== 'salary') {
                if (!result[category]) {
                  result[category] = 0;
                }
                result[category] += expense.amount;
              }
              return result;
            }, {});
          },
      remainingAmount() {
        if (this.salary === null) {
          return null
        }
        return this.salary - this.totalAmount
      },
      
    },
    methods: {
      addNumber(number) {
        this.sumString += number
      },
      addExpense() {
        if (!this.sumString || !this.expenseCategory) {
          return
        }
        const expense = {
          id: this.nextId++,
          amount: Number(this.sumString),
          category: this.expenseCategory
        }
        this.sumString = ""
        this.expenseCategory = null
        if (this.salary !== null) {
          this.salary -= expense.amount
        }
        this.expenses.push(expense)
        this.expenseCategory = "";
      },
      daysLeftToPayday(date) {
        const today = new Date();
        const lastDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        );
        const targetDay = date.getDate();
        const daysLeft = targetDay - today.getDate();
        return daysLeft > 0 ? daysLeft : daysLeft + lastDayOfMonth.getDate();
      },
      dailyAmount(date,sumString){
        const today = new Date();
        const targetDay = date.getDate();
        const daysLeft = targetDay - today.getDate();
        const amount = parseInt(sumString) / daysLeft
        return amount.toFixed(2);
      }
    }
  }).mount('#app')
  