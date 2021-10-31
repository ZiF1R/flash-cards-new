<template>
  <div class="button" @click.left="$emit('tapBtn')">
    <img src="@/assets/settings/export.svg" />
  </div>
</template>

<style lang="sass" scoped>
.button
    display: flex
    justify-content: center
    align-items: center
    position: relative
    background: var(#{--card-background-default})
    width: 30px
    height: 30px
    cursor: pointer
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1)

    img
        width: 60%
        height: 60%
</style>
