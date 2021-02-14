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
                        <h4>Планируется</h4>
                        <draggable
                            class="list-group kanban-column"
                            :list="arrToDo"
                            group="tasks"
                            @change="add($event, 1)"
                        >
                            <div
                                class="list-group-item"
                                v-for="element in arrToDo"
                                :key="element.name"
                            >
                                <b-button
                                    class="btn-task"
                                    @click="getTask(element.id)"
                                >
                                    {{ element.name }}</b-button
                                >
                                {{ element.date }}
                            </div>
                        </draggable>
                    </div>
                </div>
                <div class="col-3">
                    <div class="p-2 alert alert-primary">
                        <h4>В работе</h4>
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
                                    {{ element.name }}</b-button
                                >
                                {{ element.date }}
                            </div>
                        </draggable>
                    </div>
                </div>
                <div class="col-3">
                    <div class="p-2 alert alert-warning">
                        <h4>В проверке</h4>
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
                                    {{ element.name }}</b-button
                                >
                                {{ element.date }}
                            </div>
                        </draggable>
                    </div>
                </div>
                <div class="col-3">
                    <div class="p-2 alert alert-success">
                        <h4>Готово</h4>
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
                                    {{ element.name }}</b-button
                                >
                                {{ element.date }}
                            </div>
                        </draggable>
                    </div>
                </div>
            </div>
        </div>
        <b-modal centered hide-header hide-footer ref="task" id="modal-task">
            <div class="task">
                <div class="title d-flex align-content-center">
                    <div class="task-name">
                        <h2>{{ activeTask.name }}</h2>
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
                            {{ activeTask.description }}
                        </div>
                    </div>
                    <div class="other">
                        <div class="date">
                            Дата завершения: {{ activeTask.deadlineAt }}
                        </div>
                        <div class="file">
                            Прикрепленные Файлы
                            <div
                                v-for="(file, index) in activeTask.attachments"
                                :key="index"
                            >
                                <a :href="file.url"
                                    ><img src="/images/file.png" alt="" />
                                    <div class="name">
                                        {{ file.originalFilename }}
                                    </div></a
                                >
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
                        <button @click="message" class="btn-send">
                            Отправить
                        </button>
                    </div>
                </div>
                <div class="close" @click="$bvModal.hide('modal-task')">
                    <img src="/images/close-modal.svg" alt="" />
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
    sockets: {
        connect: function () {
            console.log("socket connected");
        },
        customEmit: function (data) {
            console.log(
                'this method was fired by the socket server. eg: io.emit("customEmit", data)'
            );
        },
    },

    components: {
        //import draggable as a component
        draggable,
    },
    middleware: "authenticated",
    data: function () {
        return {
            newTask: "",
            // 4 arrays to keep track of our 4 statuses
            arrToDo: [],
            arrDoing: [],
            arrInCheck: [],
            arrDone: [],
            activeSet: {},
            tasks: [],
            activeTask: { status: { alias: "" } },
            startups: [],
            startup: {},
            elemetnId: null,
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    async created() {
        if (this.user.role.roleId == 3) {
            this.$router.push({ name: "sets_tracker" });
        }
        this.activeSet = await this.$axios.$get(
            `https://monzun.herokuapp.com/api/trackings/${this.$route.params.id}`,
            {
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("tokenUser"),
                },
            }
        );
        this.startups = await this.$axios.$get(
            "https://monzun.herokuapp.com/api/startups",
            {
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("tokenUser"),
                },
            }
        );
        this.startup = this.startups[0];
        this.tasks = await this.$axios.$get(
            `https://monzun.herokuapp.com/api/tasks/${this.$route.params.id}/${this.startup.id}`,
            {
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("tokenUser"),
                },
            }
        );
        console.log(this.tasks);
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
        message(data) {
            this.$socket.emit("newMessage", data);
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
.btns {
    margin-left: 10px;
}
.btn-send {
    font-family: Roboto;
    font-style: normal;
    margin-top: 15px;
    width: 144px;
}
</style>