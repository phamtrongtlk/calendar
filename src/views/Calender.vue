<template>
  <div class="home">
    <QuarterCalender
      :disabled-date="disabledDate"
      :selected-date="selectedDate"
      @chooseDate="handleChooseDate"
    />
    <v-dialog v-model="showDialog" persistent max-width="960">
      <CalenderDialogContent
        :disabled-date="disabledDate"
        :select-date="selectDate"
        @closeDialog="handleCloseDialog"
      />
    </v-dialog>
  </div>
</template>

<script>
import QuarterCalender from "@/components/QuarterCalender.vue";
import CalenderDialogContent from "@/components/dialog/CalenderDialogContent.vue";

export default {
  name: "Home",
  components: {
    QuarterCalender,
    CalenderDialogContent,
  },
  data: () => ({
    showDialog: false,
    selectDate: "",
    disabledDate: [
      "2021-12-01",
      "2021-12-02",
      "2021-12-03",
      "2021-12-04",
      "2021-12-05",
      "2021-12-06",
      "2021-12-07",
      "2021-12-08",
      "2021-12-09",
      "2021-12-10",
    ],
    selectedDate: [
      "2022-01-26",
      "2022-01-27",
      "2022-01-28",
      "2022-01-29",
      "2022-01-30",
      "2022-01-31",
      "2022-02-01",
    ],
  }),
  methods: {
    handleChooseDate(date) {
      this.selectDate = date;
      this.showDialog = true;
    },
    handleCloseDialog(dateChange) {
      this.showDialog = false;
      console.log(dateChange);
    },
  },
};
</script>
