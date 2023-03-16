Vue.createApp({
  data() {
    return {
      expenses: [],
      nextId: 1,
      expenseCategory: "",
      salary: null,
      dateToday: new Date().toISOString().substr(0, 10),
      selectedDay: null,
      sumString: "",
      date: new Date('2023-03-25'),
      expenseMonth: "",
      amount: Number(this.sumString),
      expanded: false,
      isInActive: false,
      data: [
        { label: 'Food', value: 300, color: '#FF6384' },
        { label: 'Transportation', value: 800, color: '#36A2EB' },
        { label: 'Entertainment', value: 200, color: '#FFCE56' },
        { label: 'Housing', value: 150, color: '#4BC0C0' },
      ]
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
      return total.toFixed(2);
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
      },
        {});
    },
    remainingAmount() {
      if (this.salary === null) {
        return null
      }
      return this.salary - this.totalAmount
    },
    filterExpenses() {
      // return this.expenses.filter(e => e.amount > 0);
      const selectedMonth = this.expenseMonth;
      return this.expenses.filter(e => {
        const expenseDate = new Date(e.date);
        return expenseDate.getMonth() == selectedMonth;
      });
    }
  },
  methods: {
    addNumber(number) {
      this.sumString += number
    },
    removeNumber() {
      this.sumString = "";
    },
    addExpense() {
      if (!this.sumString || !this.expenseCategory) {
        return
      }
      const expense = {
        id: this.nextId++,
        amount: Number(this.sumString),
        category: this.expenseCategory,
        date: this.dateToday
      }
      this.sumString = ""
      this.expenseCategory = null
      if (this.salary !== null) {
        this.salary -= expense.amount
      }
      this.expenses.push(expense)
      this.drawSweden();
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
    dailyAmount(date, sumString) {
      const today = new Date();
      const targetDay = date.getDate();
      const daysLeft = targetDay - today.getDate();
      const amount = parseInt(sumString) / daysLeft
      return amount.toFixed(2);
    },
    expandDiv() {
      this.expanded = true;
      this.toggleInActive();
    },
    closeDiv() {
      this.expanded = false;
      this.toggleInActive();
    },
    toggleInActive(){
      this.isInActive = !this.isInActive;
    },
    drawSweden() {
      const canvas = document.querySelector('canvas');
      this.$refs.canvas.getContext("2d")
      const w = canvas.width = 160;
      const h = canvas.height = 100;
      
      this.$refs.canvas.getContext("2d").fillStyle = 'blue';
      this.$refs.canvas.getContext("2d").fillRect(0, 0, w, h);
      this.$refs.canvas.getContext("2d").fillStyle = 'yellow';
      this.$refs.canvas.getContext("2d").fillRect(0, h * 0.4, w, h * 0.2);
      this.$refs.canvas.getContext("2d").fillRect(w * (5 / 16), 0, w * (2 / 16), h);
    },
  }
}).mount('#app');