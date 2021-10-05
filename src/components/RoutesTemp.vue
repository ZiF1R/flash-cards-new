<template>
  <div class="slot-page">
    <div class="page__head">
      <slot name="page_head"></slot>
    </div>
    <slot name="page_path"></slot>
    <slot name="page_filters"></slot>
    <slot name="space"></slot>
    <hr class="pageUnderline" />
    <slot name="page_content"></slot>
    <!-- <div class="page__content">
    </div> -->
  </div>
</template>

<style lang="sass" scoped>
.page
  display: flex
  flex-direction: column

.page__head
  padding-top: 6vh
  display: flex
  flex-direction: row
  align-items: center
  height: 7vh

  user-select: none
  -moz-user-select: -moz-none
  -webkit-user-select: none
  -ms-user-select: none

.pageUnderline
  width: 40%

// .page__content
//   display: flex
//   position: relative
//   flex-wrap: wrap
//   justify-content: flex-start
//   margin-top: 5vh

//   flex-direction: column
</style>
