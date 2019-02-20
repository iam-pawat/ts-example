"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue = require("better-queue");
const moment = require("moment");
const fn = (input, cb) => {
    console.log('mobile process start');
    let result = input;
    cb(null, result);
};
const q = new queue(fn, {
    filo: false,
    concurrent: 5,
    // maxRetries: 10,
    // retryDelay: 1000,
    // afterProcessDelay: 1000,    /* which will delay processing between tasks */
    id: function (task, cb) {
        // Compute the ID
        cb(null, `mb-blackout-${task.objectid}`);
    }
});
q.on('task_finish', (taskId, result, stats) => {
    console.log(`taskId: ${taskId}, result: ${result}, stats: ${stats.elapsed} ${moment().unix()}`);
});
q.on('task_failed', (taskId, err, stats) => {
    console.log(`taskId: ${taskId}, err: ${err}, stats: ${stats.elapsed}`);
});
q.on('empty', function () { });
q.on('drain', function () { });
exports.default = q;
//# sourceMappingURL=queueProc.js.map