(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{276:function(t,e,n){var content=n(279);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(52).default)("61d87ffc",content,!0,{sourceMap:!1})},277:function(t,e,n){"use strict";n.r(e);n(20),n(16),n(53),n(63),n(202),n(56);var o=n(17),r=n(0),d={data:function(){var t;return t={isActive:!1,file:[],url:null},Object(r.a)(t,"file",""),Object(r.a)(t,"editUser",{email:"",name:"",phone:"",avatarId:null}),Object(r.a)(t,"logo",{}),t},computed:{user:function(){return this.$store.state.user}},created:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.editUser.name=t.user.name,t.user.logo&&(t.url=t.user.logo.url);case 2:case"end":return e.stop()}}),e)})))()},methods:{visible:function(t){this.isActive=!this.isActive},onFileChange:function(t){var e=this,n=t.target.files[0];this.url=URL.createObjectURL(n),t.target.files[0].size>5e6&&(alert("File is too big!"),this.$refs.file.value=null),this.file=this.$refs.file.files[0];var o=new FormData;o.append("files",this.file),this.$axios.$post("https://monzun.herokuapp.com/api/attachment/upload-image",o,{headers:{Authorization:"Bearer "+this.$cookies.get("tokenUser")}}).then((function(t){e.$bvToast.toast("Изображение добавлено!",{title:"Добавление изображения",variant:"success"}),e.logo=t,e.editUser.avatarId=e.logo.id})).catch((function(t){e.$bvToast.toast("ошибка",{title:"Не удалось отправить изображение",variant:"danger",solid:!0})}))},deleteImage:function(){var t=this;this.$axios.$delete("https://monzun.herokuapp.com/api/attachment/delete/".concat(this.logo.uuid),{headers:{Authorization:"Bearer "+this.$cookies.get("tokenUser")}}).then((function(e){t.$bvToast.toast("Изображение удалено!",{title:"удаление изображений",variant:"success"}),t.$refs.file.value=null})).catch((function(e){t.$bvToast.toast("ошибка",{title:"Не удалось удалить изображение",variant:"danger",solid:!0})}))},changeUser:function(){var t=this;this.editUser.name=this.user.name,this.editUser.phone=this.user.phone,this.editUser.email=this.user.email,this.editUser.name=this.user.name,this.editUser.password=this.user.password,console.log(this.editUser),this.$axios.$put("https://monzun.herokuapp.com/api/me",this.editUser,{headers:{Authorization:"Bearer "+this.$cookies.get("tokenUser")}}).then((function(e){t.$bvToast.toast("Пользователь изменен!",{title:"Изменение пользователя",variant:"success"})})).catch((function(e){t.$bvToast.toast("ошибка",{title:"Не удалось изменить пользователя",variant:"danger",solid:!0})}))}}},l=(n(278),n(41)),component=Object(l.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row admin-panel"},[n("div",{staticClass:"col-12 admin d-flex"},[n("div",{staticClass:"avatar"},[t.user.logo?n("img",{attrs:{src:t.user.logo.url,alt:""}}):t._e(),t._v(" "),t.user.logo?t._e():n("img",{attrs:{src:"/images/noname.jpg",alt:""}})]),t._v(" "),n("div",{staticClass:"name"},[t._v(t._s(t.editUser.name))]),t._v(" "),n("div",{staticClass:"open-toggle",on:{click:t.visible}},[n("img",{attrs:{src:"/images/dropdown-toggle.png",alt:""}})])]),t._v(" "),n("div",{staticClass:"col-12 admin d-flex"},[n("div",{staticClass:"panel",class:{"panel-active":t.isActive}},[n("ul",[n("li",[n("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-edit",modifiers:{"modal-edit":!0}}],staticClass:"btn-edit"},[t._v("Редактировать")])],1),t._v(" "),n("li",[n("nuxt-link",{attrs:{to:{name:"login"}},nativeOn:{click:function(e){t.$cookies.set("tokenUser",""),t.$store.commit("setUser",null)}}},[t._v("Выход")])],1)])])]),t._v(" "),n("b-modal",{attrs:{centered:"","hide-header":"","ok-only":"","ok-title":"Изменить",id:"modal-edit"},on:{ok:t.changeUser}},[n("div",{staticClass:"edit"},[n("form",{attrs:{method:"post"}},[n("div",[t.url?t._e():n("img",{staticClass:"edit-avatar",attrs:{src:"images/noname.jpg",alt:""}}),t._v(" "),t.url?n("img",{staticClass:"edit-avatar",attrs:{src:t.url}}):t._e()]),t._v(" "),n("div",{staticClass:"edit-image d-flex"},[n("input",{ref:"file",attrs:{type:"file",accept:"image/x-png,image/gif,image/jpeg"},on:{change:t.onFileChange}}),t._v(" "),n("div",{staticClass:"dlt",on:{click:t.deleteImage}},[n("img",{attrs:{src:"/images/delete.png",alt:""}})])]),t._v(" "),n("div",{staticClass:"edit-text"},[t._v("Имя")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.user.name,expression:"user.name"}],staticClass:"edit-info",attrs:{type:"text"},domProps:{value:t.user.name},on:{input:function(e){e.target.composing||t.$set(t.user,"name",e.target.value)}}}),t._v(" "),n("div",{staticClass:"edit-text"},[t._v("Электронная почта")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.user.email,expression:"user.email"}],staticClass:"edit-info",attrs:{type:"email"},domProps:{value:t.user.email},on:{input:function(e){e.target.composing||t.$set(t.user,"email",e.target.value)}}}),t._v(" "),n("div",{staticClass:"edit-text"},[t._v("Пароль")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"}],staticClass:"edit-info",attrs:{type:"password"},domProps:{value:t.user.password},on:{input:function(e){e.target.composing||t.$set(t.user,"password",e.target.value)}}}),t._v(" "),n("div",{staticClass:"edit-text"},[t._v("Телефон")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.user.phone,expression:"user.phone"}],staticClass:"edit-info",attrs:{type:"tel"},domProps:{value:t.user.phone},on:{input:function(e){e.target.composing||t.$set(t.user,"phone",e.target.value)}}})]),t._v(" "),n("div",{staticClass:"close",on:{click:function(e){return t.$bvModal.hide("modal-edit")}}},[n("img",{attrs:{src:"/images/close-modal.svg",alt:""}})])])])],1)}),[],!1,null,"26d5fd97",null);e.default=component.exports},278:function(t,e,n){"use strict";n(276)},279:function(t,e,n){(e=n(51)(!1)).push([t.i,".admin-panel[data-v-26d5fd97]{margin-bottom:50px}.name[data-v-26d5fd97]{font-size:18px;line-height:115%;font-family:Futura PT;color:#77797d;margin-right:5px}.admin[data-v-26d5fd97]{align-items:center;justify-content:flex-end}.admin .avatar[data-v-26d5fd97]{margin-right:10px}.avatar img[data-v-26d5fd97]{width:40px;height:40px;border-radius:50px}.open-toggle[data-v-26d5fd97]{cursor:pointer}.admin-panel:hover .panel[data-v-26d5fd97]{opacity:1}.panel[data-v-26d5fd97]{border:1px solid #e2e2e2;background:#f7f5f5;padding:7px 7px 7px 20px;opacity:0;width:160px}.panel-active[data-v-26d5fd97]{opacity:1}.panel li[data-v-26d5fd97]{list-style-type:none;border-bottom:1px solid #e2e2e2;margin-top:10px}.panel li a[data-v-26d5fd97]{color:#000;text-decoration:none}.panel ul[data-v-26d5fd97]{padding:0;margin:0;text-align:center}.btn-edit[data-v-26d5fd97]{padding:0;background:transparent;border:none;color:#000}.close[data-v-26d5fd97]{position:absolute;top:10px;right:10px}.edit[data-v-26d5fd97]{text-align:center}.edit-avatar[data-v-26d5fd97]{width:100px;height:100px;border-radius:50%;margin-bottom:20px}.edit-text[data-v-26d5fd97]{font-family:Roboto;font-size:18px;line-height:16px;-moz-text-align-last:left;text-align-last:left;color:#000;margin-left:80px;margin-bottom:10px;margin-top:10px}form input[data-v-26d5fd97]{width:80%;padding:10px}.edit-image[data-v-26d5fd97]{width:80%;margin-left:150px}.edit-image input[data-v-26d5fd97]{width:400px}",""]),t.exports=e},280:function(t,e,n){var content=n(283);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(52).default)("1c7f5cee",content,!0,{sourceMap:!1})},281:function(t,e,n){"use strict";n.r(e);n(203);var o={name:"user",props:{id:{type:Number,default:null},name:{type:String,default:""},photo:{type:String,default:""},description:{type:String,default:""},startData:{type:String,default:""},endData:{type:String,default:""},active:{type:Boolean,default:!0},startups:{type:Array,default:function(){return[]}}}},r=(n(282),n(41)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-12 col-lg-3 mb-3"},[n("div",{staticClass:"user"},[n("div",{staticClass:"user-photo"},[t.photo?n("img",{attrs:{src:t.photo.url,alt:""}}):t._e(),t._v(" "),t.photo?t._e():n("img",{attrs:{src:"/images/set1.png",alt:""}})]),t._v(" "),n("div",{staticClass:"user-login"},[t._v(t._s(t.name))]),t._v(" "),n("button",{staticClass:"details",on:{click:function(e){return t.$emit("getSet")}}},[t._v("\n            Подробнее "),n("img",{attrs:{src:"/images/arrow.svg",alt:""}})])])])}),[],!1,null,"f1e74454",null);e.default=component.exports},282:function(t,e,n){"use strict";n(280)},283:function(t,e,n){(e=n(51)(!1)).push([t.i,".user[data-v-f1e74454]{background:#3a3a3a;padding:10px;text-align:left;height:100%}.user:hover .details[data-v-f1e74454],.user:hover .edit[data-v-f1e74454]{opacity:1}.user[data-v-f1e74454]:hover{box-shadow:0 2px 22px rgba(27,32,44,.25);background:#535353}.user-login[data-v-f1e74454]{font-family:Roboto;font-style:normal;font-weight:400;font-size:16px;line-height:19px;color:#fff;margin-top:20px;text-align:left;cursor:pointer}.user-photo img[data-v-f1e74454]{text-align:center;width:100%;margin-top:50px}.details[data-v-f1e74454]{text-align:left;cursor:pointer;opacity:0;border:none;background:transparent;margin-top:10px;font-family:Montserrat;font-style:normal;font-weight:400;font-size:16px;line-height:20px;color:#fff}.btn[data-v-f1e74454]{padding:0}.edit[data-v-f1e74454]{display:flex;justify-content:flex-end;margin-bottom:5px;opacity:0}.edit .change[data-v-f1e74454]{margin-right:10px}.edit .change[data-v-f1e74454],.edit .delete[data-v-f1e74454]{cursor:pointer;border:none;background:transparent;padding:0}",""]),t.exports=e},295:function(t,e,n){var content=n(314);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(52).default)("05a07e16",content,!0,{sourceMap:!1})},313:function(t,e,n){"use strict";n(295)},314:function(t,e,n){(e=n(51)(!1)).push([t.i,".sets[data-v-abef0aae]{margin-top:30px}",""]),t.exports=e},339:function(t,e,n){"use strict";n.r(e);n(56);var o=n(17),r={name:"sets",components:{Set:n(281).default},middleware:"authenticated",data:function(){return{newSet:{},activeSet:{},sets:[]}},computed:{user:function(){return this.$store.state.user}},created:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return 3==t.user.role.roleId&&t.$router.push({name:"sets_tracker"}),e.next=3,t.$axios.$get("https://monzun.herokuapp.com/api/trackings",{headers:{Authorization:"Bearer "+t.$cookies.get("tokenUser")}});case 3:t.sets=e.sent,console.log(t.sets);case 5:case"end":return e.stop()}}),e)})))()},methods:{getSet:function(t){this.$router.push({name:"sets-id",params:{id:t}})}}},d=(n(313),n(41)),component=Object(d.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sets"},[n("div",{staticClass:"container"},[n("Client"),t._v(" "),n("div",{staticClass:"row"},t._l(t.sets,(function(e,o){return n("Set",{key:o,attrs:{name:e.name,photo:e.logo,id:e.id},on:{getSet:function(n){return t.getSet(e.id)}}})})),1)],1)])}),[],!1,null,"abef0aae",null);e.default=component.exports;installComponents(component,{Client:n(277).default,Set:n(281).default})}}]);