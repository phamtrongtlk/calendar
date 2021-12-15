<template>
  <div class="home">
    <QuarterCalender
      :disabled-date="[
        '2021-12-01',
        '2021-12-02',
        '2021-12-03',
        '2021-12-04',
        '2021-12-05',
        '2021-12-06',
        '2021-12-07',
        '2021-12-08',
        '2021-12-09',
        '2021-12-10',
      ]"
      :selected-date="[
        '2022-01-26',
        '2022-01-27',
        '2022-01-28',
        '2022-01-29',
        '2022-01-30',
        '2022-01-31',
        '2022-02-01',
      ]"
      @chooseDate="handleChooseDate"
    />
    <v-dialog v-model="dialog" persistent max-width="960">
      <v-card>
        <v-card-title class="headline">貸出申請</v-card-title>
        <v-card-text>
          <div>{{ selectDate }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import QuarterCalender from "@/components/QuarterCalender.vue";

export default {
  name: "Home",
  components: {
    QuarterCalender,
  },
  data: () => ({
    dialog: false,
    selectDate: "",
  }),
  methods: {
    handleChooseDate(date) {
      this.selectDate = date;
      this.dialog = true;
    },
  },
};
</script>
