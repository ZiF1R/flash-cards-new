<template>
  <div class="login">
    <form>
      <slot name="auth__header"></slot>
      <div class="auth-btns">
        <slot name="auth__fields"></slot>
        <div class="auth-link">
          <slot name="auth__link"></slot>
        </div>
      </div>
      <div class="auth-finish">
        <slot name="auth__finish"></slot>
      </div>
      <slot name="auth__error"></slot>
    </form>
  </div>
</template>

<style lang="sass">
.login
  display: flex
  position: absolute
  justify-content: center
  align-items: center

  left: 0%
  top: 0%
  margin: 0!important
  width: 100%!important
  height: 100vh

  background: var(#{--body-background-default})
  z-index: 20

  form
    display: flex
    flex-direction: column

    padding: 35px 25px
    width: calc( 35vw - 50px )
    min-width: 350px
    min-height: calc( 47vh - 70px )

    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.1)
    background: var(#{--card-background-default})

    @media screen and (max-width: 501px)
      width: calc( 100% - 50px )
      min-width: 0

    .input
      font-style: normal
      font-weight: 300
      font-size: 1.1875em
      line-height: 28px

      border: none
      outline: none
      background: unset
      color: var(#{--text-color-default})

      margin-bottom: 0vh
      width: 100%
      border-bottom: 1px solid var(#{--text-color-opacity-default})

.auth-text
  font-style: normal
  font-weight: 300
  font-size: 1.625em
  line-height: 42px
  margin-bottom: 3.5vh

.auth-btns
  display: flex
  flex-direction: column

  &:hover .icons > img
    display: block

  &:hover .icons.pass > img:not([class*="active"])
    display: none

  .icons
    display: flex
    justify-content: center
    align-items: center
    position: absolute
    right: 0%
    top: 10%
    height: 50%

    & *
      display: none
      width: 20px
      height: 20px

  .space
    margin-bottom: 3vh

  .inputLimit
    margin-bottom: 1vh

.login__auth-btn
  margin-bottom: 3vh

.auth-link
  font-style: normal
  font-weight: 300
  font-size: 0.875em
  line-height: 22px

.to-login
  text-decoration: underline

.auth-finish
  margin-top: 5vh

.finish
  font-style: normal
  font-weight: normal
  font-size: 1em
  line-height: 28px

  border-radius: 5px
  padding: 10px 35px

  cursor: pointer
  color: #fff
  background: none
  border: none
  outline: none
  background-color: var(#{--primary-color})

  &:hover
    background: lighten(#00A3FF, 6%)

  &:active
    background-color: darken(#00A3FF, 6%)

.auth-btn
  position: relative

.show-pass
  cursor: pointer
  position: absolute

  top: 10%
  right: 0%
  width: 20px
  height: 20px

.err-data
  font-style: normal
  font-weight: 300
  font-size: 0.875em
  line-height: 24px
  margin-top: 2vh
  color: var(#{--danger-color})
</style>
