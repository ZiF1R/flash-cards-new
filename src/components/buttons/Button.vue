<template>
  <div class="button" @click.left="switchBtn($event)">
    <img src="@/assets/settings/export.svg" />
  </div>
</template>

<style lang="sass" scoped>
.button
    display: flex
    justify-content: center
    align-items: center
    position: relative
    background: #fff
    width: 30px
    height: 30px
    cursor: pointer
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1)
    transition: background .15s ease-in-out

    img
        width: 70%
        height: 70%

    &-active
        background: #00A3FF
</style>
