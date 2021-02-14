<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-3"><Panel /></div>
            <div class="col-lg-9"><Nuxt /></div>
        </div>
    </div>
</template>

<script>
import Panel from "~/components/panel.vue";
export default {};
</script>

<style>
@font-face {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 00;
    font-display: swap;
    src: url("/fonts/Roboto/Roboto-Light.ttf") format("truetype");
}
@font-face {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: url("/fonts/Montserrat/Montserrat-Light.ttf") format("truetype");
}
@font-face {
    font-family: "Comfortaa";
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: url("/fonts/Comfortaa/Comfortaa-Regular.ttf") format("truetype");
}
.modal-body {
    padding: 40px;
}
.modal-footer {
    border: none;
    justify-content: center;
    padding: 40px;
    padding-top: 10px;
}
.modal-footer .btn-secondary {
    background: #ffffff;
    border: 1px solid #000000;
    font-family: Roboto;
    font-size: 20px;
    line-height: 16px;
    color: #000000;
    border-radius: 0;
    padding: 15px 30px;
    margin-right: 22px;
}
.modal-footer .btn-primary {
    background: #106466;
    border: 1px solid #000000;
    font-family: Roboto;
    font-size: 20px;
    line-height: 16px;
    color: #ffffff;
    border-radius: 0;
    padding: 15px 30px;
    margin-right: 22px;
}
.modal-dialog {
    max-width: 850px;
}
</style>
