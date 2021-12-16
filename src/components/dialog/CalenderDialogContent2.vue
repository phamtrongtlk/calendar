<template>
  <div class="calendar-dialog">
    <v-card>
      <v-card-title class="dialog-headline">貸出希望日時を入力</v-card-title>
      <v-card-text>
        <div>
          <v-row>
            <v-col cols="6" v-show="!showCalendar">
              <v-text-field
                v-model="date"
                append-icon="mdi-calendar"
                readonly
                @click="handleShowCalendar"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="dialog-datepicker" cols="6" v-show="showCalendar">
              <QuarterCalendarItem2
                :select-date="selectDate"
                :selected-date="selectedDate"
                @changeDate="handleChangeDate"
              />
            </v-col>
          </v-row>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="handleSaveDialog(true)">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="handleSaveDialog(false)">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import QuarterCalendarItem2 from "@/components/QuarterCalendarItem2.vue";
export default {
  components: { QuarterCalendarItem2 },
  props: {
    disabledDate: {
      type: Array,
      default: () => [],
    },
    selectedDate: {
      type: Array,
      default: () => [],
    },
    selectDate: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.setInit();
  },
  data: () => ({
    showCalendar: false,
    date: "",
  }),
  methods: {
    setInit() {
      this.date = this.selectDate;
    },
    handleShowCalendar() {
      this.showCalendar = true;
    },
    handleSaveDialog(isCancel) {
      if (isCancel) {
        this.$emit("cancelSelectDate");
      } else {
        this.$emit("saveSelectedDate", this.date);
      }
      this.showCalendar = false;
    },
    handleChangeDate(date) {
      this.showCalendar = false;
      this.date = date;
    },
  },
};
</script>
<style lang="scss" scoped>
.calendar-dialog {
  .dialog-headline {
    justify-content: center;
  }
  .dialog-datepicker {
    margin: 0 auto;
    border-radius: 4px;
    border: 1px solid rgba(128, 128, 128, 0.23);
  }
}
</style>
