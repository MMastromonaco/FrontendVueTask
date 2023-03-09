Vue.createApp({
    data() {
      return {
        expenses: [],
        nextId: 1,
        expenseAmount: null,
        expenseCategory: null,
        salary: null,
        dateToday: new Date().toISOString().substr(0,10),
        selectedDay: null,
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
          const category = expense.category
          if (!result[category]) {
            result[category] = 0
          }
          result[category] += expense.amount
          return result
        }, {})
      },
      remainingAmount() {
        if (this.salary === null) {
          return null
        }
        return this.salary - this.totalAmount
      },
      daysToPeycheck(){
        //Räkna ut dagar ifrån dagen till dagen då användaren sagt är lönedag,
        
      },
      dailyAmount(){
        //Räkna TotalAmount / dagar kvar till lön.
      }
    },
    methods: {
      addExpense() {
        if (!this.expenseAmount || !this.expenseCategory) {
          return
        }
        const expense = {
          id: this.nextId++,
          amount: Number(this.expenseAmount),
          category: this.expenseCategory
        }
        this.expenseAmount = null
        this.expenseCategory = null
        if (this.salary !== null) {
          this.salary -= expense.amount
        }
        this.expenses.push(expense)
      }
    }
  }).mount('#app')
  