(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{276:function(t,e,o){var content=o(279);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(52).default)("61d87ffc",content,!0,{sourceMap:!1})},277:function(t,e,o){"use strict";o.r(e);o(20),o(16),o(53),o(63),o(202),o(56);var r=o(17),n=o(0),l={data:function(){var t;return t={isActive:!1,file:[],url:null},Object(n.a)(t,"file",""),Object(n.a)(t,"editUser",{email:"",name:"",phone:"",avatarId:null}),Object(n.a)(t,"logo",{}),t},computed:{user:function(){return this.$store.state.user}},created:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.editUser.name=t.user.name,t.user.logo&&(t.url=t.user.logo.url);case 2:case"end":return e.stop()}}),e)})))()},methods:{visible:function(t){this.isActive=!this.isActive},onFileChange:function(t){var e=this,o=t.target.files[0];this.url=URL.createObjectURL(o),t.target.files[0].size>5e6&&(alert("File is too big!"),this.$refs.file.value=null),this.file=this.$refs.file.files[0];var r=new FormData;r.append("files",this.file),this.$axios.$post("https://monzun.herokuapp.com/api/attachment/upload-image",r,{headers:{Authorization:"Bearer "+this.$cookies.get("tokenUser")}}).then((function(t){e.$bvToast.toast("Изображение добавлено!",{title:"Добавление изображения",variant:"success"}),e.logo=t,e.editUser.avatarId=e.logo.id})).catch((function(t){e.$bvToast.toast("ошибка",{title:"Не удалось отправить изображение",variant:"danger",solid:!0})}))},deleteImage:function(){var t=this;this.$axios.$delete("https://monzun.herokuapp.com/api/attachment/delete/".concat(this.logo.uuid),{headers:{Authorization:"Bearer "+this.$cookies.get("tokenUser")}}).then((function(e){t.$bvToast.toast("Изображение удалено!",{title:"удаление изображений",variant:"success"}),t.$refs.file.value=null})).catch((function(e){t.$bvToast.toast("ошибка",{title:"Не удалось удалить изображение",variant:"danger",solid:!0})}))},changeUser:function(){var t=this;this.editUser.name=this.user.name,this.editUser.phone=this.user.phone,this.editUser.email=this.user.email,this.editUser.name=this.user.name,this.editUser.password=this.user.password,console.log(this.editUser),this.$axios.$put("https://monzun.herokuapp.com/api/me",this.editUser,{headers:{Authorization:"Bearer "+this.$cookies.get("tokenUser")}}).then((function(e){t.$bvToast.toast("Пользователь изменен!",{title:"Изменение пользователя",variant:"success"})})).catch((function(e){t.$bvToast.toast("ошибка",{title:"Не удалось изменить пользователя",variant:"danger",solid:!0})}))}}},c=(o(278),o(41)),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"row admin-panel"},[o("div",{staticClass:"col-12 admin d-flex"},[o("div",{staticClass:"avatar"},[t.user.logo?o("img",{attrs:{src:t.user.logo.url,alt:""}}):t._e(),t._v(" "),t.user.logo?t._e():o("img",{attrs:{src:"/images/noname.jpg",alt:""}})]),t._v(" "),o("div",{staticClass:"name"},[t._v(t._s(t.editUser.name))]),t._v(" "),o("div",{staticClass:"open-toggle",on:{click:t.visible}},[o("img",{attrs:{src:"/images/dropdown-toggle.png",alt:""}})])]),t._v(" "),o("div",{staticClass:"col-12 admin d-flex"},[o("div",{staticClass:"panel",class:{"panel-active":t.isActive}},[o("ul",[o("li",[o("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-edit",modifiers:{"modal-edit":!0}}],staticClass:"btn-edit"},[t._v("Редактировать")])],1),t._v(" "),o("li",[o("nuxt-link",{attrs:{to:{name:"login"}},nativeOn:{click:function(e){t.$cookies.set("tokenUser",""),t.$store.commit("setUser",null)}}},[t._v("Выход")])],1)])])]),t._v(" "),o("b-modal",{attrs:{centered:"","hide-header":"","ok-only":"","ok-title":"Изменить",id:"modal-edit"},on:{ok:t.changeUser}},[o("div",{staticClass:"edit"},[o("form",{attrs:{method:"post"}},[o("div",[t.url?t._e():o("img",{staticClass:"edit-avatar",attrs:{src:"images/noname.jpg",alt:""}}),t._v(" "),t.url?o("img",{staticClass:"edit-avatar",attrs:{src:t.url}}):t._e()]),t._v(" "),o("div",{staticClass:"edit-image d-flex"},[o("input",{ref:"file",attrs:{type:"file",accept:"image/x-png,image/gif,image/jpeg"},on:{change:t.onFileChange}}),t._v(" "),o("div",{staticClass:"dlt",on:{click:t.deleteImage}},[o("img",{attrs:{src:"/images/delete.png",alt:""}})])]),t._v(" "),o("div",{staticClass:"edit-text"},[t._v("Имя")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.user.name,expression:"user.name"}],staticClass:"edit-info",attrs:{type:"text"},domProps:{value:t.user.name},on:{input:function(e){e.target.composing||t.$set(t.user,"name",e.target.value)}}}),t._v(" "),o("div",{staticClass:"edit-text"},[t._v("Электронная почта")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.user.email,expression:"user.email"}],staticClass:"edit-info",attrs:{type:"email"},domProps:{value:t.user.email},on:{input:function(e){e.target.composing||t.$set(t.user,"email",e.target.value)}}}),t._v(" "),o("div",{staticClass:"edit-text"},[t._v("Пароль")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"}],staticClass:"edit-info",attrs:{type:"password"},domProps:{value:t.user.password},on:{input:function(e){e.target.composing||t.$set(t.user,"password",e.target.value)}}}),t._v(" "),o("div",{staticClass:"edit-text"},[t._v("Телефон")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.user.phone,expression:"user.phone"}],staticClass:"edit-info",attrs:{type:"tel"},domProps:{value:t.user.phone},on:{input:function(e){e.target.composing||t.$set(t.user,"phone",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"close",on:{click:function(e){return t.$bvModal.hide("modal-edit")}}},[o("img",{attrs:{src:"/images/close-modal.svg",alt:""}})])])])],1)}),[],!1,null,"26d5fd97",null);e.default=component.exports},278:function(t,e,o){"use strict";o(276)},279:function(t,e,o){(e=o(51)(!1)).push([t.i,".admin-panel[data-v-26d5fd97]{margin-bottom:50px}.name[data-v-26d5fd97]{font-size:18px;line-height:115%;font-family:Futura PT;color:#77797d;margin-right:5px}.admin[data-v-26d5fd97]{align-items:center;justify-content:flex-end}.admin .avatar[data-v-26d5fd97]{margin-right:10px}.avatar img[data-v-26d5fd97]{width:40px;height:40px;border-radius:50px}.open-toggle[data-v-26d5fd97]{cursor:pointer}.admin-panel:hover .panel[data-v-26d5fd97]{opacity:1}.panel[data-v-26d5fd97]{border:1px solid #e2e2e2;background:#f7f5f5;padding:7px 7px 7px 20px;opacity:0;width:160px}.panel-active[data-v-26d5fd97]{opacity:1}.panel li[data-v-26d5fd97]{list-style-type:none;border-bottom:1px solid #e2e2e2;margin-top:10px}.panel li a[data-v-26d5fd97]{color:#000;text-decoration:none}.panel ul[data-v-26d5fd97]{padding:0;margin:0;text-align:center}.btn-edit[data-v-26d5fd97]{padding:0;background:transparent;border:none;color:#000}.close[data-v-26d5fd97]{position:absolute;top:10px;right:10px}.edit[data-v-26d5fd97]{text-align:center}.edit-avatar[data-v-26d5fd97]{width:100px;height:100px;border-radius:50%;margin-bottom:20px}.edit-text[data-v-26d5fd97]{font-family:Roboto;font-size:18px;line-height:16px;-moz-text-align-last:left;text-align-last:left;color:#000;margin-left:80px;margin-bottom:10px;margin-top:10px}form input[data-v-26d5fd97]{width:80%;padding:10px}.edit-image[data-v-26d5fd97]{width:80%;margin-left:150px}.edit-image input[data-v-26d5fd97]{width:400px}",""]),t.exports=e},304:function(t,e,o){var content=o(331);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(52).default)("7cfb2799",content,!0,{sourceMap:!1})},330:function(t,e,o){"use strict";o(304)},331:function(t,e,o){(e=o(51)(!1)).push([t.i,".statistic[data-v-f994e750]{margin-top:30px;font-family:Roboto;font-style:normal;font-weight:400;font-size:18px;line-height:21px;color:#000}.name[data-v-f994e750]{font-family:Futura PT;font-size:18px;line-height:115%;color:#77797d}.admin[data-v-f994e750]{align-items:center;justify-content:flex-end;margin-bottom:50px}.admin .avatar[data-v-f994e750]{margin-right:10px}.btn-back[data-v-f994e750]{background:#c4c4c4;border:none;font-family:Roboto;font-style:normal;font-weight:400;font-size:16px;line-height:19px;color:#000;width:100px;height:35px}.image-set[data-v-f994e750]{background:#c4c4c4;background-size:auto;border:1px solid #000;border-radius:50%;width:120px;height:120px;margin-right:5px}.table[data-v-f994e750]{text-align:center;margin-left:5%;width:90%}.link[data-v-f994e750]{background:transparent;border:none;color:#000;padding:0}.view-report[data-v-f994e750]{display:flex;justify-content:space-between}.view-report .close[data-v-f994e750]{position:absolute;top:10px;right:10px}.view-report .text[data-v-f994e750]{font-size:16px;line-height:19px}.view-report .comment[data-v-f994e750],.view-report .text[data-v-f994e750]{font-family:Roboto;font-style:normal;font-weight:400;color:#000}.view-report .comment[data-v-f994e750]{font-size:14px;line-height:16px;margin-top:15px}.view-report .file a[data-v-f994e750]{font-family:Roboto;font-size:14px;line-height:16px;color:#000;text-decoration:none}.view-report .file[data-v-f994e750]{text-align:center}.btn-edit[data-v-f994e750]{background:transparent;border:none;padding:0 20px 0 0;margin-bottom:20px}.mark select[data-v-f994e750]{width:200px}.view-report textarea[data-v-f994e750]{width:400px;margin-top:20px}",""]),t.exports=e},347:function(t,e,o){"use strict";o.r(e);o(6),o(56);var r=o(17),n={middleware:"authenticated",data:function(){return{startup:{},activeSet:{},activeReport:{},weekReports:[],week:null,newReport:{week:null},removeReport:"",fileIds:[]}},created:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.$get("https://monzun.herokuapp.com/api/startups/".concat(t.$route.params.report),{headers:{Authorization:"Bearer "+t.$cookies.get("tokenUser")}});case 2:return t.startup=e.sent,e.next=5,t.$axios.$get("https://monzun.herokuapp.com/api/trackings/".concat(t.$route.params.idSet),{headers:{Authorization:"Bearer "+t.$cookies.get("tokenUser")}});case 5:return t.activeSet=e.sent,e.next=8,t.$axios.$get("https://monzun.herokuapp.com/api/stats/".concat(t.$route.params.idSet,"/").concat(t.$route.params.report),{headers:{Authorization:"Bearer "+t.$cookies.get("tokenUser")}});case 8:t.weekReports=e.sent,t.weekReports.weeks?t.week=t.weekReports.weeks.length:t.week=0;case 10:case"end":return e.stop()}}),e)})))()},methods:{deleteReport:function(t){var e=this;this.$axios.$delete("https://monzun.herokuapp.com/api/week-reports/".concat(t),{headers:{Authorization:"Bearer "+this.$cookies.get("tokenUser")}}).then((function(t){e.$bvToast.toast("отчет удален!",{title:"удаление отчета",variant:"success"}),e.upload()})).catch((function(t){e.$bvToast.toast("ошибка",{title:"Не удалось удалить отчет",variant:"danger",solid:!0})}))},getReport:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,e.$axios.$get("https://monzun.herokuapp.com/api/week-reports/".concat(t),{headers:{Authorization:"Bearer "+e.$cookies.get("tokenUser")}});case 3:e.activeReport=o.sent,console.log(e.activeReport),e.$refs.report.show(),o.next=11;break;case 8:o.prev=8,o.t0=o.catch(0),e.$bvToast.toast("Не удалось получить данные задачи.",{title:"задача не найдена.",variant:"danger",solid:!0});case 11:case"end":return o.stop()}}),o,null,[[0,8]])})))()},editTaskOpen:function(){this.$refs["edit-report"].show()},editReport:function(){var t=this;this.$axios.$put("https://monzun.herokuapp.com/api/week-reports/".concat(this.activeReport.id),this.activeReport,{headers:{Authorization:"Bearer "+this.$cookies.get("tokenUser")}}).then((function(e){t.$bvToast.toast("задача изменена!",{title:"Изменение задачи",variant:"success"}),t.upload()})).catch((function(e){t.$bvToast.toast("ошибка",{title:"Не удалось изменить задачу",variant:"danger",solid:!0})}))},OpenAddReportModal:function(t){this.newReport.week=t,this.$refs["add-report"].show()},addReport:function(){var t=this;this.$axios.$post("https://monzun.herokuapp.com/api/week-reports/".concat(this.activeSet.id,"/").concat(this.$route.params.report),this.newReport,{headers:{Authorization:"Bearer "+this.$cookies.get("tokenUser")}}).then((function(e){t.$bvToast.toast("отчет добавлен!",{title:"Добавление отчета",variant:"success"}),t.upload()})).catch((function(e){t.$bvToast.toast("ошибка",{title:"Не удалось добавить отчет",variant:"danger",solid:!0})}))},upload:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.$get("https://monzun.herokuapp.com/api/stats/".concat(t.$route.params.idSet,"/").concat(t.$route.params.report),{headers:{Authorization:"Bearer "+t.$cookies.get("tokenUser")}});case 2:t.weekReports=e.sent;case 3:case"end":return e.stop()}}),e)})))()},onSomeFilesChange:function(t){var e=this;t.target.files;t.target.files.size>5e6&&(alert("File is too big!"),this.$refs.files.value=null),this.files=this.$refs.files.files;for(var o=new FormData,i=0;i<this.files.length;i++){var r=this.files[i];o.append("files",r)}this.$axios.$post("https://monzun.herokuapp.com/api/attachment/upload",o,{headers:{Authorization:"Bearer "+this.$cookies.get("tokenUser")}}).then((function(t){e.$bvToast.toast("файлы добавлены!",{title:"Добавление файлов",variant:"success"}),e.listFiles=t;for(var o=0;o<e.listFiles.length;o++)e.fileIds.push(e.listFiles[o].id);e.newReport.fileIds=e.fileIds})).catch((function(t){e.$bvToast.toast("ошибка",{title:"Не удалось загрузить файлы",variant:"danger",solid:!0})}))}}},l=(o(330),o(41)),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"statistic"},[o("Client"),t._v(" "),o("div",{staticClass:"row"},[o("div",{staticClass:"col-12 d-flex justify-content-between align-items-center"},[o("div",{staticClass:"photo"},[t.startup.logo?o("img",{staticClass:"image-set",attrs:{src:t.startup.logo.url,alt:""}}):t._e()]),t._v(" "),o("button",{staticClass:"btn-back",on:{click:function(e){return e.preventDefault(),t.$router.go(-1)}}},[t._v("\n                Назад\n            ")])])]),t._v(" "),o("div",{staticClass:"row mt-3"},[o("div",{staticClass:"col-4"},[t._v(t._s(t.startup.name))]),t._v(" "),o("div",{staticClass:"col-4"},[t._v("Текущая неделя: "+t._s(t.week))]),t._v(" "),o("div",{staticClass:"col-4"},[t._v("\n            Итоговая оценка: "+t._s(t.weekReports.avgEstimate)+"\n        ")])]),t._v(" "),o("div",{staticClass:"row mt-3"},[o("div",{staticClass:"col-12"},[o("table",{staticClass:"table table-bordered"},[t._m(0),t._v(" "),t._l(t.weekReports.weeks,(function(e,r){return o("tbody",{key:r},[o("tr",[o("td",[t._v(t._s(r+1))]),t._v(" "),o("td",[t._v("\n                            "+t._s(e.estimate)+"\n                            "),e.reportId?t._e():o("span",[t._v("нет отчета")])]),t._v(" "),o("td",[e.reportId?t._e():o("b-button",{staticClass:"link",on:{click:function(e){return t.OpenAddReportModal(r+1)}}},[t._v("\n                                Добавить отчёт")]),t._v(" "),e.reportId?o("b-button",{staticClass:"link",on:{click:function(o){return t.getReport(e.reportId)}}},[t._v("\n                                Отчёт")]):t._e()],1)])])}))],2),t._v(" "),o("b-modal",{ref:"report",attrs:{centered:"","hide-header":"","ok-only":"","ok-title":"Ок",id:"modal-report"}},[o("div",{staticClass:"btns"},[o("button",{staticClass:"btn-edit",on:{click:function(e){return t.editTaskOpen(t.activeReport.id)}}},[o("img",{attrs:{src:"/images/edit.png",alt:""}})]),t._v(" "),o("button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-delete",modifiers:{"modal-delete":!0}}],staticClass:"btn-edit",on:{click:function(e){t.removeReport=t.activeReport.id}}},[o("img",{attrs:{src:"/images/delete.png",alt:""}})])]),t._v(" "),o("div",{staticClass:"view-report"},[o("div",[o("div",{staticClass:"text"},[t._v("Коментарий")]),t._v(" "),o("div",{staticClass:"comment"},[t._v("\n                            "+t._s(t.activeReport.comment)+"\n                        ")])]),t._v(" "),o("div",[t.activeReport.estimate?o("div",{staticClass:"mark mb-5"},[t._v("\n                            Оценка: "+t._s(t.activeReport.estimate.score)+"\n                            "+t._s(t.activeReport.estimate.description)+"\n                        ")]):t._e(),t._v(" "),t._l(t.activeReport.attachments,(function(e,r){return o("div",{key:r,staticClass:"file"},[o("a",{attrs:{href:e.url,target:"_blank"}},[o("img",{staticClass:"mb-2",attrs:{src:"/images/file.png",alt:""}})]),t._v("\n                            "+t._s(e.originalFilename)+"\n                        ")])}))],2),t._v(" "),o("div",{staticClass:"close",on:{click:function(e){return t.$bvModal.hide("modal-report")}}},[o("img",{attrs:{src:"/images/close-modal.svg",alt:""}})])])]),t._v(" "),o("b-modal",{ref:"add-report",attrs:{centered:"","hide-header":"","ok-only":"","ok-title":"Ок",id:"add-report"},on:{ok:t.addReport}},[o("div",{staticClass:"view-report"},[o("div",[o("div",{staticClass:"text"},[t._v("Коментарий")]),t._v(" "),o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.newReport.comment,expression:"newReport.comment"}],attrs:{cols:"5",rows:"5"},domProps:{value:t.newReport.comment},on:{input:function(e){e.target.composing||t.$set(t.newReport,"comment",e.target.value)}}})]),t._v(" "),o("div",[o("div",{staticClass:"mark mb-5"},[t._v("\n                            Оценка:\n                            "),o("select",{directives:[{name:"model",rawName:"v-model",value:t.newReport.estimate,expression:"newReport.estimate"}],on:{change:function(e){var o=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.newReport,"estimate",e.target.multiple?o:o[0])}}},[o("option",{attrs:{value:"1"}},[t._v("1")]),t._v(" "),o("option",{attrs:{value:"2"}},[t._v("2")]),t._v(" "),o("option",{attrs:{value:"3"}},[t._v("3")]),t._v(" "),o("option",{attrs:{value:"4"}},[t._v("4")]),t._v(" "),o("option",{attrs:{value:"5"}},[t._v("5")])])]),t._v(" "),o("div",{staticClass:"file"},[t._v("\n                            Прикрепленные Файлы\n                            "),o("div",[o("img",{attrs:{src:"/images/file.png",alt:""}})]),t._v(" "),o("input",{ref:"files",attrs:{type:"file",multiple:"",required:"",id:"files"},on:{change:t.onSomeFilesChange}})])]),t._v(" "),o("div",{staticClass:"close",on:{click:function(e){return t.$bvModal.hide("modal-report")}}},[o("img",{attrs:{src:"/images/close-modal.svg",alt:""}})])])]),t._v(" "),o("b-modal",{ref:"edit-report",attrs:{centered:"","hide-header":"","ok-only":"","ok-title":"Ок",id:"edit-report"},on:{ok:t.editReport}},[o("div",{staticClass:"view-report"},[o("div",[o("div",{staticClass:"text"},[t._v("Коментарий")]),t._v(" "),o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.activeReport.comment,expression:"activeReport.comment"}],attrs:{cols:"5",rows:"5"},domProps:{value:t.activeReport.comment},on:{input:function(e){e.target.composing||t.$set(t.activeReport,"comment",e.target.value)}}})]),t._v("\n                    >\n                    "),o("div",[o("div",{staticClass:"mark mb-5"},[t._v("\n                            Оценка:\n                            "),o("select",{directives:[{name:"model",rawName:"v-model",value:t.activeReport.estimate,expression:"activeReport.estimate"}],on:{change:function(e){var o=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.activeReport,"estimate",e.target.multiple?o:o[0])}}},[o("option",{attrs:{value:"1"}},[t._v("1")]),t._v(" "),o("option",{attrs:{value:"2"}},[t._v("2")]),t._v(" "),o("option",{attrs:{value:"3"}},[t._v("3")]),t._v(" "),o("option",{attrs:{value:"4"}},[t._v("4")]),t._v(" "),o("option",{attrs:{value:"5"}},[t._v("5")])])]),t._v(" "),t._l(t.activeReport.attachments,(function(e,r){return o("div",{key:r,staticClass:"file"},[o("a",{attrs:{href:e.url,target:"_blank"}},[o("img",{staticClass:"mb-2",attrs:{src:"/images/file.png",alt:""}})]),t._v("\n                            "+t._s(e.originalFilename)+"\n                        ")])}))],2),t._v(" "),o("div",{staticClass:"close",on:{click:function(e){return t.$bvModal.hide("modal-report")}}},[o("img",{attrs:{src:"/images/close-modal.svg",alt:""}})])])]),t._v(" "),o("b-modal",{attrs:{centered:"","hide-header":"","ok-title":"Да","cancel-title":"Нет",id:"modal-delete"},on:{hidden:function(e){t.removeReport=""},ok:function(e){return t.deleteReport(t.removeReport)}}},[o("div",{staticClass:"delete-tracker"},[o("div",{staticClass:"text"},[t._v("\n                        Вы действительно хотите удалить ?\n                    ")]),t._v(" "),o("div",{staticClass:"close",on:{click:function(e){return t.$bvModal.hide("modal-delete")}}},[o("img",{attrs:{src:"/images/close-modal.svg",alt:""}})])])])],1)])],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{attrs:{scope:"col"}},[this._v("Недели")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Оценки")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Отчет")])])])}],!1,null,"f994e750",null);e.default=component.exports;installComponents(component,{Client:o(277).default})}}]);