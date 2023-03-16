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
    drawPieChart() {
      const canvas = createCanvas();
      const c = canvas.getContext('2d');
      const w = canvas.width = 500;
      const h = canvas.height = 500;
      const centerX = w / 2;
      const centerY = h / 2;
      const radius = Math.min(w, h / 2 - 50);

      const total = data.reduce((sum, item) => sum + item.value, 0);

      let startAngel = 0;
      let endAngel = 0;
      for (let i = 0; i < data.length; i++) {
        const slice = data[i];
        endAngel = startAngel + (slice.value / total) * 2 * Math.PI;

        c.beginPath();
        c.moveTo(centerX, centerY);
        c.arc(centerX, centerY, radius, startAngel, endAngel);
        c.fillStyle = slice.color;
        c.fill();

        startAngel = endAngel;
      }

      c.font = '16px sans-serif';
      let x = 50;
      let y = 50;
      for (let i = 0; i < data.length; i++) {
        const slice = data[i];
        c.fillStyle = slice.color;
        c.fillRect(x, y, 20, 20);
        c.fillStyle = 'black';
        c.fillText(`${slice.label}: ${slice.value}`, x + 30, y + 16);
        y += 30;
      }
    },
    createCanvas() {
      const canvas = document.createElement('canvas');
      document.body.append(canvas);
      return canvas;
    },
    expandDiv() {
      this.expanded = true;
    },
    closeDiv() {
      this.expanded = false;
    },
  }
}).mount('#app');