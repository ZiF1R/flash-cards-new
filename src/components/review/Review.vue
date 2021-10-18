<template>
  <pop-up-temp
    v-if="!reviewInit.isFinished"
    @close="showConfirm = true"
    :locale="locale"
  >
    <template v-slot:popup__content>
      <span class="total">
        {{ reviewInit.currentIndex + 1 }} {{ localize("of") }}
        {{ reviewInit.to + 1 }} {{ localize("cards") }}
      </span>

      <div v-if="isReviewSwitched()">
        <span class="review-data">{{ reviewInit.currentCard.definition }}</span>
        <span class="answer" v-if="showAnswer">{{
          reviewInit.currentCard.term
        }}</span>
      </div>
      <div v-else>
        <span class="review-data">{{ reviewInit.currentCard.term }}</span>
        <span class="answer" v-if="showAnswer">{{
          reviewInit.currentCard.definition
        }}</span>
      </div>

      <div
        class="showExamplesIcon"
        @click.left="changeExamplesVisibility"
        v-if="reviewInit.currentCard.examples"
      >
        <img
          class="icon_active"
          :title="localize(`Show examples`)"
          src="../../assets/profile/eye.svg"
        />
        <img
          :title="localize(`Hide examples`)"
          src="../../assets/profile/invisible.svg"
        />
      </div>
      <div class="examples" v-if="showExamples">
        {{ reviewInit.currentCard.examples }}
      </div>

      <input
        type="text"
        class="input"
        autocomplete="off"
        :title="localize(`Answer`)"
        :placeholder="localize(`Answer`)"
        v-model.trim="answer"
      />

      <div class="result" v-if="checkedAnswer">
        <small class="notification notification_right" v-if="isRight">
          {{ localize("Right answer") }}!
        </small>
        <small class="notification notification_wrong" v-else>
          {{ localize("Wrong answer") }}!
        </small>
      </div>
    </template>
    <template v-slot:popup__buttons>
      <div class="btns" v-if="!checkedAnswer">
        <button
          class="neutral"
          @click.left="showAnswer = true"
          v-if="!showAnswer"
        >
          {{ localize("Show answer") }}
        </button>
        <button class="neutral" @click.left="showAnswer = false" v-else>
          {{ localize("Hide answer") }}
        </button>
        <button class="neutral" @click.left="checkAnswer">
          {{ localize("Submit") }}
        </button>
      </div>
      <div style="justify-content: flex-end" class="btns" v-else-if="isRight">
        <button class="neutral" @click.left="nextCard">
          {{ localize("Next") }}
        </button>
      </div>
      <div class="btns" v-else>
        <button class="neutral" @click.left="setAsCorrect">
          {{ localize("Set as correct") }}
        </button>
        <button class="negative" @click.left="nextCard">
          {{ localize("Next") }}
        </button>
      </div>
    </template>
  </pop-up-temp>
  <ReviewTotal
    :seconds="seconds"
    :totalCards="reviewInit.to + 1"
    :wrongAnswers="reviewInit.wrongAnswers"
    :rightAnswers="reviewInit.rightAnswers"
    :locale="locale"
    @close="$emit('close')"
    v-else
  />
  <Confirm
    v-if="showConfirm"
    :locale="locale"
    @close="showConfirm = false"
    @confirmed="closeReview()"
  >
    <template v-slot:confirm__message>
      {{
        localize(
          "After the review is closed, you will not be able to continue it later! Are you sure about this"
        )
      }}
    </template>
    <template v-slot:confirm-button__text>
      {{ localize("Close") }}
    </template>
  </Confirm>
</template>

<script>
import localizeFilter from "@/locale/locale";
import PopUpTemp from "@/components/pop-ups/PopUpTemp";
import Confirm from "@/components/pop-ups/ConfirmPopUps/Confirm";
import ReviewTotal from "@/components/review/ReviewTotal";
import { mapGetters } from "vuex";
import { _review } from "@/components/review/review.js";
import { _db } from "@/db.js";

export default {
  name: "Review",

  props: {
    locale: {
      type: String,
      default: "EN",
    },
    folder: {
      type: Object,
      default: () => ({
        data: {
          name: "",
          category: "none",
          memorized: 0,
          created: "",
        },
        cards: [],
      }),
    },
  },

  emits: ["close"],

  components: {
    PopUpTemp,
    ReviewTotal,
    Confirm,
  },

  data() {
    return {
      answer: "",
      showAnswer: false,
      showExamples: false,
      showConfirm: false,
      checkedAnswer: false,
      isRight: false,
      generator: null,
      sizeOfDeck: null,
      seconds: 0,
      timer: setInterval(() => this.seconds++, 1000),
      timeLimit: {
        limit: this.getTimeLimit(),
        timePassed: 0,
        interval: null,
        isTimeOver: false,
      },
      reviewInit: {
        from: 0,
        to: 1,

        deck: [],
        currentIndex: 0,
        currentCard: null,
        isFinished: false,

        wrongAnswers: 0,
        rightAnswers: 0,

        *[Symbol.iterator]() {
          for (let i = this.from; i < this.to + 1; i++) {
            this.currentIndex = i;
            yield (this.currentCard = this.deck[i]);
          }
        },
      },
    };
  },

  created() {
    this.startReviewInit();
  },

  methods: {
    ...mapGetters(["isReviewSwitched", "getCardsLimit", "getTimeLimit"]),
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
    closeReview() {
      clearInterval(this.timeLimit.interval);
      this.$emit("close");
    },
    timeToAnswer() {
      this.timeLimit.timePassed++;
      this.timeLimit.isTimeOver =
        this.timeLimit.limit <= this.timeLimit.timePassed;

      this.timeLimit.isTimeOver &&
        (clearInterval(this.timeLimit.interval), this.checkAnswer());
    },
    startReviewInit() {
      // default values
      this.reviewInit.deck = [...this.folder.cards];
      this.sizeOfDeck = this.getCardsLimit() || this.reviewInit.deck.length;

      this.reviewInit.deck = _review.createDeck(
        this.reviewInit.deck,
        this.sizeOfDeck
      );
      [this.reviewInit.to, this.reviewInit.currentCard] = [
        this.reviewInit.deck.length - 1,
        this.reviewInit.deck[0],
      ];
      this.generator = this.reviewInit[Symbol.iterator]();
      this.generator.next();

      // init time to answer
      this.timeLimit.interval =
        this.timeLimit.limit && setInterval(this.timeToAnswer, 1000);
    },
    changeExamplesVisibility() {
      const imgs = document.querySelector(".showExamplesIcon").childNodes;

      for (let i = 0; i < imgs.length; i++)
        imgs[i].classList.toggle("icon_active");
      this.showExamples = !this.showExamples;
    },
    async checkAnswer() {
      this.showAnswer = true;
      clearInterval(this.timeLimit.interval);

      let isRight;
      if (!this.isReviewSwitched()) {
        isRight = _review.check(
          this.answer,
          this.reviewInit.currentCard.definition
        );
      } else
        isRight = _review.check(this.answer, this.reviewInit.currentCard.term);

      await this.markAnswer(isRight);
      this.checkedAnswer = true;
      this.isRight = isRight;
    },
    async markAnswer(isRight) {
      /* eslint-disable */
      let currentCard = this.getCurrentCard;

      if (isRight) {
        currentCard.review.right++;
        this.reviewInit.rightAnswers++;
        currentCard.memorized = true;
      } else {
        currentCard.review.wrong++;
        this.reviewInit.wrongAnswers++;
        currentCard.memorized = false;
      }

      await _db.sendReviewResult(currentCard, this.folder.data);
    },
    nextCard() {
      this.answer = "";
      this.showAnswer = false;
      this.checkedAnswer = false;
      this.isRight = false;

      if (this.generator.next().done) {
        this.reviewInit.isFinished = true;
        clearInterval(this.timer);
        clearInterval(this.timeLimit.interval);
      } else
        this.timeLimit.interval = this.timeLimit.limit && setInterval(this.timeToAnswer, 1000);

      this.timeLimit.timePassed = 0;
      this.timeLimit.isTimeOver = false;
    },
    async setAsCorrect() {
      let currentCard = this.getCurrentCard;
      currentCard.review.wrong--;
      this.reviewInit.wrongAnswers--;
      await this.markAnswer(true);
      this.nextCard();
    },
  },

  computed: {
    getCurrentCard() {
      return this.folder.cards.filter(
        (card) => card === this.reviewInit.currentCard
      )[0];
    },
  },
};
</script>

<style lang="sass" scoped>
.review-data, .answer, .examples, .review-data::before
  text-align: center
  font-style: normal
  font-weight: 400
  font-size: 1.375em
  line-height: 28px

  display: -webkit-box
  -webkit-line-clamp: 5
  -webkit-box-orient: vertical
  overflow: hidden

.showExamplesIcon
  display: flex
  position: absolute
  top: 0%
  right: 0%
  width: 20px
  height: 20px

  cursor: pointer

  > *
    display: flex
    width: 20px
    height: 20px

  > img:not([class*="icon_active"])
    display: none

  .icon_active
      display: block

.answer, .examples
  font-weight: 300
  line-height: 20px
  font-size: 1em
  margin-top: 0.5vh

.examples
  margin-top: 0

.input
  font-style: normal
  font-weight: 300
  font-size: 1.1875em
  line-height: 28px

  border: none
  outline: none

  margin-top: 4vh
  margin-bottom: 1vh
  width: 100%
  border-bottom: 1px solid #000

.btns
  display: flex
  justify-content: space-between
  align-items: center

  width: 100%

  > *
    font-style: normal
    font-weight: normal
    font-size: 1em
    line-height: 28px

    border-radius: 5px
    padding: 1.3vh 3vw

    cursor: pointer
    color: #fff
    background: none
    border: none
    outline: none

  .neutral
    background-color: #00A3FF

    &:hover
      background-color: lighten(#00A3FF, 5%)

    &:active
      background-color: darken(#00A3FF, 5%)

  .negative
    background-color: #DA2929

    &:hover
      background-color: lighten(#DA2929, 5%)

    &:active
      background-color: darken(#DA2929, 5%)

.notification
  display: flex
  width: 100%
  font-size: 0.875em
  line-height: 20px
  font-weight: 300
  color: #000

.notification_right
  color: green

.notification_wrong
  color: #DA2929

.total
  text-align: center
  font-weight: 300
  font-size: 1em
  color: #999
</style>
