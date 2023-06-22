let input = document.getElementById("input1");

let task = [
  // {
  //   id: Math.floor(Math.random() * 1000000 + 1),
  //   title: "Go to gym",
  //   completed: false,
  // },
  // {
  //   id: Math.floor(Math.random() * 1000000 + 1),
  //   title: "Sleep at 11",
  //   completed: false,
  // },
];

function completedTask() {
  let total = 0;
  task.forEach((e) => {
    if (e.completed) {
      total = total + 1;
    }
  });
  $("#completedTask").text(`Completed : ${total}`);
}

function updateTotaltask() {
  $("#totalTask").text(`Total Tasks : ${task.length}`);
}

function updateUI() {
  updateTotaltask();
  completedTask();
  $("#ulList").html("");
  task.forEach((singleTask) => {
    let li = document.createElement("li");
    li.id = singleTask.id;
    li.innerHTML = `
    <p>${singleTask.title}</p>
    <div>
    <button class=" btn successBtn"><ion-icon  name="checkmark"></ion-icon></button>
    <button class=" btn deleteBtn"><ion-icon name="trash"></ion-icon></button>
    </div>
    `;
    li.classList.add("todoLi");
    li.querySelector(".deleteBtn").addEventListener("click", (e) => {
      deleteTask(e.target.closest("li").id);
    });
    li.querySelector(".successBtn").addEventListener("click", (e) => {
      toggleTask(e.target.closest("li").id);
    });
    if (singleTask.completed) {
      li.querySelector("p").classList.add("lineThrough");
    }
    $("#ulList").append(li);
  });
}

function toggleTask(newId) {
  let position = task.findIndex((t) => {
    return t.id == newId;
  });
  if (task[position].completed) {
    task[position].completed = false;
  } else {
    task[position].completed = true;
  }
  updateStorage();
  updateUI();
}

let deleteTask = (taskID) => {
  let position = task.findIndex((t) => {
    return t.id == taskID;
  });
  task.splice(position, 1);
  updateStorage();
  updateUI();
};

let createNewTask = (newTaskName) => {
  task.push({
    id: Math.floor(Math.random() * 1000000 + 1),
    title: newTaskName,
    completed: false,
  });
  updateStorage();
  updateUI();
};

let selectedDeleteTask = () => {
  task = task.filter((e) => {
    return !e.completed;
  });
  updateStorage();
  updateUI();
};

let deleteAllTaskHandler = () => {
  task = [];
  updateStorage();
  updateUI();
};

let updateStorage = () => {
  localStorage.setItem("task", JSON.stringify(task));
};

$(document).ready(function () {
  let r = localStorage.getItem("task");
  if (r != null) {
    task = JSON.parse(r);
  }
  updateUI();
  $("#addTaskForm").submit(function (e) {
    e.preventDefault();
    let iValue = input.value.trim();
    if (iValue == "") {
      alert("Task can not be Empty ❌");
    } else {
      createNewTask(iValue);
      e.target.reset();
    }
  });
  $("#allDeleteBtn").click(function () {
    deleteAllTaskHandler();
  });
  $("#selectedDeleteBtn").click(function () {
    selectedDeleteTask();
  });
});
