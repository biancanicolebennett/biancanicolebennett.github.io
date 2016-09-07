var now = window.performance && window.performance.now ?
    window.performance.now.bind(window.performance) : Date.now;
var tasks = [];
var index = 0;
var total = 0;
var ready = true;
var end;

function runTasks(start) {
    do {
        tasks[index]();
        tasks[index] = null;
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