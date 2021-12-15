<template>
  <div class="home">
    <v-card>
      <v-card-title class="headline">貸出申請</v-card-title>
      <v-card-text>
        <div>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="selectDate"
                append-icon="mdi-calendar"
                readonly
                @click="handleShowCalendar"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" v-if="showCalendar">
              <QuarterCalenderItem
                :current-date="currentDate"
                :disabled-date="disabledDate"
                :selected-date="selectedDate"
                :show-current="true"
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
    selectedDate: {
      type: Array,
      default: () => [],
    },
    selectDate: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    showCalendar: false,
    date: "",
  }),
  methods: {
    handleShowCalendar() {
      this.dialog = true;
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
      this.date = date;
    },
  },
};
</script>
