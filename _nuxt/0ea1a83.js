(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{292:function(t,e,o){var content=o(308);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(52).default)("b08a293e",content,!0,{sourceMap:!1})},307:function(t,e,o){"use strict";o(292)},308:function(t,e,o){(e=o(51)(!1)).push([t.i,".admin[data-v-ba8e3816]{margin:auto}.heading[data-v-ba8e3816]{font-size:25px;line-height:23px;margin-bottom:30px;color:#000}.heading[data-v-ba8e3816],.logo[data-v-ba8e3816]{font-family:Roboto;font-style:normal;font-weight:400}.logo[data-v-ba8e3816]{font-size:55px;line-height:64px;text-align:center;color:#fff;padding-top:100px}.form-horizontal[data-v-ba8e3816]{background:#fff;padding:35px 15px;width:740px;margin:30px auto auto}.btn-default[data-v-ba8e3816],.form-horizontal[data-v-ba8e3816]{border-radius:5px;text-align:center}.btn-default[data-v-ba8e3816]{background:#106466;font-family:Roboto;font-style:normal;font-weight:400;font-size:18px;line-height:14px;display:flex;align-items:center;text-decoration:none;color:#fff;padding:10px 37px;margin:auto}.form-group input[data-v-ba8e3816]{padding:25px;margin-bottom:20px;background:#c4c4c4;border-radius:5px;border:none}.forgot-password[data-v-ba8e3816]{font-style:normal;font-weight:400;font-size:18px;line-height:14px;margin-top:30px;cursor:pointer}.forgot-password[data-v-ba8e3816],.text-form[data-v-ba8e3816]{font-family:Roboto;color:#000}.text-form[data-v-ba8e3816]{text-align:left}.registration[data-v-ba8e3816]{display:none}.registration-active[data-v-ba8e3816]{display:block}.login-active[data-v-ba8e3816]{display:none}.cancel[data-v-ba8e3816]{cursor:pointer}",""]),t.exports=e},336:function(t,e,o){"use strict";o.r(e);var n={layout:"empty",data:function(){return{registration:!1,email:null,password:null,newUser:{},logo:null,file:""}},methods:{auth:function(){var t=this;this.$axios.$post("https://monzun.herokuapp.com/api/auth/login",{email:this.email,password:this.password}).then((function(e){console.log(e),e&&e.token&&(t.$cookies.set("tokenUser",e.token),t.$bvToast.toast("Авторизация прошла успешно!",{title:"Авторизация",variant:"success"}),t.$store.dispatch("getUser"))})).catch((function(e){t.$bvToast.toast("Введите корректный email или пароль.",{title:"Не удалось авторизоваться.",variant:"danger",solid:!0})}))},reg:function(){var t=this;console.log(this.newUser),this.$axios.$post("https://monzun.herokuapp.com/api/auth/register",this.newUser).then((function(e){t.$cookies.set("tokenUser",e.token),t.$bvToast.toast("Регистрация прошла успешно!",{title:"Регистрация",variant:"success"}),t.newUser={},t.registration=!t.registration})).catch((function(e){t.$bvToast.toast("Введите корректные данные",{title:"Не удалось зарегистрироваться.",variant:"danger",solid:!0})}))},visible:function(t){this.registration=!this.registration}}},r=(o(307),o(41)),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"admin"},[o("div",{staticClass:"logo"},[t._v("Monzun")]),t._v(" "),o("div",{staticClass:"login",class:{"login-active":t.registration}},[o("form",{staticClass:"form-horizontal",on:{submit:function(e){return e.preventDefault(),t.auth(e)}}},[o("div",{staticClass:"heading"},[t._v("Вход")]),t._v(" "),o("div",{staticClass:"form-group"},[o("div",{staticClass:"text-form"},[t._v("Электронная почта")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{type:"email",id:"inputEmail"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group help"},[o("div",{staticClass:"text-form"},[t._v("Пароль")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password",id:"inputPassword"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group"},[o("button",{staticClass:"btn btn-default",attrs:{type:"submit"}},[t._v("Вход")]),t._v(" "),o("div",{staticClass:"forgot-password"},[t._v("Забыли пароль?")]),t._v(" "),o("div",{staticClass:"forgot-password",on:{click:t.visible}},[t._v("\n                    Регистрация\n                ")])])])]),t._v(" "),o("div",{staticClass:"registration",class:{"registration-active":t.registration}},[o("form",{staticClass:"form-horizontal",on:{submit:function(e){return e.preventDefault(),t.reg(e)}}},[o("div",{staticClass:"heading"},[t._v("Регистрация")]),t._v(" "),o("div",{staticClass:"form-group"},[o("div",{staticClass:"text-form"},[t._v("Имя")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.newUser.name,expression:"newUser.name"}],staticClass:"form-control",attrs:{type:"text",id:"inputName"},domProps:{value:t.newUser.name},on:{input:function(e){e.target.composing||t.$set(t.newUser,"name",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group"},[o("div",{staticClass:"text-form"},[t._v("Электронная почта")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.newUser.email,expression:"newUser.email"}],staticClass:"form-control",attrs:{type:"email",id:"Email"},domProps:{value:t.newUser.email},on:{input:function(e){e.target.composing||t.$set(t.newUser,"email",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group help"},[o("div",{staticClass:"text-form"},[t._v("Пароль")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.newUser.password,expression:"newUser.password"}],staticClass:"form-control",attrs:{type:"password",id:"Password"},domProps:{value:t.newUser.password},on:{input:function(e){e.target.composing||t.$set(t.newUser,"password",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group"},[o("button",{staticClass:"btn btn-default mt-5",attrs:{type:"submit"}},[t._v("\n                    Зарегистрироваться\n                ")]),t._v(" "),o("div",{staticClass:"cancel",on:{click:t.visible}},[t._v("Отмена")])])])])])}),[],!1,null,"ba8e3816",null);e.default=component.exports}}]);