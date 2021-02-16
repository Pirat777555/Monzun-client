<template>
    <div class="statistic">
        <Client></Client>
        <div class="row">
            <div
                class="col-12 d-flex justify-content-between align-items-center"
            >
                <div class="photo">
                    <img
                        :src="startup.logo.url"
                        v-if="startup.logo"
                        alt=""
                        class="image-set"
                    />
                </div>
                <button class="btn-back" @click.prevent="$router.go(-1)">
                    Назад
                </button>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-4">{{ startup.name }}</div>
            <div class="col-4">Текущая неделя: {{ week }}</div>
            <div class="col-4">
                Итоговая оценка: {{ weekReports.avgEstimate }}
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Недели</th>
                            <th scope="col">Оценки</th>
                            <th scope="col">Отчет</th>
                        </tr>
                    </thead>
                    <tbody
                        v-for="(item, index) in weekReports.weeks"
                        :key="index"
                    >
                        <tr>
                            <td>{{ index + 1 }}</td>
                            <td>
                                {{ item.estimate }}
                                <span v-if="!item.reportId">нет отчета</span>
                            </td>
                            <td>
                                <b-button
                                    class="link"
                                    @click="OpenAddReportModal(index + 1)"
                                    v-if="!item.reportId"
                                >
                                    Добавить отчёт</b-button
                                >
                                <b-button
                                    class="link"
                                    @click="getReport(item.reportId)"
                                    v-if="item.reportId"
                                >
                                    Отчёт</b-button
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
                <b-modal
                    centered
                    hide-header
                    ok-only
                    ok-title="Ок"
                    ref="report"
                    id="modal-report"
                >
                    <div class="btns">
                        <button
                            class="btn-edit"
                            @click="editTaskOpen(activeReport.id)"
                        >
                            <img src="/images/edit.png" alt="" />
                        </button>
                        <button
                            class="btn-edit"
                            @click="removeReport = activeReport.id"
                            v-b-modal.modal-delete
                        >
                            <img src="/images/delete.png" alt="" />
                        </button>
                    </div>
                    <div class="view-report">
                        <div>
                            <div class="text">Коментарий</div>
                            <div class="comment">
                                {{ activeReport.comment }}
                            </div>
                        </div>
                        <div>
                            <div class="mark mb-5" v-if="activeReport.estimate">
                                Оценка: {{ activeReport.estimate.score }}
                                {{ activeReport.estimate.description }}
                            </div>
                            <div
                                class="file"
                                v-for="(
                                    file, index
                                ) in activeReport.attachments"
                                :key="index"
                            >
                                <a :href="file.url" target="_blank"
                                    ><img
                                        src="/images/file.png"
                                        alt=""
                                        class="mb-2"
                                /></a>
                                {{ file.originalFilename }}
                            </div>
                        </div>
                        <div
                            class="close"
                            @click="$bvModal.hide('modal-report')"
                        >
                            <img src="/images/close-modal.svg" alt="" />
                        </div>
                    </div>
                </b-modal>
                <b-modal
                    centered
                    hide-header
                    ok-only
                    ok-title="Ок"
                    ref="add-report"
                    id="add-report"
                    @ok="addReport"
                >
                    <div class="view-report">
                        <div>
                            <div class="text">Коментарий</div>
                            <textarea
                                cols="5"
                                rows="5"
                                v-model="newReport.comment"
                            ></textarea>
                        </div>
                        <div>
                            <div class="mark mb-5">
                                Оценка:
                                <select v-model="newReport.estimate">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div class="file">
                                Прикрепленные Файлы
                                <div>
                                    <img src="/images/file.png" alt="" />
                                </div>
                                <input
                                    type="file"
                                    multiple
                                    required
                                    id="files"
                                    ref="files"
                                    @change="onSomeFilesChange"
                                />
                            </div>
                        </div>
                        <div
                            class="close"
                            @click="$bvModal.hide('modal-report')"
                        >
                            <img src="/images/close-modal.svg" alt="" />
                        </div>
                    </div>
                </b-modal>
                <b-modal
                    centered
                    hide-header
                    ok-only
                    ok-title="Ок"
                    ref="edit-report"
                    id="edit-report"
                    @ok="editReport"
                >
                    <div class="view-report">
                        <div>
                            <div class="text">Коментарий</div>
                            <textarea
                                cols="5"
                                rows="5"
                                v-model="activeReport.comment"
                            ></textarea>
                        </div>
                        >
                        <div>
                            <div class="mark mb-5">
                                Оценка:
                                <select v-model="activeReport.estimate">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div
                                class="file"
                                v-for="(
                                    file, index
                                ) in activeReport.attachments"
                                :key="index"
                            >
                                <a :href="file.url" target="_blank"
                                    ><img
                                        src="/images/file.png"
                                        alt=""
                                        class="mb-2"
                                /></a>
                                {{ file.originalFilename }}
                            </div>
                        </div>
                        <div
                            class="close"
                            @click="$bvModal.hide('modal-report')"
                        >
                            <img src="/images/close-modal.svg" alt="" />
                        </div>
                    </div>
                </b-modal>
                <b-modal
                    centered
                    hide-header
                    ok-title="Да"
                    cancel-title="Нет"
                    id="modal-delete"
                    @hidden="removeReport = ''"
                    @ok="deleteReport(removeReport)"
                >
                    <div class="delete-tracker">
                        <div class="text">
                            Вы действительно хотите удалить ?
                        </div>
                        <div
                            class="close"
                            @click="$bvModal.hide('modal-delete')"
                        >
                            <img src="/images/close-modal.svg" alt="" />
                        </div>
                    </div>
                </b-modal>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    middleware: "authenticated",
    data: function () {
        return {
            startup: {},
            activeSet: {},
            activeReport: {},
            weekReports: [],
            week: null,
            newReport: { week: null },
            removeReport: "",
            fileIds: [],
        };
    },
    async created() {
        this.startup = await this.$axios.$get(
            `https://monzun.herokuapp.com/api/startups/${this.$route.params.report}`,
            {
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("tokenUser"),
                },
            }
        );
        this.activeSet = await this.$axios.$get(
            `https://monzun.herokuapp.com/api/trackings/${this.$route.params.idSet}`,
            {
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("tokenUser"),
                },
            }
        );
        this.weekReports = await this.$axios.$get(
            `https://monzun.herokuapp.com/api/stats/${this.$route.params.idSet}/${this.$route.params.report}`,
            {
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("tokenUser"),
                },
            }
        );
        if (this.weekReports.weeks) {
            this.week = this.weekReports.weeks.length;
        } else {
            this.week = 0;
        }
    },
    methods: {
        deleteReport(index) {
            this.$axios
                .$delete(
                    `https://monzun.herokuapp.com/api/week-reports/${index}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("tokenUser"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("отчет удален!", {
                        title: "удаление отчета",
                        variant: "success",
                    });
                    this.upload();
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось удалить отчет",
                        variant: "danger",
                        solid: true,
                    });
                });
        },
        async getReport(id) {
            try {
                this.activeReport = await this.$axios.$get(
                    `https://monzun.herokuapp.com/api/week-reports/${id}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("tokenUser"),
                        },
                    }
                );
                console.log(this.activeReport);
                this.$refs["report"].show();
            } catch {
                this.$bvToast.toast("Не удалось получить данные задачи.", {
                    title: "задача не найдена.",
                    variant: "danger",
                    solid: true,
                });
            }
        },
        editTaskOpen() {
            this.$refs["edit-report"].show();
        },

        editReport() {
            this.$axios
                .$put(
                    `https://monzun.herokuapp.com/api/week-reports/${this.activeReport.id}`,
                    this.activeReport,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("tokenUser"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("задача изменена!", {
                        title: "Изменение задачи",
                        variant: "success",
                    });
                    this.upload();
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось изменить задачу",
                        variant: "danger",
                        solid: true,
                    });
                });
        },
        OpenAddReportModal(week) {
            this.newReport.week = week;
            this.$refs["add-report"].show();
        },
        addReport() {
            this.$axios
                .$post(
                    `https://monzun.herokuapp.com/api/week-reports/${this.activeSet.id}/${this.$route.params.report}`,
                    this.newReport,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("tokenUser"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("отчет добавлен!", {
                        title: "Добавление отчета",
                        variant: "success",
                    });
                    this.upload();
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось добавить отчет",
                        variant: "danger",
                        solid: true,
                    });
                });
        },
        async upload() {
            this.weekReports = await this.$axios.$get(
                `https://monzun.herokuapp.com/api/stats/${this.$route.params.idSet}/${this.$route.params.report}`,
                {
                    headers: {
                        Authorization:
                            "Bearer " + this.$cookies.get("tokenUser"),
                    },
                }
            );
        },

        onSomeFilesChange(e) {
            const file = e.target.files;
            if (e.target.files.size > 5000000) {
                alert("File is too big!");
                this.$refs.files.value = null;
            }
            this.files = this.$refs.files.files;
            let formData = new FormData();
            for (var i = 0; i < this.files.length; i++) {
                let file = this.files[i];
                formData.append("files", file);
            }
            this.$axios //отправка файлов на сервер
                .$post(
                    "https://monzun.herokuapp.com/api/attachment/upload",
                    formData,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("tokenUser"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("файлы добавлены!", {
                        title: "Добавление файлов",
                        variant: "success",
                    });

                    this.listFiles = response;
                    for (let i = 0; i < this.listFiles.length; i++) {
                        this.fileIds.push(this.listFiles[i].id);
                    }
                    this.newReport.fileIds = this.fileIds;
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось загрузить файлы",
                        variant: "danger",
                        solid: true,
                    });
                });
        },
    },
};
</script>
<style scoped>
.statistic {
    margin-top: 30px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
}
.name {
    font-family: Futura PT;
    font-size: 18px;
    line-height: 115%;

    color: #77797d;
}
.admin {
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 50px;
}
.admin .avatar {
    margin-right: 10px;
}
.btn-back {
    background: #c4c4c4;
    border: none;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    width: 100px;
    height: 35px;
}
.image-set {
    background: #c4c4c4;
    background-size: auto;
    border: 1px solid #000000;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    margin-right: 5px;
}
.table {
    text-align: center;
    margin-left: 5%;
    width: 90%;
}
.link {
    background: transparent;
    border: none;
    color: #000000;
    padding: 0;
}
.view-report {
    display: flex;
    justify-content: space-between;
}
.view-report .close {
    position: absolute;
    top: 10px;
    right: 10px;
}
.view-report .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
}
.view-report .comment {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;

    color: #000000;
    margin-top: 15px;
}
.view-report .file a {
    font-family: Roboto;
    font-size: 14px;
    line-height: 16px;
    color: #000000;
    text-decoration: none;
}
.view-report .file {
    text-align: center;
}
.btn-edit {
    background: transparent;
    border: none;
    padding: 0;
    padding-right: 20px;
    margin-bottom: 20px;
}
.mark select {
    width: 200px;
}
.view-report textarea {
    width: 400px;
    margin-top: 20px;
}
</style>