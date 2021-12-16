<template>
  <div class="quarter-calendar">
    <div
      class="calendar-item"
      v-for="(month, index) in [
        daysOfCurrentMonth,
        daysOfSecondMonth,
        daysOfThirdMonth,
      ]"
      :key="index"
    >
      <div class="months">{{ month.dates[0] | headerMonthFormat }}</div>
      <div class="days">
        <div class="day" v-for="(day, dayIndex) in daysOfWeek" :key="dayIndex">
          {{ day }}
        </div>
      </div>
      <div class="dates">
        <template v-if="month.fixedBlankDays > 0">
          <div
            class="date"
            v-for="(date, blankIndex) in month.fixedBlankDays"
            :key="`${blankIndex}-blank`"
          />
        </template>
        <div
          class="date"
          v-for="(date, dateIndex) in month.dates"
          :key="dateIndex"
          :class="`${getDateStatusClass(date)}`"
          @click="handleClickDate(date)"
        >
          {{ date | dayFormat }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
const DAYS_OF_WEEK = ["日", "月", "火", "水", "木", "金", "土"];
export default {
  components: {
    // QuarterCalendarItem,
  },
  name: "QuarterCalendar",
  filters: {
    dayFormat(date) {
      if (!date) return "";
      const [year, month, day] = date.toString().split("-");
      return day;
    },
    headerMonthFormat(date) {
      if (!date) return null;
      const [year, month] = date.split("-");
      return `${year}年${month ? `${month}月` : ""}`;
    },
  },
  data() {
    return {
      daysOfWeek: DAYS_OF_WEEK,
    };
  },
  props: {
    selectedDate: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    daysOfCurrentMonth() {
      const curentDay = moment();
      const startDayOfMonth = curentDay
        .startOf("month")
        .format(DEFAULT_DATE_FORMAT);
      const dates = this.getDaysOfMonth(curentDay.format(DEFAULT_DATE_FORMAT));
      const fixedBlankDays = this.getFixedBlankDays(startDayOfMonth);
      return { dates, fixedBlankDays };
    },
    daysOfSecondMonth() {
      const curentDay = moment().add(1, "M");
      const startDayOfMonth = curentDay
        .startOf("month")
        .format(DEFAULT_DATE_FORMAT);
      const dates = this.getDaysOfMonth(curentDay.format(DEFAULT_DATE_FORMAT));
      const fixedBlankDays = this.getFixedBlankDays(startDayOfMonth);
      return { dates, fixedBlankDays };
    },
    daysOfThirdMonth() {
      const curentDay = moment().add(2, "M");
      const startDayOfMonth = curentDay
        .startOf("month")
        .format(DEFAULT_DATE_FORMAT);
      const dates = this.getDaysOfMonth(curentDay.format(DEFAULT_DATE_FORMAT));
      const fixedBlankDays = this.getFixedBlankDays(startDayOfMonth);
      return { dates, fixedBlankDays };
    },
  },
  methods: {
    getFixedBlankDays(date) {
      let days = new Date(date).getDay(date);
      return days;
    },
    getDateStatusClass(date) {
      let isDisabledDate = this.isDisabledDate(date);
      let isSeletedDate = this.isSeletedDate(date);
      let isCurrentDate = this.isCurrentDate(date);
      return `${isDisabledDate ? "disabled " : ""}${
        isSeletedDate ? "selected " : ""
      }${isCurrentDate ? "current" : ""}`;
    },
    isDisabledDate(date) {
      return moment().format(DEFAULT_DATE_FORMAT) > date;
    },
    isCurrentDate(date) {
      return moment().format(DEFAULT_DATE_FORMAT) === date;
    },
    isSeletedDate(date) {
      return this.selectedDate.includes(date);
    },
    getDaysOfMonth(date) {
      const monthDate = moment(date, DEFAULT_DATE_FORMAT);
      let daysInMonth = monthDate.daysInMonth();
      let arrDays = [];

      while (daysInMonth) {
        const current = moment(date, DEFAULT_DATE_FORMAT).date(daysInMonth);
        arrDays.unshift(current.format(DEFAULT_DATE_FORMAT));
        daysInMonth--;
      }
      return arrDays;
    },
    handleClickDate(date) {
      if (this.isDisabledDate(date)) return;
      if (this.isSeletedDate(date)) {
        this.$emit("removeSelectedDate", date);
        return;
      }
      this.$emit("selectNewDate", date);
    },
  },
};
</script>
<style lang="scss" scoped>
.quarter-calendar {
  display: flex;
  column-gap: 1vw;
  margin: 0 auto;
  width: 100%;
  .calendar-item {
    flex: 1;
    // border: 1px solid green;
    padding: 8px;
    .months {
      color: rgba(69, 84, 91, 255);
      font-size: 24px;
      font-weight: 600;
    }
    .days {
      margin-top: 12px;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      .day {
        font-size: 18px;
        font-weight: bold;
        color: rgba(101, 121, 133, 223);
      }
    }
    .dates {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      margin-top: 12px;
      gap: 4px;
      .date {
        aspect-ratio: 6/5;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        color: rgba(67, 132, 228, 207);
        background-color: rgba(0, 0, 0, 0);
        &.disabled {
          cursor: no-drop;
          color: rgba(128, 128, 128, 2);
          background-color: rgba(0, 0, 0, 0);
          opacity: 0.7;
        }
        &.selected {
          color: rgba(101, 122, 132, 255);
          background-color: rgba(151, 169, 175, 0.53);
        }
        &.current {
          border: 2px solid rgba(67, 132, 228, 207);
        }
      }
    }
  }
}
</style>
