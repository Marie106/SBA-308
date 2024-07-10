// test

const { getLearnerData } = require('./index');
const{ courseInfo, assignmentGroups, learnerSubmissions} = require('./data');

//Run your test
try {
    const result = getLearnerData(courseInfo, assignmentGroups, learnerSubmissions);
    console.log(JSON.stringify(result,null,2));
} catch (error) {
    console.error("An error occurred:", error.message);

} 