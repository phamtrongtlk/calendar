<template>
  <div class="quarter-calender-item">
    <v-date-picker
      v-model="picker"
      no-title
      full-width
      locale="en"
      flat
      :show-current="false"
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
      default: "",
    },
    disabledDate: {
      type: Array,
      default: () => [],
    },
    hidePickedDate: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  data: () => ({
    picker: null,
  }),
  mounted() {
    this.setInit();
  },
  methods: {
    setInit() {
      this.picker = moment(this.currentDate).format("YYYY-MM-DD");
      if (this.hidePickedDate)
        setTimeout(() => {
          this.picker = null;
        }, 1);
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
        tbody tr {
          td {
            width: 3.5vw;
            height: 3.5vw;
            .v-btn {
              width: 100%;
              height: 100%;
            }
            .v-btn--active {
              border-radius: 4px;
              border: 2px solid rgba(66, 132, 228, 255);
            }
            .v-btn__content {
              color: rgba(65, 133, 228, 152);
              font-size: 18px;
              font-weight: 600;
              padding: 5px;
              width: 100%;
              height: 100%;
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
</style>
