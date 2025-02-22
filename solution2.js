const fs = require("fs");

function determineDataStructure(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    const lines = data.trim().split("\n");
    const numOperations = parseInt(lines[0], 10);

    const stack = [];
    const queue = [];
    const priorityQueue = [];
    const possible = { stack: true, queue: true, pq: true };

    for (let i = 1; i <= numOperations; i++) {
      const [operation, value] = lines[i].split(" ");
      const num = parseInt(value, 10);

      if (operation === "push") {
        stack.push(num);
        queue.push(num);
        priorityQueue.push(num);
        priorityQueue.sort((a, b) => b - a);
      } else if (operation === "pop") {
        if (!stack.length || !queue.length || !priorityQueue.length) {
          console.log("IMPOSSIBLE");
          return;
        }

        if (stack.pop() !== num) possible.stack = false;
        if (queue.shift() !== num) possible.queue = false;
        if (priorityQueue.shift() !== num) possible.pq = false;
      }
    }

    const results = Object.entries(possible)
      .filter(([_, v]) => v)
      .map(([k]) => k.toUpperCase());

    if (results.length === 0) {
      console.log("IMPOSSIBLE");
    } else if (results.length > 1) {
      console.log("NOT SURE");
    } else {
      console.log(results[0]);
    }
  });
}

const filePath = process.argv[2];
determineDataStructure(filePath);
