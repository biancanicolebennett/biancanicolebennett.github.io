var now = window.performance && window.performance.now ?
    window.performance.now.bind(window.performance) : Date.now;
var tasks = [];
var index = 0;
var total = 0;
var ready = true;
var end;


function dedupe() {
    let i = index, task = tasks[i];
    while (++i < total) {
        if (tasks[i] == task) tasks[i] = null;
    }
    task = tasks[i] = null;
}

function runTasks(start) {
    do {
        if (tasks[index] !== null) {
            tasks[index]();
            dedupe();
        }
        end = now();
    } while ((++index < total) && end - start < 3);

    if (index >= total) {
        index = total = 0;
        ready = true;
    } else {
        requestAnimationFrame(runTasks);
    }
}

export function queueTask(task: Function) : void {
    tasks[total++] = task;
    if (ready) {
        ready = false;
        requestAnimationFrame(runTasks);
    }
}