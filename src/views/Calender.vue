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
          <div>123123</div>
        </v-card-text>
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
  }),
  methods: {
    handleChooseDate() {
      this.dialog = true;
    },
  },
};
</script>
