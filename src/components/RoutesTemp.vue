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
  width: 30vw
  min-width: 170px

  @media screen and (max-width: 901px)
    width: 55vw

  @media screen and (max-width: 501px)
    width: 95%
</style>
