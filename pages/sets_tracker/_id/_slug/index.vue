<template>
    <div class="set">
        <div class="container">
            <Client></Client>
            <div class="row justify-content-end">
                <div class="col-auto">
                    <button class="btn-back" @click.prevent="$router.go(-1)">
                        Назад
                    </button>
                </div>
            </div>
            <div class="row info-set">
                <div class="col-lg-3">{{ activeSet.name }}</div>
                <div class="col-lg-3">
                    Дата конца набора
                    {{ activeSet.endedAt }}
                </div>
                <div class="col-lg-3">
                    Неделя {{ weekDate(activeSet.startedAt) }}
                </div>
                <div class="col-lg-3">
                    <progress-bar
                        :value="progres(activeSet.startedAt, activeSet.endedAt)"
                    />
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-3">
                    <div class="p-2 alert alert-secondary">
                        <h6>
                            <b-button class="btn-task" v-b-modal.modal-newTask>
                                Планируется +</b-button
                            >
                        </h6>
                        <draggable
                            class="list-group kanban-column"
                            :list="arrToDo"
                            group="tasks"
                            @change="add($event, 1)"
                        >
                            <div
                                class="list-group-item"
                                v-for="element in arrToDo"
                                :key="element.id"
                            >
                                <b-button
                                    class="btn-task"
                                    @click="getTask(element.id)"
                                >
                                    <b>{{ element.name }}</b></b-button
                                >
                                <br />
                                {{ element.deadlineAt }} <br />
                                <b-button
                                    class="btn-delete"
                                    v-b-modal.modal-delete
                                    @click="removeTask = element.id"
                                >
                                    <img src="/images/delete-black.png" alt=""
                                /></b-button>
                            </div>
                        </draggable>
                    </div>
                </div>
                <div class="col-3">
                    <div class="p-2 alert alert-primary">
                        <h6>В работе</h6>
                        <draggable
                            class="list-group kanban-column"
                            :list="arrDoing"
                            group="tasks"
                            @change="add($event, 2)"
                        >
                            <div
                                class="list-group-item"
                                v-for="element in arrDoing"
                                :key="element.name"
                            >
                                <b-button
                                    class="btn-task"
                                    @click="getTask(element.id)"
                                >
                                    <b>{{ element.name }}</b></b-button
                                >
                                <br />
                                {{ element.deadlineAt }} <br />
                                <b-button
                                    class="btn-delete"
                                    v-b-modal.modal-delete
                                    @click="removeTask = element.id"
                                >
                                    <img src="/images/delete-black.png" alt=""
                                /></b-button>
                            </div>
                        </draggable>
                    </div>
                </div>
                <div class="col-3">
                    <div class="p-2 alert alert-warning">
                        <h6>В проверке</h6>
                        <draggable
                            class="list-group kanban-column"
                            :list="arrInCheck"
                            group="tasks"
                            @change="add($event, 3)"
                        >
                            <div
                                class="list-group-item"
                                v-for="element in arrInCheck"
                                :key="element.name"
                            >
                                <b-button
                                    class="btn-task"
                                    @click="getTask(element.id)"
                                >
                                    <b>{{ element.name }}</b></b-button
                                >
                                <br />
                                {{ element.deadlineAt }} <br />
                                <b-button
                                    class="btn-delete"
                                    v-b-modal.modal-delete
                                    @click="removeTask = element.id"
                                >
                                    <img src="/images/delete-black.png" alt=""
                                /></b-button>
                            </div>
                        </draggable>
                    </div>
                </div>
                <div class="col-3">
                    <div class="p-2 alert alert-success">
                        <h6>Готово</h6>
                        <draggable
                            class="list-group kanban-column"
                            :list="arrDone"
                            group="tasks"
                            @change="add($event, 4)"
                        >
                            <div
                                class="list-group-item"
                                v-for="element in arrDone"
                                :key="element.name"
                            >
                                <b-button
                                    class="btn-task"
                                    @click="getTask(element.id)"
                                >
                                    <b>{{ element.name }}</b></b-button
                                >
                                <br />
                                {{ element.deadlineAt }} <br />
                                <b-button
                                    class="btn-delete"
                                    v-b-modal.modal-delete
                                    @click="removeTask = element.id"
                                >
                                    <img src="/images/delete-black.png" alt=""
                                /></b-button>
                            </div>
                        </draggable>
                    </div>
                </div>
            </div>
        </div>
        <b-modal centered hide-header hide-footer ref="task" id="modal-task">
            <div class="task">
                <div
                    class="title d-flex align-content-center justify-content-between"
                >
                    <div class="task-name">
                        <h2>{{ activeTask.name }}</h2>
                    </div>
                    <div class="status">
                        Статус задачи: {{ activeTask.status.alias }}
                    </div>
                    <button
                        class="btn-edit"
                        @click="editTaskOpen(activeTask.id)"
                    >
                        <img src="/images/edit.png" alt="" />
                    </button>
                </div>
                <div
                    class="info d-flex align-content-center justify-content-between"
                >
                    <div class="description">
                        <div class="description-title">Описание задачи</div>
                        <div class="description-text">
                            {{ activeTask.description }}
                        </div>
                    </div>
                    <div class="other">
                        <div class="date">
                            Дата завершения: {{ activeTask.deadlineAt }}
                        </div>
                        <div class="file">
                            Прикрепленные Файлы:
                            <div
                                v-for="(file, index) in activeTask.attachments"
                                :key="index"
                                class="d-flex"
                            >
                                <a :href="file.url"
                                    ><img src="/images/file.png" alt=""
                                /></a>
                                <div class="name">
                                    {{ file.originalFilename }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="chat-message">здесь сообщения</div>
                <div class="chat d-flex">
                    <textarea
                        name="message"
                        id=""
                        cols="80"
                        rows="5"
                    ></textarea>
                    <div class="btns">
                        <input type="file" />
                        <button class="btn-send">Отправить</button>
                    </div>
                </div>
                <div class="close" @click="$bvModal.hide('modal-task')">
                    <img src="/images/close-modal.svg" alt="" />
                </div>
                <div class="close" @click="$bvModal.hide('modal-task')">
                    <img src="/images/close-modal.svg" alt="" />
                </div>
            </div>
        </b-modal>
        <b-modal
            centered
            hide-header
            ok-only
            ok-title="Изменить"
            @ok="editTasks(activeTask.id)"
            ref="editTask"
            id="modal-editTask"
        >
            <div class="task">
                <div class="title d-flex align-content-center">
                    <div class="task-name">
                        <div class="description-title">Имя</div>
                        <input type="text" v-model="activeTask.name" />
                    </div>
                    <div class="status">
                        Статус задачи: {{ activeTask.status.alias }}
                    </div>
                </div>
                <div
                    class="info d-flex align-content-center justify-content-between"
                >
                    <div class="description">
                        <div class="description-title">Описание задачи</div>
                        <div class="description-text">
                            <input
                                type="text"
                                v-model="activeTask.description"
                            />
                        </div>
                    </div>
                    <div class="other">
                        <div class="date">
                            Дата завершения:
                            <input
                                type="date"
                                v-model="activeTask.deadlineAt"
                            />
                        </div>
                        <div class="file">
                            Прикрепленные Файлы
                            <div
                                v-for="(file, index) in activeTask.attachments"
                                :key="index"
                                class="d-flex"
                            >
                                <a :href="file.url"
                                    ><img src="/images/file.png" alt=""
                                /></a>
                                <div class="name">
                                    {{ file.originalFilename }}
                                </div>
                            </div>
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
                <div class="close" @click="$bvModal.hide('modal-newTask')">
                    <img src="/images/close-modal.svg" alt="" />
                </div>
            </div>
        </b-modal>
        <b-modal
            centered
            hide-header
            ok-only
            ok-title="Создать"
            @ok="addTask"
            id="modal-newTask"
        >
            <div class="task">
                <div class="title d-flex align-content-center">
                    <div class="task-name">
                        <div class="description-title">Имя</div>
                        <input type="text" v-model="newTask.name" />
                    </div>
                    <div class="status">Статус задачи: Планируется</div>
                </div>
                <div
                    class="info d-flex align-content-center justify-content-between"
                >
                    <div class="description">
                        <div class="description-title">Описание задачи</div>
                        <div class="description-text">
                            <textarea
                                name="description"
                                id=""
                                cols="80"
                                rows="5"
                                v-model="newTask.description"
                            ></textarea>
                        </div>
                    </div>
                    <div class="other">
                        <div class="date">
                            Дата завершения:
                            <input type="date" v-model="newTask.deadlineAt" />
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
                </div>
                <div class="close" @click="$bvModal.hide('modal-newTask')">
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
            @hidden="removeTask = ''"
            @ok="deleteTask(removeTask)"
        >
            <div class="delete-tracker">
                <div class="text">Вы действительно хотите удалить ?</div>
                <div class="close" @click="$bvModal.hide('modal-delete')">
                    <img src="/images/close-modal.svg" alt="" />
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
    components: {
        draggable,
    },
    middleware: "authenticated",
    data: function () {
        return {
            newTask: { statusId: 1 },
            removeTask: "",
            // 4 arrays to keep track of our 4 statuses
            arrToDo: [],
            arrDoing: [],
            arrInCheck: [],
            arrDone: [],
            activeSet: {},
            activeTask: { status: { name: "" } },
            chooseTask: null,
            tasks: [],
            files: "",
            editTask: {},
            elemetnId: null,
            listFiles: [],
            fileIds: [], //id файлов
        };
    },
    async created() {
        this.startup = await this.$axios.$get(
            `https://monzun.herokuapp.com/api/startups/${this.$route.params.slug}`,
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

        this.tasks = await this.$axios.$get(
            `https://monzun.herokuapp.com/api/tasks/${this.$route.params.idSet}/${this.$route.params.slug}`,
            {
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("tokenUser"),
                },
            }
        );
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].status.name == "to do") {
                this.arrToDo.push(this.tasks[i]);
            }
            if (this.tasks[i].status.name == "doing") {
                this.arrDoing.push(this.tasks[i]);
            }
            if (this.tasks[i].status.name == "in check") {
                this.arrInCheck.push(this.tasks[i]);
            }
            if (this.tasks[i].status.name == "done") {
                this.arrDone.push(this.tasks[i]);
            }
        }
    },
    methods: {
        deleteTask(index) {
            this.$axios
                .$delete(`https://monzun.herokuapp.com/api/tasks/${index}`, {
                    headers: {
                        Authorization:
                            "Bearer " + this.$cookies.get("tokenUser"),
                    },
                })
                .then((response) => {
                    this.$bvToast.toast("задача удалена!", {
                        title: "удаление задачи",
                        variant: "success",
                    });
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось удалить задачу",
                        variant: "danger",
                        solid: true,
                    });
                });
            this.arrToDo.forEach((value, item) =>
                value.id == index ? this.arrToDo.splice(item, 1) : null
            );
            this.arrDoing.forEach((value, item) =>
                value.id == index ? this.arrDoing.splice(item, 1) : null
            );
            this.arrInCheck.forEach((value, item) =>
                value.id == index ? this.arrInCheck.splice(item, 1) : null
            );
            this.arrDone.forEach((value, item) =>
                value.id == index ? this.arrDone.splice(item, 1) : null
            );
            this.removeTask = "";
        },
        addTask() {
            this.$axios
                .$post(
                    `https://monzun.herokuapp.com/api/tasks/${this.$route.params.idSet}/${this.$route.params.slug}`,
                    this.newTask,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("tokenUser"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("задача добавлена!", {
                        title: "Добавление задачи",
                        variant: "success",
                    });
                    this.arrToDo.push(response);
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось добавить задачу",
                        variant: "danger",
                        solid: true,
                    });
                });

            this.newTask = {};
        },
        async getTask(id) {
            try {
                this.activeTask = await this.$axios.$get(
                    `https://monzun.herokuapp.com/api/tasks/${id}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("tokenUser"),
                        },
                    }
                );
                this.$refs["task"].show();
                console.log(this.activeTask);
            } catch {
                this.$bvToast.toast("Не удалось получить данные задачи.", {
                    title: "задача не найдена.",
                    variant: "danger",
                    solid: true,
                });
            }
        },
        editTaskOpen(id) {
            this.$refs["editTask"].show();
        },
        editTasks(id) {
            this.editTask.name = this.activeTask.name;
            this.editTask.description = this.activeTask.description;
            this.editTask.deadlineAt = this.activeTask.deadlineAt;
            this.editTask.statusId = this.activeTask.status.id;
            this.$axios
                .$put(
                    `https://monzun.herokuapp.com/api/tasks/${id}`,
                    this.editTask,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("tokenUser"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("задача изменена!", {
                        title: "изменение",
                        variant: "success",
                    });
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось изменить задачу",
                        variant: "danger",
                        solid: true,
                    });
                });
        },
        add(event, id) {
            if (event.added) {
                this.elemetnId = event.added.element.id;
                console.log(id);
                this.$axios
                    .$put(
                        `https://monzun.herokuapp.com/api/tasks-statuses/${this.elemetnId}/${id}`,
                        {},
                        {
                            headers: {
                                Authorization:
                                    "Bearer " + this.$cookies.get("tokenUser"),
                            },
                        }
                    )
                    .then((response) => {
                        this.$bvToast.toast("задача изменена!", {
                            title: "изменение",
                            variant: "success",
                        });
                    })
                    .catch((err) => {
                        this.$bvToast.toast("ошибка", {
                            title: "Не удалось изменить задачу",
                            variant: "danger",
                            solid: true,
                        });
                    });
            }
        },
        progres(start, end) {
            let date1 = new Date(start);
            let date2 = new Date(end);
            let date3 = new Date();
            let daysLag = Math.ceil(
                (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)
            );
            let today = Math.ceil(
                (date3.getTime() - date1.getTime()) / (1000 * 3600 * 24)
            );
            let pr = Math.ceil((today / daysLag) * 100);

            if (pr >= 100) {
                pr = 100;
            }
            if (pr < 0) {
                pr = 0;
            }
            return pr;
        },
        weekDate(value) {
            var date1 = new Date(value);
            let now = new Date();
            let entireWeek = Math.ceil(
                Math.ceil(
                    (now.getTime() - date1.getTime()) / (1000 * 3600 * 24)
                ) / 7
            );
            if (entireWeek < 0) {
                entireWeek = 0;
            }
            return entireWeek;
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
                    this.newTask.fileIds = this.fileIds;
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
.set {
    margin-top: 30px;
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
    margin-bottom: 30px;
}
.info-set {
    border: 1px solid #000000;
    padding: 35px;
}
.kanban-column {
    min-height: 300px;
}
.btn-task {
    background: transparent;
    border: none;
    padding: 0;
    color: black;
}
.title {
    align-items: center;
}
.close {
    position: absolute;
    top: 10px;
    right: 10px;
}
.task {
    font-family: Roboto;
    font-size: 18px;
    line-height: 35px;

    color: #000000;
}
.task-name {
    margin-right: 50px;
}
.other {
    text-align: center;
}
.btn-delete {
    border: none;
    background: transparent;
    padding: 0;
}
.delete-tracker .text {
    font-family: Roboto;
    font-size: 20px;
    line-height: 21px;
    color: #000000;
    text-align: center;
    margin-bottom: 30px;
    margin-top: 20px;
}
.btns {
    margin-left: 10px;
}
.btn-send {
    font-family: Roboto;
    font-style: normal;
    margin-top: 15px;
    width: 144px;
}
.btn-edit {
    background: transparent;
    border: none;
    padding: 0;
}
.description-text textarea {
width: 390px;
}
</style>