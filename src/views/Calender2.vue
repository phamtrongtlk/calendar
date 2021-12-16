<template>
  <div class="calendar">
    <QuarterCalendar2
      :selected-date="selectedDate"
      @selectNewDate="selectNewDate"
      @removeSelectedDate="removeSelectedDate"
    />
    <v-dialog v-model="showDialog" persistent max-width="960">
      <CalenderDialogContent2
        @cancelSelectDate="handleCancelSelectDate"
        @saveSelectedDate="handleSaveSelectedDate"
        :selected-date="selectedDate"
        :select-date="backupSelectedNewDate"
      />
    </v-dialog>
  </div>
</template>

<script>
// import moment from "moment";
import QuarterCalendar2 from "@/components/QuarterCalendar2.vue";
import CalenderDialogContent2 from "@/components/dialog/CalenderDialogContent2.vue";

export default {
  components: {
    QuarterCalendar2,
    CalenderDialogContent2,
  },
  data() {
    return {
      showDialog: false,
      selectedDate: [],
      backupSelectedNewDate: "",
    };
  },
  mounted() {
    //TODO: remove dummy
    this.selectedDate = [
      "2022-01-26",
      "2022-01-27",
      "2022-01-28",
      "2022-01-29",
      "2022-01-30",
      "2022-01-31",
      "2022-02-01",
    ];
  },
  methods: {
    handleCancelSelectDate() {
      this.selectedDate = this.selectedDate.filter(
        (item) => item !== this.backupSelectedNewDate
      );
      this.backupSelectedNewDate = "";
      this.showDialog = false;
    },
    handleSaveSelectedDate(dateChange) {
      if (dateChange === this.backupSelectedNewDate) {
        this.selectedDate = this.selectedDate.filter(
          (item) => item !== this.backupSelectedNewDate
        );
        this.selectedDate.push(dateChange);

        console.log(dateChange, this.selectedDate);
      }
      this.showDialog = false;
      this.backupSelectedNewDate = "";
    },
    selectNewDate(date) {
      //TODO: Handle select new date
      this.showDialog = true;
      this.backupSelectedNewDate = date;
      this.selectedDate.push(date);
    },
    removeSelectedDate(date) {
      //TODO: Handle remove date
      this.selectedDate = this.selectedDate.filter((item) => item !== date);
    },
  },
};
</script>
<style lang="scss" scoped>
.calendar {
  max-width: 1440px;
  margin: 0 auto;
}
</style>
