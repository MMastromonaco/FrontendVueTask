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
      expenseId:"",
      amount: Number(this.sumString),
      expanded: false,
      isInActive: false,
      categories: [
        'food',
        'transportation',
        'entertainment',
        'housing',
        'miscellaneous',
        'stocks'
      ],
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
          this.drawPieChart();

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
    },
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
    },
    deleteTransaction(id) {
      const index = this.expenses.findIndex(expense => expense.id === id);
      if (index !== -1) {
        this.expenses.splice(index, 1);
      }
      this.drawPieChart();
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
    toggleInActive() {
      this.isInActive = !this.isInActive;
    },
    drawPieChart() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');
      const colors = {
        "food": "#FF0000",
        "rent": "#0000FF",
        "transportation": "#FFFF00",
        "entertainment": "#008000",
        "housing": "#800080",
        "miscellaneous": "#008080",
        "stocks": "#808000"
      };

      context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

      const data = this.categories.map(category => {
        return this.expenses.filter(expense => expense.category === category)
          .reduce((total, expense) => total + expense.amount, 0);
      });

      const total = data.reduce((a, b) => a + b, 0);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) / 2;
      let currentAngle = 0;

      data.forEach((value, index) => {
        const sliceAngle = (2 * Math.PI * value) / total;
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        context.fillStyle = colors[this.categories[index]];
        context.fill();
        currentAngle += sliceAngle;
      });
    },
    
  }
}).mount('#app');