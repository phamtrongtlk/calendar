<template>
  <div class="home">
    <QuarterCalender
      date="2021-12-14"
      :disabled-date="[
        '2021-12-01',
        '2021-12-02',
        '2021-12-03',
        '2021-12-04',
        '2021-12-05',
      ]"
    />
  </div>
</template>

<script>
import QuarterCalender from "@/components/QuarterCalender.vue";

export default {
  name: "Home",
  components: {
    QuarterCalender,
  },
};
</script>
