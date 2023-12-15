const ctx = document.getElementById('myChart');

const todos = JSON.parse(sessionStorage.getItem("todolist"));
console.log(todos);
let usersArray = [];
let usersNumberOfTodos = []
Object.entries(todos).forEach((todo) => {
    user = todo[1].user;
    if (!usersArray.includes(user)){
        usersArray.push(user);
    }
})
usersArray.forEach((user) => {
    const result = Object.entries(todos).filter((todo) => todo[1].user = user);
    const numberOfTodos = result.length;
    usersNumberOfTodos.push(numberOfTodos)
})

console.log(usersArray)
console.log(usersNumberOfTodos)

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: usersArray,
        datasets: [{
        label: '# of Todos',
        data: usersNumberOfTodos,
        borderWidth: 1
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: true
        }
        }
    }
});