<template>
  <div class="home">
    <v-card>
      <v-card-title class="headline">貸出申請</v-card-title>
      <v-card-text>
        <div>
          <v-row>
            <v-col cols="12" v-show="!showCalendar">
              <v-text-field
                v-model="date"
                append-icon="mdi-calendar"
                readonly
                @click="handleShowCalendar"
              />
            </v-col>
          </v-row>
          <v-row class="text-center">
            <v-col cols="6" v-show="showCalendar">
              <QuarterCalenderItem
                :current-date="date"
                :disabled-date="disabledDate"
                :selected-date="date"
                @chooseDate="handleChooseDate"
              />
            </v-col>
          </v-row>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="handleSaveDialog(false)">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="handleSaveDialog(true)">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
import QuarterCalenderItem from "@/components/QuarterCalenderItem.vue";
export default {
  components: {
    QuarterCalenderItem,
  },
  props: {
    currentDate: {
      type: String,
      default: () => moment().format("YYYY-MM-DD"),
    },
    disabledDate: {
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
      this.date = [...this.date, this.selectDate];
    },
    handleShowCalendar() {
      this.showCalendar = true;
    },
    handleSaveDialog(isClose) {
      if (isClose) {
        this.$emit("closeDialog");
      } else {
        this.$emit("closeDialog", this.date);
      }
      this.showCalendar = false;
    },
    handleChooseDate(date) {
      this.showCalendar = false;
      this.date = date;
    },
  },
};
</script>
