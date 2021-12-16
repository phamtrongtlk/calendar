<template>
  <div class="quarter-calender-item">
    <v-date-picker
      v-model="dates"
      no-title
      full-width
      locale="en"
      flat
      :multiple="multiple"
      :show-current="showCurrent"
      class="item-datepicker"
      @click:date="chooseDate"
      :allowed-dates="allowedDates"
      :weekday-format="weekFormat"
      :header-date-format="headerFormat"
    >
    </v-date-picker>
  </div>
</template>

<script>
import moment from "moment";
const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
export default {
  name: "QuarterCalenderItem",
  props: {
    currentDate: {
      type: String,
      Array,
      default: "",
    },
    disabledDate: {
      type: Array,
      default: () => [],
    },
    selectedDate: {
      type: Array,
      default: () => [],
    },
    showCurrent: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  data: () => ({
    dates: [],
  }),
  mounted() {
    this.setInit();
  },
  methods: {
    setInit() {
      const endDate = moment(this.currentDate).endOf("month");
      const startDate = moment(this.currentDate).startOf("month");
      if (!this.selectedDate) return;

      this.selectedDate.forEach((item) => {
        let date = moment(item);

        let isInMonth =
          startDate.year() == date.year() &&
          startDate.month() == date.month() &&
          endDate.date() >= date.date();
        if (isInMonth) this.dates = [...this.dates, item];
      });
    },
    allowedDates(date) {
      return !this.disabledDate.includes(date);
    },
    chooseDate(date) {
      this.$emit("chooseDate", date);
    },
    weekFormat(date) {
      let i = new Date(date).getDay(date);
      return daysOfWeek[i];
    },
    headerFormat(date) {
      if (!date) return null;
      const [year, month] = date.split("-");
      return `${year}年${month ? `${month}月` : ""}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.quarter-calender-item {
  padding: 4px;
  ::v-deep {
    .item-datepicker {
      .v-date-picker-header {
        .v-btn {
          display: none;
        }
        .v-date-picker-header__value {
          color: rgba(68, 83, 91, 135);
          .accent--text button {
            color: rgba(68, 83, 91, 135);
            font-size: 24px;
            font-weight: 600;
          }
        }
      }
      .v-date-picker-table {
        width: 100%;
        height: 100%;
      }
      .v-date-picker-table__current {
        border-radius: 4px;
        border: 2px solid rgba(66, 132, 228, 255);
      }
      .v-date-picker-table--date {
        thead tr th {
          color: rgba(101, 122, 132, 255);
          font-size: 18px;
          font-weight: 600;
        }
        tbody {
          tr {
            td {
              width: 3.5vw;
              height: 3.5vw;
              .v-btn {
                width: 100%;
                height: 100%;
              }
              .v-btn__content {
                color: rgba(65, 133, 228, 152);
                font-size: 18px;
                font-weight: 600;
                padding: 5px;
                width: 100%;
                height: 100%;
              }
              .v-btn--active {
                border-radius: 4px;
                background-color: rgba(151, 169, 175, 128);
                .v-btn__content {
                  color: rgba(101, 122, 132, 255);
                }
              }
              .v-btn--disabled {
                .v-btn__content {
                  color: rgba(96, 124, 131, 37);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
