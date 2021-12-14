<template>
  <div class="quarter-calender">
    <QuarterCalenderItem
      :current-date="date"
      :disabled-date="disabledDate"
      class="quarter-calender-item"
      @chooseDate="handleChooseDate"
    />
    <QuarterCalenderItem
      :current-date="dateSecondMonth"
      :disabled-date="disabledDate"
      class="quarter-calender-item"
      :hidePickedDate="true"
      @chooseDate="handleChooseDate"
    />
    <QuarterCalenderItem
      :current-date="dateThirdMonth"
      :disabled-date="disabledDate"
      class="quarter-calender-item"
      :hidePickedDate="true"
      @chooseDate="handleChooseDate"
    />
  </div>
</template>

<script>
import moment from "moment";
import QuarterCalenderItem from "@/components/QuarterCalenderItem.vue";
export default {
  components: {
    QuarterCalenderItem,
  },
  name: "QuarterCalender",

  data: () => ({}),
  props: {
    date: {
      type: String,
      default: () => moment().format("YYYY-MM-DD"),
    },
    disabledDate: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    dateSecondMonth() {
      return moment(this.date).add(1, "M").format("YYYY-MM-DD");
    },
    dateThirdMonth() {
      return moment(this.date).add(2, "M").format("YYYY-MM-DD");
    },
  },
  methods: {
    handleChooseDate(date) {
      console.log(date);
    },
  },
};
</script>
<style lang="scss" scoped>
.quarter-calender {
  display: flex;
  justify-content: space-between;
  gap: 1vw;
  .quarter-calender-item {
    flex: 1;
  }
}
</style>
